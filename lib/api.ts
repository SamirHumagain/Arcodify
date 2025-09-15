import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const API_BASE = "https://fakestoreapi.com";

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export async function mockAddProduct(product: any) {
  await new Promise((r) => setTimeout(r, 500));
  return { success: true, product };
}

export async function mockDeleteProduct(productId: number) {
  await new Promise((r) => setTimeout(r, 500));
  return { success: true, productId };
}

import type { InternalAxiosRequestConfig } from "axios";
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  try {
    const token =
      typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  } catch (e) {}
  return config;
});

api.interceptors.response.use(
  (res: AxiosResponse) => res,
  (err: AxiosError) => {
    const data = err?.response?.data as { message?: string } | undefined;
    const message =
      data?.message ||
      err?.message ||
      "An unexpected error occurred. Please try again.";
    return Promise.reject({ status: err?.response?.status, message });
  }
);
