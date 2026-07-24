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
headerImage: "/images/insights/article-image.webp"
headerImageAlt: "Opisowe znaczenie zdjęcia."
seoTitle: "Tytuł SEO | ClearStance"
seoDescription: "Opis SEO."
---
```

`headerImage` and `headerImageAlt` are optional. When an image is used, upload it to `public/images/insights/` and provide meaningful alternative text.

Set `draft: true` while content is not ready for publication. Draft entries remain available in the repository and Sveltia CMS, but are excluded from the public Insights indexes, article routes, and `sitemap.xml`.

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

Each collection matches `src/content.config.ts`: title, description, optional header image and alternative text, slug, publication and update dates, author, locale, `translationKey`, category, tags, featured and draft flags, SEO fields, and Markdown body. No second content schema is introduced.

To create an article, open the correct language collection, complete the fields, and leave `draft` enabled until editorial review is complete. Draft entries remain available in CMS but are excluded from public Insights indexes, article routes, and `sitemap.xml`. Polish and English articles can be published independently.

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

The bilingual form is rendered on `/kontakt` and `/en/contact`. It collects only name, email, optional organisation, and message. `contact@clearstance.pl` remains visible as the public alternative.

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

The contact flow intentionally separates Astro build-time configuration from
Worker runtime configuration:

| Name | Scope | Cloudflare type | Sensitive |
| --- | --- | --- | --- |
| `PUBLIC_TURNSTILE_SITE_KEY` | Astro build | Workers Build variable | No |
| `TURNSTILE_SECRET_KEY` | Worker runtime | Secret | Yes |
| `CONTACT_DESTINATION_EMAIL` | Worker runtime | Secret | Yes |
| `TURNSTILE_EXPECTED_HOSTNAME` | Worker runtime | Regular variable in `wrangler.jsonc` | No |
| `CONTACT_FROM_EMAIL` | Worker runtime | Regular variable in `wrangler.jsonc` | No |

The committed runtime values are:

```text
TURNSTILE_EXPECTED_HOSTNAME=clearstance.pl
CONTACT_FROM_EMAIL=website@clearstance.pl
```

The secret values are never build variables and must not be placed in
`PUBLIC_*`, generated HTML, client JavaScript, logs, or the repository.
`wrangler.jsonc` declares both required secret names without their values.

### Turnstile production setup

1. In the Cloudflare dashboard, open **Turnstile** and select **Add widget**.
2. Use widget name **ClearStance contact**.
3. Add the hostname `clearstance.pl`. Do not add `www.clearstance.pl` unless the
   website is actually served from that hostname. A root hostname currently
   authorises its subdomains, so no wildcard or “any hostname” setting is
   needed.
4. Select **Managed** mode and leave Pre-clearance disabled.
5. Create the widget and copy the Site Key and Secret Key.
6. In **Workers & Pages → clearstance → Settings → Build**, add
   `PUBLIC_TURNSTILE_SITE_KEY` as a build variable containing the Site Key.
7. In **Workers & Pages → clearstance → Settings → Variables & Secrets**, add
   `TURNSTILE_SECRET_KEY` as a Secret containing the Secret Key, then deploy
   that runtime configuration.
8. Trigger a fresh production build after setting the Site Key. Astro reads
   this value during the build; changing it without rebuilding leaves the
   generated form disabled.

The production Worker requires `success === true`, hostname
`clearstance.pl`, and action `contact`. Tokens are single-use, expire after five
minutes, and are reset after every submission attempt that reaches the Worker.
Cloudflare’s documented dummy keys are accepted only when the request itself is
served from a local hostname. They cannot bypass production hostname/action
checks.

### Email architecture and production setup

Keep these Cloudflare features distinct:

- **Email Service / `EMAIL` binding** sends the Worker-generated contact-form
  notification.
- **Email Routing** receives mail that a person sends to the public
  `contact@clearstance.pl` address.

Both flows end at the same private Gmail address, which must be an account-level
verified destination and must remain private.

#### Recommended Workers Free model

Cloudflare currently permits a Worker on any plan to send to verified
destination addresses without consuming an outbound quota. Before a dedicated
Email Sending domain is onboarded, the sender must belong to an Email Routing
domain. The ClearStance Free architecture is therefore:

```text
contact form
  → EMAIL binding
  → From: website@clearstance.pl
  → verified private Gmail destination

human email
  → contact@clearstance.pl
  → Cloudflare Email Routing
  → the same verified private Gmail destination
```

To prepare the destination:

1. Go to **Compute → Email Service → Email Routing → Destination Addresses**.
2. Add the private Gmail inbox.
3. Open Cloudflare’s verification email in Gmail and confirm the address.
4. In **Workers & Pages → clearstance → Settings → Variables & Secrets**, add
   `CONTACT_DESTINATION_EMAIL` as an encrypted Secret containing that exact
   verified address, then deploy the runtime configuration.
5. Confirm the deployed `EMAIL` binding exists. It is declared in
   `wrangler.jsonc`, restricts senders to `website@clearstance.pl`, and the
   application fixes the recipient to `CONTACT_DESTINATION_EMAIL`.

The Free model also requires `clearstance.pl` to be onboarded as an Email
Routing domain before `website@clearstance.pl` is eligible as the sender.
Onboarding Email Routing changes root-domain MX, SPF, and DKIM records.
Cloudflare’s current documentation states that Email Routing cannot share the
domain with external mail servers. The existing OVH mail configuration must
therefore be inventoried and migrated deliberately by the owner; do not enable
Email Routing, remove OVH MX records, or change mail DNS as part of a code
deployment.

During that separate owner-controlled transition:

1. Identify every address and service currently depending on the OVH root mail
   configuration.
2. Go to **Compute → Email Service → Email Routing** and review the exact root
   MX, SPF, and DKIM changes before selecting **Onboard Domain**.
3. Plan replacement routing for every required existing address before
   switching the root MX records.
4. After the transition, create a Routing Rule with email pattern `contact` on
   `clearstance.pl`, action **Send to an email**, and the verified private Gmail
   destination.
5. Verify inbound delivery to `contact@clearstance.pl` and form delivery from
   `website@clearstance.pl`.

The Free contact-form notification cannot be declared active before this
routing-domain transition, because the technical sender would not yet belong
to an eligible routing domain. `EMAIL.send()` accepting a message is also not
proof of delivery; production readiness requires verifying receipt in Gmail.

#### Optional Workers Paid model

Dedicated **Email Sending** is optional, not a requirement for the verified
destination Free model. It is available on Workers Paid and supports sending
to arbitrary recipients after a sending domain is onboarded. That onboarding
uses separate `cf-bounce` MX/SPF and DKIM records plus DMARC configuration; it
does not turn Email Service into the public inbound mailbox.

Choose this path only if form delivery must be activated independently of the
root-domain Email Routing migration, or if ClearStance later needs broader
outbound-recipient support. Review all proposed DNS records before onboarding.
Public inbound mail for `contact@clearstance.pl` would still require the
separate, deliberate Email Routing transition described above.

### Edge rate limiting

The Workers Free plan currently provides one zone rate-limiting rule, a
10-second counting period, a 10-second mitigation period, and IP as the
counting characteristic. Configure the rule as follows:

1. Select the `clearstance.pl` zone.
2. Go to **Security → Security rules** and select
   **Create rule → Rate limiting rules**.
3. Name the rule **Protect contact endpoint**.
4. Use the expression:

   ```text
   (http.request.uri.path eq "/api/contact")
   ```

5. Under **With the same characteristics**, select **IP**.
6. Under **When rate exceeds**, set **Requests** to `5` and **Period** to
   `10 seconds`.
7. Under **Then take action**, select **Block** and set **Duration** to
   `10 seconds`.
8. Save and deploy the rule.

This rule affects only `/api/contact`, not static pages. A Managed Challenge is
less suitable here because the form uses `fetch()` and expects a JSON response;
a blocked request is deterministic and the threshold leaves ample room for a
legitimate retry. Cloudflare rate-limit counters are not instantaneous, so a
small number of excess requests can still reach the Worker before mitigation
starts.

## Cloudflare production deployment

The target is Cloudflare Workers with Static Assets. Astro produces static HTML
in `dist/`; `wrangler.jsonc` uses `assets.run_worker_first` for `/api/*` and
serves all other routes through the static asset binding.

Workers Builds must use:

```text
Production branch: main
Build command: npm run build
Deploy command: npm run deploy:cloudflare
```

In **Workers & Pages → clearstance → Settings → Builds**, confirm the existing
GitHub repository and these commands. The Worker name must match the
`clearstance` name in `wrangler.jsonc`.

Configuration lifecycle:

- Changing `PUBLIC_TURNSTILE_SITE_KEY` requires a new Astro build and deploy.
- Adding or changing a runtime secret in **Variables & Secrets** requires
  selecting **Deploy**, which creates and activates a new Worker version.
- Changing `TURNSTILE_EXPECTED_HOSTNAME`, `CONTACT_FROM_EMAIL`, the `EMAIL`
  binding, or Worker code requires committing the `wrangler.jsonc`/code change
  and deploying it.
- Creating or editing the zone rate-limit rule takes effect when the rule is
  deployed and does not require a site rebuild.

### Production owner workflow

For the recommended Workers Free architecture, use this order:

1. Push and deploy the amended Phase 4 commit.
2. Create the production Turnstile widget named **ClearStance contact**, using
   Managed mode, hostname `clearstance.pl`, action `contact`, and Pre-clearance
   off.
3. Add the build variable `PUBLIC_TURNSTILE_SITE_KEY`, then rebuild and deploy
   the Astro site.
4. Add `TURNSTILE_SECRET_KEY` as an encrypted Worker runtime secret and deploy
   the resulting Worker version.
5. Add and verify the private Gmail address under **Compute → Email Service →
   Email Routing → Destination Addresses**.
6. Add that exact address as the encrypted Worker secret
   `CONTACT_DESTINATION_EMAIL`; never place it in a build variable,
   `wrangler.jsonc`, source, logs, or public documentation.
7. Confirm the deployed regular variables are
   `TURNSTILE_EXPECTED_HOSTNAME=clearstance.pl` and
   `CONTACT_FROM_EMAIL=website@clearstance.pl`.
8. Confirm the `EMAIL` binding is deployed with the
   `website@clearstance.pl` sender allowlist.
9. Create the `/api/contact` IP rate-limit rule described above.
10. Inventory the existing OVH mailboxes, forwarding, MX, SPF, and DKIM
    dependencies. Plan the owner-controlled root-mail transition; do not alter
    DNS as part of the application deployment.
11. When the mail transition is approved, onboard `clearstance.pl` under
    **Email Routing**, deliberately replace the conflicting root mail records,
    and create the `contact@clearstance.pl` rule to the verified private Gmail
    destination. The Free form sender becomes eligible only after the domain is
    a routing domain.
12. Submit one clearly labelled form test from `/kontakt/` and one from
    `/en/contact/`. Verify the HTTP success state, exactly one received message,
    From `website@clearstance.pl`, visitor address only in Reply-To, the correct
    private destination, locale, source, body, and timestamp.
13. Separately test human inbound mail to `contact@clearstance.pl` and every
    other address migrated from OVH. Declare mail activation complete only
    after actual inbox receipt is confirmed.

If the owner needs form delivery before the root-domain mail migration, use the
optional Workers Paid Email Sending path instead of weakening the sender or
exposing the destination.

Production preflight:

1. Confirm the Turnstile widget is Managed and restricted to
   `clearstance.pl`.
2. Confirm a fresh build contains the production
   `PUBLIC_TURNSTILE_SITE_KEY`, not a documented dummy key.
3. Confirm `TURNSTILE_SECRET_KEY` and `CONTACT_DESTINATION_EMAIL` exist as
   runtime secrets.
4. Confirm the committed hostname, sender, sender allowlist, `EMAIL` binding,
   and Worker-first `/api/*` routing are present in the active deployment.
5. For the Free architecture, confirm `clearstance.pl` is an active Email
   Routing domain and the private destination is verified. If the deliberate
   OVH-to-Cloudflare mail transition has not happened, the Free form delivery
   path is not yet active.
6. Confirm the `/api/contact` rate-limit rule is active.
7. Search generated frontend assets and responses to ensure neither runtime
   secret nor the private destination is exposed.
8. Submit one clearly labelled test from `/kontakt/` and one from
   `/en/contact/`. For each, verify the HTTP success state and exactly one
   received email with From `website@clearstance.pl`, Reply-To equal to the
   submitted test address, the correct private destination, locale, source,
   message, and timestamp.
9. Confirm a request without a Turnstile token and a malformed form request are
   rejected without email delivery. Do not load-test production.

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
