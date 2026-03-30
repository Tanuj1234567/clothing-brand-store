import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import { Product } from "@/models/Product";

function getProductIdFromRequest(req: Request) {
  const { pathname } = new URL(req.url);
  return pathname.split("/").pop() || "";
}

export async function GET(req: Request) {
  const id = getProductIdFromRequest(req);
  await connectDB();
  const product = await Product.findById(id);
  if (!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });
  return NextResponse.json({ product });
}

export async function PUT(req: Request) {
  const id = getProductIdFromRequest(req);
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const user = verifyToken(token);
  if (user.role !== "admin") return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  await connectDB();
  const body = await req.json();
  const product = await Product.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json({ product });
}

export async function DELETE(req: Request) {
  const id = getProductIdFromRequest(req);
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const user = verifyToken(token);
  if (user.role !== "admin") return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  await connectDB();
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}
