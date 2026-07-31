# POC sekcji doświadczenia ClearStance

Status finalny: wariant A zaakceptowany i wdrożony produkcyjnie na Home i About PL/EN. Wariant B odrzucony; komponenty i trasy review usunięte.

Data POC: 30 lipca 2026. Data wdrożenia: 31 lipca 2026.

## 1. Cel etapu

POC sprawdzał zastąpienie generycznego obrazu `operational-briefing.*` dwoma równorzędnymi kadrami editorial: maritime i aviation. Zakres obejmował układ Home i About w PL/EN, proporcje desktop/tablet/mobile, małe ikony domen, brief obrazów, budżety oraz materiały review.

Na etapie POC nie było zatwierdzonych assetów obu domen, dlatego prototyp używał neutralnych placeholderów. Po decyzji dostarczono cztery finalne mastery AI-generated editorial imagery, po dwa różne dla Home i About.

## Status wdrożenia finalnego

- wariant A: zaakceptowany;
- wariant B: odrzucony;
- cztery assety AI-generated editorial imagery: zaakceptowane do użycia produkcyjnego;
- Home i About PL/EN: przełączone;
- `operational-briefing.*`: wycofany z renderu i usunięty z repozytorium 31 lipca 2026;
- `compass` + `maps-arrow-diagonal`: zaakceptowana para ikon domen;
- `path-arrow`: usunięty z allowlisty;
- trasy review: usunięte i zwracają 404;
- historyczne screenshoty A/B: zachowane jako zapis decyzji;
- finalne parametry, transfery i Lighthouse: [`docs/experience-assets.md`](experience-assets.md).

**AI-generated editorial imagery created for ClearStance.** Obrazy nie dokumentują konkretnej organizacji, statku, lotniska, klienta, operacji ani zdarzenia.

## 2. Historyczna diagnoza stanu produkcyjnego

W stanie analizowanym przed wdrożeniem obraz przedstawiał inscenizowaną, nocną salę kryzysową z anonimowym zespołem, mapą i ekranami. Był technicznie poprawny, ale:

- nie dokumentuje rzeczywistego doświadczenia maritime ani aviation;
- przypomina stockową komunikację firmy konsultingowej;
- używa dużej liczby osób i ekranów jako skrótu „kryzysu”;
- jest powtórzony na Home i About;
- na 1024 px Home przechodzi do pojedynczej kolumny i rośnie do 1162 px;
- na mobile Home ma 1117–1157 px, a About 1221–1328 px;
- na About jest ładowany eager poniżej PageIntro.

Problem jest koncepcyjny. Crop, filtr, overlay i `object-position` nie zmienią braku autentycznego związku z dwiema domenami.

## 3. Historyczna inwentaryzacja `operational-briefing.*`

Poniższa tabela dokumentuje stan sprzed cleanupu. Cała rodzina została usunięta z `public/images/` 31 lipca 2026, a pipeline nie generuje już tych plików.

| Plik | Format | Wymiary | Rozmiar |
| --- | --- | ---: | ---: |
| `operational-briefing.jpg` | JPEG | 1920 × 1080 | 203 624 B |
| `operational-briefing.webp` | WebP | 1920 × 1080 | 76 834 B |
| `operational-briefing-1440.webp` | WebP | 1440 × 810 | 53 586 B |
| `operational-briefing-960.webp` | WebP | 960 × 540 | 31 964 B |
| `operational-briefing-640.webp` | WebP | 640 × 360 | 17 708 B |

Łączny rozmiar rodziny: 383 716 B, około 374,7 KiB. Pojedyncza wizyta pobiera tylko wariant wybrany przez przeglądarkę.

### Home

Kod: `src/components/sections/HomePage.astro`.

- `<picture>` z czterema wariantami WebP;
- `sizes`: pełna szerokość sekcji na mobile/tablet i 545 px na desktopie;
- JPEG 1920 × 1080 jako fallback;
- ówczesny alt PL/EN z `home.experience.imageAlt`;
- `loading="lazy"`;
- brak `decoding="async"`;
- `object-fit: cover`;
- `object-position: center`;
- filtr `saturate(0.85) contrast(0.98)`;
- desktop: `min-height: 530px`;
- 1024 px: obraz 410–500 px nad tekstem;
- mobile: `min-height: 310px`.

Obraz nie jest pobierany w początkowym viewportcie Home dzięki `loading="lazy"`. Po przewinięciu przeglądarka pobrała:

| Szerokość | Wybrany wariant | Transfer pliku |
| --- | --- | ---: |
| 1440 px | 640 WebP | 17 708 B |
| 1024 px | 1440 WebP | 53 586 B |
| 768 px | 960 WebP | 31 964 B |
| 390/320 px | 640 WebP | 17 708 B |

### About

Kod: `src/components/pages/AboutPage.astro`.

- ten sam `<picture>`, fallback, alt i cztery warianty WebP;
- `sizes`: szerokość mobile, 47vw na tabletach i 540 px na desktopie;
- `loading="eager"` mimo położenia poniżej PageIntro;
- brak `decoding="async"`;
- desktop: kontener 4:5;
- mobile: kontener 16:11;
- `object-fit: cover`;
- `object-position: 59% center`;
- filtr `saturate(0.78)`;
- figure jest sticky na desktopie.

About pobierał jeden `operational-briefing-640.webp` już na wejściu: 17 708 B przy testowanych szerokościach.

### Pozostałe referencje

W stanie POC poza Home i About obraz nie był renderowany. Referencje występowały również w:

- ówczesnym `scripts/optimize-images.mjs`;
- `THIRD_PARTY_LICENSES.md`;
- dokumentacji audytowej.

Nie znaleziono referencji w CMS ani treści Insights. Po cleanupie pipeline nie zawiera już tej rodziny.

## 4. Przegląd wszystkich kandydatów w repozytorium

| Asset | Lokalizacja | Temat | Jakość | Licencja | Możliwość użycia | Uwagi |
| --- | --- | --- | --- | --- | --- | --- |
| `operational-briefing.*` | `public/images/` | inscenizowany war room | technicznie dobra, koncepcyjnie słaba | zatwierdzony asset projektowy | nie dla nowej sekcji | ludzie i ekrany; brak dowodu maritime/aviation; bezpieczny crop nie rozwiązuje problemu |
| `hero-lighthouse-horizon-*` | `public/images/` | latarnia i wybrzeże | wysoka | zatwierdzony asset projektowy | nie | docelowy hero; brak związku z aviation i brak dokumentalnego charakteru operacyjnego |
| `hero-navigation.*` | `public/images/` | latarnia, morze i linie topograficzne | dobra | zatwierdzony asset projektowy | nie | starszy motyw hero; jego ponowne użycie powtórzyłoby latarnię |
| `brand-statement.*` | `public/images/` | latarnia | dobra | zatwierdzony asset projektowy | nie | wycofany z renderu statementów; brak domeny aviation |
| `01–04_*.png` | `public/images/` | szkice usług | nierówna; nie są fotografiami | brak kompletnego wpisu źródłowego w rejestrze | nie | ilustracje ludzi i warsztatów; nie są dokumentem doświadczenia ani kandydatem fotograficznym |
| screenshot Insights | `public/images/insights/` | screenshot materiału redakcyjnego | niska przydatność | brak potwierdzenia dla tego zastosowania | nie | nie dotyczy maritime ani aviation; potencjalne dane/marki wymagają osobnego audytu |
| `clearstance-og.webp` | `public/social/` | grafika social | pochodna | zatwierdzony asset projektowy | nie | format promocyjny, nie fotografia sekcji |

Nie znaleziono plików nazwanych lub przedstawiających bridge, chart table, navigation instrument, airport, airside ani aviation operations. Użytkownik nie dodał nowych masterów maritime lub aviation.

## 5. Status licencji

`operational-briefing.*`, hero i historyczne fotografie latarni mają potwierdzoną zgodę projektową opisaną w `THIRD_PARTY_LICENSES.md`, ale nie spełniają kryteriów merytorycznych nowej sekcji.

Dla szkiców usług oraz screenshotu Insights nie ma dokumentacji pozwalającej zatwierdzić je jako nowe fotografie doświadczenia. Niezależnie od licencji nie odpowiadają one wymaganej tematyce.

Wniosek na etapie POC: **repozytorium nie zawierało dwóch fotografii dopuszczonych do publikacji w nowej sekcji**. Później dostarczono i wdrożono cztery jasno oznaczone obrazy AI-generated editorial imagery.

## 6. Placeholdery review

`ExperienceMedia.astro` używa wyłącznie HTML i scoped CSS:

- dwa neutralne, matowe pola w istniejącej palecie;
- cienka ramka, jedna linia konstrukcyjna i mały coral point;
- wyłącznie małe labelki `MARITIME` i `AVIATION`;
- brak gradientów, emoji, clipartu, statku, samolotu i wygenerowanego krajobrazu;
- całe media mają `aria-hidden="true"`;
- brak `<img>`, `<picture>`, alt textu i requestów obrazów;
- brak JavaScriptu i hydracji.

Placeholdery pozwalają ocenić proporcje i wymagania cropu, ale nie autentyczność, kolor ani finalny transfer.

## 7. Wariant A — dwa równorzędne kadry

### Home

- nagłówek i pełne istniejące copy pozostają dominujące;
- dwa równorzędne kadry 4:5 są obok tekstu na desktopie;
- 1024 px zachowuje układ obok tekstu;
- 768 px pokazuje parę 2 × 1 przed treścią;
- mobile używa dwóch niewysokich kadrów 4:5 w dwóch kolumnach;
- tracki maritime/aviation zachowują równą wagę;
- CTA pozostaje widoczne;
- przy nazwach domen testowane są ikony `compass` i `path-arrow`.

### About

- te same dwa źródła są planowane w innych cropach;
- desktop i tablet używają dwóch panoramicznych pól ułożonych pionowo obok tekstu;
- przy 768 px media i tekst nadal pozostają w dwóch kolumnach;
- mobile pokazuje małą parę 2 × 1, a następnie pełne copy;
- opcjonalna oś trzech etapów jest widoczna tylko na szerokim desktopie, ponieważ dubluje informacje i nie powinna wydłużać tabletów ani mobile.

## 8. Wariant B — główny kadr i detail inset

### Home

- maritime jest głównym kadrem;
- aviation jest węższym insetem 4:3;
- tekst pozostaje większym nośnikiem znaczenia;
- 1024 px zachowuje kompozycję obok tekstu;
- 768 i mobile używają szerokiego głównego pola i nałożonego detalu;
- tracki pozostają równorzędne tekstowo;
- brak ikon domen pozwala ocenić układ bez dodatkowych symboli.

### About

- hierarchia źródeł jest odwrócona: aviation staje się kadrem głównym, maritime detalem;
- crop i kompozycja nie powtarzają Home 1:1;
- desktop wykorzystuje układ panoramiczny;
- 768 px zachowuje dwie kolumny;
- mobile używa zwartego 16:11 z insetem;
- opcjonalna oś pozostaje tylko na szerokim desktopie.

## 9. Porównanie wysokości — Home PL

| Szerokość | Produkcja | Wariant A | Wariant B |
| --- | ---: | ---: | ---: |
| 1440 px | 830 px | 669 px | 730 px |
| 1024 px | 1162 px | 577 px | 585 px |
| 768 px | 1070 px | 1039 px | 985 px |
| 390 px | 1117 px | 933 px | 961 px |
| 320 px | 1157 px | 937 px | 961 px |

Największa poprawa występuje przy 1024 px, gdzie media nie przechodzą przedwcześnie do pełnej szerokości. Na mobile oba warianty są wyraźnie krótsze od produkcji.

## 10. Porównanie wysokości — About PL

| Szerokość | Produkcja | Wariant A | Wariant B |
| --- | ---: | ---: | ---: |
| 1440 px | 903 px | 915 px | 909 px |
| 1024 px | 825 px | 708 px | 708 px |
| 768 px | 954 px | 686 px | 686 px |
| 390 px | 1221 px | 1046 px | 1075 px |
| 320 px | 1328 px | 1144 px | 1168 px |

Desktop pozostaje podobnej wysokości ze względu na opcjonalną oś. Tablet i mobile są wyraźnie krótsze.

## 11. Test ikon domen

Do allowlisty dodano dwa statyczne importy Iconoir:

- maritime: `compass`;
- aviation/route: `path-arrow`.

W wariancie A ikony mają 22 px, `currentColor`, brak wypełnionego kontenera, `aria-hidden="true"` i wewnętrzne `focusable="false"`. Wariant B celowo nie używa ikon.

Wynik:

- `compass` jest natychmiast czytelny i dobrze łączy się z językiem nawigacji;
- `path-arrow` jest bardziej abstrakcyjny, ale przy widocznym labelu poprawnie sygnalizuje trasę/przepływ bez użycia dosłownego samolotu;
- ikony nie zastępują nazw i nie wprowadzają informacji dostępnej wyłącznie wizualnie;
- przy realnych, szczegółowych fotografiach należy ponownie ocenić, czy ikony na About nie są zbędne.

W obecnym POC ikony wnoszą umiarkowaną wartość orientacyjną i nie pogarszają Home.

## 12. Brief fotograficzny

Pełne wymagania znajdują się w [`docs/experience-photography-brief.md`](experience-photography-brief.md).

Potrzebne są:

1. maritime — autentyczny detal pracy nawigacyjnej, chart table, instrument, dokumentacja lub spokojny widok z mostka;
2. aviation — autentyczny detal infrastruktury airside, oznaczeń, operacji lub pracy z dokumentacją.

Oba zdjęcia muszą przejść kontrolę wizerunku, ekranów, dokumentów, logo, nazw, numerów rejestracyjnych, oznaczeń operacyjnych i metadanych lokalizacji.

## 13. Crop matrix

Plan eksportów:

| Kontekst | Crop | Szerokości |
| --- | --- | --- |
| Home desktop portrait | 4:5 | 640, 960, 1280 |
| Home/detail tablet | 4:3 lub 16:11 | 640, 960, 1280 |
| Home mobile | około 16:11 i mały 4:3/4:5 | 480, 720, 960 |
| About panoramic | 16:9 | 640, 960, 1280 |
| About detail | 4:3 | 640, 960 |

Docelowo AVIF jest formatem primary, WebP fallbackiem, a JPEG opcjonalnym fallbackiem. Master powinien mieć minimum około 5000 × 4000 px i zachowywać bezpieczną strefę dla cropów poziomych i pionowych.

## 14. Budżety plików i strategia ładowania

- pojedynczy desktop: 140–180 KiB maksymalnie;
- pojedynczy mobile: 70–100 KiB maksymalnie;
- razem mobile: cel poniżej 180 KiB;
- razem desktop: cel poniżej 300 KiB.

Oba obrazy powinny używać `<picture>`, AVIF/WebP, `srcset`, `sizes`, jawnych wymiarów, stabilnego `aspect-ratio`, `loading="lazy"` i `decoding="async"`.

Jeżeli dwa zdjęcia przekroczą budżet:

- drugi kadr powinien otrzymać mniejszy crop i silniejszą kompresję;
- należy zachować natywne lazy loading;
- na mobile można renderować tylko jeden obraz, ale drugiego nie wolno pobrać i ukryć CSS-em.

## 15. Zasady alt text

Alt ma opisywać rzeczywisty obiekt lub działanie na zatwierdzonej fotografii, bez marketingowej interpretacji i bez powtarzania nagłówka.

Placeholdery są dekoracyjne i `aria-hidden`. Finalny detal, który nie wnosi osobnej informacji, może użyć `alt=""`. Tekst będzie przygotowany w PL/EN dopiero dla konkretnych masterów.

## 16. Dostępność

Sprawdzono:

- logiczną kolejność DOM: nagłówek → media → pełne copy;
- sens sekcji bez zdjęć i bez ikon;
- prawdziwy tekst HTML dla nazw domen i osi;
- dekoracyjne placeholdery i ikony bez dublowania accessible name;
- hierarchię nagłówków;
- widoczny focus CTA;
- skip link jako pierwszy cel klawiatury;
- kontrast labeli;
- 200% zoom;
- `prefers-reduced-motion`;
- brak poziomego overflow;
- PL i EN przy 1440, 1280, 1024, 768, 390, 375 i 320 px.

## 17. Wydajność

POC nie dodaje JavaScriptu, Reacta, hydracji ani requestów obrazów. Placeholdery nie reprezentują kosztu finalnych fotografii.

Lighthouse mobile:

| Trasa | Performance | Accessibility | Best Practices | SEO | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Produkcyjny Home | 100 | 100 | 100 | 100 | 0 | 0 ms |
| Produkcyjny About | 100 | 100 | 100 | 100 | 0 | 0 ms |
| Review A | 100 | 100 | 100 | 66* | 0 | 0 ms |
| Review B | 100 | 100 | 100 | 66* | 0 | 0 ms |

\* Jedynym celowo niezaliczonym elementem SEO jest `noindex, nofollow`.

Lighthouse z placeholderami raportuje około 21–22 KiB transferu na stronach review. Wynik Performance 100 nie prognozuje finalnego transferu dwóch fotografii.

## 18. Screenshoty

Wykonano 26 screenshotów. Pełna lista znajduje się w [`docs/review/experience-section/README.md`](review/experience-section/README.md).

Każde ujęcie obejmuje fragment poprzedniej sekcji, cały prototyp doświadczenia i fragment kolejnej sekcji.

## 19. Zalety i wady wariantu A

Zalety:

- obie domeny mają jednoznacznie równą wagę;
- najprostsza relacja semantyczna i najmniejsze ryzyko błędnego odczytania;
- łatwiejsze przygotowanie i utrzymanie cropów;
- spokojny, wiarygodny charakter;
- najkrótszy Home na desktopie i mobile;
- ikony pomagają szybko zorientować się w domenach;
- układ dobrze przenosi się między Home i About bez powtórzenia 1:1.

Wady:

- przy słabych fotografiach może wyglądać jak galeria;
- symetria wymaga dwóch zdjęć o podobnej jakości i tonacji;
- mniej editorialowej dynamiki niż B;
- różnica między kadrami musi wynikać z treści, nie tylko z podpisu.

## 20. Zalety i wady wariantu B

Zalety:

- bardziej editorialowy rytm;
- tekst pozostaje dominantą, a media tworzą jedną kompozycję;
- About może odwrócić hierarchię i uniknąć powtórzenia Home;
- inset pozwala użyć spokojnego detalu jako drugiego kadru;
- wariant nie przypomina klasycznej galerii.

Wady:

- jedna domena zawsze wydaje się ważniejsza;
- wymagania dotyczące cropu i bezpiecznej strefy są wyższe;
- overlay i rama mogą wyglądać zbyt projektowo przy dokumentalnym materiale;
- trudniejsza kontrola na 320 px;
- bez ikon rozpoznanie domen opiera się wyłącznie na podpisach;
- wymaga więcej lokalnych reguł layoutu.

## 21. Rekomendacja Codexa

Rekomendowany do dalszego rozwinięcia jest **wariant A**.

Powód nie jest wyłącznie estetyczny: A najlepiej zachowuje równowagę maritime/aviation, ma niższe ryzyko błędnego hierarchizowania doświadczenia, łatwiejsze cropy, krótszy Home i prostsze utrzymanie. W obecnej kompozycji nie wygląda jak galeria, ponieważ tekst pozostaje dominujący, a pola mediów zajmują mniej niż połowę sekcji.

Rekomendacja została zaakceptowana. Finalne mastery potwierdziły równowagę wariantu A, czytelność cropów oraz dominację tekstu nad mediami.

## 22. Decyzje końcowe

1. wariant A wdrożony; wariant B odrzucony;
2. Home używa dwóch cropów 4:5, About dwóch cropów 16:10;
3. finalna para ikon to `compass` i `maps-arrow-diagonal`;
4. oś About pozostaje na desktopie i większych tabletach od 901 px, a na mniejszych widokach jest ukryta;
5. wszystkie obrazy używają AVIF/WebP, lazy loadingu i jawnych wymiarów;
6. `operational-briefing.*` nie jest renderowany, został usunięty z repozytorium i nie jest generowany przez pipeline;
7. 18 finalnych screenshotów i porównanie ikon znajdują się w [`docs/review/experience-section/final/`](review/experience-section/final/).
