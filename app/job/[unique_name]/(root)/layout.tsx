"use client";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import userService from "@/app/api/services/userService";
import { Organization, Worker } from "@/app/types/User";
import { updateJob } from "@/app/store/slices/jobSlice";
import {
  updateValidation,
  updateValidationOrg,
} from "@/app/store/slices/validatorSlice";
import { HashLoader } from "react-spinners";
import JobsHeader from "../../(components)/JobsHeader";
import JobBreadcrumbs from "../../(components)/JobBreadcrumbs";
import OrgFooter from "@/app/org/(components)/OrgFooter";
import PanelAuthDirector from "@/app/panel/(root)/PanelAuthDirector";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
});

export default function JobMainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const { unique_name } = useParams();
  const { organization, validation } = useSelector(
    (state: any) => state.validator
  );

  async function GetJob() {
    if (
      organization &&
      validation &&
      organization.unique_name === unique_name
    ) {
      return;
    }
    setIsLoading(true);
    try {
      const res: any = await userService.getMyJobs();
      const theJob: Worker = res;
      const theOrg: Organization = theJob.organization;
      if (theOrg.unique_name !== String(unique_name)) {
        return router.push("/panel");
      }

      dispatch(updateJob(theJob));
      dispatch(updateValidation(true));
      dispatch(updateValidationOrg(theOrg));
    } catch (error: any) {
      const res = error?.response?.data || error?.response;

      if (
        res?.statusCode === 407 &&
        res?.message === "organization_is_not_subscribed"
      ) {
        router.push(`/job/${unique_name}/subscription`);
      } else {
        router.push("/panel");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    GetJob();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <HashLoader color="#7c3aed" size={58} />
        <PanelAuthDirector />
      </div>
    );
  } else if (organization && validation) {
    return (
      <div className={`${inter.className} antialiased`}>
        <JobsHeader />
        <div className="pt-20 px-5 container mx-auto space-y-5 pb-5">
          <div className="w-full flex justify-start">
            <JobBreadcrumbs />
          </div>
          <div className="w-full">{children}</div>
        </div>
        <div className="pt-20 px-5 container mx-auto space-y-5 pb-5">
          <OrgFooter />
        </div>
      </div>
    );
  }
}
