"use client";
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
import { SiteRouteProps } from "@/lib/site-routes";

export interface NavigationBarMenuProps
  extends React.ComponentPropsWithRef<typeof NavigationMenu> {
  blogData: SiteRouteProps;
  projectData: SiteRouteProps;
  aboutmeData: SiteRouteProps;
  contactData: SiteRouteProps;
}

const NavigationBarMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenu>,
  NavigationBarMenuProps
>(({ blogData, projectData, aboutmeData, contactData, ...props }, ref) => {
  const [value, setValue] = React.useState<string>("");
  return (
    <NavigationMenu
      ref={ref}
      value={value}
      onValueChange={(value: string) => setValue(value)}
      {...props}
    >
      <NavigationMenuList>
        <NavigationMenuItem value="blog">
          <NavigationMenuTrigger
            className="bg-accent"
            enableChevron={blogData.children ? true : false}
          >
            <Link
              href={blogData.metadata ? blogData.metadata.route : ""}
              onClick={() => setValue("")}
            >
              <Typography variant="strong">{blogData.name}</Typography>
            </Link>
          </NavigationMenuTrigger>
        </NavigationMenuItem>
        <NavigationMenuItem value="projects">
          <NavigationMenuTrigger
            className="bg-accent"
            enableChevron={projectData.children ? true : false}
            onPointerMove={(e) => e.preventDefault()}
            onPointerLeave={(e) => e.preventDefault()}
          >
            <Typography variant="strong">{projectData.name}</Typography>
          </NavigationMenuTrigger>
          {projectData.children ? (
            <NavigationMenuContent
              onPointerMove={(e) => e.preventDefault()}
              onPointerLeave={(e) => e.preventDefault()}
            >
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                {projectData.children.map((item, i) => {
                  return (
                    <Link
                      key={`${item.name}-${i}`}
                      href={item.metadata ? item.metadata.route : ""}
                      className="rounded-lg hover:bg-foreground/10"
                      onClick={() => setValue("")}
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
        <NavigationMenuItem value="about">
          <NavigationMenuTrigger
            className="bg-accent"
            enableChevron={aboutmeData.children ? true : false}
          >
            <Link
              href={aboutmeData.metadata ? aboutmeData.metadata.route : ""}
              onClick={() => setValue("")}
            >
              <Typography variant="strong">{aboutmeData.name}</Typography>
            </Link>
          </NavigationMenuTrigger>
        </NavigationMenuItem>
        <NavigationMenuItem value="contact">
          <NavigationMenuTrigger
            className="bg-accent"
            enableChevron={contactData.children ? true : false}
            onPointerMove={(e) => e.preventDefault()}
            onPointerLeave={(e) => e.preventDefault()}
          >
            <Typography variant="strong">{contactData.name}</Typography>
          </NavigationMenuTrigger>
          {contactData.children ? (
            <NavigationMenuContent
              onPointerMove={(e) => e.preventDefault()}
              onPointerLeave={(e) => e.preventDefault()}
            >
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                {contactData.children.map((item, i) => {
                  return (
                    <Link
                      key={`${item.name}-${i}`}
                      href={item.metadata ? item.metadata.route : ""}
                      className="rounded-lg hover:bg-foreground/10"
                      onClick={() => setValue("")}
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
      </NavigationMenuList>
    </NavigationMenu>
  );
});

NavigationBarMenu.displayName = "NavigationBarMenu";

export default NavigationBarMenu;
