import { PATH_TO_PROJECTS } from "@/constant";
import { routing } from "@/i18n/routing";
import { getSubDirectoryNames } from "@/lib/mdx";
import { NextJSLayoutProps } from "@/types/page-props";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
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

export async function generateMetadata() {
  const t = await getTranslations("ProjectPage");
  return {
    title: t("metadata_title"),
    description: t("metadata_description"),
  };
}

export default function ProjectLayout({
  params: {locale},
  children,
}: Readonly<NextJSLayoutProps>) {
  unstable_setRequestLocale(locale);
  return <div>{children}</div>;
}
