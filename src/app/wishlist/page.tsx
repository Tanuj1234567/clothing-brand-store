"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useStore } from "@/store/useStore";
import type { Product } from "@/types";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products.filter((p: Product) => wishlist.includes(p._id))));
  }, [wishlist]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Wishlist</h1>
      {products.length === 0 ? (
        <p>No saved products yet.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
