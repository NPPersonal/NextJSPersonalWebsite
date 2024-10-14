import React from "react";
import BlogCollection from "./blog-collection";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { NextJSPageProps } from "@/types/page-props";
import PageTitle from "@/components/page-title";

export default async function BlogPage({
  params: { locale },
}: NextJSPageProps) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("BlogPage");
  const titleText = t("title");
  return (
    <div className="flex flex-col items-center">
      <PageTitle title={titleText} variant="h3" />
      <BlogCollection />
    </div>
  );
}
