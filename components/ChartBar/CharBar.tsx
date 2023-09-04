"use client";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  CategoryScale,
  BarOptions,
  LinearScale,
  BarElement
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useDataBar } from "@/hooks/useDataBar";

export function ChartBar() {
  ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,LinearScale, BarElement);
  const {dataBar,options,setDateBar} = useDataBar()
  const {width} = useWindowSize()

  React.useEffect(() => {
    setDateBar()
  }, [setDateBar]);

  return (
    dataBar && (
        <div className="flex gap-10">
          <Bar
            options={options as any}
            data={{
              labels: dataBar["labels"],
              datasets: dataBar["datasets"],
            }}
            width={
                // width <= 1024 ? 600 : width <= 768 ? 350 : width <= 360 ? 100 : 800
                width <= 360 ? 340 : width <= 768 ? 350 : width <= 1024 ? 600 : 800
            }
            height={300}
          />
        </div>
    )
  );
}
