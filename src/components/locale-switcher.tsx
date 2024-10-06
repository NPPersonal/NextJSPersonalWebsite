"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Typography } from "./ui/typography";
import { localeOptions, usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { GlobeIcon } from "@radix-ui/react-icons";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LocaleSwitcherProps
  extends React.ComponentProps<typeof DropdownMenu> {}

const LocaleSwitcher = React.forwardRef<
  typeof DropdownMenu,
  LocaleSwitcherProps
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(({ ...props }, ref) => {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();
  const handleChangeLocale = (nextLocaleKey: string) => {
    if (currentLocale !== nextLocaleKey) {
      router.replace(pathname, { locale: nextLocaleKey });
    }
  };
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        <GlobeIcon className="cursor-pointer w-8 h-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {localeOptions.map((option, i) => {
          return (
            <DropdownMenuItem
              key={`${option.key}-${i}`}
              className="hover:bg-foreground/10 cursor-pointer"
              disabled={option.key === currentLocale}
              onClick={() => handleChangeLocale(option.key)}
            >
              <Typography variant="strong">{option.optionName}</Typography>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

LocaleSwitcher.displayName = "LocaleSwitcher";

export default LocaleSwitcher;
