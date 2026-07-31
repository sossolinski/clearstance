# ClearStance Insights — deployment preview

- Preview: https://insights-visual-review-clearstance.s-ossolinski.workers.dev
- Versioned URL: https://e91c2252-clearstance.s-ossolinski.workers.dev
- Uploaded: 2026-07-31 09:41:44 UTC (11:41:44 CEST)
- Worker version: `e91c2252-3872-409c-be11-cb418c254e78`
- Source branch: `main`
- Source HEAD: `81ecb104d5489a1887bfd7989907b68b2ee5df11`
- Source state: accepted, uncommitted visual-system worktree; no preview commit was required
- Recommendation: `READY WITH MINOR NOTES`
- Production: **not deployed**

## Tested routes

The external browser audit covered the PL/EN Insights indexes, all eight
published articles, Home PL/EN and About PL/EN at 1440, 1280, 1024, 900, 768,
390, 375 and 320 CSS px. HTTP validation additionally covered Contact PL/EN,
the CMS, sitemap, robots and five retired review-route candidates.

## Screenshots

- `index-pl-{1440,1024,768,390,320}.png`
- `index-en-{1440,390}.png`
- `article-pl-{1440,768,390,320}.png`
- `article-en-{1440,390}.png`
- `og-contact-sheet.png`
- `cms-admin.png`
- `metadata-article-pl.png`
- `metadata-article-en.png`
- `network-headers.png`

Machine-readable evidence:

- `validation-report.json` — 112 responsive/browser audits;
- `http-validation.json` — routes, metadata, OG hashes and headers;
- `interaction-report.json` — keyboard, mobile menu, language switch, 200% scale and DOM order;
- `lighthouse-summary.json` and five complete Lighthouse JSON reports;
- `og/` — eight files downloaded from the preview paths.

## Known limitations

- The CMS panel loads but requires GitHub OAuth before an existing article can
  be opened. No login was attempted and no content was saved. The YAML/schema
  contract was validated statically.
- Article metadata intentionally points `og:image` to `https://clearstance.pl`.
  Those eight production files remain 404 until the separately approved
  production deployment. The corresponding preview paths are HTTP 200,
  1200 × 630 and binary-identical to the local outputs.
- Lighthouse SEO is 66 because the preview is intentionally blocked with
  `X-Robots-Tag: noindex` and `robots.txt: Disallow: /`, and its canonical URLs
  point at production.
- LinkedIn/Facebook validators were not submitted: they require interactive
  platform access and would currently follow the not-yet-published production
  `og:image` URLs. No social cache refresh is claimed.

The complete publication record and future production/rollback procedures are
in `docs/deployment-preview-report.md`.
