"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useStore } from "@/store/useStore";

export default function AdminPage() {
  const { token, role } = useStore();
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: 0, category: "Streetwear", sizes: "S,M,L", images: "", description: "" });

  const load = useCallback(async () => {
    const p = await fetch("/api/products").then((r) => r.json());
    setProducts(p.products || []);
    const o = await fetch("/api/orders", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json());
    setOrders(o.orders || []);
  }, [token]);

  useEffect(() => {
    if (role === "admin") load();
  }, [role, load]);

  if (role !== "admin") return <p>Admin access required.</p>;

  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="text-sm text-zinc-500">Manage products and review orders.</p>
      </section>

      <section className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
        <h2 className="text-xl font-semibold">Add Product</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {Object.keys(newProduct).map((key) => (
            <input key={key} placeholder={key} value={(newProduct as any)[key]} onChange={(e) => setNewProduct((p) => ({ ...p, [key]: e.target.value }))} className="rounded-lg border p-2 dark:bg-zinc-900" />
          ))}
        </div>
        <button
          className="mt-3 rounded-full bg-black px-5 py-2 text-white dark:bg-brand-accent dark:text-black"
          onClick={async () => {
            const payload = {
              ...newProduct,
              price: Number(newProduct.price),
              sizes: newProduct.sizes.split(",").map((s) => s.trim()),
              images: newProduct.images ? newProduct.images.split(",").map((i) => i.trim()) : []
            };
            const res = await fetch("/api/products", {
              method: "POST",
              headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
              body: JSON.stringify(payload)
            });
            if (res.ok) {
              toast.success("Product created");
              load();
            } else {
              toast.error("Failed to create product");
            }
          }}
        >
          Add Product
        </button>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Products</h2>
        <div className="space-y-2">
          {products.map((p) => (
            <div key={p._id} className="flex items-center justify-between rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
              <p>{p.name}</p>
              <div className="flex gap-4">
                <button
                  className="text-blue-500"
                  onClick={async () => {
                    const name = window.prompt("New name", p.name);
                    if (!name) return;
                    await fetch(`/api/products/${p._id}`, {
                      method: "PUT",
                      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                      body: JSON.stringify({ ...p, name })
                    });
                    toast.success("Updated");
                    load();
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-500"
                  onClick={async () => {
                    await fetch(`/api/products/${p._id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
                    toast.success("Deleted");
                    load();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Orders</h2>
        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o._id} className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
              <p className="font-medium">Order #{o._id.slice(-6).toUpperCase()}</p>
              <p className="text-sm">Total: Rs. {o.total} | Status: {o.paymentStatus}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
