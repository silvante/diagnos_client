import Heading from "@/app/(global_components)/Heading";
import { RevenueStats } from "@/app/types/User";
import { useEffect, useState } from "react";

export default function RvTotal({ data }: { data: RevenueStats }) {
  const [year, setYear] = useState(0);
  const [total, setTotal] = useState(0);
  const thisMonth = data.revenueByMonth[data.revenueByMonth.length - 1];

  useEffect(() => {
    let yearly = 0;
    data.revenueByMonth.map((rm) => (yearly = yearly + rm.total));
    setYear(yearly);
  }, []);

  useEffect(() => {
    let total = 0;
    data.revenueByType.map((rm) => (total = total + rm.total));
    setTotal(total);
  }, []);

  return (
    <div className="space-y-5">
      <Heading text="Jami" />
      <div className="flex flex-wrap gap-4">
        <div className="py-4 px-6 rounded-xl border-gray-300 border-b-violet-600 border-b-2 border space-y-2">
          <h3 className="text-xl font-semibold text_color">Bu oy:</h3>
          <h3 className="text-lg font-semibold text_color">
            {thisMonth.total} <span className="text-violet-600">UZS</span>
          </h3>
          <p className="text-gray-600">Bu oyning umumiy daromadi.</p>
        </div>
        <div className="py-4 px-6 rounded-xl border-gray-300 border-b-violet-600 border-b-2 border space-y-2">
          <h3 className="text-xl font-semibold text_color">Oxirgi 12 oy:</h3>
          <h3 className="text-lg font-semibold text_color">
            {year} <span className="text-violet-600">UZS</span>
          </h3>
          <p className="text-gray-600">
            Oxirgi 12 oyning (bir yil) umumiy daromadi.
          </p>
        </div>
        <div className="py-4 px-6 rounded-xl border-gray-300 border-b-violet-600 border-b-2 border space-y-2">
          <h3 className="text-xl font-semibold text_color">Umumiy daromad:</h3>
          <h3 className="text-lg font-semibold text_color">
            {total} <span className="text-violet-600">UZS</span>
          </h3>
          <p className="text-gray-600">Tashkilotning umumiy daromadi.</p>
        </div>
      </div>
    </div>
  );
}
