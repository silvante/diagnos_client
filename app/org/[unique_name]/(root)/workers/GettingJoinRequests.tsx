"use client";
import Heading from "@/app/(global_components)/Heading";
import workerService from "@/app/api/services/workerService";
import { Organization } from "@/app/types/User";
import { useQuery } from "@tanstack/react-query";
import { BellDot, TriangleAlert } from "lucide-react";
import { useSelector } from "react-redux";
import NotificationWorkers from "./(components)/NotificationWorkers";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

export default function GettingJoinRequests() {
  const organization = useSelector((state: any) => state.validator.organization) as Organization | null;

  const { data, isPending, isError } = useQuery({
    queryKey: ["gettingOrganizationRequest", organization?.id],
    queryFn: () => workerService.getJoinRequests(organization!.id),
    enabled: !!organization?.id,
  })

  console.log("data:", data)

  return (
    <div className="border border-gray-300 p-5 border-b-4 border-b-violet-600 rounded-xl space-y-3">
      <div className="w-full flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <BellDot color="#7c3aed" />
          <Heading text="Xabarlar" />
        </div>
        <Heading text={`( ${data?.length || 0} )`} />
      </div>

      {isError && (
        <Alert variant="destructive">
          <TriangleAlert />
          <AlertTitle>Xatolik yuz berdi</AlertTitle>
          <AlertDescription>Ma&apos;lumotlarni yuklashda muammo bo&apos;ldi. Qaytadan urinib ko&apos;ring.</AlertDescription>
        </Alert>
      )}

      {isPending && (
        <div className="space-y-2">
          <Skeleton className="h-13 w-full rounded-xl" />
          <Skeleton className="h-13 w-full rounded-xl" />
        </div>
      )}

      {data && data.length > 0 && (
        <div className="flex flex-col gap-2">
          {data?.map((item) => (
            <NotificationWorkers key={item.id} item={item} org={organization!} />
          ))}
        </div>
      )}
    </div>
  );
}
