import { Schema, model, models } from "mongoose";

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        name: String,
        price: Number,
        image: String,
        quantity: Number,
        size: String
      }
    ],
    total: { type: Number, required: true },
    address: {
      fullName: String,
      phone: String,
      line1: String,
      city: String,
      state: String,
      pincode: String
    },
    paymentStatus: { type: String, default: "pending" }
  },
  { timestamps: true }
);

export const Order = models.Order || model("Order", orderSchema);
