"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useStore } from "@/store/useStore";

export default function LoginPage() {
  const router = useRouter();
  const { setRole } = useStore();
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
    setRole(data.role);
    toast.success("Welcome back");
    router.push("/");
  };

  return (
    <form onSubmit={onSubmit} className="card-surface mx-auto max-w-md space-y-5 p-8 sm:p-10">
      <h1 className="text-3xl font-semibold tracking-tight">Login</h1>
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full rounded-xl border border-zinc-300 p-3 text-sm dark:border-zinc-700 dark:bg-zinc-900" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full rounded-xl border border-zinc-300 p-3 text-sm dark:border-zinc-700 dark:bg-zinc-900" />
      <button className="btn-primary w-full">Login</button>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">No account? <Link href="/signup" className="underline underline-offset-4">Signup</Link></p>
    </form>
  );
}
