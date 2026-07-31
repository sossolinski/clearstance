# Executive Summary

> Historical baseline: this audit records the pre-implementation state. On 2026-07-31 the `brand-statement.*` and `operational-briefing.*` families were retired and removed. The active Brand Statement is icon-based and Experience uses the new maritime/aviation assets. Inventory rows below are retained as design history, not as a current repository listing.

Audit wykonano na stabilnym baseline `15d7e164c27c67baa2fe6ce8081a2008b06b9acc` oraz na aktualnym, lokalnym renderze uwzględniającym świadomie niezacommitowane zmiany użytkownika. Przeanalizowano kod, assety, CMS, widoki PL/EN i reprezentatywne artykuły. Porównano pełne strony przy 390 i 1440 px oraz homepage hero przy 320, 768, 1440 i 1920 px. Live HTML `clearstance.pl` odwołuje się do tych samych głównych assetów co lokalny build.

## Odpowiedzi wprost

1. **Czy obecna warstwa graficzna odpowiada jakości UI/UX?**
   **Nie w pełni.** Typografia, siatka, kolor, rytm, mikroelementy i responsywność są już na dobrym, premium poziomie. Fotografie i ilustracje są nierówne jakościowo i nie tworzą jeszcze jednego systemu. Największy rozdźwięk występuje między dojrzałym UI a obrazem `operational-briefing`, który wygląda jak generyczny, nocny „war room”.

2. **Co zrobić z obecnym hero z latarnią?**
   **REPLACE CONCEPT.** Nie należy porzucać idei orientacji, światła i punktu odniesienia, lecz główny hero nie powinien ponownie pokazywać latarni. ClearStance używa już drugiej latarni w brand statement i Contact Page; dwie latarnie przesuwają markę za mocno w stronę maritime. Na mobile latarnia z obecnego hero znika całkowicie, więc metafora przestaje działać.

3. **Czy strona ma za mało, właściwą liczbę czy za dużo grafik?**
   **Właściwą liczbę, ale niewłaściwie rozłożoną jakość.** Większość sekcji słusznie pozostaje typograficzna. Potrzebne są głównie replacementy, a nie dokładanie dekoracji. Jedyną kontrolowaną luką jest ClearStance Insights, gdzie warto uruchomić spójny system obrazów artykułowych.

4. **Trzy miejsca o największym potencjale poprawy:**

   1. homepage hero;
   2. wspólny visual doświadczenia operacyjnego na Home i About;
   3. pierwszy systemowy cover ClearStance Insights.

5. **Jeden wspólny visual direction:**
   **Documentary Precision / Spokojna precyzja operacyjna.** Realistyczne, spokojne światło dokumentalne łączone z oszczędnym językiem techniczno-redakcyjnym: horyzont, punkt odniesienia, skala, warstwy informacji, kontrolowana geometria i pojedynczy sygnał w kolorze coral. Bez widowiska, ekranów, „crisis theatre” i generycznych scen korporacyjnych.

## Najważniejszy wniosek

Nie redesignować UI. Obecny system wizualny w kodzie jest mocniejszy niż część użytych obrazów. Pierwsza iteracja powinna wymienić dwa assety fotograficzne i sprawdzić jeden prototyp ilustracji Insights. Dopiero po ocenie tych trzech elementów warto decydować o pełnym odświeżeniu szkiców usług i domyślnego OG image.

# Current Visual Language

## Co już działa

- ciemny `#081722` i ciepły paper `#f2eee7` tworzą spokojną, wiarygodną bazę;
- teal pełni rolę orientacyjną, a coral jest oszczędnym sygnałem;
- duża typografia display, drobne mono labels, numeracja i cienkie separatory dają charakter raportu strategicznego / publication;
- koła, łuki, punkt sygnałowy i kompas budują własny język orientacji bez potrzeby ikonografii „crisis”;
- świadoma przestrzeń dobrze równoważy gęste treści;
- PL i EN zachowują ten sam visual hierarchy;
- header, footer, PageIntro i typograficzne sekcje są spójne między stronami;
- wszystkie sprawdzone widoki miały `0 px` poziomego overflow.

## Co nie działa na tym samym poziomie

- `operational-briefing` jest generyczną sceną nocnej sali operacyjnej z dużym ekranem i panoramą miasta; dokładnie ten kod wizualny marka chce omijać;
- hero i brand statement używają dwóch różnych latarni, co wzmacnia maritime bardziej niż subtelne źródło wiarygodności;
- obecny hero jest efektowny na desktopie, ale na 320–390 px widoczny jest głównie ciemny horyzont i snop światła; sama latarnia wypada poza crop;
- cztery szkice Services różnią się proporcją, skalą postaci, line weight i stopniem szczegółowości;
- szkice nadal opowiadają o usługach poprzez generycznych ludzi przy flipcharcie lub laptopie;
- Insights ma przygotowaną architekturę dla obrazów, ale wszystkie opublikowane wpisy pozostają bez `headerImage`;
- domyślny social image jest cropem obecnego hero i po zmianie kierunku stanie się niespójny.

## Charakter obecnych assetów

Repo dokumentuje, że trzy główne fotografie zostały wyodrębnione z dostarczonego, zatwierdzonego reference homepage v10. Są więc faktycznie assetami odziedziczonymi z wcześniejszej wersji visual direction, nawet jeśli zostały poprawnie zoptymalizowane w aktualnej implementacji. Szkice usług zostały dodane później. Plik CMS w `public/images/insights/` nie ma obecnie żadnej referencji.

## Docelowe zasady Documentary Precision

1. Jeden obraz komunikuje jedną ideę.
2. Obraz pokazuje orientację, preparation lub judgement, nie „kryzys”.
3. Fotografia ma wyglądać dokumentalnie, nawet jeśli powstała z AI.
4. Techniczność wynika z skali, materiału, rytmu i geometrii, nie z neonowych interfejsów.
5. Ludzie mogą pojawiać się jako ślad działania: dłonie, gest, sylwetka od tyłu. Bez pozowania i patrzenia w kamerę.
6. Coral występuje jako pojedynczy sygnał, nigdy jako dominująca plama.
7. Bez tekstu, logotypów i UI wewnątrz obrazu.
8. Lepszy jest brak obrazu niż obraz poza systemem.

# Asset Inventory

Rozmiary podano dla aktualnego worktree. `04_przeglady_i_doskonalenie.png` jest świadomie lokalnie zmieniony i został oceniony w tej właśnie wersji; audit go nie modyfikuje.

## Raster i pliki publiczne

| Asset | File path | Type | Dimensions | File size | Used on | Purpose | Status |
|---|---|---:|---:|---:|---|---|---|
| Crisis management sketch | `public/images/01_system_zarzadzania_kryzysowego.png` | PNG, alpha | 1200×815 | 342.5 KiB | Services PL/EN | Illustration for service 01 | REVIEW |
| Exercises sketch | `public/images/02_cwiczenia_i_symulacje.png` | PNG, alpha | 1200×771 | 319.5 KiB | Services PL/EN | Illustration for service 02 | REVIEW |
| Facilitation sketch | `public/images/03_facylitacja.png` | PNG, alpha | 1024×525 | 157.7 KiB | Services PL/EN | Illustration for service 03 | REVIEW |
| Review sketch | `public/images/04_przeglady_i_doskonalenie.png` | PNG, alpha | 1200×473 | 401.5 KiB | Services PL/EN | Illustration for service 04 | REVIEW |
| Hero fallback | `public/images/hero-navigation.jpg` | JPEG | 1920×1080 | 147.3 KiB | Home PL/EN | Fallback / source for hero | REPLACE |
| Hero 640 | `public/images/hero-navigation-640.webp` | WebP | 640×360 | 5.7 KiB | Home PL/EN | Responsive hero | REPLACE |
| Hero 960 | `public/images/hero-navigation-960.webp` | WebP | 960×540 | 13.4 KiB | Home PL/EN | Responsive hero | REPLACE |
| Hero 1440 | `public/images/hero-navigation-1440.webp` | WebP | 1440×810 | 29.6 KiB | Home PL/EN | Responsive hero | REPLACE |
| Hero 1920 | `public/images/hero-navigation.webp` | WebP | 1920×1080 | 47.9 KiB | Home PL/EN | Responsive hero | REPLACE |
| Operational fallback | `public/images/operational-briefing.jpg` | JPEG | 1920×1080 | 198.9 KiB | Home + About PL/EN | Experience / trust visual | REPLACE |
| Operational 640 | `public/images/operational-briefing-640.webp` | WebP | 640×360 | 17.3 KiB | Home + About PL/EN | Responsive experience visual | REPLACE |
| Operational 960 | `public/images/operational-briefing-960.webp` | WebP | 960×540 | 31.2 KiB | Home + About PL/EN | Responsive experience visual | REPLACE |
| Operational 1440 | `public/images/operational-briefing-1440.webp` | WebP | 1440×810 | 52.3 KiB | Home + About PL/EN | Responsive experience visual | REPLACE |
| Operational 1920 | `public/images/operational-briefing.webp` | WebP | 1920×1080 | 75.0 KiB | Home + About PL/EN | Responsive experience visual | REPLACE |
| Statement fallback | `public/images/brand-statement.jpg` | JPEG | 1920×1080 | 142.0 KiB | Home + Contact PL/EN | Brand statement / closing image | REVIEW |
| Statement 640 | `public/images/brand-statement-640.webp` | WebP | 640×360 | 6.6 KiB | Home + Contact PL/EN | Responsive statement image | REVIEW |
| Statement 960 | `public/images/brand-statement-960.webp` | WebP | 960×540 | 13.7 KiB | Home + Contact PL/EN | Responsive statement image | REVIEW |
| Statement 1440 | `public/images/brand-statement-1440.webp` | WebP | 1440×810 | 27.5 KiB | Home + Contact PL/EN | Responsive statement image | REVIEW |
| Statement 1920 | `public/images/brand-statement.webp` | WebP | 1920×1080 | 45.3 KiB | Home + Contact PL/EN | Responsive statement image | REVIEW |
| CMS screenshot | `public/images/insights/screenshot-2026-07-26-at-11-30-23.webp` | WebP | 1919×1248 | 148.8 KiB | No current reference | Screenshot of CMS/editor with Decisiónary material | LIKELY ORPHANED — CONFIRM BEFORE REMOVAL |
| Default social card | `public/social/clearstance-og.webp` | WebP | 1200×630 | 23.2 KiB | Default OG/Twitter; all pages and articles without own image | Social preview | REPLACE after hero direction is approved |
| Favicon | `public/favicon/favicon.svg` | SVG | viewBox 64×64 | 337 B | Browser / webmanifest / CMS | Brand mark | KEEP |

## Inline i procedural graphics

| Asset | File path | Type | Used on | Purpose | Status |
|---|---|---|---|---|---|
| ClearStance lockup mark | `src/components/ui/Logo.astro` | Inline SVG, viewBox 48×48 | Header and footer, all pages | Primary brand mark | KEEP |
| Perspective compass | `src/components/pages/AboutPage.astro` | Inline SVG, viewBox 260×260 | About PL/EN | Orientation / operational perspective | KEEP |
| LinkedIn icon | `src/components/layout/Footer.astro` | Inline SVG, viewBox 24×24 | Footer PL/EN | External social link | KEEP |
| PageIntro rings | `src/styles/global.css`, `.page-intro::after` | CSS circles / shadows | Services, About, Insights, Contact, Privacy | Shared orientation motif | KEEP |
| Hero contour overlay | baked into `hero-navigation.*` | Raster graphic overlay | Home hero | Navigation/topography texture | REPLACE with hero |
| Utility arrows and markers | multiple Astro components | Text glyphs / CSS rules | Navigation, CTA, timelines | Direction and interaction | KEEP |

## CSS i CMS

- Publiczny CSS nie odwołuje się do dodatkowych rasterów poprzez `url(...)`; obrazy produkcyjne są jawnie renderowane przez `<picture>` lub `<img>`.
- CMS zapisuje media Insights pod `public/images/insights` i konwertuje raster do WebP, maksymalnie 1920×1920, quality 84.
- Schema wymaga opisu alternatywnego dla `headerImage`.
- `InsightTeaser` i `ArticleLayout` są już przygotowane na obrazy; nie trzeba przebudowywać listingu.
- `preview (2).html` jest lokalnym, self-contained legacy prototype z osadzonym base64 hero i starymi danymi. Nie jest częścią produkcyjnego inventory i nie wolno go usuwać bez odrębnej decyzji użytkownika.

# Page-by-page Graphic Audit

PL i EN korzystają z tej samej konstrukcji i tych samych assetów. Różnice długości copy nie zmieniają rekomendacji graficznych.

| Page | Section | Current visual | Visual purpose | Quality | Brand fit | Supports content? | Too empty? | Recommendation | Priority |
|---|---|---|---|---|---|---|---|---|---|
| All | Header | SVG mark + wordmark | Identity and orientation | High | High | Yes | No | KEEP | — |
| All | Footer | Mark, mono tagline, LinkedIn icon | Closure and trust | High | High | Yes | No | KEEP | — |
| Home | Hero | Lighthouse, sea, contour overlay | Orientation and calm under pressure | Medium–high on desktop; medium on mobile | Medium | Partly | No | REPLACE concept | P1 |
| Home | Hero featured Insight | Glass-like editorial card | Connect expertise with lead message | High | High | Yes | No | KEEP | — |
| Home | Approach | Typography, numbered pillars | Explain mental model | High | High | Yes | No | KEEP — no additional visual | — |
| Home | Services summary | Large typography + four rows | Scope and scanability | High | High | Yes | No | KEEP — no additional visual | — |
| Home | Readiness cycle | Dark timeline, points and rules | Explain sequence / operating rhythm | High | High | Yes | No | KEEP — no additional visual | — |
| Home | Experience | Night boardroom / wall display | Build operational credibility | Medium technically, low conceptually | Low | Weakly; implies generic command centre | No | REPLACE | P1 |
| Home | Practice | Typography and four principles | Explain method | High | High | Yes | No | KEEP — no additional visual | — |
| Home | Brand statement | Second lighthouse | Emotional reinforcement | High enough | Medium–high | Yes, but repeats hero | No | KEEP for prototype; REVIEW after hero replacement | P3 |
| Home | Insights teaser | Three typographic columns | Publication rhythm | High | High | Yes | No | KEEP without thumbnails on Home | — |
| Home | ContactBand | Typography + CTA | Conversion | High | High | Yes | No | KEEP — no image | — |
| Services | PageIntro | CSS rings | Orientation and continuity | High | High | Yes | No | KEEP | — |
| Services | Four detailed rows | Four people-based sketches | Separate services and improve rhythm | Medium | Medium | Yes, generically | No | REPLACE as one coherent set | P2 |
| Services | Context | Dark typographic block | Closure / scope | High | High | Yes | No | KEEP — no image | — |
| About | PageIntro | CSS rings | Frame the bridge-to-boardroom story | High | High | Yes | No | KEEP | — |
| About | Story | Same night boardroom image | Evidence of operational responsibility | Medium technically, low conceptually | Low | No; overstates corporate command-centre imagery | No | REPLACE | P1 |
| About | Perspective | Custom compass SVG | Unifies operational and advisory view | High | Very high | Yes | No | KEEP | — |
| Insights | PageIntro | CSS rings | Publication identity without sub-brand | High | High | Yes | No | KEEP | — |
| Insights | Index | Typography-only article rows | Editorial archive | High but repetitive at scale | High | Yes | Not currently; will become monotonous with more posts | ADD controlled thumbnails through a system | P1/P2 |
| Article | Header | Dark typographic masthead | Authority and framing | High | High | Yes | No | KEEP; add one cover below when available | — |
| Article | Long-form body | Typography, TOC, rules | Reading and comprehension | High | High | Yes | No | KEEP; no decorative inline images | — |
| Article | Header image slot | Currently unused | Editorial cover / concept framing | Architecture ready | Potentially high | Not yet | Long pages would benefit from one entry visual | ADD system prototype | P1 |
| Contact | PageIntro and form | CSS rings + typography | Task focus | High | High | Yes | No | KEEP — no image | — |
| Contact | Closing statement | Brand-statement lighthouse | Emotional closure | High enough | Medium–high | Yes | No | KEEP provisionally | P3 |
| Privacy | Entire page | Typography only | Legal clarity | High | High | Yes | No | KEEP — no decorative image | — |
| 404 | Error composition | Typography / graphic number treatment | Recovery | Appropriate | High | Yes | No | KEEP — no added image | — |

# Homepage Hero Assessment

## Decyzja

**C. REPLACE LIGHTHOUSE CONCEPT**

Kierunek „orientation” pozostaje, ale latarnia nie powinna być głównym obiektem nowego hero.

## Ocena obecnego obrazu

### Jakość obrazu

Obraz jest wystarczająco ostry i bardzo lekki. Ciemna ekspozycja dobrze ukrywa artefakty, a mapa warstwicowa łączy fotografię z technicznym tonem UI. Jednocześnie scena ma wyraźny „AI cinematic wallpaper look”: jednorodnie dramatyczne niebo, idealizowany snop światła i dekoracyjna topografia. Nie daje jakości spokojnej fotografii dokumentalnej.

### Kompozycja desktop

Desktop 1440–1920 działa dobrze:

- copy ma bezpieczne, ciemne pole po lewej;
- latarnia mieści się w prawej ćwiartce;
- karta featured Insight znajduje się poniżej latarni i nie zakrywa jej;
- linia horyzontu stabilizuje kompozycję;
- gradient gwarantuje dobry kontrast.

To jest główny powód, dla którego obecne hero wydaje się mocniejsze niż sam plik źródłowy.

### Crop mobile

Mobile jest zasadniczym problemem:

- ten sam plik 16:9 jest coverowany do bardzo wysokiego kontenera;
- przy 320 i 390 px latarnia wypada całkowicie poza widoczny crop;
- zostają światło, horyzont i ciemna woda, ale bez punktu odniesienia;
- główny koncept istnieje więc tylko na desktopie;
- copy i featured card zajmują niemal całe pole, dlatego nowy mobile asset nie może opierać znaczenia na małym, precyzyjnie położonym obiekcie.

### Współpraca z tekstem i kontrast

Wysoka. Layout, overlay i szerokość copy są dobrze zaprojektowane. Nie ma potrzeby zmieniać fontów, wysokości, featured card ani CTA. Nowy asset musi być projektowany pod tę strukturę.

### Dopasowanie do obecnej marki

Metafora nawigacji jest nadal wartościowa, ale latarnia jest zbyt dosłowna w połączeniu z:

- drugim lighthouse image w brand statement;
- tym samym motywem na Contact Page;
- doświadczeniem maritime opisanym w copy;
- konturami mapy w tle.

Razem tworzy to ryzyko interpretacji ClearStance jako marki morskiej. Jedna latarnia może pozostać jako drugorzędny brand moment; nie powinna dominować już w hero.

## Warunki nowego hero

- nie zmieniać layoutu;
- zachować ciemne pole pod copy po lewej;
- zachować spokojne, niskokontrastowe pole pod featured card w dolnej prawej części;
- nie opierać mobile na małym obiekcie;
- przygotować osobny mobile crop;
- zachować linię orientacji, światło lub punkt odniesienia;
- odejść od granatowego „storm at night” jako jedynego nastroju marki.

# Four Hero Directions

## CONCEPT 1 — Quiet Beacon

**IDEA:** prawdziwa, oszczędna fotografia niewielkiego coastal beacon lub latarni w spokojnym blue hour, bez sztormu i heroicznego snopu światła.

**WHY IT FITS CLEARSTANCE:** zachowuje istniejący kapitał metafory orientacji, ale podnosi realizm i dojrzałość.

**RISK:** nadal może utrwalać odbiór ClearStance jako marki maritime; mobile wymaga osobnej kompozycji, aby obiekt nie zniknął.

**STYLE:** AI photography naśladująca wysokiej klasy dokumentalną fotografię editorial.

**COMPOSITION:** beacon w górnej prawej ćwiartce, dużo ciemnej przestrzeni po lewej, horyzont poniżej środka, dolna prawa strefa spokojna pod kartę Insight.

**LIGHTING:** naturalne blue hour po deszczu, pojedyncze ciepłe światło, bez teatralnego beam.

**COLOR MOOD:** ink navy, desaturated slate, mokry kamień, bardzo mały warm signal.

**DESKTOP CROP STRATEGY:** 16:9; obiekt przy 80–84% szerokości i 33–42% wysokości.

**MOBILE CROP STRATEGY:** osobne 2:3; beacon większy, ale nadal tło, po prawej i powyżej środka; żadnego znaczenia zależnego od pełnej bryły.

**SUBJECT SAFE AREA:** lewe 58% dla copy; dolne prawe 30% dla featured card.

**RECOMMENDED ASPECT RATIO:** desktop 16:9, mobile 2:3.

| Brand fit | Premium feel | Originality | Layout compatibility |
|---:|---:|---:|---:|
| 8/10 | 9/10 | 6/10 | 8/10 |

**GENERATION PROMPT**

> Create an ultra-wide premium editorial photograph designed specifically as a website hero background, 16:9 landscape. A real, modest Northern European coastal beacon stands in the upper-right quadrant at approximately 82% of frame width and 38% of frame height, seen from a restrained medium-distance perspective with a 70mm documentary photographic character. Calm dark water and low coastal rock form a level horizon slightly below mid-frame. Blue hour after light rain, natural overcast atmosphere, subtle warm lamp only, no dramatic searchlight beam. The left 58% of the frame must remain dark, low-detail and visually quiet for large white headline and supporting copy. The lower-right area from roughly 62–90% width and 60–88% height must remain low-detail calm water for an editorial article card overlay. Premium realism, physically plausible stone, railing, lantern geometry, wet surfaces and reflections, gentle film grain, restrained ink-navy, slate and muted teal palette, quiet confidence, no spectacle. Create a related 2:3 mobile art-directed version where the beacon remains visible on the right but functions as atmosphere rather than a small essential object, with the central field quiet enough for stacked headline, body copy, CTA and a lower article card.

**VISUAL EXCLUSIONS**

> text, typography, logos, watermarks, people, people looking at camera, corporate photography, storm, disaster, giant waves, lightning, police lights, exaggerated lighthouse beam, excessive fog, fantasy coast, impossible architecture, cyberpunk, neon, teal-orange grading, oversaturated blue, drone-show perspective, repeated rocks or waves, malformed railings, fake windows, painterly AI artifacts

## CONCEPT 2 — Measured Horizon

**IDEA:** spokojny horyzont i pojedynczy punkt orientacyjny bez rozpoznawalnej latarni. Obraz o pozycjonowaniu, skali i kierunku, nie o morzu jako branży.

**WHY IT FITS CLEARSTANCE:** komunikuje orientation, clarity i judgement. Jest subtelnie osadzony w doświadczeniu operacyjnym, ale pozostaje uniwersalny dla consultancy.

**RISK:** zbyt minimalny rezultat może wyglądać jak generyczny landscape; potrzebna jest precyzyjna praca światłem i materiałem.

**STYLE:** AI photography / hybrid photographic editorial.

**COMPOSITION:** ciemny plan pierwszy, wyraźny poziomy datum, pojedynczy mały warm point po prawej, dyskretne warstwy przestrzeni; bez budynku.

**LIGHTING:** pierwsze światło przed świtem, cienka szczelina jasności na horyzoncie, naturalne rozproszenie.

**COLOR MOOD:** ink, slate, muted teal-grey, paper-white horizon, jeden coral-warm signal.

**DESKTOP CROP STRATEGY:** 16:9, znaczenie budowane całą linią, więc odporniejsze na crop.

**MOBILE CROP STRATEGY:** osobne 2:3 z ciągłą linią horyzontu; punkt może być częściowo zasłonięty bez utraty sensu.

**SUBJECT SAFE AREA:** lewe 60% i dolne prawe 30% o niskiej szczegółowości.

**RECOMMENDED ASPECT RATIO:** desktop 16:9, mobile 2:3.

| Brand fit | Premium feel | Originality | Layout compatibility |
|---:|---:|---:|---:|
| 9.5/10 | 9/10 | 8.5/10 | 9.5/10 |

**GENERATION PROMPT**

> Create a premium cinematic editorial photograph for an existing consultancy website hero, 16:9 landscape, based on the idea of measured orientation rather than a literal lighthouse. A calm, nearly abstract coastal or open-water horizon runs perfectly level across the frame at approximately 48% height. A single physically plausible distant orientation light appears in the upper-right field at about 84% width, small and quiet, with a very restrained reflection. No visible lighthouse, ship, aircraft or building. The near field is a deep ink-navy plane with subtle natural texture; the horizon carries a thin band of cool pre-dawn light and two or three barely visible atmospheric depth layers. The left 60% must be dark and low-detail for a large white headline, supporting paragraph and CTA. Preserve a quiet low-detail zone in the lower-right for a dark editorial article card. Documentary realism, natural lens response, gentle analogue grain, true horizon, restrained dynamic range, mature strategic-report mood, calm under pressure, precise spatial structure, palette of ink navy, slate, muted teal-grey and one tiny warm coral-like signal. Produce a related 2:3 mobile art-directed version with the horizon and tonal structure retained across the narrow crop; no essential small subject may be lost behind the stacked copy.

**VISUAL EXCLUSIONS**

> text, typography, logos, watermarks, obvious lighthouse, large buoy, ship, aircraft, corporate people, command centre, disaster, storm, giant waves, lightning, police lights, dramatic fog, fantasy, sci-fi, cyberpunk, neon, holograms, oversaturated color, impossible coastline, crooked horizon, repeated wave patterns, excessive bloom, generic wellness sunrise

## CONCEPT 3 — Prepared Field

**IDEA:** precyzyjny editorial still life pokazujący przygotowanie i strukturę poprzez fizyczne materiały: puste karty, transparentne warstwy, metalowe dividers i pojedynczy marker.

**WHY IT FITS CLEARSTANCE:** odchodzi od maritime i pokazuje operational clarity bez ludzi przy laptopach.

**RISK:** może wyglądać jak stationery brand albo consulting workshop, jeśli przedmioty będą zbyt dekoracyjne; generatywne AI często psuje geometrię narzędzi.

**STYLE:** AI photography, photographed still life.

**COMPOSITION:** układ przedmiotów w prawej połowie, diagonalna ale kontrolowana oś, lewa strona pusta.

**LIGHTING:** miękkie światło boczne z jednym ostrzejszym shadow edge.

**COLOR MOOD:** charcoal, paper, steel, muted teal, one coral marker.

**DESKTOP CROP STRATEGY:** 16:9; obiekty w górnej i środkowej prawej strefie, bez istotnych detali pod kartą.

**MOBILE CROP STRATEGY:** osobny 2:3 z fragmentem układu jako teksturą, nie pełnym flat lay.

**SUBJECT SAFE AREA:** lewe 58%; prawy dół pod featured card.

**RECOMMENDED ASPECT RATIO:** desktop 16:9, mobile 2:3.

| Brand fit | Premium feel | Originality | Layout compatibility |
|---:|---:|---:|---:|
| 8.5/10 | 8.5/10 | 8/10 | 8.5/10 |

**GENERATION PROMPT**

> Create a high-end editorial still-life photograph as a 16:9 website hero background for a premium operational-readiness consultancy. On a deep matte ink-charcoal surface, arrange a restrained preparation field in the right half of the frame: three unprinted warm-white briefing cards aligned to a clear datum, one translucent acetate overlay, a precise metal divider, a slim graphite pencil and one small muted-coral position marker. No readable writing, numbers or symbols. The composition is controlled rather than decorative, with subtle evidence of use, accurate scale and physically plausible contact shadows. Leave the entire left 58% dark, quiet and almost empty for large white copy and CTA. Keep the lower-right area visually calm for an editorial article card; place the most recognisable objects above it. Soft directional window light from upper right, one crisp alignment shadow, restrained contrast, fine photographic grain, palette of ink, warm paper, brushed steel, muted teal reflection and a single coral signal. Shot with a medium-format editorial character, slightly oblique top-down perspective, premium realism, calm preparation and judgement rather than office stationery. Create a related 2:3 mobile crop using fewer objects and a central safe tonal field behind stacked copy.

**VISUAL EXCLUSIONS**

> text, letters, numbers, typography, logos, watermarks, laptop, phone, dashboard, sticky-note workshop, corporate desk, hands, people, coffee cup, luxury stationery advertising, decorative clutter, infographic, neon, cyberpunk, glossy 3D render, impossible dividers, warped pencil, repeated cards, fake handwriting, oversaturated color

## CONCEPT 4 — Controlled Layers

**IDEA:** abstrakcja wykonana z fizycznych materiałów — vellum, papier, cienkie linie i jeden punkt — sfotografowana jak premium editorial object.

**WHY IT FITS CLEARSTANCE:** najbardziej współczesna interpretacja clarity i incomplete information, a jednocześnie łączy się z kołami, liniami i coral dot obecnego UI.

**RISK:** łatwo wejść w generyczny „AI abstract” albo zbyt designerski art object bez wiarygodności operacyjnej.

**STYLE:** hybrid / photographed editorial sculpture.

**COMPOSITION:** warstwy skupione po prawej, kontrolowane przecięcia, spokojna lewa płaszczyzna.

**LIGHTING:** raking light, naturalne cienie materiałów, brak cyfrowego glow.

**COLOR MOOD:** ink, bone paper, smoke, muted teal, coral dot.

**DESKTOP CROP STRATEGY:** 16:9; rytm linii prowadzi od lewej do prawej, ale lewa pozostaje czytelna.

**MOBILE CROP STRATEGY:** osobna pionowa kompozycja, w której warstwy biegną za copy jako bardzo subtelny field.

**SUBJECT SAFE AREA:** lewe 60%; prawy dół low contrast.

**RECOMMENDED ASPECT RATIO:** desktop 16:9, mobile 2:3.

| Brand fit | Premium feel | Originality | Layout compatibility |
|---:|---:|---:|---:|
| 8.5/10 | 9/10 | 9/10 | 9/10 |

**GENERATION PROMPT**

> Create a premium editorial image that looks like a real physical paper-and-light installation photographed in a studio, not digital AI art. Ultra-wide 16:9 hero composition. The right half contains several precisely cut layers of smoke-grey translucent vellum, deep ink paper and one muted-teal plane, each offset by a few millimetres to form controlled spatial layers. Thin graphite contour lines cross only some layers and resolve around one small matte coral pin or dot in the upper-right quadrant. Natural raking light creates physically accurate soft shadows, paper fibres and subtle depth. The left 60% is a continuous dark ink field with minimal texture for large white headline, paragraph and CTA. The lower-right remains subdued and low-detail for an editorial article card. Quiet strategic-report atmosphere, sophisticated material realism, restrained palette, clean geometry, no glow, no dramatic motion, no symbolic icons. Produce a related 2:3 mobile art-directed version with the layered construction simplified and positioned as a quiet background field around the stacked copy.

**VISUAL EXCLUSIONS**

> text, typography, logos, watermarks, people, corporate objects, dashboard, map labels, infographic, 3D CGI, glossy plastic, neon, hologram, cyberpunk, fantasy, fluid gradients, excessive blur, impossible shadows, warped paper edges, repeated patterns, random generative noise, bright rainbow colors, stock abstract waves

## Recommended Hero Direction

**CONCEPT 2 — Measured Horizon.**

Najlepiej zachowuje wartość metafory orientacji, usuwa nadmierną dosłowność latarni i jest najbardziej odporne na art-directed mobile crop. Pozwala również zostawić obecną latarnię w brand statement jako pojedynczy, drugorzędny moment marki.

## Second Choice

**CONCEPT 4 — Controlled Layers.**

Najlepszy kierunek, jeśli marka chce świadomie odejść od fotografii krajobrazowej i zbudować bardziej publication-led visual identity. Wymaga jednak wyjątkowo dobrej kontroli materiałowego realizmu.

# Services Visual Assessment

## Ocena obecnej konstrukcji

Typograficzna konstrukcja strony Services jest dobra i nie wymaga fotografii. Cztery ilustracje pełnią jednak realną funkcję: zatrzymują rytm długiej listy, rozróżniają obszary i pomagają przeskanować strukturę. Problemem nie jest sama obecność szkiców, tylko brak pełnej konsekwencji.

## Porównanie wariantów

### A. Brak grafik

Możliwy i bezpieczny. Layout pozostanie czytelny, ale strona stanie się bardzo długa i jednolicie tekstowa. Usunięcie obecnych szkiców bez replacementu nie daje dużego wzrostu jakości.

**Ocena:** 7/10.

### B. Jeden wspólny visual dla całego bloku

Ogranicza liczbę assetów, lecz nie współpracuje naturalnie z czterema równorzędnymi wierszami. Jeden obraz musiałby być bardzo ogólny i prawdopodobnie nie wniósłby informacji.

**Ocena:** 6/10.

### C. Cztery subtelne ilustracje scen

To obecne podejście. Sceny z ludźmi łatwo wpadają w corporate illustration, zwłaszcza przy flipcharcie, laptopie i kartach.

**Ocena obecnej realizacji:** 6/10.

### D. Cztery minimalistyczne technical editorial drawings

Najlepszy wariant docelowy. Każdy obszar powinien otrzymać nie scenkę rodzajową, lecz jeden systemowy model:

- **01 System:** warstwy odpowiedzialności, połączenia i punkt eskalacji;
- **02 Ćwiczenia:** przebieg scenariusza, inject, decyzja i obserwacja;
- **03 Facylitacja:** kilka perspektyw zbiegających się w jedno uzgodnienie;
- **04 Review:** pętla obserwacja → wniosek → właściciel → ponowne sprawdzenie.

Styl: cienka kreska o stałej grubości, ograniczona geometria, widoczny ślad ręcznego rysunku, paper/ink/teal i jeden coral signal. Bez podpisów w obrazie; znaczenie buduje relacja elementów.

**Ocena:** 9/10.

## Konkretne problemy obecnego zestawu

- `01` i `02` mają podobny charakter, ale różną gęstość kreski;
- `03` jest najbardziej generyczny — laptop i dwie osoby nie komunikują facylitacji;
- aktualny lokalny `04` jest czystszy od starszej wersji, lecz przy renderowanej szerokości jest wyraźnie mniejszy optycznie od pozostałych;
- proporcje plików od około 1.47:1 do 2.54:1 utrudniają równą obecność w jednej kolumnie;
- PNG ważą 158–401 KiB mimo subtelnej monochromatycznej treści;
- AI-like twarze i dłonie nie są potrzebne do zrozumienia usług.

## Rekomendacja

**REPLACE jako jeden komplet, nie pojedynczo.** Nie jest to pierwsza iteracja: wymiana czterech assetów naraz wymaga osobnego concept approval i testu spójności. Do czasu przygotowania całego systemu obecne ilustracje mogą pozostać.

# About / Perspective Assessment

## About Story

Obecna fotografia `operational-briefing` powinna zostać wymieniona. W praktyce:

- pokazuje wieżowiec, noc, duży wall display i grupę przy stole;
- wygląda jak symulacja centrum operacyjnego lub generyczny crisis room;
- nie daje dowodu doświadczenia maritime ani aviation;
- na desktopie pionowy crop 4:5 uwydatnia prowadzącego i ekran, przez co scena staje się jeszcze bardziej literalna;
- na mobile panoramiczny crop wygląda jak stockowe zdjęcie spotkania.

Najlepszym replacementem jest jedna spokojna, dokumentalna fotografia przygotowania nawigacyjnego: fragment chart table, dividers, dłonie lub ślad pracy i naturalny horyzont. Bez kolażu statek + samolot. Maritime ma być źródłem materialności i standardu działania, nie tematem całej marki.

## Perspective

Kompas SVG jest jednym z najlepszych elementów visual language:

- jest własny;
- łączy się z logo;
- działa w PL i EN;
- skaluje się bez kosztu;
- nie udaje dashboardu;
- pozostaje abstrakcyjny, ale czytelny.

**KEEP — no additional visual needed.**

## PageIntro

Nie dodawać fotografii do About hero. Duży tytuł „From the bridge to the boardroom.” i CSS rings zapewniają wystarczającą obecność. Fotografia poniżej pełni rolę dowodową; właśnie tam powinna zostać poprawiona.

# ClearStance Insights Visual System

## Visual philosophy

**One operational idea, one controlled field.**

Każdy obraz powinien przedstawiać pojedynczą relację istotną dla decyzji: brakujący element, punkt przekazania, warstwy pewności, okno decyzyjne, właściciela, rytm aktualizacji lub granicę odpowiedzialności. Nie ilustrujemy tytułu dosłownie i nie szukamy „zdjęcia kryzysu”.

## Subject matter

Preferowane tematy:

- wspólny obraz sytuacji;
- potwierdzone / robocze / niepotwierdzone warstwy informacji;
- interfejsy między odpowiedzialnościami;
- punkt eskalacji;
- rytm odpraw;
- decyzja i jej konsekwencja;
- scenario inject i reakcja;
- observation / ownership / review;
- granica systemu i otwarte pytanie.

## Photography vs illustration

System bazowy powinien być **hybrid**:

- fizyczna, materialna baza fotograficzna lub wygenerowana z wysokim realizmem;
- oszczędna technical editorial geometry;
- czasem całkowicie ilustracyjny cover, jeśli temat jest abstrakcyjny;
- fotografia dokumentalna tylko wtedy, gdy wnosi autentyczny kontekst, a nie jako domyślny stock.

## Palette

- 65–75% ink / charcoal / deep blue;
- 15–25% warm paper / bone;
- 5–10% muted teal;
- maksymalnie jeden mały coral signal;
- bez pełnej czerni i bez jaskrawej bieli;
- bez niebieskiego glow.

## Composition

- master 3:2;
- jedna dominująca relacja;
- 10–12% bezpiecznego marginesu;
- ważny motyw w centralnych 70%, aby działał w thumbnailu i social cropie;
- brak osadzonego tytułu; tytuł zawsze pozostaje w HTML;
- jeden stały poziom ziarna i kontrastu;
- obraz ma działać zarówno przy 360×240 na indeksie, jak i do około 1040 px na artykule.

## Consistency rules

1. Jeden focal point.
2. Jedna coral cue.
3. Ten sam line weight w całej serii.
4. Ten sam charakter materiału i grain.
5. Brak tekstu i pseudo-UI.
6. Brak przypadkowych kategorii stylistycznych między publikacjami.
7. PL i EN tego samego artykułu używają tego samego obrazu.
8. Social crop jest świadomym eksportem, nie przypadkowym `object-fit`.
9. Alt opisuje obraz, nie powtarza tytułu.
10. Cover jest zatwierdzany razem z artykułem.

## Czego nie robić

- osobnego logo Insights;
- innego fontu lub palety;
- losowej fotografii do każdego wpisu;
- ilustracji osoby „w kryzysie”;
- dashboardów, map z fałszywymi etykietami i ekranów;
- czerwonych alertów, radarów wojskowych i policyjnych świateł;
- tytułów wpisanych w raster;
- stylu różnego dla każdej kategorii.

# Article Visual System

## Czy każdy artykuł powinien mieć własny image?

**Docelowo tak, lecz dopiero po zatwierdzeniu systemu.** Obecna architektura pozwala publikować bez obrazu i to jest lepsze niż niekontrolowany stock. Rollout powinien rozpocząć się od jednego featured article, następnie objąć kolejne wpisy jako spójna seria.

Nie rekomenduje się automatycznego generowania coveru bez art direction. Cover jest częścią redakcji, nie obowiązkowym placeholderem.

## Direction A — Editorial photography

**Mocne strony:** wiarygodność, materialność, łatwe budowanie emocji.
**Ryzyka:** stockowość, powtarzalne sale i ludzie przy ekranach, trudna skalowalność tematyczna.
**Fit:** 7/10.

## Direction B — Conceptual AI photography

**Mocne strony:** możliwość wizualizacji abstrakcyjnych relacji.
**Ryzyka:** największe ryzyko „AI look”, surrealizmu i niemożliwej geometrii.
**Fit:** 6.5/10.

## Direction C — Minimal technical illustration

**Mocne strony:** skalowalność, silna zgodność z UI, jednoznaczne zasady.
**Ryzyka:** może wyglądać jak infographic pack, jeśli będzie zbyt czysta lub ikonowa.
**Fit:** 9/10.

## Direction D — Hybrid

Materialna, fotograficzna baza plus oszczędna, techniczna relacja graficzna. Może to być sfotografowana konstrukcja z papieru, translucent layers i markerów albo realistyczny generated still life poddany kontrolowanemu post-processowi.

**Fit:** 9.5/10 — rekomendowany system.

## Zasada publikacji

- indeks Insights: thumbnail 3:2 po prawej, zgodnie z istniejącym komponentem;
- artykuł: jeden lead image między dark header a prose;
- homepage: pozostawić typograficzne teasery bez thumbnails, aby nie przeładować Home;
- related articles: obrazy mogą pojawić się po pełnym rollout, ale komponent nie powinien wymuszać placeholderów;
- inline visuals tylko gdy wyjaśniają model, przebieg lub zależność. Nie jako dekoracyjne przerywniki.

# Places Where No Image Should Be Added

| Location | Decision | Reason |
|---|---|---|
| Header / desktop navigation | KEEP typographic | Dodatkowa grafika osłabi klarowność i premium restraint. |
| Mobile menu | KEEP typographic | Funkcja orientacyjna jest ważniejsza niż dekoracja. |
| Footer | KEEP current SVG only | Logo i LinkedIn wystarczają. |
| PageIntro na Services, About, Insights, Contact, Privacy | KEEP CSS rings | Jeden systemowy motyw działa lepiej niż różne hero images. |
| Home Approach | KEEP typography | Treść jest modelem myślenia; numeracja już porządkuje. |
| Home Services summary | KEEP typography | Obrazy są na stronie szczegółowej. |
| Home Readiness cycle | KEEP timeline | To funkcjonalna wizualizacja sama w sobie. |
| Home Practice | KEEP typography | Kolejna fotografia rozbiłaby rytm. |
| Home Insights list | KEEP typography | Obrazy należą do publication index / article. |
| ContactBand | KEEP typography | CTA powinno pozostać bez konkurencji. |
| Services Context | KEEP typography | Sekcja jest końcowym statementem. |
| About Perspective | KEEP compass only | Obecny symbol jest własny i wystarczający. |
| Contact form | KEEP task-focused | Dekoracja obniżyłaby czytelność i konwersję. |
| Privacy | KEEP text-only | Obraz nie poprawi zrozumienia ani zaufania. |
| Article prose | KEEP text-first by default | Dodawać tylko diagramy wspierające konkretny fragment. |
| 404 | KEEP current treatment | Brak potrzeby tworzenia osobnego assetu. |

# Top 5 Visual Improvements

## #1 Replace homepage hero with Measured Horizon

- **IMPACT:** bardzo wysoki;
- **EFFORT:** średni;
- **PRIORITY:** P1;
- **WHY NOW:** hero definiuje pierwsze wrażenie, a obecny koncept znika na mobile i dubluje latarnię z dalszej części strony;
- **EXPECTED VISUAL IMPROVEMENT:** bardziej uniwersalna, premium i dojrzała marka bez utraty idei orientacji.

## #2 Replace operational-briefing everywhere

- **IMPACT:** bardzo wysoki;
- **EFFORT:** średni;
- **PRIORITY:** P1;
- **WHY NOW:** jeden słabszy asset występuje w dwóch ważnych miejscach i obniża wiarygodność całej narracji doświadczenia;
- **EXPECTED VISUAL IMPROVEMENT:** odejście od generycznego crisis room na rzecz wiarygodnej, spokojnej praktyki operacyjnej.

## #3 Launch one ClearStance Insights cover prototype

- **IMPACT:** wysoki;
- **EFFORT:** średni;
- **PRIORITY:** P1;
- **WHY NOW:** linia publikacyjna ma już nazwę, strukturę CMS i sloty na obrazy, ale nie ma visual system;
- **EXPECTED VISUAL IMPROVEMENT:** wyraźniejszy editorial character i system gotowy do skalowania.

## #4 Redraw all four Services illustrations as one technical set

- **IMPACT:** średni–wysoki;
- **EFFORT:** wysoki, bo to komplet czterech assetów;
- **PRIORITY:** P2;
- **WHY NOW:** obecny zestaw działa funkcjonalnie, lecz ujawnia różnice jakości i skalę AI/corporate illustration;
- **EXPECTED VISUAL IMPROVEMENT:** większa spójność, własny język usług, mniejszy efekt clipart.

## #5 Refresh the default social image after hero approval

- **IMPACT:** średni na stronie, wysoki poza stroną;
- **EFFORT:** niski;
- **PRIORITY:** P2/P3;
- **WHY NOW:** obecny OG jest cropem assetu rekomendowanego do replacementu;
- **EXPECTED VISUAL IMPROVEMENT:** spójne link previews i lepsza rozpoznawalność visual direction.

# Top 3 Assets To Generate First

1. **Homepage hero — Measured Horizon**, jako desktop i mobile crop jednej rodziny.
2. **Operational experience — Chart Table / Prepared Navigation**, jako desktop portrait i mobile landscape crop jednej sesji.
3. **ClearStance Insights prototype — Situational Awareness Field**, dla featured article PL/EN.

Nie wybierać jeszcze szkiców Services: ich ocena wymaga zatwierdzenia całego zestawu, a nie pojedynczego assetu. Nie generować jeszcze nowego brand-statement lighthouse; po nowym hero może on odzyskać właściwą rolę jako jedyna latarnia na stronie.

# Final AI Generation Briefs

## ASSET 1

**ASSET NAME:** Measured Horizon Hero

**PURPOSE:** zdefiniować homepage poprzez orientację, clarity i calm under pressure bez dosłownej latarni.

**TARGET PAGE:** `/`, `/en/`

**TARGET COMPONENT:** `src/components/sections/HomePage.astro`, `.hero`

**TARGET DIMENSIONS:**

- master desktop: 2400×1350;
- production desktop: 1920×1080, 1440×810, 960×540;
- master mobile: 1000×1500;
- production mobile: 900×1350, 640×960.

**ASPECT RATIO:** desktop 16:9; mobile 2:3 art-directed crop.

**DESKTOP REQUIREMENTS:** lewa strona low-detail pod headline/copy/CTA; spokojny prawy dół pod featured Insight card; horyzont idealnie poziomy.

**MOBILE REQUIREMENTS:** tonalna struktura ma działać bez małego obiektu; copy i karta zajmują większość wysokości, więc visual nie może zależeć od widoczności punktu w jednym miejscu.

**SAFE AREA:**

- desktop: lewe 60% oraz dolny prawy prostokąt około 370×190 px;
- mobile: centralne 85% bez high-contrast detali; żadnych krytycznych obiektów w skrajnych 15%.

**VISUAL STYLE:** premium AI photography o dokumentalnym charakterze, subtelnie cinematic.

**SUBJECT:** poziomy datum / horyzont, warstwy przestrzeni, jeden mały punkt orientacyjny bez budynku.

**COMPOSITION:** deep foreground, horizon na około 48% wysokości, mały warm signal w prawej górnej części, spokojne pola.

**LIGHT:** pre-dawn natural light, cienka jasna linia, brak teatralnego beam i glow.

**COLOR:** ink navy, slate, muted teal-grey, paper-light horizon, pojedynczy warm coral cue.

**TEXTURE:** naturalna woda lub mineralna powierzchnia, subtelne ziarno, realistyczne rozproszenie atmosferyczne.

**REALISM:** wysoki; obraz ma wyglądać jak spokojna fotografia editorial, nie matte painting.

**PROMPT**

> Generate a production-ready premium editorial website hero background for ClearStance, a consultancy focused on crisis readiness, operational clarity and decision-making under pressure. 16:9 landscape, 2400×1350 master. Show a perfectly level, calm measured horizon at approximately 48% frame height, with a deep ink-navy near field and two subtle atmospheric depth layers. Include one tiny physically plausible warm orientation light in the upper-right field at approximately 84% width, but no visible lighthouse, ship, aircraft, buoy or building. The left 60% must be dark, low-detail and quiet for a large white headline, supporting paragraph and CTA. The lower-right area must remain low-detail for a dark 370×190 editorial article card overlay. Natural pre-dawn light, restrained dynamic range, gentle analogue grain, realistic lens response, no dramatic weather. Palette: ClearStance ink navy, slate, muted teal-grey, thin paper-white horizon and one tiny muted coral-warm signal. Mood: orientation, preparedness, structure, judgement and calm under pressure. Create a matching 2:3 mobile art-directed composition from the same visual world, where the horizon remains legible through a narrow crop and no essential object is hidden by stacked copy or the lower card.

**VISUAL EXCLUSIONS**

> text, typography, letters, numbers, logos, watermarks, lighthouse, large buoy, ship, aircraft, people, corporate stock photography, command centre, dashboard, disaster, storm, fire, giant waves, lightning, police lights, excessive fog, fantasy, sci-fi, cyberpunk, neon, hologram, oversaturated colors, orange-and-teal grading, impossible coastline, crooked horizon, repeated waves, excessive bloom, generic sunrise tourism

**SUGGESTED ALT TEXT:**

- PL: `Spokojna linia horyzontu z pojedynczym światłem orientacyjnym`
- EN: `A calm horizon with a single orientation light`

**SUGGESTED FILE NAME:** `hero-measured-horizon`

**OUTPUT FORMAT:** AVIF primary, WebP fallback, JPEG source/archive only; separate desktop and mobile exports.

**MANUAL QC:** horizon, light/reflection alignment, repeated water texture, coastline continuity, tonal space under copy, visual collision with featured card, color cast, banding in dark gradients.

## ASSET 2

**ASSET NAME:** Prepared Navigation / Operational Experience

**PURPOSE:** zastąpić generyczny boardroom jednym wiarygodnym śladem pracy w środowisku high-reliability.

**TARGET PAGE:** Home i About, PL/EN.

**TARGET COMPONENT:**

- `src/components/sections/HomePage.astro`, `.experience-image`;
- `src/components/pages/AboutPage.astro`, `.about-story picture`.

**TARGET DIMENSIONS:**

- desktop portrait master: 1600×2000;
- desktop production: 1280×1600, 960×1200;
- mobile landscape master: 1600×1100;
- mobile production: 1280×880, 800×550.

**ASPECT RATIO:** desktop 4:5; mobile 16:11.

**DESKTOP REQUIREMENTS:** centralny temat musi działać w wysokim cropie Home i About; bez twarzy oraz bez ekranu.

**MOBILE REQUIREMENTS:** osobny szeroki crop tej samej sceny; kluczowe dłonie/narzędzie w centralnych 65%.

**SAFE AREA:** centralne 65% dla działania; 10% marginesu bez istotnych elementów; żadnego pseudo-tekstu na krawędziach.

**VISUAL STYLE:** spokojna fotografia dokumentalna/editorial, AI photography z bardzo wysoką kontrolą realizmu.

**SUBJECT:** fragment przygotowania nawigacyjnego przy chart table; dłonie, prawidłowo używane dividers, ołówek, papierowa mapa bez czytelnych oznaczeń, miękki horyzont za oknem.

**COMPOSITION:** ujęcie over-shoulder / close documentary; twarz poza kadrem; gest skupiony, nie teatralny.

**LIGHT:** naturalne chłodne światło dzienne z bocznego okna, lekko ciepły papier, bez nocnej panoramy.

**COLOR:** ink, muted blue-grey, warm paper, steel, śladowy teal; bez coral lub tylko bardzo mały marker.

**TEXTURE:** papier, metal, matowe szkło, naturalna tkanina, delikatne grain.

**REALISM:** bardzo wysoki; sprzęt i dłonie muszą być fizycznie poprawne.

**PROMPT**

> Create a premium documentary editorial photograph for ClearStance, showing quiet operational preparation rather than a crisis room. Portrait 4:5 master composition. Close over-the-shoulder view at a real navigation chart table during soft daylight. Only a restrained part of one professional operator is visible; the face is out of frame and no one looks at the camera. Two anatomically correct hands use a precise metal divider and graphite pencil on a paper chart with realistic line work but absolutely no readable labels, fake words or numbers. A true level horizon is softly visible through a side window, with no identifiable vessel branding. The scene must feel used, calm and accountable: accurate tool contact, subtle wear, aligned materials, natural posture, no performance. Premium documentary realism, 50mm lens character, shallow but not excessive depth of field, soft cool daylight, warm paper, brushed steel, ink and muted blue-grey palette, fine film grain. Keep the essential hands and dividers inside the central 65% so the same session can support a 16:11 mobile landscape crop. The image should suggest maritime and aviation high-reliability practice without becoming a shipping company image.

**VISUAL EXCLUSIONS**

> readable text, typography, logos, watermarks, fake chart labels, dashboard, giant screens, control room, city skyline, boardroom, meeting, people looking at camera, posed team, headset, uniform costume, military aesthetic, disaster, alarms, neon, cyberpunk, hologram, dramatic fog, malformed hands, extra fingers, impossible divider geometry, warped pencil, floating tools, impossible reflections, unrealistic ship or aircraft equipment

**SUGGESTED ALT TEXT:**

- PL: `Przygotowanie nawigacyjne przy mapie i instrumentach pomiarowych`
- EN: `Navigation preparation using a chart and precision instruments`

**SUGGESTED FILE NAME:** `operational-prepared-navigation`

**OUTPUT FORMAT:** AVIF primary, WebP fallback; osobny desktop portrait i mobile landscape crop.

**MANUAL QC:** anatomia dłoni, liczba palców, punkt styku dividers z mapą, perspektywa narzędzi, poprawność cieni, brak fake text, horyzont, odbicia w szybie, powtarzalne linie mapy, brak niezamierzonego military look.

## ASSET 3

**ASSET NAME:** Situational Awareness Field

**PURPOSE:** pierwszy prototyp systemu ClearStance Insights dla featured article o utracie wspólnego obrazu sytuacji.

**TARGET PAGE:**

- `/insights/kiedy-zespol-kryzysowy-traci-obraz-sytuacji/`;
- `/en/insights/when-crisis-teams-lose-situational-awareness/`;
- listing Insights PL/EN;
- social preview tego artykułu.

**TARGET COMPONENT:**

- `src/layouts/ArticleLayout.astro`;
- `src/components/insights/InsightTeaser.astro`;
- frontmatter powiązanych artykułów PL/EN.

**TARGET DIMENSIONS:**

- master article: 1800×1200;
- production article: 1600×1067, 1200×800;
- social crop: 1200×630.

**ASPECT RATIO:** article/index 3:2; social 1.91:1.

**DESKTOP REQUIREMENTS:** czytelna relacja przy 1040 px, bez tekstu; obraz ma spokojnie łączyć dark article header z paper body.

**MOBILE REQUIREMENTS:** focal relation widoczna przy szerokości 320–430 px; bez drobnych detali wymagających zoomu.

**SAFE AREA:** główna relacja w centralnych 70%; 10–12% marginesu; social crop nie może ucinać coral signal.

**VISUAL STYLE:** hybrid technical editorial illustration z materialnym papierem/vellum.

**SUBJECT:** trzy częściowo rozbieżne warstwy informacji, które dopiero w jednej centralnej ramie tworzą wspólny obraz; jeden coral point wskazuje informację wymagającą decyzji.

**COMPOSITION:** physical layered field, cienkie linie, różne poziomy przezroczystości, centralna zgodność bez dosłownego dashboardu.

**LIGHT:** soft raking studio light, prawdziwe cienie materiałów, bez glow.

**COLOR:** ink, warm paper, muted teal, smoke-grey, pojedynczy coral dot.

**TEXTURE:** włókna papieru, vellum, grafit, delikatne analogowe grain.

**REALISM:** materialny realizm; geometria może być abstrakcyjna, ale musi być logiczna.

**PROMPT**

> Create a sophisticated 3:2 editorial cover image for ClearStance Insights, visualising situational awareness without using people, screens or text. The image must look like a real physical construction photographed from a controlled slightly oblique top-down angle. Three translucent smoke-grey and muted-teal vellum layers carry thin, precise graphite line fragments that are incomplete or slightly misaligned in the outer field. In the central 70% they align inside one clear ink-coloured reference frame, creating a coherent shared field. One small matte coral dot marks the only element that requires immediate judgement. Warm paper beneath, deep ink edge, restrained teal, physically accurate raking light and contact shadows, subtle paper fibres and analogue grain. One focal relation, no decorative complexity, no infographic labels, premium contemporary publication character, calm and precise. Preserve 10–12% clean margins and ensure the central relation remains legible at a 360×240 thumbnail and in a 1200×630 social crop.

**VISUAL EXCLUSIONS**

> text, letters, numbers, typography, logos, watermarks, UI, dashboard, map labels, people, faces, team meeting, command centre, radar screen, warning triangle, emergency icon, stock infographic, PowerPoint illustration, neon, cyberpunk, hologram, glossy CGI, fantasy, random abstract swirls, excessive layers, repeated line artifacts, impossible shadows, fake paper folds, oversaturated color

**SUGGESTED ALT TEXT:**

- PL: `Warstwy informacji układające się we wspólny obraz sytuacji`
- EN: `Layers of information aligning into a shared situational picture`

**SUGGESTED FILE NAME:** `situational-awareness-field`

**OUTPUT FORMAT:** AVIF/WebP for article; dedicated WebP social export 1200×630. Zachować wysokiej jakości master bez tekstu.

**MANUAL QC:** ciągłość linii, logiczne nakładanie warstw, cienie zgodne z jednym światłem, brak pseudo-liter, brak powtarzalnych patternów, czytelność miniatury, pozycja coral dot w social cropie, spójność z palette CSS.

# Implementation Map

| Asset | Current asset / path | Component and usage | Suggested new path | File replacement only? | Markup change? | CSS change? | `<picture>` / mobile crop | `srcset` | Width / height |
|---|---|---|---|---|---|---|---|---|---|
| Measured Horizon Hero | `public/images/hero-navigation.jpg`, `hero-navigation-{640,960,1440}.webp`, `hero-navigation.webp` | `HomePage.astro`, hero background PL/EN | `public/images/hero-measured-horizon-desktop-*.(avif/webp)`, `hero-measured-horizon-mobile-*.(avif/webp)` | No | Yes: art-directed `<source media>` | Minimal: object-position only after crop test | Required | Required | Keep explicit intrinsic dimensions for fallback; source dimensions documented |
| Prepared Navigation | `public/images/operational-briefing.*` | `HomePage.astro` experience; `AboutPage.astro` story PL/EN | `public/images/operational-prepared-navigation-portrait-*.(avif/webp)`, `...-landscape-*.(avif/webp)` | No | Yes in both components | Probably none beyond optional object-position | Required because desktop and mobile use opposite proportions | Required | Required on `<img>`; CSS aspect ratios already define containers |
| Situational Awareness Field | No current article image; unrelated CMS screenshot remains unreferenced | `ArticleLayout.astro`, `InsightTeaser.astro`, PL/EN article frontmatter | `public/images/insights/situational-awareness-field.webp`, `...-social.webp`; optional AVIF article version | Mostly content assignment | Existing visibility works; recommended intrinsic-size support in `ArticleLayout` | No layout redesign; optional fixed aspect ratio for stronger CLS protection | No separate mobile file required for central 3:2 composition | Optional 1200/1600 variants | Add resolved width/height to article image if helper is extended |

## Uwagi implementacyjne

### Hero

Obecne `<picture>` podaje jedną rodzinę 16:9 dla wszystkich viewportów. To przyczyna utraty latarni na mobile. Nowa implementacja powinna najpierw wybierać pionowy source przez `media="(max-width: 760px)"`, a następnie desktop.

### Operational image

Jeden 16:9 source jest obecnie coverowany zarówno do 4:5, jak i do szerokiego mobile. Nowy asset wymaga dwóch art-directed crops, nie tylko kolejnych szerokości tego samego pliku.

### Insights

CMS i schema są gotowe. Dla prototypu wystarczy przypisać ten sam neutralny językowo visual do pary PL/EN i osobny social crop. Przed rolloutem należy poprawić CLS article header image przez jawne wymiary lub stały `aspect-ratio`.

# Performance Requirements

## Format i budżet

| Asset | Preferred | Fallback | Recommended maximum |
|---|---|---|---:|
| Homepage hero desktop 1920 | AVIF | WebP | 180 KiB AVIF / 260 KiB WebP |
| Homepage hero mobile | AVIF | WebP | 100 KiB AVIF / 140 KiB WebP |
| Operational image desktop | AVIF | WebP | 150 KiB AVIF / 220 KiB WebP |
| Operational image mobile | AVIF | WebP | 100 KiB AVIF / 150 KiB WebP |
| Article visual 1600×1067 | AVIF | WebP | 140 KiB AVIF / 220 KiB WebP |
| Article social 1200×630 | WebP | — | 180 KiB |
| Supporting raster illustration | WebP with alpha if needed | PNG only if necessary | 120 KiB desktop / 70 KiB mobile |
| Future vector technical drawing | Optimised SVG | transparent WebP | ideally <60 KiB gzip |

Budżety są maksymalne, nie docelowe. Ciemne, spokojne obrazy mogą być lżejsze, ale należy kontrolować banding i zanik subtelnych cieni.

## LCP

- hero pozostaje jedynym obrazem z `fetchpriority="high"`;
- nie lazy-loadować hero;
- pierwszemu source zapewnić właściwy `sizes`;
- AVIF/WebP nie mogą opóźniać fallbacku przez zbyt długą listę niepotrzebnych wariantów;
- nie wprowadzać JS do wyboru cropu.

## CLS

- zachować lub dodać `width` i `height`;
- dla art-directed source utrzymać stabilny container z obecnym min-height/aspect-ratio;
- article image powinien otrzymać znane proporcje przed pobraniem;
- CMS powinien publikować asset wraz z wymiarami możliwymi do odczytu podczas builda.

## Loading

- operational image: `loading="lazy"` na Home jest prawidłowe;
- About używa `loading="eager"`, choć obraz leży poniżej PageIntro; po implementacji warto zmierzyć, czy `lazy` nie będzie lepsze, ale nie zmieniać bez pomiaru;
- article cover może mieć `fetchpriority="high"` tylko gdy jest widoczny szybko po headerze; nie jest LCP na większości viewportów, więc wymaga pomiaru;
- Insights thumbnails pozostają `loading="lazy"`.

## CMS

Limit 5 MiB jest limitem uploadu, nie akceptowanym budżetem produkcyjnym. Editorial checklist powinien wymagać:

- 3:2 master bez tekstu;
- dedykowanego social cropu;
- optymalizacji do budżetu;
- alt text;
- sprawdzenia miniatury i mobile;
- zapisu provenance / sposobu wytworzenia.

# AI Quality-Control Checklist

## Wszystkie obrazy

- [ ] Brak tekstu, pseudo-liter, logotypów i watermarków.
- [ ] Brak powtarzalnych tekstur charakterystycznych dla generacji.
- [ ] Jedno źródło światła i spójne cienie.
- [ ] Naturalna perspektywa i skala.
- [ ] Brak nadmiernego clarity, bloom, fog i teal-orange grade.
- [ ] Detale pozostają poprawne po cropie, nie tylko w pełnym masterze.
- [ ] Obraz działa przy realnym overlayu i copy.
- [ ] Obraz nie wygląda na crisis stock ani AI wallpaper.
- [ ] Alt text opisuje to, co faktycznie jest widoczne.
- [ ] Provenance i decyzja o użyciu są zapisane.

## Hero / horizon

- [ ] Horyzont jest idealnie prosty.
- [ ] Punkt światła ma fizycznie logiczne odbicie.
- [ ] Brak fantomowych budynków, statków i wybrzeży.
- [ ] Woda nie powtarza wzorów.
- [ ] Gradienty nie bandują w AVIF/WebP.
- [ ] Lewa safe area pozostaje czytelna pod PL i EN.
- [ ] Featured card nie zasłania focal point.
- [ ] Mobile zachowuje sens bez desktopowego obiektu.

## Operational experience

- [ ] Dłonie mają poprawną anatomię i liczbę palców.
- [ ] Dividers, pencil i chart stykają się fizycznie poprawnie.
- [ ] Brak niemożliwego sprzętu.
- [ ] Brak fake text na mapie.
- [ ] Horyzont i okno mają poprawną perspektywę.
- [ ] Odbicia odpowiadają scenie.
- [ ] Gest wygląda na pracę, nie pozowanie.
- [ ] Visual nie sugeruje wojska, ochrony lub centrum dowodzenia.

## Insights visual

- [ ] Geometria ma logiczną relację, a nie losową dekorację.
- [ ] Linie są ciągłe i mają stałą grubość.
- [ ] Warstwy mają spójne transparencje i cienie.
- [ ] Coral występuje raz.
- [ ] Brak pseudo-UI i infographic pack look.
- [ ] Focal point jest czytelny przy 360×240.
- [ ] Social crop zachowuje główną relację.
- [ ] PL i EN używają tego samego visualu.

## Future Services drawings

- [ ] Ten sam canvas i optical scale dla wszystkich czterech.
- [ ] Ten sam line weight i stopień szczegółowości.
- [ ] Brak twarzy i dłoni, jeśli nie są konieczne.
- [ ] Każda ilustracja komunikuje inną relację operacyjną.
- [ ] Brak PowerPoint icons, clipart i przypadkowych arrow packs.
- [ ] Wszystkie cztery są zatwierdzane razem.

# Recommended Next Step

1. Wspólnie wybrać między **Measured Horizon** a **Controlled Layers** dla hero.
2. Wygenerować po 3–4 niskorozdzielcze concept frames tylko dla wybranego hero direction, bez implementacji.
3. Równolegle wygenerować 2–3 warianty **Prepared Navigation** oraz jeden **Situational Awareness Field**.
4. Oceniać concept frames w realnych, statycznych mockach obecnego layoutu:

   - hero desktop 1440×780;
   - hero mobile 390×755;
   - experience Home 545×około 600;
   - About desktop 4:5 i mobile 16:11;
   - Insights thumbnail 360×240;
   - article lead około 1040 px;
   - social 1200×630.

5. Odrzucić każdy wariant, który wymaga redesignu, dodatkowego gradientu maskującego błędy lub przestaje działać po mobile cropie.
6. Dopiero po akceptacji trzech prototypów przygotować production exports i osobny task implementacyjny.

Na tym etapie nie rekomenduje się żadnych innych zmian w kodzie, CSS, CMS ani assetach.
