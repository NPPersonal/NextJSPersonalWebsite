import { MDXProvider } from "@mdx-js/react";
import { Typography } from "./ui/typography";
import { Link } from "@/i18n/routing";

export const defaultMDXComponents: React.ComponentProps<
  typeof MDXProvider
>["components"] = {
  h3: (props) => (
    <Typography className="text-center" variant="h3" {...props}>
      {props.children}
    </Typography>
  ),
  h4: (props) => (
    <Typography className="text-center" variant="h4" {...props}>
      {props.children}
    </Typography>
  ),
  p: (props) => (
    <Typography className="font-semibold" variant="p" {...props}>
      {props.children}
    </Typography>
  ),
  li: (props) => (
    <Typography className="my-1 block font-semibold text-lg">
      ➡ {props.children}
    </Typography>
  ),
  strong: (props) => <Typography variant="strong">{props.children}</Typography>,
  a: (props) => (
    <span className="bg-info mx-1">
      <Link href={props.href ? props.href : ""}>{props.children}</Link>
    </span>
  ),
};
