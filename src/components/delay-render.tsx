"use client";
import { v4 as uuidv4 } from "uuid";
import React from "react";

export type DelayRenderProps = React.ComponentProps<"div"> & {
  delayMS?: number;
};

function DelayComp({ delayMS = 0, children }: DelayRenderProps) {
  const [ready, setReady] = React.useState(false);
  const timerId = React.useRef<number | undefined>(undefined);

  React.useEffect(() => {
    if (delayMS > 0) {
      if (timerId.current) clearTimeout(timerId.current);
      timerId.current = window.setTimeout(() => {
        setReady(true);
      }, delayMS);
    } else {
      setReady(true);
    }
    return () => {
      clearTimeout(timerId.current);
      setReady(false);
    };
  }, [delayMS]);

  return <div>{ready ? children : null}</div>;
}

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
  return (
    <DelayComp key={uuidv4()} delayMS={delayMS}>
      {children}
    </DelayComp>
  );
}
