"use client";
import Heading from "@/app/(global_components)/Heading";
import vacancyService from "@/app/api/services/vacancyService";
import { Organization, Vacancy } from "@/app/types/User";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert } from "lucide-react";

export default function AccessIdForm({ org }: { org: Organization }) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [aId, setAId] = useState("");

  async function FindByAccessID(e: any) {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (aId == "") {
        setError("ID ni toliq kirgizing");
      }
      const a_id = aId.toUpperCase();
      const res: any = await vacancyService.getByAccesId(a_id);
      const vacancy: Vacancy = res;

      router.push(`/org/justfortest/workers/employment/access/${vacancy.a_id}`);

      setError("");
    } catch (error: any) {
      if (!error.response) {
        setError("Vakansiya topilmadi!");
      } else {
        setError(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-5 bg-white border border-gray-300 rounded-2xl space-y-5">
      <Heading text="ID orqali" />
      {error !== "" && (
        <Alert variant="destructive">
          <ShieldAlert />
          <AlertTitle>Ogohlantirish</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={FindByAccessID}>
        <div className="flex gap-4">
          <div className="rounded-lg flex-1 bg-white border border-slate-400 shadow-sm shadow-slate-100 focus:border-violet-600 transition-all flex">
            <label htmlFor="a_id" className="py-2 px-4">
              ID:
            </label>
            <input
              type="string"
              name="a_id"
              required
              placeholder="XXXXXXXX"
              maxLength={8}
              minLength={8}
              className="outline-none py-2 flex-1"
              value={aId}
              onChange={(e) => setAId(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="py-2 text-center px-8 rounded-lg bg-violet-600 text-white cursor-pointer"
          >
            {isLoading ? "qidirilmoqda..." : "Qidirish"}
          </button>
        </div>
      </form>
    </div>
  );
}
