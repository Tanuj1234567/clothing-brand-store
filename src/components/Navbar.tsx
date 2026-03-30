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
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <nav className="container-max flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-semibold tracking-wider">
          NOIRVAULT
        </Link>
        <div className="flex items-center gap-5 text-sm">
          <Link href="/products">Shop</Link>
          <Link href="/wishlist">Wishlist</Link>
          <Link href="/cart">Cart ({itemCount})</Link>
          {role === "admin" && <Link href="/admin">Admin</Link>}
          {role ? (
            <button
              onClick={async () => {
                await fetch("/api/auth/logout", { method: "POST" });
                logout();
                toast.success("Logged out");
              }}
              className="rounded-full border border-zinc-300 px-4 py-1.5 dark:border-zinc-700"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="rounded-full border border-zinc-300 px-4 py-1.5 dark:border-zinc-700">
              Account
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
