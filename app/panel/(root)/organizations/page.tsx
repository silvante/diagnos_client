import Heading from "@/app/(global_components)/Heading";
import OrganizationList from "./OrganizationList";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Organizations() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Heading text="Tashkilotlar" />
        <Link href={"/panel/organizations/new"} className="flex gap-2 bg-violet-600 px-3 py-2 text-white font-semibold rounded-xl hover:bg-violet-700 transition-colors">
          <p className="hidden md:flex">Yaratish</p> <Plus />
        </Link>
      </div>
      <OrganizationList />
    </div>
  );
}
