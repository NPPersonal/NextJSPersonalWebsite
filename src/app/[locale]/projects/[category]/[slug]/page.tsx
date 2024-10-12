import CloudinaryImage from "@/components/CloudinaryImage";
import {
  DefaultMDXComponentProps,
  defaultMDXComponents,
} from "@/components/mdx-components";
import RenderInView from "@/components/render-in-view";
import TypeWriter from "@/components/type-writer";
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
import { unstable_setRequestLocale } from "next-intl/server";
import path from "node:path";

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

export default async function SlugPage({
  params: { locale, category, slug },
}: SlugPageProps) {
  unstable_setRequestLocale(locale);
  const results = await getMDXBy(
    slug,
    path.join(PATH_TO_PROJECTS, category),
    locale,
    mdxComponents
  );
  const mdx = results.length > 0 ? results[0] : undefined;
  const title = mdx ? (mdx.frontmatter.title as string) : "";
  const titleDuration = title.length * 150;

  return (
    <div className="flex flex-col items-center">
      <RenderInView
        options={{
          triggerOnce: true,
        }}
      >
        <Typography className="mb-8 text-center" variant="h3">
          <TypeWriter text={title} durationMS={titleDuration} />
        </Typography>
      </RenderInView>
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
