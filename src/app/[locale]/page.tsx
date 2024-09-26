import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { Link, routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export default function Home(props: { params: { locale: string } }) {
  unstable_setRequestLocale(props.params.locale);
  const t = useTranslations("HomePage");

  return (
    <div>
      <h1>{t("title")}</h1>
      <h2>{t("subtitle")}</h2>
      <Link href="/about">{t("about")}</Link>
    </div>
  );
}
