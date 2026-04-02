"use client";
import workerService from "@/app/api/services/workerService";
import { updateWorkers } from "@/app/store/slices/workerSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Worker } from "@/app/types/User";
import Spinner from "@/app/(global_components)/Spinner";
import ErrorMessage from "@/app/(global_components)/ErrorMessage";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Settings, ShieldAlert } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Menu } from "lucide-react";
import OrgLink from "@/app/org/(components)/(meta-components)/OrgLink";
import OverallWorkers from "./OverallWorkers";
import ViewWorkerDetails from "./(components)/ViewWrokerDetails";
import GettingJoinRequests from "./GettingJoinRequests";

export default function WorkersList() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { workers, loading } = useSelector((state: any) => state.worker);
  const { organization } = useSelector((state: any) => state.validator);
  const dispatch = useDispatch();
  async function getTypes() {
    try {
      if (workers) {
        return;
      } else {
        const response: any = await workerService.getAll(organization.id);
        const res_workers: Worker[] = response;
        dispatch(updateWorkers(res_workers));
      }
    } catch (error: any) {
      setError("Ishchilarni olishda xatolik:" + error.message);
    }
  }

  useEffect(() => {
    getTypes();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-80 flex justify-center items-center">
        <Spinner />
      </div>
    );
  } else {
    return (
      <>
        {workers && workers.length > 0 ? (
          <div className="space-y-5">
            <OverallWorkers workers={workers} />
            <h3 className="text-xl font-semibold text_color">
              Ishchilar ro'yxati
            </h3>
            {error !== "" && (
              <Alert variant="destructive">
                <ShieldAlert />
                <AlertTitle>Ogohlantirish</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {isLoading && (
              <div className="flex gap-2 items-center">
                <p>Yuklanmoqda </p>
                <Spinner />
              </div>
            )}
            <div className="grid w-full gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {workers.map((worker: Worker) => {
                return (
                  <div
                    key={worker.id}
                    className="flex flex-col border border-gray-300 rounded-xl bg-white overflow-hidden"
                  >
                    <div className="p-5 border-b border-gray-300 flex flex-col justify-center items-center gap-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={worker.worker.avatar} />
                        <AvatarFallback>
                          {worker.worker.name.split("")[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-center w-full">
                        <h3 className="w-full truncate text-center text-lg text_color font-semibold">
                          {worker.worker.name}
                        </h3>
                        <p className="w-full truncate text-center text-sm text-gray-700">
                          @{worker.worker.username}
                        </p>
                      </div>
                    </div>
                    <div className="p-3 flex justify-between items-center">
                      <p className="text_color font-semibold">{worker.role}</p>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex gap-2 bg-violet-600/10 px-1 py-1 text_color font-semibold rounded-md hover:bg-violet-700/20 cursor-pointer transition-colors">
                          <Menu />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                          >
                            <ViewWorkerDetails worker={worker}>
                              <div className="cursor-pointer rounded-lg w-full flex gap-2">
                                <Eye /> <p>Tafsilotlarni ko'rish</p>
                              </div>
                            </ViewWorkerDetails>
                          </DropdownMenuItem>
                          <OrgLink href={`/workers/${worker.id}`} className="">
                            <DropdownMenuItem className="cursor-pointer">
                              <Settings /> Sozlamalar
                            </DropdownMenuItem>
                          </OrgLink>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <ErrorMessage
            text="Hozircha ishchilar yo'q"
            desc="Hozir ishga olishingiz mumkin"
          />
        )}
      </>
    );
  }
}
