"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import { useSelector } from "react-redux";
import Aside from "./(panel_components)/Aside";
import PanelHeader from "./(panel_components)/PanelHeader";
import OrgFooter from "@/app/org/(components)/OrgFooter";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>

      <div className={`${inter.className} antialiased flex min-h-screen`}>
        <Aside />
        <main className="flex-1 flex flex-col">
          <PanelHeader />
          <div className="p-5 w-full xl:w-4/5 mx-auto flex-1">{children}</div>
          <div className="p-5 w-full xl:w-4/5 mx-auto">
            <OrgFooter />
          </div>
        </main>
      </div>
    </>
  );
}
