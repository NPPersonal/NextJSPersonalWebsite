import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

import createMDX from "@next/mdx";

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

/** @type {import('next').NextConfig} */

const nextConfig = {
  //Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
};

export default withNextIntl(withMDX(nextConfig));
