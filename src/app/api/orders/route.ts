import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import { Order } from "@/models/Order";

export async function GET(req: Request) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const user = verifyToken(token);

    await connectDB();
    const filter = user.role === "admin" ? {} : { userId: user.userId };
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json({ message: "Error fetching orders" }, { status: 400 });
  }
}

export async function POST(req: Request) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const user = verifyToken(token);

    const body = await req.json();
    await connectDB();
    const order = await Order.create({ ...body, userId: user.userId, paymentStatus: "paid" });
    return NextResponse.json({ order });
  } catch {
    return NextResponse.json({ message: "Error creating order" }, { status: 400 });
  }
}
