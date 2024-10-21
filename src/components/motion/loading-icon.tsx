"use client";
import React from "react";
import { motion, AnimationProps } from "framer-motion";

const icon: AnimationProps["variants"] = {
  out: {
    pathLength: 0,
  },
  in: {
    pathLength: 1,
  },
};

const transition: AnimationProps["transition"] = {
  duration: 1,
  ease: "easeInOut",
  repeat: Infinity,
  repeatType: "reverse",
  repeatDelay: 1,
};

export type LoadingIconProps = {
  strokeWidth?: number;
};

export default function LoadingIcon({ strokeWidth = 3 }: LoadingIconProps) {
  return (
    <div className="stroke-foreground">
      <motion.svg
        className="overflow-visible w-[100px] h-[100px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="17 17 100 100"
      >
        <motion.path
          className="fill-background"
          d="M 28.842255,20.676804 48.548124,84.315078 C 48.364229,59.63207 60.485012,44.43075 93.348712,48.906339 Z"
          variants={icon}
          initial="out"
          animate="in"
          strokeWidth={strokeWidth}
          transition={transition}
        />
        <motion.circle
          className="fill-background"
          cx="87.455132"
          cy="87.601944"
          r="27.635511"
          variants={icon}
          initial="out"
          animate="in"
          strokeWidth={strokeWidth}
          fill="none"
          transition={transition}
        />
      </motion.svg>
    </div>
  );
}
