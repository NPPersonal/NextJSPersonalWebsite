module.exports = [
  {
    rules: {
      // Consistently import navigation APIs from `@/i18n/routing`
      "no-restricted-imports": [
        "error",
        {
          name: "next/link",
          message: "Please import from `@/i18n/routing` instead.",
        },
        {
          name: "next/navigation",
          importNames: [
            "redirect",
            "permanentRedirect",
            "useRouter",
            "usePathname",
          ],
          message: "Please import from `@/i18n/routing` instead.",
        },
      ],
    },
  },
];
