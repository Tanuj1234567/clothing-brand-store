import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import { Order } from "@/models/Order";
import { createOrderSchema } from "@/lib/validation";

export async function GET(req: Request) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

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
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = createOrderSchema.parse(await req.json());
    await connectDB();
    const order = await Order.create({ ...body, userId: user.userId, paymentStatus: "paid" });
    return NextResponse.json({ order });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error creating order";
    return NextResponse.json({ message }, { status: 400 });
  }
}
