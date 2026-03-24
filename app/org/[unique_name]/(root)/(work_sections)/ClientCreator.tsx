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
import { useEffect, useState } from "react";
import { pushClient, setLoading } from "@/app/store/slices/clientSlice";
import clientService from "@/app/api/services/clientService";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ClientCreator() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // dispatcher
  const dispatch = useDispatch();

  // selectors
  const { organization } = useSelector((state: any) => state.validator);

  // for formData
  const [name, setname] = useState("");
  const [surname, setsurname] = useState("");
  const [born_in, setborn_in] = useState("");
  const [origin, setorigin] = useState("");
  const [type_id, settype_id] = useState("");
  const [type_ids, settype_ids] = useState<number[]>([]);
  const [price, setprice] = useState("");

  // for clear form

  function ClearFields() {
    setname("");
    setsurname("");
    setborn_in("");
    setorigin("");
    settype_id("");
    settype_ids([]);
    setprice("");
  }

  useEffect(() => {
    const handleLockEvent = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key == "Delete") {
        ClearFields();
      }
    };

    window.addEventListener("keydown", handleLockEvent);
    return () => window.removeEventListener("keydown", handleLockEvent);
  }, []);

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
      if (formData.type_id === 0) {
        return setError(
          "Tur tanlashingiz kerak, agar mavjud bo'lmasa, yangisini yarating",
        );
      }
      const res: any = await clientService.createClient(
        organization.id,
        formData,
      );
      const new_client: Client = res;
      dispatch(pushClient(new_client));
      ClearFields();
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

  const { types, loading } = useSelector((state: any) => state.types);
  console.log(types);

  useEffect(() => {
    if (loading || !types) {
      return;
    }
    settype_ids([...type_ids, +type_id]);

    let added_type = types.find((t: Type) => t.id == +type_id);
    if (!added_type) return;
    setprice(String(price + added_type.price));

    settype_id("");
  }, [type_id]);

  console.log(type_id);
  console.log(type_ids);

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
                            setprice(
                              String(
                                valid_types.find(
                                  (type) => String(type.id) === id,
                                )?.price,
                              ),
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
              {isLoading ? "yaratilmoqda..." : "Mijozni qo'shish"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
