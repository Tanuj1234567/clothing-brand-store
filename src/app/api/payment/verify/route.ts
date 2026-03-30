import crypto from "crypto";
import { NextResponse } from "next/server";
import { hitRateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const limiter = hitRateLimit(`payment-verify:${ip}`, 20, 60_000);
    if (!limiter.allowed) {
      return NextResponse.json({ message: "Too many requests" }, { status: 429 });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ valid: false, message: "Missing payment fields" }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) return NextResponse.json({ valid: false, message: "Server misconfigured" }, { status: 500 });

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ valid: false, message: "Invalid payment signature" }, { status: 400 });
    }

    return NextResponse.json({ valid: true });
  } catch {
    return NextResponse.json({ valid: false, message: "Unable to verify payment" }, { status: 400 });
  }
}
