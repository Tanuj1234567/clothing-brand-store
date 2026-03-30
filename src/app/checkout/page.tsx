"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useStore } from "@/store/useStore";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { cart, clearCart } = useStore();
  const [form, setForm] = useState({ fullName: "", phone: "", line1: "", city: "", state: "", pincode: "" });
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const pay = async () => {
    try {
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total })
      });
      const orderData = await orderRes.json();
      const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

      if (!key) {
        toast.error("Missing Razorpay key.");
        return;
      }

      const options = {
        key,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "NOIRVAULT",
        description: "Order Payment",
        order_id: orderData.order.id,
        handler: async (paymentResponse: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paymentResponse)
          });
          if (!verifyRes.ok) throw new Error("Payment signature invalid");

          const orderPayload = {
            items: cart,
            total,
            address: form,
            razorpayOrderId: paymentResponse.razorpay_order_id,
            razorpayPaymentId: paymentResponse.razorpay_payment_id
          };
          const createOrder = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderPayload)
          });
          if (!createOrder.ok) throw new Error("Failed to place order");
          clearCart();
          toast.success("Order placed successfully");
        },
        theme: { color: "#C9A86A" }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch {
      toast.error("Payment failed. Try again.");
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">Shipping Address</h1>
        {Object.keys(form).map((key) => (
          <input
            key={key}
            placeholder={key}
            value={(form as any)[key]}
            onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
            className="w-full rounded-xl border border-zinc-300 px-4 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          />
        ))}
      </section>
      <section className="h-fit rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <p className="mt-2">Total: Rs. {total}</p>
        <button onClick={pay} className="mt-4 rounded-full bg-black px-6 py-2 text-white dark:bg-brand-accent dark:text-black">
          Pay with Razorpay
        </button>
      </section>
    </div>
  );
}
