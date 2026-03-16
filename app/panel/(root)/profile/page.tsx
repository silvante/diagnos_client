"use client";
import Heading from "@/app/(global_components)/Heading";
import { Camera, KeyRound, Lock, Pen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useSelector } from "react-redux";
import ProfileActions from "./(profilesections)/ProfileActions";

export default function ProfilePage() {
  const { currentUser } = useSelector((state: any) => state.user);

  return (
    <div className="w-full">
      <Heading text="Sizning profilingiz" />
      <div className="w-full py-5 flex flex-col items-center justify-center gap-5">
        <div className="w-full flex">
          {/* Profile Card */}
          <div className="bg-white w-full flex flex-col md:flex-row md:items-center gap-5 rounded-xl border border-gray-300 p-5">
            <Link
              href="/panel/profile/settings"
              className="bg-gray-300 w-28 h-28 rounded-full overflow-hidden border border-gray-400 flex items-center justify-center mx-auto"
            >
              <Avatar className="w-full h-full text-3xl">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback>
                  {currentUser.name.split("")[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>

            <div className="flex-1 md:text-start text-center">
              <h2 className="font-semibold text-gray-900 text-2xl sm:text-3xl">
                {currentUser.name}
              </h2>

              <p className="text-gray-950">{currentUser.email}</p>

              <Link
                href="/panel/profile/settings"
                className="mt-5 flex items-center gap-2 text-violet-600 mx-auto justify-center md:justify-start"
              >
                Profilni yangilash <Pen size={15} />
              </Link>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-white w-full rounded-2xl border border-gray-300 p-4 md:p-8 space-y-6">
          <div className="space-y-2 border-b border-gray-300 pb-3">
            <p className="text-lg font-semibold text-gray-950">Foydalanuvchi nomi:</p>
            <p className="text-gray-950">
              <span className="text-gray-700">diagnos.uz/u/</span>@
              {currentUser.username}
            </p>
          </div>

          <div className="space-y-2 border-b border-gray-300 pb-3">
            <p className="text-lg font-semibold text-gray-950">Biografiya:</p>
            {currentUser.bio ? (
              <p className="text-gray-900">{currentUser.bio}</p>
            ) : (
              <Link
                href="/panel/profile/settings"
                className="flex items-center gap-2 text-violet-600"
              >
                Hozir qo'shishingiz mumkin <Pen size={15} />
              </Link>
            )}
          </div>

          <div className="space-y-2 border-b border-gray-300 pb-3">
            <p className="text-lg font-semibold text-gray-950">Aloqa:</p>
            {currentUser.contact ? (
              <p className="text-gray-900">{currentUser.contact}</p>
            ) : (
              <Link
                href="/panel/profile/settings"
                className="flex items-center gap-2 text-violet-600"
              >
                Hozir qo'shishingiz mumkin <Pen size={15} />
              </Link>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-lg font-semibold text-gray-950">Jami:</p>
            <p className="text-gray-900">
              {currentUser._count.organizations} tashkilotlar
            </p>
          </div>
        </div>

        <ProfileActions />
      </div>
    </div>
  );
}
