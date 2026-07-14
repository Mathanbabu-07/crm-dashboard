"use client";

import { create } from "zustand";
import type { AuthUser } from "@/lib/types";

interface AuthStore {
  isAuthenticated: boolean;
  user: AuthUser | null;
  rememberMe: boolean;
  login: (user: AuthUser, rememberMe?: boolean) => void;
  logout: () => void;
  setRememberMe: (rememberMe: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  rememberMe: false,
  login: (user, rememberMe = false) =>
    set({
      isAuthenticated: true,
      user,
      rememberMe,
    }),
  logout: () =>
    set({
      isAuthenticated: false,
      user: null,
      rememberMe: false,
    }),
  setRememberMe: (rememberMe) => set({ rememberMe }),
}));
