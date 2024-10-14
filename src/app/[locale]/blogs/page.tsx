import React from "react";
import BlogCollection from "./blog-collection";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { NextJSPageProps } from "@/types/page-props";
import InViewTypeWriter from "@/components/in-view-type-writer";

export default async function BlogPage({
  params: { locale },
}: NextJSPageProps) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("BlogPage");
  const titleText = t("title");
  return (
    <div className="flex flex-col items-center">
      <InViewTypeWriter
        className=" mb-8 text-center"
        title={titleText}
        variant="h3"
      />
      <BlogCollection />
    </div>
  );
}
