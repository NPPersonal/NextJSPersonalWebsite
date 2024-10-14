import React from "react";
import { Typography, TypographyProps } from "./ui/typography";
import RenderInView from "./render-in-view";
import TypeWriter from "./type-writer";
import { cn } from "@/lib/utils";

export interface PageTitleProps extends TypographyProps {
  title: string;
  letterDuration?: number;
}

const PageTitle = React.forwardRef<typeof Typography, PageTitleProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ title, letterDuration = 150, variant = "h1", className }, ref) => {
    const titleDuration = title.length * letterDuration;
    const cls = cn("mb-8 text-center", className);
    return (
      <RenderInView
        options={{
          triggerOnce: true,
        }}
      >
        <Typography className={cls} variant={variant}>
          <TypeWriter text={title} durationMS={titleDuration} />
        </Typography>
      </RenderInView>
    );
  }
);

PageTitle.displayName = "PageTitle";

export default PageTitle;
