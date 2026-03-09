"use client";
import Spinner from "@/app/(global_components)/Spinner";
import organizationService from "@/app/api/services/organizationService";
import { updateOrganizations } from "@/app/store/slices/organizationSlice";
import { Organization } from "@/app/types/User";
import {
  Check,
  Crown,
  Eye,
  LockKeyhole,
  Menu,
  PenBox,
  Pin,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ErrorMessage from "@/app/(global_components)/ErrorMessage";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import { ShieldAlert } from "lucide-react";

export default function OrganizationList() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { organizations, loading } = useSelector(
    (state: any) => state.organizations
  );

  const dispatch = useDispatch();
  async function getOrganizations() {
    try {
      if (organizations) {
        return;
      } else {
        const response: any = await organizationService.getAll();
        const organizationsData: Organization[] = response;
        dispatch(updateOrganizations(organizationsData));
      }
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  }

  useEffect(() => {
    getOrganizations();
  }, []);

  async function MakeItDefault(unique_name: string) {
    setIsLoading(true);
    try {
      const res: any = await organizationService.setAsDefault(unique_name);
      console.log(res);
      if (res && res.success == true) {
        setError("");
        setSuccess("Tashkilot standart qilib belgilandi!");
      }
      setIsLoading(false);
    } catch (error: any) {
      if (!error.response) {
        setError("Barcha maydonlarni to'g'ri to'ldirganingizga ishonch hosil qiling!");
      } else {
        setError(error.response.data.message);
      }
      setIsLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="w-full h-80 flex justify-center items-center">
        <Spinner />
      </div>
    );
  } else {
    return (
      <div className="space-y-5">
        {error !== "" && (
          <Alert variant="destructive">
            <ShieldAlert />
            <AlertTitle>Ogohlantirish</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success !== "" && (
          <Alert variant="default" className="text-green-600">
            <Check />
            <AlertTitle>Muvaffaqiyat</AlertTitle>
            <AlertDescription className="text-green-600/70">
              {success}
            </AlertDescription>
          </Alert>
        )}
        {isLoading && (
          <div className="flex gap-2 items-center">
            <p>Standart qilib belgilanyapti</p>
            <Spinner />
          </div>
        )}
        {organizations && organizations.length > 0 ? (
          organizations.map((organization: Organization) => (
            <div
              key={organization.id}
              className="bg-white rounded-md transition-colors border border-gray-300 flex flex-col border-b-2 border-b-transparent hover:border-b-violet-600"
            >
              <Link
                className=""
                href={`/org/${organization.unique_name}/validation`}
              >
                {organization.logo && (
                  <div className="border-b border-gray-300 p-4 flex flex-col gap-3 items-start">
                    <Image
                      src={organization.logo}
                      alt={organization.description}
                      width={0}
                      height={0}
                      className="w-auto h-10"
                    />
                  </div>
                )}
                <div className="p-4 flex flex-col gap-1 items-start">
                  <h3 className="text-xl font-semibold">{organization.name}</h3>
                  <p className="text-sm text-gray-600">
                    <span className="text-black">Noyob nom: </span>@
                    {organization.unique_name}
                  </p>
                </div>
              </Link>
              <div className="border-t border-gray-200 p-4 flex flex-col items-start gap-2 md:flex-row md:justify-between md:items-center">
                <p className="text-sm text-gray-500">
                  <span className="text-black">yaratilgan sana:</span>{" "}
                  {new Date(organization.created_at).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
                {organization.is_vip ? (
                  <p className="text-yellow-600 flex items-center gap-2">
                    Tashkilot VIP <Crown />
                  </p>
                ) : (
                  <p
                    className={`text-sm ${
                      organization.subscription_status == "active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    <span className="text-black">holat:</span>{" "}
                    {organization.subscription_status}
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
                    <Link
                      href={`/panel/organizations/${organization.unique_name}`}
                    >
                      <DropdownMenuItem>
                        <Eye /> Ko'rib chiqish
                      </DropdownMenuItem>
                    </Link>
                    <Link
                      href={`/panel/organizations/${organization.unique_name}/update`}
                    >
                      <DropdownMenuItem>
                        <PenBox /> Yangilash
                      </DropdownMenuItem>
                    </Link>
                    <Link
                      href={`/panel/organizations/${organization.unique_name}/pincode`}
                    >
                      <DropdownMenuItem>
                        <LockKeyhole /> Pinkodni yangilash
                      </DropdownMenuItem>
                    </Link>
                    <button
                      onClick={() => MakeItDefault(organization.unique_name)}
                    >
                      <DropdownMenuItem>
                        <Pin /> Standart qilib belgilash
                      </DropdownMenuItem>
                    </button>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        ) : (
          <ErrorMessage
            text="Sizda tashkilotlar yo'q"
            desc="Hozir yaratishingiz mumkin"
          />
        )}
      </div>
    );
  }
}
