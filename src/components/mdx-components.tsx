import { MDXProvider } from "@mdx-js/react";
import { Typography } from "./ui/typography";
import Link from "next/link";

export type DefaultMDXComponentProps = React.ComponentProps<
  typeof MDXProvider
>["components"];

export const defaultMDXComponents: DefaultMDXComponentProps = {
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
    <Typography className="ml-4 my-1 block font-semibold text-lg">
      <span>{props.children}</span>
    </Typography>
  ),
  strong: (props) => <Typography variant="strong">{props.children}</Typography>,
  a: (props) => (
    <span className="bg-info mx-1">
      <Link href={props.href ? props.href : ""}>{props.children}</Link>
    </span>
  ),
};
