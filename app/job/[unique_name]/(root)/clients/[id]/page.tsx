"use client";
import Heading from "@/app/(global_components)/Heading";
import BackBtn from "@/app/(global_components)/BackBtn";
import { useSelector } from "react-redux";
import JobUpdateClientForm from "./JobUpdateClientForm";

export default function UpdateClient() {
  const { organization } = useSelector((state: any) => state.validator);
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <Heading text="Update Client" />
        <BackBtn href={`/job/${organization.unique_name}`} />
      </div>
      <JobUpdateClientForm />
    </div>
  );
}
