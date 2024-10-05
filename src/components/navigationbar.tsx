import React from "react";
import { Button } from "./ui/button";
import { HomeIcon } from "@radix-ui/react-icons";
import ModeSwitcher from "./mode-switcher";

export default function NavigationBar() {
  return (
    <div
      className="sticky z-10 bg-accent top-0 left-0 
    right-0 bottom-0 p-4 flex flex-row items-center shadow-lg"
    >
      <Button className="bg-accent" variant="icon" size="icon">
        <HomeIcon className="w-8 h-8" />
      </Button>
      <div className="grow-[2]"></div>
      <ModeSwitcher />
    </div>
  );
}
