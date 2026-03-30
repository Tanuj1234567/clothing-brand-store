import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { signToken } from "@/lib/jwt";
import { setAuthCookie } from "@/lib/auth";
import { hitRateLimit } from "@/lib/rate-limit";
import { loginSchema } from "@/lib/validation";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const limiter = hitRateLimit(`login:${ip}`, 10, 60_000);
    if (!limiter.allowed) {
      return NextResponse.json({ message: "Too many login attempts. Try again shortly." }, { status: 429 });
    }

    const payload = loginSchema.parse(await req.json());
    const { email, password } = payload;
    await connectDB();
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

    const token = signToken({ userId: user._id.toString(), email: user.email, role: user.role });
    const response = NextResponse.json({ role: user.role });
    setAuthCookie(response, token);
    return response;
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: "Invalid login payload", issues: error.issues }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
