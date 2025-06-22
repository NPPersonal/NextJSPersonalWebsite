import { locales } from "@/i18n/config";
import { NextJSLayoutProps } from "@/types/page-props";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function MessageMeLayout({
  children,
}: Readonly<NextJSLayoutProps>) {
  return <div>{children}</div>;
}
