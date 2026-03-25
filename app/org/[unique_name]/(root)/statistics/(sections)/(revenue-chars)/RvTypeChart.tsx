"use client";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
);

// out of service <------------------------------- Do Not Touch ------------------------------>

import { RevenueByType } from "@/app/types/User";
import { useState } from "react";
import { BarChart3, PieChart } from "lucide-react";
import Heading from "@/app/(global_components)/Heading";

export default function RvTypeChart({ data }: { data: RevenueByType[] }) {
  const [chartType, setChartType] = useState("pie");

  const labels = data.map((rbd) => rbd.type_name);
  const revenues = data.map((rbd) => rbd.total);

  function stringToColor(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00ffffff).toString(16).toUpperCase();
    return "#" + "00000".substring(0, 6 - c.length) + c;
  }

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Turlar bo'yicha daromad",
        data: revenues,
        backgroundColor: labels.map((lb) => stringToColor(lb)),
        fill: true,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
    },
  };

  return (
    <div className="p-5 space-y-5 rounded-2xl border border-gray-300  border-b-3 border-b-violet-600 flex-1">
      <Heading text="Turlar" />
      <div className="flex gap-4">
        <button
          onClick={() => setChartType("pie")}
          className="border-gray-300 border rounded-lg py-2 px-4 flex gap-2 text_color hover:bg-gray-950/5 cursor-pointer"
        >
          <PieChart /> Dumaloq
        </button>
        <button
          onClick={() => setChartType("bar")}
          className="border-gray-300 border rounded-lg py-2 px-4 flex gap-2 text_color hover:bg-gray-950/5 cursor-pointer"
        >
          <BarChart3 /> Ustun
        </button>
      </div>
      <div className="w-full h-75">
        {chartType === "pie" && (
          <Pie options={options} data={chartData} className="w-full h-full" />
        )}
        {chartType === "bar" && (
          <Bar options={options} data={chartData} className="w-full h-full" />
        )}
      </div>
    </div>
  );
}
