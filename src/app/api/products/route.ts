import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import { Product } from "@/models/Product";
import { sampleProducts } from "@/lib/sample-data";

export async function GET() {
  await connectDB();
  const count = await Product.countDocuments();
  if (count === 0) await Product.insertMany(sampleProducts);
  const products = await Product.find().sort({ createdAt: -1 });
  return NextResponse.json({ products });
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const user = verifyToken(token);
    if (user.role !== "admin") return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    const body = await req.json();
    await connectDB();
    const product = await Product.create(body);
    return NextResponse.json({ product });
  } catch {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}
