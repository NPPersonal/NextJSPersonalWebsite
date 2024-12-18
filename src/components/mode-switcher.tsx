"use client";
import React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
// import { Button, ButtonProps } from "./ui/button";
import { useTheme } from "next-themes";
import FramerMotionWrapper from "./motion/framer-motion-client";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ModeSwitcherProps extends React.ComponentProps<"div"> {}

const motionAnimate = {
  hidden: { opacity: 0, scale: 0, x: 40 },
  visible: { opacity: 1, scale: 1, x: 0 },
};

const motionTransition = {
  type: "spring",
  damping: 30,
  stiffness: 110,
};

const ModeSwitcher = React.forwardRef<HTMLDivElement, ModeSwitcherProps>(
  ({ ...props }, ref) => {
    const [mounted, setMounted] = React.useState(false);
    const { resolvedTheme, setTheme } = useTheme();
    const handleTheme = () => {
      setTheme(resolvedTheme === "light" ? "dark" : "light");
    };
    // Because we cannot know the theme on the server,
    // many of the values returned from useTheme will be undefined until mounted on the client
    // https://github.com/pacocoursey/next-themes?tab=readme-ov-file#avoid-hydration-mismatch
    React.useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) {
      return null;
    }

    return (
      <div
        ref={ref}
        className="relative w-8 h-8 overflow-hidden cursor-pointer"
        onClick={handleTheme}
        {...props}
      >
        <FramerMotionWrapper
          className="absolute"
          initial="hidden"
          animate={resolvedTheme === "dark" ? "visible" : "hidden"}
          transition={motionTransition}
          variants={motionAnimate}
        >
          <SunIcon className="w-8 h-8" />
        </FramerMotionWrapper>
        <FramerMotionWrapper
          className="absolute"
          initial="hidden"
          animate={resolvedTheme === "light" ? "visible" : "hidden"}
          transition={motionTransition}
          variants={motionAnimate}
        >
          <MoonIcon className="w-8 h-8" />
        </FramerMotionWrapper>
      </div>
    );
  }
);

ModeSwitcher.displayName = "ModeSwitcher";

export default ModeSwitcher;
