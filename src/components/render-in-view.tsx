"use client";
import React from "react";
import { useInView, IntersectionOptions } from "react-intersection-observer";

export type RenderInViewProps = React.ComponentProps<"div"> & {
  options?: IntersectionOptions;
  delayMS?: number;
};
export default function RenderInView({
  options = undefined,
  delayMS = 0,
  children,
  ...props
}: RenderInViewProps) {
  const [ref, inView] = useInView(options);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    let timeout = null;
    if (delayMS > 0) {
      timeout = setTimeout(() => {
        setReady(true);
      }, delayMS);
    } else {
      setReady(true);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ready ? ref : null} {...props}>
      {inView ? children : null}
    </div>
  );
}
