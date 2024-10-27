"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { SiteRouteProps } from "@/lib/site-routes";
import { Link } from "@/i18n/routing";
import { Typography } from "./ui/typography";
import FramerMotionWrapper from "./motion/framer-motion-client";

export interface NavigationBarMenuCompactProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenu> {
  siteRoutes: Array<SiteRouteProps>;
}

const NavigationBarMenuCompact = React.forwardRef<
  React.ElementRef<typeof DropdownMenu>,
  NavigationBarMenuCompactProps
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(({ siteRoutes, ...props }, ref) => {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <DropdownMenu
      open={open}
      onOpenChange={(value: boolean) => setOpen(value)}
      {...props}
    >
      <DropdownMenuTrigger className="flex items-center focus:outline-none">
        <FramerMotionWrapper animate={{ rotate: open ? 90 : 0 }}>
          <HamburgerMenuIcon className="w-8 h-8 cursor-pointer" />
        </FramerMotionWrapper>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {siteRoutes.map((data, i) => {
          if (data.children) {
            return (
              <DropdownMenuSub key={`${data.name}-${i}`}>
                <DropdownMenuSubTrigger className="hover:bg-foreground/90 cursor-pointer">
                  <Typography variant="strong">{data.name}</Typography>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {data.children.map((childrenRoute, ci) => {
                      return (
                        <Link
                          key={`${data.name}-${childrenRoute.name}-${ci}`}
                          href={
                            childrenRoute.metadata
                              ? childrenRoute.metadata.route
                              : ""
                          }
                        >
                          <DropdownMenuItem className="cursor-pointer">
                            <Typography variant="strong">
                              {childrenRoute.name}
                            </Typography>
                          </DropdownMenuItem>
                        </Link>
                      );
                    })}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            );
          } else {
            return (
              <Link
                key={`${data.name}-${i}`}
                href={data.metadata ? data.metadata.route : ""}
              >
                <DropdownMenuItem className="hover:bg-foreground/90 cursor-pointer">
                  <Typography variant="strong">{data.name}</Typography>
                </DropdownMenuItem>
              </Link>
            );
          }
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

NavigationBarMenuCompact.displayName = "NavigationBarMenuCompact";

export default NavigationBarMenuCompact;
