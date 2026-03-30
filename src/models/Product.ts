import { Schema, model, models } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    sizes: [{ type: String }],
    images: [{ type: String }],
    description: { type: String, required: true },
    rating: { type: Number, default: 4.5 }
  },
  { timestamps: true }
);

export const Product = models.Product || model("Product", productSchema);
