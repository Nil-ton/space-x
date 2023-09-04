import { create } from "zustand";
import { ChartOptions } from "chart.js";

type Data = {
  labels: string[] | undefined;
  datasets: {
    data: number[] | undefined;
    backgroundColor: string[] | undefined;
  }[];
};

type props = {
  dataPie: RocketData[] | null;
  options: ChartOptions;
  setDateBar: () => void;
  data: Data | null;
  successTotal: number | null
  failTotal: number | null
};

export const useDataPie = create<props>((set) => {
  return {
    dataPie: null,
    data: null,
    failTotal: null,
    successTotal: null,
    setDateBar: () => {
      fetch(`https://space-x-api-7me1.onrender.com/launches/stats/pie`)
      .then((res) => res.json())
      .then((res: RocketData[]) => {
          const labels = res?.map((item) => item.name);

          const newData = res?.reduce(
            (result, rocket) => {
              result.data.push(rocket.success + rocket.fail);
              result.backgroundColor.push(rocket.color);
              return result;
            },
            { data: [] as number[], backgroundColor: [] as string[] }
          );

          const data = {
            labels: labels,
            datasets: [
              {
                data: newData?.["data"],
                backgroundColor: newData?.["backgroundColor"],
              },
            ],
          };

          const successTotal = res?.reduce((acc, item) => acc + item.success, 0);
          const failTotal = res?.reduce((acc, item) => acc + item.fail, 0);
          set((state) => ({
            ...state,
            data: data,
            successTotal: successTotal,
            failTotal: failTotal,
            dataPie: res
          }));
        });
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 16,
            style: "normal",
            family: "arial",
            weight: "bold",
          },
          color: "black",
        },
        legend: {
          position: "left",
          fullSize: true,
          labels: {
            color: "white",
            boxWidth: 20,
            boxHeight: 20,
            borderRadius: 0,
            pointStyle: "star",
            font: {
              family: "Arial",
              size: 16,
              weight: "bold",
            },
          },
        },
        tooltip: {
          mode: "nearest",
          titleFont: {
            size: 16,
            family: "arial",
          },
          boxWidth: 0,
          boxHeight: 0,
          boxPadding: 0,
          borderWidth: 0,
          usePointStyle: false,
        },
      },
    },
  };
});
