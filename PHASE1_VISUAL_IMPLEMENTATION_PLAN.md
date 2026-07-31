# Phase 1 Visual Implementation Plan

> Historical plan: later accepted implementations supersede this baseline. On 2026-07-31 the `brand-statement.*` and `operational-briefing.*` families were removed from the repository and image pipeline. References below describe the earlier state and remain only as project history.

## Executive Summary

Phase 1 obejmuje wyłącznie:

1. homepage hero — **Lighthouse & Horizon**;
2. wspólny visual Home / About — **Operational Precision**;
3. pierwszy cover ClearStance Insights — **Situational Awareness Field**.

Stabilny baseline aplikacji to `15d7e164c27c67baa2fe6ce8081a2008b06b9acc`.

W repo nie ma żadnego z finalnych plików wymaganych przez nowy asset contract:

- brak AVIF w `public/images`;
- brak rodziny `hero-lighthouse-horizon-*`;
- brak rodziny `operational-precision-*`;
- brak rodziny `situational-awareness-field-*`.

Plik `public/images/insights/screenshot-2026-07-26-at-11-30-23.webp` nie odpowiada briefowi Situational Awareness Field i nie może być użyty jako stand-in.

Zgodnie z decision gate kod produkcyjny nie powinien być teraz zmieniany. Ten dokument definiuje dokładny kontrakt assetów i przyszłą implementację po dostarczeniu oraz ręcznym zatwierdzeniu finalnych grafik.

## Accepted direction override

Późniejsza decyzja użytkownika zastępuje wcześniejszą rekomendację hero z audytu.

Obowiązuje:

**KEEP LIGHTHOUSE CONCEPT — REPLACE IMAGE**

Nie obowiązuje:

**REPLACE LIGHTHOUSE CONCEPT**

Docelowy hero zachowuje rozpoznawalną latarnię jako signature motif. Usuwa natomiast sztormową dramaturgię, przesadny beam, fake topographic overlay i charakter AI cinematic wallpaper.

## Scope boundaries

### In scope after asset approval

- nowe, addytywne rodziny assetów;
- art-directed `<picture>` dla hero;
- art-directed `<picture>` dla operational image w Home i About;
- przypisanie jednego coveru do pary artykułów PL/EN;
- responsywny `<picture>` dla coveru Insights;
- minimalne CSS potrzebne do właściwego cropu, proporcji i CLS;
- aktualizacja tekstów alternatywnych opisujących nowe obrazy;
- pełne QA i Quality suite.

### Out of scope

- Services illustrations;
- favicon i logo;
- header / footer;
- globalny default OG;
- inne artykuły Insights;
- homepage Insights teasers;
- brand-statement image replacement;
- copy, CTA, grid, typografia i wysokości sekcji;
- Canva documents.

# Current Technical Baseline

## Current asset inventory

| FAMILY | FILE | DIMENSIONS | FORMAT | SIZE |
|---|---|---:|---|---:|
| Hero | `public/images/hero-navigation-640.webp` | 640×360 | WebP | 5.7 KiB |
| Hero | `public/images/hero-navigation-960.webp` | 960×540 | WebP | 13.4 KiB |
| Hero | `public/images/hero-navigation-1440.webp` | 1440×810 | WebP | 29.6 KiB |
| Hero | `public/images/hero-navigation.webp` | 1920×1080 | WebP | 47.9 KiB |
| Hero fallback | `public/images/hero-navigation.jpg` | 1920×1080 | JPEG | 147.3 KiB |
| Operational | `public/images/operational-briefing-640.webp` | 640×360 | WebP | 17.3 KiB |
| Operational | `public/images/operational-briefing-960.webp` | 960×540 | WebP | 31.2 KiB |
| Operational | `public/images/operational-briefing-1440.webp` | 1440×810 | WebP | 52.3 KiB |
| Operational | `public/images/operational-briefing.webp` | 1920×1080 | WebP | 75.0 KiB |
| Operational fallback | `public/images/operational-briefing.jpg` | 1920×1080 | JPEG | 198.9 KiB |
| Brand statement | `public/images/brand-statement-{640,960,1440}.webp`, `.webp`, `.jpg` | 640–1920, 16:9 | WebP / JPEG | 6.6–141.9 KiB |
| Insights orphan | `public/images/insights/screenshot-2026-07-26-at-11-30-23.webp` | 1919×1248 | WebP | 148.8 KiB |

## Current image optimisation script

`scripts/optimize-images.mjs`:

- jest na stałe związany z trzema źródłami JPEG;
- generuje wyłącznie WebP o szerokościach 640, 960, 1440 i 1920;
- zakłada tę samą proporcję źródła dla wszystkich viewportów;
- generuje globalny OG z obecnego hero.

Nie należy używać go do Phase 1 bez przebudowy kontraktu, ponieważ:

- nie obsługuje AVIF;
- nie rozróżnia desktop / mobile art direction;
- nie rozróżnia operational portrait / landscape;
- ponownie generuje globalny OG, który pozostaje poza Phase 1.

Najbezpieczniejsza ścieżka Phase 1: finalne, ręcznie ocenione production exports są dostarczane bezpośrednio pod nazwami z manifestu. Refaktor skryptu optymalizującego jest osobnym zadaniem i nie jest wymagany do wdrożenia gotowych plików.

# Asset 01 — Homepage Hero

## CURRENT ASSET

Rodzina:

- `public/images/hero-navigation.jpg`;
- `public/images/hero-navigation-640.webp`;
- `public/images/hero-navigation-960.webp`;
- `public/images/hero-navigation-1440.webp`;
- `public/images/hero-navigation.webp`.

Wszystkie pliki mają proporcję 16:9. Obraz zawiera latarnię po prawej, dramatyczny beam, ciężkie granaty i baked-in topographic overlay.

## CURRENT COMPONENTS

- `src/components/sections/HomePage.astro`;
- strony `/` i `/en/`;
- współdzielone copy i alt w `src/i18n/translations.ts`;
- presentation rules w `src/styles/global.css`.

## CURRENT HTML

`HomePage.astro` renderuje:

- jedno `<picture class="hero-media">`;
- jeden `<source type="image/webp">`;
- cztery kandydaty szerokości 640–1920;
- `sizes="100vw"`;
- `<img>` JPEG 1920×1080;
- `fetchpriority="high"`;
- brak `loading="lazy"`, więc hero ładuje się eager;
- jawne `width="1920"` i `height="1080"`;
- alt z `t.home.hero.imageAlt`.

Nie ma:

- AVIF;
- `<source media>`;
- osobnej rodziny mobile;
- osobnego fallbacku dla art-directed mobile.

## CURRENT CSS

Kluczowe reguły:

- `.hero`: `min-height: min(780px, 92svh)`, `overflow: hidden`;
- do 1080 px: `min-height: 730px`;
- do 760 px: `min-height: 690px`;
- `.hero-media`: absolute, `inset: 0`;
- `.hero-media img`: `width: 100%`, `height: 100%`, `object-fit: cover`, `object-position: center`;
- do 760 px: `object-position: 69% center`;
- desktop overlay: dwa gradienty, lewy od 97% do 18% ink opacity i dolne przyciemnienie;
- mobile overlay: osobna, mocniejsza maska lewej strony i dołu.

Układ copy, CTA i featured Insight card jest niezależny od intrinsic ratio obrazu i ma pozostać bez zmian.

## CURRENT RESPONSIVE BEHAVIOR

### Desktop 1024–1920

- przeglądarka wybiera ten sam typ kompozycji 16:9;
- obraz coveruje hero do maksymalnie 780 px wysokości;
- copy zajmuje lewą część;
- featured card jest absolute powyżej 900 px i zajmuje prawy dół;
- latarnia zwykle pozostaje widoczna.

### Intermediate 761–900

- hero ma 730 px wysokości;
- featured card przechodzi do normalnego flow;
- nadal używany jest desktopowy source 16:9;
- przy tak wysokim kontenerze crop jest zbliżony do mobilnego, ale nie ma art-directed source.

### Mobile ≤760

- hero ma minimum 690 px;
- ten sam 16:9 source jest coverowany do bardzo wysokiego prostokąta;
- `object-position: 69% center` przesuwa crop w prawo, ale nie gwarantuje widoczności latarni;
- headline, supporting copy, CTA i featured card wypełniają większość wysokości;
- latarnia wypada z cropu przy najwęższych viewportach.

## TARGET ASSET FAMILY

Nazwa: **Lighthouse & Horizon**.

### Master

- desktop master: 2400×1350, 16:9;
- mobile master: 1000×1500, 2:3, art-directed composition z tej samej visual family.

### Desktop production

- 640×360;
- 960×540;
- 1440×810;
- 1920×1080.

### Mobile production

- 640×960;
- 900×1350.

### Composition contract

- realistyczna północnoeuropejska latarnia w prawej części;
- latarnia obecna, ale nie gigantyczna;
- spokojny horyzont;
- blue hour / pre-dawn;
- lewe 55–60% low-detail pod PL i EN copy;
- prawy dół low-detail pod featured card;
- na mobile latarnia w obrębie środkowych 70% szerokości, aby nie zniknęła po cover;
- brak tekstu, logo, topografii, sztormu i teatralnego beam.

## EXACT TARGET PATHS

### Desktop AVIF

- `public/images/hero-lighthouse-horizon-desktop-640.avif`
- `public/images/hero-lighthouse-horizon-desktop-960.avif`
- `public/images/hero-lighthouse-horizon-desktop-1440.avif`
- `public/images/hero-lighthouse-horizon-desktop-1920.avif`

### Desktop WebP fallback

- `public/images/hero-lighthouse-horizon-desktop-640.webp`
- `public/images/hero-lighthouse-horizon-desktop-960.webp`
- `public/images/hero-lighthouse-horizon-desktop-1440.webp`
- `public/images/hero-lighthouse-horizon-desktop-1920.webp`

### Mobile AVIF

- `public/images/hero-lighthouse-horizon-mobile-640.avif`
- `public/images/hero-lighthouse-horizon-mobile-900.avif`

### Mobile WebP fallback

- `public/images/hero-lighthouse-horizon-mobile-640.webp`
- `public/images/hero-lighthouse-horizon-mobile-900.webp`

Nie jest potrzebny osobny JPEG, jeśli największy WebP pozostaje `<img src>` fallbackem. Archiwalny master nie powinien trafiać do `public/` bez osobnej potrzeby.

## REQUIRED MARKUP CHANGE

W `HomePage.astro` zastąpić pojedynczą rodzinę jednym art-directed `<picture>`.

Docelowa kolejność source:

1. mobile AVIF, `media="(max-width: 900px)"`;
2. mobile WebP, `media="(max-width: 900px)"`;
3. desktop AVIF;
4. desktop WebP;
5. `<img src="/images/hero-lighthouse-horizon-desktop-1920.webp">`.

Mobile breakpoint `900px` jest celowo zgodny z momentem, w którym featured card przechodzi z absolute do normal flow. Przy 768 px hero nadal jest wysoką, mobilną kompozycją i powinien otrzymać pionowy asset. 1024 px pozostaje desktop.

Planowany kontrakt:

```astro
<picture class="hero-media">
  <source
    media="(max-width: 900px)"
    type="image/avif"
    srcset="
      /images/hero-lighthouse-horizon-mobile-640.avif 640w,
      /images/hero-lighthouse-horizon-mobile-900.avif 900w
    "
    sizes="100vw"
  />
  <source
    media="(max-width: 900px)"
    type="image/webp"
    srcset="
      /images/hero-lighthouse-horizon-mobile-640.webp 640w,
      /images/hero-lighthouse-horizon-mobile-900.webp 900w
    "
    sizes="100vw"
  />
  <source
    type="image/avif"
    srcset="
      /images/hero-lighthouse-horizon-desktop-640.avif 640w,
      /images/hero-lighthouse-horizon-desktop-960.avif 960w,
      /images/hero-lighthouse-horizon-desktop-1440.avif 1440w,
      /images/hero-lighthouse-horizon-desktop-1920.avif 1920w
    "
    sizes="100vw"
  />
  <source
    type="image/webp"
    srcset="
      /images/hero-lighthouse-horizon-desktop-640.webp 640w,
      /images/hero-lighthouse-horizon-desktop-960.webp 960w,
      /images/hero-lighthouse-horizon-desktop-1440.webp 1440w,
      /images/hero-lighthouse-horizon-desktop-1920.webp 1920w
    "
    sizes="100vw"
  />
  <img
    src="/images/hero-lighthouse-horizon-desktop-1920.webp"
    width="1920"
    height="1080"
    alt={t.home.hero.imageAlt}
    fetchpriority="high"
  />
</picture>
```

Nie dodawać JS do wyboru cropu. Zachować brak lazy loading.

## REQUIRED CSS CHANGE

Minimalna zmiana:

- usunąć mobilne `object-position: 69% center`;
- używać `object-position: center` dla obu art-directed rodzin;
- nie zmieniać wysokości hero, gridu, copy, CTA ani featured card.

Overlay:

- pierwsza integracja zachowuje aktualne gradienty;
- overlay nie może zostać wzmocniony;
- po realnych screenshotach można zmniejszyć opacity, jeśli oba języki zachowują kontrast;
- żadna korekta overlay nie może służyć do ukrycia słabego obrazu lub artefaktów.

## RESPONSIVE STRATEGY

| VIEWPORT | SOURCE FAMILY | EXPECTED CANDIDATE | COMPOSITION CHECK |
|---:|---|---|---|
| 320 | mobile 2:3 | 640 | Lighthouse visible; no collision with copy/card |
| 375 | mobile 2:3 | 640 | Same |
| 390 | mobile 2:3 | 640 | Same |
| 430 | mobile 2:3 | 640 or 900 by DPR | Same |
| 768 | mobile 2:3 | 900 | Featured card in flow; lighthouse remains visible |
| 1024 | desktop 16:9 | 1440 by DPR/browser | Lighthouse right, card safe |
| 1280 | desktop 16:9 | 1440 | Left copy field and card field clear |
| 1440 | desktop 16:9 | 1440 or 1920 | Primary desktop approval view |
| 1920 | desktop 16:9 | 1920 | No softness or visible AI artifacts |

## LCP / CLS IMPACT

### LCP

- hero pozostaje LCP-critical;
- zachować `fetchpriority="high"`;
- zachować eager loading;
- AVIF zmniejszy transfer względem porównywalnego WebP przy zachowaniu jakości;
- dwa mobile candidates ograniczą pobieranie desktopowego pliku na wąskim ekranie;
- brak JS i brak preload duplikującego niewłaściwy source.

### CLS

- `.hero` zachowuje własną wysokość i absolute media;
- `<img width="1920" height="1080">` pozostaje;
- art-directed source o innej proporcji nie wpływa na flow, ponieważ obraz wypełnia stabilny kontener;
- oczekiwany dodatkowy CLS: `0`.

## ALT TEXT

Docelowy tekst:

- PL: `Latarnia morska na spokojnym horyzoncie przed świtem`
- EN: `A lighthouse on a calm horizon before dawn`

W implementacji zaktualizować wyłącznie odpowiednie pola `home.hero.imageAlt` w `src/i18n/translations.ts`. Plik zawiera niezwiązane lokalne hunks, więc zmiana wymaga selektywnego patchowania i późniejszego stagingu tylko taskowych linii.

## FALLBACK STRATEGY

- AVIF jako pierwszy source;
- WebP o tych samych cropach i szerokościach jako fallback;
- największy desktop WebP jako `<img src>`;
- brak JPEG, jeśli ręczne testy wymaganych przeglądarek potwierdzą WebP;
- jeśli WebP fallback nie przejdzie testu kompatybilności, dodać jeden finalny JPEG desktop i jeden mobile, nie source master.

## ROLLBACK STRATEGY

- nie usuwać `hero-navigation.*` w pierwszym wdrożeniu;
- rollback polega na przywróceniu starego `<picture>` i mobilnego `object-position`;
- nowe assety mogą pozostać nieużywane do czasu decyzji o usunięciu;
- nie przywracać globalnego OG z nowego hero, ponieważ OG pozostaje poza Phase 1.

# Asset 02 — Operational Experience

## CURRENT ASSET

Rodzina:

- `public/images/operational-briefing.jpg`;
- `public/images/operational-briefing-640.webp`;
- `public/images/operational-briefing-960.webp`;
- `public/images/operational-briefing-1440.webp`;
- `public/images/operational-briefing.webp`.

Wszystkie pliki są 16:9 i przedstawiają nocny boardroom / wall display / skyline.

## CURRENT COMPONENTS

- `src/components/sections/HomePage.astro`, `.experience-image`;
- `src/components/pages/AboutPage.astro`, `.about-story picture`;
- Home PL/EN;
- About PL/EN;
- wspólny alt z `t.home.experience.imageAlt`;
- `src/styles/global.css`.

## CURRENT HTML

Oba komponenty mają niemal identyczne `<picture>`:

- jeden WebP source;
- srcset 640, 960, 1440, 1920;
- ten sam 16:9 image family;
- fallback JPEG 1920×1080;
- jawne width / height 1920×1080.

Różnice:

### Home

- `loading="lazy"`;
- `sizes`: viewport width do 1080, potem `545px`.

### About

- `loading="eager"`;
- `sizes`: pełna mobile content width, potem `47vw`, następnie `540px`;
- figcaption poniżej.

## CURRENT CSS

### Home

- desktop panel: grid `0.47fr 0.53fr`, max-width 1160, min-height 530;
- image column min-height 530;
- obraz: `object-fit: cover`, `object-position: center`;
- filtr: `saturate(0.85) contrast(0.98)`;
- ≤1080: panel przechodzi do jednej kolumny, image min-height 410, max-height 500;
- ≤760: image min-height 310.

### About

- desktop grid `0.47fr 0.53fr`, gap 75;
- figure sticky;
- picture `aspect-ratio: 4 / 5`;
- image `object-fit: cover`, `object-position: 59% center`;
- filtr `saturate(0.78)`;
- ≤760: grid jedna kolumna, figure przestaje być sticky, picture `aspect-ratio: 16 / 11`.

## CURRENT RESPONSIVE BEHAVIOR

### Home >1080

16:9 obraz jest coverowany w wysokiej / zbliżonej do kwadratu kolumnie około 545×530 px lub wyższej, zależnie od copy.

### Home ≤1080

Layout staje się jednokolumnowy. Image container jest szeroki i ma 410–500 px wysokości, a na mobile minimum 310 px. To jest docelowy kontekst dla landscape 16:11.

### About >760

Picture ma dokładne 4:5. Obecne 16:9 jest mocno cropowane i przesuwane do 59% szerokości.

### About ≤760

Picture przechodzi do 16:11. Obecne 16:9 pozostaje względnie blisko proporcji, ale nie jest osobnym świadomym cropem.

## TARGET ASSET FAMILY

Nazwa: **Operational Precision**.

### Master

- portrait master: 1600×2000, 4:5;
- landscape master: 1600×1100, 16:11;
- oba exporty z jednej visual family / tej samej sesji.

### Production

- portrait: 960×1200 i 1280×1600;
- landscape: 800×550 i 1280×880.

### Composition contract

- preparation, judgement, structure i high-reliability work;
- centralne 65% zawiera główną relację;
- fizyczne materiały, dokumenty bez czytelnego tekstu, precyzyjny instrument lub fragment poprawnej anatomicznie dłoni;
- naturalne światło;
- maritime może być provenance detail, nie głównym tematem;
- brak boardroom, screen, dashboard, fake UI, headset i military aesthetic.

## EXACT TARGET PATHS

### Portrait AVIF

- `public/images/operational-precision-portrait-960.avif`
- `public/images/operational-precision-portrait-1280.avif`

### Portrait WebP

- `public/images/operational-precision-portrait-960.webp`
- `public/images/operational-precision-portrait-1280.webp`

### Landscape AVIF

- `public/images/operational-precision-landscape-800.avif`
- `public/images/operational-precision-landscape-1280.avif`

### Landscape WebP

- `public/images/operational-precision-landscape-800.webp`
- `public/images/operational-precision-landscape-1280.webp`

Największy portrait WebP pełni rolę `<img src>` fallback. Nie jest potrzebny osobny JPEG.

## REQUIRED MARKUP CHANGE

### HomePage.astro

Breakpoint art direction: `max-width: 1080px`, zgodny z przejściem `.experience-panel` do jednej kolumny.

Source order:

1. landscape AVIF, `media="(max-width: 1080px)"`;
2. landscape WebP, `media="(max-width: 1080px)"`;
3. portrait AVIF;
4. portrait WebP;
5. portrait 1280 WebP fallback.

Target sizes:

```text
landscape:
  (max-width: 760px) calc(100vw - 32px),
  calc(100vw - 44px)

portrait:
  545px
```

Zachować `loading="lazy"` i dodać `decoding="async"`.

### AboutPage.astro

Breakpoint art direction: `max-width: 760px`, zgodny z przejściem `.about-story picture` z 4:5 do 16:11.

Source order:

1. landscape AVIF, `media="(max-width: 760px)"`;
2. landscape WebP, `media="(max-width: 760px)"`;
3. portrait AVIF;
4. portrait WebP;
5. portrait 1280 WebP fallback.

Target sizes:

```text
landscape:
  calc(100vw - 32px)

portrait:
  (max-width: 1080px) 47vw,
  540px
```

Pierwsze wdrożenie zachowuje obecne `loading="eager"`. Zmiana na lazy wymaga osobnego pomiaru About LCP i nie jest warunkiem wymiany obrazu.

## REQUIRED CSS CHANGE

Minimalne zmiany:

- Home: usunąć `filter: saturate(0.85) contrast(0.98)`;
- About: usunąć `filter: saturate(0.78)`;
- About: zmienić `object-position: 59% center` na `center`;
- zachować `object-fit: cover`;
- zachować wszystkie istniejące wymiary kontenerów, grid i breakpointy;
- nie wymuszać nowego `aspect-ratio` w Home, ponieważ zmieniłoby to wysokość panelu.

Finalne assety powinny mieć właściwy grade bez korekty CSS.

## RESPONSIVE STRATEGY

| CONTEXT | VIEWPORT | SOURCE | CONTAINER |
|---|---:|---|---|
| Home | 320–760 | landscape 800/1280 | wide, min-height 310 |
| Home | 768–1080 | landscape 1280 | one-column, 410–500 high |
| Home | 1280–1920 | portrait 960/1280 | około 545×530+ |
| About | 320–760 | landscape 800/1280 | exact 16:11 |
| About | 768–1080 | portrait 960/1280 | exact 4:5, about 47vw |
| About | 1280–1920 | portrait 1280 | exact 4:5, up to 540 wide |

W obu cropach główna relacja musi znajdować się w centralnych 65%. Nie polegać na CSS object-position do ratowania subjectu.

## LCP / CLS IMPACT

### Home

- image pozostaje lazy i jest poniżej hero;
- nie konkuruje z LCP;
- osobny landscape source ogranicza pobranie portrait assetu w jednokolumnowym layoucie;
- jawne dimensions pozostają na fallback `<img>`.

### About

- obraz jest eager, ale znajduje się poniżej PageIntro;
- maksymalny transfer portrait musi pozostać w budżecie;
- po implementacji zmierzyć, czy obraz jest kandydatem LCP; nie zmieniać loading na podstawie założenia.

### CLS

- Home zachowuje min-height kontenera;
- About zachowuje CSS aspect-ratio;
- fallback width / height zmienia się na 1280×1600, zgodny z desktopową rodziną;
- art-directed source nie zmienia flow;
- oczekiwany dodatkowy CLS: `0`.

## ALT TEXT

Docelowy tekst:

- PL: `Materiały robocze i precyzyjne narzędzia używane podczas przygotowania operacyjnego`
- EN: `Working materials and precision instruments used in operational preparation`

Ten sam alt jest używany w Home i About, ponieważ oba miejsca pokazują ten sam obraz i tę samą relację. Zmiana dotyczy wyłącznie `home.experience.imageAlt` w dwóch locale. `src/i18n/translations.ts` ma niezwiązane lokalne hunks i wymaga selektywnej edycji / stagingu w późniejszym tasku.

## FALLBACK STRATEGY

- AVIF primary;
- WebP o identycznych dimensions i cropach;
- portrait 1280 WebP jako `<img src>`;
- przeglądarka bez `<picture>` zobaczy portrait fallback również na mobile; obraz nadal musi mieć centralny subject i nie może być krytyczny dla zrozumienia treści;
- nie dodawać JPEG bez potwierdzonego wymagania kompatybilności.

## ROLLBACK STRATEGY

- zachować `operational-briefing.*` do zakończenia review;
- rollback Home i About jest niezależny: można przywrócić stary `<picture>` w obu komponentach;
- przywrócić stare filtry i About object-position wyłącznie razem ze starym assetem;
- nie usuwać nowych plików, dopóki nie zostanie ustalone, czy wymagają kolejnego cropu.

# Asset 03 — ClearStance Insights

## CURRENT ASSET

Docelowa para artykułów:

- `src/content/insights/pl/kiedy-zespol-kryzysowy-traci-obraz-sytuacji.md`;
- `src/content/insights/en/when-crisis-teams-lose-situational-awareness.md`.

Oba wpisy:

- są opublikowane;
- mają `translationKey: crisis-situational-awareness`;
- są featured;
- nie mają `headerImage`;
- nie mają `headerImageAlt`;
- nie mają `socialImage`.

Aktualnie:

- listing jest typograficzny;
- artykuł nie renderuje lead image;
- social preview używa `/social/clearstance-og.webp`;
- schema Article również wskazuje globalny fallback OG.

## CURRENT COMPONENTS

- `src/layouts/ArticleLayout.astro`;
- `src/components/insights/InsightTeaser.astro`;
- `src/lib/insights.ts`;
- `src/content/insight-schema.ts`;
- `public/admin/config.yml`;
- `public/admin/insights-validation.js`;
- dwa frontmatter files PL/EN;
- CSS `.insight-thumbnail`, `.article-header-image`.

Homepage używa `HomeInsightTeaser.astro` i pozostaje bez thumbnails zgodnie z Phase 1.

## CURRENT HTML

### ArticleLayout

Gdy `headerImage` istnieje:

- renderuje `<div class="wrap article-header-image">`;
- wewnątrz jest pojedynczy `<img>`;
- `src` pochodzi z frontmatter;
- alt pochodzi z `headerImageAlt`;
- `decoding="async"`;
- `fetchpriority="high"`;
- brak `width`, `height`, `srcset`, `<picture>` i `sizes`.

### InsightTeaser

Gdy `headerImage` istnieje:

- dodaje klasę `insight-item--with-image`;
- renderuje decorative thumbnail `aria-hidden="true"`;
- `<img alt="" loading="lazy" decoding="async">`;
- brak dimensions, srcset i picture.

### Social metadata

`resolveInsightSocialImage()` wybiera:

1. `socialImage`;
2. `headerImage`;
3. `/social/clearstance-og.webp`.

`getPublicImageDimensions()` używa Sharp podczas builda i przekazuje prawidłowe `og:image:width` / `height` do `BaseLayout`.

## CURRENT CSS

### Listing

- desktop image column: min 260, max 360 px;
- gap 44–96 px;
- `.insight-thumbnail` ma `aspect-ratio: 3 / 2`;
- image `width/height: 100%`, `object-fit: cover`;
- ≤760: thumbnail przechodzi pod copy i ma `aspect-ratio: 16 / 9`.

### Article

- `.article-header-image`: max-width 1040, margin-top 52, border, radius, PAPER 2;
- brak zarezerwowanej wysokości;
- image ma `width: auto`, `max-width: 100%`, `height: auto`, `max-height: 560px`, `object-fit: contain`;
- ≤760: margin-top 28 i `max-height: none`;
- article grid ma mniejszy top padding, gdy istnieje image.

## CURRENT RESPONSIVE BEHAVIOR

Obecnie nie można zobaczyć zachowania finalnego coveru, bo żaden opublikowany wpis nie ma header image.

Kontrakt CSS przewiduje:

- listing desktop 3:2;
- listing mobile 16:9 crop;
- article lead do max 1040 px, ale bez stałego ratio;
- potencjalny CLS w article lead, ponieważ brak intrinsic dimensions i brak aspect-ratio;
- desktop article może ograniczyć 3:2 obraz do 560 px wysokości i pozostawić go węższym niż container.

## TARGET ASSET FAMILY

Nazwa: **Situational Awareness Field**.

### Master

- 1800×1200, 3:2;
- social master / art-directed crop 1200×630, 1.91:1.

### Production

- article/index: 1200×800 i 1600×1067;
- social: 1200×630.

### Composition contract

- material editorial;
- warm paper, vellum, graphite, ink, muted teal;
- controlled geometry;
- trzy warstwy układające się w centralny wspólny obraz;
- jeden coral signal;
- naturalne cienie materiałów;
- główna relacja w centralnych 70%;
- bez tekstu, pseudo-liter, dashboardu i PowerPoint aesthetic;
- ten sam visual dla PL i EN.

## EXACT TARGET PATHS

### Article/index AVIF

- `public/images/insights/situational-awareness-field-1200.avif`
- `public/images/insights/situational-awareness-field-1600.avif`

### Article/index WebP

- `public/images/insights/situational-awareness-field-1200.webp`
- `public/images/insights/situational-awareness-field-1600.webp`

### Social

- `public/images/insights/situational-awareness-field-social.webp`

Frontmatter fallback path:

`/images/insights/situational-awareness-field-1600.webp`

Social frontmatter path:

`/images/insights/situational-awareness-field-social.webp`

## REQUIRED MARKUP CHANGE

### Responsive family resolver

Obecny CMS zapisuje pojedynczą ścieżkę. Aby zachować schema i CMS bez nowych pól, wdrożyć konwencję wariantów:

- frontmatter `headerImage` wskazuje największy WebP fallback `*-1600.webp`;
- helper w `src/lib/insights.ts` rozpoznaje końcowy suffix `-<width>.webp`;
- helper sprawdza podczas builda istniejące sibling files o tej samej bazie;
- buduje AVIF i WebP srcset wyłącznie z plików, które realnie istnieją;
- odczytuje dimensions fallbacku przez Sharp;
- zwykły pojedynczy upload CMS bez rodziny nadal działa jako jeden `<img>`.

Rekomendowany nowy komponent:

`src/components/insights/ResponsiveInsightImage.astro`

Props:

- `src`;
- `alt`;
- `sizes`;
- `loading`;
- `fetchpriority`;
- `decorative`.

Output:

- `<picture>`;
- opcjonalny AVIF source;
- opcjonalny WebP source;
- fallback `<img>` z width / height;
- puste alt dla decorative thumbnail;
- meaningful alt dla article lead.

### ArticleLayout

Zastąpić bezpośredni `<img>` komponentem:

- sizes: `(max-width: 760px) calc(100vw - 32px), (max-width: 1080px) calc(100vw - 44px), 1040px`;
- loading: eager;
- decoding: async;
- fetchpriority: `auto`.

Hero ma pozostać jedynym obrazem Phase 1 z wymuszonym high priority. Article lead zaczyna się po dużym dark headerze i nie powinien automatycznie konkurować o najwyższy priorytet bez pomiaru LCP.

### InsightTeaser

Zastąpić bezpośredni `<img>` tym samym komponentem:

- decorative: true;
- alt: empty;
- loading: lazy;
- decoding: async;
- sizes: `(max-width: 760px) calc(100vw - 32px), (max-width: 1080px) 32vw, 360px`;
- fetchpriority: auto.

### Frontmatter

Dodać do obu artykułów:

PL:

```yaml
headerImage: /images/insights/situational-awareness-field-1600.webp
headerImageAlt: Warstwy informacji układające się we wspólny obraz sytuacji
socialImage: /images/insights/situational-awareness-field-social.webp
```

EN:

```yaml
headerImage: /images/insights/situational-awareness-field-1600.webp
headerImageAlt: Layers of information aligning into a shared situational picture
socialImage: /images/insights/situational-awareness-field-social.webp
```

## REQUIRED CSS CHANGE

### Article

Po dostarczeniu zatwierdzonego 3:2 visualu:

- `.article-header-image`: dodać `aspect-ratio: 3 / 2`;
- `.article-header-image picture`: `display: block; width: 100%; height: 100%`;
- `.article-header-image img`: `width: 100%; height: 100%; max-height: none; object-fit: cover`;
- zachować max-width 1040, border, radius i background;
- zachować mobile margin-top 28;
- nie dodawać overlay ani caption.

Ta zmiana:

- rezerwuje miejsce przed pobraniem;
- pokazuje pełny systemowy cover w stabilnym ratio;
- usuwa niespójność `contain + max-height: 560px`.

### Listing

- dodać `.insight-thumbnail picture { display: block; width: 100%; height: 100%; }`;
- obecne 3:2 desktop i 16:9 mobile pozostają;
- obecny `object-fit: cover` pozostaje;
- nie zmieniać gridu listy.

## RESPONSIVE STRATEGY

| CONTEXT | VIEWPORT | RATIO / SOURCE | CHECK |
|---|---:|---|---|
| Insights index | 320–760 | CSS 16:9 crop from 3:2; 1200 candidate | Central relation and coral cue visible |
| Insights index | 768–1920 | CSS 3:2; 1200 candidate usually sufficient | Thumbnail legible at 260–360 px |
| Article lead | 320–430 | 3:2; 1200 candidate | No micro-detail; correct margins |
| Article lead | 768–1280 | 3:2; 1200 or 1600 | Relation remains central |
| Article lead | 1440–1920 | 3:2, max-width 1040; 1600 | Material detail and shadows remain natural |
| Social | Crawlers / shares | dedicated 1200×630 WebP | Coral cue not cropped, no live text required |

## LCP / CLS IMPACT

### Listing

- thumbnail pozostaje lazy;
- nowy obraz zwiększa transfer dopiero podczas zbliżenia do viewportu;
- 1200 candidate jest wystarczający przy maksymalnej szerokości 360 px i wysokim DPR;
- nie wpływa na homepage, ponieważ `HomeInsightTeaser` pozostaje typograficzny.

### Article

- dochodzi jeden eager image request;
- `fetchpriority="auto"` ogranicza konkurencję z CSS/fonts i dark header content;
- AVIF primary ogranicza transfer;
- po implementacji pomiar LCP ustali, czy image kiedykolwiek staje się LCP na dużym viewport;
- nie ustawiać `high` bez pomiaru.

### CLS

- width / height na fallback image;
- stały 3:2 container;
- picture wypełnia zarezerwowany box;
- oczekiwany CLS obrazu: `0`.

### Social

- nie jest requestem runtime dla zwykłego użytkownika;
- `getPublicImageDimensions()` ustawi 1200×630 w OG metadata;
- structured data Article będzie wskazywać social crop, zgodnie z obecnym resolverem.

## ALT TEXT

- PL: `Warstwy informacji układające się we wspólny obraz sytuacji`
- EN: `Layers of information aligning into a shared situational picture`

Thumbnail listing pozostaje decorative z pustym alt, ponieważ sąsiadujący tytuł linkuje do tego samego artykułu.

## FALLBACK STRATEGY

- AVIF responsive sources;
- WebP responsive sources;
- `headerImage` w frontmatter wskazuje WebP 1600;
- jeśli helper nie znajdzie rodziny, renderuje zwykły `<img>` z istniejącej ścieżki;
- social pozostaje dedykowanym WebP 1200×630;
- schema i CMS nie wymagają nowych pól;
- CMS stock assets pozostaje wyłączony.

## ROLLBACK STRATEGY

- usunąć trzy image fields z obu frontmatter files;
- article i listing automatycznie wracają do typograficznej wersji;
- OG i Article schema wracają do globalnego `/social/clearstance-og.webp`;
- responsive component może pozostać nieużywany albo zostać usunięty razem z helperem w task-only reversion;
- nie usuwać assetów przed wyjaśnieniem problemu z QC lub cropem.

# CMS and Content Contract

## Existing readiness

`src/content/insight-schema.ts` już:

- dopuszcza AVIF, WebP, JPEG, PNG, GIF i SVG;
- wymaga ścieżki pod `/images/insights/`;
- wymaga meaningful `headerImageAlt`, jeśli istnieje `headerImage`;
- pozwala na osobny `socialImage`.

`public/admin/config.yml` już:

- ma osobne pola header image, alt i social image dla PL/EN;
- zapisuje media do `public/images/insights`;
- wyłącza stock assets;
- ogranicza upload do 5 MiB;
- konwertuje zwykłe uploady raster do pojedynczego WebP, max 1920×1920, quality 84.

`public/admin/insights-validation.js` już:

- odrzuca media spoza `/images/insights/`;
- odrzuca header image bez alt;
- usuwa orphan alt.

## Phase 1 consequence

Nie zmieniać schema ani CMS.

Finalna rodzina AVIF/WebP musi zostać przygotowana poza automatyczną transformacją CMS i dodana pod dokładnymi nazwami. CMS może później wybrać największy WebP i social WebP, ale nie wygeneruje sam całego responsive setu.

# Asset Manifest

Wszystkie statusy wynikają z rzeczywistego przeszukania repo na baseline i aktualnym worktree.

| ASSET | ROLE | MASTER DIMENSIONS | PRODUCTION DIMENSIONS | FORMAT | TARGET FILE NAME | TARGET COMPONENT | DESKTOP/MOBILE | MAX FILE SIZE | STATUS |
|---|---|---:|---:|---|---|---|---|---:|---|
| Lighthouse & Horizon | Hero candidate | 2400×1350 | 640×360 | AVIF | `public/images/hero-lighthouse-horizon-desktop-640.avif` | Home hero | Desktop | 55 KiB | NEEDS GENERATION |
| Lighthouse & Horizon | Hero candidate | 2400×1350 | 640×360 | WebP | `public/images/hero-lighthouse-horizon-desktop-640.webp` | Home hero | Desktop fallback | 80 KiB | NEEDS GENERATION |
| Lighthouse & Horizon | Hero candidate | 2400×1350 | 960×540 | AVIF | `public/images/hero-lighthouse-horizon-desktop-960.avif` | Home hero | Desktop | 90 KiB | NEEDS GENERATION |
| Lighthouse & Horizon | Hero candidate | 2400×1350 | 960×540 | WebP | `public/images/hero-lighthouse-horizon-desktop-960.webp` | Home hero | Desktop fallback | 130 KiB | NEEDS GENERATION |
| Lighthouse & Horizon | Hero candidate | 2400×1350 | 1440×810 | AVIF | `public/images/hero-lighthouse-horizon-desktop-1440.avif` | Home hero | Desktop | 135 KiB | NEEDS GENERATION |
| Lighthouse & Horizon | Hero candidate | 2400×1350 | 1440×810 | WebP | `public/images/hero-lighthouse-horizon-desktop-1440.webp` | Home hero | Desktop fallback | 200 KiB | NEEDS GENERATION |
| Lighthouse & Horizon | Hero LCP | 2400×1350 | 1920×1080 | AVIF | `public/images/hero-lighthouse-horizon-desktop-1920.avif` | Home hero | Desktop | 180 KiB | NEEDS GENERATION |
| Lighthouse & Horizon | Hero fallback | 2400×1350 | 1920×1080 | WebP | `public/images/hero-lighthouse-horizon-desktop-1920.webp` | Home hero | Desktop fallback | 260 KiB | NEEDS GENERATION |
| Lighthouse & Horizon | Hero mobile | 1000×1500 | 640×960 | AVIF | `public/images/hero-lighthouse-horizon-mobile-640.avif` | Home hero | Mobile | 75 KiB | NEEDS GENERATION |
| Lighthouse & Horizon | Hero mobile fallback | 1000×1500 | 640×960 | WebP | `public/images/hero-lighthouse-horizon-mobile-640.webp` | Home hero | Mobile fallback | 105 KiB | NEEDS GENERATION |
| Lighthouse & Horizon | Hero mobile | 1000×1500 | 900×1350 | AVIF | `public/images/hero-lighthouse-horizon-mobile-900.avif` | Home hero | Mobile/tablet | 100 KiB | NEEDS GENERATION |
| Lighthouse & Horizon | Hero mobile fallback | 1000×1500 | 900×1350 | WebP | `public/images/hero-lighthouse-horizon-mobile-900.webp` | Home hero | Mobile fallback | 140 KiB | NEEDS GENERATION |
| Operational Precision | Experience portrait | 1600×2000 | 960×1200 | AVIF | `public/images/operational-precision-portrait-960.avif` | Home / About | Desktop portrait | 110 KiB | NEEDS GENERATION |
| Operational Precision | Experience portrait fallback | 1600×2000 | 960×1200 | WebP | `public/images/operational-precision-portrait-960.webp` | Home / About | Desktop fallback | 160 KiB | NEEDS GENERATION |
| Operational Precision | Experience portrait | 1600×2000 | 1280×1600 | AVIF | `public/images/operational-precision-portrait-1280.avif` | Home / About | Desktop portrait | 150 KiB | NEEDS GENERATION |
| Operational Precision | Experience portrait fallback | 1600×2000 | 1280×1600 | WebP | `public/images/operational-precision-portrait-1280.webp` | Home / About | Desktop fallback | 220 KiB | NEEDS GENERATION |
| Operational Precision | Experience landscape | 1600×1100 | 800×550 | AVIF | `public/images/operational-precision-landscape-800.avif` | Home / About | Mobile/tablet | 75 KiB | NEEDS GENERATION |
| Operational Precision | Experience landscape fallback | 1600×1100 | 800×550 | WebP | `public/images/operational-precision-landscape-800.webp` | Home / About | Mobile fallback | 110 KiB | NEEDS GENERATION |
| Operational Precision | Experience landscape | 1600×1100 | 1280×880 | AVIF | `public/images/operational-precision-landscape-1280.avif` | Home / About | Mobile/tablet | 100 KiB | NEEDS GENERATION |
| Operational Precision | Experience landscape fallback | 1600×1100 | 1280×880 | WebP | `public/images/operational-precision-landscape-1280.webp` | Home / About | Mobile fallback | 150 KiB | NEEDS GENERATION |
| Situational Awareness Field | Article/index | 1800×1200 | 1200×800 | AVIF | `public/images/insights/situational-awareness-field-1200.avif` | Article / InsightTeaser | Responsive | 100 KiB | NEEDS GENERATION |
| Situational Awareness Field | Article/index fallback | 1800×1200 | 1200×800 | WebP | `public/images/insights/situational-awareness-field-1200.webp` | Article / InsightTeaser | Responsive fallback | 160 KiB | NEEDS GENERATION |
| Situational Awareness Field | Article lead | 1800×1200 | 1600×1067 | AVIF | `public/images/insights/situational-awareness-field-1600.avif` | Article / InsightTeaser | Desktop/high DPR | 140 KiB | NEEDS GENERATION |
| Situational Awareness Field | Article fallback | 1800×1200 | 1600×1067 | WebP | `public/images/insights/situational-awareness-field-1600.webp` | Article / InsightTeaser | Desktop fallback | 220 KiB | NEEDS GENERATION |
| Situational Awareness Field | Social preview | 1200×630 | 1200×630 | WebP | `public/images/insights/situational-awareness-field-social.webp` | BaseLayout OG / Article schema | Social | 180 KiB | NEEDS GENERATION |

# Manual AI Image QC Gate

Żaden production export nie może zostać wdrożony wyłącznie na podstawie nazwy lub promptu.

## Hero

- horyzont prosty;
- architektura latarni logiczna;
- prawidłowe okna, balustrady, schody i światło;
- naturalna woda i wybrzeże;
- brak repeated patterns;
- brak fake topographic overlay;
- brak sztormu i exaggerated beam;
- osobna ocena desktop i mobile;
- latarnia widoczna na 320, 375, 390, 430 i 768;
- copy i featured card nie zasłaniają focal point.

## Operational Precision

- poprawna anatomia dłoni;
- poprawna geometria instrumentów;
- logiczne punkty styku z materiałem;
- spójne cienie i odbicia;
- brak pseudo-tekstu;
- brak staged meeting i military look;
- ten sam subject działa w 4:5 i 16:11;
- centralne 65% pozostaje użyteczne w obu exportach.

## Situational Awareness Field

- logiczna relacja warstw;
- cienie wynikają z jednego źródła światła;
- linie są ciągłe, nie tworzą pseudo-liter;
- coral występuje raz;
- brak random patternów i glossy CGI;
- czytelność przy thumbnailu 360×240;
- social crop zachowuje główną relację;
- ten sam plik jest semantycznie neutralny dla PL i EN.

Jeżeli obraz jest wyraźnie rozpoznawalny jako AI, status pozostaje `NEEDS REVIEW` / `REJECT`; nie przechodzi do `READY`.

# Implementation Sequence After Assets Are Ready

## Gate 1 — file validation

1. Potwierdzić wszystkie exact paths.
2. Odczytać dimensions przez Sharp.
3. Sprawdzić format signature.
4. Sprawdzić każdy file size względem manifestu.
5. Odrzucić pliki z embedded text / metadata leak / niepoprawną orientacją.
6. Wykonać manual QC w 100%.

## Gate 2 — hero only

1. Zmienić hero picture.
2. Zaktualizować tylko hero alt PL/EN.
3. Usunąć mobilne object-position 69%.
4. Nie ruszać overlay przed screenshot review.
5. Sprawdzić PL/EN na wszystkich viewportach.
6. Zmierzyć LCP i transferred candidate.

## Gate 3 — operational image

1. Zmienić Home picture z breakpointem 1080.
2. Zmienić About picture z breakpointem 760.
3. Zaktualizować wspólny alt PL/EN.
4. Usunąć obecne filtry i About object-position 59%.
5. Sprawdzić Home oraz About niezależnie.

## Gate 4 — Insights prototype

1. Dodać responsywny image-family resolver i component.
2. Zmienić ArticleLayout oraz InsightTeaser.
3. Dodać image fields do dwóch frontmatter files.
4. Dodać stałe 3:2 article lead.
5. Sprawdzić listing, article i OG metadata.
6. Nie przypisywać obrazu innym artykułom.

## Gate 5 — brand-statement review

Bez zmiany assetu:

- porównać pełne Home PL/EN;
- sprawdzić, czy druga latarnia działa jako echo signature motif;
- sprawdzić, czy oba obrazy nie tworzą nadmiernej powtarzalności;
- decyzja Phase 1 pozostaje `KEEP PROVISIONALLY`;
- ewentualna wymiana jest osobnym taskiem.

# Expected Implementation File Map

Po dostarczeniu assetów task implementacyjny prawdopodobnie obejmie:

| FILE | CHANGE |
|---|---|
| `public/images/hero-lighthouse-horizon-*` | Add approved hero AVIF/WebP family |
| `public/images/operational-precision-*` | Add approved portrait/landscape AVIF/WebP family |
| `public/images/insights/situational-awareness-field-*` | Add approved article/social family |
| `src/components/sections/HomePage.astro` | Hero + Home operational art-directed picture |
| `src/components/pages/AboutPage.astro` | About operational art-directed picture |
| `src/components/insights/ResponsiveInsightImage.astro` | New generic responsive image renderer |
| `src/components/insights/InsightTeaser.astro` | Use responsive renderer |
| `src/layouts/ArticleLayout.astro` | Use responsive renderer and intrinsic sizing |
| `src/lib/insights.ts` | Resolve optional public image families |
| `src/content/insights/pl/kiedy-zespol-kryzysowy-traci-obraz-sytuacji.md` | Assign header/social image and PL alt |
| `src/content/insights/en/when-crisis-teams-lose-situational-awareness.md` | Assign same visual and EN alt |
| `src/i18n/translations.ts` | Task-only hero and operational alt hunks |
| `src/styles/global.css` | Task-only crop/filter/picture/aspect-ratio hunks |
| `scripts/check-dist.mjs` | Add focused built-HTML contracts if implementation requires |
| `tests` or `scripts/check-content.mjs` | Extend only for real new image-family behavior; do not weaken existing checks |

Mixed local files `src/i18n/translations.ts` i `src/styles/global.css` muszą być edytowane oraz później stage’owane selektywnie. Niezwiązane privacy hunks pozostają poza taskiem.

# Test and QA Plan After Implementation

## Automated Quality

Uruchomić:

```text
npm run check
npm run typecheck
npm run test:contact
npm run test:frontend
npm run test:content
npm run build
npm run check:links
npm run test:dist
npm run check:worker
```

## Additional built-output contracts

W `test:dist` lub równoważnym focused check potwierdzić:

- hero ma mobile AVIF/WebP sources przed desktop sources;
- hero `<img>` zachowuje `fetchpriority="high"` i dimensions;
- Home operational używa landscape do 1080 i portrait powyżej;
- About operational używa landscape do 760 i portrait powyżej;
- PL/EN article renderują ten sam header image family;
- article `<img>` ma width / height;
- listing thumbnail pozostaje lazy;
- OG image PL/EN wskazuje social 1200×630;
- wszystkie asset references istnieją w `dist`.

## Responsive visual QA

### Home PL/EN

Viewporty:

- 320;
- 375;
- 390;
- 430;
- 768;
- 1024;
- 1280;
- 1440;
- 1920.

Sprawdzić:

- latarnia widoczna;
- prosty horyzont;
- kontrast headline i supporting copy;
- CTA;
- featured Insight card;
- brak collision;
- brak banding;
- właściwy source candidate;
- hero nie jest cięższy wizualnie niż copy.

### Experience Home PL/EN

- subject centralny w desktop portrait family;
- landscape crop przy 768 i 1024;
- brak dziwnej geometrii narzędzi;
- brak zmiany wysokości sekcji;
- filtr CSS nie niszczy materiałów — docelowo filtr usunięty.

### About PL/EN

- 4:5 powyżej 760;
- 16:11 do 760;
- sticky figure bez zmian;
- centralny subject;
- figcaption bez zmian.

### Insights PL/EN

- index desktop 3:2;
- index mobile 16:9 crop;
- article lead 3:2;
- brak CLS;
- social 1200×630;
- alt tylko na article lead;
- decorative thumbnail ma puste alt;
- tytuł nie jest częścią rastra.

## Performance review

Zarejestrować:

- real file selected per viewport;
- transferred bytes;
- LCP element i czas;
- CLS;
- image decode timing;
- whether About eager image competes with PageIntro;
- dark-gradient banding po AVIF/WebP compression.

# Performance Budgets

| FAMILY | PRIMARY BUDGET | FALLBACK BUDGET |
|---|---:|---:|
| Hero desktop max | AVIF ≤180 KiB | WebP ≤260 KiB |
| Hero mobile max | AVIF ≤100 KiB | WebP ≤140 KiB |
| Operational portrait max | AVIF ≤150 KiB | WebP ≤220 KiB |
| Operational landscape max | AVIF ≤100 KiB | WebP ≤150 KiB |
| Insights article max | AVIF ≤140 KiB | WebP ≤220 KiB |
| Insights social | WebP ≤180 KiB | — |

Budżet jest limitem, nie celem. Nie obniżać jakości tak daleko, aby pojawił się banding, zanik cieni materiałów lub nienaturalne krawędzie.

# Rollback Matrix

| AREA | FAST ROLLBACK | DATA LOSS RISK |
|---|---|---|
| Hero | Restore old picture + mobile object-position | None; old assets retained |
| Operational Home | Restore old picture + filters | None |
| Operational About | Restore old picture + 59% object-position/filter | None |
| Insights article/list | Remove frontmatter image fields | None; returns to typographic version |
| Insights social | Remove `socialImage` fields | None; resolver returns global OG |
| Responsive image helper | Remove component/helper only after no references remain | None |
| Brand statement | No rollback required; unchanged | None |

# NEEDS GENERATION

1. **Lighthouse & Horizon desktop**
   Master 2400×1350; production 640×360, 960×540, 1440×810, 1920×1080; AVIF + WebP.

2. **Lighthouse & Horizon mobile**
   Master 1000×1500; production 640×960 i 900×1350; AVIF + WebP; osobna art-directed composition.

3. **Operational Precision portrait**
   Master 1600×2000; production 960×1200 i 1280×1600; AVIF + WebP.

4. **Operational Precision landscape**
   Master 1600×1100; production 800×550 i 1280×880; AVIF + WebP.

5. **Situational Awareness Field 3:2**
   Master 1800×1200; production 1200×800 i 1600×1067; AVIF + WebP.

6. **Situational Awareness Field social**
   Dedykowany crop 1200×630; WebP; bez tytułu w rasterze.

# Stop Condition

Wszystkie wymagane nowe assety mają status `NEEDS GENERATION`.

Do czasu dostarczenia i manualnego zatwierdzenia finalnych plików:

- nie zmieniać production markup;
- nie zmieniać CSS;
- nie zmieniać frontmatter;
- nie zmieniać translations;
- nie generować placeholderów;
- nie kopiować starych obrazów pod nowe nazwy;
- nie zmieniać globalnego OG;
- nie zmieniać brand-statement;
- nie rozpoczynać Services visual refresh.
