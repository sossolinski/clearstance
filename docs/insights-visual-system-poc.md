# POC systemu wizualnego ClearStance Insights

Data: 31 lipca 2026
Status: historyczny materiał review. System został następnie wdrożony produkcyjnie; aktualny stan opisuje `docs/insights-visual-system-production.md`.

## 1. Zakres i granice

POC wprowadza trzy źródłowe mikroilustracje editorial, po dwa kontrolowane warianty każdej, bez JavaScriptu klienta, losowości, animacji i nowych zależności:

- `situation-field`;
- `decision-route`;
- `interface-map`.

System jest pokazany w izolowanym indeksie PL/EN, nagłówku przykładowego artykułu PL/EN i kompozycji Open Graph 1200 × 630 PL/EN. Aktywne komponenty `InsightsPage.astro`, `InsightTeaser.astro`, `HomeInsightTeaser.astro` i `ArticleLayout.astro`, opublikowane treści, schema oraz konfiguracja CMS nie zostały zmienione.

## 2. Baseline techniczny

Przed POC:

- Astro check: 0 błędów, 0 ostrzeżeń, 0 hintów;
- TypeScript: zaliczony;
- content/CMS contract: 10 wpisów, 0 ostrzeżeń;
- testy Node: 28/28;
- production build: 21 stron;
- dist contract: zaliczony;
- link checker: 22 pliki HTML, brak błędnych linków.

Worktree zawierał wcześniejsze, zaakceptowane zmiany. Nie wykonano resetu ani checkoutu.

## 3. Inwentaryzacja opublikowanych treści

Żaden opublikowany wpis nie ma obecnie `headerImage`, `headerImageAlt` ani `socialImage`. Wszystkie cztery wpisy PL mają parę EN przez `translationKey`.

| Tytuł | Język | Kategoria | Data | Header image | Social image | Para językowa | Proponowany motyw |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Kiedy zespół kryzysowy traci obraz sytuacji | PL | `Crisis Management` | 2026-07-21 | brak | brak | `crisis-situational-awareness` / EN | `situation-field` |
| Pierwsza godzina komunikacji kryzysowej | PL | `Crisis Communication` | 2026-07-16 | brak | brak | `first-hour-crisis-communication` / EN | `decision-route-outbound` |
| Co decyduje o wartości ćwiczenia kryzysowego | PL | `Exercises & Simulations` | 2026-07-10 | brak | brak | `crisis-exercises-performance` / EN | `decision-route-checkpoints` |
| Plany ciągłości zawodzą na styku odpowiedzialności | PL | `Business Continuity` | 2026-07-04 | brak | brak | `continuity-at-interfaces` / EN | `interface-map` |
| When crisis teams lose situational awareness | EN | `Crisis Management` | 2026-07-21 | brak | brak | `crisis-situational-awareness` / PL | `situation-field` |
| The first hour of crisis communication | EN | `Crisis Communication` | 2026-07-16 | brak | brak | `first-hour-crisis-communication` / PL | `decision-route-outbound` |
| What makes a crisis exercise useful | EN | `Exercises & Simulations` | 2026-07-10 | brak | brak | `crisis-exercises-performance` / PL | `decision-route-checkpoints` |
| Business continuity fails at the interfaces | EN | `Business Continuity` | 2026-07-04 | brak | brak | `continuity-at-interfaces` / PL | `interface-map` |

### Szkice poza publikacją

Dwa sparowane szkice `crisis-exercise-design` pozostają poza publicznym indeksem:

- PL: kategoria `Ćwiczenia i symulacje`;
- EN: kategoria `Exercises and simulations`.

Nie zmieniono tych wartości. Pokazują one, dlaczego przyszła logika nie powinna polegać na literalnej nazwie kategorii.

### Istniejący katalog obrazów

`public/images/insights/screenshot-2026-07-26-at-11-30-23.webp` jest jedynym istniejącym plikiem w katalogu Insights (152 416 B). Nie ma referencji w frontmatter ani aktywnym renderze. POC go nie usuwa i nie wykorzystuje.

## 4. Neutralna taksonomia

Jawne mapowanie pełnych wartości kategorii:

| Wartości redakcyjne | Neutralny klucz | Motyw |
| --- | --- | --- |
| `Crisis Management` | `crisis-management` | `situation-field` |
| `Crisis Communication` | `crisis-communication` | `decision-route-outbound` |
| `Exercises & Simulations`, `Exercises and simulations`, `Ćwiczenia i symulacje` | `exercises-and-simulations` | `decision-route-checkpoints` |
| `Business Continuity` | `business-continuity` | `interface-map` |

`getInsightCategoryKey()` normalizuje wyłącznie wielkość liter i zewnętrzne białe znaki, a potem wymaga zgodności całej jawnie zapisanej wartości. `Crisis` ani `Advanced Crisis Management` nie są dopasowywane.

Niejednoznaczność redakcyjna: obecne kategorie PL są częściowo angielskie. POC nie proponuje ich automatycznej migracji; neutralny klucz izoluje system wizualny od tej niespójności.

## 5. Mikroilustracje

Źródła:

- `src/assets/visuals/insights/situation-field.svg`;
- `src/assets/visuals/insights/decision-route.svg`;
- `src/assets/visuals/insights/interface-map.svg`.

Każde źródło ma viewBox `320 220`, zawiera dwa jawne `<symbol>` i ma domyślny `<use>`, dzięki czemu pozostaje samodzielnie podglądalne.

| Wariant | Różnica kontrolowana | Zastosowanie POC |
| --- | --- | --- |
| `situation-field-a` | centralny kadr, signal w prawym górnym obszarze | indeks i OG |
| `situation-field-b` | przesunięte ramy, signal po lewej | nagłówek artykułu |
| `decision-route-outbound` | łagodna trasa z jednym rozgałęzieniem | komunikacja kryzysowa |
| `decision-route-checkpoints` | sekwencja progów i ograniczone odgałęzienie | ćwiczenia |
| `interface-map-a` | granica centralna, handover lewo → prawo | ciągłość działania |
| `interface-map-b` | przesunięta granica, handover wsteczny | wariant review |

Wspólne reguły:

- stroke 1,25–1,4 px;
- `round` linecap i linejoin;
- dwa poziomy opacity;
- jeden coral point;
- brak gradientów, cieni, glow, tekstur, pseudo-tekstu i animacji;
- kolory przez cztery kontrolowane CSS custom properties;
- ta sama geometria działa na tle paper i ink.

## 6. Komponent Astro

`src/components/insights/InsightVisual.astro`:

- przyjmuje wyłącznie wariant z typowanej allowlisty;
- importuje statycznie trzy źródła jako URL-e Vite;
- renderuje inline `<svg>` z zewnętrznym `<use>`;
- nie generuje JavaScriptu ani hydracji;
- domyślnie jest dekoracyjny;
- przy użyciu informacyjnym wymaga jawnego `label`;
- zachowuje viewBox `320 220`;
- nie przyjmuje dowolnej ścieżki ani surowego SVG.

Komponent nie jest importowany przez aktywne strony.

## 7. Resolver i fallback

`src/lib/insight-visual-theme.ts` implementuje:

1. niepusty `headerImage` → ręcznie przypisany obraz;
2. poprawny jawny `visualTheme` → mikroilustracja;
3. neutralny `categoryKey` → jawne mapowanie motywu;
4. brak rozstrzygnięcia → fallback typograficzny bez pustej ramki.

Niepoprawna opcjonalna wartość `visualTheme` nie powoduje przypadkowego renderu: resolver przechodzi do neutralnej kategorii albo typografii. Testy pokrywają priorytety, pełne aliasy, wartości niepoprawne i deterministyczne warianty bazowe.

## 8. Propozycja pola CMS — bez wdrożenia

Docelowo analogiczne pole należałoby dodać do obu kolekcji Sveltia:

```yaml
- label: Motyw wizualny
  name: visualTheme
  widget: select
  required: false
  options:
    - situation-field
    - decision-route-outbound
    - decision-route-checkpoints
    - interface-map
```

W kolekcji EN etykieta powinna brzmieć `Visual theme`. To pole nie zostało dodane do `public/admin/config.yml`, produkcyjnego schema ani frontmatter.

Przyszłe wdrożenie wymaga jednego spójnego kroku:

1. dodać opcjonalny enum do `insightSchema`;
2. dodać pole select PL/EN w Sveltia;
3. rozszerzyć content contract;
4. w adapterze widoku wyliczyć neutralny `categoryKey`;
5. podłączyć `InsightVisual` wyłącznie do indeksu i nagłówka artykułu;
6. pozostawić Home Insights bez zmian, dopóki nie zostanie osobno zaakceptowany.

## 9. Open Graph

POC pokazuje kompozycję 1200 × 630 z tym samym motywem, tytułem, kategorią i datą co artykuł. Screenshot jest materiałem review, nie produkcyjnym `socialImage`.

Przyszła rekomendowana kolejność social:

1. ręcznie ustawiony `socialImage`;
2. deterministycznie wygenerowany raster 1200 × 630 dla rozstrzygniętego motywu;
3. istniejący `headerImage`, jeśli redakcja chce zachować fotografię;
4. obecny globalny `/social/clearstance-og.webp`.

SVG nie powinien być publikowany bezpośrednio jako `og:image`. Obecny Sharp może w przyszłym, osobno zatwierdzonym etapie deterministycznie wygenerować WebP lub PNG bez nowej biblioteki.

## 10. Dostępność i wydajność

- mikroilustracja przy teaserze jest dekoracyjna, ponieważ tytuł i opis niosą pełną informację;
- nagłówek artykułu nie powinien dublować accessible name;
- ręczny `headerImage` nadal wymaga opisowego `headerImageAlt`;
- brak JS klienta i hydracji;
- trzy źródła SVG są współdzielone zamiast duplikowania osobnej grafiki dla artykułu;
- jawne viewBox i proporcje zapobiegają zmianom layoutu;
- fallback typograficzny nie renderuje pustego kontenera.

## 11. Materiały review i walidacja

Źródłem review był samodzielny `docs/review/insights-visual-system/review.html`. Został usunięty po wdrożeniu produkcyjnym; wygenerowane screenshoty pozostają w repozytorium.

Historyczny generator `scripts/review-insights-visuals.mjs` przygotował 11 screenshotów, a następnie został zastąpiony produkcyjnym skryptem walidacyjnym:

- plansza sześciu wariantów;
- indeks PL/EN przy 1440 i 390 px;
- nagłówek artykułu PL/EN przy 1440 i 390 px;
- Open Graph PL/EN 1200 × 630.

Walidacja screenshotów:

- wszystkie 20 instancji `<use>` mają niezerową geometrię;
- brak poziomego overflow izolowanych widoków;
- brak błędów konsoli;
- brak failed requests;
- wynik generatora jest deterministyczny w zakresie układu i doboru motywu.

## 12. Decyzje do review

Przed produkcyjnym wdrożeniem należy zaakceptować:

1. język trzech motywów i maksymalnie dwóch wariantów;
2. układ indeksu: grafika po prawej na desktopie i przed tekstem na mobile;
3. użycie większego motywu w ciemnym nagłówku artykułu;
4. kompozycję Open Graph;
5. pole `visualTheme` i jawne aliasy kategorii;
6. przyszłą kolejność fallbacku social.

Do czasu tej decyzji produkcyjny Insights pozostaje bez zmian.

## 13. Walidacja końcowa

- źródła SVG: poprawny XML; brak gradientów, filtrów, animacji i losowości;
- Astro check: 0 błędów, 0 ostrzeżeń, 0 hintów;
- TypeScript: zaliczony;
- content/CMS contract: 10 wpisów, 0 ostrzeżeń;
- testy Node: 34/34, w tym 6 nowych testów resolvera;
- production build: 21 stron, czyli bez nowych tras review;
- dist contract: zaliczony;
- link checker: 22 pliki HTML, brak błędnych linków;
- Cloudflare Worker dry-run: zaliczony;
- `dist`: brak nazw motywów, komponentu POC i assetów review;
- aktywne pliki Insights, schema, CMS i frontmatter: bez zmian.
