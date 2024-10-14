import React from "react";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import InViewTypeWriter from "@/components/in-view-type-writer";
import CloudinaryImage from "@/components/CloudinaryImage";
import { getMDX } from "@/lib/mdx";
import { NextJSPageProps } from "@/types/page-props";
import {
  DefaultMDXComponentProps,
  defaultMDXComponents,
} from "@/components/mdx-components";
import { Typography } from "@/components/ui/typography";

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

export default async function About({ params: { locale } }: NextJSPageProps) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("AboutPage");
  const titleText = t("title");
  const fullName = t("full_name");
  const location = t("location");
  const languages = t("languages");
  const mdx = (
    await getMDX(
      "resources/mdx/about-me",
      locale,
      "about-me",
      "utf-8",
      mdxComponents
    )
  )[0];

  return (
    <div>
      <InViewTypeWriter
        className=" mb-8 text-center"
        title={titleText}
        variant="h3"
      />
      <CloudinaryImage
        className="flex justify-center items-center"
        publicImageId="personal-web-image-assets/web-assets/profile"
        imageStyle={{ width: 250 }}
        advanceImageClassName="rounded-lg shadow-elvation1"
      />
      <InViewTypeWriter
        className="mt-4 mb-2 text-center"
        title={fullName}
        variant="strong"
      />
      <InViewTypeWriter
        className="text-center"
        title={location}
        variant="strong"
      />
      <InViewTypeWriter
        className="mt-2 text-center"
        title={languages}
        variant="strong"
      />
      {mdx ? <div className="mt-8 mx-4 md:mx-28">{mdx.content}</div> : null}
    </div>
  );
}
