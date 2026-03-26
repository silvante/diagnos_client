"use client";

import { Check, ChevronsUpDown, Delete, ShieldAlert } from "lucide-react";

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
import { useEffect, useState } from "react";
import { replaceClient } from "@/app/store/slices/clientSlice";
import clientService from "@/app/api/services/clientService";
import { useParams, useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function UpdateClientForm() {
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

  const client: Client = clients.find(
    (client: Client) => client.id === Number(id),
  );

  const client_type_ids = client.diagnoses.map((d) => d.type_id);
  const client_types = types.filter((t: Type) =>
    client_type_ids.includes(t.id),
  );

  const [type_id, settype_id] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<any[]>(client_types);

  console.log(client_type_ids);
  console.log(client_types);
  console.log(selectedTypes);

  // for formData
  const [form, setForm] = useState({
    name: client.name,
    surname: client.surname,
    born_in: client.born_in,
    origin: client.origin,
    type_ids: client_type_ids as [number],
    price: "",
  });

  // Universal data handler
  function updateField(field: string, value: any) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  // submit form

  async function HandleCreateClient(e: any) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = {
        name: form.name,
        surname: form.surname,
        born_in: Number(form.born_in),
        origin: form.origin,
        type_ids: form.type_ids,
        price: Number(form.price),
      };
      const res: any = await clientService.updateClient(
        organization.id,
        client.id,
        formData,
      );
      const updated_client: Client = res;
      dispatch(replaceClient(updated_client));
      router.push(`/org/${organization.unique_name}`);
      setIsLoading(false);
      setError("");
    } catch (error: any) {
      if (!error.response) {
        setError(
          "Barcha maydonlarni to'g'ri to'ldirganingizga ishonch hosil qiling",
        );
      } else {
        setError(error.response.data.message);
      }
      setIsLoading(false);
    }
  }

  // add selected type
  useEffect(() => {
    if (loading || !types) {
      return;
    }

    if (type_id === "") {
      return;
    }

    let exists = selectedTypes.find((t) => t.id == +type_id);

    if (exists) {
      settype_id("");
      return;
    }

    let added_type = types.find((t: Type) => t.id == +type_id);
    console.log(added_type);

    setSelectedTypes([...selectedTypes, added_type]);
    settype_id("");
  }, [type_id]);

  // console.log(type_id);
  // console.log(selected_types);

  // remove selected type

  function RemoveSelectedType(id: number) {
    const new_selected_types = selectedTypes.filter((st) => st.id !== id);
    setSelectedTypes(new_selected_types);
  }

  // stabilize the form Type_IDS
  useEffect(() => {
    const ids = selectedTypes.map((st) => st.id);
    const prices = selectedTypes.map((st) => st.price);
    const sum = prices.reduce((total, num) => total + num, 0);

    updateField("type_ids", ids);
    updateField("price", sum);

    if (selectedTypes.length <= 0) {
      updateField("price", "");
    }
  }, [selectedTypes]);

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
      <div className="text-muted-foreground text-sm hidden lg:flex gap-2">
        <p>Formani tozalash</p>
        <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
          <span className="text-xs">Ctrl + Delete</span>
        </kbd>
      </div>
      {error !== "" && (
        <Alert variant="destructive">
          <ShieldAlert />
          <AlertTitle>Ogohlantirish</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form className="w-full" onSubmit={HandleCreateClient}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="flex flex-col space-y-1">
            <label htmlFor="name">Ism</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Mijoz ismi"
              className="global_input"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
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
              value={form.surname}
              onChange={(e) => updateField("surname", e.target.value)}
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
              value={form.born_in}
              onChange={(e) => updateField("born_in", e.target.value)}
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
              value={form.origin}
              onChange={(e) => updateField("origin", e.target.value)}
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
                <Command className="w-full">
                  <CommandInput
                    placeholder="Turni qidirish..."
                    className="h-9"
                  />
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
                            // setForm((prev) => ({
                            //   ...prev,
                            //   type_ids: [Number(id)] as [number],
                            // }));
                            // updateField(
                            //   "price",
                            //   String(
                            //     valid_types.find(
                            //       (type) => String(type.id) === id,
                            //     )?.price,
                            //   ),
                            // );
                            setOpen(false);
                          }}
                        >
                          {vt.name}
                          <Check
                            className={cn(
                              "ml-auto",
                              type_id === String(vt.id)
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {selectedTypes && selectedTypes.length > 0 && (
              <div className="px-3 border border-slate-400 rounded-lg">
                {selectedTypes.map((st) => (
                  <div
                    key={st.id}
                    className="py-2 border-b last:border-none border-slate-400 flex items-center justify-between"
                  >
                    <p>{st.name}</p>
                    <button
                      className="text-red-400 cursor-pointer"
                      onClick={() => RemoveSelectedType(st.id)}
                    >
                      <Delete />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="price">Narxi</label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Qancha to'landi"
              className="global_input"
              value={form.price}
              onChange={(e) => updateField("price", e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <button
              type="submit"
              className="w-full h-full bg-violet-600 text-white p-2 rounded-xl cursor-pointer"
            >
              {isLoading ? "yaratilmoqda..." : "Mijozni qo'shish"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
