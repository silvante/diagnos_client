"use client";
import BackBtn from "@/app/(global_components)/BackBtn";
import Heading from "@/app/(global_components)/Heading";
import { useSelector } from "react-redux";
import EmpSearchEngine from "./EmploymentSearchEngine";
import AccessIdForm from "./AccessIdForm";

const EmploymentPage = () => {
  const { organization } = useSelector((state: any) => state.validator);
  return (
    <div className="w-full space-y-5">
      <div className="flex items-center justify-between w-full">
        <Heading text="Ishga olish" />
        <BackBtn href={`/org/${organization.unique_name}/workers`} />
      </div>
      <AccessIdForm org={organization} />
      <EmpSearchEngine organization={organization} />
    </div>
  );
};

export default EmploymentPage;
