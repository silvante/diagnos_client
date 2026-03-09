"use client";
import { Organization } from "@/app/types/User";

export default function OrganizationView({
  organization,
}: {
  organization: Organization;
}) {
  return (
    <div className="border border-gray-300 rounded-2xl w-full overflow-hidden">
      {organization.banner && (
        <div className="w-full h-36 relative p-5 flex items-center justify-start">
          <img
            src={organization.banner.original}
            alt={organization.description}
            className="w-full h-full object-cover absolute top-0 left-0 z-0"
          />
          {organization.logo && (
            <div className="p-3 z-20 bg-white rounded-xl flex">
              <img
                src={organization.logo}
                alt={organization.description}
                className="h-10 w-auto"
              />
            </div>
          )}
        </div>
      )}
      <div className="w-full p-5 border-b border-gray-200 flex flex-col gap-1 items-start">
        <h3 className="text-xl font-semibold">{organization.name}</h3>
        <p className="text-sm text-gray-600">
          <span className="text-black">Takrorlanmas nom: </span>@
          {organization.unique_name}
        </p>
      </div>
    </div>
  );
}
