import { PATH_TO_PROJECTS } from "@/constant";
import { getMDX } from "@/lib/mdx";
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

export default function SlugLayout({
  params: { locale },
  children,
}: Readonly<NextJSLayoutProps>) {
  unstable_setRequestLocale(locale);
  return <div>{children}</div>;
}
