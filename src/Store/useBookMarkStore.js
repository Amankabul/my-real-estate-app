import { create } from "zustand";

export const useBookMarkStore = create((set) => ({
  bookmark: [],

  setBookmark: (bookmark) => set({ bookmark }),
}));
