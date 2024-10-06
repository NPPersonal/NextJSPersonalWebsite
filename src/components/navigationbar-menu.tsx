import React from "react";
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

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface NavigationBarMenuProps
  extends React.ComponentProps<typeof NavigationMenu> {}

const NavigationBarMenu = React.forwardRef<
  typeof NavigationMenu,
  NavigationBarMenuProps
>(async () => {
  const blogData = await getBlogs();
  const projectData = await getProjects();
  const aboutmeData = await getAboutMe();
  const contactData = await getContacts();
  return (
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
  );
});

NavigationBarMenu.displayName = "NavigationBarMenu";

export default NavigationBarMenu;
