import { Worker } from "@/app/types/User";

export default function DoctorsTypeList({
  currentJob,
}: {
  currentJob: Worker;
}) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text_color">Allowed Examination Types</h2>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {currentJob.attached_types.map((item) => (
          <div
            key={item.id}
            className="border border-gray-300 rounded-2xl"
          >
            <div className="p-4">
              <h3 className="text-lg font-bold">{item.type.name}</h3>
              <p className="text-sm text-gray-600">{item.type.description}</p>
              <p className="mt-2 text-sm">
                <span className="font-medium">Price:</span>{" "}
                {item.type.price.toLocaleString()} UZS
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
        <p className="text-blue-800 font-medium">
          ⚠️ Doctor can only check clients with the above examination types.
        </p>
      </div>
    </section>
  );
}
