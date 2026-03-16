"use client";
import Spinner from "@/app/(global_components)/Spinner";
import { Worker } from "@/app/types/User";
import { Check, Menu, Pin, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ErrorMessage from "@/app/(global_components)/ErrorMessage";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import { ShieldAlert } from "lucide-react";
import userService from "@/app/api/services/userService";
import { updateJob } from "@/app/store/slices/jobSlice";
import organizationService from "@/app/api/services/organizationService";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function JobsList() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [success, setSuccess] = useState("");
  const { currentJob, loading } = useSelector((state: any) => state.job);

  async function GetJob() {
    try {
      const res: any = await userService.getMyJobs();
      const theJob: Worker = res;

      dispatch(updateJob(theJob));
    } catch (error: any) {
      dispatch(updateJob(null));
    }
  }

  useEffect(() => {
    GetJob();
  }, []);

  async function MakeItDefault(unique_name: string) {
    setIsLoading(true);
    try {
      const res: any = await organizationService.setAsDefault(unique_name);
      if (res && res.success == true) {
        setError("");
        setSuccess("Tashkilot standart qilib belgilandi!");
      }
      setIsLoading(false);
    } catch (error: any) {
      if (!error.response) {
        setError("Barcha maydonlarni to'g'ri to'ldirganingizga ishonch hosil qiling!");
      } else {
        setError(error.response.data.message);
      }
      setIsLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="w-full h-80 flex justify-center items-center">
        <Spinner />
      </div>
    );
  } else {
    return (
      <div className="space-y-5">
        {error !== "" && (
          <Alert variant="destructive">
            <ShieldAlert />
            <AlertTitle>Ogohlantirish</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success !== "" && (
          <Alert variant="default" className="text-green-600">
            <Check />
            <AlertTitle>Muvaffaqiyat</AlertTitle>
            <AlertDescription className="text-green-600/70">
              {success}
            </AlertDescription>
          </Alert>
        )}
        {isLoading && (
          <div className="flex gap-2 items-center">
            <p>Standart qilib belgilanyapti</p>
            <Spinner />
          </div>
        )}
        {currentJob ? (
          <div className="bg-white rounded-md transition-colors border border-gray-300 flex flex-col border-b-2 border-b-gray-300 hover:border-b-violet-600">
            <div className="border-b border-gray-300 p-4 flex gap-3 items-center">
              <Avatar>
                <AvatarImage src={currentJob.worker.avatar} />
                <AvatarFallback>
                  {currentJob.worker.name.split("")[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <p className="text-xl font-semibold text_color">
                Ishlayapsiz{" "}
                <span className="text-violet-600">
                  {currentJob.role.toUpperCase()}
                </span>
              </p>
            </div>
            <Link href={`/job/${currentJob.organization.unique_name}`}>
              {currentJob.organization.logo && (
                <div className="border-b border-gray-300 p-4 flex flex-col gap-3 items-start">
                  <Image
                    src={currentJob.organization.logo}
                    alt={currentJob.organization.description}
                    width={0}
                    height={0}
                    className="w-auto h-10"
                  />
                </div>
              )}
              <div className="p-4 flex flex-col gap-1 items-start">
                <h3 className="text-xl font-semibold">
                  {currentJob.organization.name}
                </h3>
                <p className="text-sm text-gray-600">
                  <span className="text-black">Noyob nom: </span>@
                  {currentJob.organization.unique_name}
                </p>
              </div>
            </Link>
            <div className="border-gray-200 p-4 flex flex-col items-start gap-2 md:flex-row md:justify-between md:items-center border-t">
              <p className="text-sm text-gray-500">
                <span className="text-black">yaratilgan sana:</span>{" "}
                {new Date(
                  currentJob.organization.created_at
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-sm text-green-600">
                <span className="text-black">holat:</span> faol
              </p>
              <p className="text-sm text-gray-500">
                <span className="text-black">pinkod:</span> mavjud
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex gap-2 bg-violet-600 px-1 py-1 text-white font-semibold rounded-md hover:bg-violet-700 transition-colors">
                  <Menu />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <button
                    onClick={() =>
                      MakeItDefault(currentJob.organization.unique_name)
                    }
                    className="w-full"
                  >
                    <DropdownMenuItem>
                      <Pin /> Standart qilib belgilash
                    </DropdownMenuItem>
                  </button>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ) : (
          <ErrorMessage
            text="Sizda hozir ish yo'q"
            desc="ishga kirganingizda u shu yerda paydo bo'ladi"
          />
        )}
      </div>
    );
  }
}
