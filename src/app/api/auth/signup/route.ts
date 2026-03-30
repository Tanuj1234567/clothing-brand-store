import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) return NextResponse.json({ message: "All fields are required" }, { status: 400 });

    await connectDB();
    const exists = await User.findOne({ email });
    if (exists) return NextResponse.json({ message: "Email already in use" }, { status: 409 });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword, role: email.includes("admin") ? "admin" : "user" });

    return NextResponse.json({ message: "Signup successful" });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
