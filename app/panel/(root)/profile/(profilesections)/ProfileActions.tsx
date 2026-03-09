"use client";
import Heading from "@/app/(global_components)/Heading";
import { LogOut, UserPen } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfileActions() {
  const router = useRouter();
  function HandleLogOut() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("reset_token");
    window.location.reload();
    router.push("/");
  }
  return (
    <div className="p-4 md:p-8 flex-1 rounded-2xl border border-gray-300 w-full space-y-5">
      <Heading text="Xavfli hudud" />
      <div className="flex gap-5 flex-wrap">
        <button
          onClick={HandleLogOut}
          className="bg-red-600/10 text-red-600 flex py-2 px-4 gap-2 items-center cursor-pointer rounded-lg hover:bg-red-600 hover:text-white transition-all"
        >
          <LogOut /> Chiqish
        </button>
        <Link
          href={"/signup"}
          className="bg-gray-600/10 text-gray-900 flex py-2 px-4 gap-2 items-center cursor-pointer rounded-lg hover:bg-orange-600 hover:text-white transition-all"
        >
          <UserPen /> Hisoblarni almashtirish
        </Link>
      </div>
    </div>
  );
}
