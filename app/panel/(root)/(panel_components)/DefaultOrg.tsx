"use client";
import ErrorMessage from "@/app/(global_components)/ErrorMessage";
import Spinner from "@/app/(global_components)/Spinner";
import { Organization, User } from "@/app/types/User";
import {
  Crown,
  Eye,
  LockKeyhole,
  Menu,
  PenBox,
  PlayCircle,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DefaultOrg() {
  const [org, setOrg] = useState<Organization | null>(null);
  const { currentUser, loading } = useSelector((state: any) => state.user);
  const user: User = currentUser;
  useEffect(() => {
    if (user.default_organization) {
      setOrg(user.default_organization.organization);
    }
  }, []);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        {org ? (
          <div className="border border-gray-300 rounded-2xl w-full overflow-hidden bg-white">
            <div className="w-full p-5 border-b border-gray-200 flex flex-col gap-1 items-start">
              <h3 className="text-xl font-semibold">
                Rol:{" "}
                <span className="text-violet-600">
                  {org.owner_id === user.id ? "Ega" : "Ishchi"}
                </span>
              </h3>
            </div>
            {org.banner && (
              <div className="w-full h-36 relative p-5 flex items-center justify-start">
                <img
                  src={org.banner.original}
                  alt={org.description}
                  className="w-full h-full object-cover absolute top-0 left-0 z-0"
                />
                {org.logo && (
                  <div className="p-3 z-20 bg-white rounded-xl flex">
                    <img
                      src={org.logo}
                      alt={org.description}
                      className="h-10 w-auto"
                    />
                  </div>
                )}
              </div>
            )}
            <div className="w-full p-5 border-b border-gray-200 flex flex-col gap-1 items-start">
              <h3 className="text-xl font-semibold">{org.name}</h3>
              <p className="text-sm text-gray-600">
                <span className="text-black">Takrorlanmas nom: </span>@
                {org.unique_name}
              </p>
            </div>

            <div className="w-full p-5 border-b border-gray-200">
              <Link
                href={
                  org.owner_id === user.id
                    ? `/org/${org.unique_name}/validation`
                    : `/job/${org.unique_name}`
                }
                className="bg-violet-600 w-full py-2 flex gap-3 text-white rounded-lg items-center justify-center"
              >
                <PlayCircle /> Tashkilotni ishga tushirish
              </Link>
            </div>
            <div className="border-b border-gray-200 p-4 flex flex-col items-start gap-2 md:flex-row md:justify-between md:items-center">
              <p className="text-sm text-gray-500">
                <span className="text-black">yaratilgan sana:</span>{" "}
                {new Date(org.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              {org.is_vip ? (
                <p className="text-yellow-600 flex items-center gap-2">
                  Tashkilot VIP <Crown />
                </p>
              ) : (
                <p
                  className={`text-sm ${
                    org.subscription_status == "active"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  <span className="text-black">holat:</span>{" "}
                  {org.subscription_status}
                </p>
              )}
              <p className="text-sm text-gray-500">
                <span className="text-black">pinkod:</span> mavjud
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex gap-2 bg-violet-600 px-1 py-1 text-white font-semibold rounded-md hover:bg-violet-700 transition-colors">
                  <Menu />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <Link href={`/panel/organizations/${org.unique_name}`}>
                    <DropdownMenuItem>
                      <Eye /> Ko'rib chiqish
                    </DropdownMenuItem>
                  </Link>
                  <Link href={`/panel/organizations/${org.unique_name}/update`}>
                    <DropdownMenuItem>
                      <PenBox /> Yangilash
                    </DropdownMenuItem>
                  </Link>
                  <Link
                    href={`/panel/organizations/${org.unique_name}/pincode`}
                  >
                    <DropdownMenuItem>
                      <LockKeyhole /> Pinkodni yangilash
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ) : (
          <ErrorMessage
            text="Sizda standart tashkilot yo'q"
            desc="Siz tashkilot yaratishingiz mumkin"
          />
        )}
      </>
    );
  }
}
