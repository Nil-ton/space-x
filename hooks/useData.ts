import { create } from "zustand";

type props = {
  data: ApiResponse | null;
  setData(item: SearchOptions, inputValue: string,page:number): void;
  page: number;
  setPage(page: number): void;
  dataReset: ApiResponse | null
};

export const useData = create<props>((set) => {
  return {
    dataReset: null,
    data: null,
    setData: (query, inputValue,page) => {
      if(inputValue === "") {
        fetch(`https://space-x-api-7me1.onrender.com/launches?page=${page}`)
        .then((res) => res.json())
        .then((res) => set((state) => ({ ...state,data: state.dataReset ? state.dataReset : res })))
      }else if (query.name !== "") {
        fetch(`https://space-x-api-7me1.onrender.com/launches?page=${page}&${query?.type}=${query?.name}`)
        .then((res) => res.json())
        .then((res) => set((state) => ({ ...state,data:res })))
      } else {
        fetch(`https://space-x-api-7me1.onrender.com/launches?page=${page}`)
        .then((res) => res.json())
        .then((res) => set((state) => ({ ...state,data:res })))
      }
    },
    setPage: (item) => set((state) => ({...state, page: item})),
    page: 1,
  };
});
