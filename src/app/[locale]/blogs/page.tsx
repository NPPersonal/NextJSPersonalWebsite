import React from "react";
import BlogCollection from "./blog-collection";
import { Typography } from "@/components/ui/typography";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import RenderInView from "@/components/render-in-view";
import TypeWriter from "@/components/type-writer";
import { NextJSPageProps } from "@/types/page-props";

export default async function BlogPage({
  params: { locale },
}: NextJSPageProps) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("BlogPage");
  const titleText = t("title");
  const titleDuration = titleText.length * 150;
  return (
    <div className="flex flex-col items-center">
      <RenderInView
        options={{
          triggerOnce: true,
        }}
      >
        <Typography className="mb-8 text-center" variant="h3">
          <TypeWriter text={titleText} durationMS={titleDuration} />
        </Typography>
      </RenderInView>
      <BlogCollection />
    </div>
  );
}
