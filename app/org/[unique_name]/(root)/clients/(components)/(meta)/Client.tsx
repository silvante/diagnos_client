import { Client } from "@/app/types/User";

export default function ClientCard({ client }: { client: Client }) {
  const date = new Date(client.created_at);

  return (
    <div className="flex flex-col border rounded-xl overflow-hidden bg-white shadow-sm hover:border-violet-700 transition">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full border-gray-300 px-4 py-3 border-b">

        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-gray-800">
              {client.name} {client.surname}
            </span>

            <span className="text-sm text-gray-500">
              ({client.born_in}, {client.origin})
            </span>
          </div>

          <span className="text-sm text-gray-700 mt-1">
            Tashrif: {date.toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center gap-3 mt-2 sm:mt-0">

          <span className="text-green-600 font-bold">
            {client.price.toLocaleString()} UZS
          </span>

          {client.is_checked ? (
            <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-600">
              Tekshirilgan
            </span>
          ) : (
            <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-600">
              Kutilmoqda
            </span>
          )}
        </div>
      </div>

      {/* DIAGNOSES */}
      <div className="px-4 py-3 space-y-2">

        {client.diagnoses.map((diagnosis) => (
          <div
            key={diagnosis.id}
            className="flex flex-col sm:flex-row sm:items-start sm:justify-between border rounded-lg px-3 py-2 bg-gray-50"
          >
            <div className="flex flex-col space-y-1">

              <span className="text-sm font-semibold text-violet-700">
                {diagnosis.type.name}
              </span>

              <span className="text-sm text-gray-700 bg-yellow-100 px-1">
                {diagnosis.report ?? "—"}
              </span>

              {/* Reporter */}
              <span className="text-sm text-gray-900">
                Tashxis qo'ydi: {diagnosis.reporter_name ?? "—"}
              </span>

            </div>

            <div className="flex items-center gap-2 mt-2 sm:mt-0">

              {diagnosis.is_checked ? (
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-600">
                  Tayyor
                </span>
              ) : (
                <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
                  Jarayonda
                </span>
              )}

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}