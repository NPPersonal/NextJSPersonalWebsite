import { routing } from "@/i18n/routing";
import { NextJSLayoutProps } from "@/types/page-props";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata() {
  const t = await getTranslations("MessageMe");
  return {
    title: t("metadata_title"),
    description: t("metadata_description"),
  };
}

export default function MessageMeLayout({
  params: { locale },
  children,
}: Readonly<NextJSLayoutProps>) {
  unstable_setRequestLocale(locale);
  return <div>{children}</div>;
}
