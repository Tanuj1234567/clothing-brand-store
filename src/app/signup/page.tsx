"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (!res.ok) return toast.error(data.message || "Signup failed");
    toast.success("Account created");
    router.push("/login");
  };

  return (
    <form onSubmit={onSubmit} className="card-surface mx-auto max-w-md space-y-5 p-8 sm:p-10">
      <h1 className="text-3xl font-semibold tracking-tight">Create Account</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full rounded-xl border border-zinc-300 p-3 text-sm dark:border-zinc-700 dark:bg-zinc-900" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full rounded-xl border border-zinc-300 p-3 text-sm dark:border-zinc-700 dark:bg-zinc-900" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full rounded-xl border border-zinc-300 p-3 text-sm dark:border-zinc-700 dark:bg-zinc-900" />
      <button className="btn-primary w-full">Signup</button>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">Already have account? <Link href="/login" className="underline underline-offset-4">Login</Link></p>
    </form>
  );
}
