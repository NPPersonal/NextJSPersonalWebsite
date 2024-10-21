"use client";
import React from "react";
import useDetectScroll, { Axis } from "@smakss/react-scroll-direction";
import { cn } from "@/lib/utils";

export type NavigationBarToolProps = React.ComponentProps<"nav">;

/**
 * Change background color and shadow of navigation bar
 * base on scroll position
 */
const NavigationBarTool = React.forwardRef<HTMLElement, NavigationBarToolProps>(
  ({ className, children, ...props }, ref) => {
    const { scrollPosition } = useDetectScroll({ axis: Axis.Y });
    const bgColor =
      scrollPosition.top === 0
        ? "bg-background shadow-none"
        : "bg-accent shadow-lg";
    const cls = cn(bgColor, className);
    return (
      <nav ref={ref} className={cls} {...props}>
        {children}
      </nav>
    );
  }
);

NavigationBarTool.displayName = "NavigationBarTool";

export default NavigationBarTool;
