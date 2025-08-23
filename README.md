## Getting Started

Install packages

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Migration Plan

1. Migrate `pages/[some-dynamic-route]` in the pages router that conflicts to the new `app/[lng]/` route in the apps router
2. Migrating Static Pages or performance sensitive pages to app router to enable SSG
3. Migrate other routes until every routes is in the app router
4. Remove code for next-i18next, reference to the steps in `/src/i18n/migration.ts`

## Actions made to support both routers

1. Referencing [this blog](https://www.locize.com/blog/i18n-next-app-router) to set up i18next for app router
2. Referencing [this discussion](https://github.com/vercel/next.js/discussions/36308) to prevent middleware running on requests served in /public folder
3. Referencing [this README](https://github.com/i18next/next-i18next) to setup next-i18next for pages router
4. Remove i18n config from next.config.js which causes it to redirect to 404 for app router pages (the i18n field is made for page router)
5. Add rewrite logic for pages router in the i18n middleware
6. Since now the `locale` prop is not set to the context in getStaticProps, I switched to getServerSideProps to get lang from the headers in pages route

## About this project

- Using [jiti](https://github.com/unjs/jiti#programmatic) to import ts files into js config file
- Using the chain approach for multiple middlewares
