"use client";
import Heading from "@/app/(global_components)/Heading";
import { workerRoles } from "@/app/global/data";
import { Type, Worker } from "@/app/types/User";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MailWarning, ShieldAlert, Terminal, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import typeService from "@/app/api/services/typeService";
import { updateTypes } from "@/app/store/slices/typesSlice";

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
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import workerService from "@/app/api/services/workerService";
import { replaceWorker } from "@/app/store/slices/workerSlice";

export default function UpdateWorkerForm({ worker }: { worker: Worker }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const currentWorkerRole = workerRoles.find(
    (role) => role.name === worker.role
  );
  const [currentRole, setCurrentRole] = useState(
    currentWorkerRole ? currentWorkerRole : workerRoles[0]
  );
  const [open, setOpen] = useState(false);
  const [acception, setAcception] = useState(false);
  const router = useRouter();

  // from redux
  const { organization } = useSelector((state: any) => state.validator);
  const { types } = useSelector((state: any) => state.types);
  const valid_types: Type[] = types;
  const [type_id, settype_id] = useState("");
  const dispatch = useDispatch();

  // formData
  const [attached_types, setAttachedTypes] = useState<number[]>(
    worker.role == "doctor" ? worker.attached_types.map((at) => at.type.id) : []
  );
  const [role, setRole] = useState(worker.role);

  const [selectedTypes, setSelectedTypes] = useState<Type[]>(
    worker.role == "doctor" ? worker.attached_types.map((at) => at.type) : []
  );

  useEffect(() => {
    const type = valid_types.find((t) => t.id === Number(type_id));
    const existing = attached_types.find((at) => at == Number(type_id));
    if (type && !existing) {
      setSelectedTypes([...selectedTypes, type]);
      setAttachedTypes([...attached_types, type.id]);
      settype_id("");
    } else {
      settype_id("");
    }
  }, [type_id]);

  function DeleteType(id: number) {
    const new_arr = attached_types.filter((at) => at !== id);
    setAttachedTypes(new_arr);

    const new_arr2 = selectedTypes.filter((st) => st.id !== id);
    setSelectedTypes(new_arr2);
  }

  // extra
  const handleCheckbox = (check: boolean) => {
    setAcception(check);
  };

  useEffect(() => {
    const current_role = workerRoles.find((wr) => wr.name == role);
    if (current_role) {
      setCurrentRole(current_role);
    }
  }, [role]);

  if (!types) {
    async function GetTypes() {
      try {
        const response: any = await typeService.getTypes(organization.id);
        const types: Type[] = response;
        dispatch(updateTypes(types));
      } catch (error) {
        setError("turlarni yuklashda xatolik yuz berdi, iltimos keyinroq qayta urining");
      }
    }

    useEffect(() => {
      GetTypes();
    }, []);
  }

  async function HandleUpdate(e: any) {
    e.preventDefault();
    try {
      const form_data = {
        role,
        attached_types,
      };
      if (!acception) {
        return setError("Davom etish uchun shartlarni o'qing va qabul qiling!");
      }
      const res: any = await workerService.update(
        organization.id,
        worker.id,
        form_data
      );
      const res_worker: Worker = res;
      dispatch(replaceWorker(res_worker));
      setError("");
      setSuccess(`Ishchi muvaffaqiyatli yangilandi ${res_worker.role}!`);
    } catch (error: any) {
      if (!error.response) {
        setError("Barcha maydonlarni to'g'ri to'ldirganingizga ishonch hosil qiling!");
      } else {
        setError(error.response.data.message);
      }
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full rounded-2xl p-4 lg:p-8 space-y-5 bg-white border border-gray-300">
      <Heading text="Formani to'ldiring!" />
      <form className="space-y-5" onSubmit={HandleUpdate}>
        {error !== "" && (
          <Alert variant="destructive">
            <ShieldAlert />
            <AlertTitle>Ogohlantirish</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success !== "" && (
          <Alert variant="default" className="text-green-600">
            <Check />
            <AlertTitle>Muvaffaqiyat</AlertTitle>
            <AlertDescription className="text-green-600/70">
              {success}
            </AlertDescription>
          </Alert>
        )}
        <Alert variant="default">
          <MailWarning />
          <AlertTitle>"{currentRole.name}" roli ning shartlari!</AlertTitle>
          <AlertDescription>{currentRole.terms}</AlertDescription>
        </Alert>
        <div className="space-y-2 flex flex-col">
          <label htmlFor="role">Ishchi roli*</label>
          <select
            name="role"
            id="role"
            className="global_input"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            {workerRoles.map((r) => {
              return (
                <option key={r.id} value={r.name}>
                  {r.name}
                </option>
              );
            })}
          </select>
        </div>
        {currentRole.include_types && (
          <div className="flex flex-col space-y-1">
            <label htmlFor="type">Biriktirilgan turlar (shifokor uchun)*</label>
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
                      : "Turni tanlang..."}
                  </p>
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput placeholder="Turni qidirish..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>Hech qanday tur topilmadi.</CommandEmpty>
                    <CommandGroup>
                      {valid_types.map((vt) => (
                        <CommandItem
                          key={vt.id}
                          value={String(`${vt.id}#${vt.name}`)}
                          onSelect={(currentValue) => {
                            const id = currentValue.split("#")[0];
                            settype_id(id === type_id ? "" : id);
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
            <div>
              <p>Tanlangan turlar</p>
              <div className="py-2 flex gap-2">
                {selectedTypes.map((st) => {
                  return (
                    <div
                      key={st.id}
                      className="flex gap-3 p-1 items-center rounded-full pl-3 border border-gray-300"
                    >
                      <p>{st.name}</p>
                      <button
                        className="rounded-full border border-gray-300 cursor-pointer p-1"
                        type="button"
                        onClick={() => DeleteType(st.id)}
                      >
                        <X size={15} />
                      </button>
                    </div>
                  );
                })}
                {selectedTypes.length <= 0 && (
                  <p className="text-gray-950/50">
                    Iltimos, biriktirish uchun turlarni tanlang...
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="flex gap-2 items-center">
          <Checkbox
            id="check"
            checked={acception}
            onCheckedChange={handleCheckbox}
            className="border-gray-400 data-[state=checked]:bg-violet-600 data-[state=checked]:text-white data-[state=checked]:border-violet-600"
          />
          <label htmlFor="check">
            Men joriy ishchi rolining shartlarini o'qidim
          </label>
        </div>
        <div>
          <button
            type="submit"
            className="bg-violet-600 text-white py-2 px-5 rounded-md hover:bg-violet-700 transition-colors cursor-pointer"
          >
            {!isLoading ? `${currentRole.name} sifatida yangilash` : "yangilanmoqda..."}
          </button>
        </div>
      </form>
    </div>
  );
}