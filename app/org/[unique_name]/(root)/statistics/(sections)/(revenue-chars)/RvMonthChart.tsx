"use client";
import dayjs from "dayjs";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
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
  Tooltip,
  Legend
);

import { RevenueByMonth } from "@/app/types/User";
import { useState } from "react";
import { BarChart3, LineChart } from "lucide-react";
import Heading from "@/app/(global_components)/Heading";

export default function RvMonthChart({ data }: { data: RevenueByMonth[] }) {
  const [chartType, setChartType] = useState("bar");

  const labels = data.map((rbd) => dayjs(rbd.month).format("YYYY-MMM"));
  const revenues = data.map((rbd) => rbd.total);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Oylik daromad",
        data: revenues,
        borderColor: "#7f22fe",
        backgroundColor: "#7f22fe",
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
    <div className="p-5 space-y-5 rounded-2xl border border-gray-300 border-b-3 border-b-violet-600 flex-1">
      <Heading text="Oxirgi 12 oy" />
      <div className="flex gap-4">
        <button
          onClick={() => setChartType("line")}
          className="border-gray-300 border rounded-lg py-2 px-4 flex gap-2 text_color hover:bg-gray-950/5 cursor-pointer"
        >
          <LineChart /> Chiziq
        </button>
        <button
          onClick={() => setChartType("bar")}
          className="border-gray-300 border rounded-lg py-2 px-4 flex gap-2 text_color hover:bg-gray-950/5 cursor-pointer"
        >
          <BarChart3 /> Ustun
        </button>
      </div>
      <div className="w-full h-[300px]">
        {chartType === "line" && (
          <Line options={options} data={chartData} className="w-full h-full" />
        )}
        {chartType === "bar" && (
          <Bar options={options} data={chartData} className="w-full h-full" />
        )}
      </div>
    </div>
  );
}
