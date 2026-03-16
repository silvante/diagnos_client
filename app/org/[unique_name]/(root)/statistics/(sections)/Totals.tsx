import Heading from "@/app/(global_components)/Heading";
import { Organization } from "@/app/types/User";
import { BookUser, Pilcrow, Users } from "lucide-react";

export default function Totals({
  organization,
}: {
  organization: Organization;
}) {

  return (
    <div className="space-y-5">
      <Heading text="Jami" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="bg-white border border-gray-300 rounded-xl p-5 border-b-3 border-b-violet-600 flex items-center justify-between">
          <div>
            <p className="text-2xl font-semibold text-violet-600">
              {organization._count.clients}
            </p>
            <h3 className="text-xl font-semibold text_color">Mijozlar</h3>
          </div>
          <BookUser size={45} color="#7f22fe" className="opacity-50" />
        </div>
        <div className="bg-white border border-gray-300 rounded-xl p-5 border-b-3 border-b-violet-600 flex items-center justify-between">
          <div>
            <p className="text-2xl font-semibold text-violet-600">
              {organization._count.types}
            </p>
            <h3 className="text-xl font-semibold text_color">Turlar</h3>
          </div>
          <Pilcrow size={45} color="#7f22fe" className="opacity-50" />
        </div>
        <div className="bg-white border border-gray-300 rounded-xl p-5 border-b-3 border-b-violet-600 flex items-center justify-between">
          <div>
            <p className="text-2xl font-semibold text-violet-600">
              {organization._count.workers}
            </p>
            <h3 className="text-xl font-semibold text_color">Ishchilar</h3>
          </div>
          <Users size={45} color="#7f22fe" className="opacity-50" />
        </div>
      </div>
    </div>
  );
}
