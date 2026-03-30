"use client";

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useStore } from "@/store/useStore";
import type { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const isWishlisted = wishlist.includes(product._id);

  return (
    <article className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
      <Link href={`/products/${product._id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image src={product.images[0]} alt={product.name} fill className="object-cover transition duration-300 group-hover:scale-105" />
        </div>
      </Link>
      <div className="space-y-2 p-4">
        <p className="text-xs uppercase tracking-wide text-zinc-500">{product.category}</p>
        <Link href={`/products/${product._id}`} className="line-clamp-1 font-medium">
          {product.name}
        </Link>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Rs. {product.price}</p>
          <button
            onClick={() => {
              toggleWishlist(product._id);
              toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
            }}
            className="text-sm"
          >
            {isWishlisted ? "♥" : "♡"}
          </button>
        </div>
        <button
          onClick={() => {
            addToCart({
              productId: product._id,
              name: product.name,
              price: product.price,
              image: product.images[0],
              quantity: 1,
              size: product.sizes[0] || "M"
            });
            toast.success("Added to cart");
          }}
          className="w-full rounded-full bg-brand-black px-4 py-2 text-sm text-white dark:bg-brand-accent dark:text-black"
        >
          Quick Add
        </button>
      </div>
    </article>
  );
}
