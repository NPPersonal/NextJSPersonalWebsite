import React from "react";
import BlogCollection from "./blog-collection";
import { Typography } from "@/components/ui/typography";
import { getTranslations } from "next-intl/server";
import RenderInView from "@/components/render-in-view";
import TypeWriter from "@/components/type-writer";

export default async function BlogPage() {
  const t = await getTranslations("BlogPage");
  return (
    <div className="flex flex-col items-center">
      <RenderInView
        options={{
          triggerOnce: true,
        }}
      >
        <Typography className="mb-8 text-center" variant="h3">
          <TypeWriter text={t("title")} durationMS={700} />
        </Typography>
      </RenderInView>
      <BlogCollection />
    </div>
  );
}
