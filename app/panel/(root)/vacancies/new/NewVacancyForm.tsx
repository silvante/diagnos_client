"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Vacancy } from "@/app/types/User";
import { useRouter } from "next/navigation";
import vacancyService from "@/app/api/services/vacancyService";
import { origins, workerRoles } from "@/app/global/data";
import { ShieldAlert, UserCircle } from "lucide-react";
import { pushVacancy, setLoading } from "@/app/store/slices/vacancySlice";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NewVacancyForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useSelector((state: any) => state.user);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  // phone number formatter
  const formatPhone = (value: string) => {
    let digits = value.replace(/\D/g, ""); // faqat raqamlar
    if (!digits.startsWith("998")) {
      digits = "998" + digits; // avtomatik 998 boshida bo'lishi
    }
    digits = digits.slice(0, 12); // 998 + 9 raqam
    let formatted = "+998 ";
    if (digits.length > 3) formatted += digits.slice(3, 5);
    if (digits.length >= 5) formatted += " " + digits.slice(5, 8);
    if (digits.length >= 8) formatted += " " + digits.slice(8, 10);
    if (digits.length >= 10) formatted += " " + digits.slice(10, 12);
    return formatted;
  };

  // form data
  const [name, setName] = useState(currentUser?.name);
  const [age, setAge] = useState("");
  const [origin, setOrigin] = useState(origins[0].name);
  const [job, setJob] = useState("");
  const [about, setAbout] = useState("");
  const [role, setRole] = useState(workerRoles[0].name);
  const [contact, setContact] = useState("");
  const [isPrivate, setIsPrivate] = useState("private");

  if(!currentUser){
    return (
      <p>loading...</p>
    )
  }

  const resetForm = () => {
    setAge("");
    setOrigin(origins[0].name);
    setJob("");
    setAbout("");
    setRole(workerRoles[0].name);
    setContact("");
    setIsPrivate("private");
  };

  async function HandleCreateOrg(e: any) {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    try {
      const createData: any = {
        name,
        age: +age,
        about,
        origin,
        job,
        role,
        contact: `${contact}`,
        is_private: isPrivate === "private",
      };

      const res: any = await vacancyService.create(createData);
      const vacancy: Vacancy = res;

      dispatch(setLoading());
      dispatch(pushVacancy(vacancy));

      resetForm();

      router.push("/panel/vacancies");

    } catch (error: any) {
      if (!error.response) {
        setError("Barcha maydonlarni to'g'ri to'ldiring!");
      } else {
        setError(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="space-y-5 basic_card" onSubmit={HandleCreateOrg}>
      {error !== "" && (
        <Alert variant="destructive">
          <ShieldAlert />
          <AlertTitle>Ogohlantirish</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* account */}
      <div className="space-y-1 flex items-start flex-col">
        <p className="block">Hisob*</p>
        <div className="p-1 border-gray-300 border rounded-full pr-3 flex gap-2 items-center cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden flex justify-center items-center text-gray-500">
            <Avatar className="w-full h-full">
              <AvatarImage src={currentUser?.avatar} />
              <AvatarFallback>
                {currentUser?.name.split("")[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <p>{currentUser?.name}</p>
        </div>
        <p className="text-sm text-gray-500">
          Bu hisob sizning vakansiyangizga biriktiriladi, agar uni
          o'zgartirmoqchi bo'lsangiz, hisobni almashtiring yoki sozlang.
        </p>
      </div>

      {/* name */}
      <div className="space-y-1">
        <label htmlFor="name" className="block">
          Ism*
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="global_input w-full"
          placeholder="Ismingiz"
          readOnly
          value={currentUser?.name}
          maxLength={100}
          required
        />
      </div>

      {/* role */}
      <div className="space-y-1 flex flex-col">
        <label htmlFor="role">Lavozimni tanlang*</label>
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

      {/* name */}
      <div className="space-y-1">
        <label htmlFor="job" className="block">
          Sizning kasbingiz nima?*
        </label>
        <input
          type="text"
          id="job"
          name="job"
          className="global_input w-full"
          placeholder="Sizning kasbingiz"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          maxLength={100}
          required
        />
      </div>

      {/* desctiprion */}
      <div className="space-y-1">
        <label htmlFor="about" className="block">
          O'zingiz haqingizda gapirib bering*
        </label>
        <textarea
          rows={3}
          maxLength={500}
          minLength={80}
          id="about"
          name="about"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="global_input w-full resize-none"
          placeholder="Oddiy tavsif"
          required
        />
        {about.length > 0 && (
          <p>
            Tavsifda mavjud:{" "}
            <span
              className={`transition-all ${about.length > 80 ? "text-green-600" : "text-red-600"
                }`}
            >
              {about.length} belgilar
            </span>
          </p>
        )}
        <p className="text-sm text-gray-500">
          Kamida 80 belgi, ko'pi bilan 500 belgi
        </p>
      </div>

      {/* contact */}
      <label className="block mb-3">
        <span className="text-sm text-gray-700">Telefon raqam</span>
        <input
          type="tel"
          value={contact}
          onChange={(e) => setContact(formatPhone(e.target.value))}
          placeholder="+998 00-000-00-00"
          className={"global_input w-full"}
        />
      </label>

      {/* qayerdansiz viloyat */}
      <div className="space-y-1">
        <label htmlFor="origin" className="block">
          Siz qayerdansiz?*
        </label>
        <select
          id="origin"
          name="origin"
          className="global_input w-full none"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          required
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

      {/* pincode */}
      <div className="space-y-1">
        <label htmlFor="age" className="block">
          Yoshingiz*
        </label>
        <InputOTP
          maxLength={6}
          id="age"
          pattern={REGEXP_ONLY_DIGITS}
          value={age}
          onChange={(value) => setAge(value)}
          required
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} className="border-gray-400" />
            <InputOTPSlot index={1} className="border-gray-400" />
          </InputOTPGroup>
        </InputOTP>
        <p className="text-sm text-gray-500">Faqat raqamlar</p>
      </div>

      <div className="space-y-1">
        <label htmlFor="is_private" className="block">
          Vakansiya turi*
        </label>
        <select
          id="is_private"
          name="is_private"
          className="global_input w-full none"
          value={isPrivate}
          onChange={(e) => setIsPrivate(e.target.value)}
          required
        >
          <option value={"private"}>
            Maxfiy
          </option>
          <option value={"public"}>Ommaviy</option>
        </select>
        <p className="text-sm text-gray-500">
          Maxfiy vacansiyalar ommaviy ish bozoriga qo'shilmaydi, va faqat ID orqali xavfsiz topib olinadi.
        </p>
      </div>

      {/* submit */}
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-violet-600 text-white py-2 px-5 rounded-md transition-colors
    ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-violet-700"}
  `}
        >
          {isLoading ? "Yaratilmoqda..." : "Vakansiya yaratish"}
        </button>
      </div>
    </form>
  );
}
