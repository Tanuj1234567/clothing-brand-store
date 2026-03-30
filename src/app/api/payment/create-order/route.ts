import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      return NextResponse.json({ message: "Razorpay keys missing" }, { status: 500 });
    }

    const instance = new Razorpay({ key_id, key_secret });
    const order = await instance.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `rcpt_${Date.now()}`
    });
    return NextResponse.json({ order });
  } catch {
    return NextResponse.json({ message: "Unable to create payment order" }, { status: 400 });
  }
}
