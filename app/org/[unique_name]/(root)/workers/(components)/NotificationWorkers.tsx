import { JoinRequest } from "@/app/types/User";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NotificationWorkers({ item }: { item: JoinRequest }) {
  return (
    <div className="flex items-center justify-between bg-gray-50 border border-slate-300 rounded-xl p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
          <Avatar className="w-10 h-10">
            <AvatarImage src={item.applicant.avatar ?? undefined} />
            <AvatarFallback>
              {item.applicant.name.split("")[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-gray-800">{item.applicant.name}</p>

            <span className="w-1 h-1 bg-violet-700 rounded-full"></span>

            <span className="font-medium text-gray-700">{item.role}</span>
          </div>

          <p className="text-sm text-gray-500">{item.created_at.toString()}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="px-4 py-2 cursor-pointer text-sm rounded-lg text-red-500 transition hover:underline">
          Rad etish
        </button>

        <button className="px-4 py-2 cursor-pointer text-sm rounded-lg bg-violet-700 text-white hover:bg-violet-700 transition">
          Ishga olish
        </button>
      </div>
    </div>
  );
}
