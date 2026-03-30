import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
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
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (user.role !== "admin") return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  await connectDB();
  const body = await req.json();
  const product = await Product.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json({ product });
}

export async function DELETE(req: Request) {
  const id = getProductIdFromRequest(req);
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (user.role !== "admin") return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  await connectDB();
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}
