import { create } from "zustand";

export const useFeaturedStore = create((set) => ({
  activeFilter: "Rent",
  properties: [],
  loading: true,
  errorMsg: null,

  setActiveFilter: (filter) => set({ activeFilter: filter }),
  setProperties: (properties) => set({ properties: properties }),
  setLoading: (j) => set({ loading: j }),
  setErrorMsg: (massage) => set({ errorMsg: massage }),
}));
