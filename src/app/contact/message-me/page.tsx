import InViewTypeWriter from "@/components/in-view-type-writer";
import NetlifyForm from "@/components/netlify-form";
import { Typography } from "@/components/ui/typography";
import { NextJSPageProps } from "@/types/page-props";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";

export async function generateMetadata() {
  const t = await getTranslations("MessageMe");
  return {
    title: t("metadata_title"),
    description: t("metadata_description"),
  };
}

export default async function MessageMePage({}: NextJSPageProps) {
  const locale = await getLocale();
  const t = await getTranslations("MessageMe");
  const titleText = t("title");
  return (
    <div className="flex flex-col items-center">
      <InViewTypeWriter
        className=" mb-8 text-center"
        title={titleText}
        variant="h3"
      />
      <div>
        <NetlifyForm
          className="p-4 border-2 rounded-lg border-foreground"
          reCAPTCHALocale={locale}
        />
      </div>
      <div className="my-8 px-8 w-full flex justify-items-stretch items-center">
        <span className="mx-4 grow-[1] h-[5px] bg-foreground/90 rounded-lg" />
        <Typography variant="h5">{t("form_or")}</Typography>
        <span className="mx-4 grow-[1] h-[5px] bg-foreground/90 rounded-lg" />
      </div>
      <Link href="mailto:tomneo2004@gmail.com">
        <EnvelopeClosedIcon className="w-[100px] h-[100px]" />
      </Link>
    </div>
  );
}
