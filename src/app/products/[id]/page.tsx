"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useStore } from "@/store/useStore";
import type { Product } from "@/types";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [size, setSize] = useState("M");
  const { addToCart } = useStore();
  const id = params?.id;

  useEffect(() => {
    if (!id) return;
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product);
        setSize(data.product?.sizes?.[0] || "M");
      });
  }, [id]);

  if (!product) return <p>Loading product...</p>;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {product.images.map((image) => (
            <div key={image} className="relative aspect-square overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
              <Image src={image} alt={product.name} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-5">
        <p className="text-sm uppercase tracking-widest text-zinc-500">{product.category}</p>
        <h1 className="text-3xl font-semibold">{product.name}</h1>
        <p className="text-2xl font-semibold">Rs. {product.price}</p>
        <p className="text-zinc-600 dark:text-zinc-400">{product.description}</p>
        <div className="flex gap-3">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`rounded-full border px-4 py-2 text-sm ${size === s ? "border-black bg-black text-white dark:border-brand-accent dark:bg-brand-accent dark:text-black" : "border-zinc-300 dark:border-zinc-700"}`}
            >
              {s}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            addToCart({
              productId: product._id,
              name: product.name,
              price: product.price,
              image: product.images[0],
              quantity: 1,
              size
            });
            toast.success("Added to cart");
          }}
          className="rounded-full bg-brand-black px-6 py-3 text-white dark:bg-brand-accent dark:text-black"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
