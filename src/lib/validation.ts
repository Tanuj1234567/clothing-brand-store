import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2).max(60),
  email: z.string().email().max(120),
  password: z.string().min(8).max(72)
});

export const loginSchema = z.object({
  email: z.string().email().max(120),
  password: z.string().min(8).max(72)
});

export const createOrderSchema = z.object({
  razorpayOrderId: z.string().min(6),
  razorpayPaymentId: z.string().min(6),
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        name: z.string().min(1),
        price: z.number().nonnegative(),
        image: z.string().url(),
        quantity: z.number().int().positive(),
        size: z.string().min(1)
      })
    )
    .min(1),
  total: z.number().positive(),
  address: z.object({
    fullName: z.string().min(2),
    phone: z.string().min(8),
    line1: z.string().min(5),
    city: z.string().min(2),
    state: z.string().min(2),
    pincode: z.string().min(4)
  })
});

export const createReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(3).max(400)
});
