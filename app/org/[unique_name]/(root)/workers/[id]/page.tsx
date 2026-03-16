"use client";
import BackBtn from "@/app/(global_components)/BackBtn";
import Heading from "@/app/(global_components)/Heading";
import Spinner from "@/app/(global_components)/Spinner";
import workerService from "@/app/api/services/workerService";
import { Worker } from "@/app/types/User";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WorkerAccount from "./WorkerAccount";
import UpdateWorkerForm from "./UpdateWorkerSection";
import WorkersDangerZone from "./WorkersDangerZone";

export default function WorkerSettings() {
  const { workers } = useSelector((state: any) => state.worker);
  const { organization } = useSelector((state: any) => state.validator);
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [worker, setWorker] = useState<Worker | null>(null);

  async function GetWorker(id: number) {
    try {
      const res: any = await workerService.getById(organization.id, id);
      const res_worker: Worker = res;
      setWorker(res_worker);
    } catch (error) {
      router.push(`/org/${organization.unique_name}/workers`);
    }
  }

  if (workers) {
    useEffect(() => {
      setWorker(workers.find((worker: Worker) => worker.id == Number(id)));
    }, []);
  } else {
    useEffect(() => {
      GetWorker(Number(id));
    }, []);
  }

  if (!worker) {
    return (
      <div className="w-full h-80 flex justify-center items-center">
        <Spinner />
      </div>
    );
  } else {
    return (
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <Heading text="Ishchi sozlamalari" />
          <BackBtn href={`/org/${organization.unique_name}/workers`} />
        </div>
        <h2 className="text_color font-semibold text-xl">Hisob</h2>
        <WorkerAccount worker={worker} />
        <h2 className="text_color font-semibold text-xl">Ishchini yangilash</h2>
        <UpdateWorkerForm worker={worker} />
        <h2 className="text-red-500 font-semibold text-xl">Xavfli hudud</h2>
        <WorkersDangerZone worker={worker} />
      </div>
    );
  }
}