# Cleanup wycofanych assetów obrazu

Data cleanupu: 31 lipca 2026.

## 1. Cel i zakres

Kontrolowany cleanup objął wyłącznie dwie wcześniej zaakceptowane, nieużywane rodziny:

- `brand-statement.*`;
- `operational-briefing.*`.

Nie zmieniono layoutów, copy, routingu, CMS, CSS aktywnych komponentów ani systemu ikon. Zachowano fotografie i warianty hero, mastery i outputy Experience, Open Graph, Insights, favicony, logotypy, assety usług oraz wszystkie screenshoty dokumentacyjne.

## 2. Baseline

Przed usunięciem:

- worktree zawierał wcześniejsze, zaakceptowane zmiany użytkownika; nie wykonano resetu ani checkoutu;
- Astro check: 0 błędów, 0 ostrzeżeń, 0 hintów;
- TypeScript: zaliczony;
- build: 21 stron;
- testy Node: 28/28;
- content/CMS contract: 10 wpisów, 0 ostrzeżeń;
- link checker: 22 pliki HTML, brak błędnych linków;
- dist contract i Worker dry-run: zaliczone;
- `dist`: 97 plików, w tym 60 obrazów;
- dokładny rozmiar plików `dist`: 10 160 827 B;
- rozmiar dyskowy raportowany przez `du`: 11 264 KiB.

Baseline nie zawierał problemów funkcjonalnych. Logi testów Turnstile dotyczą oczekiwanych testów ścieżek negatywnych. Wrangler informował jedynie o dostępnej nowszej wersji CLI.

## 3. Inwentaryzacja i decyzje

| Rodzina | Plik | Lokalizacja przed cleanupem | Referencje aktywne przed cleanupem | Referencje historyczne | Decyzja |
| --- | --- | --- | --- | --- | --- |
| Brand Statement | `brand-statement.jpg` | `public/images/` | tylko martwy wpis pipeline | audyty, POC, licencje | usunięty |
| Brand Statement | `brand-statement.webp` | `public/images/` | tylko martwy wpis pipeline | audyty, POC, licencje | usunięty |
| Brand Statement | `brand-statement-640.webp` | `public/images/` | generowany przez martwy wpis pipeline | audyty, POC | usunięty |
| Brand Statement | `brand-statement-960.webp` | `public/images/` | generowany przez martwy wpis pipeline | audyty, POC | usunięty |
| Brand Statement | `brand-statement-1440.webp` | `public/images/` | generowany przez martwy wpis pipeline | audyty, POC | usunięty |
| Operational Briefing | `operational-briefing.jpg` | `public/images/` | tylko martwy wpis pipeline | audyty, POC, licencje | usunięty |
| Operational Briefing | `operational-briefing.webp` | `public/images/` | tylko martwy wpis pipeline | audyty, POC, licencje | usunięty |
| Operational Briefing | `operational-briefing-640.webp` | `public/images/` | generowany przez martwy wpis pipeline | audyty, POC | usunięty |
| Operational Briefing | `operational-briefing-960.webp` | `public/images/` | generowany przez martwy wpis pipeline | audyty, POC | usunięty |
| Operational Briefing | `operational-briefing-1440.webp` | `public/images/` | generowany przez martwy wpis pipeline | audyty, POC | usunięty |

Pełne wyszukiwanie objęło `src/`, `public/`, `assets/`, `scripts/`, `tests/`, `docs/`, pliki konfiguracyjne, CMS, lockfile i `dist`. Nie znaleziono zależności w renderze, frontmatter, manifestach, Open Graph, structured data, testach kontraktowych, Workerze, sitemapie, CMS ani service workerze.

## 4. Usunięte pliki i odzyskany rozmiar

| Plik | Rozmiar |
| --- | ---: |
| `public/images/brand-statement.jpg` | 145 343 B |
| `public/images/brand-statement.webp` | 46 344 B |
| `public/images/brand-statement-640.webp` | 6 714 B |
| `public/images/brand-statement-960.webp` | 14 008 B |
| `public/images/brand-statement-1440.webp` | 28 210 B |
| **Brand Statement razem** | **240 619 B** |
| `public/images/operational-briefing.jpg` | 203 624 B |
| `public/images/operational-briefing.webp` | 76 834 B |
| `public/images/operational-briefing-640.webp` | 17 708 B |
| `public/images/operational-briefing-960.webp` | 31 964 B |
| `public/images/operational-briefing-1440.webp` | 53 586 B |
| **Operational Briefing razem** | **383 716 B** |
| **Łącznie** | **624 335 B / 609,7 KiB** |

Usunięcie jest trwałe w bieżącym worktree, ale pliki mogą być odzyskane z historii Git, jeśli były wcześniej śledzone i opublikowane.

## 5. Pipeline

W `scripts/optimize-images.mjs` usunięto wyłącznie dwie pozycje wejściowe:

- `public/images/brand-statement.jpg` → rodzina `brand-statement.*`;
- `public/images/operational-briefing.jpg` → rodzina `operational-briefing.*`.

Zaktualizowano odpowiadający im komunikat logu. Pipeline hero-navigation, generowanie Open Graph i osobny blok Experience pozostały bez zmian.

Po uruchomieniu `npm run optimize:images`:

- skrypt zakończył się bez błędów i ostrzeżeń;
- nie odtworzył wycofanych plików;
- wygenerował wyłącznie oczekiwane warianty hero-navigation, Open Graph i 24 outputy Experience;
- SHA-256 wszystkich chronionych plików hero, Experience i Open Graph był identyczny przed i po uruchomieniu.

## 6. Zaktualizowana dokumentacja

- `THIRD_PARTY_LICENSES.md`;
- `docs/brand-statement-poc.md`;
- `docs/experience-section-poc.md`;
- `docs/experience-assets.md`;
- `docs/review/brand-statement/README.md`;
- `docs/review/experience-section/README.md`;
- `docs/visual-assets-audit.md`;
- `GRAPHIC_AUDIT_CLEARSTANCE.md`;
- `PHASE1_VISUAL_IMPLEMENTATION_PLAN.md`;
- niniejszy raport.

W rejestrze licencji zachowano źródło i historię uprawnienia w sekcji `Retired ClearStance image assets`, ale dokument nie sugeruje już obecności ani publikowania plików.

## 7. Pozostałe referencje i ich klasyfikacja

### Produkcyjne

Brak URL-i, `src`, `srcset`, `<picture>`, preloadów, importów, wpisów CMS, metadanych, manifestów lub stylów `background-image` wskazujących na usunięte pliki.

Nazwa `brand-statement` pozostaje w `src/components/sections/BrandStatement.astro` i powiązanym CSS jako poprawna nazwa aktywnego, ikonowego komponentu. Nie jest nazwą ani ścieżką usuniętego obrazu.

### Walidacyjne

`scripts/validate-retired-assets.mjs` zawiera obie nazwy wyłącznie jako negatywny wzorzec testowy. Skrypt kończy walidację błędem, jeśli przeglądarka spróbuje pobrać wycofany asset.

### Historyczne

Nazwy i dawne ścieżki pozostają w:

- `THIRD_PARTY_LICENSES.md` — rejestr retired assets;
- `docs/brand-statement-poc.md`;
- `docs/experience-section-poc.md`;
- `docs/experience-assets.md`;
- `docs/review/brand-statement/README.md`;
- `docs/review/experience-section/README.md`;
- `docs/visual-assets-audit.md`;
- `GRAPHIC_AUDIT_CLEARSTANCE.md`;
- `PHASE1_VISUAL_IMPLEMENTATION_PLAN.md`;
- niniejszym raporcie.

Każdy z tych dokumentów oznacza aktualny status albo posiada nagłówek informujący, że prezentuje historyczny baseline. Screenshoty POC i finalne screenshoty nie zostały usunięte ani ponownie wygenerowane.

## 8. Kontrola produkcyjnego outputu

Po buildzie:

| Metryka | Przed | Po | Różnica |
| --- | ---: | ---: | ---: |
| Wszystkie pliki w `dist` | 97 | 87 | −10 |
| Obrazy w `dist` | 60 | 50 | −10 |
| Dokładny rozmiar plików | 10 160 827 B | 9 536 492 B | −624 335 B |
| Rozmiar dyskowy `du` | 11 264 KiB | 10 480 KiB | −784 KiB |

W `dist` nie ma usuniętych plików ani ich nazw w HTML, CSS, sitemapie i pozostałych wygenerowanych plikach.

## 9. Walidacja przeglądarkowa

Sprawdzono 30 kombinacji:

- Home PL/EN;
- About PL/EN;
- Contact PL/EN;
- szerokości 1440, 1024, 768, 390 i 320 px.

Wynik 30/30:

- brak poziomego overflow;
- brak uszkodzonych obrazów;
- brak odpowiedzi 4xx/5xx i requestów zakończonych błędem;
- brak błędów konsoli;
- brak requestów do wycofanych plików;
- skip link jest pierwszym elementem fokusowalnym;
- `prefers-reduced-motion` działa;
- Home pobiera właściwy `hero-lighthouse-horizon-*`;
- Home i About korzystają wyłącznie z nowych obrazów `/images/experience/`;
- Contact nie próbuje pobierać wycofanej fotografii.

Surowy raport walidacji lokalnej: `/tmp/clearstance-retired-assets-browser-audit.json`.

## 10. Testy techniczne

- Astro check: 0 błędów, 0 ostrzeżeń, 0 hintów;
- TypeScript: zaliczony;
- build: 21 stron;
- testy Node: 28/28;
- content/CMS contract: 10 wpisów, 0 ostrzeżeń;
- link checker: 22 pliki HTML, brak błędnych linków;
- dist contract: zaliczony;
- Cloudflare Worker dry-run: zaliczony;
- sitemap: brak wycofanych nazw i usuniętych tras review;
- skrypt optymalizacji obrazów: zaliczony.

## 11. Lighthouse mobile

Lighthouse 13.4.1:

| Trasa | Performance | Accessibility | Best Practices | SEO | CLS | TBT | LCP |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 100 | 100 | 100 | 100 | 0 | 0 ms | 1810 ms |
| About | 100 | 100 | 100 | 100 | 0 | 0 ms | 1138 ms |
| Contact | 100 | 100 | 100 | 100 | 0 | 0 ms | 1061 ms |

Różnice LCP względem ostatniego pomiaru Home/About wynoszą odpowiednio +7 ms i +8 ms i mieszczą się w normalnym szumie pomiarowym. Wyniki kategorii, CLS i TBT pozostały bez zmian.

## 12. Status końcowy

Cleanup jest kompletny dla dwóch zatwierdzonych rodzin. Nie ma aktywnych referencji ani problemów wymagających decyzji użytkownika. Nie rozpoczęto cleanupu żadnych innych assetów, w tym grafik usług i plików Insights.
