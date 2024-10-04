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
import FramerMotionWrapper from "@/components/motion/framer-motion-client";

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
  const title = t("hello");
  const subtitle = t("welcome");
  const titleDuration = title.length * 100;
  const subtitleDuration = subtitle.length * 150;
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
        className="pt-10 px-4"
        options={{
          triggerOnce: true,
        }}
      >
        <DelayRender delayMS={200}>
          <Typography className="text-center" variant="h2">
            <TypeWriter text={title} durationMS={titleDuration} />
          </Typography>
        </DelayRender>
        <DelayRender delayMS={1600}>
          <Typography className="text-center" variant="h3">
            <TypeWriter text={subtitle} durationMS={subtitleDuration} />
          </Typography>
        </DelayRender>
        <FramerMotionWrapper
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            damping: 10,
            stiffness: 100,
            delay: 3,
          }}
        >
          <div className="mt-8">{content}</div>
        </FramerMotionWrapper>
      </RenderInView>
      <FramerMotionWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="flex flex-col justify-center items-center px-4">
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
      </FramerMotionWrapper>
    </div>
  );
}
