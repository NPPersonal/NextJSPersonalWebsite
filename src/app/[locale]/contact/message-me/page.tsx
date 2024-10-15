import InViewTypeWriter from "@/components/in-view-type-writer";
import NetlifyForm from "@/components/netlify-form";
import { NextJSPageProps } from "@/types/page-props";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import React from "react";

export default async function MessageMePage({
  params: { locale },
}: NextJSPageProps) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("MessageMe");
  const titleText = t("title");
  return (
    <div className="flex flex-col items-center">
      <InViewTypeWriter
        className=" mb-8 text-center"
        title={titleText}
        variant="h3"
      />
      <NetlifyForm />
    </div>
  );
}
