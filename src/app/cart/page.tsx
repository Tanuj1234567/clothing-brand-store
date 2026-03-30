"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useStore } from "@/store/useStore";

export default function CartPage() {
  const { cart, updateQty, removeFromCart } = useStore();
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">Your Cart</h1>
        {cart.length === 0 && <p>Your cart is empty.</p>}
        {cart.map((item) => (
          <div key={`${item.productId}-${item.size}`} className="flex items-center justify-between rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-zinc-500">Size: {item.size}</p>
              <p className="text-sm">Rs. {item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded border px-2" onClick={() => updateQty(item.productId, item.size, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button className="rounded border px-2" onClick={() => updateQty(item.productId, item.size, item.quantity + 1)}>+</button>
              <button className="ml-3 text-sm text-red-500" onClick={() => removeFromCart(item.productId, item.size)}>Remove</button>
            </div>
          </div>
        ))}
      </section>
      <aside className="h-fit rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
        <h2 className="text-lg font-semibold">Summary</h2>
        <div className="mt-3 flex items-center justify-between">
          <span>Total</span>
          <span className="font-semibold">Rs. {total}</span>
        </div>
        <Link href="/checkout" className="mt-4 block rounded-full bg-black px-4 py-2 text-center text-white dark:bg-brand-accent dark:text-black">
          Proceed to Checkout
        </Link>
      </aside>
    </div>
  );
}
