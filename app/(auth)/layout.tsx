import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Image from "next/image";
import Diagnos from "../(global_components)/Diagnos";
import SignUp from "@/public/backgraund/signup_bg.jpg";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Diagnos Uz",
  description: "Diagnos Uz - ish topish va boshqarish uchun platforma.",
  keywords: [
    "diagnos",
    "Diagnos",
    "DIAGNOS",
    "Diagnos Uz",
    "diagnos uz",
    "DIAGNOS UZ",
    "diagnos_uz",
    "DiagnosUz",
    "ish",
    "ish topish",
    "ish boshqarish",
    "platforma",
    "onlayn ish",
    "vakansiyalar",
    "ish qidirish",
    "ish o'rinlari",
    "O'zbekistonda ish",
    "Toshkentda ish",
    "ishga kirish",
    "vakansiya",
    "ish beruvchilar",
    "xodimlar",
    "karyera",
    "rezyume",
    "ish izlash",
    "kasb",
    "mutaxassislik",
    "ish tajribasi",
    "ish bozori",
    "job search uzbekistan",
    "find job in tashkent",
    "employment in uzbekistan",
    "career in uzbekistan",
  ],
  alternates: {
    canonical: "https://diagnos.uz",
  },
  openGraph: {
    title: "Diagnos Uz",
    description: "Diagnos Uz - ish topish va boshqarish uchun platforma.",
    type: "website",
    url: "https://diagnos.uz",
    images: [
      {
        url: "https://diagnos.uz/icons/profile.svg",
        width: 800,
        height: 600,
        alt: "Diagnos Uz Profile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diagnos Uz",
    description: "Diagnos Uz - ish topish va boshqarish uchun platforma.",
    images: ["https://diagnos.uz/icons/profile.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/icons/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${inter.variable} antialiased flex items-center h-screen`}
    >
      <div className="bg-gray-200 max-w-lg w-full h-screen relative hidden lg:block">
        <Image
          src={SignUp}
          alt="Background image"
          fill
          priority
          className="w-full h-full object-cover"
          quality={50}
        />
      </div>
      <div className="max-w-xl w-full px-8">
        <Diagnos />
        {children}
      </div>
    </div>
  );
}
