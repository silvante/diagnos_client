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
import {
  replaceVacancy,
} from "@/app/store/slices/vacancySlice";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UpdateVacancyForm({ vacancy }: { vacancy: Vacancy }) {
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
  const [name, setName] = useState(currentUser.name);
  const [age, setAge] = useState(`${vacancy.age}`);
  const [origin, setOrigin] = useState(vacancy.origin);
  const [job, setJob] = useState(vacancy.job);
  const [role, setRole] = useState(vacancy.role);
  const [about, setAbout] = useState(vacancy.about);
  const [contact, setContact] = useState(formatPhone(vacancy.contact));

  async function HandleUpdateOrg(e: any) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const update_data: any = {
        name,
        age: +age,
        about,
        origin,
        job,
        role,
        contact: `${contact}`,
      };

      const res: any = await vacancyService.update(vacancy.id, update_data);
      const updated_vacancy: Vacancy = res;
      console.log(updated_vacancy);

      dispatch(replaceVacancy(updated_vacancy));
      router.push("/panel/vacancies");
      setIsLoading(false);
      setError("");
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
    <form className="space-y-5 basic_card" onSubmit={HandleUpdateOrg}>
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
        <div className="p-1 border-gray-300 border rounded-full pr-3 flex gap-2 items-center cursor-pointer opacity-50 z-10">
          <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden flex justify-center items-center text-gray-500">
            <Avatar className="w-full h-full">
              <AvatarImage src={vacancy.user.avatar} />
              <AvatarFallback>
                {vacancy.user.name.split("")[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <p>{currentUser.name}</p>
        </div>
        <p className="text-sm text-gray-500">
          Hisob o'zgartirilmaydi, agar muammo bo'lsa, vakansiyani o'chirib qayta yarating!
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
          className="global_input w-full opacity-50"
          placeholder="Ismingizni kiriting"
          readOnly
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          required
        />
        <p className="text-sm text-gray-500">
          Ism ham o'zgartirilmaydi, chunki u sizning hisobingizga biriktirilgan!
        </p>
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
          minLength={200}
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
              className={`transition-all ${about.length > 200 ? "text-green-600" : "text-red-600"
                }`}
            >
              {about.length} belgilar
            </span>
          </p>
        )}
        <p className="text-sm text-gray-500">
          Kamida 200 belgi, ko'pi bilan 500 belgi
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

      {/* origin */}
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

      {/* submit */}
      <div>
        <button
          type="submit"
          className="bg-violet-600 text-white py-2 px-5 rounded-md hover:bg-violet-700 transition-colors cursor-pointer"
        >
          {isLoading ? "yangilanmoqda..." : "Vakansiyani yangilash"}
        </button>
      </div>
    </form>
  );
}
