import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingOrganizationSkeleton() {
    return (
        <div className="w-full">
            <div className="bg-white rounded-2xl p-4 space-y-4 border border-gray-300">

                <div className="relative">
                    <Skeleton className="h-32 w-full rounded-xl" />

                    <div className="absolute top-8 left-4 space-y-2 z-10 w-full h-30">
                        <Skeleton className="h-4 w-2/4 rounded-full bg-white" />
                        <Skeleton className="h-4 w-1/3 rounded-full bg-white" />
                        <Skeleton className="h-4 w-1/4 rounded-full bg-white" />
                    </div>
                </div>

                <Skeleton className="h-10 w-full rounded-xl" />
                <Skeleton className="h-10 w-40 rounded-xl" />
            </div>
        </div>
    )
}