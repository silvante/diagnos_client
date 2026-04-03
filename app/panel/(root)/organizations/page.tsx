import Heading from "@/app/(global_components)/Heading";
import OrganizationList from "./OrganizationList";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Organizations() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Heading text="Tashkilotlar" />
        <Link href={"/panel/organizations/new"} className="bg-violet-600 px-4 py-2 flex gap-3 text-white rounded-lg items-center justify-center">
          <p className="hidden md:flex">Yaratish</p> <Plus />
        </Link>
      </div>
      <OrganizationList />
    </div>
  );
}
