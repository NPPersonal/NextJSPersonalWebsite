"use client";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const typographyVariants = cva("", {
  variants: {
    variant: {
      default: "text-base",
      h1: "text-9xl",
      h2: "text-8xl",
      h3: "text-7xl",
      h4: "text-6xl",
      h5: "text-5xl",
      h6: "text-4xl",
      caption: "text-sm",
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      strong: "font-bold",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface TypographyProps
  extends React.BaseHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof typographyVariants> {}

const Typography = React.forwardRef<HTMLDivElement, TypographyProps>(
  ({ children, className, variant, ...props }, ref) => {
    return (
      <div
        className={cn(typographyVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Typography.displayName = "Typography";

export { Typography, typographyVariants };
