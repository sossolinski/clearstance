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

### @astrojs/markdown-satteri 0.3.4

- Purpose: Markdown typography processing used by the Astro content pipeline
- Source: https://github.com/withastro/astro
- Licence: MIT
- Commercial use status: permitted

### Iconoir 7.11.1

- Purpose: build-time source for the allowlisted inline SVG icons used in service and visual-system sections
- Source: https://github.com/iconoir-icons/iconoir
- Licence: MIT
- Commercial use status: permitted
- Runtime status: only allowlisted, statically imported SVGs are included in generated HTML; the library ships no client-side JavaScript

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

### yaml 2.9.0

- Purpose: parsing Markdown frontmatter and Sveltia configuration in the repository content-contract checker
- Source: https://github.com/eemeli/yaml
- Licence: ISC
- Commercial use status: permitted
- Runtime status: development and CI tool only; it is not shipped to site visitors

## Editorial software

### Sveltia CMS

- Version: 0.173.0
- Purpose: Git-based editorial interface at `/admin/`
- Source: https://github.com/sveltia/sveltia-cms
- Licence: MIT
- Commercial use status: permitted
- Delivery: the exact npm artefact is self-hosted as `public/admin/sveltia-cms-0.173.0.js`; its source integrity and local SHA-256 are recorded in `public/admin/sveltia-cms.version.json`
- Licence copy: `public/admin/sveltia-cms.LICENSE.txt`
- Data model: content remains as Markdown in this Git repository; no proprietary CMS database is used

### Sveltia CMS Authenticator

- Purpose: optional GitHub OAuth authorization-code flow for non-technical CMS users
- Source: https://github.com/sveltia/sveltia-cms-auth
- Licence: MIT
- Commercial use status: permitted
- Deployment: isolated Cloudflare Worker; the code is maintained and deployed from the official project rather than copied into the ClearStance site Worker

## Production assets

### ClearStance legacy hero and social-preview source

- Files:
  - `public/images/hero-navigation.jpg`
  - `public/images/hero-navigation.webp`
  - `public/social/clearstance-og.webp`
- Purpose: retained legacy hero source and generated social preview
- Source: extracted from the data URIs in the project-supplied, approved ClearStance v10 homepage reference
- Licence / permission basis: project-supplied approved production assets; their use in the ClearStance website is authorised by the supplied project brief
- Commercial use status: approved for this project
- Modification: JPEG source assets were extracted unchanged; WebP and social-preview derivatives were generated locally

### Retired ClearStance image assets

- Files retired and removed on 2026-07-31:
  - `public/images/brand-statement.jpg`
  - `public/images/brand-statement.webp`
  - `public/images/brand-statement-640.webp`
  - `public/images/brand-statement-960.webp`
  - `public/images/brand-statement-1440.webp`
  - `public/images/operational-briefing.jpg`
  - `public/images/operational-briefing.webp`
  - `public/images/operational-briefing-640.webp`
  - `public/images/operational-briefing-960.webp`
  - `public/images/operational-briefing-1440.webp`
- Former purpose: photographic Brand Statement / Contact treatment and the former Home / About Experience treatment
- Original source: extracted from the data URIs in the project-supplied, approved ClearStance v10 homepage reference
- Retirement status: files are no longer present in the repository, generated by the image pipeline, published in production output, or requested by the website
- Historical record: POC documentation and screenshots remain as a record of the design decision

### ClearStance Experience editorial imagery

- Master files:
  - `assets/experience/source/experience-maritime-home-master.png`
  - `assets/experience/source/experience-aviation-home-master.png`
  - `assets/experience/source/experience-maritime-about-master.png`
  - `assets/experience/source/experience-aviation-about-master.png`
- Derivatives: the 24 AVIF and WebP files in `public/images/experience/`
- Purpose: equal-weight maritime and aviation editorial imagery in the Home and About Experience sections
- Source: AI-generated editorial imagery created for ClearStance
- Date added: 2026-07-31
- Permission basis: project-supplied assets prepared for ClearStance and approved in the supplied implementation brief
- Commercial use status: approved for this project
- Modification: approved for responsive cropping and local AVIF/WebP optimisation
- Representation note: these images do not document a specific organisation, vessel, airport, client, operation, or event and must not be described as documentary evidence

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
