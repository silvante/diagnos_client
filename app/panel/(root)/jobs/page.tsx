import Heading from "@/app/(global_components)/Heading";
import JobsList from "./JobsList";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Jobs() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Heading text="Sizning ishingiz" />
        <Link href={"/panel/jobs/request"} className="bg-violet-600 px-4 py-2 flex gap-3 text-white rounded-lg items-center justify-center">
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
