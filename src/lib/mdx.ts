import "server-only";
import { glob } from "glob";
import path from "path";
import { MDXProvider } from "@mdx-js/react";
import { readFile } from "fs/promises";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";

export interface MDXType {
  name: string;
  parent: string | undefined;
  fullpath: string;
  frontmatter: Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}
/**
 * Return metadata and content about mdx files under directory.
 *
 * **mdx file name format: [filename].[locale].mdx**
 * @param path `string` path to directory e.g resources/my-files
 * @param locale `string` localization string of mdx file name
 * e.g my-mdx.en.mdx, my-mdx.zh-TW.mdx
 * @param matchName `string` if empty string then all mdx files under
 * directory or subdirectory will be return, otherwise only mdx file name
 * that match to this string will be return
 * @param encoding encoding for reading mdx file
 * @param components base on [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote?tab=readme-ov-file#custom-components)
 * for customzie components
 * @returns
 */
export async function getMDX(
  pathDir: string,
  locale: string,
  matchName: string = "",
  encoding: BufferEncoding = "utf-8",
  components?: React.ComponentProps<typeof MDXProvider>["components"]
): Promise<Array<MDXType>> {
  const results = await glob(path.join(pathDir, "/**/*.mdx"), {
    withFileTypes: true,
  });
  const filterResults = results
    .filter((path) => {
      return path.name.match(`${matchName}.${locale}.mdx`) ? true : false;
    })
    .map(async (path) => {
      const mdxRaw = await readFile(path.fullpath(), { encoding: encoding });
      const { content, frontmatter } = await compileMDX({
        source: mdxRaw,
        options: {
          parseFrontmatter: true,
          mdxOptions: {
            remarkPlugins: [remarkGfm, remarkEmoji],
            format: "mdx",
          },
        },
        components: components,
      });

      return {
        name: path.name,
        parent: path.parent ? path.parent.name : undefined,
        fullpath: path.fullpath(),
        frontmatter,
        content,
      };
    });

  return Promise.all(filterResults);
}

export async function getMDXBy(
  slug: string,
  pathDir: string,
  locale: string,
  components?: React.ComponentProps<typeof MDXProvider>["components"]
) {
  const results = await getMDX(pathDir, locale, "", "utf-8", components);
  const filteredResults = results.filter((mdx) => {
    return mdx.frontmatter.slug === slug;
  });
  return filteredResults;
}

/**
 * Return a list of folder names under a directory
 *
 * @param pathDir `string` path to directory
 * @returns
 */
export async function getSubDirectoryNames(pathDir: string) {
  const results = await glob(path.join(pathDir, "/*"), {
    withFileTypes: true,
  });
  return results.filter((path) => path.isDirectory()).map((path) => path.name);
}
