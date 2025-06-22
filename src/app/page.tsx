import { getLocale, getTranslations } from "next-intl/server";
import TypeWriter from "@/components/type-writer";
import { Typography } from "@/components/ui/typography";
import RenderInView from "@/components/render-in-view";
import Image from "next/image";
import landingImage from "../../public/static/images/landing.jpeg";
import { getMDX } from "@/lib/mdx";
import { defaultMDXComponents } from "@/components/mdx-components";
import DelayRender from "@/components/delay-render";
import FramerMotionWrapper from "@/components/motion/framer-motion-client";
import { getPlaiceholder } from "plaiceholder";
import { glob } from "glob";
import { readFile } from "fs/promises";

export async function generateMetadata() {
  const t = await getTranslations("HomePage");
  return {
    title: t("metadata_title"),
    description: t("metadata_description"),
  };
}

/**
 * Get low resolution base 64 image from image source
 *
 * @param imagePath image file path
 * @returns a base 64 low resolution image as string
 */
const getBase64Image = async (imagePath: string) => {
  const imageSrc = await glob(imagePath);
  const imageBuffer = await readFile(imageSrc[0]);
  const plaiceholder = await getPlaiceholder(imageBuffer);
  return plaiceholder.base64;
};

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getTranslations("HomePage");
  const title = t("title");
  const subtitle = t("subtitle");
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
  const base64Image = await getBase64Image("public/static/images/landing.jpeg");

  return (
    <div className="flex flex-col md:flex-row md:justify-evenly">
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
          <Typography className="text-center pt-2" variant="h5">
            <TypeWriter text={subtitle} durationMS={subtitleDuration} />
          </Typography>
        </DelayRender>
        <FramerMotionWrapper
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            damping: 11,
            stiffness: 100,
            delay: 3,
          }}
        >
          <div className="mt-8">{content}</div>
        </FramerMotionWrapper>
      </RenderInView>
      <FramerMotionWrapper
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          damping: 10,
          stiffness: 100,
          delay: 2,
        }}
      >
        <div className="flex flex-col justify-center items-center px-4">
          <Image
            className="m-8 rounded-lg shadow-elvation1 dark:shadow-none dark:border-2 dark:rounded-md dark:border-foreground"
            src={landingImage}
            priority
            alt="landing"
            blurDataURL={base64Image}
            placeholder="blur"
          />
        </div>
      </FramerMotionWrapper>
    </div>
  );
}
