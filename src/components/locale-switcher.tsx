"use client";
import React, { useEffect, useState, useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Typography } from "./ui/typography";
import { GlobeIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { getUserLocale, setUserLocale } from "@/services/locale";
import { localeOptions, strToLocale } from "@/i18n/config";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LocaleSwitcherProps
  extends React.ComponentProps<typeof DropdownMenu> {}

const LocaleSwitcher = React.forwardRef<
  typeof DropdownMenu,
  LocaleSwitcherProps
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(({ ...props }, ref) => {
  const [currentLocale, setCurrentLocale] = useState<undefined | string>(
    undefined
  );
  const [settingCookieLocale, setCookieLocale] = useTransition();

  useEffect(() => {
    const fetchCurrentLocale = async () => {
      const locale = await getUserLocale();
      setCurrentLocale(locale);
    };
    fetchCurrentLocale();
  }, []);

  const handleChangeLocale = (nextLocaleKey: string) => {
    if (currentLocale !== nextLocaleKey) {
      const locale = strToLocale(nextLocaleKey);
      setCookieLocale(async () => {
        await setUserLocale(locale);
        setCurrentLocale(locale);
      });
    }
  };

  if (currentLocale === undefined || settingCookieLocale) return null;

  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger
        className="flex items-center focus:outline-none"
        aria-label="Languages"
      >
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
              <Typography className="flex items-center" variant="strong">
                {option.key === currentLocale ? <ArrowRightIcon /> : null}
                {option.optionName}
              </Typography>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

LocaleSwitcher.displayName = "LocaleSwitcher";

export default LocaleSwitcher;
