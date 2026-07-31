# ClearStance production release — 31 July 2026

Final status: **PRODUCTION RELEASE COMPLETED**

## Release identity

- Production branch: `main`
- Deployed source commit: `efe6941d066d618fdfc5e0c8c5145df339238e95`
- Commit message: `feat: finalize offer references, numbering and production release`
- Production URL: <https://clearstance.pl>
- Previous rollback version: `e2b73674-b660-4a94-8808-4c85776a989e`
- Manual release version: `5fd13713-7e52-4724-adfd-5ddfc0b436be`
- Current active production version: `02d645a3-3604-42ea-8c5b-28bd618c0590`
- Deployment command: `npm run deploy:cloudflare` (`wrangler deploy`, Wrangler 4.114.0)
- Manual deployment window: 2026-07-31 15:51:56–15:52:26 UTC / 17:51:56–17:52:26 CEST
- Current active version created: 2026-07-31 15:53:10 UTC / 17:53:10 CEST

The manual deployment succeeded and returned version `5fd13713-7e52-4724-adfd-5ddfc0b436be`. The existing Cloudflare build integration then created and activated version `02d645a3-3604-42ea-8c5b-28bd618c0590`. SHA-256 comparisons for Home PL, Oferta PL, Insights PL and Services EN confirmed that the active production HTML is byte-for-byte identical to the tested local production build from the deployed commit.

## Release scope

The release closes the accepted visual-system work accumulated in the review branch: the Iconoir integration, the four-area offer architecture, the approved Brand Statement, Experience photography, the Insights visual and Open Graph systems, retirement of two unused image families, and the final methodological-reference and numbering corrections. Hero, header, lighthouse imagery, article content, Contact behaviour, footer, URLs, translations outside the accepted copy and the overall typographic/palette system were not redesigned in the final correction.

The four offer areas and their final Iconoir symbols are:

| Order on detailed Services | PL | EN | Iconoir |
| --- | --- | --- | --- |
| 01 | Zarządzanie kryzysowe | Crisis Management | `network` |
| 02 | Ćwiczenia i facylitacja | Exercises & Facilitation | `task-list` |
| 03 | Komunikacja kryzysowa | Crisis Communication | `message-text` |
| 04 | Wsparcie osób dotkniętych zdarzeniem i ich bliskich | Affected People & Family Assistance | `community` |

All icons are selective static `iconoir/icons/<name>.svg?raw` imports rendered as inline SVG by `Icon.astro`, with no component hydration or icon-library runtime. The methodological heading uses the decorative Iconoir `book` symbol at 20 px in muted teal; both wrapper and SVG are hidden from assistive technology and the SVG is not focusable.

## Methodological reference points

The section remains a compact editorial note on a slightly muted light background, with one thin rule and a three-column desktop layout. It does not use cards, badges, ISO logos, certification language or compliance symbolism.

Final PL references:

- `ISO 22361` — zarządzanie kryzysowe
- `ISO 22398` — ćwiczenia
- `ISO 22301` — ciągłość działania
- Wytyczne branżowe — organizacja pomocy osobom i rodzinom po poważnym zdarzeniu

Final EN references:

- `ISO 22361` — crisis management
- `ISO 22398` — exercises
- `ISO 22301` — business continuity
- Sector-specific guidance — organisational arrangements for supporting affected people and their families after a serious incident

Only the three ISO codes use the existing monospace face, semibold weight, muted teal and slightly increased tracking. The descriptions retain the normal text face and quieter colour. “Wytyczne branżowe” / “Sector-specific guidance” use the normal semibold face and are structurally distinct from ISO codes. The Polish term “SEKTOROWE” is absent.

## Numbering rules

Numbers remain only where they communicate sequence or a closed detailed structure:

- readiness cycle 01–05;
- detailed Services page 01–04;
- chronological About experience axis 01–03.

Numbers were removed from non-sequential collections:

- Home offer summary;
- Home Insights;
- full Insights index;
- Home “Sposób pracy” / “How we work”.

The affected lists use semantic `ul` markup. Empty number columns and their spacing were removed. Home offer records begin with the service icon, Insights metadata begins with the category, the Insights index keeps its text-led layout and mobile DOM order, and “Sposób pracy” remains a rule-separated 2 × 2 layout without icons.

## Verification before deployment

- Astro check: 77 files, 0 errors, 0 warnings, 0 hints.
- TypeScript: passed.
- Contact tests: 22/22 passed.
- Frontend, visual-theme, social-image, JSON-LD and service-icon tests: 19/19 passed.
- Release DOM and production-output tests: 5/5 passed.
- Content/CMS contract: 10 Insights entries, 0 warnings.
- Insights Open Graph generator: 0 generated, 8 unchanged, 8 current.
- Production build: 21 pages.
- Link checker: 22 HTML files, no broken internal links.
- Dist contract: 12 representative routes plus 404, feeds and self-hosted Sveltia passed.
- Cloudflare Worker dry-run: 128 static files, passed with the expected bindings.
- Responsive/browser audit: 24 offer cases, 96 route/viewport cases, 4 anchor cases and 19 review screenshots passed.
- Viewports: 1440, 1280, 1024, 900, 768, 390, 375 and 320 px.
- Routes: Home, Services, Insights, one article, About and Contact in PL and EN.
- Interaction/a11y audit: 24/24 checks passed, including skip link, focus, mobile menu, Escape/focus return, zoom 200%, language switch, reduced motion, DOM order, console and failed requests.

## Lighthouse production-build results

All seven requested profiles scored 100/100/100/100 for Performance, Accessibility, Best Practices and SEO. CLS was 0 and TBT was 0 ms in every profile.

| Profile | P/A/BP/SEO | LCP | Requests | Transfer | External JS |
| --- | --- | ---: | ---: | ---: | ---: |
| Desktop Home PL | 100/100/100/100 | 403 ms | 10 | 123,187 B | 0 B |
| Desktop Oferta PL | 100/100/100/100 | 242 ms | 5 | 21,053 B | 0 B |
| Desktop Insights PL | 100/100/100/100 | 285 ms | 9 | 22,772 B | 0 B |
| Mobile Home PL | 100/100/100/100 | 1,802 ms | 8 | 122,395 B | 0 B |
| Mobile Oferta PL | 100/100/100/100 | 901 ms | 5 | 21,053 B | 0 B |
| Mobile Insights PL | 100/100/100/100 | 1,202 ms | 9 | 22,772 B | 0 B |
| Mobile Services EN | 100/100/100/100 | 901 ms | 5 | 20,662 B | 0 B |

Home, Services and Insights contain 3,448 B of existing inline navigation/reveal JavaScript and no external script request. Iconoir adds no JavaScript or hydration.

## Production verification

All 18 required public routes returned HTTP 200:

- PL: Home, Oferta, Insights, all four articles, O ClearStance and Kontakt;
- EN: Home, Services, Insights, all four articles, About and Contact.

The production browser audit passed 96/96 route/viewport cases and 4/4 anchor cases. It found no horizontal overflow, broken images, failed requests, console errors, empty number columns, heading-order regressions or sticky-header/anchor regressions. The four services, methodological block, retained and removed number sets, Experience photos and Insights micro-illustrations were present. The interaction audit passed 24/24 checks for menu, focus, skip link, language switch and article structure.

An HTTP asset audit fetched 52 referenced files, including CSS, all responsive Experience sources and all eight article OG images; every response was HTTP 200. No post-deployment correction or rollback was required.

## SEO, indexing and cache

- Production has no `X-Robots-Tag: noindex` and public pages have no `meta robots` noindex.
- `robots.txt` permits the general search crawler, disallows `/admin/`, references `https://clearstance.pl/sitemap.xml` and also contains Cloudflare-managed AI crawler directives. It does not block general search indexing.
- The preview still returns `X-Robots-Tag: noindex` and a blocking `robots.txt`.
- All 18 checked routes have canonical and `og:url` values matching their `https://clearstance.pl` URLs.
- `og:title`, `og:description`, absolute production `og:image`, `summary_large_image` Twitter Cards and valid JSON-LD are present.
- All eight article OG images return HTTP 200.
- Home `ProfessionalService.knowsAbout` contains the four final offer areas.
- `sitemap.xml` returns HTTP 200, contains 20 production URLs and no preview or review routes.
- Production HTML contains no `workers.dev`, localhost, loopback or local user paths.
- HTML, CSS, Experience images and OG images were served from Cloudflare cache (`CF-Cache-Status: HIT` during the final pass); one first-pass hero variant was a normal `MISS` and subsequently populated. `robots.txt` is Cloudflare-managed and sitemap was a cache hit.
- No purge was required or performed.

## Rollback readiness

The known-good rollback version remains `e2b73674-b660-4a94-8808-4c85776a989e`. If a blocking regression is found, restore it with:

```bash
npx wrangler rollback e2b73674-b660-4a94-8808-4c85776a989e --name clearstance
```

After rollback, recheck `/`, `/oferta/`, `/insights/`, robots, canonical metadata and the active deployment status. Rollback was not needed for this release.
