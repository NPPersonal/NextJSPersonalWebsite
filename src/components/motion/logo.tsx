"use client";
import React from "react";
import { motion, AnimationProps } from "framer-motion";
import { cn } from "@/lib/utils";

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
  repeatType: "mirror",
  repeatDelay: 3,
};

export type LogoProps = React.ComponentProps<"div"> & {
  strokeWidth?: number;
  animTransition?: AnimationProps["transition"];
};

export default function Logo({
  className,
  strokeWidth = 5,
  animTransition = transition,
  ...props
}: LogoProps) {
  const cls = cn("stroke-foreground", className);
  return (
    <div className={cls} {...props}>
      <motion.svg
        className="overflow-visible w-[32px] h-[32px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="17 17 100 100"
      >
        <motion.circle
          cx="68"
          cy="65"
          r="64"
          variants={icon}
          initial="out"
          animate="in"
          strokeWidth={strokeWidth}
          fill="none"
          transition={{ ...transition, ...animTransition }}
        />
        <motion.path
          className="fill-background"
          d="M 28.842255,20.676804 48.548124,84.315078 C 48.364229,59.63207 60.485012,44.43075 93.348712,48.906339 Z"
          variants={icon}
          initial="out"
          animate="in"
          strokeWidth={strokeWidth}
          transition={{ ...transition, ...animTransition }}
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
          transition={{ ...transition, ...animTransition }}
        />
        <motion.path
          className="fill-foreground"
          d="M 28.842255,20.676804 48.548124,84.315078 C 48.364229,59.63207 60.485012,44.43075 93.348712,48.906339 Z"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ ...transition, ...animTransition }}
        />
        <motion.circle
          className="fill-foreground"
          cx="87.455132"
          cy="87.601944"
          r="27.635511"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ ...transition, ...animTransition }}
        />
      </motion.svg>
    </div>
  );
}
