# Produkcyjne wdrożenie systemu wizualnego Insights

Data: 31 lipca 2026
Status: wdrożone w produkcyjnym kodzie i buildzie

## 1. Zakres

System został podłączony do:

- indeksu Insights PL i EN;
- wszystkich ośmiu opublikowanych artykułów;
- teaserów powiązanych materiałów;
- metadanych Open Graph, Twitter Card i Article structured data;
- Astro content schema;
- obu kolekcji Sveltia CMS;
- produkcyjnego pipeline buildowego.

Home Insights pozostał bez ilustracji. Nie zmieniono treści, tytułów, leadów, dat, kategorii, slugów, tagów ani par językowych.

## 2. Motywy

Pełna allowlista:

- `situation-field-a`;
- `situation-field-b`;
- `decision-route-outbound`;
- `decision-route-checkpoints`;
- `interface-map-a`;
- `interface-map-b`.

Automatyczne mapowanie wykorzystuje wyłącznie:

| Neutralny obszar | Produkcyjny wariant |
| --- | --- |
| `crisis-management` | `situation-field-a` |
| `crisis-communication` | `decision-route-outbound` |
| `exercises-and-simulations` | `decision-route-checkpoints` |
| `business-continuity` | `interface-map-a` |

`situation-field-b` i `interface-map-b` pozostają rezerwowe i można je wybrać wyłącznie jawnie przez `visualTheme`. Audyt `dist` i przeglądarki potwierdza, że nie zostały automatycznie przypisane.

## 3. Resolver

`src/lib/insight-visual-theme.ts` jest jednym źródłem prawdy dla typów, aliasów kategorii i priorytetów:

1. ręczny `headerImage`;
2. poprawny `visualTheme`;
3. jawne mapowanie pełnej wartości kategorii na neutralny klucz;
4. celowy fallback typograficzny bez pustego kontenera.

Dopasowanie kategorii nie korzysta z fragmentów słów. Wszystkie obecne etykiety PL/EN, w tym trzy warianty nazwy obszaru ćwiczeń, są mapowane jawnie.

## 4. Schema i CMS

Do `insightSchema` dodano opcjonalny enum `visualTheme`. Ten sam opcjonalny select i sześć wartości dodano do kolekcji `insights_pl` i `insights_en` w Sveltia.

Content contract sprawdza:

- zgodność pól schema i obu kolekcji;
- widget `select`;
- opcjonalność;
- identyczny komplet i kolejność dozwolonych wartości.

Nie dodano `visualTheme` do istniejącego frontmatter. Obecne wpisy korzystają z jawnego mapowania kategorii, a ręczny wybór pozostaje narzędziem dla przyszłych wyjątków.

## 5. Indeks Insights

`InsightTeaser.astro` rozstrzyga jeden z trzech stanów:

- ręczny obraz;
- mikroilustracja;
- układ typograficzny.

Desktop:

- lista editorial pozostała bez kart, cieni i zaokrągleń;
- ilustracja ma 30% szerokości rekordu przy 1024 i 1440 px;
- tekst zachowuje dominującą hierarchię.

Mobile:

1. ilustracja;
2. metadane;
3. tytuł;
4. lead;
5. link.

Każdy kadr ma proporcję 3:2. Ilustracje są dekoracyjne i nie dublują accessible name teasera.

## 6. Nagłówek artykułu

Na desktopie nagłówek wykorzystuje dwie kolumny: treść po lewej, mikroilustrację po prawej i subtelną pionową regułę. Skala tytułu pozostaje nadrzędna.

Przy szerokości do 900 px układ przechodzi do jednej kolumny. Na mobile kolejność jest zgodna z decyzją:

1. link powrotu;
2. kategoria;
3. tytuł;
4. lead;
5. metadane;
6. ilustracja;
7. treść artykułu.

Jeżeli redakcja ustawi `headerImage`, zachowany zostaje dotychczasowy render ręcznego obrazu, ponieważ ma on pierwszeństwo przed mikroilustracją.

## 7. Open Graph

`scripts/generate-insight-og.mjs`:

- czyta wszystkie opublikowane wpisy PL/EN;
- korzysta z tego samego resolvera i źródłowych symboli SVG;
- generuje WebP 1200 × 630;
- umieszcza lokalny tytuł, kategorię, datę, logo i właściwy motyw;
- aktualizuje tylko zmienione pliki;
- usuwa wyłącznie nieaktualne `.webp` z dedykowanych katalogów `public/images/insights/og/pl` i `en`;
- sprawdza wymiary każdego outputu.

Generator jest uruchamiany przed `astro dev` i `astro build`. Drugi przebieg zakończył się wynikiem `0 generated, 8 unchanged`, potwierdzając deterministyczność.

Wygenerowano osiem plików o łącznym rozmiarze 150 726 B. Każdy artykuł używa własnej ścieżki:

`/images/insights/og/{locale}/{slug}.webp`

Jawny `socialImage` pozostaje nadrzędnym wyjątkiem redakcyjnym. Domyślny artykuł nie wraca już do wspólnego, neutralnego OG.

## 8. Dostępność i wydajność

- SVG pozostają bez tekstu, fontów, gradientów, filtrów, cieni, animacji i JavaScriptu;
- `InsightVisual.astro` przyjmuje tylko typowaną allowlistę;
- wszystkie produkcyjne instancje są dekoracyjne;
- źródła są współdzielone jako trzy małe pliki SVG: 2 299 B, 2 341 B i 2 355 B;
- brak Astro islands i hydracji;
- proporcje i viewBox zapobiegają CLS;
- Home Insights nie importuje ani nie renderuje ilustracji.

## 9. Walidacja

### Techniczna

- Astro check: 0 błędów, 0 ostrzeżeń, 0 hintów;
- TypeScript: zaliczony;
- content/CMS contract: 10 wpisów, 0 ostrzeżeń;
- testy resolvera, social image i front-endu: 16/16;
- testy kontaktu: 22/22;
- build: 21 stron;
- link checker: 22 pliki HTML;
- dist contract: zaliczony, w tym osiem artykułów, osiem OG i zakaz automatycznych wariantów rezerwowych;
- Cloudflare Worker dry-run: zaliczony.

### Przeglądarkowa

Sprawdzono 60 kombinacji:

- indeks PL/EN;
- wszystkie cztery artykuły PL i EN;
- kontrolnie Home PL/EN;
- szerokości 1440, 1024, 768, 390 i 320 px.

Wynik 60/60:

- brak poziomego overflow;
- brak uszkodzonych obrazów;
- brak 4xx/5xx i failed requests;
- brak błędów konsoli;
- brak pustych symboli `<use>`;
- brak hydracji;
- skip link pierwszy w kolejności fokusu;
- poprawna kolejność mobile;
- 30% szerokości ilustracji na desktopie;
- proporcja 3:2;
- brak ilustracji w Home Insights.

### Lighthouse mobile

| Widok | Performance | Accessibility | Best Practices | SEO | CLS | TBT | LCP |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Index PL | 100 | 100 | 100 | 100 | 0 | 0 ms | 1203 ms |
| Index EN | 100 | 100 | 100 | 100 | 0 | 0 ms | 1203 ms |
| Article PL | 100 | 96 | 100 | 100 | 0 | 0 ms | 1203 ms |
| Article EN | 100 | 96 | 100 | 100 | 0 | 0 ms | 1204 ms |

Jedyny punkt Lighthouse w artykułach dotyczy istniejącego wcześniej kontrastu `.eyebrow--teal` w sekcji wydawcy (`#91aaa5` na `#f2eee7`). Nie jest związany z systemem ilustracji i nie został zmieniony, zgodnie z zakresem zadania.

## 10. Materiały końcowe

`docs/review/insights-visual-system/final/` zawiera:

- 20 screenshotów indeksów i wszystkich artykułów PL/EN przy 1440 i 390 px;
- `validation-report.json` z pełnym audytem.

Historyczne screenshoty POC pozostają w `docs/review/insights-visual-system/screenshots/`.

## 11. Cleanup POC

Nie istniały produkcyjne trasy review. Usunięto samodzielny `review.html` oraz jego stary generator. Zachowano:

- dokumentację POC;
- screenshoty POC;
- trzy zaakceptowane źródła SVG;
- komponent `InsightVisual.astro`;
- resolver i testy, ponieważ stały się elementami produkcyjnymi.
