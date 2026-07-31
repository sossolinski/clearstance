# ClearStance Canva Wave 1 Layouts

## 1. Document scope

Ten dokument opisuje pięć pierwszych masterów ClearStance w stopniu umożliwiającym ręczne odtworzenie ich 1:1 w Canva:

1. LinkedIn Portrait Post.
2. LinkedIn Carousel.
3. ClearStance Insights Promo.
4. ClearStance One-Pager.
5. ClearStance Case Study.

Źródło zasad: `CLEARSTANCE_CANVA_TEMPLATE_SYSTEM.md`.

Wspólne tokeny, font mapping, komponenty, gridy, nazewnictwo warstw i zasady zabezpieczenia: `CLEARSTANCE_CANVA_COMPONENT_LIBRARY.md`.

Wartości `x`, `y`, `width` i `height` odnoszą się do bounding boxów. W rasterach są podane w px, a w A4 w mm względem strony netto.

## 2. Shared production rules

- Wszystkie social masters mają osobne strony PL, EN i bilingual stress test.
- Tytuł, deck i metadata pozostają live text.
- Wygenerowana lub fotograficzna grafika nigdy nie zawiera tytułu.
- Jedna plansza ma jeden dominujący komunikat.
- Logo jest importowanym, zatwierdzonym wektorem.
- Coral jest pojedynczym sygnałem.
- Nie stosować shadow, rounded cards, gradient mesh ani dekoracyjnych ikon.
- Nie używać automatycznego font shrinking.
- Jeżeli treść nie mieści się w dozwolonym tierze, należy skrócić copy albo wybrać właściwy wariant.

# Template 01 — LinkedIn Portrait Post

## 1. Purpose

Primary use:

- expert insight;
- short observation;
- service-related thought;
- announcement.

Canvas: **1080 × 1350 px**.

Master name: `W1-T01_LINKEDIN-PORTRAIT_1080x1350_MASTER`.

## 2. Grid and safe area

| PROPERTY | VALUE |
|---|---:|
| Canvas | 1080 × 1350 px |
| Grid | 12 columns |
| Left/right margin | 80 px |
| Gutter | 24 px |
| Column width | 54.67 px |
| Text safe area | x 80–1000; y 84–1174 px |
| Footer safe area | x 80–1000; y 1174–1254 px |
| Minimum edge clearance | 80 px horizontal; 84 px top; 96 px bottom |

Global guides:

- vertical: x = 80, 134.67, 158.67, 213.33, 237.33, 292, 316, 370.67, 394.67, 449.33, 473.33, 528, 552, 606.67, 630.67, 685.33, 709.33, 764, 788, 842.67, 866.67, 921.33, 945.33, 1000;
- horizontal: y = 84, 144, 208, 536, 622, 670, 1078, 1174, 1206, 1254.

## 3. Variant A — Image-led

IMAGE DIRECTION: **B — Lighthouse & Horizon**. A is permitted only for a founder-led observation.

| ELEMENT | X | Y | WIDTH | HEIGHT | ALIGNMENT / NOTES |
|---|---:|---:|---:|---:|---|
| Background | 0 | 0 | 1080 | 1350 | PAPER, locked |
| Eyebrow | 80 | 88 | 605.33 | 26 | Left |
| Header divider | 80 | 144 | 920 | 1 | DIVIDER PAPER |
| Headline | 80 | 208 | 684 | 300 | Left, top aligned |
| Supporting line | 80 | 536 | 526.67 | 86 | Left |
| Image frame | 80 | 670 | 920 | 408 | Full content width |
| Footer divider | 80 | 1174 | 920 | 1 | Locked |
| CTA, optional | 80 | 1206 | 320 | 32 | Left |
| ClearStance signature | 792 | 1204 | 208 | 36 | Right |

### Image specification

- IMAGE FRAME: x 80, y 670, width 920, height 408 px.
- CROP: cover, custom art-directed crop.
- FOCAL SAFE AREA: lighthouse / orientation point in local x 650–860, local y 70–260; horizon in local y 180–250.
- COPY SAFE AREA: no text is placed on the image.
- OVERLAY: no.
- Minimum source: 1840 × 816 px.
- If direction A is used, beacon remains in local x 690–850 and must not carry the meaning alone.

## 4. Variant B — Text-led

IMAGE DIRECTION: **C or INSIGHTS MATERIAL** as a narrow supporting rail. The visual is secondary.

| ELEMENT | X | Y | WIDTH | HEIGHT | ALIGNMENT / NOTES |
|---|---:|---:|---:|---:|---|
| Background | 0 | 0 | 1080 | 1350 | PAPER |
| Eyebrow | 80 | 88 | 605.33 | 26 | Left |
| Header divider | 80 | 144 | 920 | 1 | Locked |
| Headline | 80 | 232 | 605.33 | 388 | Left |
| Supporting line | 80 | 668 | 526.67 | 104 | Left |
| Optional source/meta | 80 | 824 | 526.67 | 48 | Left |
| Visual rail | 788 | 232 | 212 | 760 | Right, secondary |
| Footer divider | 80 | 1174 | 920 | 1 | Locked |
| CTA, optional | 80 | 1206 | 320 | 32 | Left |
| ClearStance signature | 792 | 1204 | 208 | 36 | Right |

### Image specification

- IMAGE FRAME: x 788, y 232, width 212, height 760 px.
- CROP: cover, custom crop.
- FOCAL SAFE AREA: central 148 × 570 px; no critical subject within 24 px of frame edge.
- OVERLAY: no.
- Preferred C content: stairs, railing rhythm, glass / metal junction, restrained material detail.
- If no suitable image exists, replace the rail with PAPER 2 and one controlled graphite / vellum composition. Do not leave an empty frame.

## 5. Variant C — Minimal / no image

IMAGE DIRECTION: **NONE**.

| ELEMENT | X | Y | WIDTH | HEIGHT | ALIGNMENT / NOTES |
|---|---:|---:|---:|---:|---|
| Background | 0 | 0 | 1080 | 1350 | PAPER |
| Eyebrow | 80 | 88 | 605.33 | 26 | Left |
| Header divider | 80 | 144 | 920 | 1 | Locked |
| Coral signal | 80 | 208 | 8 | 8 | Locked |
| Headline | 80 | 276 | 762.67 | 388 | Left |
| Supporting line | 80 | 716 | 526.67 | 104 | Left |
| Optional source/meta | 80 | 1016 | 526.67 | 48 | Left |
| Footer divider | 80 | 1174 | 920 | 1 | Locked |
| CTA, optional | 80 | 1206 | 320 | 32 | Left |
| ClearStance signature | 792 | 1204 | 208 | 36 | Right |

Puste pole x 80–1000, y 852–1016 jest intencjonalne. Nie dodawać ikony, kolejnego cytatu ani dekoracji.

## 6. Headline size tiers

| TIER | USE | SIZE | LINE HEIGHT | TEXT BOX | MAX LINES |
|---|---|---:|---:|---:|---:|
| Short | 1–3 słowa / do 24 znaków | 88 px | 92 px | wariantowy headline box | 2 |
| Standard | 4–7 słów / do 48 znaków | 76 px | 82 px | wariantowy headline box | 3 |
| Long | 8–12 słów / do 72 znaków | 64 px | 72 px | wariantowy headline box | 4 |

Zasady:

1. Nie schodzić poniżej 64 px.
2. Najpierw poprawić podział linii.
3. Jeżeli long tier przekracza 4 linie, użyć carousel.
4. Nie zwiększać boxu w stronę stopki.
5. Nie skalować fontu w poziomie.

## 7. Typography

| ELEMENT | FONT ROLE | SIZE | WEIGHT | LINE HEIGHT | LETTER SPACING | CASE | MAX LINES | ALIGNMENT |
|---|---|---:|---:|---:|---:|---|---:|---|
| Brand / logo | Imported signature | 208 × 36 px | Vector | — | Existing | UPPERCASE wordmark | 1 | Right |
| Eyebrow | Utility mono | 18 px | 600 | 24 px | +16% | UPPERCASE | 1 | Left |
| Headline | Display | 64 / 76 / 88 px | 500 | 72 / 82 / 92 px | −3% | Sentence case | 4 | Left |
| Subheadline | Body | 28 px | 400 | 40 px | 0 | Sentence case | 3 | Left |
| Body | Body | 26 px | 400 | 40 px | 0 | Sentence case | 5 | Left |
| Metadata | Utility mono | 17 px | 400 | 24 px | +8% | UPPERCASE labels | 2 | Left |
| Quote | Display | 48 px | 500 | 58 px | −2% | Sentence case | 6 | Left |
| CTA | Body | 20 px | 600 | 26 px | +7% | UPPERCASE | 1 | Left |
| Footer | Utility mono | 16 px | 500 | 24 px | +7% | As written | 1 | Left / right |

Quote and body are alternate content modes. Do not add them under a full headline and subheadline on the same page.

## 8. Locked vs editable

| ELEMENT | LOCKED? | EDITABLE? | OPTIONAL? | NOTES |
|---|---|---|---|---|
| Background | Yes | No | No | PAPER or approved INK variant only |
| Grid / guides | Yes | No | No | Hide before export |
| Header divider | Yes | No | No | Fixed y |
| Eyebrow box | Semi | Text only | No | Controlled category list |
| Headline box | Semi | Text only | No | Choose one size tier |
| Supporting line | Semi | Text only | Yes | Hide group, do not leave blank box |
| Image frame | Position locked | Crop/image | Yes by variant | Replace with correct variant |
| Overlay | Yes | No | Yes | Only if future full-bleed variant |
| Coral signal | Yes | No | Yes by variant | Only minimal variant |
| CTA | Semi | Label | Yes | One action |
| Footer divider | Yes | No | No | Fixed |
| Signature | Yes | No | No | Imported vector |
| Metadata/source | Semi | Text | Yes | Source, author or date |

## 9. Content length rules

| FIELD | IDEAL | MAXIMUM | MAX LINES | IF LONGER |
|---|---:|---:|---:|---|
| Eyebrow | 12–28 znaków | 40 | 1 | Shorten category |
| Headline | 24–54 znaków | 72 | 4 | Long tier, then carousel |
| Supporting line | 70–115 znaków | 160 | 3 | Remove secondary clause |
| Body alternative | 160–260 znaków | 360 | 5 | Use carousel |
| Quote alternative | 80–180 znaków | 240 | 6 | Edit excerpt |
| Metadata | 20–55 znaków | 80 | 2 | Remove redundant field |
| CTA | 10–20 znaków | 28 | 1 | Reduce to one verb/action |

## 10. Mock content

- **Eyebrow:** GOTOWOŚĆ OPERACYJNA
- **Headline:** Role i decyzje powinny być jasne przed pierwszą eskalacją.
- **Supporting line:** Dobrze przygotowany zespół szybciej rozpoznaje sytuację i uruchamia właściwy poziom działania.
- **CTA:** ZOBACZ PERSPEKTYWĘ →
- **Footer/signature:** CLEARSTANCE

Mock copy służy wyłącznie do testowania layoutu.

## 11. Wireframes

### Image-led

```text
┌────────────────────────────────────┐
│  EYEBROW                           │
│  ────────────────────────────────  │
│                                    │
│  HEADLINE                          │
│  HEADLINE                          │
│                                    │
│  Supporting line                   │
│                                    │
│  ┌──────────────────────────────┐  │
│  │                              │  │
│  │      IMAGE B / HORIZON       │  │
│  │                              │  │
│  └──────────────────────────────┘  │
│                                    │
│  ────────────────────────────────  │
│  CTA                     CLEARSTANCE│
└────────────────────────────────────┘
```

### Text-led

```text
┌────────────────────────────────────┐
│  EYEBROW                           │
│  ────────────────────────────────  │
│                                    │
│  HEADLINE               ┌────────┐ │
│  HEADLINE               │        │ │
│  HEADLINE               │ C /    │ │
│                         │MATERIAL │ │
│  Supporting line        │ RAIL   │ │
│                         │        │ │
│  optional source        │        │ │
│                         └────────┘ │
│                                    │
│  ────────────────────────────────  │
│  CTA                     CLEARSTANCE│
└────────────────────────────────────┘
```

### Minimal

```text
┌────────────────────────────────────┐
│  EYEBROW                           │
│  ────────────────────────────────  │
│                                    │
│  •                                 │
│  HEADLINE                          │
│  HEADLINE                          │
│  HEADLINE                          │
│                                    │
│  Supporting line                   │
│                                    │
│                                    │
│  optional source                   │
│  ────────────────────────────────  │
│  CTA                     CLEARSTANCE│
└────────────────────────────────────┘
```

## 12. Canva build order

1. Utworzyć canvas 1080 × 1350 px.
2. Dodać `GRID-SOCIAL-4X5`: 12 columns, margins 80, gutter 24.
3. Dodać horizontal guides y 84, 144, 208, 536, 622, 670, 1078, 1174, 1206, 1254.
4. Zbudować `00_LOCK_BG_PAPER`.
5. Umieścić C03 eyebrow i C05 dividers.
6. Dodać trzy headline boxes w size tiers; pokazać tylko jeden na każdej stronie wariantu.
7. Dodać supporting line box i opcjonalny source box.
8. Wstawić właściwy frame: image-led lub text-led rail.
9. Dodać C07 CTA i C01 signature.
10. Zgrupować stałe elementy według nazewnictwa biblioteki.
11. Zablokować background, dividers, logo, signal i pozycję frames.
12. Zduplikować do stron `02_IMAGE_LED`, `03_TEXT_LED`, `04_NO_IMAGE`.
13. Dodać PL i EN stress test.
14. Sprawdzić wszystkie trzy headline tiers.
15. Zapisać export reference PNG z włączoną ramką safe-area wyłącznie na stronie technicznej.

# Template 02 — LinkedIn Carousel

## 1. Purpose

Carousel ma minimum trzy rodzaje stron:

- COVER PAGE;
- modular CONTENT PAGE;
- FINAL / CTA PAGE.

Canvas każdej strony: **1080 × 1350 px**.

Master name: `W1-T02_CAROUSEL_1080x1350_MASTER`.

Rekomendowana długość publikacji: 4–8 stron. Maksimum systemowe: 10 stron.

## 2. Shared grid

- Użyć `GRID-SOCIAL-4X5`.
- Content safe area: x 80–1000, y 84–1174.
- Footer safe area: y 1174–1254.
- Header divider: y 144 na content pages; y 176 na cover/final, jeśli używany jest Insights signature.
- Page count zawsze w tym samym miejscu w obrębie jednego carousel.

## 3. Cover page

IMAGE DIRECTION: **C** albo **NONE / INSIGHTS MATERIAL**.

| ELEMENT | X | Y | WIDTH | HEIGHT | ALIGNMENT / NOTES |
|---|---:|---:|---:|---:|---|
| Background | 0 | 0 | 1080 | 1350 | PAPER |
| Eyebrow / category | 80 | 88 | 605.33 | 26 | Left |
| Header divider | 80 | 144 | 920 | 1 | Locked |
| Title | 80 | 208 | 605.33 | 390 | Left |
| Short descriptor | 80 | 630 | 526.67 | 90 | Left |
| Optional visual | 709.33 | 208 | 290.67 | 820 | Right |
| Swipe cue | 80 | 1124 | 220 | 28 | Left |
| Footer divider | 80 | 1174 | 920 | 1 | Locked |
| Page count | 80 | 1206 | 88 | 24 | `01 / NN` |
| Signature | 740 | 1190 | 260 | 64 | ClearStance Insights or C01 |

### Cover image

- IMAGE FRAME: x 709.33, y 208, width 290.67, height 820 px.
- CROP: cover, custom.
- FOCAL SAFE AREA: local x 48–250, y 100–670.
- OVERLAY: no.
- Preferred: architectural vertical, railing, stair, material junction.
- No-image: replace exact frame with PAPER 2 material composition. Do not expand title into the frame unless using prepared text-only cover variant.

### Text-only cover transform

- Hide visual frame group.
- Expand title to x 80, y 240, width 762.67, height 390.
- Move descriptor to x 80, y 678, width 605.33, height 100.
- Add coral signal at x 80, y 208, 8 × 8.
- Keep all footer positions.

## 4. Content page base

IMAGE DIRECTION: **NONE**. C detail is allowed only on a section-opening page.

| ELEMENT | X | Y | WIDTH | HEIGHT | ALIGNMENT / NOTES |
|---|---:|---:|---:|---:|---|
| Background | 0 | 0 | 1080 | 1350 | PAPER |
| Category | 80 | 88 | 605.33 | 26 | Eyebrow |
| Running page | 912 | 88 | 88 | 24 | Right |
| Header divider | 80 | 144 | 920 | 1 | Locked |
| Section marker | 80 | 208 | 64 | 40 | Numbered only if sequence |
| Page headline | 158.67 | 208 | 605.33 | 132 | Max 2–3 lines |
| Modular content zone | 158.67 | 388 | 605.33 | 620 | One module type |
| Optional note rail | 866.67 | 208 | 133.33 | 800 | Source / implication only |
| Footer divider | 80 | 1174 | 920 | 1 | Locked |
| Series name | 80 | 1206 | 300 | 24 | Utility |
| Page count | 912 | 1206 | 88 | 24 | Right |

### Module A — Narrative

- Body box: x 158.67, y 388, width 526.67, height 430 px.
- Supports 1–3 paragraphs.
- Paragraph gap: 24 px.
- Optional implication: x 158.67, y 866, width 605.33, height 112 px; PAPER 2, 24 px padding.

### Module B — List

- Intro box: x 158.67, y 388, width 526.67, height 88 px.
- List group: x 158.67, y 520, width 605.33, height 430 px.
- 3–5 items.
- Item row: minimum height 72 px; gap 24 px.
- Marker: 8 px TEAL dot or numeric section marker; only one active item may use CORAL.

### Module C — Key number / observation

- Observation label: x 158.67, y 388, width 290.67, height 26 px.
- Key number / short phrase: x 158.67, y 446, width 526.67, height 172 px.
- Explanation: x 158.67, y 670, width 526.67, height 160 px.
- Source: x 158.67, y 878, width 526.67, height 48 px.
- Use a key phrase instead of a number if no defensible quantitative data exists.

### Module D — Simple diagram

- Intro: x 158.67, y 388, width 526.67, height 72 px.
- Diagram: x 158.67, y 516, width 605.33, height 300 px.
- Interpretation: x 158.67, y 868, width 605.33, height 112 px.
- Maximum four nodes.
- No pseudo-dashboard, gauges or decorative chart axes.

Do not place narrative, list, number and diagram modules together. Each content page selects one module.

## 5. Final / CTA page

IMAGE DIRECTION: **NONE**.

| ELEMENT | X | Y | WIDTH | HEIGHT | ALIGNMENT / NOTES |
|---|---:|---:|---:|---:|---|
| Background | 0 | 0 | 1080 | 1350 | INK |
| Insights signature, optional | 80 | 84 | 260 | 64 | Light version |
| Header divider | 80 | 176 | 920 | 1 | DIVIDER INK |
| Eyebrow | 80 | 224 | 605.33 | 26 | LIGHT TEAL |
| Summary headline | 80 | 290 | 684 | 250 | LIGHT TEXT |
| Summary body | 80 | 580 | 526.67 | 160 | MUTED TEXT DARK |
| Optional CTA | 80 | 932 | 320 | 32 | Light |
| Website | 80 | 1120 | 320 | 24 | Utility |
| Footer divider | 80 | 1174 | 920 | 1 | DIVIDER INK |
| ClearStance signature | 792 | 1204 | 208 | 36 | Light |
| Page count | 80 | 1206 | 88 | 24 | Light muted |

CTA examples: `PRZECZYTAJ ANALIZĘ →`, `POROZMAWIAJMY →`. Never `FOLLOW FOR MORE`.

## 6. Typography

| ELEMENT | FONT ROLE | SIZE | WEIGHT | LINE HEIGHT | LETTER SPACING | CASE | MAX LINES | ALIGNMENT |
|---|---|---:|---:|---:|---:|---|---:|---|
| Brand / logo | Imported signature | 208 × 36 / 260 × 64 px | Vector | — | Existing | Existing | 1 | Right / left |
| Eyebrow | Utility mono | 18 px | 600 | 24 px | +16% | UPPERCASE | 1 | Left |
| Cover headline | Display | 68 px | 500 | 76 px | −3% | Sentence case | 5 | Left |
| Content headline | Display | 44 px | 520 | 52 px | −2% | Sentence case | 3 | Left |
| Subheadline | Body | 28 px | 400 | 40 px | 0 | Sentence case | 3 | Left |
| Body | Body | 26 px | 400 | 40 px | 0 | Sentence case | 10–12 | Left |
| Metadata | Utility mono | 17 px | 400–600 | 24 px | +8% | UPPERCASE labels | 2 | Left / right |
| Quote | Display | 48 px | 500 | 58 px | −2% | Sentence case | 6 | Left |
| Key number | Display | 128 px | 450 | 136 px | −4% | As required | 1 | Left |
| CTA | Body | 20 px | 600 | 26 px | +7% | UPPERCASE | 1 | Left |
| Footer | Utility mono | 16 px | 500 | 24 px | +7% | As written | 1 | Left / right |

## 7. Locked vs editable

| ELEMENT | LOCKED? | EDITABLE? | OPTIONAL? | NOTES |
|---|---|---|---|---|
| Background | Yes | No | No | Page type determines PAPER / INK |
| Guides | Yes | No | No | Hide before export |
| Header/footer dividers | Yes | No | No | Same coordinates across pages |
| Signature | Yes | No | No | Choose Core or Insights at master creation |
| Category | Semi | Controlled text | No | Same category across carousel |
| Title/headline | Semi | Text | No | Fixed box |
| Descriptor | Semi | Text | Yes | Cover only |
| Image/material frame | Position locked | Crop/image | Yes | Cover / section opener only |
| Section marker | Semi | Number | Yes | Sequence only |
| Content module | Group geometry locked | Text/data | No | Choose one module |
| Note rail | Semi | Text | Yes | Source or implication |
| Page count | Semi | Number | No | Must match export |
| CTA | Semi | Label/URL | Yes | Final page only |
| Coral signal | Yes | No | Yes | One active marker |

## 8. Content length rules

| FIELD | IDEAL | MAXIMUM | MAX LINES | IF LONGER |
|---|---:|---:|---:|---|
| Cover eyebrow | 12–28 znaków | 40 | 1 | Shorten |
| Cover title | 30–65 znaków | 90 | 5 | Text-only cover or edit |
| Cover descriptor | 70–120 znaków | 160 | 3 | Reduce to one promise |
| Content headline | 18–45 znaków | 60 | 3 | Split page |
| Narrative body | 180–300 znaków | 420 | 10–12 | Add page |
| List intro | 50–100 znaków | 130 | 3 | Shorten |
| List item | 35–75 znaków | 95 | 3 | Split item or page |
| Key phrase | 2–18 znaków | 28 | 2 | Use content headline style |
| Explanation | 100–210 znaków | 280 | 6 | Add page |
| Diagram label | 8–28 znaków | 36 | 2 | Shorten |
| Final headline | 20–55 znaków | 72 | 4 | Edit |
| Final summary | 90–180 znaków | 240 | 6 | Remove secondary point |
| CTA | 10–20 znaków | 28 | 1 | Shorten |

## 9. Mock content

### Cover

- **Eyebrow:** CLEARSTANCE INSIGHTS
- **Title:** Pięć pytań, które porządkują zasady eskalacji.
- **Descriptor:** Krótka checklista dla zespołów, które chcą szybciej rozpoznawać moment wymagający decyzji.

### Content page — list module

- **Headline:** Próg eskalacji powinien być zrozumiały przed zdarzeniem.
- **Intro:** W praktyce warto sprawdzić pięć elementów:
- **Items:**
  1. Co uruchamia eskalację?
  2. Kto otrzymuje pierwszą informację?
  3. Kto nadaje sytuacji priorytet?
  4. Jak szybko potrzebna jest decyzja?
  5. Co musi zostać udokumentowane?

### Final

- **Eyebrow:** KLUCZOWA OBSERWACJA
- **Headline:** Dobra eskalacja skraca drogę od sygnału do właściwej decyzji.
- **Summary:** Zespół powinien znać próg, odbiorcę i oczekiwany rezultat eskalacji, zanim pojawi się presja czasu.
- **CTA:** PRZECZYTAJ ANALIZĘ →
- **Website:** clearstance.pl/insights/

## 10. Wireframes

### Cover

```text
┌────────────────────────────────────┐
│  CATEGORY                          │
│  ────────────────────────────────  │
│                                    │
│  TITLE                  ┌────────┐ │
│  TITLE                  │        │ │
│  TITLE                  │   C    │ │
│                         │ VISUAL │ │
│  Short descriptor       │        │ │
│                         │        │ │
│                         │        │ │
│  SWIPE →                └────────┘ │
│  ────────────────────────────────  │
│  01 / NN          CLEARSTANCE      │
│                    INSIGHTS         │
└────────────────────────────────────┘
```

### Content

```text
┌────────────────────────────────────┐
│  CATEGORY                    02/06 │
│  ────────────────────────────────  │
│  02  PAGE HEADLINE          NOTE  │
│      PAGE HEADLINE          RAIL  │
│                                    │
│      [ ONE MODULE ONLY ]           │
│      narrative / list /            │
│      number / diagram              │
│                                    │
│      optional implication          │
│                                    │
│  ────────────────────────────────  │
│  CLEARSTANCE INSIGHTS        02/06 │
└────────────────────────────────────┘
```

### Final

```text
┌────────────────────────────────────┐
│  CLEARSTANCE INSIGHTS              │
│  ────────────────────────────────  │
│  KEY OBSERVATION                   │
│                                    │
│  SUMMARY HEADLINE                  │
│  SUMMARY HEADLINE                  │
│                                    │
│  Short closing summary             │
│                                    │
│  OPTIONAL CTA →                    │
│                                    │
│  clearstance.pl/insights/          │
│  ────────────────────────────────  │
│  06 / 06                CLEARSTANCE│
└────────────────────────────────────┘
```

## 11. Canva build order

1. Utworzyć master 1080 × 1350 px i włączyć `GRID-SOCIAL-4X5`.
2. Dodać strony w kolejności z component library.
3. Zbudować cover base: category, divider, title, descriptor, C frame, footer.
4. Zduplikować cover do wariantu `C`, `MATERIAL` i `NO_IMAGE`.
5. Zbudować content base z fixed header/footer, headline i modular zone.
6. Zduplikować content base cztery razy.
7. Wstawić kolejno reusable groups: narrative, list, key number i diagram.
8. Zbudować final page na INK.
9. Dodać light versions C01/C02, CTA i footer.
10. Zablokować wspólne pozycje header/footer i page count.
11. Pozostawić edytowalne wyłącznie copy, liczby, źródła i frame content.
12. Dodać stronę techniczną z mapą typów stron.
13. Dodać PL stress test z 8 stronami i EN stress test.
14. Zweryfikować numerację po usunięciu każdej opcjonalnej strony.
15. Eksportować jako PDF Standard; dodatkowo cover jako PNG.

# Template 03 — ClearStance Insights Promo

## 1. Purpose

Use:

- promotion of a new ClearStance Insights publication;
- article launch;
- LinkedIn link post;
- social preview.

Master zawiera dwa art-directed formaty:

- A: 1080 × 1350 px;
- B: 1200 × 627 px.

Nie skalować jednego formatu do drugiego. Wspólne są komponenty i hierarchy, ale pozycje oraz crop są osobne.

Master name: `W1-T03_INSIGHTS-PROMO_4x5-AND-1.91_MASTER`.

## 2. Format A — 1080 × 1350

IMAGE DIRECTION: **INSIGHTS SYSTEM**, primary C, secondary material editorial.

| ELEMENT | X | Y | WIDTH | HEIGHT | ALIGNMENT / NOTES |
|---|---:|---:|---:|---:|---|
| Background | 0 | 0 | 1080 | 1350 | PAPER |
| Insights signature | 80 | 84 | 260 | 64 | Left |
| Header divider | 80 | 176 | 920 | 1 | Locked |
| Category | 80 | 216 | 605.33 | 26 | Eyebrow |
| Article title | 80 | 272 | 605.33 | 380 | Left |
| Short deck | 80 | 680 | 526.67 | 130 | Left |
| Publication visual | 709.33 | 216 | 290.67 | 820 | Right |
| Metadata row | 80 | 1068 | 605.33 | 48 | Date / reading time / author |
| Footer divider | 80 | 1174 | 920 | 1 | Locked |
| Publication path | 80 | 1206 | 420 | 24 | Left |
| Optional issue | 912 | 1206 | 88 | 24 | Right |

### Image

- IMAGE FRAME: x 709.33, y 216, width 290.67, height 820 px.
- CROP: cover, custom.
- FOCAL SAFE AREA: local x 40–250, y 90–690.
- OVERLAY: no.
- C: vertical structural detail, natural material, restrained light.
- Material: vellum / graphite / layered paper with no readable text.
- Text never overlaps the frame.

### No-image transform

- Hide image frame.
- Add material strip: x 80, y 916, width 920, height 160 px.
- Expand title: x 80, y 280, width 762.67, height 330 px.
- Expand deck: x 80, y 658, width 605.33, height 130 px.
- Metadata remains y 1068.
- Material strip may contain a 1 px TEAL datum and one CORAL signal; no decorative pseudo-diagram.

## 3. Format B — 1200 × 627

IMAGE DIRECTION: **INSIGHTS SYSTEM**, using the same source image with an independent horizontal crop.

| ELEMENT | X | Y | WIDTH | HEIGHT | ALIGNMENT / NOTES |
|---|---:|---:|---:|---:|---|
| Background | 0 | 0 | 1200 | 627 | PAPER |
| Insights signature | 72 | 56 | 245 | 54 | Left |
| Header divider | 72 | 126 | 516 | 1 | Text zone only |
| Category | 72 | 154 | 426 | 22 | Eyebrow |
| Article title | 72 | 198 | 516 | 188 | Left |
| Short deck | 72 | 408 | 516 | 84 | Left |
| Metadata / path | 72 | 525 | 516 | 24 | Left |
| Publication visual | 702 | 56 | 426 | 515 | Right |

### Image

- IMAGE FRAME: x 702, y 56, width 426, height 515 px.
- CROP: cover, custom; separate from portrait crop.
- FOCAL SAFE AREA: local x 52–370, y 70–450.
- OVERLAY: no.
- Critical architectural vertical should remain between global x 850–1050.
- No title, logo or pseudo-publication text inside image.

### No-image transform

- Replace frame with PAPER 2 panel at the same coordinates.
- Add material layers within x 750–1080, y 104–520.
- Title may expand only to width 606 px, x 72–678; it must not cross x 678.
- Keep the 114 px whitespace gap before the material panel.

## 4. Typography — 1080 × 1350

| ELEMENT | FONT ROLE | SIZE | WEIGHT | LINE HEIGHT | LETTER SPACING | CASE | MAX LINES | ALIGNMENT |
|---|---|---:|---:|---:|---:|---|---:|---|
| Brand / logo | C02 Insights signature | 260 × 64 px | Vector/live utility | — | Existing / +16% | Existing | 2 | Left |
| Eyebrow | Utility mono | 18 px | 600 | 24 px | +16% | UPPERCASE | 1 | Left |
| Headline | Display | 64 px | 500 | 72 px | −3% | Sentence case | 5 | Left |
| Subheadline / deck | Body | 28 px | 400 | 40 px | 0 | Sentence case | 3 | Left |
| Body | Body | 26 px | 400 | 40 px | 0 | Sentence case | 5 | Left |
| Metadata | Utility mono | 17 px | 400 | 24 px | +8% | UPPERCASE labels | 2 | Left |
| Quote | Display | 48 px | 500 | 58 px | −2% | Sentence case | 6 | Left |
| CTA | Body | 20 px | 600 | 26 px | +7% | UPPERCASE | 1 | Left |
| Footer / path | Utility mono | 16 px | 500 | 24 px | +6% | Lowercase path | 1 | Left |

CTA, body and quote are not part of the default promo. They exist only in prepared alternates.

## 5. Typography — 1200 × 627

| ELEMENT | FONT ROLE | SIZE | WEIGHT | LINE HEIGHT | LETTER SPACING | CASE | MAX LINES | ALIGNMENT |
|---|---|---:|---:|---:|---:|---|---:|---|
| Brand / logo | C02 Insights signature | 245 × 54 px | Vector/live utility | — | Existing / +16% | Existing | 2 | Left |
| Eyebrow | Utility mono | 16 px | 600 | 21 px | +15% | UPPERCASE | 1 | Left |
| Headline | Display | 50 / 56 px | 500 | 56 / 62 px | −3% | Sentence case | 4 | Left |
| Subheadline / deck | Body | 21 px | 400 | 28 px | 0 | Sentence case | 3 | Left |
| Body | Body | 19 px | 400 | 27 px | 0 | Sentence case | 4 | Left |
| Metadata | Utility mono | 15 px | 400 | 21 px | +8% | UPPERCASE labels | 1 | Left |
| Quote | Display | 38 px | 500 | 46 px | −2% | Sentence case | 5 | Left |
| CTA | Body | 18 px | 600 | 24 px | +7% | UPPERCASE | 1 | Left |
| Footer / path | Utility mono | 15 px | 500 | 21 px | +6% | Lowercase path | 1 | Left |

Use 56 px headline up to 70 characters / 3 lines. Use 50 px from 71–100 characters / maximum 4 lines.

## 6. Locked vs editable

| ELEMENT | LOCKED? | EDITABLE? | OPTIONAL? | NOTES |
|---|---|---|---|---|
| Background | Yes | No | No | PAPER |
| Grid / guides | Yes | No | No | Separate grids |
| Insights signature | Yes | No | No | Same hierarchy both formats |
| Divider | Yes | No | No | Format-specific length |
| Category | Semi | Controlled text | No | One category |
| Article title | Semi | Text | No | Format-specific box |
| Deck | Semi | Text | Yes | May be removed from link preview |
| Visual frame | Position locked | Image/crop | Yes | Replace with material variant |
| Material system | Geometry locked | Texture | Yes | No live text inside |
| Metadata | Semi | Values | Yes | Date / reading time / author |
| Publication path | Semi | Path | No | PL or EN path |
| Coral signal | Yes | No | Yes | Material variant only |

## 7. Content length rules

| FIELD | IDEAL | MAXIMUM | MAX LINES 4:5 / 1.91 | IF LONGER |
|---|---:|---:|---:|---|
| Category | 12–28 znaków | 40 | 1 / 1 | Shorten |
| Article title | 35–75 znaków | 100 | 5 / 4 | No-image or editorial edit |
| Deck | 80–145 znaków | 190 | 3 / 3 | Remove from 1.91; shorten 4:5 |
| Author | 10–35 znaków | 48 | 1 / 1 | Initials are not preferred; shorten role instead |
| Metadata row | 25–70 znaków | 95 | 2 / 1 | Remove least useful item |
| Publication path | 22–42 znaków | 54 | 1 / 1 | Use short canonical path |
| Optional CTA | 10–20 znaków | 28 | 1 / 1 | One action |

## 8. Mock content

- **Signature:** CLEARSTANCE INSIGHTS
- **Category:** GOTOWOŚĆ ORGANIZACYJNA
- **Article title:** Eskalacja działa dobrze, gdy zespół rozumie jej próg i cel.
- **Deck:** Praktyczne zasady pomagają przekazać właściwą informację właściwej osobie, zanim presja czasu ograniczy dostępne opcje.
- **Metadata:** 28.07.2026 · 7 MIN CZYTANIA
- **Path:** clearstance.pl/insights/

## 9. Wireframes

### 1080 × 1350

```text
┌────────────────────────────────────┐
│  CLEARSTANCE INSIGHTS              │
│  ────────────────────────────────  │
│  CATEGORY               ┌────────┐ │
│                         │        │ │
│  ARTICLE TITLE          │   C /  │ │
│  ARTICLE TITLE          │MATERIAL│ │
│  ARTICLE TITLE          │ VISUAL │ │
│                         │        │ │
│  Short editorial deck   │        │ │
│                         │        │ │
│  date · reading time    └────────┘ │
│  ────────────────────────────────  │
│  clearstance.pl/insights/          │
└────────────────────────────────────┘
```

### 1200 × 627

```text
┌──────────────────────────────────────────────────┐
│ CLEARSTANCE INSIGHTS        ┌──────────────────┐ │
│ ─────────────────────       │                  │ │
│ CATEGORY                    │                  │ │
│ ARTICLE TITLE               │    C / MATERIAL  │ │
│ ARTICLE TITLE               │       VISUAL     │ │
│ Short deck                  │                  │ │
│ path · reading time         │                  │ │
│                             └──────────────────┘ │
└──────────────────────────────────────────────────┘
```

## 10. Canva build order

1. Utworzyć jeden Canva design z dwiema grupami stron: 1080 × 1350 i 1200 × 627. Jeśli Canva nie obsługuje różnych dimensions w jednym designie, utworzyć dwa designy o wspólnym prefixie `W1-T03`.
2. Ustawić odpowiednio `GRID-SOCIAL-4X5` i `GRID-LINK-1.91`.
3. Wstawić C02 Insights signature w dwóch zatwierdzonych rozmiarach.
4. Zbudować format 4:5: divider, category, title, deck, frame, metadata, path.
5. Zduplikować do `C`, `MATERIAL` i `NO_IMAGE`.
6. Zbudować 1.91 od zera na jego gridzie; nie skalować grupy 4:5.
7. Powiązać oba formaty tą samą nazwą pól: `EDIT_TITLE`, `EDIT_DECK`, `EDIT_META`, `EDIT_IMAGE_C`.
8. Zablokować frames, signatures, dividers i backgrounds.
9. Pozostawić edytowalny crop, title, deck, category i meta.
10. Dodać mock content do obu formatów.
11. Sprawdzić tytuł 35, 75 i 100 znaków.
12. Sprawdzić oddzielne PL/EN line breaks.
13. Eksportować 4:5 jako PNG, 1.91 jako JPG 90% i PNG proof.

# Template 04 — ClearStance One-Pager

## 1. Purpose

Use:

- introduction to ClearStance;
- short capability statement;
- downloadable PDF;
- attachment after a meeting.

Canvas: **A4 portrait, 210 × 297 mm**.

Approximate raster equivalent: **2480 × 3508 px at 300 DPI**.

Master name: `W1-T04_ONE-PAGER_A4_MASTER`.

## 2. Grid, bleed and safe area

| PROPERTY | VALUE |
|---|---:|
| Net canvas | 210 × 297 mm |
| 300 DPI equivalent | 2480 × 3508 px |
| Bleed | 3 mm |
| Legal safe area | x 12–198; y 12–285 mm |
| Preferred content margins | 16 mm left/right |
| Grid | 6 columns |
| Column width | 25.92 mm |
| Gutter | 4.5 mm |
| Baseline rhythm | 4 mm |

Horizontal guides: y = 14, 32, 42, 76, 81, 121, 137, 142, 150, 188, 194, 232, 238, 262, 270, 282 mm.

## 3. Exact base layout

Primary base: no-image premium capability sheet. Variant B replaces the right perspective panel with a B visual.

| ELEMENT | X MM | Y MM | W MM | H MM | APPROX. X/Y/W/H PX @300 DPI |
|---|---:|---:|---:|---:|---|
| Background | 0 | 0 | 210 | 297 | 0 / 0 / 2480 / 3508 |
| ClearStance signature | 16 | 14 | 42 | 7.5 | 189 / 165 / 496 / 89 |
| Eyebrow | 16 | 32 | 92 | 4.2 | 189 / 378 / 1087 / 50 |
| Title | 16 | 42 | 117.17 | 34 | 189 / 496 / 1384 / 402 |
| Introduction | 16 | 81 | 117.17 | 40 | 189 / 957 / 1384 / 472 |
| Right visual/perspective panel | 137.67 | 32 | 56.33 | 105 | 1626 / 378 / 665 / 1240 |
| Major divider | 16 | 142 | 178 | 0.15 | 189 / 1677 / 2102 / 2 |
| Capability block 01 | 16 | 150 | 86.75 | 38 | 189 / 1772 / 1025 / 449 |
| Capability block 02 | 107.25 | 150 | 86.75 | 38 | 1267 / 1772 / 1025 / 449 |
| Capability block 03 | 16 | 194 | 86.75 | 38 | 189 / 2291 / 1025 / 449 |
| Capability block 04 | 107.25 | 194 | 86.75 | 38 | 1267 / 2291 / 1025 / 449 |
| Credibility / perspective | 16 | 238 | 117.17 | 24 | 189 / 2811 / 1384 / 283 |
| CTA / contact block | 137.67 | 238 | 56.33 | 24 | 1626 / 2811 / 665 / 283 |
| Footer divider | 16 | 270 | 178 | 0.15 | 189 / 3189 / 2102 / 2 |
| Footer line | 16 | 275 | 178 | 7 | 189 / 3248 / 2102 / 83 |

## 4. Right panel variants

### Variant A — No image

IMAGE DIRECTION: **NONE**.

- Panel: x 137.67, y 32, width 56.33, height 105 mm.
- Background: PAPER 2.
- Inner padding: 6 mm.
- Section label: x 143.67, y 40, width 44.33, height 4.2 mm.
- Perspective heading: x 143.67, y 52, width 44.33, height 24 mm.
- Perspective body: x 143.67, y 82, width 44.33, height 42 mm.
- Coral signal: x 143.67, y 128, diameter 1.8 mm.
- No icons and no decorative quote mark.

### Variant B — Lighthouse & Horizon

IMAGE DIRECTION: **B**.

- IMAGE FRAME: x 137.67, y 32, width 56.33, height 105 mm.
- Approximate 300 DPI: x 1626, y 378, width 665, height 1240 px.
- CROP: cover, custom vertical crop.
- FOCAL SAFE AREA: local x 28–52 mm, local y 15–61 mm.
- HORIZON: local y 62–72 mm.
- OVERLAY: no, because no text sits on image.
- The asset must have an art-directed A4 crop. Do not stretch a wide banner.
- Optional image credit belongs in footer note, not over the image.

## 5. Capability block anatomy

Each block is 86.75 × 38 mm:

- top divider: x 0, y 0, width 86.75 mm;
- number / label: x 0, y 4, width 13 mm, height 4 mm;
- heading: x 17, y 3.5, width 63.75 mm, height 10.5 mm;
- body: x 17, y 16, width 63.75 mm, height 19 mm;
- internal bottom safe space: 3 mm.

No card fill, border box, radius or shadow.

## 6. Typography

| ELEMENT | FONT ROLE | SIZE | WEIGHT | LINE HEIGHT | LETTER SPACING | CASE | MAX LINES | ALIGNMENT |
|---|---|---:|---:|---:|---:|---|---:|---|
| Brand / logo | Imported signature | 42 × 7.5 mm | Vector | — | Existing | Existing | 1 | Left |
| Eyebrow | Utility mono | 8 pt | 600 | 10.5 pt | +14% | UPPERCASE | 1 | Left |
| Headline | Display | 29 pt | 500 | 31 pt | −2.5% | Sentence case | 3 | Left |
| Subheadline / intro | Body | 10.5 pt | 400 | 14.7 pt | 0 | Sentence case | 7 | Left |
| Body | Body | 9.5 pt | 400 | 13 pt | 0 | Sentence case | 5 per block | Left |
| Capability heading | Display | 12.5 pt | 520 | 14.5 pt | −1% | Sentence case | 2 | Left |
| Metadata | Utility mono | 7.5 pt | 500 | 10 pt | +7% | UPPERCASE labels | 2 | Left |
| Quote | Display | 21 pt | 500 | 27 pt | −2% | Sentence case | 5 | Left |
| CTA | Body | 9 pt | 600 | 11 pt | +7% | UPPERCASE | 2 | Left |
| Footer | Utility mono | 7.5 pt | 400–500 | 10 pt | +5% | As written | 1 | Left / right |

Quote is not part of the base page. It may replace the perspective body in a separate approved testimonial variant.

## 7. Locked vs editable

| ELEMENT | LOCKED? | EDITABLE? | OPTIONAL? | NOTES |
|---|---|---|---|---|
| Background / bleed logic | Yes | No | No | PAPER |
| Grid / guides | Yes | No | No | Hide for export |
| Logo position | Yes | No | No | Imported vector |
| Eyebrow | Semi | Controlled text | No | Document type |
| Title | Semi | Text | No | Fixed box |
| Introduction | Semi | Text | No | Fixed box |
| Right panel | Position locked | Copy or image crop | No | Choose A or B |
| Capability block geometry | Yes | No | No | Four instances |
| Capability labels/headings/body | Semi | Text | No | Copy editable |
| Credibility section | Semi | Text | No | One proof / perspective |
| CTA/contact | Semi | Text/contact | No | One action |
| Footer divider | Yes | No | No | Fixed |
| Footer line | Semi | URL/version | No | No redundant metadata |
| Image credit | Semi | Text | Yes | Footer note |
| Coral signal | Yes | No | Yes | No-image panel only |

## 8. Content length rules

| FIELD | IDEAL | MAXIMUM | MAX LINES | IF LONGER |
|---|---:|---:|---:|---|
| Eyebrow | 12–28 znaków | 40 | 1 | Shorten |
| Title | 30–65 znaków | 95 | 3 | Use 27 pt alternate, never below 24 pt |
| Introduction | 220–330 znaków | 430 | 7 | Edit or move detail to capability blocks |
| Capability label | 2 digits / 10–18 znaków | 24 | 1 | Shorten |
| Capability heading | 20–48 znaków | 62 | 2 | Edit service name |
| Capability body | 100–180 znaków | 230 | 5 | Remove secondary sentence |
| Perspective heading | 18–42 znaków | 55 | 3 | Shorten |
| Perspective body | 120–220 znaków | 290 | 8 | Move proof to credibility section |
| Credibility section | 140–230 znaków | 300 | 5 | Edit |
| CTA | 10–22 znaków | 28 | 2 | Shorten |
| Contact line | 25–55 znaków | 72 | 2 | Keep domain + email only |

## 9. Mock content

- **Eyebrow:** CLEARSTANCE / CAPABILITY OVERVIEW
- **Title:** Gotowość porządkuje działanie.
- **Introduction:** ClearStance pomaga zespołom przygotować role, decyzje i zasady eskalacji, które pozostają użyteczne również wtedy, gdy sytuacja rozwija się szybko. Pracujemy nad rozwiązaniami dopasowanymi do odpowiedzialności, sposobu działania i realnych ograniczeń organizacji.
- **Capability 01:** System zarządzania kryzysowego
  Struktury odpowiedzialności, rytm pracy i praktyczne narzędzia dopasowane do organizacji.
- **Capability 02:** Ćwiczenia i symulacje
  Scenariusze sprawdzające decyzje, współpracę i przepływ informacji w realistycznych warunkach.
- **Capability 03:** Facylitacja decyzji
  Uporządkowanie rozmowy, priorytetów i kolejnych kroków w sytuacjach wymagających wspólnego stanowiska.
- **Capability 04:** Przeglądy i doskonalenie
  Konkretne wnioski po ćwiczeniu lub zdarzeniu oraz plan wdrożenia uzgodnionych zmian.
- **Perspective:** Perspektywa operacyjna
  Praca łączy doświadczenie działania pod presją z dyscypliną doradczą i spokojnym prowadzeniem procesu.
- **Credibility:** Zakres dobieramy do faktycznej sytuacji, odpowiedzialności zespołu i decyzji, które organizacja musi podejmować.
- **CTA/contact:** POROZMAWIAJMY →
  contact@clearstance.pl
- **Footer:** clearstance.pl

## 10. Wireframes

### No-image base

```text
┌────────────────────────────────────┐
│ CLEARSTANCE                        │
│                                    │
│ EYEBROW              ┌───────────┐ │
│ TITLE                │PERSPECTIVE│ │
│ TITLE                │           │ │
│                      │Heading    │ │
│ Short introduction   │Body       │ │
│                      │           │ │
│                      │         • │ │
│ ───────────────────────────────── │
│ 01 Capability       02 Capability │
│    body                body       │
│                                    │
│ 03 Capability       04 Capability │
│    body                body       │
│                                    │
│ Credibility          CTA/contact  │
│ ───────────────────────────────── │
│ clearstance.pl                     │
└────────────────────────────────────┘
```

### Visual B

```text
┌────────────────────────────────────┐
│ CLEARSTANCE                        │
│                                    │
│ EYEBROW              ┌───────────┐ │
│ TITLE                │           │ │
│ TITLE                │           │ │
│                      │     B     │ │
│ Short introduction   │LIGHTHOUSE │ │
│                      │& HORIZON  │ │
│                      │           │ │
│ ─────────────────────┴───────────┤ │
│ 01 Capability       02 Capability │
│    body                body       │
│                                    │
│ 03 Capability       04 Capability │
│    body                body       │
│                                    │
│ Credibility          CTA/contact  │
│ ───────────────────────────────── │
│ clearstance.pl                     │
└────────────────────────────────────┘
```

## 11. Canva build order

1. Utworzyć dokument A4 portrait.
2. Włączyć print bleed 3 mm.
3. Ustawić `GRID-A4-6`: margins 16 mm, 6 columns, gutters 4.5 mm.
4. Dodać horizontal guides z sekcji grid.
5. Wstawić PAPER background do bleed i zablokować.
6. Wstawić C01 w rozmiarze 42 × 7.5 mm.
7. Dodać eyebrow, title i introduction boxes.
8. Zbudować right panel no-image z PAPER 2.
9. Zduplikować stronę i zastąpić panel frame’em `IMG-A4-B-TALL`.
10. Zbudować jeden C15 capability block 86.75 × 38 mm.
11. Zduplikować go trzy razy do wskazanych pozycji.
12. Dodać credibility oraz CTA/contact.
13. Dodać footer divider i footer line.
14. Zgrupować oraz zablokować geometrię bloków; pozostawić live text.
15. Dodać PL/EN stress tests.
16. Wydrukować proof w skali 100%.
17. Eksportować PDF Standard do e-maila i PDF Print z bleed do druku.

# Template 05 — ClearStance Case Study

## 1. Purpose

Use:

- project / engagement summary;
- exercise case;
- advisory case;
- anonymised client example.

Canvas: **A4 portrait, 210 × 297 mm**.

Approximate raster equivalent: **2480 × 3508 px at 300 DPI**.

Master name: `W1-T05_CASE-STUDY_A4_MASTER`.

System nie zakłada obecności metrics cards. Dane ilościowe pojawiają się tylko wtedy, gdy są prawdziwe, istotne i możliwe do opublikowania.

## 2. Grid and exact layout

Użyć `GRID-A4-6`.

| ELEMENT | X MM | Y MM | W MM | H MM | APPROX. X/Y/W/H PX @300 DPI |
|---|---:|---:|---:|---:|---|
| Background | 0 | 0 | 210 | 297 | 0 / 0 / 2480 / 3508 |
| ClearStance signature | 16 | 14 | 42 | 7.5 | 189 / 165 / 496 / 89 |
| Case/context label | 16 | 32 | 117.17 | 4.2 | 189 / 378 / 1384 / 50 |
| Title | 16 | 42 | 117.17 | 31 | 189 / 496 / 1384 / 366 |
| Short summary | 16 | 80 | 117.17 | 34 | 189 / 945 / 1384 / 402 |
| Visual / context panel | 137.67 | 32 | 56.33 | 72 | 1626 / 378 / 665 / 850 |
| Case metadata | 137.67 | 109 | 56.33 | 8 | 1626 / 1287 / 665 / 94 |
| Major divider | 16 | 120 | 178 | 0.15 | 189 / 1417 / 2102 / 2 |
| Challenge column | 16 | 130 | 56.33 | 83 | 189 / 1535 / 665 / 980 |
| Approach column | 76.83 | 130 | 56.34 | 83 | 907 / 1535 / 665 / 980 |
| Outcome column | 137.67 | 130 | 56.33 | 83 | 1626 / 1535 / 665 / 980 |
| Key takeaway | 16 | 221 | 178 | 32 | 189 / 2610 / 2102 / 378 |
| Footer divider | 16 | 266 | 178 | 0.15 | 189 / 3142 / 2102 / 2 |
| Footer contact | 16 | 272 | 178 | 10 | 189 / 3213 / 2102 / 118 |

## 3. Visual modes

### Mode A — One approved photo

IMAGE DIRECTION: approved documentary project image or C-compatible operational detail.

- IMAGE FRAME: x 137.67, y 32, width 56.33, height 72 mm.
- CROP: cover, custom.
- FOCAL SAFE AREA: local x 8–50 mm, local y 8–62 mm.
- OVERLAY: no.
- No faces without permission.
- Avoid people pointing at screens or staged workshop poses.

### Mode B — ClearStance Insights-style visual

IMAGE DIRECTION: **C / INSIGHTS SYSTEM**.

- Same frame dimensions and position.
- CROP: cover for C; contain is permitted for an approved graphite / vellum composition with PAPER 2 background.
- FOCAL SAFE AREA: central 42 × 54 mm.
- OVERLAY: no.
- Coral signal belongs to layout, not generated visual.

### Mode C — No image

IMAGE DIRECTION: **NONE**.

- Replace frame with PAPER 2 context panel at exact same coordinates.
- Inner padding: 6 mm.
- Context label: x 143.67, y 40, width 44.33, height 4 mm.
- Context body: x 143.67, y 51, width 44.33, height 40 mm.
- Confidentiality status: x 143.67, y 95, width 44.33, height 4 mm.
- No empty wrapper and no placeholder icon.

## 4. Three-column section anatomy

Each section column:

- width: 56.33 mm;
- label box: x local 0, y local 0, width 56.33, height 4.2 mm;
- short divider: x local 0, y local 8, width 56.33, 0.4 pt;
- optional section heading: x local 0, y local 13, width 56.33, height 11 mm;
- body: x local 0, y local 29, width 56.33, height 49 mm;
- bottom safety: 5 mm.

If no section heading is needed, body begins at local y 14 and may use 64 mm height.

Outcome may be an observation rather than a claimed result. Label options:

- `OUTCOME`;
- `OBSERVATION`;
- `OUTCOME / OBSERVATION`.

Do not change this into a large KPI unless the number is verified and meaningful.

## 5. Key takeaway anatomy

- Container: x 16, y 221, width 178, height 32 mm.
- Background: PAPER 2.
- Padding: 6 mm.
- Coral signal: x 22, y 227, diameter 1.8 mm.
- Label: x 28, y 226, width 40, height 4.2 mm.
- Takeaway text: x 28, y 234, width 154, height 13 mm.
- Maximum two lines at 12 pt, or four lines at 9.5 pt if using label + body mode.

## 6. Typography

| ELEMENT | FONT ROLE | SIZE | WEIGHT | LINE HEIGHT | LETTER SPACING | CASE | MAX LINES | ALIGNMENT |
|---|---|---:|---:|---:|---:|---|---:|---|
| Brand / logo | Imported signature | 42 × 7.5 mm | Vector | — | Existing | Existing | 1 | Left |
| Eyebrow / case label | Utility mono | 8 pt | 600 | 10.5 pt | +14% | UPPERCASE | 1 | Left |
| Headline | Display | 27 pt | 500 | 29.5 pt | −2.5% | Sentence case | 3 | Left |
| Subheadline / summary | Body | 10.5 pt | 400 | 14.7 pt | 0 | Sentence case | 6 | Left |
| Body | Body | 9.5 pt | 400 | 13 pt | 0 | Sentence case | 14 per column | Left |
| Section heading | Display | 11.5 pt | 520 | 13.5 pt | −1% | Sentence case | 2 | Left |
| Metadata | Utility mono | 7.5 pt | 400–600 | 10 pt | +7% | UPPERCASE labels | 3 | Left |
| Quote | Display | 20 pt | 500 | 25 pt | −2% | Sentence case | 5 | Left |
| Key takeaway | Display | 12 pt | 520 | 15 pt | −1% | Sentence case | 2 | Left |
| CTA | Body | 9 pt | 600 | 11 pt | +7% | UPPERCASE | 1 | Left |
| Footer | Utility mono | 7.5 pt | 400–500 | 10 pt | +5% | As written | 2 | Left / right |

Quote is an alternate for short summary, not an additional block.

## 7. Locked vs editable

| ELEMENT | LOCKED? | EDITABLE? | OPTIONAL? | NOTES |
|---|---|---|---|---|
| Background / bleed | Yes | No | No | PAPER |
| Grid / guides | Yes | No | No | Hide before export |
| Logo | Yes | No | No | Imported vector |
| Case/context label | Semi | Controlled text | No | Type + anonymity |
| Title | Semi | Text | No | Fixed box |
| Summary | Semi | Text | No | Fixed box |
| Visual frame | Position locked | Image/crop | Optional by mode | Replace with context panel |
| Context panel | Geometry locked | Text | Optional by mode | No-image only |
| Case metadata | Semi | Values | No | Sector/status/date as permitted |
| Section columns | Geometry locked | Text | No | Challenge/approach/outcome |
| Section headings | Semi | Text | Yes | Hide and expand body |
| Key takeaway | Geometry locked | Text | No | One implication |
| Footer divider | Yes | No | No | Fixed |
| Footer contact | Semi | Contact/path | No | Domain + email |
| Confidentiality note | Semi | Status | Optional | Required for anonymised/poufną wersję |
| Coral signal | Yes | No | No | In takeaway only |

## 8. Content length rules

| FIELD | IDEAL | MAXIMUM | MAX LINES | IF LONGER |
|---|---:|---:|---:|---|
| Case/context label | 18–38 znaków | 52 | 1 | Shorten; move status to meta |
| Title | 35–75 znaków | 100 | 3 | Use 25 pt alternate; never below 24 pt |
| Summary | 180–300 znaków | 380 | 6 | Edit or create 2-page case |
| Case metadata | 25–70 znaków | 100 | 3 | Remove nonessential field |
| Section heading | 15–38 znaków | 50 | 2 | Remove heading or edit |
| Challenge body | 180–300 znaków | 390 | 14 | Create 2-page case |
| Approach body | 200–320 znaków | 420 | 14 | Create 2-page case |
| Outcome body | 160–280 znaków | 370 | 14 | Separate lessons on page 2 |
| Context panel body | 100–210 znaków | 280 | 10 | Shorten |
| Key takeaway | 90–180 znaków | 230 | 4 | Reduce to one implication |
| Contact line | 25–55 znaków | 72 | 2 | Domain + email only |

Minimum type remains 9.5 pt. If any three-column body exceeds its limit, the correct response is a two-page case study, not smaller text.

## 9. Mock content

- **Case/context label:** ĆWICZENIE / ANONIMIZOWANY PRZYKŁAD
- **Title:** Ćwiczenie decyzyjne dla zespołu działającego przy ograniczonej informacji.
- **Short summary:** Organizacja chciała sprawdzić, czy role, przepływ informacji i zasady eskalacji pozostają czytelne, gdy kilka zdarzeń rozwija się równolegle.
- **Metadata:** SEKTOR INFRASTRUKTURALNY · ĆWICZENIE STOŁOWE
- **Challenge:** Zespół dysponował procedurą, ale część decyzji zależała od nieformalnej wiedzy kilku osób. Scenariusz miał ujawnić miejsca, w których odpowiedzialność lub próg eskalacji nie były wystarczająco jednoznaczne.
- **Approach:** Ćwiczenie przeprowadzono w krótkich rundach decyzyjnych. Po każdej rundzie facylitatorzy sprawdzali przepływ informacji, przypisanie decyzji i sposób dokumentowania ustaleń.
- **Outcome / observation:** Zespół potwierdził mocne elementy obecnego modelu i wskazał kilka punktów wymagających doprecyzowania. Wnioski przełożono na właścicieli działań oraz terminy przeglądu.
- **Key takeaway:** Największą wartość przyniosło wspólne sprawdzenie, jak formalne zasady działają w realnym rytmie decyzji.
- **Contact:** contact@clearstance.pl · clearstance.pl

## 10. Wireframes

### Image / C visual

```text
┌────────────────────────────────────┐
│ CLEARSTANCE                        │
│                                    │
│ CASE / CONTEXT       ┌───────────┐ │
│ TITLE                │           │ │
│ TITLE                │ PHOTO / C │ │
│                      │  VISUAL   │ │
│ Short summary        └───────────┘ │
│                      metadata      │
│ ───────────────────────────────── │
│ CHALLENGE   APPROACH    OUTCOME    │
│ ─────────   ─────────   ─────────  │
│ body        body        body       │
│ body        body        body       │
│ body        body        body       │
│                                    │
│ ┌────────────────────────────────┐ │
│ │ • KEY TAKEAWAY                 │ │
│ └────────────────────────────────┘ │
│ ───────────────────────────────── │
│ CLEARSTANCE       contact / website│
└────────────────────────────────────┘
```

### No image

```text
┌────────────────────────────────────┐
│ CLEARSTANCE                        │
│                                    │
│ CASE / CONTEXT       ┌───────────┐ │
│ TITLE                │ CONTEXT   │ │
│ TITLE                │ sector    │ │
│                      │ scope     │ │
│ Short summary        │ status    │ │
│                      └───────────┘ │
│ ───────────────────────────────── │
│ CHALLENGE   APPROACH    OBSERVATION│
│ ─────────   ─────────   ─────────  │
│ body        body        body       │
│ body        body        body       │
│ body        body        body       │
│                                    │
│ ┌────────────────────────────────┐ │
│ │ • KEY TAKEAWAY                 │ │
│ └────────────────────────────────┘ │
│ ───────────────────────────────── │
│ CLEARSTANCE       contact / website│
└────────────────────────────────────┘
```

## 11. Canva build order

1. Utworzyć dokument A4 portrait i włączyć 3 mm bleed.
2. Ustawić `GRID-A4-6`.
3. Dodać horizontal guides y 14, 32, 42, 73, 80, 104, 109, 117, 120, 130, 213, 221, 253, 266, 272, 282 mm.
4. Dodać PAPER background do bleed i zablokować.
5. Wstawić C01 signature.
6. Dodać case label, title i summary.
7. Wstawić `IMG-A4-CASE` w prawym górnym panelu.
8. Zbudować alternate context panel o identycznych dimensions.
9. Dodać case metadata.
10. Zbudować jeden section-column group 56.33 × 83 mm.
11. Zduplikować go do Challenge, Approach i Outcome.
12. Dodać C16 Key Takeaway w podanych coordinates.
13. Dodać footer divider i C12 footer contact.
14. Zduplikować stronę do modes `PHOTO`, `C_MATERIAL`, `NO_IMAGE`.
15. Zablokować geometry; pozostawić edytowalne copy i crop.
16. Dodać confidentiality note do anonymised mode.
17. Przeprowadzić PL i EN stress test.
18. Wydrukować proof 100%; szczególnie sprawdzić trzy kolumny body.
19. Jeśli którakolwiek kolumna wymaga tekstu poniżej 9.5 pt, utworzyć dwustronicową working copy.
20. Eksportować PDF Standard / PDF Print zgodnie z kanałem.

# Final Review

## Scoring

| TEMPLATE | BRAND FIT | PREMIUM FEEL | EDITABILITY | CONTENT FLEXIBILITY | CANVA PRACTICALITY |
|---|---:|---:|---:|---:|---:|
| 01 LinkedIn Portrait Post | 9.5/10 | 9/10 | 9/10 | 9/10 | 9/10 |
| 02 LinkedIn Carousel | 9.5/10 | 9/10 | 8.5/10 | 9.5/10 | 8.5/10 |
| 03 ClearStance Insights Promo | 9.5/10 | 9.5/10 | 9/10 | 9/10 | 8.5/10 |
| 04 ClearStance One-Pager | 9.5/10 | 9/10 | 8.5/10 | 8.5/10 | 8.5/10 |
| 05 ClearStance Case Study | 9/10 | 9/10 | 8.5/10 | 9/10 | 8.5/10 |

## Review conclusions

- Wszystkie wyniki są co najmniej 8/10.
- Największe ryzyko carousel i PDF dotyczy zbyt długiego copy; system rozwiązuje je przez moduły, warianty i dodatkową stronę, nie przez zmniejszanie tekstu.
- Insights pozostaje bardziej editorial dzięki C/material imagery, metadanym i strukturze, bez tworzenia osobnego logo.
- Latarnia występuje wyłącznie tam, gdzie pełni funkcję: B w image-led post i one-pagerze, C w Insights i case study. Carousel content oraz final page pozostają typograficzne.
- Canva practicality jest zabezpieczona przez wspólne gridy, nazwane komponenty, fixed-size text boxes, locked geometry i stress tests PL/EN.

## Final pre-build gate

Przed rozpoczęciem produkcji w Canva należy zatwierdzić:

1. dostępność Avenir Next albo binding całej biblioteki do Manrope;
2. zatwierdzony SVG ClearStance signature;
3. jeden master image B i jeden master image C;
4. material direction dla Insights;
5. mock export każdej templatki przy 25% i 100%;
6. testowy wydruk A4;
7. ownera biblioteki i proces zatwierdzania working copies.
