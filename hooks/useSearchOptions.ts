import { create } from "zustand";

type props = {
  searchOptions: SearchOptions[];
  setSearchOptions(): void;
};

export const useSearchOptions = create<props>((set) => {
  return {
    searchOptions: [],
    setSearchOptions: () => {
      fetch(`https://space-x-api-7me1.onrender.com/launches/search`)
        .then((res) => res.json())
        .then((res) => set((state) => ({...state, searchOptions:res})));
    },
  };
});
