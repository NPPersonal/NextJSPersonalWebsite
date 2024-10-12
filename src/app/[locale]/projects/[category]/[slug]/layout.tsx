import { PATH_TO_PROJECTS } from "@/constant";
import { getMDX, getMDXBy } from "@/lib/mdx";
import { NextJSLayoutProps } from "@/types/page-props";
import { unstable_setRequestLocale } from "next-intl/server";
import path from "node:path";
import React from "react";

export async function generateStaticParams({
  params: { locale, category },
}: {
  params: { [key: string]: string };
}) {
  const resutls = await getMDX(path.join(PATH_TO_PROJECTS, category), locale);
  return resutls.map((mdx) => {
    return { slug: mdx.frontmatter.slug };
  });
}

export async function generateMetadata({
  params: { locale, category, slug },
}: NextJSLayoutProps) {
  const results = await getMDXBy(
    slug,
    path.join(PATH_TO_PROJECTS, category),
    locale
  );
  const mdx = results.length > 0 ? results[0] : undefined;
  return {
    title: mdx ? mdx.frontmatter.title : slug,
    description: mdx ? mdx.frontmatter.description : "",
  };
}

export default function SlugLayout({
  params: { locale },
  children,
}: Readonly<NextJSLayoutProps>) {
  unstable_setRequestLocale(locale);
  return <div>{children}</div>;
}
