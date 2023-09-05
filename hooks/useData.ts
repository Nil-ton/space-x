import { create } from "zustand";

type props = {
  data: ApiResponse | null;
  setData(item: SearchOptions,page:number): void;
  page: number;
  setPage(page: number): void;
  dataReset: ApiResponse | null
  dataClear: () => void
};

export const useData = create<props>((set) => {
  return {
    dataReset: null,
    data: null,
    setData: (query,page) => {
      if (query.name !== "") {
        fetch(`https://space-x-api-7me1.onrender.com/launches?page=${page}&${query?.type}=${query?.name}`)
        .then((res) => res.json())
        .then((res) => set((state) => ({ ...state,data:res })))
      } else {
        fetch(`https://space-x-api-7me1.onrender.com/launches?page=${page}`)
        .then((res) => res.json())
        .then((res) => set((state) => ({ ...state,data: state.dataReset ?  state.dataReset : res, dataReset: res })))
      }
    },
    dataClear: () => {
      set((state) => ({ ...state, data: state.dataReset }))
    },
    setPage: (item) => set((state) => ({...state, page: item})),
    page: 1,
  };
});
