"use client";
import React from "react";
import { motion, AnimationProps } from "framer-motion";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

const anim: AnimationProps["variants"] = {
  start: {
    x: -100,
  },
  end: {
    x: 100,
  },
};

const transition: AnimationProps["transition"] = {
  duration: 2,
  ease: "easeInOut",
  repeat: Infinity,
  repeatDelay: 1,
};

export type SendingMessageAnimProps = {
  startX?: number;
  endX?: number;
};

export default function SendingMessageAnim({
  startX = 0,
  endX = 100,
}: SendingMessageAnimProps) {
  const newAnim = {
    ...anim,
    start: {
      x: startX - 20,
    },
    end: {
      x: endX + 20,
    },
  };

  return (
    <div className={`overflow-hidden w-full`}>
      <motion.div
        variants={newAnim}
        initial="start"
        animate="end"
        transition={transition}
      >
        <PaperPlaneIcon className="w-8 h-8" />
      </motion.div>
    </div>
  );
}
