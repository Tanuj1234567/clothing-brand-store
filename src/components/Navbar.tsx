"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useStore } from "@/store/useStore";

export default function Navbar() {
  const { cart, role, setRole, logout } = useStore();
  const itemCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.authenticated) setRole(data.role);
      })
      .catch(() => undefined);
  }, [setRole]);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/90 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/80">
      <nav className="container-max flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-[0.24em] sm:text-xl">
          NOIRVAULT
        </Link>
        <div className="flex items-center gap-2 text-sm sm:gap-5">
          <Link href="/products" className="hidden text-zinc-600 transition hover:text-black sm:block dark:text-zinc-300 dark:hover:text-white">Shop</Link>
          <Link href="/wishlist" className="hidden text-zinc-600 transition hover:text-black sm:block dark:text-zinc-300 dark:hover:text-white">Wishlist</Link>
          <Link href="/cart" className="rounded-full border border-zinc-300 px-3 py-1.5 text-zinc-700 transition hover:border-zinc-900 hover:text-black dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500">
            Cart ({itemCount})
          </Link>
          {role === "admin" && <Link href="/admin" className="hidden text-zinc-600 transition hover:text-black sm:block dark:text-zinc-300 dark:hover:text-white">Admin</Link>}
          {role ? (
            <button
              onClick={async () => {
                await fetch("/api/auth/logout", { method: "POST" });
                logout();
                toast.success("Logged out");
              }}
              className="rounded-full border border-zinc-300 px-4 py-1.5 transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="rounded-full border border-zinc-300 px-4 py-1.5 transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900">
              Account
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
