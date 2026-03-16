"use client";
import BackBtn from "@/app/(global_components)/BackBtn";
import Heading from "@/app/(global_components)/Heading";
import Spinner from "@/app/(global_components)/Spinner";
import vacancyService from "@/app/api/services/vacancyService";
import { Vacancy } from "@/app/types/User";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UpdateVacancyForm from "./UpdateVacancyForm";

export default function UpdateVacancyPage() {
  const { vacancies } = useSelector((state: any) => state.vacancy);
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);

  async function GetVacancy(id: number) {
    try {
      const res: any = await vacancyService.getById(id);
      const res_vacancy: Vacancy = res;
      setVacancy(res_vacancy);
    } catch (error) {
      router.push("/panel/vacancies");
    }
  }

  if (vacancies !== null) {
    useEffect(() => {
      setVacancy(
        vacancies.find((vacancy: Vacancy) => vacancy.id == Number(id))
      );
    }, []);
  } else {
    useEffect(() => {
      GetVacancy(Number(id));
    }, []);
  }

  if (!vacancy) {
    return (
      <div className="w-full h-80 flex justify-center items-center">
        <Spinner />
      </div>
    );
  } else {
    return (
      <div className="w-full space-y-5">
        <div className="flex w-full justify-between items-center">
          <Heading text="Vakansiyani yangilash" />
          <BackBtn href={`/panel/vacancies/${vacancy.id}`} />
        </div>
        <UpdateVacancyForm vacancy={vacancy} />
      </div>
    );
  }
}
