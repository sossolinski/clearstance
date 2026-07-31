# Experience section — screenshot review

Status: wariant A zaakceptowany i wdrożony produkcyjnie. Wariant B odrzucony. Historyczne screenshoty obu wariantów pozostają poniżej jako zapis decyzji.

Poprzednie pliki `operational-briefing.*` zostały usunięte z repozytorium 31 lipca 2026. Screenshoty POC nie są aktualizowane i pozostają wyłącznie dokumentacją historyczną; produkcyjny Experience korzysta z nowych obrazów maritime/aviation.

## Finalne wdrożenie

Finalne obrazy to AI-generated editorial imagery created for ClearStance. Nie przedstawiają konkretnej organizacji, statku, lotniska, klienta, operacji ani zdarzenia.

### Home PL

- [1440 px](final/home-pl-1440.png)
- [1280 px](final/home-pl-1280.png)
- [1024 px](final/home-pl-1024.png)
- [768 px](final/home-pl-768.png)
- [390 px](final/home-pl-390.png)
- [320 px](final/home-pl-320.png)

### Home EN

- [1440 px](final/home-en-1440.png)
- [1024 px](final/home-en-1024.png)
- [768 px](final/home-en-768.png)
- [390 px](final/home-en-390.png)

### About PL

- [1440 px](final/about-pl-1440.png)
- [1024 px](final/about-pl-1024.png)
- [768 px](final/about-pl-768.png)
- [390 px](final/about-pl-390.png)
- [320 px](final/about-pl-320.png)

### About EN

- [1440 px](final/about-en-1440.png)
- [768 px](final/about-en-768.png)
- [390 px](final/about-en-390.png)

### Ikony i walidacja

- [Porównanie `compass` i `maps-arrow-diagonal`](final/icon-comparison-compass-maps-arrow-diagonal.png)
- [Raport 28 kombinacji responsywnych](final/validation-report.json)

Każdy z 18 screenshotów strony obejmuje fragment poprzedniej sekcji, całą sekcję doświadczenia i fragment kolejnej sekcji.

## Historyczny POC

Wszystkie ujęcia powstały z lokalnego production preview. Screenshot obejmuje fragment poprzedniej sekcji, całą sekcję doświadczenia i fragment kolejnej sekcji.

Neutralne pola `MARITIME` i `AVIATION` są placeholderami layoutowymi, nie finalnymi fotografiami. Nie udają zdjęć, są `aria-hidden="true"` i nie generują transferu obrazów.

## Wariant A — dwa równorzędne kadry

W tym historycznym wariancie małe ikony Iconoir `compass` i `path-arrow` były widoczne przy nazwach domen. Finalne wdrożenie zastąpiło `path-arrow` ikoną `maps-arrow-diagonal`.

### Home PL

- [1440 px](variant-a/home-pl-1440.png)
- [1024 px](variant-a/home-pl-1024.png)
- [768 px](variant-a/home-pl-768.png)
- [390 px](variant-a/home-pl-390.png)
- [320 px](variant-a/home-pl-320.png)

### Home EN

- [1440 px](variant-a/home-en-1440.png)
- [768 px](variant-a/home-en-768.png)
- [390 px](variant-a/home-en-390.png)

### About PL

- [1440 px](variant-a/about-pl-1440.png)
- [768 px](variant-a/about-pl-768.png)
- [390 px](variant-a/about-pl-390.png)

### About EN

- [1440 px](variant-a/about-en-1440.png)
- [390 px](variant-a/about-en-390.png)

## Wariant B — główny kadr i detail inset

Wariant B nie używa ikon domen. Na Home maritime jest kadrem głównym, a aviation detalem. Na About hierarchia kadrów jest odwrócona, aby nie powtarzać kompozycji Home 1:1.

### Home PL

- [1440 px](variant-b/home-pl-1440.png)
- [1024 px](variant-b/home-pl-1024.png)
- [768 px](variant-b/home-pl-768.png)
- [390 px](variant-b/home-pl-390.png)
- [320 px](variant-b/home-pl-320.png)

### Home EN

- [1440 px](variant-b/home-en-1440.png)
- [768 px](variant-b/home-en-768.png)
- [390 px](variant-b/home-en-390.png)

### About PL

- [1440 px](variant-b/about-pl-1440.png)
- [768 px](variant-b/about-pl-768.png)
- [390 px](variant-b/about-pl-390.png)

### About EN

- [1440 px](variant-b/about-en-1440.png)
- [390 px](variant-b/about-en-390.png)

## Usunięte trasy review

- `/review/experience-a/`
- `/review/experience-b/`
- `/en/review/experience-a/`
- `/en/review/experience-b/`

Trasy zostały usunięte z kodu, nie występują w buildzie ani sitemapie i zwracają 404.

## Ograniczenia historycznych screenshotów

Screenshoty POC pozwalały ocenić wyłącznie:

- proporcje tekst–media;
- hierarchię maritime/aviation;
- zachowanie desktop/tablet/mobile;
- zasadność małych ikon domen;
- rytm Home i About.

Nie przedstawiają finalnych assetów i pozostają wyłącznie historią decyzji layoutowej. Finalne cropy, kolor, rozmiary i transfer są udokumentowane w [`docs/experience-assets.md`](../../experience-assets.md).
