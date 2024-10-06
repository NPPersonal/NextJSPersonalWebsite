import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Typography } from "./ui/typography";
import { Link } from "@/i18n/routing";
import {
  getAboutMe,
  getBlogs,
  getContacts,
  getProjects,
} from "@/lib/site-routes";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface NavigationBarMenuProps
  extends React.ComponentProps<typeof NavigationMenu> {}

const NavigationBarMenu = React.forwardRef<
  typeof NavigationMenu,
  NavigationBarMenuProps
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(async ({ ...props }, ref) => {
  const blogData = await getBlogs();
  const projectData = await getProjects();
  const aboutmeData = await getAboutMe();
  const contactData = await getContacts();
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className="bg-accent"
            enableChevron={blogData.children ? true : false}
          >
            <Link href={blogData.metadata ? blogData.metadata.route : ""}>
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
                      href={item.metadata ? item.metadata.route : ""}
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
                            {item.metadata ? item.metadata.description : ""}
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
            <Link href={aboutmeData.metadata ? aboutmeData.metadata.route : ""}>
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
