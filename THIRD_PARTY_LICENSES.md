# Third-party licences

This file documents the direct software dependencies and externally sourced production assets used by the ClearStance website.

All listed software licences permit free commercial use. No paid font, icon pack, UI kit, stock-photo subscription, or commercial SaaS dependency is required for the website to function.

## Production dependencies

### Astro 7.1.3

- Purpose: static site framework, routing, build pipeline, content collections, and internationalisation configuration
- Source: https://github.com/withastro/astro
- Licence: MIT
- Commercial use status: permitted

### Tailwind CSS 4.3.3

- Purpose: utility CSS engine and build-time CSS processing
- Source: https://github.com/tailwindlabs/tailwindcss
- Licence: MIT
- Commercial use status: permitted

### @tailwindcss/vite 4.3.3

- Purpose: official Tailwind CSS Vite integration used by Astro at build time
- Source: https://github.com/tailwindlabs/tailwindcss
- Licence: MIT
- Commercial use status: permitted

## Development dependencies

### @astrojs/check 0.9.9

- Purpose: Astro and TypeScript validation
- Source: https://github.com/withastro/language-tools
- Licence: MIT
- Commercial use status: permitted

### TypeScript 6.0.3

- Purpose: static typing and project validation
- Source: https://github.com/microsoft/TypeScript
- Licence: Apache-2.0
- Commercial use status: permitted

### sharp 0.35.3

- Purpose: local, build-independent optimisation of the approved source images and generation of the social preview
- Source: https://github.com/lovell/sharp
- Licence: Apache-2.0
- Commercial use status: permitted
- Note: sharp distributes and uses libvips under its applicable open-source licence. Generated images do not require sharp at runtime.

### Wrangler 4.114.0

- Purpose: local validation and deployment of the Cloudflare Worker and static assets
- Source: https://github.com/cloudflare/workers-sdk
- Licence: MIT OR Apache-2.0
- Commercial use status: permitted
- Runtime status: development and deployment tool only; it is not shipped to site visitors

## Editorial software

### Sveltia CMS

- Purpose: Git-based editorial interface at `/admin/`
- Source: https://github.com/sveltia/sveltia-cms
- Licence: MIT
- Commercial use status: permitted
- Delivery: loaded from the project’s official UNPKG distribution using the installation pattern in the current Sveltia documentation
- Data model: content remains as Markdown in this Git repository; no proprietary CMS database is used

### Sveltia CMS Authenticator

- Purpose: optional GitHub OAuth authorization-code flow for non-technical CMS users
- Source: https://github.com/sveltia/sveltia-cms-auth
- Licence: MIT
- Commercial use status: permitted
- Deployment: isolated Cloudflare Worker; the code is maintained and deployed from the official project rather than copied into the ClearStance site Worker

## Production assets

### ClearStance approved homepage photography

- Files:
  - `public/images/hero-navigation.jpg`
  - `public/images/hero-navigation.webp`
  - `public/images/operational-briefing.jpg`
  - `public/images/operational-briefing.webp`
  - `public/images/brand-statement.jpg`
  - `public/images/brand-statement.webp`
  - `public/social/clearstance-og.webp`
- Purpose: homepage hero, experience section, brand statement, and social preview
- Source: extracted from the data URIs in the project-supplied, approved ClearStance v10 homepage reference
- Licence / permission basis: project-supplied approved production assets; their use in the ClearStance website is authorised by the supplied project brief
- Commercial use status: approved for this project
- Modification: JPEG source assets were extracted unchanged; WebP and social-preview derivatives were generated locally

### ClearStance mark and favicon

- Files: inline logo SVG component and `public/favicon/favicon.svg`
- Purpose: ClearStance brand mark and browser icon
- Source: recreated in code from the approved ClearStance v10 reference supplied for this project
- Licence / permission basis: project brand asset
- Commercial use status: approved for this project

## Typography

The website uses a local system-font stack. It does not download or redistribute third-party font files and makes no external font request.

## Runtime services

### Cloudflare Workers with Static Assets

- Purpose: static production hosting and the isolated `/api/contact` endpoint
- Source: https://developers.cloudflare.com/workers/
- Commercial use status: supported under Cloudflare’s applicable service terms
- Free-compatible status: static asset requests are free; the Workers Free plan includes a daily request allowance for the contact endpoint

### Cloudflare Turnstile

- Purpose: bot protection for the contact form, with mandatory server-side token verification
- Source: https://developers.cloudflare.com/turnstile/
- Commercial use status: supported under Cloudflare’s applicable service terms
- Free-compatible status: the Free plan is intended for most production applications and includes unlimited challenges within its widget and hostname limits

### Cloudflare Email Service / Email Routing

- Purpose: forwarding `contact@clearstance.pl` and delivering contact-form notifications to a verified private destination
- Source: https://developers.cloudflare.com/email-service/
- Commercial use status: supported under Cloudflare’s applicable service terms
- Free-compatible status: Email Routing is available on the free plan, and sends to verified destination addresses are free on all plans
- Storage status: the ClearStance application does not store form submissions in a database
