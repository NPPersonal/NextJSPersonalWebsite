import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Link, routing } from "@/i18n/routing";
import { readFile } from "fs/promises";
import { compileMDX } from "next-mdx-remote/rsc";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";

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

export default async function Home(props: {
  params: { [key: string]: string };
}) {
  unstable_setRequestLocale(props.params.locale);
  const t = await getTranslations("HomePage");
  const { content, frontmatter } = await getMDX(props.params.locale);

  return (
    <div>
      <h1>{t("title")}</h1>
      <h2>{t("subtitle")}</h2>
      <p>
        {t.rich("description", {
          br: () => <br />,
        })}
      </p>
      <Link href="/about">{t("about")}</Link>
      <div className="m-8">
        <div className="pb-4 font-bold">{`${frontmatter["author"]}`}</div>
        {content}
      </div>
      <Button>Click me</Button>
      <ModeToggle />
    </div>
  );
}
