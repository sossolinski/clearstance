# Brief obrazów editorial — doświadczenie ClearStance

Status: cztery finalne obrazy zaakceptowane i wdrożone produkcyjnie 31 lipca 2026.

## 1. Źródło

**AI-generated editorial imagery created for ClearStance.**

Obrazy są realistycznymi ilustracjami editorial przygotowanymi dla dwóch domen doświadczenia: maritime i aviation. Nie są fotografiami dokumentalnymi i nie przedstawiają konkretnej działalności ClearStance, organizacji, klienta, statku, lotniska, operacji ani zdarzenia.

Nie należy opisywać ich jako:

- autentycznej dokumentacji pracy ClearStance lub założyciela;
- zdjęć z konkretnego statku albo lotniska;
- materiałów linii lotniczej, portu lotniczego lub klienta;
- dowodów konkretnego doświadczenia albo zdarzenia.

Informacja o źródle pozostaje w dokumentacji projektu i rejestrze licencyjnym. Zgodnie z zasadami projektu nie jest dodawana jako widoczny podpis na stronie.

## 2. Zaakceptowane mastery

| Master | Rola | Orientacja |
| --- | --- | --- |
| `experience-maritime-home-master.png` | Home — maritime | portrait 4:5 |
| `experience-aviation-home-master.png` | Home — aviation | portrait 4:5 |
| `experience-maritime-about-master.png` | About — maritime | landscape 4:3, źródło dla cropu 16:10 |
| `experience-aviation-about-master.png` | About — aviation | landscape 4:3, źródło dla cropu 16:10 |

Mastery są przechowywane w `assets/experience/source/`, poza katalogiem publicznym. Manifest źródłowy znajduje się w `assets/experience/asset-manifest.json`.

## 3. Kierunek maritime

Home zachowuje dłonie, mapę, cyrkiel nawigacyjny i kontekst mostka. Osoba nie staje się tematem, a ekrany pozostają nieczytelne.

About pokazuje szerszy chart table, narzędzia i widok przez okna mostka. Kontenerowiec pozostaje subtelnym kontekstem. Pseudo-dane mapy nie są eksponowane ani dodatkowo wyostrzane.

## 4. Kierunek aviation

Home zachowuje fragment płyty po deszczu, silnik, rękaw i infrastrukturę ground handling. Kadr nie jest glamour shotem samolotu i nie eksponuje oznaczeń.

About zachowuje podwozie, odbicie i linię świateł drogi kołowania wraz z kontekstem mokrej płyty. Kadr nie zwiększa dramatyzmu ani kontrastu.

## 5. Proporcje i cropy

| Użycie | Proporcja | Szerokości |
| --- | ---: | --- |
| Home — maritime | 4:5 | 480, 720, 960 px |
| Home — aviation | 4:5 | 480, 720, 960 px |
| About — maritime | 16:10 | 640, 960, 1280 px |
| About — aviation | 16:10 | 640, 960, 1280 px |

Home używa dwóch równorzędnych pionowych kadrów. About korzysta z innych masterów i dwóch bardziej panoramicznych kadrów. Żadna domena nie jest hierarchicznie ważniejsza.

## 6. Obróbka

Mastery zachowują dostarczoną tonację. Pipeline nie dodaje overlayu, gradientu, winiety, grainu, glow, agresywnego HDR ani dodatkowego wyostrzania. Jedyną obróbką jest kontrolowany crop, resize oraz kompresja AVIF/WebP.

## 7. Bezpieczeństwo informacji

Finalne cropy sprawdzono pod kątem:

- czytelnych ekranów, map i dokumentów;
- logo i nazw organizacji;
- numerów rejestracyjnych i identyfikatorów;
- oznaczeń operacyjnych;
- danych pozwalających zidentyfikować operację;
- metadanych lokalizacyjnych w publicznych pochodnych.

Nie znaleziono informacji, które należałoby eksponować lub opisywać w treści.

## 8. Dostępność i dostarczanie

Każdy obraz ma finalny alt PL/EN zgodny z rzeczywiście widoczną treścią. Implementacja używa `<picture>`, AVIF jako formatu preferowanego, WebP jako fallbacku, `srcset`, `sizes`, jawnych wymiarów, `loading="lazy"` i `decoding="async"`.

Szczegółowy rejestr outputów, rozmiarów, tekstów alternatywnych i transferów: [`docs/experience-assets.md`](experience-assets.md).
