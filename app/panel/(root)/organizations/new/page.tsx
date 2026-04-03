import Heading from "@/app/(global_components)/Heading";
import NewOrganizationForm from "./NewOrgForm";
import { Plus } from "lucide-react";
import Link from "next/link";
import BackBtn from "@/app/(global_components)/BackBtn";


export default function NewOrganizationPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Heading text="Yangi tashkilot" />
        <BackBtn href="http://localhost:3000/panel/organizations" />
      </div>

      <NewOrganizationForm />
    </div>
  );
}
