import { PATH_TO_PROJECTS } from "@/constant";
import { routing } from "@/i18n/routing";
import { getSubDirectoryNames } from "@/lib/mdx";
import { NextJSLayoutProps } from "@/types/page-props";
import { unstable_setRequestLocale } from "next-intl/server";
import React from "react";

export async function generateStaticParams() {
  const categories = await getSubDirectoryNames(PATH_TO_PROJECTS);
  const ret = routing.locales
    .map((locale) => {
      return categories.map((category) => {
        return { locale, category };
      });
    })
    .flat();
  return ret;
}

export default function ProjectLayout({
  params: { locale },
  children,
}: Readonly<NextJSLayoutProps>) {
  unstable_setRequestLocale(locale);
  return <div>{children}</div>;
}
