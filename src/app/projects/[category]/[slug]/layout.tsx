import { PATH_TO_PROJECTS } from "@/constant";
import { getMDX } from "@/lib/mdx";
import { getUserLocale } from "@/services/locale";
import { NextJSLayoutProps } from "@/types/page-props";
import path from "node:path";
import React from "react";

export async function generateStaticParams({
  params: { category },
}: {
  params: { [key: string]: string };
}) {
  const locale = await getUserLocale();
  const resutls = await getMDX(path.join(PATH_TO_PROJECTS, category), locale);
  return resutls.map((mdx) => {
    return { slug: mdx.frontmatter.slug };
  });
}

export default function SlugLayout({ children }: Readonly<NextJSLayoutProps>) {
  return <div>{children}</div>;
}
