# Audyt techniczny ClearStance

**Data audytu:** 27 lipca 2026
**Zakres:** całe repozytorium oraz publiczna produkcja `https://clearstance.pl`
**Charakter audytu:** statyczna analiza kodu i konfiguracji, testy lokalne, testy HTTP/DNS/TLS, przegląd produkcji w przeglądarce, testy responsywne i laboratoryjne Lighthouse
**Status raportu:** diagnoza — rekomendacje nie zostały wdrożone

## Jak czytać raport

- **CONFIRMED** — wynik potwierdzony kodem, odpowiedzią produkcji albo wykonanym testem.
- **LIKELY** — kod daje mocne podstawy do wniosku, ale scenariusz nie występuje jeszcze w obecnych danych albo nie został odtworzony end-to-end.
- **MANUAL CHECK** — stan zależy od panelu Cloudflare, GitHub, poczty, prawa lub realnego urządzenia i nie może być wiarygodnie ustalony wyłącznie z repozytorium.
- **P0** — realne krytyczne zagrożenie, utrata danych albo niedziałająca kluczowa funkcja.
- **P1** — istotny problem bezpieczeństwa, prywatności, poprawności lub działania serwisu.
- **P2** — problem średni, który należy zaplanować, lecz nie wymaga awaryjnej interwencji.
- **P3** — dopracowanie, ograniczenie długu albo cleanup.

Audyt obejmuje bieżący, zmodyfikowany lokalnie working tree. Nie cofałem ani nie zmieniałem zastanych prac. Produkcja jest zbliżona do `origin/main`, ale nie zawiera m.in. lokalnie dodanych tras polityki prywatności. Konfiguracja i skrypty `/admin/` były zgodne bajtowo z lokalnymi odpowiednikami w czasie audytu.

# A. Executive summary

1. Nie znalazłem P0, ujawnionych sekretów, znanej podatnej zależności ani podatności umożliwiającej anonimowemu użytkownikowi bezpośrednie wykonanie kodu lub wysyłkę wiadomości z pominięciem Turnstile.
2. Produkcja pod `http://clearstance.pl` zwraca treść z kodem `200`, zamiast przekierować do HTTPS. Jednocześnie `www.clearstance.pl` kończy się błędem Cloudflare `522`. To najpilniejszy problem warstwy domeny i transportu.
3. Odpowiedzi HTML nie mają HSTS, CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` ani ochrony przed osadzaniem. Warstwa aplikacyjna jest ostrożna, ale edge nie domyka ochrony przeglądarkowej.
4. Panel Sveltia ładuje nieprzypięty skrypt `@sveltia/cms` z UNPKG. W czasie audytu URL przechodził na wersję `0.173.0` i pobierał około 2,06 MB kodu. Ten kod działa w kontekście sesji OAuth z zakresem GitHub `repo,user`; jest to realne ryzyko łańcucha dostaw.
5. Produkcja zbiera dane przez formularz, lecz nie ma publicznej polityki prywatności ani kontekstowego linku przy formularzu. Lokalny projekt polityki istnieje, ale nadal zawiera literalny placeholder `[[LEGAL_CONTROLLER_NAME]]`. Wdrożenie musi być poprzedzone uzupełnieniem danych i przeglądem prawnym.
6. Canonicale, hreflangi, sitemap i linki wewnętrzne używają adresów bez końcowego ukośnika, podczas gdy Cloudflare przekierowuje je kodem `307` na wariant z ukośnikiem. Sygnały SEO i adres docelowy nie są spójne, a nawigacja wykonuje zbędne przekierowania.
7. Nie istnieje własna strona 404. Produkcja zwraca poprawny status `404`, ale z pustym body, co urywa ścieżkę użytkownika.
8. Formularz ma dobrze zaprojektowaną walidację serwerową, limit requestu, kontrolę hostname/action Turnstile, honeypot, bezpieczne nagłówki wiadomości i 22 testy. Brakuje natomiast timeoutu w kodzie przeglądarkowym, dobrego trybu bez JavaScriptu oraz potwierdzonego testu rzeczywistego doręczenia.
9. Wyniki laboratoryjne są bardzo dobre: strony inne niż kontakt uzyskały Performance 100, Accessibility 100 i Best Practices 100. Kontakt uzyskał Performance 93; Turnstile odpowiada za większość z około 522 KiB transferu i LCP 2,9 s. To nie są dane terenowe CrUX.
10. Widoki na szerokościach 320, 375, 430, 768, 1024, 1280, 1440 i 1920 px nie wykazały poziomego overflow ani krytycznych problemów układu. Menu klawiaturowe, Escape, powrót fokusu, inert i blokada scrolla działają.
11. PL i EN są obecnie technicznie równoważne: trasy, opublikowane artykuły, hreflangi i przełącznik języka mają pary. Największym ryzykiem dalszego rozwoju jest brak automatycznej walidacji unikalności slugów/`translationKey`, par językowych i zgodności konfiguracji CMS ze schematem Astro.
12. Architektura jest proporcjonalna do obecnego rozmiaru. Główne ryzyka skalowania to zapis CMS bezpośrednio do `main`, brak CI/E2E, monolity `global.css` i `translations.ts`, lista Insights bez paginacji oraz powielone kontrakty konfiguracji.

## Oceny

| Obszar | Ocena | Uzasadnienie |
|---|---:|---|
| Security | 6/10 | Mocny endpoint formularza, brak sekretów i znanych CVE; ocenę obniżają HTTP bez redirectu, brak nagłówków oraz nieprzypięty CMS z szerokim OAuth. |
| Architecture | 8/10 | Prosty static-first Astro + mały Worker jest adekwatny; granice są czytelne, choć kontrakty i edge wymagają domknięcia. |
| Code quality | 8/10 | TypeScript strict, czysty build i sensowne komponenty; brakuje lintingu, szerszych testów i kilku bezpiecznych helperów. |
| UI/UX | 8/10 | Spójna, czytelna prezentacja na pełnym zakresie szerokości; pusty 404 i niespójna ścieżka kontaktowa są wyraźnymi lukami. |
| Accessibility | 9/10 | Dobre semantyka, fokus, skip link, menu i wyniki automatyczne; pełna zgodność WCAG wymaga nadal testu manualnego. |
| Performance | 9/10 | Bardzo mały publiczny frontend i świetne wyniki większości stron; koszt Turnstile i przyszłe obrazy artykułów są głównymi rezerwami. |
| SEO | 7/10 | Metadane, hreflangi, RSS, sitemap i Article schema są rozbudowane; ukośniki, pusty 404 i robots obniżają poprawność techniczną. |
| CMS | 7/10 | Sveltia działa, a workaround obrazów jest poprawnie zachowany; supply chain, bezpośredni zapis do `main` i brak kontraktów walidacyjnych wymagają poprawy. |
| Maintainability | 7/10 | Mały system jest obecnie łatwy do utrzymania, ale brak CI i rosnące pliki centralne zwiększą koszt zmian. |

# B. Architecture map

```text
Markdown PL/EN + src/content.config.ts
               │
               ▼
      Astro 7, static output
       │       │        │
       │       │        └── metadata, JSON-LD, sitemap, RSS
       │       └────────── shared PL/EN components + translations.ts
       └────────────────── dist/ (HTML, CSS, images, admin)
                              │
                              ▼
                     Cloudflare Worker
                      │              │
        static asset binding          └── /api/contact
        auto-trailing-slash                │
                                          ├── Turnstile Siteverify
                                          └── Cloudflare Email binding

/admin/ ── Sveltia CMS from UNPKG
   │
   ├── public/admin/config.yml
   ├── public/admin/insights-validation.js
   ├── OAuth Worker / GitHub OAuth
   └── write to GitHub repository, branch main
```

Najważniejsze zależności:

- `astro.config.mjs:6-27` ustawia domenę, static output, i18n, Markdown Satteri i Tailwind/Vite.
- `src/i18n/routes.ts:10-26` jest centralnym kontraktem tras statycznych.
- `src/i18n/translations.ts` zawiera większość treści stron i oba języki; Markdown w `src/content/insights/` przechowuje artykuły.
- `src/content.config.ts` waliduje frontmatter przy buildzie.
- `wrangler.jsonc:6-11` serwuje `dist`, wymusza końcowy ukośnik i kieruje `/api/*` do Workera.
- `worker/contact.ts:392-526` jest jedyną publiczną logiką dynamiczną aplikacji.
- `public/admin/config.yml` i `public/admin/insights-validation.js` definiują drugi, przeglądarkowy poziom kontraktu treści.

Architektura nie potrzebuje obecnie bazy danych, SSR ani rozbudowanego frameworka i18n. Najlepszym kierunkiem jest domknięcie istniejących granic, nie wymiana stosu.

# C. Findings

## P0 — Critical

Brak findingów P0.

## P1 — High

### SEC-01

- **Severity:** P1
- **Area:** Security / edge / SEO
- **Location:** produkcja `http://clearstance.pl`; konfiguracja poza repozytorium
- **Evidence:** **CONFIRMED** — request HTTP zwrócił `200` i pełne HTML, zamiast 301/308 do HTTPS. TLS dla HTTPS jest ważny.
- **Impact:** użytkownik może pozostać na nieszyfrowanym połączeniu; canonical HTTPS nie chroni transportu. Nie można bezpiecznie polegać na HSTS, dopóki pierwszy request HTTP nie jest przekierowany.
- **Recommendation:** włączyć deterministyczny redirect HTTP→HTTPS na Cloudflare, preferencyjnie `308` lub `301`; przetestować wszystkie hosty i ścieżki przed dodaniem HSTS.
- **Implementation complexity:** niska
- **Regression risk:** niski, jeśli wcześniej naprawiony i przetestowany zostanie host `www`
- **Confidence:** wysoka

### EDGE-01

- **Severity:** P1
- **Area:** Domain / correctness
- **Location:** produkcja `www.clearstance.pl`, DNS/Cloudflare
- **Evidence:** **CONFIRMED** — HTTP i HTTPS dla `www` kończyły się timeoutem / Cloudflare `522`; rekordy DNS prowadzą przez Cloudflare, a certyfikat obejmuje wildcard.
- **Impact:** popularny wariant domeny jest niedostępny; traci ruch, wiarygodność i utrudnia bezpieczne użycie HSTS z `includeSubDomains`.
- **Recommendation:** ustalić jeden host kanoniczny (`clearstance.pl`) i skonfigurować `www` jako redirect 301/308 bez zależności od niedostępnego originu; usunąć lub naprawić wskazujący na błędny cel rekord/route.
- **Implementation complexity:** niska–średnia
- **Regression risk:** średni — zmiana DNS/route wymaga kontroli obu protokołów, certyfikatu i cache
- **Confidence:** wysoka co do objawu; przyczyna wymaga panelu Cloudflare

### SEC-02

- **Severity:** P1
- **Area:** Browser security
- **Location:** produkcyjne odpowiedzi HTML i statyczne; brak `_headers`; `worker/contact.ts:106-113`
- **Evidence:** **CONFIRMED** — odpowiedzi nie zawierały CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` ani `frame-ancestors`/`X-Frame-Options`.
- **Impact:** przeglądarka nie ma warstw ograniczających skutki XSS, osadzania strony, sniffingu typu i wycieku referera. Ryzyko jest większe w `/admin/`, gdzie działa kod zewnętrzny i sesja OAuth.
- **Recommendation:** po naprawie hostów dodać HSTS; wdrożyć osobne, testowane polityki nagłówków dla publicznych stron, `/kontakt`/`/en/contact`, `/admin/` i API. CSP formularza musi dopuścić `https://challenges.cloudflare.com` w `script-src` i `frame-src`; CSP admina powinno odpowiadać finalnemu sposobowi hostowania Sveltia.
- **Implementation complexity:** średnia
- **Regression risk:** średni — zbyt restrykcyjna CSP może zepsuć Turnstile lub CMS
- **Confidence:** wysoka

Cloudflare obsługuje statyczne nagłówki przez plik `_headers`, ale odpowiedzi generowane przez Worker wymagają własnych nagłówków: [Cloudflare Static Assets — Headers](https://developers.cloudflare.com/workers/static-assets/headers/). Wymagania CSP Turnstile opisuje [oficjalna dokumentacja Cloudflare](https://developers.cloudflare.com/turnstile/reference/content-security-policy/).

### CMS-01

- **Severity:** P1
- **Area:** CMS / supply chain / security
- **Location:** `public/admin/index.html:16`; produkcja `/admin/`
- **Evidence:** **CONFIRMED** — panel ładuje `https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js` bez wersji i SRI. W czasie testu nastąpił redirect do `@sveltia/cms@0.173.0`; skrypt miał ok. 2 056 146 B. Logowanie otwiera GitHub OAuth z zakresem `repo,user`.
- **Impact:** przejęcie pakietu, CDN albo niekontrolowana zmiana najnowszej wersji może wykonać kod w kontekście panelu i tokenu dającego dostęp do repozytoriów użytkownika.
- **Recommendation:** przypiąć zweryfikowaną wersję, a preferencyjnie przechowywać zweryfikowany artefakt lokalnie; objąć aktualizację kontrolowanym procesem i CSP. Zweryfikować minimalny zakres OAuth oraz używać dedykowanego konta z 2FA i minimalnym dostępem.
- **Implementation complexity:** niska dla pinowania, średnia dla self-hostingu i procesu aktualizacji
- **Regression risk:** niski–średni
- **Confidence:** wysoka

### PRIV-01

- **Severity:** P1
- **Area:** Privacy / legal readiness / UX
- **Location:** produkcja formularza; lokalnie `src/components/pages/PrivacyPage.astro:17,49`, `src/content/privacy.ts:46-54,176-184`
- **Evidence:** **CONFIRMED** — produkcyjne `/polityka-prywatnosci/` i `/en/privacy/` zwracały pusty `404`, a formularz nie linkował do informacji o przetwarzaniu. Lokalna polityka i linki nie są wdrożone oraz zawierają placeholder `[[LEGAL_CONTROLLER_NAME]]`.
- **Impact:** osoba podająca dane nie otrzymuje w dostępny sposób kompletnej informacji o administratorze i przetwarzaniu w momencie zbierania danych. Wdrożenie placeholdera byłoby wizerunkowo i formalnie błędne.
- **Recommendation:** ustalić prawidłową nazwę i dane administratora, podstawy prawne, retencję, odbiorców i transfery; wykonać przegląd prawny; dodać krótką informację i link bezpośrednio przy formularzu; dopiero wtedy wdrożyć obie wersje.
- **Implementation complexity:** średnia, głównie organizacyjna/prawna
- **Regression risk:** niski technicznie, wysoki w przypadku publikacji niezweryfikowanej treści
- **Confidence:** wysoka co do stanu technicznego; interpretacja prawna wymaga prawnika

To nie jest porada prawna. Zakres informacji podawanych przy zbieraniu danych wynika m.in. z art. 13 RODO: [Rozporządzenie (UE) 2016/679, EUR-Lex](https://eur-lex.europa.eu/legal-content/PL/AUTO/?uri=CELEX%3A32016R0679).

## P2 — Medium

### SEO-01

- **Severity:** P2
- **Area:** SEO / routing / performance
- **Location:** `astro.config.mjs:7-10`, `wrangler.jsonc:6-11`, `src/i18n/routes.ts:10-26`, `src/pages/sitemap.xml.ts`
- **Evidence:** **CONFIRMED** — aplikacja generuje adresy bez ukośnika, np. `/oferta`, a edge odpowiada `307` do `/oferta/`. Finalne HTML wskazuje canonical z powrotem na adres przekierowujący. Dotyczy linków wewnętrznych, hreflangów i sitemap.
- **Impact:** każdy taki link wymaga dodatkowego requestu; canonical, redirect i sitemap nie wskazują jednego identycznego wariantu URL.
- **Recommendation:** wybrać jedną konwencję i ujednolicić Astro, Cloudflare, trasy, canonicale, hreflangi, sitemap, RSS i linki. Dla obecnego edge najmniej zaskakujący jest wariant z ukośnikiem.
- **Implementation complexity:** średnia
- **Regression risk:** średni — zmiana dotyczy wszystkich tras i powinna zachować redirecty ze starego wariantu
- **Confidence:** wysoka

Google zaleca spójność redirectów, canonicali, sitemap i linków wewnętrznych: [Canonicalization — Google Search Central](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

### UX-01

- **Severity:** P2
- **Area:** Error handling / UX / SEO
- **Location:** brak `src/pages/404.astro`; `wrangler.jsonc:10`
- **Evidence:** **CONFIRMED** — nieistniejąca ścieżka zwraca `404` z pustym body i `Content-Length: 0`.
- **Impact:** użytkownik nie otrzymuje wyjaśnienia, nawigacji, kontaktu ani przełączenia języka; bot nie widzi użytecznej strony błędu.
- **Recommendation:** dodać lekką, dwujęzyczną lub językowo dopasowaną stronę 404 z linkami do strony głównej, oferty, Insights i kontaktu; zachować status 404.
- **Implementation complexity:** niska
- **Regression risk:** niski
- **Confidence:** wysoka

### FORM-01

- **Severity:** P2
- **Area:** Contact form / resilience
- **Location:** `src/components/pages/ContactPage.astro:263-362`
- **Evidence:** **CONFIRMED** — frontend używa `fetch`, ale nie ma `AbortController` ani timeoutu; przy rozpoczęciu wysyłki blokuje przycisk.
- **Impact:** zawieszony request może pozostawić formularz bez końca w stanie oczekiwania i bez instrukcji odzyskania.
- **Recommendation:** dodać rozsądny timeout przeglądarkowy, lokalny komunikat oraz bezpieczne przywrócenie przycisku i Turnstile; nie anulować po stronie serwera wysyłki, która mogła już się powieść, bez jasnej informacji dla użytkownika.
- **Implementation complexity:** niska
- **Regression risk:** niski–średni z uwagi na niejednoznaczność timeoutu po wysłaniu
- **Confidence:** wysoka

### FORM-02

- **Severity:** P2
- **Area:** Contact form / progressive enhancement / accessibility
- **Location:** `src/components/pages/ContactPage.astro:60-183`, `worker/contact.ts:392-526`
- **Evidence:** **CONFIRMED** — bez JavaScriptu Turnstile nie dostarcza tokenu, a natywne wysłanie formularza kończy się surową odpowiedzią JSON, nie użytecznym ekranem HTML.
- **Impact:** formularz nie działa jako realne progressive enhancement przy zablokowanym lub niedostępnym JS. Użytkownik traci kontekst i nawigację.
- **Recommendation:** albo jawnie przyjąć wymaganie JS i zapewnić dostępny fallback `mailto`/telefon wraz z komunikatem, albo rozróżniać żądania HTML i zwracać bezpieczną stronę wyniku. Nie obniżać ochrony antyspamowej.
- **Implementation complexity:** średnia
- **Regression risk:** średni
- **Confidence:** wysoka

### UX-02

- **Severity:** P2
- **Area:** User journey / contact
- **Location:** `src/components/ContactBand.astro:29`; `src/components/pages/HomePage.astro:367+`; header/footer/routes
- **Evidence:** **CONFIRMED** — kontakt w pasku strony głównej prowadzi przez `mailto:`, podczas gdy inne elementy nawigacji prowadzą do dedykowanego formularza.
- **Impact:** dwie równorzędnie wyglądające ścieżki mają inne zachowanie; na urządzeniu bez skonfigurowanego klienta poczty CTA może nie zadziałać.
- **Recommendation:** ustanowić formularz jako główne CTA, a adres e-mail jako widoczny fallback. Zachować oba mechanizmy, lecz jasno rozdzielić role.
- **Implementation complexity:** niska
- **Regression risk:** niski
- **Confidence:** wysoka

### CMS-02

- **Severity:** P2
- **Area:** CMS / content integrity
- **Location:** `src/content.config.ts`; `public/admin/config.yml:42-235`; `public/admin/insights-validation.js:11-58`; `src/layouts/ArticleLayout.astro:49-55,139-147`
- **Evidence:** **CONFIRMED** dla brakujących reguł, **LIKELY** dla skutku — nie ma walidacji unikalności slugów i `translationKey`, zgodności locale ze ścieżką, par językowych, kolejności dat, dat przyszłych, istnienia/typu pliku obrazu ani parytetu CMS↔Zod. Gdy `socialImage` jest poprawny, a `headerImage` wskazuje brakujący plik, build sprawdza wymiary social image i może pozostawić zepsuty widoczny obraz.
- **Impact:** autoryzowany redaktor może utworzyć konflikt tras, błędne hreflangi, niedostępny obraz lub niespójne dane bez zatrzymania builda.
- **Recommendation:** dodać osobny test kontraktowy treści i plików. Zachować obecny workaround Sveltia: **nie dodawać `pattern` do pól image**, utrzymać `choose_url: false`, `stock_assets: false` i sprawdzanie ścieżek w `preSave`.
- **Implementation complexity:** średnia
- **Regression risk:** niski, jeśli najpierw uruchomić test w trybie raportującym istniejące dane
- **Confidence:** wysoka/średnia zgodnie z rozdzieleniem powyżej

### CMS-03

- **Severity:** P2
- **Area:** CMS / release workflow
- **Location:** `public/admin/config.yml:3-12`; GitHub/Cloudflare poza repo
- **Evidence:** **CONFIRMED** — CMS zapisuje do `main`; repozytorium nie ma workflow CI. **MANUAL CHECK** — branch protection, wymagane review, 2FA i ograniczenia OAuth.
- **Impact:** błędny zapis redakcyjny może natychmiast uruchomić wdrożenie bez testów. Skala ryzyka rośnie z liczbą redaktorów.
- **Recommendation:** co najmniej uruchamiać build, check, testy formularza, link checker i kontrakty treści na każdy push; przy większym zespole rozważyć editorial workflow/PR albo branch pośredni.
- **Implementation complexity:** średnia
- **Regression risk:** niski technicznie, średni dla wygody publikacji
- **Confidence:** wysoka dla repo, stan GitHub wymaga weryfikacji

### SEC-03

- **Severity:** P2
- **Area:** XSS defense in depth
- **Location:** `src/layouts/BaseLayout.astro:135`; dane CMS w `src/layouts/ArticleLayout.astro:58-76`
- **Evidence:** **CONFIRMED** — JSON-LD jest wstawiany przez `set:html={JSON.stringify(schema)}`. `JSON.stringify` nie neutralizuje znaku `<`; wartość zawierająca `</script>` może zakończyć element script.
- **Impact:** złośliwa treść CMS może wykonać HTML/JS. Obecnie redaktor CMS ma zapis do repozytorium, więc ma już praktycznie uprawnienie do zmiany kodu — finding jest obroną warstwową, nie anonimowym exploitem.
- **Recommendation:** użyć centralnego serializer-a JSON-LD neutralizującego co najmniej `<` jako `\\u003c`; dodać test z `</script>` i CSP.
- **Implementation complexity:** niska
- **Regression risk:** niski
- **Confidence:** wysoka co do sinka, ograniczona ekspozycja przez obecny model zaufania

### PERF-01

- **Severity:** P2
- **Area:** Performance / media / CMS
- **Location:** `src/layouts/ArticleLayout.astro:139-147`, `src/components/insights/InsightTeaser.astro:44-51`
- **Evidence:** **LIKELY** — elementy CMS-owych obrazów nie mają `width`, `height`, `srcset` ani `sizes`. Obecne opublikowane artykuły nie mają takich obrazów, więc Lighthouse nie zmierzył regresji.
- **Impact:** po dodaniu dużych obrazów możliwy jest CLS oraz przesyłanie zbyt dużych plików na mobile.
- **Recommendation:** po walidacji pliku wyprowadzać wymiary oraz warianty responsywne; testować co najmniej obraz nagłówkowy i teaser. Nie zmieniać wymaganego sposobu wyboru ścieżki w Sveltia.
- **Implementation complexity:** średnia
- **Regression risk:** średni — dotyczy pipeline obrazów i CMS
- **Confidence:** średnia

### PERF-02

- **Severity:** P2
- **Area:** Performance / third-party
- **Location:** produkcyjne strony `/kontakt/`, `/en/contact/`; Turnstile
- **Evidence:** **CONFIRMED** — Lighthouse mobile: Performance 93, LCP 2,9 s, około 522 KiB transferu. Sam XHR Turnstile miał ok. 333 KiB, dokument iframe ok. 105 KiB, a skrypt API ok. 27 KiB.
- **Impact:** kontakt jest zdecydowanie cięższy od pozostałych stron, szczególnie na słabszych urządzeniach i sieciach.
- **Recommendation:** najpierw zebrać RUM/CrUX; następnie przetestować ładowanie widgetu przy zbliżeniu do formularza lub pierwszej intencji, bez pogorszenia dostępności i skuteczności antyspamu. Nie usuwać Turnstile wyłącznie dla wyniku Lighthouse.
- **Implementation complexity:** średnia
- **Regression risk:** średni–wysoki
- **Confidence:** wysoka dla pomiaru laboratoryjnego

### NET-01

- **Severity:** P2
- **Area:** Email domain security
- **Location:** DNS `clearstance.pl`
- **Evidence:** **CONFIRMED** — istnieją MX Cloudflare Email Routing i SPF `include:_spf.mx.cloudflare.net ~all`; nie znaleziono rekordu `_dmarc.clearstance.pl`. **MANUAL CHECK** — DKIM zależny od rzeczywistego systemu wysyłki.
- **Impact:** domena nie publikuje polityki DMARC ani adresu raportowego, co osłabia ochronę przed spoofingiem i diagnostykę doręczalności.
- **Recommendation:** zinwentaryzować wszystkie legalne źródła wysyłki, potwierdzić DKIM, wdrożyć DMARC od `p=none` z raportami, a po obserwacji przejść do `quarantine`/`reject`.
- **Implementation complexity:** średnia
- **Regression risk:** średni — zbyt szybka polityka restrykcyjna może blokować legalną pocztę
- **Confidence:** wysoka dla braku DMARC w publicznym DNS

### TEST-01

- **Severity:** P2
- **Area:** Quality / regression safeguards
- **Location:** `package.json`, brak `.github/workflows/`; `tests/contact.test.mjs`
- **Evidence:** **CONFIRMED** — są 22 testy formularza i skrypty check/build/link/worker, ale nie ma CI, E2E ani testów tras, menu, metadata, sitemap, treści, CMS i 404.
- **Impact:** regresje mogą trafić na produkcję mimo tego, że repo zawiera już narzędzia zdolne je wykryć.
- **Recommendation:** dodać CI uruchamiające istniejące komendy oraz mały zestaw Playwright/smoke i test kontraktowy treści. Najpierw objąć ryzyka z tego audytu, nie budować szerokiego test suite bez priorytetów.
- **Implementation complexity:** średnia
- **Regression risk:** niski
- **Confidence:** wysoka

## P3 — Low

### SEO-02

- **Severity:** P3
- **Area:** SEO / robots
- **Location:** produkcja `/robots.txt`; Cloudflare managed content
- **Evidence:** **CONFIRMED** — produkcyjny plik zawiera dodany przez Cloudflare blok `Content-Signal` i reguły botów; Lighthouse zgłasza nieznaną dyrektywę i przez to SEO 92.
- **Impact:** zwykłe wyszukiwarki prawdopodobnie ignorują nieznaną dyrektywę, lecz narzędzia raportują błąd, a stan produkcji różni się od pliku repozytorium.
- **Recommendation:** świadomie zdecydować, czy Cloudflare ma rozszerzać robots; sprawdzić w Search Console, czy właściwe reguły i sitemap są interpretowane.
- **Implementation complexity:** niska
- **Regression risk:** niski
- **Confidence:** wysoka

### SEO-03

- **Severity:** P3
- **Area:** SEO / social / content
- **Location:** `src/layouts/BaseLayout.astro:44-46`, `src/layouts/ArticleLayout.astro:54-75`
- **Evidence:** **CONFIRMED** — artykuły bez `headerImage`/`socialImage` używają ogólnej grafiki marki jako `og:image` i `Article.image`.
- **Impact:** podglądy i dane artykułu są mniej reprezentatywne; nie jest to błąd blokujący indeksację.
- **Recommendation:** wraz z rozwojem redakcyjnym dodawać reprezentatywne obrazy artykułów i tekst alternatywny; nie wprowadzać sztucznego wymogu dla istniejących publikacji bez gotowych assetów.
- **Implementation complexity:** niska technicznie, średnia redakcyjnie
- **Regression risk:** niski
- **Confidence:** wysoka

Google rekomenduje obrazy reprezentujące artykuł, nie ogólny logotyp: [Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article).

### CACHE-01

- **Severity:** P3
- **Area:** Performance / cache
- **Location:** produkcyjne statyczne odpowiedzi Cloudflare
- **Evidence:** **CONFIRMED** — HTML, obrazy i hashowany CSS otrzymywały `Cache-Control: public, max-age=0, must-revalidate`; Cloudflare zwracał `HIT`, lecz przeglądarka musi rewalidować.
- **Impact:** utracona korzyść powtórnych wizyt, szczególnie dla niezmiennych plików z hashem.
- **Recommendation:** nadać hashowanym assetom długi `max-age, immutable`; HTML i pliki administracyjne pozostawić rewalidowane/no-store zgodnie z rolą.
- **Implementation complexity:** niska
- **Regression risk:** niski dla hashowanych plików
- **Confidence:** wysoka

### MAINT-01

- **Severity:** P3
- **Area:** Maintainability
- **Location:** `src/styles/global.css` (~3515 linii), `src/i18n/translations.ts` (~752), `src/content/privacy.ts` (~302), `public/admin/config.yml`
- **Evidence:** **CONFIRMED** — duże centralne pliki obejmują wiele niezależnych stron/odpowiedzialności; konfiguracje kolekcji PL/EN są niemal równoległe.
- **Impact:** rośnie koszt review, konfliktów i przypadkowej zmiany niepowiązanego obszaru.
- **Recommendation:** dzielić dopiero przy kolejnych zmianach funkcjonalnych: CSS według warstw/komponentów, tłumaczenia według strony i locale. Dla YAML preferować test parytetu lub generator, jeśli Sveltia nie wspiera bezpiecznej abstrakcji.
- **Implementation complexity:** średnia
- **Regression risk:** średni
- **Confidence:** wysoka

### LIC-01

- **Severity:** P3
- **Area:** Licensing / provenance
- **Location:** `THIRD_PARTY_LICENSES.md`; obrazy w `public/images/`
- **Evidence:** **CONFIRMED** — dokument nie wymienia bezpośredniej zależności produkcyjnej `@astrojs/markdown-satteri`; pochodzenie/licencja ilustracji usług i osieroconego uploadu nie są udokumentowane w tym samym standardzie co pozostałe assety.
- **Impact:** utrudniona odpowiedź na pytania o pochodzenie materiałów i obowiązki licencyjne.
- **Recommendation:** uzupełnić rejestr zależności i provenance assetów; dla własnych materiałów oznaczyć właściciela/autorstwo zamiast szukać licencji zewnętrznej.
- **Implementation complexity:** niska
- **Regression risk:** brak
- **Confidence:** wysoka dla niekompletności dokumentu

### CLEAN-01

- **Severity:** P3
- **Area:** Repository / deployment cleanup
- **Location:** `preview (2).html`; `public/.DS_Store`; `public/images/insights/screenshot-2026-07-26-at-11-30-23.webp`
- **Evidence:** **CONFIRMED** — untracked `preview (2).html` ma ok. 706 KB i zawiera stary prototyp oraz nieaktualny adres; `.DS_Store` jest kopiowany do `dist`; obraz CMS nie ma referencji w projekcie.
- **Impact:** zbędne artefakty zwiększają szum, rozmiar wdrożenia i ryzyko użycia nieaktualnej treści.
- **Recommendation:** po potwierdzeniu z właścicielem usunąć albo przenieść prototyp poza repo, usunąć `.DS_Store` z `public`, a przed usunięciem obrazu sprawdzić drafty i intencję redakcyjną.
- **Implementation complexity:** niska
- **Regression risk:** niski, ale upload wymaga potwierdzenia
- **Confidence:** wysoka dla braku referencji

### DEP-01

- **Severity:** P3
- **Area:** Dependencies / tooling compatibility
- **Location:** `package-lock.json`; drzewo `miniflare`/`sharp`
- **Evidence:** **CONFIRMED** — świeże `npm ci` i build przechodzą, audit ma 0 podatności, ale `npm ls --all` raportuje opcjonalny `@img/sharp-wasm32` jako extraneous oraz brak `@emnapi/runtime`.
- **Impact:** obecnie brak wpływu na build i produkcję; może powodować fałszywe alarmy lub problem na innym środowisku/architekturze.
- **Recommendation:** nie edytować lockfile ręcznie; odtworzyć na docelowym CI Linux, śledzić upstream i aktualizować Wrangler/Sharp w kontrolowany sposób.
- **Implementation complexity:** niska
- **Regression risk:** niski
- **Confidence:** wysoka dla wyniku narzędzia, niska dla realnego wpływu

### CONTENT-01

- **Severity:** P3
- **Area:** Content / brand voice
- **Location:** `src/i18n/translations.ts`; artykuły w `src/content/insights/`
- **Evidence:** **CONFIRMED** — część sekcji powtarza konstrukcje kontrastowe typu „najpierw X, potem Y”, „nie X, lecz Y” / “not X, but Y”; fragment doświadczenia na home częściowo powiela About.
- **Impact:** przy dalszej publikacji styl może brzmieć szablonowo lub generatywnie, a strony mogą konkurować o tę samą rolę komunikacyjną.
- **Recommendation:** podczas redakcji ograniczyć rytmiczne kontrasty, zastępować je konkretem i dowodem; nadać home rolę skrótu, Services rolę zakresu, About rolę wiarygodności, a Insights rolę ekspertyzy.
- **Implementation complexity:** niska–średnia
- **Regression risk:** niski
- **Confidence:** wysoka jako obserwacja, ocena tonu jest częściowo subiektywna

### NET-02

- **Severity:** P3
- **Area:** Domain hardening
- **Location:** publiczny DNS
- **Evidence:** **CONFIRMED** — nie znaleziono rekordu CAA ani delegacji DNSSEC/DS.
- **Impact:** brak dodatkowych warstw ograniczających wystawców certyfikatów i chroniących integralność DNS; nie jest to dowód podatności.
- **Recommendation:** po ustabilizowaniu hostów rozważyć DNSSEC i CAA zgodnie z procedurą Cloudflare oraz planem odzyskiwania domeny.
- **Implementation complexity:** niska–średnia
- **Regression risk:** średni przy błędnej rotacji DNSSEC
- **Confidence:** wysoka

# D. Security findings

| ID | Severity | Stan | Wektor / kontrola | Wniosek |
|---|---|---|---|---|
| SEC-01 | P1 | CONFIRMED | Transport | HTTP serwuje treść zamiast redirectu do HTTPS. |
| EDGE-01 | P1 | CONFIRMED | Hostname | `www` jest niedostępne z 522. |
| SEC-02 | P1 | CONFIRMED | Nagłówki przeglądarkowe | Brak HSTS, CSP, nosniff, referrer, permissions i frame protection. |
| CMS-01 | P1 | CONFIRMED | Supply chain/OAuth | Nieprzypięty Sveltia z CDN działa przy tokenie `repo,user`. |
| PRIV-01 | P1 | CONFIRMED | Dane osobowe | Produkcja nie udostępnia polityki; lokalna ma placeholder. |
| SEC-03 | P2 | CONFIRMED | Stored XSS defense in depth | JSON-LD nie neutralizuje `</script>`; źródło wymaga jednak uprawnień do repo. |
| NET-01 | P2 | CONFIRMED/MANUAL | Email spoofing | SPF jest, DMARC brak, DKIM wymaga sprawdzenia. |
| NET-02 | P3 | CONFIRMED | DNS/PKI hardening | Brak DNSSEC i CAA. |

Pozytywne ustalenia bezpieczeństwa:

- `npm audit` dla pełnego drzewa i produkcyjnych zależności: **0 znanych podatności**.
- Nie znaleziono rzeczywistych sekretów w bieżących plikach ani historii; klucze Turnstile są udokumentowanymi kluczami testowymi Cloudflare i działają lokalnie tylko dla localhost (`worker/contact.ts:11-20,256-260`).
- `.env` i `.dev.vars` nie są śledzone; repo zawiera wyłącznie przykłady.
- Endpoint odrzuca inne content types, nieznane/powtórzone pola, pliki, nadmierny request i control characters (`worker/contact.ts:95-217,219-254,407-457`).
- Turnstile ma timeout 5 s, przesyła remote IP, weryfikuje `success`, `action=contact` oraz oczekiwany hostname (`worker/contact.ts:286-358`).
- `From`, `To` i temat są konfiguracją serwera, a dane użytkownika trafiają wyłącznie do tekstu i walidowanego `Reply-To` (`worker/contact.ts:499-525`); nie stwierdzono header injection.
- Logi błędów nie zawierają treści formularza ani adresu e-mail.
- Brak analytics, reklam, zewnętrznych fontów i trackerów; na publicznej stronie jedynym istotnym third party jest Turnstile.
- W czasie obserwacji strony kontaktowej nie utworzono cookies ani danych local/session storage. Preclearance jest opisana jako wyłączona. Nie oznacza to, że Cloudflare nigdy nie ustawi koniecznego cookie podczas realnego challenge.

Elementy wymagające panelu:

- rzeczywista reguła rate limit `5 / 10 s`, zakres i kolejność względem Workera;
- wartości sekretów i binding `EMAIL`;
- hostnames, mode oraz preclearance widgetu Turnstile;
- allowlist domen i sekret Workera OAuth;
- właściciel aplikacji OAuth, callback, rotacja sekretu, 2FA i minimalne uprawnienia użytkownika CMS;
- GitHub branch protection i historia nieudanych logowań/publikacji.

# E. Duplication matrix

| Element A | Element B | Rodzaj duplikacji | Problem? | Rekomendacja |
|---|---|---|---|---|
| `astro.config.mjs` site | fallback site w `BaseLayout`/`ArticleLayout`/RSS/sitemap | konfiguracja domeny | Mały, ale łatwy drift | Jeden helper/stała dla kodu aplikacji; Astro `site` jako źródło główne. |
| `src/content.config.ts` | `public/admin/config.yml` | schemat frontmatter | Konieczna na dwóch granicach, lecz bez testu | Zachować oba; dodać test parytetu kluczowych pól/reguł. |
| regex ścieżki obrazów w Zod | `insights-validation.js` | walidacja ścieżki | Konieczna, ryzyko driftu | Test kontraktowy; nie dodawać `pattern` do pól image. |
| kolekcja CMS PL | kolekcja CMS EN | niemal identyczny YAML | Tak, przy zmianach | Generator albo test strukturalnej równoważności; nie stosować ryzykownych YAML anchors bez potwierdzenia Sveltia. |
| limity pól HTML | limity w `worker/contact.ts` | client/server validation | Celowa | Serwer pozostaje źródłem prawdy; testować zgodność wartości. |
| `escapeXml` sitemap | `escapeXml` RSS | helper techniczny | Mały | Wspólny helper przy kolejnej zmianie feedów. |
| PL/EN strony routujące Astro | ich wspólne page components | cienka duplikacja routingu | Nie, wynika z file routing | Pozostawić. |
| Tailwind `@theme` | CSS custom properties | design tokens/build layer | Częściowo | Ustalić jednego właściciela tokenów; sprawdzić wpływ preflight przed ewentualnym usunięciem Tailwind. |
| Tailwind dependency | prawie w całości własny CSS, brak utilities | narzędzie stylowania | Potencjalnie zbędne | Nie usuwać bez testu wizualnego; ocenić podczas porządkowania CSS. |
| ContactBand `mailto` | dedykowany formularz | dwa kanały kontaktu | Kanały celowe, role niespójne | Formularz jako primary, email jako fallback. |
| home: Experience | About: doświadczenie | treść/odpowiedzialność | Częściowo | Home = krótki sygnał zaufania, About = dowody i kontekst. |
| home: Approach/Readiness | Services: How we work | treść/metoda | Częściowo | Oddzielić zasady, cykl gotowości i sposób realizacji. |
| PL i EN treści | odpowiedniki językowe | lokalizacja | Celowa | Nie deduplikować kosztem redakcji; testować pary i kompletność. |

# F. Compatibility matrix

| System A | System B | Interakcja | Potencjalny konflikt | Ocena |
|---|---|---|---|---|
| Astro `trailingSlash: ignore` | Cloudflare `auto-trailing-slash` | generowanie vs serving URL | canonical bez slash → 307 → slash | **Konflikt potwierdzony, P2** |
| Astro static output | Cloudflare Worker assets | `dist` jako binding | Brak własnego 404 daje puste body | **Zgodne poza 404** |
| Turnstile frontend | przyszła CSP | zewnętrzny script + iframe | CSP może zablokować widget | **Zgodne po allowliście Cloudflare** |
| Sveltia z UNPKG | przyszła CSP/admin | zewnętrzny dynamiczny skrypt | pinning/CSP muszą być wdrożone razem | **Ryzyko P1** |
| Sveltia image widget | walidacja `preSave` | widget przekazuje path | `pattern` na image psujeło workflow | **Obecny workaround zgodny; zachować** |
| Sveltia media transform | Astro public images | upload do `/public`, URL `/images` | brak build-time existence/MIME | **Działa, wymaga kontraktu** |
| CMS branch `main` | brak CI | zapis uruchamia deploy | brak bramki przed publikacją | **Ryzyko procesu P2** |
| Markdown Satteri | Astro Content Collections | obróbka typografii | brak wykrytego konfliktu | **Zgodne** |
| Tailwind Vite/preflight | duży własny CSS | globalne style | usunięcie może zmienić reset | **Zgodne teraz; cleanup ostrożny** |
| Sharp/Astro images | opcjonalne WASM Miniflare | toolchain npm | `npm ls` ostrzega, build przechodzi | **Niski wpływ P3** |
| Cloudflare Email | SPF/DMARC/DKIM domeny | dostarczenie wiadomości | DMARC brak, DKIM niezweryfikowany | **Wymaga kontroli poczty** |
| PL route map | EN route map + translation keys | language switch/hreflang | drift bez testu | **Obecnie zgodne** |
| HTTP host | HSTS | transport | brak redirectu i uszkodzony `www` | **Najpierw hosty, potem HSTS** |

# G. UX/UI findings

## Global

- Hierarchia typograficzna, szerokość tekstu, kontrast ciemnego hero z jasnymi sekcjami i rytm sekcji są spójne.
- Jedna główna luka globalna to pusty 404 (**UX-01**).
- Najmocniejszy dowód wiarygodności — doświadczenie operacyjne maritime/aviation — pojawia się dość późno na stronie głównej. Warto testować krótszy sygnał zaufania wcześniej, bez rozbudowy hero.
- Produkcja i lokalny working tree różnią się w stopce i prywatności; review wizualny polityki należy wykonać dopiero po uzupełnieniu danych.

## Desktop

- Testy 1280, 1440 i 1920 px nie wykazały overflow ani nadmiernego rozciągania tekstu.
- Kompozycja zachowuje kontrolowaną maksymalną szerokość; nie ma uzasadnienia dla przebudowy desktopu.
- Przy dalszym dodawaniu Insights należy pilnować długości listy — brak paginacji jest dziś niewidoczny, ale przy dziesiątkach wpisów pogorszy skanowanie.

## Tablet

- 768 i 1024 px zachowują poprawną geometrię i czytelną kolejność.
- Przejścia breakpointów 760/761, 880/899/900 i 1080 działają w sprawdzonych widokach, lecz są rozproszone w jednym pliku CSS. Testy wizualne breakpoint ±1 px byłyby wartościowe.

## Mobile

- 320, 375 i 430 px: brak poziomego scrolla, obciętych nagłówków i kolizji CTA.
- Przycisk menu ma 42×42 px: przechodzi WCAG 2.2 24×24 i Lighthouse target-size; 44×44 byłoby jedynie dodatkową rezerwą komfortu, nie findingiem zgodności.
- Nie ma podstaw do istotnego redesignu mobile. Priorytetem jest utrzymanie jakości poprzez regresyjne screenshoty.

## Navigation

- Menu mobilne poprawnie ustawia `inert` na treści, blokuje scroll, reaguje na Escape, przywraca fokus i zmienia nazwę dostępną.
- Skip link prowadzi do `#main-content`.
- Przełącznik języka prowadzi do dokładnego odpowiednika strony lub artykułu; fallback artykułu do indeksu Insights jest rozsądny.
- Linki wewnętrzne wykonują 307 przez konflikt ukośników (**SEO-01**).

## Forms

- Etykiety, required, limity długości, autocomplete i widoczne stany są sensowne.
- Backend jest znacznie mocniejszy niż typowy formularz statyczny.
- Do poprawy: timeout (**FORM-01**), fallback bez JS (**FORM-02**), informacja prywatności (**PRIV-01**) i spójność mailto/form (**UX-02**).
- Rzeczywiste dostarczenie PL i EN „dokładnie raz” pozostaje testem manualnym; w audycie celowo nie wysyłałem prawdziwej wiadomości.

## Content architecture

- Home dobrze odpowiada „co” i „jak”, Services rozwija zakres, Insights pokazuje sposób myślenia, About buduje wiarygodność.
- Granice Home Experience ↔ About oraz Approach/Readiness ↔ Services wymagają redakcyjnego doprecyzowania, nie nowej architektury informacji.
- Artykuł otwierany bezpośrednio daje tytuł, opis, datę, czas czytania, autora, kategorię, spis treści, udostępnianie, related content i powrót — ścieżka jest kompletna.

# H. Accessibility

Automatyczne wyniki Lighthouse dla home, Insights, artykułu i kontaktu wyniosły **100/100**. To dobry sygnał, lecz nie certyfikat WCAG 2.2 AA.

| Obszar / kryterium | Wynik | Uwagi |
|---|---|---|
| 1.1.1 Non-text Content | PASS w badanym stanie | Logo/obrazy mają tekst alternatywny; CMS wymaga alt dla header image. Przyszłe publikacje nadal wymagają review jakości alt. |
| 1.3.1 Info and Relationships | PASS automatyczny/manual spot-check | Jedno H1, logiczne sekcje, listy i `dl` metadanych. |
| 1.4.3 Contrast (Minimum) | PASS automatyczny | Nie znaleziono naruszeń w testowanych stronach i stanach. |
| 1.4.10 Reflow | PASS w 320 px | Brak dokumentowego overflow; pełny test przy zoom 400% pozostaje manualny. |
| 2.1.1 Keyboard | PASS dla menu i nawigacji | Menu, Escape i powrót fokusu działają; widget Turnstile wymaga testu realnego challenge. |
| 2.4.1 Bypass Blocks | PASS | Obecny skip link do `main-content`. |
| 2.4.3 Focus Order | PASS spot-check | Menu stosuje `inert`; nie wykryto wejścia fokusu pod overlay. |
| 2.4.7 Focus Visible / 2.4.11 Focus Not Obscured | PASS spot-check | Widoczne style fokusu; pełna sekwencja każdej strony wymaga manualnego przejścia. |
| 2.4.6 Headings and Labels | PASS | Etykiety formularza i nagłówki są opisowe. |
| 2.5.8 Target Size (Minimum) | PASS | Lighthouse nie wykrył błędu; menu 42×42 przekracza minimum 24×24. |
| 3.1.1 Language of Page | PASS | `lang=pl` / `lang=en` jest poprawny. |
| 3.3.1 Error Identification / 3.3.3 Error Suggestion | częściowo PASS | Native validation i status aplikacji pomagają, ale pełne błędy serwera są ogólne; nie jest to obecnie potwierdzone naruszenie. |
| 4.1.2 Name, Role, Value | PASS automatyczny | Przycisk menu i formularz mają role/nazwy; Turnstile pozostaje third-party/manual. |
| Redukcja ruchu | PASS kod | `prefers-reduced-motion` wyłącza animacje; jedyne `!important` występuje w tej celowej regule. |

Manualnie należy przetestować NVDA/Firefox lub VoiceOver/Safari, zoom 200% i 400%, high contrast/forced colors, realne stany błędów oraz interaktywny challenge Turnstile. **Nie znalazłem potwierdzonego problemu WCAG o randze P1/P2.**

# I. Performance

## Faktycznie zmierzone

Pomiary Lighthouse wykonano na publicznej produkcji 27.07.2026; są laboratoryjne i nie zastępują CrUX/RUM.

| Strona / profil | Perf | A11y | Best Practices | SEO | FCP | LCP | TBT | CLS | Transfer |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Home mobile | 100 | 100 | 100 | 92 | 1,0 s | 1,6 s | 0 ms | 0 | ~35 KiB |
| Home desktop | 100 | 100 | 100 | 92 | 0,3 s | 0,3 s | 0 ms | 0 | ~69 KiB |
| Insights mobile | 100 | 100 | 100 | 92 | 0,9 s | 0,9 s | 0 ms | 0 | ~19 KiB |
| Artykuł mobile | 100 | 100 | 100 | 92 | 1,2 s | 1,2 s | 0 ms | 0 | ~24 KiB |
| Kontakt mobile | 93 | 100 | 100 | 92 | 1,7 s | 2,9 s | 0 ms | 0 | ~522 KiB |

- Publiczny JavaScript jest minimalny; bundle share miał około 868 B raw / 509 B gzip.
- CSS miał około 52,8 KB raw / 11,2 KB gzip.
- Home hero ma warianty WebP, `sizes`, wymiary i wysokie priority; wynik potwierdza skuteczność.
- Jedyny zmierzony istotny koszt to third-party Turnstile (**PERF-02**).
- Rewalidacja każdego assetu jest niewielką rezerwą repeat-view (**CACHE-01**).

## Potencjalne problemy wynikające z kodu

- Przyszłe obrazy artykułów i teaserów bez wymiarów/`srcset` (**PERF-01**). Nie jest to obecnie zmierzona regresja.
- Lista Insights nie ma paginacji. Przy obecnych 4 opublikowanych wpisach na locale to właściwa prostota; przy około 50–100 wpisach należy zmierzyć wagę HTML i użyteczność.
- `getPublishedInsights()` i sortowanie są wywoływane na wielu stronach podczas builda. Nawet 200 wpisów nie uzasadnia bazy ani SSR, ale wtedy warto profilować build i cache’ować dane w warstwie build.
- Sitemap dobiera alternatywy przez wyszukiwanie liniowe; koszt O(n²) jest nieistotny dziś i mały przy 200 wpisach.

# J. SEO

## Indexability

- Statusy `200` dla właściwych stron, `404` dla brakujących i poprawne wykluczenie draftów są dobre.
- Najważniejsze błędy: konflikt slash/canonical (**SEO-01**) i pusty 404 (**UX-01**).
- `robots.txt` wskazuje sitemap i blokuje `/admin`, lecz Cloudflare dodaje dyrektywę nierozpoznaną przez Lighthouse (**SEO-02**).
- `/admin/` ma meta `noindex`; warto dodatkowo dać `X-Robots-Tag: noindex, nofollow` i odpowiedni cache. Robots nie jest kontrolą dostępu.

## Metadata

- Wszystkie lokalnie wygenerowane strony miały dokładnie jedno H1, title, description, canonical, OG i Twitter metadata.
- Długości tytułów (~20–64 znaki) i opisów (~93–144) są ogólnie rozsądne; nie znaleziono masowych braków.
- Powtórzenia tytułu marki/home i „Insights” między językami są semantycznie uzasadnione, nie są błędem duplikacji.
- RSS PL/EN działa, a sitemap lokalnie obejmuje wszystkie publiczne strony i 8 opublikowanych artykułów; drafty są wykluczone.

## International SEO

- `lang`, reciprocal hreflang `pl`/`en` i `x-default` są generowane.
- Wszystkie obecne opublikowane artykuły mają parę przez `translationKey`; lokalne trasy statyczne również mają pary.
- Przełącznik języka prowadzi do odpowiednika; dla nieprzetłumaczonego artykułu fallback do indeksu drugiego języka jest uczciwszy niż fałszywy hreflang.
- Kontrakt nie jest automatycznie sprawdzany (**CMS-02**, **TEST-01**).

## Structured data

- Organization jest obecne globalnie, ProfessionalService na home, a Article na artykułach.
- Article zawiera headline, description, daty, author, publisher, image, language i mainEntityOfPage.
- Nie wykryto potrzeby dodawania BreadcrumbList bez faktycznej nawigacji breadcrumbs.
- Serializer JSON-LD wymaga zabezpieczenia (**SEC-03**).
- Ogólny obraz marki jako `Article.image` jest poprawny technicznie, ale słaby redakcyjnie (**SEO-03**).

## Content architecture

- Tematy i ścieżki są opisowe, artykuły mają category/tags/related/ToC.
- Nie ma dziś potrzeby wyszukiwarki ani skomplikowanej taksonomii. Kategorie/filtry powinny poprzedzić search, gdy archiwum przekroczy mniej więcej 50 wpisów i pojawi się realna trudność odnalezienia treści.
- Powielanie komunikacji Home/About/Services opisuje sekcja M.

# K. CMS audit

## Stan obecny

- `/admin/` działało bez błędów konsoli i pokazywało „Sign In with GitHub”.
- Backend wskazuje publiczne repozytorium i branch `main`; OAuth uruchamia GitHub z `repo,user`.
- Kolekcje PL i EN używają stałych folderów, limitu 5 MB, slugify filename, transformacji raster→WebP quality 84/max 1920, optymalizacji SVG oraz wyłączonych stock assets.
- `insights-validation.js` wykonuje `preSave` dla obu kolekcji, wymaga ścieżki `/images/insights/<plik>`, alt dla header image i usuwa orphan alt.
- Schemat Astro sprawdza strukturę contentu przy buildzie.

## Workaround obrazów — zachować

Obecna konfiguracja jest intencjonalna i zgodna z wymaganiem projektu:

- pola image **nie mają `pattern`**;
- `choose_url: false`;
- `stock_assets: false`;
- ścieżka jest sprawdzana w `preSave`;
- media trafiają do `public/images/insights`, a public URL zaczyna się od `/images/insights/`.

Rekomendacje z audytu nie wymagają naruszenia tego workaroundu. Dodatkowe sprawdzanie rozszerzenia, istnienia i wymiarów powinno być testem repo/build, nie `pattern` na image widget.

## Ryzyka

1. **CMS-01:** nieprzypięty runtime z CDN w kontekście OAuth.
2. **CMS-03:** zapis prosto do `main`, brak CI i brak widocznego editorial workflow.
3. **CMS-02:** brak unikalności slug/translationKey, par, dat, locale-folder i weryfikacji faktycznego assetu.
4. Regex dopuszcza dowolne rozszerzenie pojedynczego pliku. To nie jest anonimowy upload ani path traversal, lecz może opublikować niezamierzony HTML/SVG. Preferować dozwolony zestaw rasterów, a SVG dopuszczać świadomie.
5. PL/EN YAML powtarza schemat; drift nie zatrzyma builda, jeśli Zod przypadkiem nadal zaakceptuje wynik.
6. Panel nie jest prywatną strefą tylko dlatego, że robots go blokuje. Ochroną jest OAuth, minimalny dostęp GitHub, 2FA i kontrola supply chain.

## Skalowanie

- 10–50 wpisów: obecna architektura jest wystarczająca.
- Około 50–100: paginacja indeksu, filtry po kategorii/tagu, test wag HTML i czasów builda.
- Około 200: cache wspólnego odczytu kolekcji podczas builda, generowany/parytetowy schema CMS, możliwość preview/editorial branch.
- Zmiana CMS lub przejście na bazę nie jest dziś uzasadnione.

# L. Dead code / cleanup

Elementy do potwierdzenia przed usunięciem:

1. `preview (2).html` — lokalny, untracked, duży legacy prototype ze starymi danymi kontaktowymi; przenieść do świadomego archiwum albo usunąć.
2. `public/.DS_Store` — trafia do `dist`; bezpieczny kandydat do usunięcia i blokady w procesie.
3. `public/images/insights/screenshot-2026-07-26-at-11-30-23.webp` — brak referencji; sprawdzić, czy jest oczekującym uploadem do draftu.
4. Tailwind jako build dependency — brak utility classes, a `@theme` dubluje część custom properties. Nie usuwać bez porównania screenshotów i sprawdzenia wpływu preflight.
5. Duplikaty helpera `escapeXml` — nie dead code, ale mały kandydat do konsolidacji.

Nie znalazłem oczywiście nieużywanych komponentów publicznego UI ani dużego martwego JavaScriptu.

# M. Content overlap

| Sekcja A | Sekcja B | Pokrycie odpowiedzialności | Rekomendowany podział |
|---|---|---|---|
| Home — Experience | About — doświadczenie | podobne zdania o maritime/aviation i działaniu pod presją | Home: krótki sygnał wiarygodności; About: konkretne dowody, rola, zakres i standard pracy. |
| Home — Approach | Home — Readiness cycle | informacje/decyzje/scenariusze pojawiają się w obu | Approach: zasady myślenia; Readiness: cykl w czasie. |
| Home — Readiness | Services — How we work | podobna sekwencja diagnozy, ćwiczeń i doskonalenia | Services: sposób realizacji z klientem, artefakty i rezultat. |
| ContactBand na każdej stronie | Contact page | dwa wejścia do kontaktu | Band: CTA do formularza + email fallback; page: pełny proces. |
| Featured Insight | Insights listing | ten sam artykuł eksponowany w dwóch miejscach | Duplikacja celowa; home ma promować jeden materiał, listing archiwizować wszystkie. |
| PL | EN | równoległa treść | Duplikacja konieczna; nie automatyzować tłumaczeń kosztem jakości. |

Fragmenty do redakcyjnego review tonu, nie automatycznego przepisania:

- „Najpierw kontekst. Potem rozwiązanie.” / “Context first. Then the solution.”
- „użyteczne pod presją, nie tylko poprawne na papierze” i odpowiednik EN.
- tytuł i część zdań artykułu o ćwiczeniu kryzysowym opartych na serii „nie X, lecz Y”.
- powtarzające się „not merely / rather”, „not X / but Y” w artykułach EN.

Brand statement „Uncertainty is inevitable. Chaos need not be.” ma wyraźną rolę i nie powinien być uznawany za błąd wyłącznie z powodu kontrastowej konstrukcji.

# N. Missing safeguards

1. Redirect HTTP→HTTPS i działający redirect `www`→apex.
2. Path-aware security headers i osobna polityka `/admin/`.
3. Pin/self-host/SRI-process dla Sveltia.
4. CI uruchamiające `check`, `typecheck`, build, test formularza, link checker i worker dry-run.
5. Test unikalności slugów i `translationKey` w locale.
6. Test kompletności par PL/EN i reciprocal hreflang.
7. Test zgodności `locale` z folderem oraz dat `updatedAt >= publishedAt`/future publish.
8. Test istnienia, dozwolonego typu i wymiarów obrazów CMS.
9. Test parytetu konfiguracji CMS PL/EN i zgodności z kluczowymi zasadami Zod.
10. Test bezpiecznej serializacji JSON-LD.
11. Smoke/E2E dla menu, języka, canonicali, formularza i 404.
12. Monitoring błędów `/api/contact` i realnego dostarczenia bez logowania PII.
13. Udokumentowana w repo konfiguracja wymaganej reguły rate limit, z okresowym manualnym potwierdzeniem dashboardu.
14. DMARC wraz z monitoringiem raportów; weryfikacja DKIM.
15. Przegląd prawny polityki i procedura aktualizacji przy zmianie dostawców.
16. Real-device/screen-reader/zoom accessibility check przed większym wydaniem.
17. Search Console i CrUX/RUM jako źródło danych terenowych.
18. Rejestr provenance/licencji wszystkich obrazów.

# O. Quick wins

Tylko zadania o małym nakładzie i niskim ryzyku:

1. Dodać stronę 404 z zachowaniem statusu.
2. Uzupełnić `THIRD_PARTY_LICENSES.md` i rejestr assetów.
3. Usunąć `public/.DS_Store`; po potwierdzeniu uporządkować prototyp i orphan upload.
4. Przypiąć konkretną, zweryfikowaną wersję Sveltia jako pierwszy krok przed self-hostingiem.
5. Dodać timeout i odzyskanie stanu przycisku formularza.
6. Ustawić długi immutable cache tylko dla hashowanych assetów.
7. Dodać test bezpiecznego JSON-LD i mały serializer.
8. Dodać link/informację prywatności przy formularzu **dopiero z zatwierdzonym tekstem i bez placeholdera**.
9. Ujednolicić primary CTA kontaktu na formularz, zachowując email jako fallback.
10. Uruchomić istniejące komendy w prostym CI.

Redirect domeny i security headers są ważniejsze, ale nie trafiają do „quick wins” bez zastrzeżeń: mają mały kod, lecz wymagają ostrożnej kontroli hostów, CSP i panelu produkcyjnego.

# P. Structural improvements

1. **Kontrakt treści jako osobna warstwa testowa.** Połączyć logicznie, niekoniecznie jednym plikiem, zasady Zod, CMS i generowanych tras.
2. **Kontrolowany pipeline publikacji.** CI na `main` teraz; editorial branch/PR dopiero przy większej liczbie redaktorów.
3. **Podział dużych plików przy naturalnych zmianach.** Style według warstw/komponentów, tłumaczenia według strony i języka, bez jednorazowego refactoru całego UI.
4. **Spójna warstwa edge.** Jedna polityka hostów/HTTPS/ukośników/cache oraz jasno rozdzielone nagłówki public/admin/API.
5. **Pipeline responsywnych obrazów CMS.** Walidacja pliku, odczyt wymiarów, generowanie wariantów i stabilny markup.
6. **Obserwowalność formularza bez PII.** Liczniki success/validation/Turnstile/delivery error, alert na trwały wzrost 5xx, test syntetyczny bez wysyłania spamu.
7. **Paginacja i nawigacja treści uruchamiana przez próg.** Nie wcześniej niż potwierdzi to rozmiar archiwum lub metryki.

# Q. Remediation roadmap

## Phase 0 — Critical

Brak P0. Nie ma podstaw do awaryjnego wyłączania strony ani formularza.

## Phase 1 — Security & correctness

1. **Naprawić `www`** (**EDGE-01**).
   Zależność: przed HSTS z `includeSubDomains`.
2. **Wymusić HTTP→HTTPS** (**SEC-01**).
   Zależność: sprawdzić apex, `www`, wszystkie trasy i API.
3. **Przypiąć/self-host Sveltia i zweryfikować OAuth** (**CMS-01**).
   Zależność: zachować bieżący upload workaround; dopiero potem zacieśniać CSP admina.
4. **Dodać security headers** (**SEC-02**).
   Zależność: inventory zasobów; naprawione hosty; test Turnstile i admina przed HSTS/CSP rollout.
5. **Dokończyć i zatwierdzić prywatność** (**PRIV-01**).
   Zależność: decyzja o administratorze/dostawcach/retencji, review prawne, usunięcie placeholderów, następnie deploy PL/EN i link przy formularzu.
6. **Wdrożyć DMARC po inwentaryzacji poczty** (**NET-01**).
   Zależność: potwierdzony SPF/DKIM wszystkich nadawców; zacząć od monitorowania.
7. **Dodać podstawowe CI i testy kontraktowe** (**TEST-01**, **CMS-02**).
   Zależność: najpierw istniejące komendy, potem nowe reguły w trybie raportującym.

## Phase 2 — UX / accessibility / SEO

1. Ujednolicić strategię końcowych ukośników i wszystkie sygnały URL (**SEO-01**).
   Zależność: decyzja o kanonicznym formacie; zachowanie redirectów ze starego wariantu.
2. Dodać 404 (**UX-01**).
   Zależność: test na produkcyjnym Cloudflare `404-page`.
3. Poprawić timeout i fallback formularza (**FORM-01**, **FORM-02**).
   Zależność: zachować Turnstile; test stanów timeout/sukces/duplikat.
4. Ujednolicić ścieżkę kontaktową (**UX-02**).
   Zależność: finalna informacja privacy przy formularzu.
5. Zmierzyć i opcjonalnie odroczyć Turnstile (**PERF-02**).
   Zależność: dane terenowe i test accessibility/antyspam.
6. Przejrzeć managed robots oraz Search Console (**SEO-02**).
   Zależność: brak.

## Phase 3 — cleanup & architecture

1. Uporządkować artefakty (**CLEAN-01**) i licencje (**LIC-01**).
2. Wydzielać CSS/tłumaczenia tylko w obszarach aktualnie zmienianych (**MAINT-01**).
3. Skonsolidować małe helpery domeny/XML i dodać jedno źródło zasad URL.
4. Ocenić rolę Tailwind po screenshot regression; usuwać wyłącznie po potwierdzeniu identycznego renderu.
5. Rozwiązać ostrzeżenie optional WASM poprzez kontrolowaną aktualizację i CI Linux (**DEP-01**).
6. Dodać responsywny pipeline obrazów przed szerszym użyciem grafik w Insights (**PERF-01**).

## Phase 4 — enhancements

1. Wczesny, krótki trust signal na home na podstawie testu treści.
2. Redakcja nakładających się sekcji i szablonowych kontrastów (**CONTENT-01**).
3. Reprezentatywne obrazy social dla ważnych publikacji (**SEO-03**).
4. Paginacja/filtry po przekroczeniu realnego progu zawartości.
5. RUM/CrUX dashboard i syntetyczny monitoring formularza bez PII.
6. DNSSEC/CAA po ustabilizowaniu operacji domeny (**NET-02**).

# Odpowiedzi na 10 pytań końcowych

## 1. Czy widzisz realne podatności bezpieczeństwa?

Tak, ale nie P0. Realne są: serwowanie strony po HTTP, brak browser security headers oraz dynamiczne ładowanie nieprzypiętego CMS z CDN w kontekście szerokiego OAuth. JSON-LD ma techniczny sink stored-XSS, lecz źródło danych wymaga dziś praw do zapisu repozytorium, więc nie daje anonimowemu napastnikowi nowej ścieżki. Nie znalazłem wycieku sekretów, znanych CVE ani obejścia Turnstile/form validation.

## 2. Czy istnieją dwa lub więcej mechanizmów realizujących tę samą funkcję?

Tak. Najważniejsze to mailto i formularz jako dwie niespójnie prezentowane ścieżki kontaktu; trzy warstwy zasad treści (CMS YAML, `preSave`, Zod); tokeny Tailwind i CSS; zduplikowane helpery XML oraz równoległe schematy CMS PL/EN. Część duplikacji jest konieczna na granicach client/server i CMS/build — powinna być testowana, nie mechanicznie usuwana.

## 3. Czy jakieś technologie lub implementacje są ze sobą niekompatybilne?

Najbardziej widoczny konflikt to Astro generujące URL bez slash i Cloudflare wymuszający slash. Pozostałe systemy są zasadniczo kompatybilne: Turnstile wymaga świadomej CSP, Sveltia wymaga zachowania workaroundu image fields, a Tailwind może mieć wpływ preflight mimo braku utility classes. Ostrzeżenie optional WASM nie wpływało na build.

## 4. Czy widzisz rozwiązania legacy, które można bezpiecznie usunąć?

Tak: `.DS_Store` w `public` i najpewniej lokalny `preview (2).html`. Niepowiązany obraz CMS można usunąć dopiero po potwierdzeniu, że nie jest oczekującym assetem. Tailwind jest kandydatem do oceny, nie do natychmiastowego usunięcia.

## 5. Czy UI posiada niespójności?

Tak, lecz nie wymaga redesignu. Główne niespójności to mailto kontra formularz, pusty 404 oraz częściowo pokrywające się role sekcji Home/About/Services. System wizualny, nawigacja i artykuły są spójne.

## 6. Czy mobile wymaga istotnych zmian?

Nie. Wszystkie wymagane szerokości od 320 px przeszły bez poziomego overflow i krytycznych kolizji. Menu mobilne ma dobrą obsługę klawiatury i fokusu. Potrzebne są regresyjne testy oraz późniejsza kontrola CMS-owych obrazów, nie przebudowa.

## 7. Czy PL i EN są technicznie oraz funkcjonalnie równoważne?

Obecnie tak. Trasy statyczne, opublikowane wpisy, metadata, hreflangi, RSS, formularze i language switch mają odpowiedniki. Równoważność jest jednak utrzymywana dyscypliną, nie testem; dalszy rozwój bez kontraktów może wprowadzić drift.

## 8. Czy Sveltia CMS jest obecnie stabilnym i bezpiecznym elementem tej architektury?

Funkcjonalnie jest stabilny w sprawdzonym scenariuszu i ma dobrze przygotowaną walidację uploadów. Nie nazwałbym go jeszcze wystarczająco bezpiecznym operacyjnie z powodu nieprzypiętego CDN, szerokiego OAuth, zapisu do `main` i braku CI. Po pin/self-host, minimalizacji uprawnień i bramkach publikacji pozostaje dobrym wyborem dla skali projektu.

## 9. Czy istnieje coś, co obecnie działa, ale przy dalszym rozwoju prawdopodobnie stanie się problemem?

Tak: monolityczny CSS/tłumaczenia, ręczny parytet PL/EN CMS, brak unikalności slug/translationKey, lista bez paginacji, powtarzane odczyty kolekcji, obrazy bez responsive markup oraz publikacja bez CI. Żaden z tych punktów nie uzasadnia teraz przebudowy stosu; wymagają progów i zabezpieczeń.

## 10. Jakie 5 rzeczy zrobiłbym jako Principal Engineer jako następne i dlaczego?

1. **Naprawiłbym warstwę domeny i transportu:** działający redirect `www`→apex i HTTP→HTTPS, bo dotyczy każdego użytkownika i jest zależnością HSTS.
2. **Zabezpieczyłbym panel CMS:** przypięty/self-hosted Sveltia, minimalny OAuth, 2FA i kontrola dostępu, bo panel ma uprawnienia do publikacji kodu i treści.
3. **Domknąłbym prywatność:** finalny administrator, review prawne, informacja przy formularzu i deploy PL/EN, bo produkcja już zbiera dane.
4. **Dodałbym testowane nagłówki oraz CI:** path-aware CSP/HSTS/nosniff i istniejące testy na każdym pushu, bo te dwie warstwy redukują szeroką klasę regresji.
5. **Ujednoliciłbym kontrakt URL i treści:** slash/canonical/sitemap/linki oraz testy slug/translationKey/images/locale, bo to najtańszy sposób ochrony SEO i publikacji przed rosnącą liczbą wpisów.

# Appendix — wykonane kontrole i ograniczenia

## Kontrole lokalne

- `npm run check` — 51 plików, 0 errors, 0 warnings, 0 hints.
- `npm run typecheck` — PASS.
- `npm run build` — PASS, 20 stron lokalnego working tree.
- `npm run test:contact` — 22/22 PASS.
- `npm audit` i `npm audit --omit=dev` — 0 vulnerabilities.
- `npm run check:links` — 21 HTML, brak złamanych linków wewnętrznych.
- `npm run check:worker` — build i Wrangler dry-run PASS; Worker ok. 12,06 KiB / 3,67 KiB gzip.
- świeże `npm ci --ignore-scripts` w katalogu tymczasowym — PASS.
- skan sekretów bieżącego drzewa i historii — brak rzeczywistych sekretów.

## Kontrole produkcyjne

- statusy/redirecty HTTP i HTTPS dla apex, `www`, tras, `/admin/`, `/api/contact` i brakującej ścieżki;
- nagłówki, cache, robots, sitemap, RSS, canonicale, hreflangi i structured data;
- DNS A/AAAA/MX/TXT/DMARC/CAA/DS oraz certyfikat TLS;
- bezpieczne, niewysyłające poczty requesty do endpointu: GET 405, unsupported content 415, validation 422, invalid Turnstile 400;
- Playwright dla reprezentatywnych PL/EN stron i szerokości 320, 375, 430, 768, 1024, 1280, 1440 i 1920 px;
- menu keyboard/Escape/focus/inert oraz błędy konsoli;
- Lighthouse mobile/desktop dla home, Insights, artykułu i kontaktu.

## Czego audyt celowo nie potwierdza

- rzeczywistego wysłania i otrzymania wiadomości PL/EN;
- limitowania produkcji przez agresywny load test;
- konfiguracji sekretów, rate limits, OAuth, Turnstile i Email Routing w dashboardach;
- pełnej zgodności prawnej tekstu prywatności;
- pełnej zgodności WCAG wyłącznie na podstawie automatyki;
- danych terenowych Core Web Vitals, pozycji i stanu indeksacji w Search Console;
- zachowania na każdym urządzeniu, przeglądarce i realnym challenge Turnstile.

# Batch 1 remediation status

**Aktualizacja:** 27 lipca 2026
**Zakres:** poprawki możliwe do bezpiecznego wykonania w repozytorium; bez deployu i bez zmian w Cloudflare, DNS, OVH, OAuth, Turnstile lub Email Routing.

| Audit ID | Status | Batch 1 |
|---|---|---|
| UX-01 | **RESOLVED IN CODE** | Dodano dwujęzyczne `src/pages/404.astro`; lokalny Worker zwraca nową treść z faktycznym statusem 404 i bez redirectu do home. |
| SEC-03 | **RESOLVED IN CODE** | Centralny `serializeJsonLd()` neutralizuje `<`; test zachowuje semantykę złośliwego payloadu i poprawność JSON. |
| FORM-01 | **RESOLVED IN CODE** | Frontend ma 15-sekundowy AbortController/timeout, niejednoznaczny komunikat PL/EN, recovery UI i retry tests. |
| CMS-02 | **RESOLVED IN CODE** | `test:content` sprawdza slugi, translation keys, folder/locale, daty, obrazy, pary, CMS parity i CMS↔Astro contract. |
| TEST-01 | **PARTIALLY RESOLVED** | Dodano CI, testy frontend/security/content/dist i smoke 404; szeroki stały E2E/screenshot suite pozostaje przyszłym rozszerzeniem. |
| CMS-01 | **PARTIALLY RESOLVED** | Sveltia 0.173.0 jest self-hostowane z wersją, npm integrity, SHA-256 i licencją. Zakres OAuth i zabezpieczenia konta nadal wymagają kontroli poza repo. |
| SEO-01 | **PARTIALLY RESOLVED** | Kod, canonicale, hreflangi, sitemap, RSS, artykuły i linki używają końcowego `/`; zachowanie produkcyjnego edge nadal wymaga weryfikacji. |
| UX-02 | **RESOLVED IN CODE** | Główne CTA prowadzą do formularza; jawny adres `mailto:` pozostaje fallbackiem. |
| CMS-03 | **PARTIALLY RESOLVED** | CI tworzy bramkę jakości dla push/PR, ale CMS nadal zapisuje do `main`; branch protection wymaga ustawień GitHub. |
| CLEAN-01 | **PARTIALLY RESOLVED** | Usunięto `public/.DS_Store`; legacy preview i niepewny upload obrazu pozostawiono bezpiecznie do decyzji właściciela. |
| LIC-01 | **PARTIALLY RESOLVED** | Dodano potwierdzone licencje Satteri, YAML i dokładnego artefaktu Sveltia; nie zgadywano provenance nieudokumentowanych obrazów. |
| SEC-01 | **REQUIRES PRODUCTION CONFIGURATION** | Repo nie może wymusić globalnego HTTP→HTTPS bez kontroli aktywnej konfiguracji Cloudflare. |
| EDGE-01 | **REQUIRES PRODUCTION CONFIGURATION** | `www` 522 wymaga ręcznej naprawy route/DNS poza repo. |
| SEC-02 | **DEFERRED** | Produkcyjne security headers/HSTS wymagają osobnego, testowanego batcha i konfiguracji edge. |
| PRIV-01 | **DEFERRED** | Lokalna polityka nadal zawiera `[[LEGAL_CONTROLLER_NAME]]`; nie wykonano deployu ani zmian merytorycznych. |
| NET-01 / NET-02 | **REQUIRES PRODUCTION CONFIGURATION** | DMARC/DKIM/DNSSEC/CAA pozostają poza zakresem kodu. |

**PRODUCTION VERIFICATION REQUIRED:** Cloudflare trailing-slash redirects, HTTP→HTTPS i `www`→apex nie zostały zmienione ani uznane za naprawione. Przed jakimkolwiek deployem należy też usunąć placeholder administratora danych i zatwierdzić treść polityki prywatności.

# Batch 2 remediation status

**Aktualizacja:** 27 lipca 2026
**Zakres:** architektura treści, copy PL/EN, CTA i micro-UX; bez deployu i bez zmian infrastruktury lub konfiguracji zewnętrznej.

| Obszar audytu | Status | Batch 2 |
|---|---|---|
| CONTENT-01 | **RESOLVED IN CODE** | Home ma rolę syntezy, Services opisuje zakres i rezultat, About rozwija wiarygodność, a Insights pozostaje warstwą ekspercką. Usunięto wskazane slogany i najbardziej widoczne konstrukcje „nie X / not X”, bez automatycznego przepisywania analitycznej treści. |
| UX-02 | **RESOLVED IN CODE** | Główna nawigacja prowadzi zawsze do jednoznacznych stron Services i About, końcowy CTA Services nie jest już zdublowany, Contact band prowadzi do formularza, a email pozostaje ścieżką drugorzędną. |
| M. Content overlap | **RESOLVED IN CODE** | Home Experience został skrócony, Approach opisuje zasady, Readiness cykl organizacyjny, a How we work metodę współpracy. Celowe relacje preview→detail oraz konieczny parytet PL/EN pozostają zachowane. |

Weryfikacja objęła pełny zestaw testów repozytorium oraz 104 kombinacje 13 tras i 8 szerokości viewportu. Batch 2 nie zmienił statusu pozycji infrastrukturalnych, domenowych, prawnych ani wymagających paneli produkcyjnych.
