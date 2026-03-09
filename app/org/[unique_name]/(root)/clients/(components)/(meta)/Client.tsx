import { Client } from "@/app/types/User";

export default function ClientCard({ client }: { client: Client }) {
  const date = new Date(client.created_at);
  return (
    <div className="flex flex-col border rounded-xl overflow-hidden bg-white shadow-sm hover:border-violet-700">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full border-gray-300 px-4 py-2 border-b transition">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-gray-800">
            {client.name} {client.surname}
          </span>
          <span className="text-sm text-gray-500">
            ({client.born_in}, {client.origin})
          </span>
          <span className="text-sm text-violet-600 font-medium">
            {client.type.name} – {client.type.description}
          </span>
        </div>

        <div className="flex items-center gap-3 mt-2 sm:mt-0">
          <span className="text-green-600 font-bold">{client.price} UZS</span>
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
      <div className="text_color px-4 py-2 space-y-2">
        <p>
          <span className="font-semibold">tashrif buyurdi:</span>{" "}
          {date.toLocaleDateString()}
        </p>
        <p>
          <span className="font-semibold">diagnoz:</span> {client.diagnosis}
        </p>
      </div>
    </div>
  );
}
