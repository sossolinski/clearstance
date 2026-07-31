# ClearStance offer architecture update

Status: implemented for review.
Date: 31 July 2026.

## Active offer areas

| Order | Polish | English | Iconoir icon |
| --- | --- | --- | --- |
| 01 | Zarządzanie kryzysowe | Crisis Management | `network` |
| 02 | Ćwiczenia i facylitacja | Exercises & Facilitation | `task-list` |
| 03 | Komunikacja kryzysowa | Crisis Communication | `message-text` |
| 04 | Wsparcie osób dotkniętych zdarzeniem i ich bliskich | Affected People & Family Assistance | `community` |

The four areas are authored in the bilingual translation data and rendered by the existing Home and Services components. They are not a Sveltia CMS collection, so no new CMS content architecture was introduced.

## Icon decision

The installed Iconoir 7.11.1 package was inspected directly. Communication candidates were `message-text`, `chat-lines` and `chat-bubble`; people-support candidates were `community` and `group`. `message-text` was selected because it reads as structured written information rather than promotion or broadcasting. `community` was selected because it presents people as an equal group without medical, child-care or charitable symbolism.

All production icons remain individual static `iconoir/icons/<name>.svg?raw` imports. The Astro component renders them inline with no hydration or runtime icon library. The former service icon `refresh-double` is no longer used and has been removed from the allowlist. `group` remains because Brand Statement actively uses it.

## Content and metadata

- Home and Services use the new PL/EN names, summaries and detailed scopes.
- Scope notes clarify the boundaries of Crisis Communication and Affected People & Family Assistance.
- Home and Services descriptions, Open Graph descriptions inherited from them, and Home `ProfessionalService.knowsAbout` use the new architecture.
- The methodological reference block treats standards as engagement context, not products or certification claims.
- The offer remains in its existing editorial layout with numbering 01–04 and thin separators.

The final hierarchy correction presents the methodological references as a compact, light editorial note rather than a dark marketing band. At desktop widths it uses three quiet columns, one top rule and a 21 px heading. A single decorative 20 px Iconoir `book` identifies the reference note without suggesting certification or compliance. The measured section height remains within the accepted compact range.

## Insights taxonomy

Insights categories are open strings in the current content schema and CMS configuration. Existing articles retain Crisis Management, Crisis Communication, Exercises & Simulations and Business Continuity. No speculative category, content migration or new visual theme was added. If an affected-people article is commissioned later, the future category can use the existing `interface-map-a` theme after editorial review.

## Historical material

Older audit and review files remain as records of earlier iterations. They should not be read as the current offer architecture where their service names differ from the table above.

## Review evidence

- [Icon comparison](review/offer-architecture/icon-comparison.png)
- [Home PL desktop](review/offer-architecture/home-pl-1440.png)
- [Home PL mobile](review/offer-architecture/home-pl-390.png)
- [Home EN desktop](review/offer-architecture/home-en-1440.png)
- [Home EN mobile](review/offer-architecture/home-en-390.png)
- [Services PL desktop](review/offer-architecture/services-pl-1440.png)
- [Services PL mobile](review/offer-architecture/services-pl-390.png)
- [Services EN desktop](review/offer-architecture/services-en-1440.png)
- [Services EN mobile](review/offer-architecture/services-en-390.png)
- [Methodological note PL desktop](review/offer-architecture/services-pl-method-1440.png)
- [Methodological note PL mobile](review/offer-architecture/services-pl-method-390.png)
- [Methodological note EN desktop](review/offer-architecture/services-en-method-1440.png)
- [Methodological note EN mobile](review/offer-architecture/services-en-method-390.png)
- [Responsive and anchor report](review/offer-architecture/validation-report.json)

The browser review covers all four routes at 1440, 1280, 1024, 768, 390 and 320 px. All 24 cases passed title order, icon semantics, scope-note count, metadata, Open Graph description, Home structured data, methodological-heading, overflow, broken-image, request, console and hydration checks. Direct `/#praktyka` and `/en/#practice` entries passed at desktop and mobile widths.

Local mobile Lighthouse results for both Home and Services were 100 for Performance, Accessibility, Best Practices and SEO. CLS was 0 and total blocking time was 0 ms. The production Worker dry-run also passed.
