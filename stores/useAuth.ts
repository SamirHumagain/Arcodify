import { create } from "zustand";

type AuthState = {
  userEmail?: string | null;
  token?: string | null;
  login: (email: string, token: string) => void;
  logout: () => void;
  initFromSession: () => void;
};

export const useAuth = create<AuthState>(
  (set: (state: Partial<AuthState>) => void) => ({
    userEmail: null,
    token: null,
    login: (email: string, token: string) => {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userEmail", email);
      }
      set({ userEmail: email, token });
    },
    logout: () => {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userEmail");
      }
      set({ userEmail: null, token: null });
    },
    initFromSession: () => {
      if (typeof window !== "undefined") {
        const token = sessionStorage.getItem("token");
        const userEmail = sessionStorage.getItem("userEmail");
        set({ token, userEmail });
      }
    },
  })
);
