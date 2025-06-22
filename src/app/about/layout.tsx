// import { locales } from "@/i18n/config";
import { NextJSLayoutProps } from "@/types/page-props";
import { getTranslations } from "next-intl/server";
import React from "react";

// export function generateStaticParams() {
//   return locales.map((locale) => ({ locale }));
// }

export async function generateMetadata() {
  const t = await getTranslations("AboutPage");
  return {
    title: t("metadata_title"),
    description: t("metadata_description"),
  };
}

export default async function AboutLayout({
  children,
}: Readonly<NextJSLayoutProps>) {
  return <div>{children}</div>;
}
