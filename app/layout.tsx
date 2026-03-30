import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "./store/StoreProvider";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import SFX from "./providers/sfx";
import TanstackQueryProvider from "./providers/tanstackQueryProvider";
import AuthProvider from "./components/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Diagnos Uz | O'zbekistondagi Tashkilot Boshqaruvi",
  description:
    "O'zbekistondagi bizneslar uchun qulay tashkilot va ish boshqaruvi platformasi",
  keywords: [
    "diagnos",
    "Diagnos",
    "DIAGNOS",
    "Diagnos Uz",
    "diagnos uz",
    "DIAGNOS UZ",
    "diagnos_uz",
    "DiagnosUz",
    "tashkilot boshqaruvi",
    "ish boshqaruvi",
    "xodimlar",
    "vakansiyalar",
    "O'zbekiston",
    "biznes boshqaruvi",
    "korxona boshqaruvi",
    "xodimlarni boshqarish",
    "ish haqi hisobi",
    "loyiha boshqaruvi",
    "vazifalarni boshqarish",
    "O'zbekistondagi biznes",
    "Toshkentdagi kompaniyalar",
    "biznesni avtomatlashtirish",
    "CRM tizimi",
    "ERP tizimi",
    "hr boshqaruvi",
    "kadrlar boshqaruvi",
    "biznes uchun dastur",
    "startaplar uchun",
    "kichik biznes",
    "business management uzbekistan",
    "saas uzbekistan",
    "startup uzbekistan",
    "tashkilotlarni boshqarish",
  ],
  alternates: {
    canonical: "https://diagnos.uz",
  },
  openGraph: {
    title: "Diagnos Uz | O'zbekistondagi Tashkilot Boshqaruvi",
    description:
      "O'zbekistondagi bizneslar uchun qulay tashkilot va ish boshqaruvi platformasi",
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
    title: "Diagnos Uz | O'zbekistondagi Tashkilot Boshqaruvi",
    description:
      "O'zbekistondagi bizneslar uchun qulay tashkilot va ish boshqaruvi platformasi",
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
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <TanstackQueryProvider>
          <StoreProvider>
            <AuthProvider>
              <NextTopLoader color="#7f22fe" showSpinner={false} />

              {children}

              <Toaster position="top-center" reverseOrder={false} />
              <SFX />
            </AuthProvider>
          </StoreProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
