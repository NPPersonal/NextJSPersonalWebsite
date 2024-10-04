"use client";
import React from "react";
import { HTMLMotionProps, motion } from "framer-motion";

export type FramerMotionWrapperProps = HTMLMotionProps<"div">;

const FramerMotionWrapper = React.forwardRef<
  HTMLDivElement,
  FramerMotionWrapperProps
>(({ children, ...props }, ref) => {
  return (
    <motion.div ref={ref} {...props}>
      {children}
    </motion.div>
  );
});

FramerMotionWrapper.displayName = "FramerMotionWrapper";

export default FramerMotionWrapper;
