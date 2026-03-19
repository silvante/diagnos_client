"use client";

// out of service now

import { NextIntlClientProvider } from "next-intl";
import React from "react";

interface Params {
  lang: string;
  messages: any;
  children: React.ReactNode;
}

const timeZone = "Asia/Tashkent";

export default function LangProvider({ lang, messages, children }: Params) {
  return (
    <NextIntlClientProvider locale={lang} messages={messages} timeZone={timeZone}>
      {children}
    </NextIntlClientProvider>
  );
}
