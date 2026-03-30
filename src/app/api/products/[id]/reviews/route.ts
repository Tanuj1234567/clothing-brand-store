import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import { createReviewSchema } from "@/lib/validation";
import { Review } from "@/models/Review";

function getProductIdFromUrl(url: string) {
  const parts = new URL(url).pathname.split("/");
  return parts[parts.length - 2] || "";
}

export async function GET(req: Request) {
  await connectDB();
  const productId = getProductIdFromUrl(req.url);
  const reviews = await Review.find({ productId }).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ reviews });
}

export async function POST(req: Request) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectDB();
    const productId = getProductIdFromUrl(req.url);
    const payload = createReviewSchema.parse(await req.json());

    const review = await Review.create({
      productId,
      userId: user.userId,
      userName: user.email.split("@")[0],
      rating: payload.rating,
      comment: payload.comment
    });
    return NextResponse.json({ review });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Could not add review";
    return NextResponse.json({ message }, { status: 400 });
  }
}
