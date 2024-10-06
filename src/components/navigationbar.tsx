import React from "react";
import { HomeIcon } from "@radix-ui/react-icons";
import ModeSwitcher from "./mode-switcher";
import { Link } from "@/i18n/routing";
import LocaleSwitcher from "./locale-switcher";
import NavigationBarMenu from "./navigationbar-menu";
import NavigationBarMenuCompact from "./navigationbar-menu-compact";

export default function NavigationBar() {
  return (
    <nav
      className="sticky z-10 bg-accent top-0 left-0
    right-0 bottom-0 py-4 flex flex-row items-center shadow-lg"
    >
      <div className="pl-4 pr-4 sm:pr-0">
        <Link className="cursor-pointer" href="/">
          <HomeIcon className="w-8 h-8" />
        </Link>
      </div>
      <div className="grow-0 sm:grow-[1]" />
      <div className="hidden sm:block">
        <NavigationBarMenu />
      </div>
      <div className="block sm:hidden">
        <NavigationBarMenuCompact />
      </div>
      <div className="grow-[1]" />
      <div className="pr-4">
        <LocaleSwitcher />
      </div>
      <div className="pr-4">
        <ModeSwitcher />
      </div>
    </nav>
  );
}
