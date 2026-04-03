import Heading from "@/app/(global_components)/Heading";
import JobsList from "./JobsList";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Jobs() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Heading text="Sizning ishingiz" />
        <Link href={"/panel/jobs/request"} className="flex gap-2 bg-violet-600 px-3 py-2 text-white font-semibold rounded-xl hover:bg-violet-700 transition-colors">
          <p className="hidden md:flex">Sorov Jo'natish</p>
        </Link>
      </div>
      <JobsList />
      <div className="py-20 flex justify-center items-center">
        <h3 className="text-gray-600">Siz bir vaqtning o'zida faqat bitta ishga ega bo'lishingiz mumkin.</h3>
      </div>
    </div>
  );
}
