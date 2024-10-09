import { routing } from "@/i18n/routing";
import { getMDX, getSubDirectoryNames, MDXType } from "@/lib/mdx";
import { NextJSPageProps } from "@/types/page-props";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import React from "react";
import ProjectCard from "@/components/project-card";
import { Typography } from "@/components/ui/typography";
import RenderInView from "@/components/render-in-view";
import TypeWriter from "@/components/type-writer";
import path from "node:path";

type ProjectPageProps = NextJSPageProps;

// projects folder under resources directory
const PATH_TO_PROJECTS = "resources/mdx/projects";

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

function transformMDX(mdxList: Array<MDXType>) {
  return mdxList.map((mdx) => {
    return {
      title: mdx.frontmatter.title as string,
      author: mdx.frontmatter.author as string,
      category: mdx.frontmatter.category as string,
      categoryTitle: mdx.frontmatter.category_title as string,
      description: mdx.frontmatter.description as string,
      previewImageID: mdx.frontmatter.preview_img_id as string,
    };
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  unstable_setRequestLocale(params.locale);
  const mdxList = await getMDX(
    path.join(PATH_TO_PROJECTS, params.category),
    params.locale
  );
  const transformedMDXList = mdxList.length > 0 ? transformMDX(mdxList) : [];

  const titleText =
    transformedMDXList.length > 0
      ? transformedMDXList[0].categoryTitle
      : "Unknow";
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
        {transformedMDXList.map((mdx, i) => {
          return (
            <div
              key={`${mdx.title}-${i}`}
              className="flex justify-center items-center"
            >
              <ProjectCard
                className="w-[450px]"
                name={mdx.title}
                category={mdx.category}
                description={
                  <Typography className="text-center" variant="strong">
                    {mdx.description}
                  </Typography>
                }
                publicCloudinaryImageId={mdx.previewImageID}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
