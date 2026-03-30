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
    <article className="group card-surface overflow-hidden transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgb(0,0,0,0.12)]">
      <Link href={`/products/${product._id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100 dark:bg-zinc-950">
          <Image src={product.images[0]} alt={product.name} fill className="object-cover transition duration-500 group-hover:scale-110" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/55 to-transparent p-4 text-xs text-white transition duration-300 group-hover:translate-y-0">
            Premium fabric. Tailored silhouette.
          </div>
        </div>
      </Link>
      <div className="space-y-3 p-5">
        <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">{product.category}</p>
        <Link href={`/products/${product._id}`} className="line-clamp-1 text-[15px] font-medium tracking-tight">
          {product.name}
        </Link>
        <div className="flex items-center justify-between">
          <p className="font-semibold tracking-tight">Rs. {product.price}</p>
          <button
            onClick={() => {
              toggleWishlist(product._id);
              toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
            }}
            className="rounded-full border border-zinc-300 px-2.5 py-1 text-xs transition hover:border-zinc-900 dark:border-zinc-700 dark:hover:border-zinc-500"
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
          className="w-full rounded-full bg-black px-4 py-2.5 text-sm font-medium text-white transition duration-300 hover:bg-zinc-800 dark:bg-brand-accent dark:text-black dark:hover:bg-[#d8b474]"
        >
          Quick Add
        </button>
      </div>
    </article>
  );
}
