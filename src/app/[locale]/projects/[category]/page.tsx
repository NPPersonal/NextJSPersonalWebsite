import { getMDX, MDXType } from "@/lib/mdx";
import { NextJSPageProps } from "@/types/page-props";
import React from "react";
import ProjectCard from "@/components/project-card";
import { Typography } from "@/components/ui/typography";
import path from "node:path";
import { PATH_TO_PROJECTS } from "@/constant";
import { Link } from "@/i18n/routing";
import { unstable_setRequestLocale } from "next-intl/server";
import InViewTypeWriter from "@/components/in-view-type-writer";

type ProjectPageProps = NextJSPageProps;

function transformMDX(mdxList: Array<MDXType>) {
  return mdxList.map((mdx) => {
    return {
      title: mdx.frontmatter.title as string,
      author: mdx.frontmatter.author as string,
      category: mdx.frontmatter.category as string,
      slug: mdx.frontmatter.slug as string,
      categoryTitle: mdx.frontmatter.category_title as string,
      description: mdx.frontmatter.description as string,
      previewImageID: mdx.frontmatter.preview_img_id as string,
    };
  });
}

export default async function ProjectPage({
  params: { locale, category },
}: ProjectPageProps) {
  unstable_setRequestLocale(locale);
  const mdxList = await getMDX(path.join(PATH_TO_PROJECTS, category), locale);
  const transformedMDXList = mdxList.length > 0 ? transformMDX(mdxList) : [];

  const titleText =
    transformedMDXList.length > 0
      ? transformedMDXList[0].categoryTitle
      : "Unknown";

  return (
    <div className="flex flex-col items-center">
      <InViewTypeWriter className=" mb-8 text-center" title={titleText} variant="h3" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-fluid gap-3 w-full">
        {transformedMDXList.map((mdx, i) => {
          return (
            <div
              key={`${mdx.title}-${i}`}
              className="flex justify-center items-center"
            >
              <Link href={`${category}/${mdx.slug}`}>
                <ProjectCard
                  className="w-full sm:w-[350px] lg:w-[330px] xl:w-[410px] 2xl:w-[300px]"
                  name={mdx.title}
                  category={mdx.category}
                  description={
                    <Typography className="text-center" variant="strong">
                      {mdx.description}
                    </Typography>
                  }
                  publicCloudinaryImageId={mdx.previewImageID}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
