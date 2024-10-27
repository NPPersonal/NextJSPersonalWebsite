import React from "react";
import ModeSwitcher from "./mode-switcher";
import { Link } from "@/i18n/routing";
import LocaleSwitcher from "./locale-switcher";
import NavigationBarMenu from "./navigationbar-menu";
import NavigationBarMenuCompact from "./navigationbar-menu-compact";
import {
  getAboutMe,
  getBlogs,
  getContacts,
  getProjects,
} from "@/lib/site-routes";
import Logo from "./motion/logo";
import NavigationBarTool from "./navigationbar-tool";

export default async function NavigationBar() {
  const blogData = await getBlogs();
  const projectData = await getProjects();
  const aboutmeData = await getAboutMe();
  const contactData = await getContacts();
  const menuCollection = [blogData, projectData, aboutmeData, contactData];
  return (
    <NavigationBarTool
      className="sticky z-10 top-0 left-0
    right-0 bottom-0 py-4 flex flex-row items-center"
    >
      <div className="pl-4 pr-4 sm:pr-0">
        <Link className="cursor-pointer" href="/" aria-label="Home">
          <Logo
            className="w-8 h-8"
            strokeWidth={6}
            animTransition={{ repeatDelay: 5 }}
          />
        </Link>
      </div>
      <div className="grow-0 sm:grow-[1]" />
      <div className="hidden sm:block">
        <NavigationBarMenu
          blogData={blogData}
          projectData={projectData}
          aboutmeData={aboutmeData}
          contactData={contactData}
        />
      </div>
      <div className="block sm:hidden">
        <NavigationBarMenuCompact siteRoutes={menuCollection} />
      </div>
      <div className="grow-[1]" />
      <div className="pr-4">
        <LocaleSwitcher />
      </div>
      <div className="pr-4">
        <ModeSwitcher />
      </div>
    </NavigationBarTool>
  );
}
