import { getTranslations } from "next-intl/server";

export type SiteRouteProps = {
  /** name of route */
  name: string;
  /** metadata of route can be undefined */
  metadata: { [key: string]: string } | undefined;
  /** children routes can be undefiend */
  children?: Array<SiteRouteProps> | undefined;
};

export const getBlogs: () => Promise<SiteRouteProps> = async () => {
  const t = await getTranslations("Navigation");
  return {
    name: t("blogs"),
    metadata: {
      route: "/blogs",
    },
    children: undefined,
  };
};

export const getProjects: () => Promise<SiteRouteProps> = async () => {
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

export const getAboutMe: () => Promise<SiteRouteProps> = async () => {
  const t = await getTranslations("Navigation");
  return {
    name: t("aboutme"),
    metadata: {
      route: "/aboutme",
    },
    children: undefined,
  };
};

export const getContacts = async () => {
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
