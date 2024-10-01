import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { readFile } from "fs/promises";
import { compileMDX } from "next-mdx-remote/rsc";
import TypeWriter from "@/components/type-writer";
import { Typography } from "@/components/ui/typography";
import RenderInView from "@/components/render-in-view";
import Image from "next/image";
import landingImage from "../../../public/static/images/landing.jpeg";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

async function getMDX(locale: string) {
  const mdxRaw = await readFile(
    process.cwd() + `/resources/mdx/${locale}.mdx`,
    "utf-8"
  );

  const { content, frontmatter } = await compileMDX({
    source: mdxRaw,
    options: { parseFrontmatter: true },
  });

  return { content, frontmatter };
}

export default async function HomePage(props: {
  params: { [key: string]: string };
}) {
  unstable_setRequestLocale(props.params.locale);
  const t = await getTranslations("HomePage");

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center">
      <RenderInView
        className="mx-10"
        options={{
          triggerOnce: true,
        }}
      >
        <Typography className="text-center" variant="h2">
          <TypeWriter text={t("hello")} durationMS={700} delayStartMS={200} />
        </Typography>
        <Typography className="text-center" variant="h3">
          <TypeWriter
            text={t("welcome")}
            durationMS={700}
            delayStartMS={1600}
          />
        </Typography>
      </RenderInView>
      <div className="my-16">
        <Image
          className="m-8 rounded-lg shadow-elvation1"
          src={landingImage}
          alt="landing"
          width={400}
          height={600}
        />
      </div>
    </div>
  );
}
