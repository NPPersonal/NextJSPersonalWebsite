import { Link, routing } from "@/i18n/routing";
import React from "react";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function About(props: { params: { locale: string } }) {
  unstable_setRequestLocale(props.params.locale);
  const t = useTranslations("AboutPage");
  return (
    <div>
      <h1>{t("title")}</h1>
      <Link href="/">{t("home")}</Link>
    </div>
  );
}
