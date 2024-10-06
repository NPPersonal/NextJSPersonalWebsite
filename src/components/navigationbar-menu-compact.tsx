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
import { getRouteCollection } from "@/lib/site-routes";
import { Link } from "@/i18n/routing";
import { Typography } from "./ui/typography";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface NavigationBarMenuCompactProps
  extends React.ComponentProps<typeof DropdownMenu> {}

const NavigationBarMenuCompact = React.forwardRef<
  typeof DropdownMenu,
  NavigationBarMenuCompactProps
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(async ({ ...props }, ref) => {
  const siteRoutes = await getRouteCollection();
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        <HamburgerMenuIcon className="w-8 h-8 cursor-pointer" />
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
