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

None. The production site is fully static and has no runtime dependency on a paid or proprietary third-party service.
