# Icon system proof of concept — review notes

Review build: 30 July 2026.

## Scope

- Iconoir 7.11.1 regular icons imported individually as raw SVG at build time
- allowlist: `network`, `task-list`, `community`, `refresh-double`
- shared Astro component with decorative and informative accessibility modes
- four icons in the homepage services section
- three-column service presentation on the Services page, without rendered PNG sketches
- Polish and English routes checked without changing copy, translations, service order, or URLs

The original service PNG files remain in `public/images/`.

## Exercises icon correction

`test-tube` was rejected because its laboratory and scientific-testing associations do not represent crisis exercises, scenario progression, team decisions, or debriefing.

`task-list` was selected after a real-layout comparison with `clipboard-check`. It communicates a prepared scenario, ordered stages, and checkpoints while retaining the calm stroke density of the other service icons. `clipboard-check` looked heavier and shifted the meaning towards approval, audit, and compliance.

No size, position, spacing, or layout adjustment was required. `test-tube` and `clipboard-check` are absent from the active allowlist and production imports.

The complete decision record and comparison links are in [the POC documentation](../../icon-system-poc.md).

## Screenshots

- [Home PL — desktop](home-services-desktop.png)
- [Home PL — mobile](home-services-mobile.png)
- [Services PL — desktop](services-desktop.png)
- [Services PL — mobile](services-mobile.png)
- [Home EN — mobile](home-services-en-mobile.png)
- [Services EN — mobile](services-en-mobile.png)
- [Candidate comparison directory](exercises-icon-comparison/)

Desktop screenshots use a 1440 × 1100 layout viewport. Mobile screenshots use a 390 × 1000 layout viewport. Each file captures the complete services section from the production preview.

## Validation

The production build was checked at 320, 390, 768, 1024, and 1440 px on the Polish and English Home and Services routes. No horizontal overflow or console error was detected.

Control Lighthouse 13.0.1 mobile results against the final local production preview:

| Route | Performance | Accessibility | Best practices | SEO | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 100 | 100 | 100 | 100 | 0 | 0 ms |
| Services | 100 | 100 | 100 | 100 | 0 | 0 ms |

Lighthouse scores are local measurements and may vary between machines. The icon integration adds no client-side JavaScript or hydration.
