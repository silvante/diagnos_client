"use client";
import Heading from "@/app/(global_components)/Heading";
import { Socials } from "@/app/global/data";
import profile from "@/public/icons/profile.svg";
import {
  BookMarked,
  HandHeart,
  MessageCircleMore,
  Podcast,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Community() {
  const path = usePathname();
  console.log(path);

  return (
    <div className="space-y-8">
      {path !== "/" && (
        <div className="flex items-center justify-center py-5">
          <Image
            src={profile}
            alt="Diagnos Uz Community icons"
            width={200}
            height={200}
            className="rounded-full"
          />
        </div>
      )}
      <div className="flex items-center justify-center text-center">
        <Heading text="Diagnos Uz jamiatiga xush kelibsiz" />
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
        <div
          className={`rounded-xl flex items-center justify-between border border-gray-300 p-5 ${path !== "/" && "border-b-2 border-b-violet-600"
            }`}
        >
          <div className="flex-1 space-y-2">
            <Heading text="Qo'llab-quvvatlash" />
            <p className="text-gray-600">Yaratuvchilardan yordam</p>
          </div>
          <div className="text-violet-600">
            <HandHeart size={50} />
          </div>
        </div>
        <div
          className={`rounded-xl flex items-center justify-between border border-gray-300 p-5 ${path !== "/" && "border-b-2 border-b-violet-600"
            }`}
        >
          <div className="flex-1 space-y-2">
            <Heading text="Savol-javob efirlari" />
            <p className="text-gray-600">Istagan vaqtingizda jonli efir</p>
          </div>
          <div className="text-violet-600">
            <Podcast size={50} />
          </div>
        </div>
        <div
          className={`rounded-xl flex items-center justify-between border border-gray-300 p-5 ${path !== "/" && "border-b-2 border-b-violet-600"
            }`}
        >
          <div className="flex-1 space-y-2">
            <Heading text="Qo'llanmalar" />
            <p className="text-gray-600">YouTube'dagi darsliklar</p>
          </div>
          <div className="text-violet-600">
            <BookMarked size={50} />
          </div>
        </div>
        <div
          className={`rounded-xl flex items-center justify-between border border-gray-300 p-5 ${path !== "/" && "border-b-2 border-b-violet-600"
            }`}
        >
          <div className="flex-1 space-y-2">
            <Heading text="Jonli chat" />
            <p className="text-gray-600">Boshqa foydalanuvchilar bilan suhbat</p>
          </div>
          <div className="text-violet-600">
            <MessageCircleMore size={50} />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Heading text="O'z o'rningizni egallang" />
      </div>
      <div className="flex flex-wrap w-full items-center justify-center gap-4">
        {Socials.map((app: any) => {
          return (
            <Link
              href={app.url}
              target="_blanck"
              key={app.id}
              className="rounded-md border border-gray-300 text_color p-2 flex gap-2 pr-3"
            >
              <Image src={app.icon} alt={app.name} width={20} height={20} />
              <p>{app.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
