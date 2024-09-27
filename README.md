# PersonalWebsite

This is a personal website and porting from [Gatesby](https://github.com/NPPersonal/GatsbyPersonalWebsite) to NextJS.

## Framework

- **[Next.js](https://nextjs.org)**: Core
- **[next-intl](https://next-intl-docs.vercel.app/)**: Localization

### NextJS

Features that are enabled

- App router
- Taiwind css
- Typescript
- Eslint

### next-intl

Following are used for integration and workflow

- [Typescript](https://next-intl-docs.vercel.app/docs/workflows/typescript): For autocompletion
- [Crowdin](https://next-intl-docs.vercel.app/docs/workflows/localization-management): Decouple locaization from project
- [Sherlock](https://next-intl-docs.vercel.app/docs/workflows/vscode-integration#sherlock): Translation message extraction
- [Consistent usage of navigation APIs](https://next-intl-docs.vercel.app/docs/workflows/linting#consistent-usage-of-navigation-apis): Make sure developer use next-intl navigation APIs. Developers will be prompted to import from @/i18n/routing when they try to import navigation APIs from Next.js

## Version control branch

- **main**: For final stable version
- **nightly**: For every single development iteration
- **locale**: Only for localization translation. ⚠️ **Only modify source translation file en.json, nothing less**
  - When source translation file(en.json) updated in local development then it need to be merged into this branch and pushed to github so Crowdin will be notified about translation
  - When Crowdin completed translation message it will make pull request to this branch on github ready to be merge from l10n_locale branch
  - Local development need to pull and merge from this branch in order to receive update to date translation messages
- **l10n_locale**: Setup and used by Crowdin. ⚠️ **Don't touch it**

# NextJS

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
