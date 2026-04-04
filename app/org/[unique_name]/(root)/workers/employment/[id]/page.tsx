"use client";
import Heading from "@/app/(global_components)/Heading";
import Spinner from "@/app//(global_components)/Spinner";
import { JoinRequest } from "@/app/types/User";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BackBtn from "@/app/(global_components)/BackBtn";
import HireingForm from "../(components)/HireingForm";
import VacancyDetails from "../(components)/ApplicantDetails";
import workerService from "@/app/api/services/workerService";
import { useSelector } from "react-redux";

export default function VacancyDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { id, unique_name } = params;
  const [joinReq, setJoinReq] = useState<JoinRequest | null>(null);
  const { organization } = useSelector((state: any) => state.validator);

  async function GetReq(id: number) {
    try {
      const res: any = await workerService.getJoinRequest(organization.id, id);
      const join_req: JoinRequest = res;
      setJoinReq(join_req);
    } catch (error) {
      router.push(`/org/${unique_name}/workers/employment`);
    }
  }

  useEffect(() => {
    GetReq(Number(id));
  }, []);

  if (!joinReq) {
    return (
      <div className="w-full h-80 flex justify-center items-center">
        <Spinner />
      </div>
    );
  } else {
    return (
      <div className="space-y-5">
        <div className="w-full flex justify-between items-center">
          <Heading text={`${joinReq.applicant.name}`} />
          <BackBtn href={`/org/${unique_name}/workers/employment`} />
        </div>
        <VacancyDetails applicant={joinReq.applicant} role={joinReq.role} />
        <div className="w-full flex justify-center items-center">
          <Heading text="Ishga olmoqchimisiz?" />
        </div>
        <HireingForm joinReq={joinReq} />
      </div>
    );
  }
}
