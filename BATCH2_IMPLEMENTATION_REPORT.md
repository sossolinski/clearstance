# ClearStance — Batch 2 Implementation Report

## Executive summary

Batch 2 was completed as a bounded content and UX evolution. The existing design system, page set and technical architecture were preserved.

The implementation:

- gives Home a clearer synthesis role;
- separates principles, readiness lifecycle, credibility and working method;
- keeps Services focused on practical scope and expected outcomes;
- makes About the canonical location for the full operational background;
- removes the most prominent slogan-like and repetitive contrast constructions;
- makes primary navigation destinations predictable;
- removes one duplicate Services-to-Contact CTA;
- improves Insights scanning with reading time;
- gives direct article visitors a concise explanation of ClearStance and quiet routes to Services, About and Contact;
- adds deterministic PL/EN copy-regression checks;
- preserves form, CMS, route, JSON-LD, Worker and Turnstile behaviour from Batch 1.

No clients, projects, certificates, metrics, case studies or experience claims were invented.

The required plan was written before content implementation in `BATCH2_CONTENT_PLAN.md`.

## Content architecture changes

### Home

Home remains a single synthesis page, but its sections now have distinct responsibilities:

- **Hero:** central proposition and orientation.
- **Approach:** principles used to assess readiness: shared picture, accountability and applicable rules.
- **Services:** concise preview of the four practical service areas plus an earlier factual trust signal.
- **Readiness:** organisational lifecycle from assessment to improvement, rather than a second description of ClearStance’s delivery process.
- **Experience:** short trust synthesis with sector tracks and a route to About.
- **How we work:** engagement behaviour and usable outcomes, without repeating the founder’s sector history.
- **Brand statement:** concrete team behaviour during a changing event.
- **Insights:** editorial route into practical analysis.
- **Contact:** one clear page-level route to the form.

### Services

Services retains the four existing areas and their details. Its closing section now explains how scope and the intended result are agreed. The immediately adjacent contextual button was removed, leaving the following Contact band as the single final conversion action.

### About

About remains the full trust and context page. The operational story is no longer repeated in detail on Home. The lead and perspective copy now connect the maritime, aviation, safety and crisis-readiness background to advisory work in direct language.

### Insights

The listing remains an editorial archive without search, filters or pagination. Reading time was added to each teaser because the calculation already existed and materially improves scanning.

### Article template

The article template retains its current header, metadata, table of contents, body, sharing and related content. A compact publisher section was added after sharing. It explains ClearStance in one paragraph and provides text links to Services, About and Contact without introducing a large marketing banner.

### Contact and 404

No content or structural change was needed. Their roles were already clear.

## Copy changes

| Page / section | Before | After | Reason |
|---|---|---|---|
| Home / Approach | Structures, procedures, exercises and reviews were described as a combined delivery process | Principles now focus on shared situational understanding, accountability and rules that can be applied with incomplete information | Separates Approach from Services and How we work |
| Home / Services perspective | General reference to safety, security and safety-critical environments | Explicit, factual reference to maritime shipping, aviation, operational safety, security and crisis management | Moves an existing trust signal earlier without adding a new section |
| Home / Readiness | First-person sequence: “we organise, define, test and improve” | Organisational capability cycle: assess, prepare, exercise, respond and improve | Separates the lifecycle from the consulting method |
| Home / Experience | Three paragraphs repeated founder and career details from About | One short synthesis, two factual sector tracks and a clear route to About | Home establishes credibility; About substantiates it |
| Home / Experience eyebrow | “From the bridge to the boardroom” | “Doświadczenie” / “Experience” | Keeps the established line only on About |
| Home / How we work | Bullets repeated operational experience, cross-sector perspective and general brand attributes | Bullets describe operating context, work with the team, proportionate scope and usable outcomes | Makes the section about delivery behaviour |
| Home / Brand statement | Uncertainty/chaos antithesis | Concrete description of what a prepared team verifies, decides and escalates | Reduces campaign rhetoric and makes the point observable |
| Home / Insights | Generic “perspectives and observations” language | Analysis grounded in practice, with named subject areas | Supports Insights as evidence of expertise |
| Services / Closing | “Najpierw kontekst. Potem rozwiązanie.” / “Context first. Then the solution.” | Heading about scope being shaped by the actual challenge | Removes a template-like slogan |
| Services / Closing text | Scope described as proportionate and useful | Scope and expected result are agreed around decisions, roles, an exercise scenario or an improvement plan | Clarifies the practical outcome without promising invented deliverables |
| About / Lead | Two slogan-like sentence fragments | One factual sentence joining operational experience and strategic perspective | More natural practitioner voice |
| About / Perspective | “Useful under pressure, not merely correct on paper” contrast | Solutions are grounded in operating conditions so the team can use them during a real event | Replaces abstraction with operational consequence |
| Published exercise article | “A good crisis exercise is not a performance” title and negative description | “What makes a crisis exercise useful” / “Co decyduje o wartości ćwiczenia kryzysowego” and direct description | Foregrounds the practical question; existing slugs are retained for URL stability |
| First-hour communication article | Description centred on what the hardest task is not | Description states the required first-hour decisions directly | Removes an unnecessary contrast formula |
| Draft exercise-design article | Repeated “scenario is not the starting point” and “not only documents” constructions | Starts with objectives and describes what the exercise reveals | Improves rhythm while preserving substantive meaning |

Natural analytical uses of negation remain where they carry real meaning. No broad automated rewrite was applied to article bodies.

## CTA changes

- Header **Services / Oferta** now always opens the full Services page.
- Header **About / O ClearStance** now always opens About; the former Experience label and context-dependent destination were removed.
- Home retains contextual in-page links for Approach and How we work.
- Home service, experience and editorial CTAs continue to route from summary to detail.
- The Services context button was removed because the immediately following Contact band led to the same destination.
- The Contact band remains the primary page-level action and leads to the form; the visible email remains secondary.
- The article publisher block uses quiet text links to Services, About and Contact rather than a conversion banner.
- 404 recovery actions remain unchanged.

## UX changes

- Primary navigation destinations are now consistent across Home and inner pages.
- Insights list cards now show localised reading time in PL and EN.
- Direct article visitors receive publisher context without returning to Home.
- Related article teasers also receive the reading-time prop through the shared component.
- Article sharing was verified for LinkedIn, X and email canonical-URL encoding.
- Share buttons and links retain accessible names, focus behaviour, safe external-link attributes and polite status announcements.
- No search, filtering, pagination, modal, funnel or new interaction pattern was introduced.

## PL/EN parity

- All changed translation structures have matching PL and EN keys and array shapes.
- Copy was written for semantic equivalence rather than literal sentence order.
- Home, Services, About, Insights, article context and navigation changes exist in both languages.
- Published article translation pairs retain the same `translationKey`.
- Existing public article slugs and routes were deliberately retained after title changes.
- The language switch and reciprocal route model remain unchanged.
- A runtime content check now fails if PL/EN translation structures drift.

## Tests

### Baseline before content changes

| Check | Result |
|---|---|
| `npm run check` | PASS — 59 files, 0 errors, 0 warnings, 0 hints |
| `npm run typecheck` | PASS |
| `npm run test:contact` | PASS — 22/22 |
| `npm run test:frontend` | PASS — 6/6 |
| `npm run test:content` | PASS — 10 entries, 0 warnings |
| `npm run build` | PASS — 21 pages |
| `npm run check:links` | PASS — 22 generated HTML files |
| `npm run test:dist` | PASS |
| `npm run check:worker` | PASS — dry-run only |

### After implementation

| Check | Result |
|---|---|
| `npm run check` | PASS — 59 files, 0 diagnostics |
| `npm run typecheck` | PASS |
| `npm run test:contact` | PASS — 22/22 |
| `npm run test:frontend` | PASS — 6/6 |
| `npm run test:content` | PASS — 10 entries, 0 warnings, including Batch 2 copy regression |
| `npm run build` | PASS — 21 pages |
| `npm run check:links` | PASS — 22 generated HTML files, no broken internal links |
| `npm run test:dist` | PASS — 12 representative routes, 404, feeds and self-hosted Sveltia |
| `npm run check:worker` | PASS — Worker build and Wrangler dry-run |
| `git diff --check` | PASS |

The content checker now covers:

- matching PL/EN translation structure;
- non-empty active CTA/navigation labels;
- return of explicitly removed high-visibility phrases;
- existing slug, translation-pair, locale, route, image and CMS contracts.

No AI detector or subjective prose score was added.

## Visual regression

A local headless-Chrome audit covered all requested widths:

- 320 px
- 375 px
- 430 px
- 768 px
- 1024 px
- 1280 px
- 1440 px
- 1920 px

Routes covered:

- Home PL/EN
- Services PL/EN
- About PL/EN
- Insights PL/EN
- one published article PL/EN
- Contact PL/EN
- bilingual 404

This produced **104 route/viewport checks**: 13 routes × 8 widths.

The browser audit checked horizontal overflow, broken images, H1 count, unnamed visible links/buttons, mobile/desktop navigation breakpoint state, article publisher presence, Insights reading-time presence and canonical URL handling in article share links. All checks passed.

Twelve focused viewport screenshots were also reviewed manually, including the changed Home lifecycle, Experience, How we work and brand statement areas; the Services closing section on mobile; About introduction and perspective; the Insights mobile list; the article header and publisher context; Contact mobile; and desktop 404. No visual defect requiring a redesign was found.

## Deferred items

- Search, filters and pagination remain deferred until the content archive justifies them.
- Broad rewriting of every natural contrast or negation in long-form articles was intentionally avoided.
- New client evidence, logos, certificates, case studies and quantitative claims require verified source material and were not added.
- New social images or a responsive CMS image pipeline remain outside Batch 2.
- The local privacy policy still requires approved legal-controller information; Batch 2 did not change or deploy it.
- Persistent browser screenshot automation in CI remains a possible later enhancement; this batch used a local cross-viewport audit.
- Production edge, domain, security-header and dashboard work remains in its existing audit status.

## Infrastructure untouched confirmation

Batch 2 made no deployment and no external configuration change.

Specifically, it did not change:

- Cloudflare dashboard settings, routes, redirects, cache rules or security headers;
- DNS, `www`, DNSSEC, CAA, SPF, DKIM or DMARC;
- OVH settings;
- OAuth applications, scopes or account controls;
- Turnstile dashboard settings, keys or hostname rules;
- Email Routing or Email Service configuration;
- production secrets or Worker bindings;
- Sveltia version, self-hosting, integrity evidence or image-field workaround;
- JSON-LD serializer;
- trailing-slash route policy;
- contact timeout and retry behaviour;
- CI workflows introduced in Batch 1.

`npm run check:worker` invoked only a local build and `wrangler deploy --dry-run`; it did not deploy.
