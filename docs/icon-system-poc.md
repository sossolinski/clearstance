# ClearStance Iconoir proof of concept

Status: accepted technical POC; the original service assignments were superseded by the offer architecture update on 31 July 2026.
Review date: 31 July 2026.

## Technical approach

- Iconoir 7.11.1 regular icons
- individual static SVG imports with Vite `?raw`
- closed TypeScript allowlist
- inline SVG rendered by `Icon.astro`
- `currentColor`, original `viewBox`, no React, hydration, icon font, or client-side icon JavaScript
- decorative icons hidden from assistive technology because the adjacent service heading carries the meaning

The active service icon map contains:

- `network`
- `task-list`
- `message-text`
- `community`

`message-text` represents structured crisis communication without suggesting advertising, broadcasting or day-to-day media relations. `community` represents a group of people without medical or charitable symbolism. `refresh-double` was removed from production imports after the former Reviews and Improvement service ceased to be a primary offer area. Icons used by other active components remain in the shared allowlist.

## Exercises and simulations icon decision

The original `test-tube` icon was rejected. Its primary associations are laboratory work, chemistry, scientific testing, and technical experiments. Those associations do not accurately represent tabletop exercises, command-post exercises, scenario progression, team decisions, communication under pressure, observation, or debriefing.

Two Iconoir candidates were evaluated in the real Polish and English Home and Services layouts at the existing 36 px and 40 px sizes:

| Candidate | Semantic reading | Optical result | Decision |
| --- | --- | --- | --- |
| `task-list` | scenario, ordered stages, checkpoints, structured exercise progression | calm stroke density and scale consistent with the other three service icons | selected |
| `clipboard-check` | completed check, approval, inspection, audit, compliance | visually heavier and more dominant in the icon column | rejected |

`task-list` communicates a prepared sequence and checkpoints without narrowing the service to audit or certification. It remained legible in both languages and at desktop and mobile widths. No local size or vertical-position correction was needed.

`test-tube` and `clipboard-check` are absent from the active allowlist and production imports. `test-tube` is no longer used by the POC.

## Comparison screenshots

The comparison files are review-only and are not rendered by the public site.

### `task-list`

- [Home PL — desktop](review/icon-system/exercises-icon-comparison/task-list-home-pl-desktop.png)
- [Home PL — mobile](review/icon-system/exercises-icon-comparison/task-list-home-pl-mobile.png)
- [Home EN — desktop](review/icon-system/exercises-icon-comparison/task-list-home-en-desktop.png)
- [Home EN — mobile](review/icon-system/exercises-icon-comparison/task-list-home-en-mobile.png)
- [Services PL — desktop](review/icon-system/exercises-icon-comparison/task-list-services-pl-desktop.png)
- [Services PL — mobile](review/icon-system/exercises-icon-comparison/task-list-services-pl-mobile.png)
- [Services EN — desktop](review/icon-system/exercises-icon-comparison/task-list-services-en-desktop.png)
- [Services EN — mobile](review/icon-system/exercises-icon-comparison/task-list-services-en-mobile.png)

### `clipboard-check`

- [Home PL — desktop](review/icon-system/exercises-icon-comparison/clipboard-check-home-pl-desktop.png)
- [Home PL — mobile](review/icon-system/exercises-icon-comparison/clipboard-check-home-pl-mobile.png)
- [Home EN — desktop](review/icon-system/exercises-icon-comparison/clipboard-check-home-en-desktop.png)
- [Home EN — mobile](review/icon-system/exercises-icon-comparison/clipboard-check-home-en-mobile.png)
- [Services PL — desktop](review/icon-system/exercises-icon-comparison/clipboard-check-services-pl-desktop.png)
- [Services PL — mobile](review/icon-system/exercises-icon-comparison/clipboard-check-services-pl-mobile.png)
- [Services EN — desktop](review/icon-system/exercises-icon-comparison/clipboard-check-services-en-desktop.png)
- [Services EN — mobile](review/icon-system/exercises-icon-comparison/clipboard-check-services-en-mobile.png)

## Final screenshots

- [Home PL — desktop](review/icon-system/home-services-desktop.png)
- [Home PL — mobile](review/icon-system/home-services-mobile.png)
- [Services PL — desktop](review/icon-system/services-desktop.png)
- [Services PL — mobile](review/icon-system/services-mobile.png)
- [Home EN — mobile](review/icon-system/home-services-en-mobile.png)
- [Services EN — mobile](review/icon-system/services-en-mobile.png)

## Final validation

- Astro check: 0 errors, warnings, or hints
- TypeScript: passed
- production build: 21 pages generated
- link checker: 22 generated HTML files checked, no broken internal links
- distribution and content contracts: passed
- automated tests: 28 passed
- browser console: no errors on Home PL/EN and Services PL/EN
- horizontal overflow: none at 1440, 1024, 768, 390, and 320 px on all four routes
- four decorative icons and four adjacent service headings present on every tested route
- every service icon wrapper and inline SVG has valid decorative semantics
- generated output contains no Astro islands, Iconoir runtime reference, rejected icon, or service sketch
- Lighthouse mobile Home: 100 Performance, Accessibility, Best Practices, and SEO; CLS 0; TBT 0 ms
- Lighthouse mobile Services: 100 Performance, Accessibility, Best Practices, and SEO; CLS 0; TBT 0 ms

The original service PNG files remain in the repository and are not rendered by the Services layout.
