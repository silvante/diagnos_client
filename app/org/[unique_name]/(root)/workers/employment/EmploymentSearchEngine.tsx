"use client";
import vacancyService from "@/app/api/services/vacancyService";
import { origins, workerRoles } from "@/app/global/data";
import { Organization, Vacancy } from "@/app/types/User";
import { useEffect, useState } from "react";
import VacancyCard from "./VacancyCard";
import ErrorMessage from "@/app/(global_components)/ErrorMessage";
import { HashLoader } from "react-spinners";
import { ShieldAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function EmpSearchEngine({
  organization,
}: {
  organization: Organization;
}) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [origin, setOrigin] = useState(organization.origin);
  const [role, setRole] = useState(workerRoles[0].name);
  const [job, setJob] = useState("");
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [meta, setMeta] = useState({ total: 0, page: 1, last_page: 1 });
  const [vacancies, setVacancies] = useState([]);

  async function GetVacancies() {
    setIsLoading(true);
    try {
      const res: any = await vacancyService.search(
        origin,
        query,
        role,
        job,
        page,
        9
      );
      const { data, meta } = res;
      setVacancies(data);
      setMeta(meta);
      setError("");
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

  function HandleSearch(e: any) {
    e.preventDefault();
    setPage(1);
    GetVacancies();
  }

  useEffect(() => {
    GetVacancies();
  }, [origin, page]);

  return (
    <div className="space-y-8">
      <div className="p-5 bg-white border border-gray-300 rounded-2xl space-y-5">
        {error !== "" && (
          <Alert variant="destructive">
            <ShieldAlert />
            <AlertTitle>Ogohlantirish</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form className="w-full gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" onSubmit={HandleSearch}>
          <div className="flex flex-col space-y-1">
            <label htmlFor="job">Viloyat</label>
            <select
              className="global_input"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            >
              {origins.map((origin) => {
                return (
                  <option key={origin.id} value={origin.name}>
                    {origin.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="job">Rol</label>
            <select
              className="global_input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {workerRoles.map((w) => {
                return (
                  <option key={w.id} value={w.name}>
                    {w.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="job">Ism</label>
            <input
              type="text"
              name="query"
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="global_input"
              placeholder="Ism bo'yicha qidirish..."
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="job">Kasb</label>
            <input
              type="text"
              name="job"
              id="job"
              placeholder="Ishchi kasbi"
              className="global_input"
              value={job}
              onChange={(e) => setJob(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="job">Trasdiqlang</label>
            <button
              className="py-2 text-center px-4 rounded-lg bg-violet-600 text-white cursor-pointer"
              type="submit"
            >
              {isLoading ? "qidirilmoqda..." : "Qidirish"}
            </button>
          </div>
        </form>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <HashLoader color="#7c3aed" size={58} />
        </div>
      ) : (
        <div className="w-full">
          {vacancies && vacancies.length > 0 ? (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {vacancies.map((vacancy: Vacancy) => (
                <VacancyCard
                  key={vacancy.id}
                  vacancy={vacancy}
                  organization={organization}
                />
              ))}
            </div>
          ) : (
            <ErrorMessage
              text="Bo'sh ish o'rinlari topilmadi!"
              desc="boshqa narsani sinab ko'ring"
            />
          )}
        </div>
      )}
      <div className="w-full flex justify-center items-center">
        <div className="flex gap-5 justify-center items-center">
          <button
            className={`${
              page <= 1 && "opacity-50"
            } border-gray-300 border text-gray-800 py-2 px-4 rounded-full cursor-pointer hover:text-white hover:bg-violet-600 hover:border-violet-600 transition-all`}
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            Oldingi
          </button>
          <h3>
            {page} / {meta.last_page}
          </h3>
          <button
            className={`${
              page >= meta.last_page && "opacity-50"
            } border-gray-300 border text-gray-800 py-2 px-4 rounded-full cursor-pointer hover:text-white hover:bg-violet-600 hover:border-violet-600 transition-all`}
            disabled={page >= meta.last_page}
            onClick={() => setPage(page + 1)}
          >
            Keyingi
          </button>
        </div>
      </div>
    </div>
  );
}