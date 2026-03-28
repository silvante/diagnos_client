"use client";
import Heading from "@/app/(global_components)/Heading";
import Spinner from "@/app//(global_components)/Spinner";
import vacancyService from "@/app/api/services/vacancyService";
import { Vacancy } from "@/app/types/User";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BackBtn from "@/app/(global_components)/BackBtn";
import VacancyDetails from "../../(components)/VacancyDetails";
import HireingForm from "../../(components)/HireingForm";

export default function VacancyAccessDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { a_id, unique_name } = params;
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);

  async function GetVacancy(a_id: string) {
    try {
      const res: any = await vacancyService.getByAccesId(a_id);
      const res_vacancy: Vacancy = res;
      setVacancy(res_vacancy);
    } catch (error) {
      router.push(`/org/${unique_name}/workers/employment`);
    }
  }

  useEffect(() => {
    GetVacancy(String(a_id));
  }, []);

  if (!vacancy) {
    return (
      <div className="w-full h-80 flex justify-center items-center">
        <Spinner />
      </div>
    );
  } else {
    return (
      <div className="space-y-5">
        <div className="w-full flex justify-between items-center">
          <Heading text={`Vakansiya - ${vacancy.id}`} />
          <BackBtn href={`/org/${unique_name}/workers/employment`} />
        </div>
        <VacancyDetails vacancy={vacancy} />
        <div className="w-full flex justify-center items-center">
          <Heading text="Ishga olmoqchimisiz?" />
        </div>
        <HireingForm vacancy={vacancy} />
      </div>
    );
  }
}
