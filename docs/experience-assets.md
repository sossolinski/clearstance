# Experience — rejestr assetów produkcyjnych

Status: wariant A wdrożony produkcyjnie na Home i About w wersjach PL/EN.

Data dodania i wygenerowania: 31 lipca 2026.

Poprzednia rodzina `operational-briefing.*` została wycofana i usunięta z repozytorium 31 lipca 2026. Experience korzysta wyłącznie z opisanych poniżej assetów maritime/aviation.

## Źródło i zasady opisu

**AI-generated editorial imagery created for ClearStance.**

Obrazy są realistycznymi ilustracjami editorial. Nie przedstawiają konkretnej operacji, organizacji, klienta, statku, lotniska ani zdarzenia i nie należy opisywać ich jako materiałów dokumentalnych lub dowodów pracy ClearStance.

Mastery znajdują się poza `public/`, nie są bezpośrednio ładowane przez stronę i nie trafiają do `dist/`.

| Master | Zastosowanie | Wymiary źródła | Finalny crop |
| --- | --- | ---: | ---: |
| `assets/experience/source/experience-maritime-home-master.png` | Home — maritime | 1122 × 1402 | 4:5 |
| `assets/experience/source/experience-aviation-home-master.png` | Home — aviation | 1122 × 1402 | 4:5 |
| `assets/experience/source/experience-maritime-about-master.png` | About — maritime | 1448 × 1086 | 16:10 |
| `assets/experience/source/experience-aviation-about-master.png` | About — aviation | 1448 × 1086 | 16:10 |

Metadane źródłowe i ograniczenia użycia są także zapisane w `assets/experience/asset-manifest.json`.

## Finalne teksty alternatywne

| Użycie | PL | EN |
| --- | --- | --- |
| Home — maritime | Dłonie nawigatora pracującego z mapą morską na mostku statku. | A navigator’s hands working with a nautical chart on a ship’s bridge. |
| Home — aviation | Fragment płyty lotniska z infrastrukturą obsługi samolotu po deszczu. | An airport apron and aircraft ground-handling infrastructure after rain. |
| About — maritime | Stół nawigacyjny z mapą morską i narzędziami na mostku statku. | A ship’s bridge chart table with a nautical chart and navigation tools. |
| About — aviation | Podwozie samolotu i światła drogi kołowania na mokrej płycie lotniska. | Aircraft landing gear and taxiway lights on a wet airport apron. |

## Outputy Home

| Plik | Wymiary | Rozmiar |
| --- | ---: | ---: |
| `experience-maritime-home-480.avif` | 480 × 600 | 12 237 B / 12,0 KiB |
| `experience-maritime-home-720.avif` | 720 × 900 | 21 709 B / 21,2 KiB |
| `experience-maritime-home-960.avif` | 960 × 1200 | 32 082 B / 31,3 KiB |
| `experience-maritime-home-480.webp` | 480 × 600 | 17 364 B / 17,0 KiB |
| `experience-maritime-home-720.webp` | 720 × 900 | 31 058 B / 30,3 KiB |
| `experience-maritime-home-960.webp` | 960 × 1200 | 46 000 B / 44,9 KiB |
| `experience-aviation-home-480.avif` | 480 × 600 | 15 523 B / 15,2 KiB |
| `experience-aviation-home-720.avif` | 720 × 900 | 27 083 B / 26,4 KiB |
| `experience-aviation-home-960.avif` | 960 × 1200 | 39 884 B / 38,9 KiB |
| `experience-aviation-home-480.webp` | 480 × 600 | 24 094 B / 23,5 KiB |
| `experience-aviation-home-720.webp` | 720 × 900 | 42 718 B / 41,7 KiB |
| `experience-aviation-home-960.webp` | 960 × 1200 | 60 662 B / 59,2 KiB |

## Outputy About

| Plik | Wymiary | Rozmiar |
| --- | ---: | ---: |
| `experience-maritime-about-640.avif` | 640 × 400 | 15 821 B / 15,5 KiB |
| `experience-maritime-about-960.avif` | 960 × 600 | 30 504 B / 29,8 KiB |
| `experience-maritime-about-1280.avif` | 1280 × 800 | 45 853 B / 44,8 KiB |
| `experience-maritime-about-640.webp` | 640 × 400 | 22 460 B / 21,9 KiB |
| `experience-maritime-about-960.webp` | 960 × 600 | 42 462 B / 41,5 KiB |
| `experience-maritime-about-1280.webp` | 1280 × 800 | 63 954 B / 62,5 KiB |
| `experience-aviation-about-640.avif` | 640 × 400 | 10 749 B / 10,5 KiB |
| `experience-aviation-about-960.avif` | 960 × 600 | 18 981 B / 18,5 KiB |
| `experience-aviation-about-1280.avif` | 1280 × 800 | 27 891 B / 27,2 KiB |
| `experience-aviation-about-640.webp` | 640 × 400 | 13 796 B / 13,5 KiB |
| `experience-aviation-about-960.webp` | 960 × 600 | 24 542 B / 24,0 KiB |
| `experience-aviation-about-1280.webp` | 1280 × 800 | 36 646 B / 35,8 KiB |

Wszystkie outputy znajdują się w `public/images/experience/`.

## Pipeline i transfer

`npm run optimize:images` odczytuje cztery mastery, wymusza odpowiednio 4:5 i 16:10, nie wykonuje upscalingu oraz generuje tylko jawnie wymienione warianty Experience. Użyte jakości: AVIF 54 i WebP 78. Skrypt kończy się błędem, gdy brakuje mastera, i raportuje rozmiar każdego outputu.

Chrome 150 w testach produkcyjnego preview wybrał AVIF:

| Sekcja | Wybrane pliki | Transfer pary po wejściu sekcji w obszar ładowania |
| --- | --- | ---: |
| Home | dwa warianty 480 AVIF | 28 296 B / 27,6 KiB |
| About | dwa warianty 640 AVIF | 27 106 B / 26,5 KiB |

Na mobile Home oba pliki pozostają niepobrane podczas początkowego audytu Lighthouse i są pobierane dopiero po przewinięciu w pobliże sekcji. About jest bliżej początku dokumentu, więc przeglądarka pobiera jego lazy-loaded obrazy w ramach własnego progu wyprzedzającego.

## Ikony domen

Finalna para to Iconoir `compass` dla maritime oraz `maps-arrow-diagonal` dla aviation. `maps-arrow-diagonal` zachowuje spokojny ciężar optyczny, pozostaje czytelny przy 22 px i nie używa dosłownego symbolu samolotu. `navigator` był zbyt podobny semantycznie do kompasu, a wcześniejszy `path-arrow` został usunięty z allowlisty.

[Porównanie ikon w finalnym layoucie](review/experience-section/final/icon-comparison-compass-maps-arrow-diagonal.png).

## Walidacja

Pełny raport 28 kombinacji tras i szerokości znajduje się w [`validation-report.json`](review/experience-section/final/validation-report.json). Wszystkie przypadki 1440, 1280, 1024, 768, 390, 375 i 320 px przeszły bez overflow, nierównych par, uszkodzonych obrazów, błędów konsoli i błędów requestów. Oba obrazy mają `loading="lazy"`, `decoding="async"` oraz jawne wymiary; komponent nie dodaje JavaScriptu ani hydracji.

Lighthouse 13.4.1:

| Trasa / profil | Performance | Accessibility | Best Practices | SEO | CLS | TBT | LCP | Requesty |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home mobile | 100 | 100 | 100 | 100 | 0 | 0 ms | 1803 ms | 8 |
| About mobile | 100 | 100 | 100 | 100 | 0 | 0 ms | 1130 ms | 8 |
| Home desktop | 100 | 100 | 100 | 100 | 0 | 0 ms | 411 ms | 10 |
| About desktop | 100 | 100 | 100 | 100 | 0 | 0 ms | 291 ms | 8 |
