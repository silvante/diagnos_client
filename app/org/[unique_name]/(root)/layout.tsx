"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import OrgValidator from "./OrgValidation";
import OrgHeader from "../../(components)/OrgHeader";
import OrgBreadcrumbs from "../../(components)/OrgBreadcrumbs";
import OrgAside from "../../(components)/OrgAside";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import OrgFooter from "../../(components)/OrgFooter";
import MobileNav from "../../(components)/MobileNav";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
});

export default function OrgLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { loading, organization, validation } = useSelector(
    (state: any) => state.validator,
  );
  const { unique_name }: { unique_name: string } = useParams();
  const router = useRouter();

  if (!loading && validation && organization.unique_name !== unique_name) {
    router.push(`/org/${unique_name}/validation`);
  }

  return (
    <>
      {loading ? (
        <>
          <OrgValidator unique_name={unique_name} />
        </>
      ) : (
        <div className={`${inter.className} antialiased w-full h-screen`}>
          <OrgHeader />
          <main className="w-full flex min-h-screen">
            <OrgAside />
            <div className="flex-1 pt-20 px-3 md:px-5 max-w-370 w-full mx-auto pb-14 xl:pb-5 flex flex-col">
              <div className="w-full flex items-center justify-start mb-5">
                <OrgBreadcrumbs />
              </div>
              <div className="flex-1 mb-5">{children}</div>
              <OrgFooter />
              <MobileNav />
            </div>
          </main>
        </div>
      )}
    </>
  );
}
