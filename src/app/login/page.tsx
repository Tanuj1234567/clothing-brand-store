"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useStore } from "@/store/useStore";

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) return toast.error(data.message || "Login failed");
    setAuth(data.token, data.role);
    toast.success("Welcome back");
    router.push("/");
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md space-y-4 rounded-2xl border border-zinc-200 p-8 dark:border-zinc-800">
      <h1 className="text-2xl font-semibold">Login</h1>
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full rounded-xl border p-2 dark:bg-zinc-900" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full rounded-xl border p-2 dark:bg-zinc-900" />
      <button className="w-full rounded-full bg-black py-2 text-white dark:bg-brand-accent dark:text-black">Login</button>
      <p className="text-sm">No account? <Link href="/signup" className="underline">Signup</Link></p>
    </form>
  );
}
