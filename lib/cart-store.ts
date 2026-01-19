"use client";

import { create } from "zustand";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  add: (item) => {
    const exists = get().items.find((i) => i.id === item.id);
    if (exists) {
      set({
        items: get().items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({ items: [...get().items, { ...item, quantity: 1 }] });
    }
  },
  remove: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
  increase: (id) =>
    set({
      items: get().items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      ),
    }),
  decrease: (id) =>
    set({
      items: get()
        .items.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0),
    }),
  clear: () => set({ items: [] }),
  totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
}));
