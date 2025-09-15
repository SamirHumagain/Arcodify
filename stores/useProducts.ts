import { create } from "zustand";
import { Product } from "../lib/types";
import { api } from "../lib/api";

type ProductState = {
  products: Product[];
  loading: boolean;
  error?: string | null;
  fetchAll: () => Promise<void>;
  fetchById: (id: number) => Promise<Product | null>;
  addProductLocal: (p: Product) => void;
  removeProductLocal: (id: number) => void;
};

export const useProducts = create<ProductState>(
  (
    set: (
      state:
        | Partial<ProductState>
        | ((state: ProductState) => Partial<ProductState>)
    ) => void,
    get: () => ProductState
  ) => ({
    products: [],
    loading: false,
    error: null,
    fetchAll: async () => {
      set({ loading: true, error: null });
      try {
        const res = await api.get<Product[]>("/products");
        set({ products: res.data, loading: false });
      } catch (e: any) {
        set({ error: e.message || "Failed to load products", loading: false });
      }
    },
    fetchById: async (id: number) => {
      const existing = get().products.find((p: Product) => p.id === id);
      if (existing) return existing;
      try {
        const res = await api.get<Product>(`/products/${id}`);
        set((s: ProductState) => ({ products: [...s.products, res.data] }));
        return res.data;
      } catch {
        return null;
      }
    },
    addProductLocal: (p: Product) =>
      set((s: ProductState) => ({ products: [p, ...s.products] })),
    removeProductLocal: (id: number) =>
      set((s: ProductState) => ({
        products: s.products.filter((p: Product) => p.id !== id),
      })),
  })
);
