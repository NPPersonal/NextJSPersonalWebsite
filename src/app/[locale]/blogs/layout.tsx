import { routing } from "@/i18n/routing";
import { NextJSLayoutProps } from "@/types/page-props";
import { unstable_setRequestLocale } from "next-intl/server";
import React from "react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function BlogLayout({
  params: { locale },
  children,
}: Readonly<NextJSLayoutProps>) {
  unstable_setRequestLocale(locale);
  return <div>{children}</div>;
}
