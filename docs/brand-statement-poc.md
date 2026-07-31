# Statement marki ClearStance

Status: **wariant A zaakceptowany i wdrożony na produkcyjnym Home PL/EN**.

Data decyzji i wdrożenia: 30 lipca 2026.

## 1. Decyzja

Do wdrożenia wybrano wariant A1: poziomą sekwencję czterech ikon Iconoir na desktopie oraz siatkę 2 × 2 na mobile. Wariant B z autorskim mikrodiagramem został odrzucony.

Kontaktowy statement bez fotografii został zaakceptowany bez zmian.

## 2. Zakres produkcyjny

Nowy komponent produkcyjny:

- `src/components/sections/BrandStatement.astro`.

Komponent jest używany na Home PL i EN. Zachowuje dotychczasowy tekst statementu, ciemne tło i kolejność sekcji. Nie zawiera fotografii, `<picture>`, overlayu, CTA, kart, hoverów ani animacji specyficznych dla ikon.

Sekcja Contact pozostaje typograficznym dark bandem z tekstami „ClearStance” oraz „Clarity when it matters most.”, subtelną linią i jednym coral point.

Hero, header, Experience, Insights, pozostałe sekcje Home oraz marketing copy nie zostały zmienione w tym etapie.

## 3. Wariant A — implementacja

Sekwencja pojęć:

| Pojęcie | Iconoir |
| --- | --- |
| Role | `group` |
| Przepływ informacji | `data-transfer-both` |
| Decyzje | `check-circle` |
| Eskalacja | `arrow-separate-vertical` |

Ikony:

- są importowane statycznie i selektywnie przez allowlistę;
- są renderowane jako inline SVG przez `Icon.astro`;
- zachowują oryginalny `viewBox`;
- używają `currentColor`;
- są dekoracyjne (`aria-hidden="true"` i `focusable="false"`);
- nie dodają JavaScriptu, hydratacji, Reacta ani icon fontu.

Widoczne labelki HTML przenoszą znaczenie. Uporządkowana lista ma lokalizowaną nazwę dostępną opisującą relację między pojęciami. Coral występuje raz, jako statyczny punkt progu eskalacji.

## 4. Responsywność

Układ:

- 1440–768 px: cztery elementy w jednym poziomym ciągu;
- 390–320 px: siatka 2 × 2.

Zmierzona wysokość sekcji:

| Szerokość | Home PL | Home EN |
| --- | ---: | ---: |
| 1440 px | 436 px | 496 px |
| 1280 px | 421 px | 476 px |
| 1024 px | 391 px | 391 px |
| 768 px | 443 px | 547 px |
| 390 px | 494 px | 531 px |
| 375 px | 494 px | 531 px |
| 320 px | 567 px | 603 px |

Różnice wynikają wyłącznie z długości zaakceptowanych tekstów PL/EN i ich łamania. Nie występuje poziomy overflow ani kolizja labeli.

## 5. Wariant B — odrzucona historia projektowa

Wariant B przedstawiał jedną relację:

`role → przepływ informacji → decyzja → próg eskalacji → wyższy poziom`.

Prototyp używał autorskiego dekoracyjnego inline SVG z trzema wejściowymi węzłami ról, ramą decyzji, pionowym progiem eskalacji i jednym coral point. Towarzyszyła mu uporządkowana lista prawdziwych labeli HTML. Nie używał JavaScriptu ani animacji.

Wariant został odrzucony wizualnie i nie będzie rozwijany. Jego screenshoty pozostają wyłącznie zapisem procesu decyzyjnego.

## 6. Cleanup wariantu B i tras review

Wariant B został usunięty z aktywnego kodu. Usunięto:

- autorski inline SVG mikrodiagramu;
- klasy i style diagramu;
- logikę wyboru wariantu;
- komponenty przeznaczone wyłącznie do review;
- cztery trasy review.

Usunięte trasy:

- `/review/brand-statement-a/`;
- `/review/brand-statement-b/`;
- `/en/review/brand-statement-a/`;
- `/en/review/brand-statement-b/`.

Trasy zwracają 404, nie są generowane w `dist` i nie występują w sitemapie. Historyczne screenshoty A i B pozostają w dokumentacji review; katalog wariantu B jest oznaczony jako odrzucony materiał historyczny.

## 7. Stare assety `brand-statement.*`

Status po kontrolowanym cleanupie z 31 lipca 2026: fotografia została wycofana, a pełna rodzina plików usunięta z repozytorium:

- `public/images/brand-statement.jpg` — 145 343 B;
- `public/images/brand-statement.webp` — 46 344 B;
- `public/images/brand-statement-1440.webp` — 28 210 B;
- `public/images/brand-statement-960.webp` — 14 008 B;
- `public/images/brand-statement-640.webp` — 6 714 B.

Łącznie usunięto 240 619 B. Home korzysta z produkcyjnego wariantu ikonowego, a Contact z typograficznego dark bandu. W wygenerowanym HTML nie ma `src`, `srcset`, `<picture>`, altu ani overlayu powiązanego z wycofanymi plikami i przeglądarka nie wysyła do nich requestów.

Usunięto także ich obsługę z `scripts/optimize-images.mjs` oraz przeniesiono wpis licencyjny do sekcji retired assets. Pozostałe wzmianki są wyłącznie historyczne:

- niniejszy opis decyzji;
- historyczne audyty i plany;
- README oraz screenshoty review.

## 8. Dostępność i wydajność

Sprawdzono Home PL/EN oraz Contact PL/EN przy 1440, 1280, 1024, 768, 390, 375 i 320 px:

- brak poziomego overflow;
- brak błędów konsoli i odpowiedzi HTTP 4xx/5xx dla zasobów stron;
- skip link jest pierwszym celem klawiatury;
- kolejność DOM i labeli odpowiada kolejności wizualnej;
- ikony dekoracyjne nie dublują accessible name;
- `prefers-reduced-motion` działa;
- ekwiwalent 200% page zoom nie powoduje poziomego overflow;
- brak requestów `brand-statement.*`.

Lighthouse mobile:

| Trasa | Performance | Accessibility | Best Practices | SEO | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 100 | 100 | 100 | 100 | 0 | 0 ms |
| Contact | 100 | 100 | 100 | 100 | 0 | 0 ms |

## 9. Build i testy

- Astro check: 0 błędów, 0 ostrzeżeń, 0 hintów;
- TypeScript: zaliczony;
- build: 21 stron;
- testy automatyczne: 28/28;
- link checker: 22 wygenerowane pliki HTML, brak błędnych linków;
- kontrakty dist i content: zaliczone;
- sitemap: bez tras `/review/`.

Pełna lista finalnych screenshotów znajduje się w [`docs/review/brand-statement/README.md`](review/brand-statement/README.md).
