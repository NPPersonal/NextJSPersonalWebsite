import { locales } from "@/i18n/config";
import { NextJSLayoutProps } from "@/types/page-props";
import React from "react";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function BlogLayout({ children }: Readonly<NextJSLayoutProps>) {
  return <div>{children}</div>;
}
