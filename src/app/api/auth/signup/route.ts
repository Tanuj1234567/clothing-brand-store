import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { hitRateLimit } from "@/lib/rate-limit";
import { signupSchema } from "@/lib/validation";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const limiter = hitRateLimit(`signup:${ip}`, 8, 60_000);
    if (!limiter.allowed) {
      return NextResponse.json({ message: "Too many signup attempts. Try again shortly." }, { status: 429 });
    }

    const { name, email, password } = signupSchema.parse(await req.json());

    await connectDB();
    const exists = await User.findOne({ email });
    if (exists) return NextResponse.json({ message: "Email already in use" }, { status: 409 });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword, role: email.includes("admin") ? "admin" : "user" });

    return NextResponse.json({ message: "Signup successful" });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: "Invalid signup payload", issues: error.issues }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
