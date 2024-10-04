"use client";
import React from "react";
import { useInView, IntersectionOptions } from "react-intersection-observer";

export type RenderInViewProps = React.ComponentProps<"div"> & {
  options?: IntersectionOptions;
};

/**
 * Display children component when scroll in viewport
 *
 * Base on https://www.npmjs.com/package/react-intersection-observer
 *
 * @param option https://www.npmjs.com/package/react-intersection-observer#api
 * @returns
 */
export default function RenderInView({
  options = undefined,
  children,
  ...props
}: RenderInViewProps) {
  const [ref, inView] = useInView(options);

  return (
    <div ref={ref} {...props}>
      {inView ? children : null}
    </div>
  );
}
