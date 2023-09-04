"use client";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import React from "react";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useDataPie } from "@/hooks/useDataPie";

export function ChartPie() {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const { data, failTotal, options, setDateBar, successTotal } =
    useDataPie();

    React.useEffect(() => {
      setDateBar()
    },[setDateBar])
  return (
    data && (
      <div className="flex gap-10 items-end relative sm:mb-5">
        <div className="w-80 h-80">
          <Pie
            data={data}
            options={options as any}
            plugins={[ChartDataLabels as any]}
          />
          <div className="absolute -bottom-2">
            <span className="block bold text-lg">Resultado de lançamento:</span>
            <span className="block">
              Sucesso:{" "}
              <span className="text-[rgb(40,167,69)]">{successTotal}</span>
            </span>
            <span className="block">
              Falha: <span className="text-red-600">{failTotal}</span>
            </span>
          </div>
        </div>
      </div>
    )
  );
}
