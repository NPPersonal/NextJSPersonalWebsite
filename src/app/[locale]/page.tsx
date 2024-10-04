import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import TypeWriter from "@/components/type-writer";
import { Typography } from "@/components/ui/typography";
import RenderInView from "@/components/render-in-view";
import Image from "next/image";
import landingImage from "../../../public/static/images/landing.jpeg";
import { getMDX } from "@/lib/mdx";
import { defaultMDXComponents } from "@/components/mdx-components";
import DelayRender from "@/components/delay-render";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params: { locale },
}: {
  params: { [key: string]: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("HomePage");
  const { content } = (
    await getMDX(
      "resources/mdx/landing",
      locale,
      "",
      "utf-8",
      defaultMDXComponents
    )
  )[0];

  return (
    <div className="flex flex-col md:flex-row">
      <RenderInView
        className="p-10"
        options={{
          triggerOnce: true,
        }}
      >
        <DelayRender delayMS={200}>
          <Typography className="text-center" variant="h2">
            <TypeWriter text={t("hello")} durationMS={1400} />
          </Typography>
        </DelayRender>
        <DelayRender delayMS={1600}>
          <Typography className="text-center" variant="h3">
            <TypeWriter text={t("welcome")} durationMS={1700} />
          </Typography>
        </DelayRender>
        {content}
      </RenderInView>
      <div className="flex flex-col justify-center items-center px-10">
        <Image
          className="m-8 rounded-lg shadow-elvation1"
          src={landingImage}
          alt="landing"
          sizes="100vw"
          style={{
            width: "100rem",
            height: "auto",
          }}
        />
      </div>
    </div>
  );
}
