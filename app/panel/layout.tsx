import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Diagnos Uz | Tibbiy Tashkilot Boshqaruvi | Panel",
  description: "Tibbiyot uchun qulay tashkilot boshqaruvi",
  keywords: [
    "diagnos",
    "Diagnos",
    "DIAGNOS",
    "Diagnos Uz",
    "diagnos uz",
    "DIAGNOS UZ",
    "diagnos_uz",
    "DiagnosUz",
    "tibbiy tashkilot",
    "boshqaruv",
    "panel",
    "tibbiyot",
    "shifoxona paneli",
    "klinika paneli",
    "boshqaruv paneli",
    "administrator paneli",
    "nazorat paneli",
    "tibbiy ma'lumotlar",
    "hisobotlar",
    "statistikalar",
    "bemorlar ro'yxati",
    "shifokorlar jadvallari",
    "resurslarni boshqarish",
    "dashboard",
    "admin panel",
    "control panel",
    "medical dashboard",
    "clinic management panel",
    "hospital management panel",
    "healthcare analytics",
    "patient data",
    "doctor schedule",
    "medical records",
  ],
  alternates: {
    canonical: "https://diagnos.uz/panel",
  },
  openGraph: {
    title: "Diagnos Uz | Tibbiy Tashkilot Boshqaruvi | Panel",
    description: "Tibbiyot uchun qulay tashkilot boshqaruvi",
    type: "website",
    url: "https://diagnos.uz/panel",
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
    title: "Diagnos Uz | Tibbiy Tashkilot Boshqaruvi | Panel",
    description: "Tibbiyot uchun qulay tashkilot boshqaruvi",
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
  return <div className={`${inter.className} antialiased bg-gray-50`}>{children}</div>;
}
