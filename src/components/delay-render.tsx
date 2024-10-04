"use client";
import React from "react";

export type DelayRenderProps = React.ComponentProps<"div"> & {
  delayMS?: number;
};

/**
 * Display children component after a certain delay
 *
 * @param delayMS `number` duration for delay
 * @returns
 */
export default function DelayRender({
  delayMS = 0,
  children,
}: DelayRenderProps) {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    let timeout = undefined;
    if (delayMS > 0) {
      timeout = setTimeout(() => {
        setReady(true);
      }, delayMS);
    } else {
      setReady(true);
    }
    return () => clearTimeout(timeout);
  }, [delayMS]);

  return <div>{ready ? children : null}</div>;
}
