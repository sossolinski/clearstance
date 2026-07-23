# ClearStance

Production website for ClearStance, an independent advisory practice focused on crisis readiness, crisis management, exercises and simulations, facilitation, and organisational preparedness.

The implementation is based on the approved ClearStance v10 homepage reference. It preserves the reference’s visual identity, Polish homepage copy, photography, section order, proportions, and restrained motion while extending the design into a complete bilingual website.

## Technology

- Astro 7 with static output
- TypeScript in strict mode
- Tailwind CSS 4 through its Vite plugin
- Astro Content Collections
- Markdown for Insights
- A small amount of framework-free JavaScript for navigation state and progressive reveal effects

There is no database, authentication, frontend framework, external CMS, form service, or paid SaaS dependency.

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
├── favicon/
├── images/
├── social/
├── robots.txt
└── site.webmanifest
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

## Deployment

The project is static-first. Run:

```bash
npm run build
```

Deploy the contents of `dist/` to any conventional static hosting provider. The website does not rely on provider-specific APIs or runtime services.

The canonical production origin is configured as:

```text
https://clearstance.pl
```

Change the `site` value in `astro.config.mjs` if the canonical domain changes.

## Licensing

Direct dependencies and production assets are documented in `THIRD_PARTY_LICENSES.md`.

> Before introducing any new dependency, font, image, icon or other asset, verify that its licence permits free commercial use.

Do not add paid fonts, commercially restricted assets, proprietary icon packs, trial libraries, or dependencies with unclear licensing.
