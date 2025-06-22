export type Locale = (typeof locales)[number];

export const locales = ["en", "zh-TW"] as const;
export const defaultLocale: Locale = "en";
export const localeOptions = [
  { key: "en", optionName: "English" },
  { key: "zh-TW", optionName: "繁體中文" },
];
export const strToLocale = (localStr: string) => {
  const locale = localStr as Locale;
  if (locales.includes(locale)) return locale;
  else throw new Error(`Locale ${localStr} not match any of ${locales}`);
};
