import React from "react";
import { Typography, TypographyProps } from "./ui/typography";
import RenderInView from "./render-in-view";
import TypeWriter from "./type-writer";
import { cn } from "@/lib/utils";

export interface InViewTypeWriterProps extends TypographyProps {
  title: string;
  letterDuration?: number;
}

/**
 * Combine RenderInView and TypeWriter components and render
 * text with Typography component
 *
 * @param title `string` text to render
 * @param letterDuration `number` time for each letter in millisecond, used for
 * calculating total length of time to render text with TypeWriter effect
 * default 150ms
 * @param variant `string` type of variant for Typography default h1
 */
const InViewTypeWriter = React.forwardRef<
  typeof Typography,
  InViewTypeWriterProps
>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ title, letterDuration = 150, variant = "h1", className }, ref) => {
    const titleDuration = title.length * letterDuration;
    const cls = cn("", className);
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

InViewTypeWriter.displayName = "InViewTypeWriter";

export default InViewTypeWriter;
