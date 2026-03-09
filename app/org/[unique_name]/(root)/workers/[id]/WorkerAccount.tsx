"use client";
import Heading from "@/app/(global_components)/Heading";
import { Worker } from "@/app/types/User";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function WorkerAccount({ worker }: { worker: Worker }) {
  const account = worker.worker;
  return (
    <div className="rounded-2xl border border-gray-300 overflow-hidden">
      <div className="p-4 lg:p-8 border-b border-b-gray-300 space-y-5">
        <Avatar className="w-32 h-32">
          <AvatarImage src={account.avatar} />
          <AvatarFallback>
            {account.name.split("")[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="w-full">
          <h1 className="text-2xl font-semibold text_color truncate">
            {account.name}
          </h1>
          <p className="text-gray-700 truncate">{account.email}</p>
        </div>
      </div>
      <div className="p-4 lg:p-8 space-y-3">
        <h1 className="text-2xl font-semibold text_color">Ma'lumot</h1>
        <div className="w-full space-y-1">
          <p className="text-gray-700">
            foydalanuvchi nomi:{" "}
            <span className="text-gray-900 font-semibold">
              @{account.username}
            </span>
          </p>
          <p className="text-gray-700">
            bio:{" "}
            <span className="text-gray-900 font-semibold">
              {account.bio ? account.bio : "foydalanuvchida bio yo'q"}
            </span>
          </p>
          <p className="text-gray-700">
            aloqa:{" "}
            <span className="text-gray-900 font-semibold">
              {account.contact ? account.contact : "foydalanuvchida aloqa ma'lumoti yo'q"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}