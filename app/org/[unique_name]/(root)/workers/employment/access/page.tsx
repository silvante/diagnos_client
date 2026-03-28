"use client";
import BackBtn from "@/app/(global_components)/BackBtn";
import Heading from "@/app/(global_components)/Heading";
import { useSelector } from "react-redux";
import AccessIdForm from "../AccessIdForm";

const EmploymentAccessPage = () => {
  const { organization } = useSelector((state: any) => state.validator);
  return (
    <div className="w-full space-y-5">
      <div className="flex items-center justify-between w-full">
        <Heading text="Access" />
        <BackBtn href={`/org/${organization.unique_name}/workers/employment`} />
      </div>
      <AccessIdForm org={organization} />
    </div>
  );
};

export default EmploymentAccessPage;
