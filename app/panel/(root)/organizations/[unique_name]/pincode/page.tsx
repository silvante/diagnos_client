"use client";
import { useParams, useRouter } from "next/navigation";
import Heading from "@/app/(global_components)/Heading";
import BackBtn from "@/app/(global_components)/BackBtn";
import { useSelector } from "react-redux";
import { Organization } from "@/app/types/User";
import { useEffect, useState } from "react";
import organizationService from "@/app/api/services/organizationService";
import Spinner from "@/app/(global_components)/Spinner";
import UpdatePincodeForm from "./UpdatePincodeForm";

export default function UpdateOrganizationPincode() {
  const { unique_name } = useParams();

  const { organizations } = useSelector((state: any) => state.organizations);
  const router = useRouter();
  const [organization, setOrganization] = useState<Organization | null>(null);

  async function GetOrganization(unique_name: string) {
    try {
      const res: any = await organizationService.getByUniqueName(unique_name);
      const res_organization: Organization = res;
      setOrganization(res_organization);
    } catch (error) {
      router.push("/panel/vacancies");
    }
  }

  if (!organizations) {
    useEffect(() => {
      GetOrganization(String(unique_name));
    }, []);
  } else {
    const org = organizations.find(
      (org: Organization) => org.unique_name == String(unique_name)
    );
    useEffect(() => {
      setOrganization(org);
    }, []);
  }

  if (!organization) {
    return (
      <div className="w-full h-80 flex justify-center items-center">
        <Spinner />
      </div>
    );
  } else {
    return (
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <Heading text={`Pinkodni yangilash - ${unique_name}`} />
          <BackBtn href={`/panel/organizations`} />
        </div>
        <UpdatePincodeForm organization={organization} />
      </div>
    );
  }
}
