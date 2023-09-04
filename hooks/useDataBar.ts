import { create } from "zustand";
import { ChartOptions } from "chart.js";

type props = {
  dataBar: ChartBar | null;
  options: ChartOptions;
  setDateBar: () => void;
};

export const useDataBar = create<props>((set) => {
  return {
    dataBar: null,
    setDateBar: () => {
      fetch(`https://space-x-api-7me1.onrender.com/launches/stats/bar`)
        .then((res) => res.json())
        .then((res) => set((state) => ({ ...state, dataBar: res })));
    },
    options: {
      scales: {
        x: {
          stacked: true,
        },
        y: {
          beginAtZero: true,
          stacked: true,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  };
});
