"use client";

import { Check, ChevronsUpDown, ShieldAlert } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/app/(global_components)/Spinner";
import { Client, Type } from "@/app/types/User";
import { useState } from "react";
import { replaceClient } from "@/app/store/slices/clientSlice";
import clientService from "@/app/api/services/clientService";
import { useParams, useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function JobUpdateClientForm() {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // dispatcher
  const dispatch = useDispatch();

  // selectors
  const { organization } = useSelector((state: any) => state.validator);
  const { types, loading } = useSelector((state: any) => state.types);
  const { clients, is_loading } = useSelector((state: any) => state.client);

  if (loading || is_loading) {
    return (
      <div className="w-full py-10 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const client = clients.find((client: Client) => client.id === Number(id));
  const type = types.find((type: Type) => type.id === client.type_id);

  // for formData
  const [name, setname] = useState(client.name);
  const [surname, setsurname] = useState(client.surname);
  const [born_in, setborn_in] = useState(client.born_in);
  const [origin, setorigin] = useState(client.origin);
  const [type_id, settype_id] = useState(`${type.id}`);
  const [price, setprice] = useState(client.price);

  // submit form

  async function HandleCreateClient(e: any) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = {
        name,
        surname,
        born_in: Number(born_in),
        origin,
        type_id: Number(type_id),
        price: Number(price),
      };
      const res: any = await clientService.updateClient(
        organization.id,
        client.id,
        formData
      );
      const updated_client: Client = res;
      dispatch(replaceClient(updated_client));
      router.push(`/job/${organization.unique_name}`);
      setIsLoading(false);
      setError("");
    } catch (error: any) {
      if (!error.response) {
        setError("Barcha maydonlarni to'g'ri to'ldirganingizga ishonch hosil qiling");
      } else {
        setError(error.response.data.message);
      }
      setIsLoading(false);
    }
  }

  // types
  const valid_types: Type[] = types;
  if (loading) {
    return (
      <div className="w-full py-10 flex items-center justify-between">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="text-muted-foreground text-sm flex gap-2">
        <p>Mijozni faqat tekshirishdan oldin yangilashingiz mumkin</p>
      </div>
      {error !== "" && (
        <Alert variant="destructive">
          <ShieldAlert />
          <AlertTitle>Ogohlantirish</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form className="w-full" onSubmit={HandleCreateClient}>
        <div className="grid grid-cols-3 gap-5">
          <div className="flex flex-col space-y-1">
            <label htmlFor="name">Ism</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Mijoz ismi"
              className="global_input"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="surname">Familiya</label>
            <input
              type="text"
              name="surname"
              id="surname"
              placeholder="Mijoz familiyasi"
              className="global_input"
              value={surname}
              onChange={(e) => setsurname(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="born_in">Yil</label>
            <input
              type="number"
              name="born_in"
              id="born_in"
              placeholder="Mijozning tug'ilgan yili"
              className="global_input"
              value={born_in}
              onChange={(e) => setborn_in(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="origin">Manzil</label>
            <input
              type="text"
              name="origin"
              id="origin"
              placeholder="Mijozning tug'ilgan shahri"
              className="global_input"
              value={origin}
              onChange={(e) => setorigin(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="type">Turi</label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="justify-between global_input w-full"
                >
                  <p>
                    {type_id
                      ? valid_types.find((vt) => String(vt.id) === type_id)
                          ?.name
                      : "Tur tanlang..."}
                  </p>
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput placeholder="Turni qidirish..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>Turlar topilmadi.</CommandEmpty>
                    <CommandGroup>
                      {valid_types.map((vt) => (
                        <CommandItem
                          key={vt.id}
                          value={String(`${vt.id}#${vt.name}`)}
                          onSelect={(currentValue) => {
                            const id = currentValue.split("#")[0];
                            settype_id(id === type_id ? "" : id);
                            setprice(
                              String(
                                valid_types.find(
                                  (type) => String(type.id) === id
                                )?.price
                              )
                            );
                            setOpen(false);
                          }}
                        >
                          {vt.name}
                          <Check
                            className={cn(
                              "ml-auto",
                              type_id === String(vt.id)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="price">Narxi</label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Qancha to'landi"
              className="global_input"
              value={price}
              onChange={(e) => setprice(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <button
              type="submit"
              className="w-full h-full bg-violet-600 text-white p-2 rounded-xl cursor-pointer"
            >
              {isLoading ? "yangilanmoqda..." : "Mijozni yangilash"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
