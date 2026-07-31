# Audyt warstwy wizualnej i assetów ClearStance

> Status historyczny: dokument opisuje stan zastany przed wdrożeniem zaakceptowanych zmian. Od 31 lipca 2026 Brand Statement korzysta z wariantu ikonowego, Experience z nowych assetów maritime/aviation, a rodziny `brand-statement.*` i `operational-briefing.*` zostały usunięte z repozytorium. Tabele i rekomendacje poniżej pozostają zapisem procesu, nie opisem aktywnego renderu.

Data audytu: 30 lipca 2026
Repozytorium: commit `81ecb10` oraz aktualny lokalny worktree
Zakres: strona główna, podstrony PL/EN, artykuły, komponenty współdzielone, CMS, assety, responsywność, dostępność i wydajność

> Ten dokument przyjmuje aktualny hero i główny header jako zaakceptowany wzorzec. Nie rekomenduje zmiany zdjęcia, kompozycji ani koncepcji hero. Zastępuje w tym zakresie wcześniejsze notatki projektowe w repozytorium, które mogły powstać przed akceptacją obecnego hero.

## 1. Executive summary

Warstwa UI jest dojrzalsza niż część użytych assetów. Typografia, paleta, cienkie separatory, numeracja, rytm sekcji i własny motyw okręgów/kompasu są spójne z zaakceptowanym hero. Problemem nie jest więc ogólny brak grafiki, lecz nierówny poziom i niewłaściwe rozmieszczenie kilku dużych elementów:

1. Sekcja „Gotowość porządkuje działanie” powtarza latarnię i zachowuje się jak drugi hero. Osłabia wyjątkowość głównego motywu.
2. W stanie audytowanym `operational-briefing.*` przedstawiało generyczną, inscenizowaną „salę kryzysową” i było użyte na Home oraz About. Na 1024 i 768 px fotografia stawała się bardzo dużym blokiem przed tekstem.
3. Cztery szkice oferty są ciężkimi plikami PNG, różnią się proporcjami i przedstawiają głównie generycznych ludzi przy flipcharcie lub laptopie. Ich język jest bliższy ilustracji stockowej niż techniczno-redakcyjnemu charakterowi hero.
4. Insights ma poprawnie przygotowane pola CMS i layout dla obrazu, ale wszystkie opublikowane artykuły są typograficzne. Na indeksie powstają długie, bardzo podobne bloki.
5. W stanie audytowanym obraz latarni z `brand-statement.*` był ponownie użyty na stronie kontaktowej. Ten sam poboczny motyw pojawiał się trzykrotnie w ścieżce użytkownika: hero, statement i Contact.

Rekomendowany jest wariant B:

- Iconoir jako jedna główna biblioteka;
- 16 unikalnych ikon bibliotecznych, używanych selektywnie;
- maksymalnie 2 potencjalne własne ikony SVG, tylko po nieudanym teście ikon bibliotecznych;
- 3 autorskie mikroilustracje bazowe, tworzące jeden system editorial;
- 2 nowe fotografie dokumentalne: maritime i aviation;
- usunięcie powtórzonej latarni poza hero;
- rezygnacja z ikon tam, gdzie numeracja i typografia już pełnią właściwą funkcję.

Hero/header pozostają bez przebudowy.

## 2. Metoda i zakres oględzin

Audyt objął:

- lokalny render Astro przy szerokościach 1440, 1024, 768 i 390 px;
- stronę główną i wszystkie główne podstrony PL/EN;
- reprezentatywny artykuł Insights;
- osobne oględziny sekcji Home, listy usług, About, formularza, listy Insights i treści artykułu;
- tryb `prefers-reduced-motion: reduce`;
- kontrolę poziomego overflow;
- strukturę HTML/CSS, zależności, schemat treści i konfigurację Sveltia CMS;
- wymiary, formaty i rozmiary plików graficznych;
- poprawność nazw rekomendowanych ikon w aktualnym katalogu Iconoir regular.

Wynik oględzin responsywnych:

- brak faktycznego poziomego overflow w badanych widokach;
- breakpoint 1080 px poprawnie przełącza nawigację mobilną;
- długość treści PL/EN nie powoduje kolizji;
- największa utrata proporcji wizualnych występuje w sekcji doświadczenia przy 1024 i 768 px;
- na 390 px sekcje były czytelne, lecz obrazy `operational-briefing` i `brand-statement` zajmowały za dużo pionowej przestrzeni względem informacji, którą wnosiły;
- obecne animacje reveal respektują `prefers-reduced-motion`.

Stan repozytorium podczas audytu zawierał istniejące zmiany użytkownika. Dokument ich nie modyfikuje. Lokalnie zmieniony `public/images/04_przeglady_i_doskonalenie.png` został oceniony w aktualnej wersji.

## 3. Diagnoza obecnego stanu

### Co działa

- zaakceptowany hero tworzy właściwy punkt odniesienia: spokojny, ciemny, szeroki i editorialowy;
- paleta `--ink`, `--paper`, teal i pojedynczy coral signal jest konsekwentna;
- numeracja `01`, `02` itd. i cienkie reguły są silnym, własnym narzędziem skanowania;
- sekcje „Nasze podejście”, „Cykl gotowości”, „Jak pracujemy”, ContactBand i tekst artykułu dobrze działają bez grafiki;
- własny kompas na stronie About jest trafniejszy niż typowa ikona branżowa;
- PL i EN współdzielą komponenty i assety, co ułatwia utrzymanie jednego systemu;
- focus states, minimum 44 px w istotnych kontrolkach i reduced motion są już obecne;
- hero ma art direction desktop/mobile, AVIF/WebP, `srcset`, `sizes` i `fetchpriority="high"`.

### Co osłabia projekt

- duże obrazy są semantycznie powtarzalne albo generyczne;
- usługi są prezentowane przez ludzi i spotkania, mimo że sednem treści są struktury, decyzje, przepływ i testowanie;
- część wizualna nie korzysta jeszcze z własnego języka: punktów, kursu, połączeń, ram decyzyjnych i warstw informacji;
- indeks Insights ma przygotowane miejsce na obraz, ale brak systemowego fallbacku;
- obrazy uploadowane przez CMS nie mają automatycznych wariantów thumbnail;
- nie ma jednego komponentu ikon ani zasad dla `aria-hidden`, `currentColor`, rozmiaru i stroke;
- utility arrows są dziś znakami tekstowymi, a LinkedIn jest osobnym inline SVG. To nie jest krytyczny problem, ale pokazuje brak ujednoliconego mechanizmu.

### System typografii

- Display używa stosu `"Avenir Next", "Segoe UI Variable Display", "Segoe UI", Helvetica, Arial`. Na macOS zaakceptowany wygląd opiera się głównie na Avenir Next; na Windows metryka i łamanie nagłówków mogą być inne. Przed wdrożeniem ikon i nowych układów trzeba ponownie sprawdzić 1024/768/390 również w renderze Segoe.
- Body deklaruje `Inter`, ale repo nie dostarcza ani nie pobiera fontu. Jeśli Inter nie jest zainstalowany lokalnie, przeglądarka używa systemowego sans-serif. To daje bardzo dobrą wydajność i brak zależności zewnętrznej, lecz nie gwarantuje identycznego renderu między urządzeniami.
- Skale display są płynne przez `clamp()`, a mobile ma dodatkowe limity 37–44 px. Nie ma potrzeby ich globalnie zmieniać.
- Utility labels 10/11 px, uppercase, mono i szeroki tracking pełnią funkcję orientacyjną. Ikony nie mogą zastępować tych labeli.
- Body 13–16 px z line-height ok. 1.6–1.8 jest czytelny. Problemem jest długość niektórych sekcji, nie lokalna czytelność akapitów.
- Nie rekomenduje się dodawania webfontu w ramach tego etapu. Jeśli w przyszłości marka będzie wymagała pełnej zgodności między platformami, decyzja o fontach powinna być osobnym audytem wydajności, licencji i polskich znaków.

### System spacingu i siatki

- `--max: 1220px` i wrap 72/44/32 px tworzą konsekwentne marginesy przy 1440/tablet/mobile.
- Paddings sekcji 70–105 px dobrze budują premium rhythm; nie należy ich skracać globalnie.
- Nie ma pełnego zestawu spacing tokens. Wartości są jawnie zapisane w komponentowych klasach. Przy przyszłej implementacji ikon warto dodać tylko lokalne tokeny `--icon-gap`, `--visual-gap` i `--section-visual-size`, bez refaktoru całego CSS.
- Rytm psują głównie media o dużej wysokości, nie same odstępy: experience na tabletach, cztery szkice na mobile i drugi lighthouse statement.
- Nowe elementy nie powinny automatycznie wypełniać pustej przestrzeni. W obecnym projekcie whitespace jest częścią języka marki.

## 4. Inwentaryzacja stron i sekcji

| Strona | Wersje | Główny komponent | Sekcje |
|---|---|---|---|
| Home | PL `/`, EN `/en/` | `src/components/sections/HomePage.astro` | hero, featured Insight, approach, services, readiness cycle, experience, practice, brand statement, Insights, ContactBand |
| Oferta | PL `/oferta/`, EN `/en/services/` | `src/components/pages/ServicesPage.astro` | PageIntro, editorial intro, 4 usługi, context, ContactBand |
| O ClearStance | PL `/o-clearstance/`, EN `/en/about/` | `src/components/pages/AboutPage.astro` | PageIntro, story, perspective compass, ContactBand |
| Insights | PL `/insights/`, EN `/en/insights/` | `src/components/pages/InsightsPage.astro` | PageIntro, lista publikacji |
| Artykuł | PL/EN dynamiczne slugi | `src/layouts/ArticleLayout.astro` | header, opcjonalny obraz, aside/TOC, prose, share, publisher, related |
| Kontakt | PL `/kontakt/`, EN `/en/contact/` | `src/components/pages/ContactPage.astro` | PageIntro, dane, formularz, statement |
| Prywatność | PL/EN | `src/components/pages/PrivacyPage.astro` | PageIntro, tekst prawny |
| 404 | wspólna | `src/pages/404.astro` | PageIntro, dwie ścieżki językowe |
| Globalne | PL/EN | `Header.astro`, `Footer.astro`, `PageIntro.astro`, `ContactBand.astro` | nawigacja, stopka, intro podstron, CTA |

RSS, sitemap i endpointy nie mają warstwy wizualnej i nie wymagają rekomendacji assetowych. Panel `/admin/` jest narzędziem redakcyjnym; został oceniony wyłącznie pod kątem obsługi grafik Insights.

## 5. Obecny rytm wizualny

### Desktop 1440

Rytm jest dobry do końca `readiness-section`: jasna sekcja podejścia, cieplejsza oferta, ciemny cykl. Następnie pojawia się duże, generyczne zdjęcie, sekcja typograficzna i drugi pełnoszeroki obraz latarni. Ostatnia część strony wygląda przez to bardziej jak ciąg osobnych kampanijnych plansz niż jeden system redakcyjny.

### 1024 i 768

Największy problem stanowi `experience-panel`. Grid przechodzi na jedną kolumnę, a obraz zajmuje szerokość prawie całego viewportu i 410–500 px wysokości. Treść jest odsuwana poniżej, choć to tekst ma większą wartość informacyjną. Szkice oferty wciąż zajmują osobną kolumnę przy 1024 px; przy 768 px są już elementem długiego pionowego przepływu.

### Mobile 390

Numerowane listy i sekcje typograficzne skalują się dobrze. Problemem są:

- bardzo długi blok experience: obraz, duży nagłówek, opis, dwie ścieżki i CTA;
- statement z latarnią ma 430 px i wizualnie konkuruje z hero;
- każdy szkic usługi dodaje znaczną długość, mimo małej wartości semantycznej;
- Insights pozostaje czytelny, ale kolejne wpisy są wizualnie niemal identyczne.

## 6. Audyt sekcja po sekcji

Poniższa tabela dotyczy obu wersji językowych, o ile nie wskazano inaczej.

| Strona / sekcja | Obecny komponent | Obecny stan | Główny problem | Element wizualny | Rekomendowany rodzaj | Funkcja | Konkretna propozycja | Ikona Iconoir | Alternatywa | Priorytet | Ryzyko | Sugerowane wdrożenie | Pliki do późniejszej zmiany |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Global / Header | `Header.astro` | Logo, linki, language switcher, tekstowy arrow | Brak istotnego problemu | Nie | Brak | Zachować wzorzec hero | Nie dodawać ikon do nawigacji ani menu | — | — | — | Przeładowanie headera | Bez zmian | `src/components/navigation/Header.astro` |
| Home / Hero | `HomePage.astro` `.hero` | Zaakceptowana fotografia i kompozycja | Tylko techniczne: ciężki PNG fallback | Nie | Brak | Zachować główny motyw | Nie wymieniać obrazu, nie dodawać ikon | — | Mniejszy JPEG fallback po pomiarze | P3 tech | LCP, fallback | Zachować `<picture>`, AVIF/WebP i high priority | `src/components/sections/HomePage.astro`, `scripts/optimize-images.mjs` |
| Home / Featured Insight | `HomePage.astro` `.hero-featured` | Editorial strip z numeracją i strzałką | Bez problemu | Nie | Brak | Łączy hero z treścią | Pozostawić typograficzny | — | — | — | Ikona odciągnęłaby uwagę od tytułu | Bez zmian | `src/components/sections/HomePage.astro` |
| Home / Nasze podejście | `HomePage.astro` `.approach-section` | 2 kolumny, 3 numerowane zasady | Już ma dobrą hierarchię | Nie | Brak | Typografia tłumaczy model | Nie dodawać ikon ani zdjęcia | — | — | — | Grafika zdubluje numerację | Bez zmian | `src/components/sections/HomePage.astro`, `src/styles/global.css` |
| Home / Oferta skrócona | `HomePage.astro` `.services-section` | 4 bardzo podobne wiersze | Skanowanie opiera się wyłącznie na tytule i numerze | Tak | Ikony | Szybko różnicować zakresy | Jedna outline icon przy każdym tytule, stale widoczna | `network`, `test-tube`, `community`, `refresh-double` | `strategy`, `task-list`, `group`, `reports` | P1 | Zbyt „produktowe” karty | Inline SVG przez wrapper, 32–36 px | `HomePage.astro`, `translations.ts`, `global.css`, nowy `Icon.astro` |
| Home / Perspective note | `HomePage.astro` `.perspective-note` | Krótka nota i CTA | Działa jako spokojny oddech | Nie | Brak | Zachować rytm | Nie dodawać ship/airplane | — | — | — | Dosłowność | Bez zmian | `HomePage.astro` |
| Home / Cykl gotowości | `HomePage.astro` `.readiness-section` | 5 etapów, linia, punkty, sygnał coral | To już jest kompletna wizualizacja procesu | Nie | Brak nowych ikon | Pokazać sekwencję | Zachować numery, linię i jeden signal point | — | Małe ikony tylko jako odrzucony wariant | — | Pięć ikon zamieni sekcję w infografikę | CSS, bez nowych assetów | `HomePage.astro`, `global.css` |
| Home / Doświadczenie | `HomePage.astro` `.experience-section` | Duże zdjęcie „war room” + duży tekst | Generyczny obraz; dominuje na tabletach; powtórzony na About | Tak | 2 fotografie + 2 małe ikony | Wiarygodność i rozdzielenie domen | Para dokumentalna: detal pracy nawigacyjnej maritime + detal infrastruktury/operacji aviation; bez twarzy i ekranów | `compass`, `path-arrow` | Jedna fotografia 4:5 + mikrodiagram Dual Domain Route | P1 | Licencja, autentyczność, crop tablet/mobile | `<picture>` z osobnymi cropami; ikony przy `dt` | `HomePage.astro`, `translations.ts`, `global.css`, `public/images/` |
| Home / Jak pracujemy | `HomePage.astro` `.practice-section` | Opis i 4 zasady w układzie 2×2 | To zasady, nie proces sekwencyjny | Nie w wariancie B | Numery i linie | Zachować metodę bez fałszywej sekwencji | Pozostawić numerację; ewentualnie pogrupować w 2 fazy, jeśli treść kiedyś się zmieni | Kandydaci: `map`, `community`, `ruler`, `clipboard-check` | Sam numer i cienka reguła — rekomendowane | P2 | Ikony zasugerują kolejność, której copy nie opisuje | Bez ikon; drobna korekta linii tylko po testach | `HomePage.astro`, `global.css` |
| Home / „Gotowość porządkuje działanie” | `HomePage.astro` `.brand-statement` | Druga pełnoszeroka latarnia i bardzo duży tekst | Powtórzenie hero; zbyt duży ciężar i wysokość | Tak | Zwięzła grafika systemowa | Zmienić statement w wizualną syntezę, nie drugi hero | Usunąć fotografię; 4 symbole/miniwęzły: role, decyzje, eskalacja, przepływ; shared picture jako centralna rama | `group`, `check-circle`, `arrow-separate-vertical`, `data-transfer-both`; kandydat `view-grid` | Własny `shared-operating-picture` tylko po teście | P1 | Pięć ikon naraz przeładuje mobile | Inline SVG, max 4; min-height 360–400 px desktop, ok. 340 px mobile | `HomePage.astro`, `global.css`, `translations.ts` |
| Home / Insights | `HomePage.astro`, `HomeInsightTeaser.astro` | 3 kolumny typograficzne | Działa dobrze jako spokojna lista | Opcjonalnie | Brak miniatur w Home | Nie konkurować z indexem | Zachować Home bez thumbnail; system grafik pokazywać na indexie i artykułach | — | Mały category marker SVG, jeśli test wykaże potrzebę | P3 | Zbyt gęsta siatka | Bez zmian w wariancie B | `HomeInsightTeaser.astro` |
| Home / ContactBand | `ContactBand.astro` | Duży tekst i jedno CTA | Działa funkcjonalnie | Nie | Brak | Konwersja | Nie dodawać fotografii ani ikony formularza | — | `arrow-up-right` wyłącznie jako techniczne zastąpienie glyphu | P2 tech | Ikona ozdobna odciągnie od CTA | Wspólny link icon | `ContactBand.astro`, `Icon.astro` |
| Oferta / PageIntro | `PageIntro.astro` | Ciemny intro, CSS rings | Spójny z systemem | Nie | Brak | Wprowadzenie | Zachować | — | — | — | Dodatkowy visual stworzy trzeci motyw | Bez zmian | `PageIntro.astro`, `global.css` |
| Oferta / 4 usługi | `ServicesPage.astro` `.services-detail-list` | 4 długie wiersze i 4 duże szkice ludzi | Stockowy charakter, 1,22 MiB PNG, nierówne proporcje | Tak | Te same 4 ikony + linie systemowe | Rozróżnienie usług, krótszy layout | Usunąć osobną kolumnę szkicu; ikona 36–40 px przy numerze/tytule; zachować listę punktów | `network`, `test-tube`, `community`, `refresh-double` | 2–3 mikrodiagramy używane selektywnie między blokami, nie po jednym na usługę | P1 | Pusta kolumna po usunięciu obrazów | Przebudowa gridu 4→3 kolumny; inline SVG | `ServicesPage.astro`, `translations.ts`, `global.css`; później usunięcie 4 PNG |
| Oferta / Context | `ServicesPage.astro` `.context-section` | Ciemny typograficzny statement | Dobry kontrapunkt | Nie | Brak | Zamknięcie zakresu | Zachować bez grafiki | — | — | — | Grafika osłabi stanowczość | Bez zmian | `ServicesPage.astro` |
| About / PageIntro | `PageIntro.astro` variant about | Duży „From the bridge…” i rings | Dobry editorial hook | Nie | Brak | Pozycjonowanie | Zachować | — | — | — | Dosłowna łódź/samolot spłyci przekaz | Bez zmian | `PageIntro.astro` |
| About / Story | `AboutPage.astro` `.about-story` | Sticky fotografia użyta także na Home | Brak dowodu autentycznego doświadczenia; eager below intro | Tak | Fotografie dokumentalne + oś doświadczenia | Wiarygodność | Użyć tej samej pary maritime/aviation w innych cropach; krótka oś „bridge → aviation → advisory” bez dat, jeśli copy pozostaje bez zmian | `compass`, `path-arrow` | Własny `dual-domain-route` SVG | P1 | Portret może wyglądać autopromocyjnie; lazy loading | `<picture>` art-directed, `loading="lazy"`; opcjonalna oś w CSS/SVG | `AboutPage.astro`, `global.css`, `public/images/` |
| About / Perspective | `AboutPage.astro` `.about-perspective` | Własny kompas SVG + tekst | Najbardziej trafny własny visual poza hero | Nie | Zachować SVG | Budować język orientacji | Nie zastępować ikoną biblioteczną | — | — | — | Zmiana na gotową ikonę obniży unikalność | Zachować inline SVG, ujednolicić tokeny stroke przy wdrożeniu systemu | `AboutPage.astro`, `global.css` |
| Insights / Index | `InsightsPage.astro`, `InsightTeaser.astro` | Długie typograficzne rekordy; slot obrazu istnieje | Monotonia; brak systemowego fallbacku | Tak | Category visual / thumbnail | Ułatwić skanowanie i zbudować markę editorial | 3 bazowe mikroilustracje komponowane w 4 warianty kategorii; nie indywidualny obraz dla każdego wpisu | — | Dokumentalna fotografia tylko dla wyjątkowych materiałów | P1 | Ładowanie pełnego 1920 px w thumbnail; CLS przy przyszłych zmianach | Deterministyczny fallback + responsive raster derivatives | `InsightTeaser.astro`, `insights.ts`, schema, CMS, `global.css` |
| Insights / Article header | `ArticleLayout.astro` | Ciemny nagłówek; opcjonalny obraz 3:2 | Brak wymiarów w HTML i wariantów responsive | Tak, gdy wspiera temat | Editorial cover | Kontekst i sharing | Ten sam neutralny językowo visual dla pary PL/EN | — | Brak obrazu dla krótkiej noty | P1 tech | CLS, zbyt duży download, niewłaściwy OG crop | `picture/srcset/sizes`, width/height z build helpera | `ArticleLayout.astro`, `insights.ts`, `global.css` |
| Insights / Article prose | slot Markdown | Mocna typografia i TOC | Nie wymaga dekoracji | Nie domyślnie | Diagram tylko treściowy | Wyjaśnić konkretny model | Dodawać diagram wyłącznie, gdy tekst opisuje relację/proces trudny do zrozumienia | — | `decision-flow` lub `interface-map` | P2 | Dekoracyjny diagram obniży wiarygodność | Semantyczny `<figure>` z caption i alt | pliki `.md`, `global.css` |
| Insights / Share | `ArticleShare.astro` | Tekstowe linki i przyciski | Funkcjonalne, ale długie na mobile | Tak, małe | Ikony funkcyjne | Szybkie rozpoznanie akcji | Mail, copy, native share; nazwy tekstowe pozostają | `mail`, `copy`, `share-ios` | Tekst-only jest akceptowalny | P2 | Icon-only obniży zrozumiałość | 16–18 px, tekst + icon, kontrolka min. 44 px | `ArticleShare.astro`, `global.css`, `Icon.astro` |
| Kontakt / Dane | `ContactPage.astro` `.contact-details` | Email i lokalizacja z wyraźnymi labelami | Ikony nie są konieczne, ale mogą skrócić skanowanie | Tak, subtelne | Ikony funkcyjne | Szybko znaleźć kanał i miejsce | Ikona obok labela, nie obok dużej wartości | `mail`, `map-pin` | Brak ikon pozostaje poprawny | P2 | Dekoracyjność; email wrap | 18–20 px, `aria-hidden` przy istniejącym labelu | `ContactPage.astro`, `global.css`, `Icon.astro` |
| Kontakt / Formularz | `ContactPage.astro` `.contact-form` | Prosty formularz liniowy | Nie wymaga grafiki | Nie | Brak | Utrzymać skupienie | Nie dodawać ikon do pól ani przycisku | — | `arrow-up-right` tylko w CTA | — | Ikony pól tworzą SaaS look | Bez zmian | `ContactPage.astro` |
| Kontakt / Statement | `ContactPage.astro` `.contact-page-statement` | Ponownie `brand-statement.*` | Trzecie użycie latarni | Nie, po usunięciu zdjęcia | Typograficzny dark band | Zamknięcie bez powtarzania hero | Usunąć `<picture>`, zachować tekst na ink + subtelna reguła/point | — | Mały `compass`, lecz nie jest potrzebny | P1 | Zbyt pusty band po usunięciu obrazu | CSS-only, niższa wysokość 280–320 px | `ContactPage.astro`, `global.css` |
| Footer | `Footer.astro` | Logo, linki, lokalizacja, LinkedIn | Dobry hit area 44×44 dla LinkedIn | Nie poza funkcją | Zachować brand icon | Dostęp do social | Zachować istniejący LinkedIn jako wyjątek brandowy; nie mieszać go z ikonami semantycznymi | `linkedin` istnieje, ale nie rekomenduje się zamiany | Obecny oficjalny glyph | — | Zmiana brand glyphu bez potrzeby | Zachować `aria-label`, target i rel | `Footer.astro`, `global.css` |
| Prywatność | `PrivacyPage.astro` | Czytelny tekst prawny | Brak grafiki jest zaletą | Nie | Brak | Zaufanie i czytelność | Pozostawić typograficzną | — | — | — | Grafika wyglądałaby dekoracyjnie | Bez zmian | `PrivacyPage.astro` |
| 404 | `src/pages/404.astro` | Dwie ścieżki językowe | Wystarczające | Nie | Brak | Powrót do treści | Nie projektować osobnego assetu | — | — | P3 | Niepotrzebny koszt utrzymania | Bez zmian | `src/pages/404.astro` |
| CMS Insights | `public/admin/config.yml`, schema | `headerImage`, alt, `socialImage` już istnieją | Brak pola systemowego wariantu i automatycznego fallbacku | Tak | Pole `visualTheme` | Skalowalna publikacja | Enum 3 motywów + auto-mapowanie kategorii; manual image nadpisuje fallback | — | Mapowanie tylko po category | P1 | Niespójne nazwy kategorii PL/EN | Wspólny neutralny klucz tematu, walidacja content | `config.yml`, `insight-schema.ts`, `insights.ts`, tests |

## 7. Sekcja „Gotowość porządkuje działanie”

### Ocena

Tak — obecna sekcja wygląda jak powtórzenie hero. Używa:

- tego samego motywu latarni;
- podobnej ciemnej tonacji;
- pełnej szerokości;
- bardzo dużej typografii;
- wysokiego, pojedynczego panelu.

Jej rola powinna być inna: ma syntetyzować wniosek po sekcjach merytorycznych, nie ponownie budować atmosferę. Obraz należy usunąć, nie tylko przyciemnić. Zastąpienie go inną dużą fotografią stworzyłoby ten sam problem strukturalny.

### Rekomendowany wariant

- ciemne tło ink bez fotografii;
- headline zmniejszony z obecnego maksimum 67 px do ok. 50–58 px;
- cztery spokojne węzły lub symbole pod/obok tekstu;
- jedna pozioma linia lub rama łącząca pojęcia;
- pojedynczy coral point przy eskalacji;
- wysokość ok. 360–400 px desktop i 330–360 px mobile;
- brak hover: to treść, nie zestaw kart.

### Pojęcia i ikony

| Pojęcie | Iconoir | Ocena | Uwagi |
|---|---|---|---|
| Role | `group` | Bardzo dobre | Czytelne przy 32 px; nie używać w kole |
| Decyzje | `check-circle` | Dobre | Unikać interpretacji „compliance”; podpis jest konieczny |
| Eskalacja | `arrow-separate-vertical` | Dobre jako prototyp | Jeśli test semantyczny zawiedzie, własny `escalation-threshold` |
| Wspólny obraz sytuacji | `view-grid` | Średnie | Lepszy może być centralny mikrodiagram zamiast piątej ikony |
| Przepływ informacji | `data-transfer-both` | Bardzo dobre | Czytelny kierunek dwustronny |

Nie pokazywać wszystkich pięciu jednocześnie. Rekomendowany zestaw widoczny to cztery symbole; „wspólny obraz” powinien być reprezentowany przez wspólną ramę/kompozycję całej sekcji.

## 8. Sekcja oferty

### Cztery obszary i jedna rodzina ikon

| Obszar | Ikona | Dlaczego działa | Ryzyko dosłowności | Alternatywa | Widoczność |
|---|---|---|---|---|---|
| System zarządzania kryzysowego | `network` | Pokazuje połączenia i strukturę, nie „ochronę” | Niskie | `strategy` | Stale |
| Ćwiczenia i symulacje | `test-tube` | Sugeruje bezpieczne testowanie założeń | Średnie; może kojarzyć się laboratoryjnie | `task-list` | Stale |
| Facylitacja | `community` | Pokazuje wspólną pracę bez uścisku dłoni | Niskie | `group` | Stale |
| Przeglądy i doskonalenie | `refresh-double` | Pokazuje cykl uczenia i powtórnego sprawdzenia | Niskie | `reports` | Stale |

Ikony nie powinny ujawniać się wyłącznie na hover. Hover nie istnieje na ekranach dotykowych, a ikona ma pełnić funkcję orientacyjną. Ruch ograniczyć do wspólnego linku/CTA; same ikony usług pozostają statyczne.

Na stronie głównej ikony mogą mieć 32–36 px. Na podstronie Oferta 36–40 px, ale bez osobnej szerokiej kolumny ilustracyjnej. Obecne cztery PNG należy docelowo usunąć dopiero po akceptacji i wdrożeniu nowego układu.

## 9. Sekcja „Jak pracujemy”

Treść opisuje cztery cechy sposobu pracy, a nie cztery następujące po sobie fazy. Dlatego:

- nie rekomenduje się klasycznej osi procesu;
- nie należy dodawać strzałek łączących wszystkie punkty;
- numeracja i reguły są wystarczające;
- na mobile pionowa lista jest właściwa;
- na desktop obecne 2×2 jest bardziej wiarygodne niż „PowerPoint timeline”.

Wymagane kandydatury ikon do testu:

| Krok/zasada | Kandydat Iconoir | Alternatywa | Decyzja |
|---|---|---|---|
| Kontekst operacyjny | `map` | `compass` | Nie wdrażać w B; numer wystarcza |
| Wspólna praca | `community` | `group` | Nie wdrażać w B |
| Proporcjonalny zakres | `ruler` | `scale-frame-reduce` | Nie wdrażać w B |
| Ustalenia do wykorzystania | `clipboard-check` | `check-circle` | Nie wdrażać w B |

Jeżeli treść zostanie kiedyś zmieniona na realny proces, wtedy właściwy byłby układ numer + punkt kontrolny + krótka linia, nadal bez czterech ikon.

## 10. Sekcja doświadczenia

### Ocena siedmiu wariantów

| Wariant | Ocena | Wniosek |
|---|---|---|
| 1. Pozostawienie obecnego zdjęcia | Odrzucony | Technicznie zoptymalizowane, ale koncepcyjnie generyczne i sprzeczne z briefem |
| 2. Korekta obecnego zdjęcia | Odrzucony | Crop i grading nie usuną inscenizowanej sali, mapy i anonimowego „sztabu” |
| 3. Jedno nowe zdjęcie dokumentalne | Dobre minimum | Proste wdrożenie, ale słabiej pokazuje dwie domeny |
| 4. Dwa mniejsze zdjęcia maritime i aviation | Rekomendowane | Najlepiej uzasadnia doświadczenie i równoważy tekst |
| 5. Zdjęcie + mikro-grafika | Dobre | Właściwe dla About, niekoniecznie dla Home |
| 6. Sama ilustracja | Opcjonalne | Mniejsza wiarygodność niż autentyczna fotografia |
| 7. Tylko małe ikony domen | Zbyt słabe | Nie wystarczą do zbudowania wiarygodności sekcji |

### Specyfikacja fotografii

#### Maritime

- temat: detal pracy nawigacyjnej, chart table, instrument pomiarowy, widok z mostka lub poziomy horyzont;
- bez czytelnych nazw, ekranów z mapami i pozowanych ludzi;
- tonacja: naturalne chłodne światło dzienne, paper/steel/navy;
- master: min. 1800×2400 dla cropu 4:5;
- produkcja: AVIF + WebP 640/960/1280;
- mobile: osobny landscape crop 16:11 lub centralny 4:3;
- licencja: własna sesja, commissioned photography albo stock z licencją komercyjną i prawem do cropów; zachować dowód licencji.

#### Aviation

- temat: detal operacyjny płyty lotniska, oznaczenie drogi kołowania, światła nawigacyjne, fragment infrastruktury lub praca z dokumentacją operacyjną;
- nie używać turystycznej sylwetki samolotu, terminalowego lifestyle ani kokpitu z neonowym panelem;
- te same parametry formatu i licencji;
- neutralny obraz może być współdzielony przez PL/EN.

### Layout

- desktop 1440: dwa pionowe kadry 4:5 lub jeden większy + wąski detal;
- 1024/768: nie renderować jednego obrazu na pełną szerokość i 500 px wysokości; para może przejść w układ 2×1 nad krótszym tekstem albo jeden obraz 16:9 z drugim jako detail inset;
- mobile: obraz 16:11 przed tekstem, drugi niżej przy trackach albo w przewijanym układzie bez autoplay;
- ikony `compass` i `path-arrow` tylko przy nazwach domen.

## 11. Insights

### Obecny stan

- schema ma `headerImage`, `headerImageAlt` i `socialImage`;
- CMS zapisuje media pod `public/images/insights`;
- upload rastera jest konwertowany do WebP, quality 84, max. 1920×1920;
- alt jest wymagany, gdy istnieje `headerImage`;
- `InsightTeaser` potrafi pokazać thumbnail;
- `ArticleLayout` potrafi pokazać header image;
- wszystkie obecnie opublikowane wpisy nie mają `headerImage`;
- pojedynczy plik `public/images/insights/screenshot-2026-07-26-at-11-30-23.webp` jest nieużywany;
- domyślny OG ma 1200×630.

### Rekomendowany system

Nie projektować ręcznie nowej grafiki dla każdego wpisu. Wprowadzić trzy bazowe, neutralne językowo mikroilustracje:

1. `situation-field` — warstwy danych składające się we wspólny obraz;
2. `decision-route` — węzły, próg i ścieżka decyzji;
3. `interface-map` — zależności, handover i granice odpowiedzialności.

Z tych trzech źródeł tworzyć warianty przez:

- zmianę położenia jednego coral point;
- zmianę kadru;
- wybór 1 z 2 układów linii;
- bez tekstu i bez osobnych wersji PL/EN.

Mapowanie przykładowe:

| Kategoria | Motyw domyślny |
|---|---|
| Crisis Management | `situation-field` |
| Crisis Communication | `decision-route` z przepływem wychodzącym |
| Exercises & Simulations | `decision-route` z punktami kontrolnymi |
| Business Continuity | `interface-map` |

### CMS

Dodać w przyszłości pole:

```yaml
- label: Motyw wizualny / Visual theme
  name: visualTheme
  widget: select
  required: false
  options:
    - situation-field
    - decision-route
    - interface-map
```

Priorytet rozstrzygania:

1. `headerImage` ustawiony ręcznie;
2. `visualTheme`;
3. mapowanie z normalizowanej kategorii;
4. typograficzny fallback bez pustej ramki.

Nie uzależniać fallbacku wyłącznie od literalnej nazwy kategorii, ponieważ kategorie PL/EN oraz istniejące `Exercises & Simulations` / `Ćwiczenia i symulacje` są niespójne językowo.

### Proporcje i outputy

- thumbnail/index: 3:2, produkcja 720×480 i 1080×720;
- article: 3:2, 1200×800 i 1600×1067;
- social: osobny 1200×630;
- AVIF primary + WebP fallback na stronie;
- WebP dla social;
- te same źródła wizualne PL/EN;
- limit docelowy: 80 KiB thumbnail, 160 KiB article, 180 KiB social.

## 12. Podstrona „O ClearStance”

### Zdjęcie osobiste

Portret może zwiększyć zaufanie, ponieważ działalność jest niezależną praktyką, ale tylko jeśli:

- pokazuje rzeczywistą osobę prowadzącą działalność;
- jest wykonany dokumentalnie, bez typowej pozy „consulting headshot”;
- copy oraz dane firmy jasno wskazują osobisty charakter praktyki;
- użytkownik akceptuje większe pozycjonowanie marki przez założyciela.

Portret nie jest rekomendacją P1. Najpierw potrzebne są dwa dowody kontekstu operacyjnego. Portret jest P3 i wymaga osobnej decyzji po ocenie wpływu na markę.

### Rekomendowana ścieżka doświadczenia

Na About warto wykorzystać:

- dwie dokumentalne fotografie z Home, ale w innych cropach;
- krótką, nienachalną oś: maritime responsibility → aviation analysis/strategy → ClearStance advisory;
- istniejący kompas jako punkt kulminacyjny.

Oś może być zbudowana w CSS z tekstem i punktami. Nie wymaga ikon. Opcjonalny `dual-domain-route` powinien powstać dopiero, jeśli dwa zdjęcia i oś nie dają wystarczającego połączenia.

## 13. Kontakt i footer

- Email i lokalizacja mają już tekstowe etykiety, więc ikony są dekoracyjne z punktu widzenia dostępności (`aria-hidden="true"`).
- Nie dodawać ikon do każdego pola formularza.
- Nie dodawać ikony formularza przy nagłówku.
- `mail` i `map-pin` mogą mieć 18–20 px i znajdować się przy małych labelach.
- Przycisk submit powinien zachować tekst; strzałka może być `arrow-up-right`, ale nie jako jedyny label.
- LinkedIn ma prawidłowe `aria-label`, `target`, `rel` i obszar 44×44 px. Obecny brand glyph należy zachować jako wyjątek od biblioteki semantycznej.
- Linki nawigacji w stopce powiększają obszar aktywny pseudo-elementem; focus state jest obecny.
- Powtórzona latarnia w contact statement powinna zostać usunięta. Ciemny band tekstowy wystarczy.

## 14. Porównanie bibliotek ikon

Stan pakietów sprawdzono 30 lipca 2026. Źródła: [Iconoir introduction](https://iconoir.com/docs/introduction), [Iconoir React defaults](https://iconoir.com/docs/packages/iconoir-react), [Iconoir MIT license](https://github.com/iconoir-icons/iconoir/blob/main/LICENSE), [Lucide repository and packages](https://github.com/lucide-icons/lucide), [Tabler Astro package](https://tabler.io/blog/tabler-icons-astro), [Tabler icon rules](https://tabler.io/icons), [Phosphor core](https://github.com/phosphor-icons/core).

| Kryterium | Iconoir | Lucide | Tabler | Phosphor |
|---|---|---|---|---|
| Dopasowanie do ClearStance | Najlepsze: cienkie, techniczne, spokojne | Dobre, bardziej uniwersalne UI | Dobre, bardziej narzędziowe/dashboard | Średnie, bardziej ekspresyjne |
| Siatka | 24×24 | 24×24 | 24×24 | 256×256 |
| Domyślny stroke | 1.5 | 2 | 2 | Wiele wag |
| `currentColor` | Tak | Tak | Tak | Tak |
| Sterowanie stroke | Tak | Tak | Tak | Przez weight/styl |
| Linecap/linejoin | Spójne, round | Spójne, round | Spójne, round | Zależne od wagi |
| Jakość przy 32–40 px | Bardzo dobra | Bardzo dobra | Bardzo dobra | Dobra |
| Potrzebne symbole | Wystarczające; zweryfikowano konkretne nazwy | Bardzo szerokie | Najszersze | Bardzo szerokie |
| Oficjalny pakiet Astro | Nie | Tak: `@lucide/astro` | Tak: `@tabler/icons-astro` | Nie |
| Zalecany pakiet dla tego stacku | `iconoir` SVG | `@lucide/astro` | `@tabler/icons-astro` | `@phosphor-icons/core` |
| Import pojedynczych ikon | Tak, pojedyncze pliki SVG | Tak, komponenty | Tak, komponenty | Tak, pojedyncze SVG |
| Tree shaking / payload | Jawne statyczne importy | `sideEffects: false` | `sideEffects: false` | Jawne statyczne importy |
| Hydration | Niepotrzebna | Niepotrzebna | Niepotrzebna | Niepotrzebna |
| Licencja | MIT | ISC | MIT | MIT |
| Komercyjne użycie | Tak | Tak | Tak | Tak |
| Ryzyko stylistyczne | Niskie | Może wyglądać jak standardowy SaaS | Może wyglądać jak dashboard | Zmienność wag i bardziej „friendly” charakter |
| Koszt integracji | Mały wrapper Astro | Najniższy | Najniższy | Wrapper + wybór wagi |

### Decyzja

Wybrać Iconoir.

Brak natywnego pakietu Astro nie uzasadnia zmiany biblioteki, ponieważ oficjalny pakiet `iconoir` eksportuje pojedyncze SVG. W Astro można je importować statycznie bez Reacta i bez runtime JS. Domyślne 1.5 px oraz geometria lepiej odpowiadają obecnemu kompasowi, logo i cienkim liniom layoutu.

Nie używać:

- CSS icon fontu Iconoir;
- importu całej biblioteki;
- `iconoir-react`, ponieważ projekt nie używa Reacta;
- kilku bibliotek równolegle.

Lucide jest alternatywą, jeśli prototyp wrappera ujawni problem z importem SVG lub typami w Astro/Vite. Technicznie `@lucide/astro` jest prostsze, ale wizualnie wymaga globalnego stroke 1.5 i bardziej selektywnego wyboru ikon.

## 15. Audyt obecnych ikon i SVG

### Inwentaryzacja

| Element | Lokalizacja | Styl | Ocena |
|---|---|---|---|
| Logo | `src/components/ui/Logo.astro` | Własny inline SVG | Zachować |
| Kompas About | `src/components/pages/AboutPage.astro` | Własny outline 1 px + coral dot | Zachować; punkt odniesienia dla mikroilustracji |
| LinkedIn | `src/components/layout/Footer.astro` | Wypełniony brand glyph | Zachować jako wyjątek brandowy |
| Strzałki CTA | wiele komponentów | Znaki `↗`, `→`, `↓`, `←` | Ujednolicić poza hero/headerem w P2 |
| Menu mobile | CSS lines | Funkcjonalny custom control | Zachować |
| PageIntro rings | `global.css` | CSS circles | Zachować |

### Wnioski

- nie istnieje biblioteka ikon w zależnościach;
- nie ma niespójnego zbioru wielu paczek;
- własne SVG używają `currentColor` tylko częściowo; kompas ma tokeny w CSS;
- dekoracyjne SVG są prawidłowo ukrywane lub osadzone w kontrolce z labelem;
- nie ma animowanych ikon;
- reduced motion jest globalnie obsługiwane;
- przyszły wrapper powinien wymusić jeden kontrakt dostępności.

## 16. Mapa rekomendowanych ikon

Wszystkie nazwy poniżej istnieją w katalogu Iconoir regular 7.11.1.

| ID | Obszar | Pojęcie | Proponowana ikona | Biblioteka | Alternatywa | Ocena dopasowania | Uwagi |
|---|---|---|---|---|---|---|---|
| ICO-01 | Oferta | System i struktura | `network` | Iconoir | `strategy` | 5/5 | Główna ikona usługi |
| ICO-02 | Oferta | Testowanie założeń | `test-tube` | Iconoir | `task-list` | 4/5 | Podpis zapobiega skojarzeniu laboratoryjnemu |
| ICO-03 | Oferta | Facylitacja | `community` | Iconoir | `group` | 5/5 | Bez uścisku dłoni |
| ICO-04 | Oferta | Doskonalenie | `refresh-double` | Iconoir | `reports` | 5/5 | Cykl, nie growth chart |
| ICO-05 | Statement | Role | `group` | Iconoir | `community` | 4/5 | Stale widoczna |
| ICO-06 | Statement | Decyzje | `check-circle` | Iconoir | `clipboard-check` | 4/5 | Nie używać bez podpisu |
| ICO-07 | Statement | Eskalacja | `arrow-separate-vertical` | Iconoir | własny `escalation-threshold` | 4/5 | Najpierw test przy 32 px |
| ICO-08 | Statement | Wspólny obraz | `view-grid` | Iconoir | własny `shared-operating-picture` | 3/5 | Raczej kandydat niż piąta widoczna ikona |
| ICO-09 | Statement | Przepływ informacji | `data-transfer-both` | Iconoir | `network-right` | 5/5 | Dobrze czytelna kierunkowo |
| ICO-10 | Experience | Maritime | `compass` | Iconoir | `navigator` | 5/5 | Subtelna, niedosłowna |
| ICO-11 | Experience | Aviation/route | `path-arrow` | Iconoir | `maps-arrow-diagonal` | 4/5 | Bez samolotu |
| ICO-12 | CTA poza hero/header | Przejście do kolejnego widoku | `arrow-up-right` | Iconoir | `nav-arrow-right` | 5/5 | Dekoracyjna przy tekście |
| ICO-13 | Kontakt/share | Email | `mail` | Iconoir | `send-mail` | 5/5 | 18–20 px |
| ICO-14 | Kontakt | Lokalizacja | `map-pin` | Iconoir | `pin` | 5/5 | Przy istniejącym labelu |
| ICO-15 | Share | Kopiowanie | `copy` | Iconoir | — | 5/5 | Tekst przycisku pozostaje |
| ICO-16 | Share | System share | `share-ios` | Iconoir | `share-android` | 4/5 | Można wybrać neutralniejszy po teście platform |

Łącznie: 16 unikalnych rekomendowanych ikon bibliotecznych. Ta liczba nie oznacza 16 ikon na jednej stronie ani automatycznego ozdabiania każdego bloku.

## 17. Ikony potencjalnie wymagające własnego SVG

| ID | Nazwa robocza | Kiedy tworzyć | Konstrukcja |
|---|---|---|---|
| CUS-01 | `escalation-threshold` | Tylko jeśli `arrow-separate-vertical` jest interpretowane jako rozdzielenie, nie eskalacja | 24×24; dolna ścieżka, jawny próg, jeden kierunek do wyższego poziomu; 1.5 px, round |
| CUS-02 | `shared-operating-picture` | Tylko jeśli `view-grid` jest zbyt UI/dashboard | 24×24; 3 wejścia zbiegające się w jedną ramę z jednym punktem; 1.5 px, round |

Nie tworzyć innych custom icons w wariancie B. Najpierw przygotować optyczne zestawienie kandydatów Iconoir przy 24, 32 i 40 px.

## 18. Audyt techniczny obrazów

### Inventory i ciężar

| Grupa | Format/warianty | Łączny rozmiar orientacyjny | Ocena |
|---|---|---:|---|
| Hero desktop/mobile | AVIF, WebP, PNG masters | ok. 4,3 MiB w repo; przeglądarka pobiera jeden wariant | Produkcyjnie dobrze; masters są ciężkimi fallbackami |
| `operational-briefing` | JPG + WebP 640/960/1440/1920 | ok. 377 KiB | RETIRED — usunięte 31 lipca 2026 |
| `brand-statement` | JPG + WebP 640/960/1440/1920 | ok. 236 KiB | RETIRED — usunięte 31 lipca 2026 |
| 4 szkice usług | PNG alpha | ok. 1,22 MiB | Zbyt ciężkie względem display size |
| Insights orphan | WebP 1919×1248 | 149 KiB | Brak referencji; nie usuwać bez decyzji |
| Default OG | WebP 1200×630 | 23 KiB | Lekki; spójność zależna od hero |

### Ładowanie

- Hero: prawidłowe AVIF/WebP, desktop/mobile sources, `sizes="100vw"`, `fetchpriority="high"`, jawne wymiary.
- Hero fallback PNG ma 1,65 MiB desktop i 2,0 MiB mobile. Współczesne przeglądarki wybiorą source, ale po pomiarze można rozważyć lżejszy JPEG fallback bez zmiany kompozycji.
- Experience Home: `loading="lazy"`, poprawny `srcset`, `sizes`, wymiary i `object-fit`.
- About: ten sam obraz ma `loading="eager"`, choć znajduje się po wysokim PageIntro. Rekomendowane `lazy` po pomiarze LCP.
- Brand statement i Contact: `loading="lazy"`, `srcset`, wymiary i stabilna wysokość.
- Szkice: `loading="lazy"` i `decoding="async"`, ale brak responsywnych wariantów. Raster 1200 px jest pobierany dla display ok. 230–330 px.
- Insight thumbnail: lazy/async i stabilny wrapper aspect-ratio, ale brak `srcset/sizes`.
- Article header image: brak `width/height` w HTML i brak wariantów; pełny CMS upload może zostać pobrany na mobile.
- `scripts/optimize-images.mjs` nadal generuje domyślny OG z `hero-navigation.jpg`, podczas gdy zaakceptowany hero używa rodziny `hero-lighthouse-horizon-*`. Skrypt i social image są więc niespójne z bieżącym hero i wymagają aktualizacji bez zmiany samego hero.
- Ten sam skrypt nie opisuje generowania aktualnych AVIF/mobile cropów hero. Przed kolejną regeneracją assetów trzeba rozdzielić pipeline hero od pipeline pozostałych zdjęć, aby przypadkowo nie nadpisać zaakceptowanych plików.

### CLS

- główne obrazy Home mają wymiary i stabilne kontenery;
- przyszłe article images wymagają jawnych wymiarów z istniejącego helpera `getPublicImageDimensions`;
- thumbnail wrapper rezerwuje proporcję, ale warto przekazywać rozmiary również do `<img>`;
- art-directed cropy powinny mieć osobne width/height przy `<source>`, a kontener stały `aspect-ratio`.

### Alt text

- hero i experience mają lokalizowane alt text;
- contact statement poprawnie używa `alt=""`, bo obraz jest dekoracyjny;
- brand statement ma opisową alternatywę, ale obraz jest tłem pod pełną tezą i nie wnosi niezależnej informacji. Jeśli pozostanie, powinien mieć `alt=""`;
- schema wymaga `headerImageAlt`, co należy zachować;
- techniczne diagramy wymagają alt opisującego wniosek, nie wygląd; dekoracyjne patterny powinny mieć `aria-hidden`.

### Format docelowy

- zdjęcia: AVIF primary, WebP fallback, JPEG tylko jako source/archive lub najprostszy fallback;
- mikroilustracje: inline SVG albo zoptymalizowane pliki SVG;
- miniatury/social: rasterowe AVIF/WebP wygenerowane z neutralnych źródeł SVG;
- nie używać CSS background dla treściowego zdjęcia;
- background SVG tylko dla dekoracyjnego patternu, z `aria-hidden` po stronie kontenera.

## 19. Audyt ilustracji i mikro-grafik

### Istniejący kierunek

Kompas About i CSS rings są najlepszym punktem wyjścia. Mają:

- ograniczoną geometrię;
- jeden sygnał coral;
- spokojny stroke;
- brak narracji z udziałem generycznych postaci;
- dobre zachowanie light/dark.

### Trzy rekomendowane mikroilustracje

| ID | Nazwa | Funkcja | Forma | Miejsca |
|---|---|---|---|---|
| MIC-01 | Situation Field | Wspólny obraz sytuacji | Nakładające się ramy/dane zbiegające się w jeden czytelny obszar | Insights, opcjonalnie statement |
| MIC-02 | Decision Route | Decyzje i eskalacja | Ścieżka, próg, punkt kontrolny, pojedynczy coral signal | Insights, artykuł o ćwiczeniach/komunikacji |
| MIC-03 | Interface Map | Granice odpowiedzialności i handover | Węzły po obu stronach granicy i kontrolowane przekazanie | Insights, artykuł o continuity |

Zasady:

- viewBox zależny od layoutu, np. 320×220;
- stroke 1–1.5 px przy wielkości docelowej;
- bez drobnego pseudo-tekstu;
- maks. 2 poziomy opacity;
- maks. 1 coral point;
- źródło wektorowe; raster tylko jako output thumbnail/social;
- ten sam asset PL/EN.

## 20. Docelowa specyfikacja systemu ikon

| Element | Specyfikacja |
|---|---|
| Biblioteka | Iconoir regular |
| Pakiet | `iconoir` 7.11.x; nie `iconoir-react`, nie CSS font |
| Integracja | Statyczne importy pojedynczych SVG w Astro |
| Wrapper | `src/components/ui/Icon.astro` |
| Manifest | `src/lib/icon-map.ts` z jawną allowlistą użytych ikon |
| Import | np. `iconoir/icons/network.svg?raw`; żadnego dynamicznego importu całego katalogu |
| Hydration | Brak |
| ViewBox | 24×24 |
| Stroke | 1.5 |
| Fill | none |
| Linecap | round |
| Linejoin | round |
| Kolor | currentColor |
| UI/link | 16–18 px wewnątrz kontrolki min. 44×44 |
| Label/kontakt | 18–20 px |
| Sekcja mobile | 28–32 px |
| Sekcja desktop | 32–40 px |
| Wariant ilustracyjny | 48–64 px, maks. jeden na blok |
| Minimalny rozmiar | 16 px; nie używać 1.5 px stroke poniżej tej wartości |
| Odstęp icon → heading | 14–18 px |
| Heading → description | 8–12 px |
| Jasne tło | `var(--teal-deep)` lub `var(--ink)` z opacity min. zapewniającą 3:1 dla grafiki istotnej |
| Ciemne tło | `#91aaa5`; white tylko aktywne/funkcyjne |
| Coral | Wyłącznie punkt stanu/progu; nie pełna ikona |
| Hover | Zmiana `color`; ewentualny translate do 2 px tylko w linku |
| Focus | Focus na kontrolce, nie na dekoracyjnym SVG |
| Reduced motion | Brak obowiązkowej animacji; istniejąca media query wystarcza |
| Karty/usługi | Ikona stale widoczna; bez kolorowych kół i bez osobnego koloru na usługę |
| Procesy | Najpierw numery i linia; ikony tylko gdy kroki są semantycznie różne |
| Linki | Ikona po tekście; nigdy jedyny nośnik znaczenia |
| Maksymalna liczba | 4 w jednej sekcji desktop; maks. 3 jednocześnie w typowym mobile viewport |
| Custom SVG | Ten sam 24×24 grid, stroke 1.5, round; dodane do tego samego manifestu |
| Dekoracyjne | `aria-hidden="true"`, `focusable="false"` |
| Funkcyjne | Accessible name na linku/buttonie; SVG może pozostać ukryte |
| Informacyjne standalone | `role="img"` + `aria-labelledby` i krótki `title` |
| Nazewnictwo | ID domenowe w treści, nazwa pliku zgodna z Iconoir; custom: `clearstance-{concept}.svg` |

## 21. Mapa wszystkich rekomendowanych assetów

| ID | Nazwa | Typ | Miejsce użycia | Funkcja | Opis / źródło | Format | Warianty |
|---|---|---|---|---|---|---|---|
| A-01 | Network | Ikona biblioteczna | Oferta Home/Services | System | Iconoir `network` | inline SVG | light/dark przez currentColor; bez PL/EN |
| A-02 | Test Tube | Ikona biblioteczna | Oferta | Ćwiczenia | Iconoir `test-tube` | inline SVG | jw. |
| A-03 | Community | Ikona biblioteczna | Oferta | Facylitacja | Iconoir `community` | inline SVG | jw. |
| A-04 | Refresh Double | Ikona biblioteczna | Oferta | Doskonalenie | Iconoir `refresh-double` | inline SVG | jw. |
| A-05 | Group | Ikona biblioteczna | Statement | Role | Iconoir `group` | inline SVG | dark |
| A-06 | Check Circle | Ikona biblioteczna | Statement | Decyzje | Iconoir `check-circle` | inline SVG | dark |
| A-07 | Arrow Separate Vertical | Ikona biblioteczna | Statement | Eskalacja | Iconoir | inline SVG | dark |
| A-08 | View Grid | Ikona biblioteczna/kandydat | Statement | Shared picture | Iconoir | inline SVG | dark |
| A-09 | Data Transfer Both | Ikona biblioteczna | Statement | Informacja | Iconoir | inline SVG | dark |
| A-10 | Compass | Ikona biblioteczna | Experience | Maritime | Iconoir | inline SVG | light |
| A-11 | Path Arrow | Ikona biblioteczna | Experience | Aviation route | Iconoir | inline SVG | light |
| A-12 | Arrow Up Right | Ikona biblioteczna | CTA poza hero/header | Kierunek | Iconoir | inline SVG | light/dark |
| A-13 | Mail | Ikona biblioteczna | Contact/Share | Kanał | Iconoir | inline SVG | light |
| A-14 | Map Pin | Ikona biblioteczna | Contact | Lokalizacja | Iconoir | inline SVG | light |
| A-15 | Copy | Ikona biblioteczna | Share | Akcja | Iconoir | inline SVG | light |
| A-16 | Share iOS | Ikona biblioteczna | Share | Akcja | Iconoir | inline SVG | light |
| A-17 | Escalation Threshold | Potencjalny custom icon | Statement | Precyzyjna eskalacja | Projekt indywidualny tylko po teście | inline SVG | dark; bez PL/EN |
| A-18 | Shared Operating Picture | Potencjalny custom icon | Statement | Wspólny obraz | Projekt indywidualny tylko po teście | inline SVG | dark; bez PL/EN |
| A-19 | Situation Field | Mikroilustracja | Insights / statement | Warstwy informacji | Autorski SVG; może być projektowany/generowany i ręcznie oczyszczony | SVG + AVIF/WebP | article 3:2, social 1.91:1; PL/EN wspólne |
| A-20 | Decision Route | Mikroilustracja | Insights | Decyzja/ćwiczenie | Autorski SVG | SVG + AVIF/WebP | jw. |
| A-21 | Interface Map | Mikroilustracja | Insights | Handover/continuity | Autorski SVG | SVG + AVIF/WebP | jw. |
| A-22 | Maritime documentary | Fotografia | Home Experience, About | Wiarygodność | Własna/commissioned/licencjonowana; prawa wymagane | AVIF/WebP + master | 4:5 desktop, 16:11 mobile; PL/EN wspólne |
| A-23 | Aviation documentary | Fotografia | Home Experience, About | Druga domena | Własna/commissioned/licencjonowana; prawa wymagane | AVIF/WebP + master | jw. |
| A-24 | Insight category thumbnails | Outputy systemowe | Insights index | Skanowanie | Generowane z A-19–A-21 | AVIF/WebP | 720×480, 1080×720 |
| A-25 | Insight social variants | Outputy systemowe | OG/Twitter | Sharing | Generowane z A-19–A-21 | WebP | 1200×630 |
| A-26 | Dual Domain Route | Opcjonalny mikrodiagram | About | Połączenie domen | CSS/SVG, tylko jeśli fotografie + oś nie wystarczą | SVG | responsive; PL/EN wspólny |

Assety A-17, A-18 i A-26 są warunkowe. Nie należy ich projektować przed review prototypu Iconoir i layoutu About.

## 22. Trzy warianty rozwoju

### Wariant A — minimalny

Zakres:

- Iconoir;
- 10–12 unikalnych ikon;
- 4 ikony usług;
- małe ikony kontakt/share;
- usunięcie powtórzonego zdjęcia z Contact;
- historyczny wariant zakładał zachowanie `operational-briefing`;
- jeden wspólny fallback graficzny Insights;
- brak custom SVG i brak nowych zdjęć.

Zalety:

- niski koszt;
- szybkie wdrożenie;
- małe ryzyko techniczne.

Wady:

- generyczne zdjęcie doświadczenia pozostaje;
- About nadal powtarza Home;
- Insights ma tylko jeden wzór;
- poprawa marki jest ograniczona.

Trudność: niska.
Czas: 1 krótka iteracja implementacyjna.
Wydajność: poprawa po usunięciu 4 PNG.
Utrzymanie: proste.
Nowe assety: ok. 12 ikon + 1 mikroilustracja, 0 zdjęć.
Komponenty: `Icon.astro`, Home, Services, Contact, Share, Insights.

### Wariant B — rekomendowany

Zakres:

- Iconoir;
- 16 unikalnych ikon;
- maks. 2 warunkowe custom icons;
- 3 mikroilustracje bazowe;
- 2 fotografie dokumentalne;
- system category visual dla Insights;
- usunięcie dodatkowych latarni poza hero;
- zastąpienie szkiców usług ikonami;
- responsive derivatives i poprawa wymiarów obrazów.

Zalety:

- największa poprawa jakości przy kontrolowanym zakresie;
- własny język operacyjno-redakcyjny;
- wiarygodne doświadczenie maritime/aviation;
- skalowalny CMS;
- hero pozostaje unikalny.

Wady:

- wymaga wyboru/licencjonowania dwóch fotografii;
- wymaga zaprojektowania trzech źródeł SVG i pipeline outputów;
- wymaga zmian gridu Services i Experience.

Trudność: średnia.
Czas: 2–3 iteracje projektowo-implementacyjne.
Ryzyko: jakość fotografii i zbyt dekoracyjne mikrodiagramy.
Wydajność: neutralna lub lepsza przy przestrzeganiu budżetów.
Utrzymanie: dobre dzięki trzem motywom i jednemu wrapperowi.
Nowe assety: 16 ikon, 0–2 custom icons, 3 mikroilustracje, 2 fotografie oraz ich outputy.
Komponenty: Home, Services, About, Insights, Article, Contact, Share, CMS, image script.

### Wariant C — najbardziej autorski

Zakres:

- Iconoir jako baza konstrukcyjna;
- 24–30 ikon;
- 6–8 własnych ikon;
- 8–12 mikroilustracji;
- indywidualne okładki dla najważniejszych artykułów;
- 3–4 sesje fotograficzne;
- rozbudowane diagramy w artykułach.

Zalety:

- wysoka rozpoznawalność;
- szeroki, autorski system;
- mocna linia editorial.

Wady:

- duży koszt i ryzyko niespójności;
- wyższy próg utrzymania;
- łatwo przeładować spokojny layout;
- CMS wymaga większej dyscypliny.

Trudność: wysoka.
Czas: wieloetapowy projekt.
Wydajność: wymaga ścisłego budżetu i generowania wariantów.
Utrzymanie: średnie/trudne.
Nowe assety: ok. 40–50 elementów i outputów.
Komponenty: większość komponentów sekcyjnych oraz rozbudowany pipeline.

### Rekomendacja

Wariant B. Wariant A nie rozwiązuje dwóch najsłabszych punktów — fotografii doświadczenia i monotonii Insights. Wariant C byłby nieproporcjonalny do spokojnego charakteru marki i obecnej skali serwisu.

## 23. Priorytety

### P1

1. Usunąć powtórzoną latarnię z Home statement i Contact statement; hero pozostawić jedynym dużym użyciem motywu.
2. Zastąpić `operational-briefing.*` dwoma dokumentalnymi zdjęciami maritime/aviation i poprawić tabletowy układ experience.
3. Zastąpić cztery ciężkie szkice usług czterema ikonami Iconoir oraz prostszym gridem.
4. Uruchomić trzyczęściowy system wizualny Insights z automatycznym fallbackiem i osobnym social cropem.
5. Uporządkować pipeline obrazów: responsive derivatives Insights, wymiary article image, lazy loading About, AVIF/WebP i budżety.

### P2

- wdrożyć `Icon.astro` i manifest;
- dodać subtelne ikony domen w experience;
- dodać mail/map-pin przy małych labelach kontaktowych;
- dodać tekst + ikony w ArticleShare;
- ujednolicić strzałki CTA poza hero/header;
- dodać `visualTheme` do CMS;
- rozważyć krótką oś doświadczenia na About.

### P3

- portret założyciela po osobnej decyzji;
- custom icons tylko po teście Iconoir;
- indywidualne okładki najważniejszych artykułów;
- porządkowanie nieużywanych assetów po potwierdzeniu;
- lżejszy hero PNG fallback po pomiarze, bez zmiany obrazu.

## 24. Komponenty i pliki wymagające późniejszych zmian

### Komponenty

- `src/components/sections/HomePage.astro`
- `src/components/pages/ServicesPage.astro`
- `src/components/pages/AboutPage.astro`
- `src/components/pages/InsightsPage.astro`
- `src/components/pages/ContactPage.astro`
- `src/components/insights/InsightTeaser.astro`
- `src/components/insights/HomeInsightTeaser.astro` — prawdopodobnie bez thumbnail
- `src/components/insights/ArticleShare.astro`
- `src/layouts/ArticleLayout.astro`
- `src/components/sections/ContactBand.astro`
- `src/components/layout/Footer.astro` — tylko jeśli wspólna obsługa icon wrappera okaże się potrzebna
- nowy `src/components/ui/Icon.astro`

### Dane i CMS

- `src/i18n/translations.ts`
- `src/content/insight-schema.ts`
- `src/lib/insights.ts`
- `public/admin/config.yml`
- `public/admin/insights-validation.js`
- testy content/JSON-LD

### Style i pipeline

- `src/styles/global.css`
- `scripts/optimize-images.mjs`
- ewentualny nowy skrypt generowania thumbnail/social
- `package.json`
- `THIRD_PARTY_LICENSES.md`

### Assety

- nowe pliki pod `public/images/experience/`
- źródła SVG pod `src/assets/visuals/` lub `public/images/insights/system/`
- outputy pod `public/images/insights/generated/`
- odświeżony `public/social/clearstance-og.webp` zgodny z zaakceptowanym hero/systemem editorial;
- wykonano 31 lipca 2026: usunięcie `operational-briefing.*` i `brand-statement.*`; cztery PNG szkiców pozostają poza zakresem tego cleanupu;
- `hero-navigation.*` jest obecnie nadal źródłem starego OG w skrypcie; usuwać dopiero po odłączeniu pipeline i osobnym potwierdzeniu. Nieużywany Insights screenshot również wymaga osobnej decyzji.

## 25. Proponowana kolejność implementacji

1. Zaakceptować wariant B, Iconoir, kierunek zdjęć i usunięcie dodatkowych latarni.
2. Zbudować izolowany proof of concept `Icon.astro` z 4 ikonami usług; sprawdzić output HTML i bundle.
3. Przetestować 4 ikony przy 24/32/40 px na light/dark oraz mobile.
4. Przebudować Services bez szkiców, ale jeszcze ich nie usuwać z repo.
5. Przygotować shortlistę/licencje dwóch fotografii oraz crop matrix 1440/1024/768/390.
6. Wdrożyć experience Home/About i dopiero po akceptacji usunąć stare warianty.
7. Przebudować brand statement i contact statement bez fotografii.
8. Zaprojektować 3 mikroilustracje Insights i jeden prototyp artykułu PL/EN.
9. Dodać `visualTheme`, fallback i generowanie wariantów.
10. Odświeżyć default OG i odłączyć go od starego `hero-navigation.jpg`, bez modyfikacji zaakceptowanego hero.
11. Dodać ikony funkcjonalne Contact/Share i ujednolicić CTA poza hero.
12. Wykonać finalny test dostępności, LCP/CLS, reduced motion i sieci przy czterech szerokościach.
13. Zaktualizować licencje, inventory i usunąć assety dopiero po potwierdzeniu braku referencji.

## 26. Ryzyka i zależności

| Ryzyko | Skutek | Ograniczenie |
|---|---|---|
| Zbyt wiele ikon | SaaS/consulting template look | Maks. 4 w sekcji, brak ikon w procesach już czytelnych |
| Generyczne fotografie | Utrata wiarygodności | Documentary brief, bez war room, dowód licencji, crop review |
| Dwa zdjęcia dominują experience | Kolejny blok galeryjny | Małe, asymetryczne kadry; tekst pozostaje główny |
| Custom icons różnią się od Iconoir | Niespójność | 24×24, stroke 1.5, round i review obok biblioteki |
| SVG zbyt drobne | Brak czytelności mobile | Test przy 320–390 px i 28 px icon |
| System Insights staje się monotonny | Powrót tego samego problemu | 3 motywy + kontrolowane warianty, nie jeden pattern |
| CMS ładuje zbyt duże obrazy | Transfer i LCP | Build derivatives, `srcset`, budżety plików |
| Automapowanie po kategorii | Błędy PL/EN | Neutralne `visualTheme` i znormalizowane klucze |
| Usunięcie assetów używanych poza kodem | Utrata materiałów | Osobna akceptacja i sprawdzenie CMS/history |
| Nowy pakiet wpływa na build | Błąd Astro/Vite | POC przed wdrożeniem, statyczne importy, brak React |
| Fotografia osobista zmienia pozycjonowanie | Marka staje się founder-led | Osobna decyzja P3 |

## Decyzje wymagające akceptacji

1. **Biblioteka:** Iconoir (rekomendowane) albo Lucide jako alternatywa techniczna.
2. **Wariant rozwoju:** A, B (rekomendowane) albo C.
3. **Statement:** akceptacja usunięcia fotografii latarni z Home statement i Contact statement.
4. **Experience:** dwa dokumentalne zdjęcia maritime/aviation (rekomendowane) albo jedno wspólne zdjęcie.
5. **Insights:** trzy bazowe motywy systemowe z automatycznym fallbackiem (rekomendowane) albo jedna indywidualna grafika tylko dla wyróżnionych wpisów.
6. **Custom SVG:** zgoda na maksymalnie dwa prototypy wyłącznie wtedy, gdy `arrow-separate-vertical` i `view-grid` nie przejdą testu semantycznego.
7. **Portret:** czy w dłuższym terminie marka ma być bardziej founder-led; decyzja nie jest potrzebna do P1/P2.
