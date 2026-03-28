import Heading from "@/app/(global_components)/Heading";
import { Vacancy } from "@/app/types/User";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function VacancyDetails({ vacancy }: { vacancy: Vacancy }) {
  return (
    <>
      <div className="w-full border border-gray-300 rounded-2xl p-4 lg:p-8 space-y-5 bg-white">
        <Heading text="Hisob" />
        <div className="space-y-2">
          <div className="bg-gray-300 max-w-24 w-full aspect-square rounded-full overflow-hidden border border-gray-400">
            <Avatar className="w-full h-full">
              <AvatarImage src={vacancy.user.avatar} />
              <AvatarFallback>
                {vacancy.user.name.split("")[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="w-full">
            <h2 className="text_color text-xl font-semibold w-full truncate">
              {vacancy.name}
            </h2>
            <p className="text_color w-full truncate">{vacancy.user.email}</p>
          </div>
        </div>
      </div>
      <div className="w-full border border-gray-300 rounded-2xl p-4 lg:p-8 space-y-5 bg-white">
        <Heading text="Ma'lumot" />
        <div className="space-y-3 w-full">
          <p className="text_color font-semibold w-full truncate">
            Rol: <span className="font-medium">{vacancy.role}</span>
          </p>
          <p className="text_color font-semibold w-full truncate">
            Ish: <span className="font-medium">{vacancy.job}</span>
          </p>
          <p className="text_color font-semibold">
            Haqida: <span className="font-medium">{vacancy.about}</span>
          </p>
          <p className="text_color font-semibold w-full truncate">
            Yosh: <span className="font-medium">{vacancy.age}</span>
          </p>
        </div>
      </div>
      <div className="w-full border border-gray-300 rounded-2xl p-4 lg:p-8 space-y-5 bg-white">
        <Heading text="Aloqa" />
        <div className="space-y-3 w-full">
          <p className="text_color font-semibold w-full truncate">
            Telefon raqami:{" "}
            <span className="font-medium">{vacancy.contact}</span>
          </p>
        </div>
      </div>
    </>
  );
}
