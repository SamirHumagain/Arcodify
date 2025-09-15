import { create } from "zustand";
import { CartItem, Product } from "../lib/types";

type CartState = {
  items: CartItem[];
  add: (product: Product, qty?: number) => void;
  remove: (productId: number) => void;
  updateQty: (productId: number, qty: number) => void;
  clear: () => void;
  total: () => number;
};

export const useCart = create<CartState>(
  (
    set: (
      state: Partial<CartState> | ((state: CartState) => Partial<CartState>)
    ) => void,
    get: () => CartState
  ) => ({
    items: [],
    add: (product: Product, qty: number = 1) =>
      set((s: CartState) => {
        const exists = s.items.find(
          (i: CartItem) => i.product.id === product.id
        );
        if (exists) {
          return {
            items: s.items.map((i: CartItem) =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + qty }
                : i
            ),
          };
        }
        return { items: [{ product, quantity: qty }, ...s.items] };
      }),
    remove: (productId: number) =>
      set((s: CartState) => ({
        items: s.items.filter((i: CartItem) => i.product.id !== productId),
      })),
    updateQty: (productId: number, qty: number) =>
      set((s: CartState) => ({
        items: s.items.map((i: CartItem) =>
          i.product.id === productId ? { ...i, quantity: qty } : i
        ),
      })),
    clear: () => set({ items: [] }),
    total: () =>
      get().items.reduce(
        (acc: number, i: CartItem) => acc + i.product.price * i.quantity,
        0
      ),
  })
);
