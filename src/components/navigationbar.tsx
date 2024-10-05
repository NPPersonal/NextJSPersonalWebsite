import React from "react";
import { HomeIcon } from "@radix-ui/react-icons";
import ModeSwitcher from "./mode-switcher";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Typography } from "./ui/typography";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

const getBlogs = async () => {
  const t = await getTranslations("Navigation");
  return {
    name: t("blogs"),
    metadata: {
      route: "/blogs",
    },
    children: undefined,
  };
};

const getProjects = async () => {
  const t = await getTranslations("Navigation");
  return {
    name: t("projects"),
    metadata: undefined,
    children: [
      {
        name: t("projects_web"),
        metadata: {
          route: "/projects/web/",
          description: t("projects_web_description"),
        },
      },
      {
        name: t("projects_mobile"),
        metadata: {
          route: "/projects/mobile/",
          description: t("projects_mobile_description"),
        },
      },
      {
        name: t("projects_machine_learning"),
        metadata: {
          route: "/projects/machine-learning/",
          description: t("projects_machine_learning_description"),
        },
      },
    ],
  };
};

const getAboutMe = async () => {
  const t = await getTranslations("Navigation");
  return {
    name: t("aboutme"),
    metadata: {
      route: "/aboutme",
    },
    children: undefined,
  };
};

const getContacts = async () => {
  const t = await getTranslations("Navigation");
  return {
    name: t("contacts"),
    metadata: undefined,
    children: [
      {
        name: t("contacts_linkedin"),
        metadata: {
          route: "https://www.linkedin.com/in/ming-chung-hung-38125a117/",
          description: t("contacts_linkedin_description"),
        },
      },
      {
        name: t("contacts_message_me"),
        metadata: {
          route: "/contact/message-me/",
          description: t("contacts_message_me_description"),
        },
      },
    ],
  };
};

export default async function NavigationBar() {
  const blogData = await getBlogs();
  const projectData = await getProjects();
  const aboutmeData = await getAboutMe();
  const contactData = await getContacts();
  return (
    <nav
      className="sticky z-10 bg-accent top-0 left-0
    right-0 bottom-0 p-4 flex flex-row justify-center items-center shadow-lg"
    >
      <Link className="cursor-pointer" href="/">
        <HomeIcon className="w-8 h-8" />
      </Link>
      <div className="grow-0 sm:grow-[1]" />
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className="bg-accent"
              enableChevron={blogData.children ? true : false}
            >
              <Link href={blogData.metadata.route}>
                <Typography variant="strong">{blogData.name}</Typography>
              </Link>
            </NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className="bg-accent"
              enableChevron={projectData.children ? true : false}
            >
              <Typography variant="strong">{projectData.name}</Typography>
            </NavigationMenuTrigger>
            {projectData.children ? (
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  {projectData.children.map((item, i) => {
                    return (
                      <Link
                        key={`${item.name}-${i}`}
                        href={item.metadata.route}
                        className="rounded-lg hover:bg-foreground/10"
                      >
                        <li>
                          <div>
                            <Typography className="text-lg" variant="strong">
                              {item.name}
                            </Typography>
                            <Typography
                              className="text-muted-foreground"
                              variant="p"
                            >
                              {item.metadata.description}
                            </Typography>
                          </div>
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            ) : null}
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className="bg-accent"
              enableChevron={aboutmeData.children ? true : false}
            >
              <Link href={aboutmeData.metadata.route}>
                <Typography variant="strong">{aboutmeData.name}</Typography>
              </Link>
            </NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className="bg-accent"
              enableChevron={contactData.children ? true : false}
            >
              <Typography variant="strong">{contactData.name}</Typography>
            </NavigationMenuTrigger>
            {contactData.children ? (
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  {contactData.children.map((item, i) => {
                    return (
                      <Link
                        key={`${item.name}-${i}`}
                        href={item.metadata.route}
                        className="rounded-lg hover:bg-foreground/10"
                      >
                        <li>
                          <div>
                            <Typography className="text-lg" variant="strong">
                              {item.name}
                            </Typography>
                            <Typography
                              className="text-muted-foreground"
                              variant="p"
                            >
                              {item.metadata.description}
                            </Typography>
                          </div>
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            ) : null}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="grow-0 sm:grow-[1]" />
      <ModeSwitcher />
    </nav>
  );
}
