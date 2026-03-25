"use client";
import { Client, Organization } from "@/app/types/User";
import { useEffect, useState } from "react";
import ErrorMessage from "@/app/(global_components)/ErrorMessage";
import { HashLoader } from "react-spinners";
import { ShieldAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ClientCard from "./(meta)/Client";
import clientService from "@/app/api/services/clientService";
import TypeInput from "./(meta)/TypeInput";

export default function ClientSearchEngine({
  organization,
}: {
  organization: Organization;
}) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [origin] = useState(organization.origin);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ total: 0, page: 1, last_page: 1 });
  const [clients, setClients] = useState([]);

  // form-data
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [born_in, setBornIn] = useState("");
  const [type_id, setTypeId] = useState("");

  async function GetClients() {
    setIsLoading(true);
    try {
      const born_in_valid = born_in !== "" ? +born_in : undefined;
      const type_id_valid = type_id !== "" ? +type_id : undefined;
      const res: any = await clientService.search(
        organization.id,
        page,
        10,
        name,
        surname,
        born_in_valid,
        type_id_valid
      );
      const { data, meta } = res;
      setClients(data);
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
    GetClients();
  }

  useEffect(() => {
    GetClients();
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
        <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={HandleSearch}>
          <div className="w-full flex flex-col space-y-1 justify-between">
            <label htmlFor="type_id">turi</label>
            <TypeInput
              setTypeId={setTypeId}
              organization={organization}
              setError={setError}
            />
          </div>
          <div className="w-full flex flex-col space-y-1">
            <label htmlFor="born_in">tug'ilgan yili</label>
            <input
              type="number"
              name="born_in"
              id="born_in"
              value={born_in}
              onChange={(e) => setBornIn(e.target.value)}
              className="global_input"
              placeholder="Tug'ilgan yil bo'yicha qidirish..."
            />
          </div>
          <div className="w-full flex flex-col space-y-1">
            <label htmlFor="name">ism</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="global_input"
              autoFocus
              placeholder="Ism bo'yicha qidirish..."
            />
          </div>
          <div className="w-full flex flex-col space-y-1">
            <label htmlFor="surname">familiya</label>
            <input
              type="text"
              name="surname"
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="global_input"
              placeholder="Familiya bo'yicha qidirish..."
            />
          </div>
          <button
            className="py-2 text-center rounded-lg bg-violet-600 text-white cursor-pointer"
            type="submit"
          >
            {isLoading ? "qidirilmoqda..." : "Qidirish"}
          </button>
        </form>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <HashLoader color="#7c3aed" size={58} />
        </div>
      ) : (
        <div className="w-full p-2 md:p-5 rounded-xl border border-gray-300 bg-gray-100">
          {clients && clients.length > 0 ? (
            <div className="w-full space-y-5">
              {clients.map((client: Client) => (
                <ClientCard key={client.id} client={client} />
              ))}
            </div>
          ) : (
            <ErrorMessage
              text="Mijozlar topilmadi!"
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
