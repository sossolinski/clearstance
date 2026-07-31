# ClearStance Insights — raport deploymentu preview

## 1. Decyzja

**READY WITH MINOR NOTES**

Publiczne preview działa poprawnie, produkcyjny deployment nie został
zmieniony, a aktywny produkcyjny Worker nadal kieruje 100% ruchu na wersję
`e2b73674-b660-4a94-8808-4c85776a989e` w deploymencie
`d52d8c56-dd41-415d-94c3-1ba05d519043`.

Jedyna nota publikacyjna: osiem deklarowanych produkcyjnych URL-i `og:image`
zwraca 404, ponieważ nowe pliki nie zostały jeszcze opublikowane na produkcji.
Te same ścieżki na preview są 200, mają 1200 × 630 i są binarnie zgodne z
lokalnymi outputami. Jest to oczekiwany stan przed produkcją, a nie regresja
artefaktu.

**PRODUCTION DEPLOYMENT NOT EXECUTED**

## 2. Identyfikacja deploymentu

| Pole | Wartość |
|---|---|
| Data uploadu | 2026-07-31 09:41:44 UTC / 11:41:44 CEST |
| Typ | Cloudflare Workers Static Assets, nieaktywna wersja z Preview URL |
| Alias preview | https://insights-visual-review-clearstance.s-ossolinski.workers.dev |
| Versioned URL | https://e91c2252-clearstance.s-ossolinski.workers.dev |
| Worker | `clearstance` |
| Version ID | `e91c2252-3872-409c-be11-cb418c254e78` |
| Branch | `main`; bez commita i bez pushu |
| HEAD | `81ecb104d5489a1887bfd7989907b68b2ee5df11` |
| Stan źródła | istniejący, zaakceptowany dirty worktree z etapów wizualnych |
| Produkcyjna wersja przed i po | `e2b73674-b660-4a94-8808-4c85776a989e`, 100% |

Komenda uploadu:

```bash
npx wrangler versions upload \
  --preview-alias insights-visual-review \
  --message "Insights visual system review preview; source HEAD 81ecb104 with documented dirty worktree" \
  --keep-vars \
  --strict
```

`versions upload` utworzył wersję i URL preview, ale nie wykonał
`wrangler versions deploy`, nie zmienił routingu, domeny, DNS ani produkcyjnego
udziału ruchu.

## 3. Architektura i bezpieczeństwo preview

Projekt używa Astro 7.1.3 w trybie statycznym. `dist` jest publikowany przez
Cloudflare Worker z bindingiem `ASSETS`; kod Workera jest uruchamiany przed
assetami tylko dla `/api/*`. Produkcyjny workflow jest połączony z branchem
`main`, a ręczna komenda produkcyjna to `wrangler deploy` — nie została użyta.

Ochrona przed indeksacją została dodana wyłącznie do wygenerowanego artefaktu
preview:

- `dist/_headers`: `X-Robots-Tag: noindex, nofollow` (Cloudflare zwraca
  skuteczne `X-Robots-Tag: noindex`);
- preview `dist/robots.txt`: `User-agent: *` oraz `Disallow: /`;
- sitemap i każdy asset dziedziczą `X-Robots-Tag: noindex`;
- canonicale pozostają świadomie produkcyjne;
- nie zmieniono źródłowego `public/robots.txt`.

Przed przyszłą produkcją świeży `npm run build` musi usunąć preview-only
`dist/_headers` i odtworzyć produkcyjny `robots.txt` z katalogu `public`.

## 4. Baseline przed uploadem

| Kontrola | Wynik |
|---|---|
| Astro check | 72 pliki; 0 błędów, 0 ostrzeżeń, 0 hintów |
| TypeScript | zaliczony |
| Testy Workera kontaktu | 22/22 |
| Testy frontend/resolver/OG/JSON-LD | 16/16 |
| Łącznie | 38/38 |
| Content/CMS | 10 wpisów; 0 ostrzeżeń |
| Generator OG | 8 aktualnych; 0 wygenerowanych, 8 unchanged |
| Drugi przebieg OG | sumy SHA-256 bez zmian |
| Build | 21 stron |
| Opublikowane artykuły | 8 |
| Link checker | 22 pliki HTML; brak błędów |
| Dist contract | zaliczony |
| Worker dry-run | 128 assetów; zaliczony |
| Review/local/localhost w metadanych | brak |
| Review routes w `dist` | brak |
| Orphan OG | brak; dokładnie 8 plików, 150 726 B |
| `git diff --check` | czysto |

Logi negatywnych scenariuszy Turnstile w teście Workera są oczekiwanym
zachowaniem testów fail-closed, nie błędami baseline.

## 5. HTTP i trasy

Wszystkie trasy ogólne zwróciły 200:

| Trasa | Język | HTTP | Canonical |
|---|---|---:|---|
| `/` | PL | 200 | `https://clearstance.pl/` |
| `/en/` | EN | 200 | `https://clearstance.pl/en/` |
| `/insights/` | PL | 200 | `https://clearstance.pl/insights/` |
| `/en/insights/` | EN | 200 | `https://clearstance.pl/en/insights/` |
| `/o-clearstance/` | PL | 200 | `https://clearstance.pl/o-clearstance/` |
| `/en/about/` | EN | 200 | `https://clearstance.pl/en/about/` |
| `/kontakt/` | PL | 200 | `https://clearstance.pl/kontakt/` |
| `/en/contact/` | EN | 200 | `https://clearstance.pl/en/contact/` |

Pięć historycznych kandydatów tras review zwróciło 404:

- `/insights-visual-system/`;
- `/en/insights-visual-system/`;
- `/insights-visual-system-poc/`;
- `/en/insights-visual-system-poc/`;
- `/review/insights-visual-system/`.

Nie występują w sitemapie, opublikowanym HTML, nawigacji ani preloadach.

## 6. Artykuły i mapowanie motywów

| Artykuł | Język | Motyw | HTTP |
|---|---|---|---:|
| Co decyduje o wartości ćwiczenia kryzysowego | PL | `decision-route-checkpoints` | 200 |
| Kiedy zespół kryzysowy traci obraz sytuacji | PL | `situation-field-a` | 200 |
| Pierwsza godzina komunikacji kryzysowej | PL | `decision-route-outbound` | 200 |
| Plany ciągłości zawodzą na styku odpowiedzialności | PL | `interface-map-a` | 200 |
| What makes a crisis exercise useful | EN | `decision-route-checkpoints` | 200 |
| Business continuity fails at the interfaces | EN | `interface-map-a` | 200 |
| The first hour of crisis communication | EN | `decision-route-outbound` | 200 |
| When crisis teams lose situational awareness | EN | `situation-field-a` | 200 |

Dla wszystkich ośmiu potwierdzono tytuł, język, kategorię, datę, lead, link
powrotu, właściwy motyw, coral point, brak wariantów rezerwowych, brak
hydracji Astro, brak pustej kolumny i poprawne przejście hero → treść.

Desktop zachowuje copy po lewej, ilustrację po prawej i pionową regułę. Mobile
ma kolejność DOM: back link, kategoria, tytuł, lead, meta, ilustracja, treść.
Wartości CSS `order` wszystkich elementów wynoszą `0`; ilustracja nie jest
duplikowana. Fallback typograficzny pozostaje pokryty testem resolvera i nie
został publikowany jako fixture.

## 7. Indeksy Insights

Na desktopie ilustracje mają maksymalnie 32% szerokości rekordu (cel około
30%), tekst pozostaje dominujący, separatory są spójne i nie ma kart, cieni,
rounded corners, hover zoom ani CTA na ilustracjach. Automatycznie używane są
wyłącznie cztery aktywne motywy.

Na mobile kolejność to ilustracja, metadane, tytuł i lead. Przy 390, 375 i
320 px nie ma overflow, uciętego coral pointu ani nadmiernych pustych obszarów.
Home Insights PL/EN pozostaje bez ilustracji.

## 8. Open Graph

Każdy artykuł ma komplet `og:title`, `og:description`, `og:type=article`,
`og:url`, `og:image`, `og:image:width=1200`, `og:image:height=630`,
`twitter:card=summary_large_image`, Twitter title/description/image, canonical
i poprawny `lang`. Wszystkie canonicale, `og:url` i `og:image` są absolutnymi
URL-ami HTTPS domeny produkcyjnej; brak localhost i ścieżek lokalnych.

| Artykuł (slug) | Język | Motyw | Preview OG HTTP | Deklarowany prod OG | Wymiary | Rozmiar |
|---|---|---|---:|---:|---:|---:|
| `dobre-cwiczenie-kryzysowe-nie-jest-spektaklem` | PL | checkpoints | 200 | 404 | 1200×630 | 20 550 B |
| `kiedy-zespol-kryzysowy-traci-obraz-sytuacji` | PL | situation | 200 | 404 | 1200×630 | 19 508 B |
| `pierwsza-godzina-komunikacji-kryzysowej` | PL | outbound | 200 | 404 | 1200×630 | 18 650 B |
| `plany-ciaglosci-zawodza-na-styku-odpowiedzialnosci` | PL | interface | 200 | 404 | 1200×630 | 22 108 B |
| `a-good-crisis-exercise-is-not-a-performance` | EN | checkpoints | 200 | 404 | 1200×630 | 16 550 B |
| `business-continuity-fails-at-the-interfaces` | EN | interface | 200 | 404 | 1200×630 | 17 674 B |
| `the-first-hour-of-crisis-communication` | EN | outbound | 200 | 404 | 1200×630 | 16 000 B |
| `when-crisis-teams-lose-situational-awareness` | EN | situation | 200 | 404 | 1200×630 | 19 686 B |

Osiem plików pobrano z preview. Wszystkie sumy SHA-256 są identyczne z
lokalnym `dist`. Plansza `og-contact-sheet.png` została obejrzana ręcznie:
fonty, znaki PL, apostrofy, tytuły, logo, ilustracje, coral point i marginesy są
poprawne; brak overflow i uszkodzeń.

## 9. Cache i nagłówki

| Zasób | HTTP / MIME | Cache | ETag | CF | Encoding |
|---|---|---|---|---|---|
| indeks HTML | 200 `text/html` | `public, max-age=0, must-revalidate` | brak | HIT | br |
| artykuł HTML | 200 `text/html` | jw. | brak | HIT | br |
| SVG | 200 `image/svg+xml` | jw. | weak | HIT | br |
| OG | 200 `image/webp` | jw. | strong | HIT | brak |
| CSS | 200 `text/css` | jw. | weak | HIT | br |
| JS | 200 `text/javascript` | jw. | weak | HIT | br |
| Experience | 200 `image/avif` | jw. | strong | HIT | brak |
| sitemap | 200 `application/xml` | jw. | weak | HIT | br |
| robots | 200 `text/plain` | jw. | strong | HIT | brak |

`last-modified` nie występuje. Wszystkie powyższe odpowiedzi mają skuteczny
`X-Robots-Tag: noindex`. Brak CSP, X-Frame-Options, X-Content-Type-Options,
Referrer-Policy i Permissions-Policy jest stanem istniejącej globalnej
konfiguracji, nie regresją tego preview. Polityka OG wymusza rewalidację i nie
blokuje aktualizacji po zmianie tytułu; nie zmieniano cache.

## 10. CMS

- `/admin/`: 200;
- `/admin/config.yml`: 200 `text/yaml`;
- self-hosted Sveltia 0.173.0: 200 `text/javascript`;
- panel wyświetla „ClearStance Insights — Sign In with GitHub”;
- `visualTheme` jest opcjonalne w kolekcjach PL/EN;
- widoczne w YAML jest sześć wartości;
- hinty PL/EN są poprawne;
- `headerImage` i `socialImage` pozostają przed `visualTheme`;
- 10 istniejących wpisów bez pola przechodzi content/CMS contract bez ostrzeżeń.

Otwarcie konkretnego wpisu wymaga OAuth. Nie obchodzono logowania, nie
zapisano wpisu i nie utworzono commita CMS.

## 11. Responsive, przeglądarka i dostępność

- 112/112 audytów: 14 tras × 8 szerokości (1440, 1280, 1024, 900, 768,
  390, 375, 320);
- 0 overflow, 0 broken images, 0 failed requests, 0 console errors;
- 0 `astro-island`; mikroilustracje nie dodają runtime JS;
- skip link jest pierwszym fokusem;
- menu mobile otwiera się Space, blokuje tło, zamyka Escape i oddaje fokus;
- przełączenie języka klawiaturą prowadzi z PL na odpowiadający indeks EN;
- emulowana skala 200%: brak overflow i uszkodzonych obrazów;
- `prefers-reduced-motion: reduce` respektowane;
- DOM order artykułu poprawny, bez CSS-only reorder;
- canonical i OG obecne w rzeczywistym DOM.

## 12. Lighthouse na preview

| Profil | Perf. | A11y | BP | SEO | CLS | TBT | LCP | FCP | Transfer | Req. | HTML | JS |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Mobile indeks PL | 98 | 100 | 100 | 66 | 0 | 0 ms | 1105 ms | 1105 ms | 26 145 B | 9 | 5 181 B | 0 B |
| Mobile artykuł PL | 98 | 96 | 100 | 66 | 0 | 0 ms | 1540 ms | 1390 ms | 33 061 B | 10 | 10 709 B | 1 004 B |
| Mobile artykuł EN | 98 | 96 | 100 | 66 | 0 | 0 ms | 1540 ms | 1390 ms | 32 090 B | 10 | 9 780 B | 988 B |
| Desktop indeks PL | 100 | 100 | 100 | 66 | 0 | 0 ms | 398 ms | 398 ms | 26 518 B | 9 | 5 227 B | 0 B |
| Desktop artykuł PL | 100 | 93 | 100 | 66 | 0 | 0 ms | 407 ms | 407 ms | 33 018 B | 10 | 10 709 B | 996 B |

Różnica względem lokalnego baseline mobile (100 → 98 i LCP około 1,2 →
1,54 s dla artykułów) jest sieciowa i związana z zewnętrznym testem z
throttlingiem; CLS i TBT pozostają 0. SEO 66 jest oczekiwane dla noindex preview.
A11y 96 mobile to znany kontrast wydawcy. Desktop 93 został odtworzony lokalnie
1:1 i dodatkowo obejmuje istniejący `target-size`; nie jest regresją deployu.

## 13. Social validators

LinkedIn Post Inspector i Facebook Sharing Debugger wymagają interaktywnego
dostępu, a ich scrape podążyłby obecnie do produkcyjnego `og:image` zwracającego
404. Nie logowano się, nie opublikowano posta, nie wysłano treści na profil i
nie odświeżono cache żadnej platformy. Nie potwierdzono dostępnego oficjalnego
validatora kart X bez logowania. Lokalna i zewnętrzna walidacja HTML/obrazów
zastępuje ten krok do czasu produkcji.

Po produkcji należy sprawdzić w LinkedIn i Facebook po jednym URL-u PL i EN:

- właściwy tytuł;
- właściwy obraz;
- brak starego cache;
- proporcja 1.91:1 (1200 × 630);
- brak przycięcia tytułu.

## 14. Problemy i poprawki w iteracji preview

Nie znaleziono regresji produktu wymagającej ponownego uploadu preview.

Wykonano tylko poprawki narzędzi review:

1. walidator tekstu zaczął akceptować prawidłowo zakodowane HTML `&amp;`;
2. test natywnego `<summary>` używa Space zamiast błędnie emulowanego Enter;
3. zapisano jawnie status deklarowanych produkcyjnych OG (404 przed produkcją).

Preview-only `_headers` i `robots.txt` były częścią pierwszego i jedynego
uploadu. Nie wykonano redeployu, purge ani zmian globalnego cache.

## 15. Procedura przyszłego deploymentu produkcyjnego

**PRODUCTION DEPLOYMENT NOT EXECUTED**

1. Uzyskać jednoznaczną zgodę właściciela na produkcję.
2. Sprawdzić `git status --short`, branch i zakres wszystkich istniejących
   zmian; nie dodawać przypadkowych plików roboczych.
3. Na osobnym branchu review zacommitować wyłącznie zaakceptowany system
   wizualny, testy, generowane OG i dokumentację; wykonać push i PR.
4. Uruchomić `npm ci`, `npm run check`, `npm run typecheck`, oba zestawy testów,
   `npm run test:content`, generator OG dwukrotnie, `npm run build`, link checker,
   dist contract i Worker dry-run.
5. Potwierdzić 21 stron, 8 artykułów, 8 OG, czysty drugi przebieg generatora,
   brak review routes i lokalnych URL-i.
6. Wykonać świeży build i jawnie sprawdzić, że `dist/_headers` z noindex nie
   istnieje, a `dist/robots.txt` ponownie pozwala na indeksację i wskazuje
   produkcyjny sitemap.
7. Zmergować zatwierdzony PR do `main`. Ponieważ repo ma Cloudflare Workers
   Builds dla `main`, monitorować ten jeden automatyczny build/deploy i nie
   uruchamiać równolegle ręcznego deployu. Jeżeli Git integration jest
   świadomie wyłączone, użyć zamiast tego `npm run deploy:cloudflare`.
8. Zapisać nowy deployment ID/version ID i zachować poprzednią wersję
   `e2b73674-b660-4a94-8808-4c85776a989e` jako punkt rollbacku.
9. Sprawdzić Home, Insights PL/EN, wszystkie artykuły, About i Contact oraz
   brak błędów `/api/*`; nie zmieniać DNS.
10. Sprawdzić wszystkie osiem produkcyjnych `og:image`: 200, `image/webp`,
    1200 × 630, właściwy hash/język/motyw.
11. Sprawdzić canonical, hreflang, sitemap, robots, Cloudflare cache status i
    brak `X-Robots-Tag: noindex` na produkcji.
12. Użyć LinkedIn Post Inspector oraz Facebook Sharing Debugger dla jednego
    artykułu PL i EN; udokumentować realny scrape/cache refresh.
13. Monitorować przez 30 minut: statusy 4xx/5xx, Worker logs dla `/api/*`,
    broken assets, formularz (bez nieuzgodnionego wysyłania maili), Core Web
    Vitals i social cards po 0, 5, 15 i 30 minutach.
14. W razie regresji zastosować poniższy rollback; nie purge'ować cache bez
    konkretnej diagnozy.

## 16. Plan rollbacku

Nie wykonano rollbacku testowego.

1. Odczytać deploymenty: `npx wrangler deployments list --json`.
2. Potwierdzić, że wersja sprzed przyszłej publikacji to
   `e2b73674-b660-4a94-8808-4c85776a989e` (lub zapisana wersja bezpośrednio
   sprzed właściwego deployu, jeśli w międzyczasie pojawi się inny release).
3. W dashboardzie Workers → `clearstance` → Deployments wybrać tę wersję albo
   uruchomić:

   ```bash
   npx wrangler rollback e2b73674-b660-4a94-8808-4c85776a989e \
     --message "Rollback after ClearStance production verification"
   ```

4. Rollback natychmiast tworzy nowy aktywny deployment tej wersji; bindingi i
   zasoby Cloudflare nie są cofane. Nie wymaga zmiany DNS.
5. Zakładany czas techniczny: 1–5 minut plus 10–15 minut weryfikacji.
6. Zweryfikować Home, Insights PL/EN, artykuł PL/EN, Contact API, sitemap,
   robots, canonical, assets i statusy Cloudflare; potwierdzić 100% ruchu na
   przywróconej wersji w `deployments list`.
7. Nie usuwać wadliwej wersji i nie wykonywać purge produkcji; zachować logi i
   identyfikatory do analizy.

Cloudflare przechowuje do 100 ostatnich wersji możliwych do rollbacku. Rollback
może być zablokowany, jeśli powiązane zasoby platformy zostały usunięte lub
zmienione; ten release nie wprowadza takich migracji.

## 17. Artefakty review

Katalog: `docs/review/deployment-preview/`

- 13 screenshotów indeksów i artykułów z publicznego preview;
- plansza ośmiu OG;
- screenshot ekranu logowania CMS;
- screenshoty metadanych PL/EN z odpowiedzi preview;
- screenshot nagłówków sieciowych;
- osiem pobranych OG;
- pełne JSON-y HTTP, przeglądarki, interakcji i Lighthouse.

Szczegółowa lista znajduje się w `docs/review/deployment-preview/README.md`.

**PRODUCTION DEPLOYMENT NOT EXECUTED**
