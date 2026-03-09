import Heading from "@/app/(global_components)/Heading";
import { Worker } from "@/app/types/User";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function OverallWorkers({ workers }: { workers: Worker[] }) {
  const grouped = Object.values(
    workers.reduce((acc: any, worker: Worker) => {
      if (!acc[worker.role]) {
        acc[worker.role] = { role: worker.role, total_workers: 0, workers: [] };
      }
      acc[worker.role].total_workers++;
      acc[worker.role].workers.push(worker.worker);
      return acc;
    }, {})
  );

  console.log(grouped);

  return (
    <div className="border border-gray-300 p-5 border-b-4 border-b-violet-600 rounded-xl space-y-3">
      <Heading text="Umumiy" />
      <div className="flex flex-col items-start gap-2">
        <h2 className="font-semibold text_color text-lg">
          Sizda <span className="text-violet-600">{workers.length} ta</span> ishchi bor
        </h2>
        <div className="flex gap-4 flex-wrap">
          {grouped.map((g: any, index) => {
            return (
              <div
                key={index}
                className="border border-gray-300 rounded-lg py-2 px-4 flex gap-4 items-center"
              >
                <p className="text_color font-semibold">
                  <span className="text-violet-600">{g.total_workers}</span>{" "}
                  {g.role}
                </p>
                <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                  {g.workers.map((worker: any) => {
                    return (
                      <Avatar key={worker.id}>
                        <AvatarImage src={worker.avatar} alt={worker.name} />
                        <AvatarFallback>
                          {worker.name.split("")[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
