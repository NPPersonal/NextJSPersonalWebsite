import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface NavigationBarMenuCompactProps
  extends React.ComponentProps<typeof DropdownMenu> {}

const NavigationBarMenuCompact = React.forwardRef<
  typeof DropdownMenu,
  NavigationBarMenuCompactProps
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(({ ...props }, ref) => {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        <HamburgerMenuIcon className="w-8 h-8 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

NavigationBarMenuCompact.displayName = "NavigationBarMenuCompact";

export default NavigationBarMenuCompact;
