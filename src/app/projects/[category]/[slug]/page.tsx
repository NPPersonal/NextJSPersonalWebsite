import CloudinaryImage from "@/components/CloudinaryImage";
import {
  DefaultMDXComponentProps,
  defaultMDXComponents,
} from "@/components/mdx-components";
import InViewTypeWriter from "@/components/in-view-type-writer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Typography } from "@/components/ui/typography";
import { PATH_TO_PROJECTS } from "@/constant";
import { getMDXBy } from "@/lib/mdx";
import { NextJSPageProps } from "@/types/page-props";
import path from "node:path";
import { getLocale } from "next-intl/server";

type SlugPageProps = NextJSPageProps;

const mdxComponents: DefaultMDXComponentProps = {
  ...defaultMDXComponents,
  h3: (props) => (
    <Typography className="text-center mb-4" variant="h3" {...props}>
      {props.children}
    </Typography>
  ),
  hr: (props) => (
    <div className="h-2 bg-foreground/20 rounded-sm">{props.children}</div>
  ),
  center: (props) => <div className="text-center">{props.children}</div>,
};

export async function generateMetadata({
  params: { category, slug },
}: NextJSPageProps) {
  const locale = await getLocale();
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

export default async function SlugPage({
  params: { category, slug },
}: SlugPageProps) {
  const locale = await getLocale();
  const results = await getMDXBy(
    slug,
    path.join(PATH_TO_PROJECTS, category),
    locale,
    mdxComponents
  );
  const mdx = results.length > 0 ? results[0] : undefined;
  const titleText = mdx ? (mdx.frontmatter.title as string) : "Unknown";

  return (
    <div className="flex flex-col items-center">
      <InViewTypeWriter
        className=" mb-8 text-center"
        title={titleText}
        variant="h3"
      />
      <Carousel className="mb-8 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        <CarouselContent>
          {mdx
            ? (mdx.frontmatter.images_id as Array<string>).map((imgId) => {
                return (
                  <CarouselItem key={imgId}>
                    <CloudinaryImage
                      className="flex justify-center items-center m-4"
                      imageStyle={{ width: "auto", height: "300px" }}
                      publicImageId={imgId}
                    />
                  </CarouselItem>
                );
              })
            : null}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:block" />
        <CarouselNext className="hidden sm:block" />
      </Carousel>
      <div className="mx-4 md:mx-28">{mdx?.content}</div>
    </div>
  );
}
