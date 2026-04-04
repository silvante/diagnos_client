"use client";
import { Type, Worker } from "@/app/types/User";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import EmptyList from "@/app/lottie/EmptyList";
import OrgLink from "@/app/org/(components)/(meta-components)/OrgLink";
import { Settings } from "lucide-react";

type Props = {
  worker: Worker;
  children: React.ReactNode;
};

export default function ViewWorkerDetails({ worker, children }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader className="w-full flex">
          <SheetTitle className="w-full truncate">{worker.role}</SheetTitle>
          <SheetDescription>Ishchi hisobi</SheetDescription>
        </SheetHeader>
        <div className="w-full px-5 flex justify-center items-center flex-col space-y-4">
          <Avatar className="w-32 h-32">
            <AvatarImage src={worker.worker.avatar} />
            <AvatarFallback>
              {worker.worker.name.split("")[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="w-full text-center">
            <p className="w-full truncate text_color font-semibold text-lg">
              {worker.worker.name}
            </p>
            <p className="w-full truncate text_color text-sm">
              {worker.worker.email}
            </p>
          </div>
        </div>
        <div className="w-full px-5 flex flex-col space-y-2">
          <SheetDescription className="font-semibold text-black text-md">
            Boshqa ma'lumotlar
          </SheetDescription>
          <div className="space-y-1 w-full">
            <p className="text_color font-semibold w-full truncate">
              <span className="font-medium">telefon raqami:</span>{" "}
              {worker.worker.contact}
            </p>
            <p className="text_color font-semibold w-full truncate">
              <span className="font-medium">foydalanuvchi nomi:</span> @
              {worker.worker.username}
            </p>
            {worker.role === "doctor" && (
              <p className="text_color font-semibold w-full truncate">
                <span className="font-medium">jami: </span>
                {worker.attached_types.length} tur
              </p>
            )}
          </div>
        </div>
        <div className="w-full px-5">
          <SheetDescription className="font-semibold text-black text-md">
            Biriktirilgan turlar
          </SheetDescription>
        </div>
        <div className="w-full px-5 flex-1 overflow-scroll border-b border-gray-300">
          {worker.role === "doctor" ? (
            <div className="w-full space-y-2">
              {worker.attached_types.map((at: any) => {
                return (
                  <div
                    key={at.id}
                    className="w-full p-4 rounded-xl border border-gray-300"
                  >
                    {" "}
                    <p className="font-semibold text_color text-lg">
                      {at.type.name}
                    </p>
                    <p className="text_color font-semibold">
                      <span className="font-medium">tavsif: </span>
                      {at.type.description}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center flex-col">
              <EmptyList width={32} />
              <div className="w-full text-center">
                <p className="text_color text-lg font-semibold w-full truncate">
                  Turlar mavjud emas
                </p>
                <p className="text_color w-full truncate">
                  Faqat shifokorlarda mavjud
                </p>
              </div>
            </div>
          )}
        </div>
        <SheetFooter>
          <div className="flex justify-between gap-3">
            <SheetClose
              asChild
              className="flex gap-2 items-center justify-center flex-1 border border-gray-300 rounded-lg hover:text-white hover:bg-violet-600 hover:border-violet-600"
            >
              <OrgLink href={`/workers/${worker.id}`} className="">
                <Settings /> <p>Sozlamalar</p>
              </OrgLink>
            </SheetClose>
            <SheetClose
              asChild
              className="flex-1 bg-gray-900 text-white border-none hover:bg-gray-950 hover:text-white cursor-pointer"
            >
              <Button variant="outline">Yopish</Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
