import Heading from "@/app/(global_components)/Heading";
import { User } from "@/app/types/User";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ApplicantDetails({
  applicant,
  role,
}: {
  applicant: User;
  role: string;
}) {
  return (
    <>
      <div className="w-full border border-gray-300 rounded-2xl p-4 lg:p-8 space-y-5 bg-white">
        <Heading text="Hisob" />
        <div className="space-y-2">
          <div className="bg-gray-300 max-w-24 w-full aspect-square rounded-full overflow-hidden border border-gray-400">
            <Avatar className="w-full h-full">
              <AvatarImage src={applicant.avatar} />
              <AvatarFallback>
                {applicant.name.split("")[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="w-full">
            <h2 className="text_color text-xl font-semibold w-full truncate">
              {applicant.name}
            </h2>
            <p className="text_color w-full truncate">{applicant.email}</p>
          </div>
        </div>
      </div>
      <div className="w-full border border-gray-300 rounded-2xl p-4 lg:p-8 space-y-5 bg-white">
        <Heading text="Ma'lumot" />
        <div className="space-y-3 w-full">
          <p className="text_color font-semibold w-full truncate">
            Rol: <span className="font-medium">{role}</span>
          </p>
          <p className="text_color font-semibold w-full truncate">
            Bio:{" "}
            <span className="font-medium">
              {applicant.bio ?? "Foydalanuvchida bio yo'q"}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
