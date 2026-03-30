"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

type StoreState = {
  role: "user" | "admin" | null;
  cart: CartItem[];
  wishlist: string[];
  setRole: (role: "user" | "admin" | null) => void;
  logout: () => void;
  addToCart: (item: CartItem) => void;
  updateQty: (productId: string, size: string, quantity: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  toggleWishlist: (productId: string) => void;
  clearCart: () => void;
};

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      role: null,
      cart: [],
      wishlist: [],
      setRole: (role) => set({ role }),
      logout: () => set({ role: null }),
      addToCart: (item) =>
        set((state) => {
          const exists = state.cart.find((i) => i.productId === item.productId && i.size === item.size);
          if (exists) {
            return {
              cart: state.cart.map((i) =>
                i.productId === item.productId && i.size === item.size ? { ...i, quantity: i.quantity + item.quantity } : i
              )
            };
          }
          return { cart: [...state.cart, item] };
        }),
      updateQty: (productId, size, quantity) =>
        set((state) => ({
          cart: state.cart
            .map((i) => (i.productId === productId && i.size === size ? { ...i, quantity: Math.max(1, quantity) } : i))
            .filter((i) => i.quantity > 0)
        })),
      removeFromCart: (productId, size) =>
        set((state) => ({ cart: state.cart.filter((i) => !(i.productId === productId && i.size === size)) })),
      toggleWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.includes(productId)
            ? state.wishlist.filter((id) => id !== productId)
            : [...state.wishlist, productId]
        })),
      clearCart: () => set({ cart: [] })
    }),
    { name: "noirvault-store" }
  )
);
