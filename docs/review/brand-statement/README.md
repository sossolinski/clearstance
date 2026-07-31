# Brand statement — final review

Wariant A został zaakceptowany i wdrożony na produkcyjnym Home PL/EN. Contact statement bez fotografii również jest wersją finalną dla tego etapu.

Screenshoty wykonano z lokalnego production preview. Ujęcia pokazują koniec poprzedniej sekcji, cały statement oraz początek kolejnej sekcji lub footera.

## Finalny Home — wariant A

PL:

- [1440 px](final/home-pl-1440.png)
- [1024 px](final/home-pl-1024.png)
- [768 px](final/home-pl-768.png)
- [390 px](final/home-pl-390.png)
- [320 px](final/home-pl-320.png)

EN:

- [1440 px](final/home-en-1440.png)
- [768 px](final/home-en-768.png)
- [390 px](final/home-en-390.png)

## Finalny Contact — statement bez fotografii

PL:

- [1440 px](final/contact-pl-1440.png)
- [768 px](final/contact-pl-768.png)
- [390 px](final/contact-pl-390.png)

EN:

- [1440 px](final/contact-en-1440.png)
- [390 px](final/contact-en-390.png)

## Materiał historyczny

Katalog [`variant-a/`](variant-a/) zawiera screenshoty prototypu A sprzed przeniesienia do komponentu produkcyjnego.

Katalog [`variant-b/`](variant-b/) zawiera **odrzucony, historyczny wariant B**. Mikrodiagram B, jego style i logika zostały usunięte z aktywnego kodu.

Katalog [`contact/`](contact/) zawiera screenshoty Contact z etapu POC. Finalne ujęcia Contact są w katalogu [`final/`](final/).

## Usunięte trasy review

Usunięto:

- `/review/brand-statement-a/`;
- `/review/brand-statement-b/`;
- `/en/review/brand-statement-a/`;
- `/en/review/brand-statement-b/`.

Trasy nie są generowane w finalnym buildzie i zwracają 404.

## Wycofane stare assety

Poniższe pliki zostały usunięte z repozytorium podczas kontrolowanego cleanupu 31 lipca 2026:

- `public/images/brand-statement.jpg`;
- `public/images/brand-statement.webp`;
- `public/images/brand-statement-1440.webp`;
- `public/images/brand-statement-960.webp`;
- `public/images/brand-statement-640.webp`.

Home i Contact ich nie renderują, pipeline ich nie generuje, a screenshoty w tym katalogu pozostają wyłącznie historyczną dokumentacją procesu. Finalny Brand Statement korzysta z wariantu ikonowego.
