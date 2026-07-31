# ClearStance Canva Component Library

## 1. Purpose and source of truth

Ten dokument definiuje wspólne komponenty, tokeny i zabezpieczenia dla pięciu masterów Wave 1 opisanych w `CLEARSTANCE_CANVA_WAVE1_LAYOUTS.md`.

Źródłem nadrzędnym pozostaje `CLEARSTANCE_CANVA_TEMPLATE_SYSTEM.md`. Ten dokument nie tworzy nowej identyfikacji. Zamienia istniejące zasady na wartości produkcyjne potrzebne w Canva.

## 2. Units and coordinate conventions

### Raster / social

- Początek układu współrzędnych: lewy górny narożnik canvasu.
- `x` rośnie w prawo, `y` rośnie w dół.
- Wszystkie wartości podawane są w px.
- Bazowa jednostka odstępu: 8 px.
- Dopuszczalne odstępy: 8, 16, 24, 32, 48, 64, 80 i 96 px.
- Elementy optyczne mogą zostać przesunięte o maksymalnie 2 px, ale wartość bazowa pozostaje zapisana w nazwie komponentu.

### A4

- Format netto: 210 × 297 mm.
- Format przy 300 DPI: około 2480 × 3508 px.
- Bleed 3 mm po każdej stronie: dokument brutto 216 × 303 mm, około 2551 × 3579 px.
- Początek współrzędnych layoutu: lewy górny narożnik strony netto, nie bleed.
- Bazowa jednostka: 4 mm.
- Przelicznik kontrolny 300 DPI: `1 mm ≈ 11.811 px`.
- Canva master należy budować jako A4, a bleed włączyć w ustawieniach eksportu. Nie należy ręcznie powiększać strony do 216 × 303 mm, jeśli Canva obsługuje bleed.

## 3. Shared color tokens

Ta tabela jest wspólna dla wszystkich pięciu templatek.

| TOKEN | HEX / VALUE | USE |
|---|---|---|
| INK | `#081722` | Główne ciemne tło, główny tekst na paper |
| INK 2 | `#0F2430` | Wtórny ciemny panel, spokojne różnicowanie sekcji |
| PAPER | `#F2EEE7` | Główne jasne tło |
| PAPER 2 | `#E8E3DB` | Callout, quote block, material panel |
| TEXT | `#11202A` | Body i nagłówki na jasnym tle |
| MUTED TEXT | `#59676F` | Supporting copy, caption, metadata na paper |
| MUTED TEXT DARK | `#829496` | Supporting copy i metadata na ink |
| TEAL | `#6F8F89` | Linie, secondary accent, prosty diagram |
| TEAL DEEP | `#385E5D` | Eyebrow, link, aktywny label |
| CORAL | `#C65348` | Pojedynczy signal dot, numer lub krótki marker |
| CORAL TEXT PAPER | `#A84239` | Mały tekst sygnałowy na paper, jeśli potrzebny jest kontrast |
| CORAL TEXT DARK | `#D06D63` | Mały tekst sygnałowy na ink |
| DIVIDER PAPER | `#122630` przy 14% opacity | Linia na paper |
| DIVIDER INK | `#F8F6F2` przy 16% opacity | Linia na ink |
| LIGHT TEXT | `#F8F6F2` | Tekst na ink lub ciemnym obrazie |
| LIGHT TEAL | `#A7BBB7` | Eyebrow na ink |

### Color usage limits

- Coral: orientacyjnie mniej niż 3% powierzchni planszy.
- Maksymalnie jeden coral signal na jednej podstawowej osi kompozycji.
- Nie stosować coral jako dużego tła.
- Nie tworzyć gradientów teal–coral.
- Overlay na fotografii może być wyłącznie ink.
- Nie obniżać opacity body text. Używać właściwego tokenu muted.

## 4. Canva font mapping

### Font families

| ROLE | FIRST CHOICE | CANVA FALLBACK | CHARACTER |
|---|---|---|---|
| Display / headline | Avenir Next | Manrope | Humanistyczny, spokojny grotesk o miękkich proporcjach |
| Body / supporting copy | Inter | Open Sans | Neutralny, bardzo czytelny sans |
| Utility / metadata | IBM Plex Mono | Roboto Mono | Techniczny, restrained mono |

### Binding decision

1. Jeśli konto Canva ma legalnie dostępny `Avenir Next`, należy użyć go we wszystkich masterach.
2. Jeśli go nie ma, cała biblioteka używa `Manrope`.
3. Nie wolno mieszać Avenir Next i Manrope między templatekami.
4. Body pozostaje `Inter`.
5. Utility pozostaje `IBM Plex Mono`; `Roboto Mono` jest fallbackiem całej biblioteki, nie pojedynczej planszy.
6. `DM Sans` nie jest fallbackiem Wave 1. Pozostaje opcją rezerwową tylko po osobnym review.

### Weight mapping

Canva może nie udostępniać wartości pośrednich znanych z CSS. Używać:

| Intended weight | Avenir Next | Manrope | Inter | IBM Plex Mono |
|---:|---|---|---|---|
| 400–450 | Regular | Regular | Regular | Regular |
| 480–520 | Medium | Medium | Medium | Medium |
| 520–560 | Demi Bold | SemiBold | SemiBold | SemiBold |
| 600–700 | Demi Bold / Bold | SemiBold / Bold | SemiBold / Bold | SemiBold / Bold |

Nie używać ExtraBold ani Black.

## 5. Master grids

### GRID-SOCIAL-4X5

- Canvas: 1080 × 1350 px.
- Columns: 12.
- Outer margins: 80 px.
- Gutters: 24 px.
- Column width: 54.67 px.
- Content width: 920 px.
- Vertical safe zone: y = 84–1254 px.
- Footer baseline zone: y = 1174–1254 px.

| Column | Start x | End x |
|---:|---:|---:|
| 1 | 80.00 | 134.67 |
| 2 | 158.67 | 213.33 |
| 3 | 237.33 | 292.00 |
| 4 | 316.00 | 370.67 |
| 5 | 394.67 | 449.33 |
| 6 | 473.33 | 528.00 |
| 7 | 552.00 | 606.67 |
| 8 | 630.67 | 685.33 |
| 9 | 709.33 | 764.00 |
| 10 | 788.00 | 842.67 |
| 11 | 866.67 | 921.33 |
| 12 | 945.33 | 1000.00 |

W Canva należy ustawić 12 columns, margin 80, gutter 24. Wartości dziesiętne są referencją; Canva może zaokrąglić pozycję o 1 px.

### GRID-LINK-1.91

- Canvas: 1200 × 627 px.
- Columns: 12.
- Outer margins: 72 px.
- Gutters: 24 px.
- Column width: 66 px.
- Content width: 1056 px.
- Vertical safe zone: y = 56–571 px.

| Column | Start x | End x |
|---:|---:|---:|
| 1 | 72 | 138 |
| 2 | 162 | 228 |
| 3 | 252 | 318 |
| 4 | 342 | 408 |
| 5 | 432 | 498 |
| 6 | 522 | 588 |
| 7 | 612 | 678 |
| 8 | 702 | 768 |
| 9 | 792 | 858 |
| 10 | 882 | 948 |
| 11 | 972 | 1038 |
| 12 | 1062 | 1128 |

### GRID-A4-6

- Canvas: 210 × 297 mm.
- Columns: 6.
- Left/right content margins: 16 mm.
- Gutters: 4.5 mm.
- Column width: 25.92 mm.
- Content width: 178 mm.
- Legal safe area: x = 12–198 mm, y = 12–285 mm.
- Preferred content area: x = 16–194 mm, y = 14–282 mm.

| Column | Start x mm | End x mm | Approx. start/end px at 300 DPI |
|---:|---:|---:|---:|
| 1 | 16.00 | 41.92 | 189–495 |
| 2 | 46.42 | 72.33 | 548–854 |
| 3 | 76.83 | 102.75 | 907–1214 |
| 4 | 107.25 | 133.17 | 1267–1573 |
| 5 | 137.67 | 163.58 | 1626–1932 |
| 6 | 168.08 | 194.00 | 1985–2291 |

## 6. Lock states and layer naming

### States

| STATE | MEANING | EXAMPLES |
|---|---|---|
| `LOCKED` | Nie edytować w kopii roboczej | Background, grid logic, logo position, divider position |
| `SEMI-LOCKED` | Kontener, pozycja i styl stałe; treść edytowalna | Footer URL, metadata row, page count |
| `EDITABLE` | Treść lub obraz można zmienić w wyznaczonych granicach | Headline, deck, image crop |
| `OPTIONAL` | Można ukryć cały komponent bez pozostawienia luki | CTA, source note, image frame w wariancie no-image |

### Layer/group naming

Utrzymywać tę samą kolejność:

1. `00_LOCK_BG_[PAPER|INK]`
2. `01_EDIT_IMAGE_[A|B|C|MATERIAL]`
3. `02_LOCK_OVERLAY_INK_[XX]`
4. `03_LOCK_DECOR_[DIVIDER|SIGNAL|ARC]`
5. `10_LOCK_BRAND_CLEARSTANCE`
6. `11_LOCK_BRAND_INSIGHTS`
7. `20_SEMI_META_[CATEGORY|DATE|PAGE]`
8. `30_EDIT_HEADLINE`
9. `31_EDIT_SUBHEAD`
10. `32_EDIT_BODY_[01|02|03]`
11. `40_SEMI_CTA`
12. `50_SEMI_FOOTER`
13. `90_GUIDES_DO_NOT_EXPORT`
14. `99_NOTES_DELETE_BEFORE_EXPORT`

W Canva zgrupować każdy komponent przed zablokowaniem. Nie pozostawiać oddzielnych kropek, linii i liter jako luźnych elementów.

## 7. Reusable component specifications

## C01 — ClearStance Signature

| PROPERTY | SOCIAL | A4 |
|---|---:|---:|
| Placement container | 208 × 36 px | 42 × 7.5 mm |
| Mark height | 36 px | 7.5 mm |
| Internal mark–word gap | 14 px | 2.8 mm |
| Wordmark role | Display / existing vector | Existing vector |
| Clear space | 36 px each side | 7.5 mm each side |
| Color | INK on paper; LIGHT TEXT on ink | Same |

- **Use:** cover, social footer, first/last page PDF.
- **Build:** import one approved SVG lockup, set its height to the value above and preserve the original aspect ratio. The placement container defines alignment space, not a target for stretching. Do not reconstruct the lockup from circles and live text.
- **Locked:** yes, after placing.
- **When not to use:** every interior carousel page if Insights signature already identifies the series; inside dense body sections.

## C02 — ClearStance Insights Signature

| PROPERTY | 1080 × 1350 | 1200 × 627 | A4 |
|---|---:|---:|---:|
| Bounding box | 260 × 64 px | 245 × 54 px | 49 × 11 mm |
| ClearStance lockup | 208 × 36 px | 184 × 32 px | 39 × 7 mm |
| `INSIGHTS` baseline offset | 46 px from top | 39 px from top | 8.1 mm from top |
| `INSIGHTS` font | IBM Plex Mono SemiBold 16 px | 14 px | 7.5 pt |
| Tracking | 16% | 16% | 14% |
| Color | INK / LIGHT TEXT; `INSIGHTS` TEAL DEEP or LIGHT TEAL | Same | Same |

- **Use:** Insights cover, promo, carousel cover/final.
- **Construction:** existing ClearStance lockup plus live-text `INSIGHTS`; no new symbol.
- **Locked:** geometry locked; language-independent.
- **When not to use:** ordinary Core ClearStance post, service sheet without publication context.

## C03 — Eyebrow

| PROPERTY | SOCIAL | 1200 × 627 | A4 |
|---|---:|---:|---:|
| Text box | up to 600 × 26 px | up to 500 × 22 px | up to 92 × 4.2 mm |
| Font | IBM Plex Mono SemiBold | Same | Same |
| Size | 18 px | 16 px | 8 pt |
| Line height | 24 px | 21 px | 10.5 pt |
| Tracking | 16% | 15% | 14% |
| Case | UPPERCASE | UPPERCASE | UPPERCASE |
| Color | TEAL DEEP / LIGHT TEAL | Same | Same |

- **Use:** category, document type, service family.
- **Content:** ideal 12–28 characters; max 40.
- **Locked:** style and position locked; text selectable from controlled vocabulary.
- **When not to use:** as a second headline or full sentence.

## C04 — Section Marker

| PROPERTY | SOCIAL | A4 |
|---|---:|---:|
| Bounding box | 64 × 40 px | 13 × 7 mm |
| Number font | IBM Plex Mono SemiBold 20 px / 28 px | 8.5 pt / 11 pt |
| Divider | 32 × 1 px below or right | 7 × 0.15 mm |
| Signal | 8 px coral dot optional | 1.6 mm coral dot optional |

- **Use:** carousel step, capability block number, case section.
- **Locked:** number position, divider and signal locked; number editable.
- **When not to use:** unordered observation or quote.

## C05 — Thin Divider

| PROPERTY | SOCIAL | 1200 × 627 | A4 |
|---|---:|---:|---:|
| Standard width | 920 px | 1056 px | 178 mm |
| Short width | 290.67 / 448 / 526.67 px | 426 / 516 px | 56.33 / 86.75 / 117.17 mm |
| Stroke | 1 px | 1 px | 0.4 pt |
| Color | DIVIDER PAPER / DIVIDER INK | Same | Same |

- **Use:** oddzielenie header/footer, sekcji lub metadanych.
- **Locked:** yes.
- **When not to use:** obrys wokół każdego bloku; dekoracyjna linia bez wyrównania do gridu.

## C06 — Coral Signal

| PROPERTY | SOCIAL | A4 |
|---|---:|---:|
| Dot diameter | 8 px | 1.8 mm |
| Optional short line | 32 × 2 px | 7 × 0.5 mm |
| Color | CORAL | CORAL |

- **Use:** pojedynczy aktywny punkt, numer, ważna implikacja.
- **Locked:** pozycja i styl locked.
- **When not to use:** więcej niż jeden silny marker na planszę; jako bullet dla długiej listy.

## C07 — CTA Arrow

| PROPERTY | SOCIAL | 1200 × 627 | A4 |
|---|---:|---:|---:|
| Max bounding box | 320 × 32 px | 280 × 28 px | 58 × 5 mm |
| Label font | Inter SemiBold 20 px | 18 px | 9 pt |
| Line height | 26 px | 24 px | 11 pt |
| Tracking | 7% | 7% | 7% |
| Arrow gap | 14 px | 12 px | 2.8 mm |
| Arrow | `→`, TEAL DEEP / LIGHT TEAL | Same | Same |

- **Use:** jedna następna czynność.
- **Locked:** group geometry semi-locked; label editable.
- **Content:** ideal 10–20 characters; max 28.
- **When not to use:** link-preview cover, proposal cover, zwykłe strony carousel content.

## C08 — Metadata Row

| PROPERTY | SOCIAL | 1200 × 627 | A4 |
|---|---:|---:|---:|
| Bounding box | 920 × 24 px | 1056 × 21 px | 178 × 4.2 mm |
| Font | IBM Plex Mono Regular 17 px | 15 px | 7.5 pt |
| Line height | 24 px | 21 px | 10 pt |
| Tracking | 8% | 8% | 7% |
| Gap between items | 24 px | 20 px | 4 mm |
| Color | MUTED TEXT / MUTED TEXT DARK | Same | Same |

- **Use:** category, date, reading time, case status, page count.
- **Separator:** middle dot `·` or spacing; never slash between PL/EN.
- **Locked:** position and style semi-locked; values editable.
- **When not to use:** jeśli jedyną metadaną jest kategoria już obecna w eyebrow.

## C09 — Quote Block

| PROPERTY | SOCIAL | A4 |
|---|---:|---:|
| Max width | 760 px | 117.17 mm |
| Left rule | 2 px CORAL | 0.6 mm CORAL |
| Inner padding | 32 px left, 24 px vertical | 6 mm left, 4 mm vertical |
| Quote font | Display Medium 48 px / 58 px | Display Medium 21 pt / 27 pt |
| Attribution | Inter 20 px / 28 px | Inter 8.5 pt / 11 pt |

- **Use:** rzeczywisty cytat albo wyróżniony excerpt.
- **Locked:** rule and padding locked; quote/attribution editable.
- **When not to use:** zwykła teza autora bez oznaczenia jej jako observation; cytat dłuższy niż 45 słów.

## C10 — Page Number / Progress

| PROPERTY | SOCIAL | A4 |
|---|---:|---:|
| Bounding box | 88 × 24 px | 18 × 4 mm |
| Font | IBM Plex Mono Medium 17 px | 7.5 pt |
| Format | `01 / 06` | `01 / 06` |
| Tracking | 7% | 6% |
| Color | MUTED TEXT / MUTED TEXT DARK | Same |

- **Use:** carousel i wielostronicowy PDF.
- **Locked:** position semi-locked; current/total editable.
- **When not to use:** pojedynczy social post lub jednostronicowy one-pager.

## C11 — Source / Note

| PROPERTY | SOCIAL | A4 |
|---|---:|---:|
| Max width | 526.67 px | 117.17 mm |
| Font | Inter Regular 17 px | Inter Regular 7.5 pt |
| Line height | 24 px | 10 pt |
| Color | MUTED TEXT / MUTED TEXT DARK | Same |

- **Use:** źródło danych, definicji, zdjęcia lub confidentiality note.
- **Locked:** style semi-locked; text editable.
- **When not to use:** jako miejsce na dodatkowe marketing copy.

## C12 — Footer Contact Line

| PROPERTY | SOCIAL | A4 |
|---|---:|---:|
| Bounding box | 920 × 52 px | 178 × 10 mm |
| Top divider | 920 × 1 px | 178 mm × 0.4 pt |
| Top padding | 20 px | 3.5 mm |
| Footer font | IBM Plex Mono 16 px | IBM Plex Mono 7.5 pt |
| Logo option | C01 at 176 × 30 px | C01 at 34 × 6 mm |

- **Use:** final carousel page, one-pager i case study.
- **Social content:** domena lub Insights path, bez pełnego adresu.
- **A4 content:** domena + e-mail; lokalizacja tylko jeśli potrzebna.
- **Locked:** divider and positions locked; URL/contact text semi-locked.
- **When not to use:** cover link-preview albo banner.

## C13 — Image Frame Set

| FRAME ID | SIZE | PRIMARY USE | DIRECTION |
|---|---:|---|---|
| `IMG-SOC-B-HORIZON` | 920 × 408 px | Portrait post image-led | B |
| `IMG-SOC-B-PANEL` | 448 × 550 px | Portrait split variant | B |
| `IMG-SOC-C-TALL` | 290.67 × 820 px | Insights / carousel cover | C |
| `IMG-SOC-C-PANEL` | 369.33 × 520 px | Editorial panel | C |
| `IMG-SOC-MATERIAL-STRIP` | 920 × 160 px | No-photo material accent | INSIGHTS |
| `IMG-LINK-C` | 426 × 515 px | 1200 × 627 Insights promo | C |
| `IMG-A4-B-TALL` | 56.33 × 105 mm | One-pager B variant | B |
| `IMG-A4-B-WIDE` | 178 × 50 mm | Alternative B horizon | B |
| `IMG-A4-CASE` | 56.33 × 72 mm | Case photo / C visual | C / approved photo |
| `IMG-A4-MATERIAL` | 56.33 × 72 mm | Case material system | INSIGHTS |

### Frame rules

- Frame mode: cover unless table in layout document says otherwise.
- Custom crop is mandatory for A/B/C.
- `contain` is reserved for diagrams, scanned documents or line art on an intentional background.
- Title never becomes part of the image.
- Image frames remain editable; dimensions and positions remain locked.
- Every imported visual gets alt-text / rights note in the publication brief, even though Canva export does not carry all metadata.

## C14 — Simple Diagram

| PROPERTY | SOCIAL | A4 |
|---|---:|---:|
| Max box | 605.33 × 300 px | 117.17 × 45 mm |
| Stroke | 2 px TEAL | 0.5 mm TEAL |
| Node | 10 px, one active node CORAL | 2 mm, one active node CORAL |
| Label | Inter 22 px / 30 px | Inter 8.5 pt / 11 pt |
| Gap | Minimum 32 px | Minimum 5 mm |

- **Use:** 2–4 kroki, zależność, prosta sekwencja.
- **Locked:** style locked; labels and node count editable within prepared variants.
- **When not to use:** duża mapa procesu, więcej niż pięć węzłów, pseudo-dashboard.

## C15 — Capability Block

| PROPERTY | SOCIAL | A4 |
|---|---:|---:|
| Standard box | 448 × 180 px | 86.75 × 38 mm |
| Top divider | Full width, 1 px | Full width, 0.4 pt |
| Label | Eyebrow or section marker | 7.5–8 pt mono |
| Heading | Display 30 px / 36 px | Display 12.5 pt / 14.5 pt |
| Body | Inter 22 px / 32 px | Inter 9.5 pt / 13 pt |

- **Use:** service / capability / case section.
- **Locked:** divider, internal padding and type styles locked; content editable.
- **When not to use:** wyłącznie jako dekoracyjna „card”; nie dodawać cienia i rounded corners.

## C16 — Key Takeaway

| PROPERTY | SOCIAL | A4 |
|---|---:|---:|
| Standard box | 920 × 180 px | 178 × 31 mm |
| Background | PAPER 2 or INK 2 | Same |
| Inner padding | 32 px | 6 mm |
| Marker | C06 | C06 |
| Heading | Display 30 px | Display 12 pt |
| Body | Inter 24 px / 34 px | Inter 9.5 pt / 13.5 pt |

- **Use:** jedna końcowa implikacja.
- **Locked:** container, padding, marker and type styles locked.
- **When not to use:** jako drugi summary block na tej samej stronie.

## 8. Image system implementation

### Direction A — Quiet Lighthouse

- Używać w Wave 1 tylko w wariancie personal / founder template 01, jeśli treść ma osobisty kontekst.
- Nie jest domyślnym obrazem template 01.
- Focal point: prawa górna trzecia część frame.
- Minimum 45% spokojnego pola.
- Overlay: 18–30% INK, tylko jeśli tekst znajduje się na obrazie.

### Direction B — Lighthouse & Horizon

- Primary visual dla image-led post i one-pagera.
- Horyzont powinien przebiegać poziomo; tolerancja maksymalnie 1°.
- Lighthouse / beacon: prawa trzecia część lub mały punkt po prawej.
- Overlay: 18–36% INK, gdy na obrazie jest tekst; zero overlay przy osobnym image panelu.
- Nie używać B jednocześnie w dwóch dominujących frame’ach.

### Direction C — Architectural Lighthouse

- Primary dla Insights i case study.
- Preferowany detal materiału lub konstrukcji.
- Zachować rzeczywiste piony.
- Focal safe area zależy od frame; nie umieszczać ważnego detalu pod tytułem.
- Overlay: 0% w osobnym panelu; 20–32% INK tylko dla full-bleed.

### Insights material system

Dozwolone materiały:

- vellum / translucent paper;
- graphite;
- matowy metal;
- warstwy dokumentów bez czytelnego tekstu;
- kontrolowana geometria;
- naturalny cień;
- pojedynczy coral signal dodany w Canva.

Niedozwolone:

- duże napisy wygenerowane w obrazie;
- sztuczne UI;
- neon;
- przypadkowe blueprint lines;
- dekoracyjne gradienty;
- udawane wykresy i dane.

## 9. Global editable text rules

| FIELD | IDEAL | MAXIMUM | ACTION IF LONGER |
|---|---:|---:|---|
| Eyebrow | 12–28 znaków | 40 znaków | Skrócić kategorię; nie zmniejszać fontu |
| Social headline | 24–54 znaki | 72 znaki | Użyć long tier albo carousel |
| Social subheadline | 60–110 znaków | 160 znaków | Skrócić do jednej implikacji |
| Carousel page heading | 18–45 znaków | 60 znaków | Podzielić na dwie strony |
| Carousel body | 160–280 znaków | 420 znaków | Dodać stronę, nie zmniejszać body |
| Article title | 35–75 znaków | 100 znaków | Użyć text-heavy cover; skrócić deck |
| Short deck | 80–150 znaków | 190 znaków | Redakcja; usunąć z link-preview |
| A4 title | 30–70 znaków | 100 znaków | Użyć 3 linii lub alternate no-image |
| A4 body block | 180–320 znaków | 420 znaków | Przenieść detal na drugą stronę |
| CTA | 10–20 znaków | 28 znaków | Skrócić do jednej czynności |
| Footer URL / contact | 18–42 znaki | 60 znaków | Usunąć elementy redundantne |

### Non-negotiable minimums

- Social headline: 60 px.
- Social body: 24 px.
- Social metadata: 16 px.
- A4 headline: 24 pt.
- A4 body: 9.5 pt.
- A4 metadata: 7.5 pt.

## 10. Canva master protection

### Before sharing a master

1. Nazwać stronę zgodnie z convention.
2. Zgrupować i zablokować background.
3. Zgrupować i zablokować dividers / signal.
4. Zablokować logo albo Insights signature.
5. Zablokować rozmiar i pozycję image frame; pozostawić edycję zawartości frame.
6. Ustawić text boxes na fixed width.
7. Wyłączyć automatyczne zmniejszanie tekstu, jeśli Canva je oferuje.
8. Dodać stronę `00_READ_ME_DO_NOT_EXPORT`.
9. Dodać `PL_STRESS_TEST` i `EN_STRESS_TEST`.
10. Sprawdzić export proof.

### Read-me page contents

- template ID;
- dozwolone zastosowania;
- dozwolone warianty;
- minimum font sizes;
- character limits;
- image direction;
- owner / approver;
- last review date;
- link do źródłowego systemu;
- eksport preset;
- informacja `DUPLICATE BEFORE EDITING`.

## 11. Naming and duplication

### Master names

- `W1-T01_LINKEDIN-PORTRAIT_1080x1350_MASTER`
- `W1-T02_CAROUSEL_1080x1350_MASTER`
- `W1-T03_INSIGHTS-PROMO_4x5-AND-1.91_MASTER`
- `W1-T04_ONE-PAGER_A4_MASTER`
- `W1-T05_CASE-STUDY_A4_MASTER`

### Page names inside masters

- `00_READ_ME`
- `01_BASE`
- `02_IMAGE_LED`
- `03_TEXT_LED`
- `04_NO_IMAGE`
- `90_PL_STRESS_TEST`
- `91_EN_STRESS_TEST`
- `99_EXPORT_REFERENCE`

Carousel uses:

- `01_COVER_C`
- `02_CONTENT_NARRATIVE`
- `03_CONTENT_LIST`
- `04_CONTENT_NUMBER`
- `05_CONTENT_DIAGRAM`
- `06_FINAL`

### Working copy

`[YYYY-MM-DD]_[CONTENT-SLUG]_[PL|EN]_[WORKING|REVIEW|APPROVED]`

## 12. Export quality checklist

- Canvas i dimensions poprawne.
- Brak elementów poza safe area.
- Brak widocznych guides i notes.
- Logo ma zatwierdzony kolor i clear space.
- Headline nie spadł poniżej minimum.
- Tylko jeden główny coral signal.
- Obraz ma właściwy direction i crop.
- Tytuł jest live text, nie częścią obrazu.
- Nie ma stockowego „corporate crisis”.
- Link i e-mail są poprawne.
- Numeracja carousel zgadza się z liczbą stron.
- Cytat i dane mają źródło.
- PL/EN zostały sprawdzone osobno.
- Social oceniony przy 25% zoom.
- PDF sprawdzony przy 100% i wydrukowany testowo, jeśli jest przeznaczony do druku.
- Eksport ma prawidłową nazwę i status.
