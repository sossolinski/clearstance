# ClearStance

Production website for ClearStance, an independent advisory practice focused on crisis readiness, crisis management, exercises and simulations, facilitation, and organisational preparedness.

The implementation is based on the approved ClearStance v10 homepage reference. It preserves the reference’s visual identity, Polish homepage copy, photography, section order, proportions, and restrained motion while extending the design into a complete bilingual website.

## Technology

- Astro 7 with static output
- TypeScript in strict mode
- Tailwind CSS 4 through its Vite plugin
- Astro Content Collections
- Markdown for Insights
- Sveltia CMS as an optional Git-based editorial interface
- A Cloudflare Worker for the contact endpoint, with static assets for the site
- A small amount of framework-free JavaScript for navigation, progressive reveal effects, and contact-form enhancement

There is no database, proprietary CMS, frontend framework, form SaaS, CRM, or paid application dependency. Insight content remains in Git. Form submissions are delivered by email and are not stored.

## Requirements

- Node.js 22.12 or newer
- npm 10.9.8 (pinned in `package.json`)

## Local development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Astro will print the local URL, normally `http://localhost:4321`.

## Validation and production build

Run Astro and TypeScript validation:

```bash
npm run check
```

Build the static site:

```bash
npm run build
```

Check generated internal links after building:

```bash
npm run check:links
```

Run standalone TypeScript validation:

```bash
npm run typecheck
```

Run contact endpoint tests:

```bash
npm run test:contact
```

Validate the Cloudflare Worker bundle:

```bash
npm run check:worker
```

Preview the production output:

```bash
npm run preview
```

The deployable static output is written to `dist/`.

## Project structure

```text
src/
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── pages/
│   ├── sections/
│   └── ui/
├── content/
│   └── insights/
│       ├── pl/
│       └── en/
├── i18n/
│   ├── routes.ts
│   └── translations.ts
├── layouts/
│   ├── ArticleLayout.astro
│   └── BaseLayout.astro
├── pages/
│   ├── en/
│   ├── insights/
│   ├── index.astro
│   ├── kontakt.astro
│   ├── o-clearstance.astro
│   ├── oferta.astro
│   └── sitemap.xml.ts
├── styles/
│   └── global.css
└── content.config.ts

public/
├── admin/
├── favicon/
├── images/
├── social/
├── robots.txt
└── site.webmanifest

worker/
├── contact.ts
└── index.ts

tests/
└── contact.test.mjs

wrangler.jsonc
```

## Bilingual architecture

Polish is the default locale and uses unprefixed routes:

```text
/
/oferta
/insights
/insights/[slug]
/o-clearstance
/kontakt
```

English uses the `/en/` prefix:

```text
/en/
/en/services
/en/insights
/en/insights/[slug]
/en/about
/en/contact
```

Astro’s native i18n configuration is defined in `astro.config.mjs`. Localised route names and homepage anchor mappings live in `src/i18n/routes.ts`. Interface and page copy live in `src/i18n/translations.ts`.

Shared components receive a `locale` prop. The Polish and English versions therefore use the same layout, behaviour, and visual system rather than maintaining unrelated page implementations.

Every page passes its exact equivalent route to the language switcher. Insight pages resolve their equivalent through `translationKey`; when no translation exists, the switcher falls back to the other language’s Insights index.

## Adding a Polish Insight

Create a Markdown file in:

```text
src/content/insights/pl/
```

Use frontmatter matching the schema in `src/content.config.ts`:

```yaml
---
title: "Tytuł"
description: "Krótki opis materiału."
publishedAt: 2026-07-23
updatedAt: 2026-07-30
author: "ClearStance"
slug: "polski-slug"
locale: "pl"
translationKey: "stable-language-neutral-key"
category: "Kategoria"
tags:
  - "tag"
featured: false
draft: true
seoTitle: "Tytuł SEO | ClearStance"
seoDescription: "Opis SEO."
---
```

Set `draft: true` while content is not ready for publication. Draft entries are generated as clearly labelled demonstration/review pages with `noindex` metadata and are excluded from `sitemap.xml`.

## Adding an English Insight

Create a Markdown file in:

```text
src/content/insights/en/
```

Use the same frontmatter fields with:

```yaml
locale: "en"
slug: "english-slug"
translationKey: "stable-language-neutral-key"
```

English copy should read as original professional English rather than a literal translation.

## Connecting translations

Give the Polish and English entries the same `translationKey`:

```yaml
translationKey: "crisis-exercise-design"
```

Their route slugs may differ:

```yaml
# Polish
slug: "projektowanie-cwiczen-kryzysowych"

# English
slug: "designing-crisis-exercises"
```

The article route and language switcher will pair the entries automatically. Articles are not required to exist in both languages.

## Article formatting

The article layout supports:

- headings from H1 to H4;
- paragraphs;
- ordered and unordered lists;
- blockquotes and editorial callouts;
- links;
- images;
- tables;
- author, publication, update, category, and tag metadata.

The two included articles are explicitly marked draft/demonstration content. They demonstrate the collection schema, translated relationship, and long-form typography without being presented as published ClearStance Insights.

## Content management

The editorial interface is available at:

```text
https://clearstance.pl/admin/
```

Sveltia CMS is a browser-based Git editor. It does not hold content in a separate database. It reads and writes the existing Markdown files through the GitHub API; each saved change becomes a commit, which then triggers a Cloudflare rebuild through the connected Git repository.

The admin configuration lives in `public/admin/config.yml` and exposes two separate collections:

- **Insights — PL** → `src/content/insights/pl/`
- **Insights — EN** → `src/content/insights/en/`

Each collection matches `src/content.config.ts`: title, description, slug, publication and update dates, author, locale, `translationKey`, category, tags, featured and draft flags, SEO fields, and Markdown body. No second content schema is introduced.

To create an article, open the correct language collection, complete the fields, and leave `draft` enabled until editorial review is complete. Draft entries remain outside `sitemap.xml` and receive `noindex` metadata. Polish and English articles can be published independently.

Use the same language-neutral `translationKey` in corresponding PL and EN entries. For example:

```text
crisis-exercise-design
```

Matching keys connect the language switcher. Slugs and filenames may differ. The CMS does not translate content automatically and does not require a matching article.

CMS media is restricted to `public/images/insights/`. Upload filenames are slugified, raster images are converted to WebP within the configured size limit, and the approved brand imagery elsewhere in `public/images/` is outside the CMS media folder.

For local editing, start Astro with `npm run dev`, open `/admin/index.html` (Astro’s development server does not rewrite static directory indexes), choose the local repository workflow, and grant the browser access to this repository. The production Worker serves the same file at `/admin/`. The placeholder GitHub backend value is sufficient for local mode.

Before remote editorial use:

1. Create or identify the production GitHub repository and add it as this repository’s remote.
2. Replace `REPLACE_WITH_GITHUB_OWNER` in `public/admin/config.yml`.
3. Complete the isolated OAuth setup in `cloudflare/sveltia-cms-auth/README.md`.
4. Replace `REPLACE_WITH_AUTH_WORKER` with the deployed authenticator hostname.
5. Commit and deploy the updated configuration.

No CMS credentials belong in `config.yml`; that file is public by design.

## Images

The three approved images were extracted from the embedded data URIs in the supplied homepage prototype and saved as normal assets in `public/images/`.

Optimised WebP versions are used through `<picture>` elements with the extracted JPEGs as fallbacks. The social preview is generated from the approved hero image.

To regenerate the optimised assets:

```bash
npm run optimize:images
```

Always include explicit image dimensions, meaningful alternative text where the image conveys information, and intentional responsive crops.

## SEO and international SEO

The shared base layout provides:

- titles and meta descriptions;
- canonical URLs;
- Open Graph and social metadata;
- Polish, English, and x-default hreflang links;
- Organisation structured data;
- ProfessionalService data on the homepage;
- Article data for published Insights only.

`src/pages/sitemap.xml.ts` generates a static bilingual sitemap. It includes published Insights, excludes drafts, and adds alternates only when a real translated entry exists. `public/robots.txt` points to the sitemap.

## Contact form

The bilingual form is rendered on `/kontakt` and `/en/contact`. It collects only name, email, optional organisation, and message. `kontakt@clearstance.pl` remains visible as the public alternative.

The submission path is:

```text
static Astro page
  → POST /api/contact
  → ClearStance Cloudflare Worker
  → server-side validation and honeypot check
  → Cloudflare Turnstile Siteverify
  → Cloudflare Email binding
  → verified private destination
```

The Worker accepts form-encoded requests only, trims control characters, validates required fields, email syntax and length limits, and sends plain text. It never renders submitted HTML. The submitter’s validated address is used as Reply-To. Submissions are not written to a database, analytics product, CRM, or log by application code.

The private Gmail destination is available to the Worker only through the encrypted `CONTACT_DESTINATION_EMAIL` secret. It must never appear in HTML, client JavaScript, the Git repository, or public Cloudflare variables. `CONTACT_FROM_EMAIL` must be an address on the ClearStance routing domain, for example `website@clearstance.pl`; it is not the private destination.

### Local full-stack form test

1. Copy `.env.example` to `.env`.
2. Copy `.dev.vars.example` to `.dev.vars`.
3. Run:

```bash
npm run dev:cloudflare
```

The example files use Cloudflare’s documented Turnstile test keys. Wrangler simulates the email binding locally and does not deliver a production email. Do not use the test keys in production.

Run deterministic validation and successful-path tests with:

```bash
npm run test:contact
```

These tests use a mock email binding; they do not send email.

### Runtime configuration

Required production build variable:

```text
PUBLIC_TURNSTILE_SITE_KEY
```

Required encrypted Worker secrets:

```text
TURNSTILE_SECRET_KEY
CONTACT_DESTINATION_EMAIL
CONTACT_FROM_EMAIL
```

`TURNSTILE_EXPECTED_HOSTNAME=clearstance.pl` is committed as a non-secret Worker variable in `wrangler.jsonc`.

### Email Routing

In Cloudflare:

1. Go to **Compute → Email Service → Email Routing → Destination Addresses**.
2. Add the private Gmail inbox and complete the verification email.
3. Under **Routing Rules**, create the `kontakt@clearstance.pl` rule and forward it to that verified destination.
4. Keep the destination private. Do not commit it or expose it as a public build variable.
5. Enable sending from the `clearstance.pl` routing domain and keep the `EMAIL` binding declared in `wrangler.jsonc`.
6. Set `CONTACT_DESTINATION_EMAIL` directly to the verified Gmail destination. Do not send form notifications to `kontakt@clearstance.pl`, which could create routing recursion.

Cloudflare permits sends to verified destination addresses on its free plan. A production delivery must still be tested after the domain, binding, destination, and secrets are configured.

### Turnstile

Create a production Turnstile widget for `clearstance.pl` and add `www.clearstance.pl` only if that hostname will be used. Put the public site key in the Workers Build environment and the secret key in the Worker’s encrypted runtime secrets. The Worker validates every token through Siteverify and also checks the `contact` action and expected hostname.

## Cloudflare production setup

The target is Cloudflare Workers with Static Assets. Astro still produces static HTML in `dist/`; `wrangler.jsonc` routes only `/api/*` through the Worker and serves the rest as static assets.

Deployment checklist:

1. Push this repository to GitHub. The local repository currently has no remote configured.
2. In Cloudflare **Workers & Pages**, create a Worker named `clearstance` and connect the GitHub repository through Workers Builds.
3. Select the production branch, normally `main`.
4. Use build command `npm run build`.
5. Use deploy command `npm run deploy:cloudflare`.
6. Add `PUBLIC_TURNSTILE_SITE_KEY` as a Workers Build variable.
7. Add `TURNSTILE_SECRET_KEY`, `CONTACT_DESTINATION_EMAIL`, and `CONTACT_FROM_EMAIL` as encrypted runtime secrets under **Settings → Variables & Secrets**.
8. Configure and verify Email Routing and Turnstile as described above.
9. Add `clearstance.pl` as the Worker custom domain and confirm DNS is managed by Cloudflare.
10. Complete the Sveltia OAuth setup and update the two CMS configuration markers.
11. Run a real PL and EN form submission and confirm receipt and Reply-To in the verified destination inbox.
12. Confirm an Insight commit made through `/admin/` triggers a Workers Build and publishes the Markdown change.

The Worker name in Cloudflare must match the `name` in `wrangler.jsonc`. Static asset requests remain static; only API requests use the Workers Free request allowance.

For a manual production build and deploy:

```bash
npm run build
npm run deploy:cloudflare
```

This repository is prepared for Cloudflare but is not deployed automatically by this setup task. The earlier OpenAI/App Garden target is not used.

The canonical production origin is configured as:

```text
https://clearstance.pl
```

Change the `site` value in `astro.config.mjs` if the canonical domain changes.

## Privacy launch TODO

**TODO before public launch:** have the final privacy notice for the contact form reviewed and approved. The form collects name, email, optional organisation, and message solely to deliver an enquiry email. This documentation is an implementation description, not legal advice or a claim of regulatory compliance.

## Licensing

Direct dependencies and production assets are documented in `THIRD_PARTY_LICENSES.md`.

> Before introducing any new dependency, font, image, icon or other asset, verify that its licence permits free commercial use.

Do not add paid fonts, commercially restricted assets, proprietary icon packs, trial libraries, or dependencies with unclear licensing.
