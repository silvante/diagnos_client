"use client";
import clientService from "@/app/api/services/clientService";
import { replaceClient } from "@/app/store/slices/clientSlice";
import { Client, Diagnosis, Organization } from "@/app/types/User";
import { Check, NotebookPen, ShieldAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function CheckClientForm({
  organization,
  client,
  diagnosis,
}: {
  organization: Organization;
  client: Client;
  diagnosis: Diagnosis;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState("");
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  if (diagnosis.is_checked) {
    return (
      <p>
        <span className="font-semibold">{diagnosis.type.name}: </span>
        {diagnosis.report}
      </p>
    );
  }

  async function CheckClient(e: any) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res: any = await clientService.checkClient(
        organization.id,
        client.id,
        diagnosis.id,
        report,
      );
      if (res.checked === true) {
        const checked_client: Client = res.client;
        dispatch(replaceClient(checked_client));
      }
    } catch (error: any) {
      if (!error.response) {
        setError("Ichki server xatosi, iltimos keyinroq qayta urinib ko'ring");
      } else {
        setError(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (error !== "") {
    return (
      <Alert variant="destructive">
        <ShieldAlert />
        <AlertTitle>Ogohlantirish</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  return (
    <form className="flex gap-3 items-center text_color" onSubmit={CheckClient}>
      <p>{diagnosis.type.name} Natijasi</p>
      <input
        type="text"
        name="report"
        id="report"
        placeholder="Diagnoz..."
        className="flex-1 global_input"
        maxLength={150}
        required
        value={report}
        onChange={(e) => setReport(e.target.value)}
      />
      <button className="bg-violet-600 py-2 px-4 text-white rounded-xl cursor-pointer flex gap-2 items-center">
        {isLoading ? (
          "tekshirilmoqda..."
        ) : (
          <p className="flex gap-2 items-center">
            Tekshirish <Check size={14} />
          </p>
        )}
      </button>
    </form>
  );
}
