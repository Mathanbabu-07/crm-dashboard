"use client";

import { create } from "zustand";

type ThemePreference = "light" | "dark" | "system";

interface TableFilterState {
  search: string;
  status: string;
  plan?: string;
  pageIndex: number;
  pageSize: number;
  sortBy?: string;
  sortDesc?: boolean;
}

interface UiStore {
  themePreference: ThemePreference;
  customerFilters: TableFilterState;
  orderFilters: TableFilterState;
  setThemePreference: (themePreference: ThemePreference) => void;
  setCustomerFilters: (filters: Partial<TableFilterState>) => void;
  setOrderFilters: (filters: Partial<TableFilterState>) => void;
  resetTableFilters: () => void;
}

const defaultCustomerFilters: TableFilterState = {
  search: "",
  status: "all",
  plan: "all",
  pageIndex: 0,
  pageSize: 10,
};

const defaultOrderFilters: TableFilterState = {
  search: "",
  status: "all",
  pageIndex: 0,
  pageSize: 10,
};

export const useUiStore = create<UiStore>((set) => ({
  themePreference: "system",
  customerFilters: defaultCustomerFilters,
  orderFilters: defaultOrderFilters,
  setThemePreference: (themePreference) => set({ themePreference }),
  setCustomerFilters: (filters) =>
    set((state) => ({
      customerFilters: { ...state.customerFilters, ...filters },
    })),
  setOrderFilters: (filters) =>
    set((state) => ({
      orderFilters: { ...state.orderFilters, ...filters },
    })),
  resetTableFilters: () =>
    set({
      customerFilters: defaultCustomerFilters,
      orderFilters: defaultOrderFilters,
    }),
}));
