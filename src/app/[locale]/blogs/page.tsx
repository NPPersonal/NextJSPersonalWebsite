import React from "react";
import BlogCollection from "./blog-collection";
import { Typography } from "@/components/ui/typography";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import RenderInView from "@/components/render-in-view";
import TypeWriter from "@/components/type-writer";
import { routing } from "@/i18n/routing";
import { NextJSPageProps } from "@/types/page-props";

type BlogPageProps = NextJSPageProps;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata() {
  const t = await getTranslations("BlogPage");
  return {
    title: t("metadata_title"),
    description: t("metadata_description"),
  };
}

export default async function BlogPage({ params: { locale } }: BlogPageProps) {
  unstable_setRequestLocale(locale);
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
