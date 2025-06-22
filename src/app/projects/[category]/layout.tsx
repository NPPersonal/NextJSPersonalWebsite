import { PATH_TO_PROJECTS } from "@/constant";
import { locales } from "@/i18n/config";
import { getSubDirectoryNames } from "@/lib/mdx";
import { NextJSLayoutProps } from "@/types/page-props";
import React from "react";

export async function generateStaticParams() {
  const categories = await getSubDirectoryNames(PATH_TO_PROJECTS);
  const ret = locales
    .map((locale) => {
      return categories.map((category) => {
        return { locale, category };
      });
    })
    .flat();
  return ret;
}

export default function ProjectLayout({
  children,
}: Readonly<NextJSLayoutProps>) {
  return <div>{children}</div>;
}
