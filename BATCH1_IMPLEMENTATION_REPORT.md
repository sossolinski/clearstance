# Executive summary

Batch 1 został wykonany wyłącznie w repozytorium. Nie logowano się do paneli, nie zmieniano Cloudflare, DNS, OVH, OAuth, Turnstile ani Email Routing i nie wykonano deployu.

Zaimplementowano:

- dwujęzyczną stronę 404, zwracaną lokalnie przez Cloudflare Worker z faktycznym statusem `404`;
- centralną, testowaną serializację JSON-LD odporną na zamknięcie elementu `<script>`;
- 15-sekundowy timeout formularza, komunikat o nieznanym wyniku, pełne recovery UI i możliwość ponowienia;
- kontrakt Insights/CMS obejmujący 10 aktualnych wpisów, pary PL/EN, daty, obrazy, foldery, slugi i parytet Sveltia;
- GitHub Actions dla push do `main` i pull requestów, bez sekretów i deployu;
- self-host Sveltia CMS `0.173.0` z wersjonowanym plikiem, npm integrity, lokalnym SHA-256 i kopią licencji;
- jedną konwencję publicznych URL z końcowym `/` w trasach, canonicalach, hreflangach, sitemap, RSS i linkach;
- formularz jako primary contact action oraz jawny `mailto:` jako fallback;
- usunięcie `public/.DS_Store` bez ingerencji w niepewne pliki użytkownika;
- test wygenerowanego `dist`, testy formularza frontendowego i JSON-LD oraz pełną regresję lokalną.

Nie zmieniono wyglądu istniejących stron poza nową stroną 404 i świadomą zmianą celu głównych CTA kontaktowych. Lokalna polityka prywatności pozostaje niewdrożona i nadal nie jest gotowa do publikacji z uwagi na placeholder administratora danych.

# Files changed

| File | Change | Reason |
|---|---|---|
| `.github/workflows/quality.yml` | Nowy workflow dla PR i push do `main`; `npm ci`, walidacja, testy, build i Worker dry-run. | Podstawowe CI bez sekretów i deployu. |
| `astro.config.mjs`, `src/i18n/routes.ts` | `trailingSlash: "always"`; wszystkie publiczne trasy i artykuły kończą się `/`. | Jedno źródło konwencji URL. |
| `src/lib/json-ld.ts`, `src/layouts/BaseLayout.astro` | Centralny serializer kodujący `<`, U+2028 i U+2029; zastąpienie bezpośredniego `JSON.stringify` w `set:html`. | Usunięcie sinka `</script>` przy zachowaniu poprawnego JSON-LD. |
| `src/pages/404.astro`, `src/styles/global.css` | Dwujęzyczna 404 zgodna z obecnymi layoutami, tokenami i breakpointami. | Czytelna ścieżka odzyskania zamiast pustego body. |
| `src/scripts/contact-form.ts` | Wydzielona, testowalna logika wysyłki z AbortController, timeoutem i recovery. | Formularz nie pozostaje trwale zablokowany. |
| `src/components/pages/ContactPage.astro`, `src/i18n/translations.ts` | Integracja modułu formularza i niedefinitywny komunikat timeout PL/EN. | Poprawna informacja, gdy wynik requestu jest nieznany. |
| `src/components/navigation/Header.astro`, `src/components/sections/ContactBand.astro` | Primary CTA kieruje do `/kontakt/` lub `/en/contact/`; adres e-mail pozostaje aktywnym fallbackiem. | Spójna główna ścieżka kontaktowa. |
| `src/content/insight-schema.ts`, `src/content.config.ts` | Wydzielony, współdzielony schemat; wzorce identyfikatorów, typy obrazów i kolejność dat. | Jawny kontrakt Astro używany przez build i checker. |
| `scripts/check-content.mjs` | Walidacja contentu, assetów, dat, par, locale, CMS PL/EN, CMS↔Astro i rzeczywistego hooka `preSave`. | Ochrona workflow redakcyjnego i obecnego workaroundu obrazów. |
| `scripts/check-dist.mjs` | Smoke 12 reprezentatywnych tras, metadata, slash, sitemap, RSS, assety, CTA, 404 i hash Sveltia. | Regresja wygenerowanego artefaktu, nie tylko kodu źródłowego. |
| `tests/contact-form.test.mjs` | Sukces, timeout, network failure, UI restore i retry po timeout. | Celowana regresja frontendowego formularza. |
| `tests/json-ld.test.mjs` | Payload `</script><script>…`, poprawność JSON i niezmieniona semantyka. | Test bezpieczeństwa serializer-a. |
| `public/admin/index.html` | Lokalny, wersjonowany skrypt Sveltia i istniejący favicon. | Brak runtime `latest` i brak zbędnego 404 favicony. |
| `public/admin/sveltia-cms-0.173.0.js` | Zweryfikowany artefakt z pakietu npm `@sveltia/cms@0.173.0`. | Reprodukowalny self-host CMS. |
| `public/admin/sveltia-cms.version.json` | Źródło, dokładna wersja, npm integrity i SHA-256 artefaktu. | Kontrolowana aktualizacja i automatyczna kontrola integralności. |
| `public/admin/sveltia-cms.LICENSE.txt` | Oryginalna licencja MIT dystrybucji. | Zachowanie warunków licencji vendored kodu. |
| `public/admin/config.yml` | Przypięcie wyłącznie edytorskiego URL schema do `0.173.0`; model CMS bez zmian. | Brak niekontrolowanego schematu `latest`; workflow obrazów zachowany. |
| `package.json`, `package-lock.json` | Skrypty `test:content`, `test:frontend`, `test:dist`; bezpośrednia dev dependency `yaml@2.9.0`. | Reprodukowalne checkery content/CMS. |
| `tsconfig.json` | Wyłączenie tylko vendored `sveltia-cms-0.173.0.js` z diagnostyki. | Zapobieganie OOM `astro check`; kod własny nadal jest sprawdzany, vendor ma hash test. |
| `README.md` | Dokumentacja nowych testów, slash convention i kontrolowanej aktualizacji Sveltia. | Operacyjna powtarzalność Batch 1. |
| `THIRD_PARTY_LICENSES.md` | Potwierdzone wpisy Satteri, YAML i wersjonowanego Sveltia. | Uzupełnienie znanej licencji i provenance software. |
| `AUDIT_CLEARSTANCE.md` | Dodana wyłącznie sekcja statusu remediation Batch 1. | Historyczny audyt pozostaje nieprzepisany; status infrastruktury jest jawny. |
| `public/.DS_Store` | Usunięty lokalny artefakt; `.gitignore` już blokował ponowne dodanie. | Bezpieczny cleanup o wysokiej pewności. |

# Findings addressed

| Audit ID | Status | Implementation |
|---|---|---|
| UX-01 | RESOLVED | `404.astro`, smoke `dist` i lokalny request brakującej ścieżki: status 404, treść PL/EN, brak redirectu home. |
| SEC-03 | RESOLVED | `serializeJsonLd()` i regresyjny malicious-payload test. |
| FORM-01 | RESOLVED | AbortController, 15 s timeout, komunikat nieznanego wyniku, restore i retry. |
| CMS-02 | RESOLVED | Checker wszystkich wymaganych kontraktów content/CMS oraz asset existence/type. |
| UX-02 | RESOLVED | Formularz jako primary CTA; jawny email jako secondary fallback. |
| SEO-01 | PARTIAL | Repo i `dist` są spójne z końcowym `/`; aktywny edge produkcyjny nie został zmieniony. |
| CMS-01 | PARTIAL | Ryzyko nieprzypiętego runtime usunięte przez self-host `0.173.0`; OAuth scope/account pozostają manualne. |
| TEST-01 | PARTIAL | Podstawowe CI i celowane testy dodane; stały cross-browser E2E/screenshot suite nie jest częścią Batch 1. |
| CMS-03 | PARTIAL | CI sprawdza push/PR; CMS nadal zapisuje do `main`, a branch protection wymaga GitHub settings. |
| CLEAN-01 | PARTIAL | `.DS_Store` usunięty; untracked legacy preview i niepewny upload pozostawione. |
| LIC-01 | PARTIAL | Potwierdzone licencje software uzupełnione; nie zgadywano provenance pozostałych obrazów. |
| SEC-01 | MANUAL CONFIG REQUIRED | HTTP→HTTPS wymaga aktywnej konfiguracji Cloudflare. |
| EDGE-01 | MANUAL CONFIG REQUIRED | `www`→apex / 522 wymaga naprawy poza repo. |
| SEC-02 | DEFERRED | Security headers i HSTS wymagają osobnego, path-aware rollout oraz testu produkcji. |
| PRIV-01 | DEFERRED | Placeholder `[[LEGAL_CONTROLLER_NAME]]` nie został uzupełniony ani wdrożony. |
| FORM-02 | DEFERRED | Pełny no-JS HTML fallback pozostaje poza Batch 1. |
| NET-01 / NET-02 | MANUAL CONFIG REQUIRED | DMARC, DKIM, DNSSEC i CAA nie są zmianami repozytorium. |

# Tests

## Baseline przed zmianami

| Command | Result |
|---|---|
| `npm run check` | PASS — 51 plików, 0 errors/warnings/hints. |
| `npm run typecheck` | PASS. |
| `npm run build` | PASS — 20 stron. |
| `npm run test:contact` | PASS — 22/22. |
| `npm run check:links` | PASS — 21 HTML, brak złamanych linków. |
| `npm run check:worker` | PASS — build i Wrangler dry-run, 78 assetów. |

## Po implementacji i czystym `npm ci`

| Command | Result |
|---|---|
| `npm ci` | PASS — 320 packages, 0 vulnerabilities. |
| `npm run check` | PASS — 59 plików, 0 errors/warnings/hints. |
| `npm run typecheck` | PASS. |
| `npm run test:contact` | PASS — 22/22; backend formularza bez zmian. |
| `npm run test:frontend` | PASS — 6/6: sukces, timeout, network error, retry, JSON-LD security. |
| `npm run test:content` | PASS — 10 wpisów, 0 warnings. |
| `npm run build` | PASS — 21 stron, w tym `/404.html`. |
| `npm run check:links` | PASS — 22 HTML, brak złamanych linków. |
| `npm run test:dist` | PASS — 12 tras, 404, feeds i Sveltia 0.173.0. |
| `npm run check:worker` | PASS — build, 82 assety i Wrangler dry-run bez sekretów/deployu. |
| Node 22.12.0 targeted smoke | PASS — `test:content`, 6 testów frontend/JSON-LD i `test:dist` na dokładnej wersji CI. |
| Lokalny HTTP smoke przez `wrangler dev` | PASS — brakująca ścieżka 404 bez redirectu; finalne slash routes 200; admin i bundle 200. |

Pierwsze uruchomienie `npm run check` po vendoringu CMS ujawniło OOM, ponieważ szeroki `tsconfig` obejmował również 2‑MB minified vendor file. Naprawa jest zawężona do dokładnego artefaktu w `tsconfig.json`; ponowny check po czystym installu przechodzi. Integralność wyłączonego artefaktu kontroluje `test:dist`.

# Visual regression

W lokalnym Chrome wykonano 56 kombinacji:

- strony: Home PL, Home EN, Contact PL, Contact EN, Insights, artykuł, 404 i `/admin/`;
- viewporty: 320, 375, 430, 768, 1024, 1440 i 1920 px.

Wynik:

- brak dokumentowego poziomego overflow;
- poprawne title i `lang`;
- brak brakujących stylów i assetów aplikacji;
- 404 zachowuje design system i jest czytelna w układzie jedno- i dwukolumnowym;
- istniejące Home, Contact, Insights i artykuł nie wykazały zmiany układu;
- `/admin/` po końcowej poprawce favicony przeszedł ponownie na wszystkich siedmiu viewportach bez zarejestrowanych błędów konsoli.

Nie testowano realnego produkcyjnego challenge Turnstile — lokalny build bez produkcyjnego site key zgodnie z projektem pokazuje stan niedostępnego formularza.

# CMS regression

- `/admin/` ładuje `/admin/sveltia-cms-0.173.0.js`, nie nieprzypięty URL CDN.
- Bundle, `config.yml` i `insights-validation.js` odpowiadały lokalnie `200`.
- Ekran „ClearStance Insights” z local repository i GitHub login wyrenderował się bez błędów związanych z bundle.
- `test:dist` sprawdził SHA-256 artefaktu względem manifestu.
- `test:content` wykonał rzeczywisty hook `preSave`: poprawna ścieżka przechodzi, ścieżka poza media folderem i header bez alt są odrzucane, orphan alt jest usuwany.
- Pola `headerImage` i `socialImage` nadal nie mają `pattern`.
- `choose_url: false`, `stock_assets: false`, `/public/images/insights` i `/images/insights/` pozostają niezmienione.
- Nie wykonywano OAuth ani zapisu testowej treści do `main`.

# Remaining manual infrastructure work

**PRODUCTION VERIFICATION REQUIRED**

1. Naprawić i potwierdzić `www`→apex; obecne produkcyjne `www` 522 nie zostało rozwiązane.
2. Włączyć i zweryfikować HTTP→HTTPS dla wszystkich hostów i tras.
3. Dopiero po naprawie hostów zaplanować HSTS.
4. Wdrożyć i przetestować path-aware security headers/CSP dla public, contact, admin i API.
5. Po deployu potwierdzić, że Cloudflare respektuje finalną konwencję `/`, canonicale i redirecty bez pętli.
6. Zweryfikować właściciela OAuth app, callback, scopes, sekret, dedykowane konto, 2FA i branch protection.
7. Zweryfikować Turnstile hostname/action/mode/preclearance i produkcyjny site key.
8. Zweryfikować aktywny rate limit `/api/contact`.
9. Zweryfikować Email binding, sekrety i rzeczywiste doręczenie jednego testu PL oraz EN.
10. Zinwentaryzować pocztę, DKIM i wdrożyć DMARC kontrolowanymi etapami.
11. Rozważyć DNSSEC i CAA po ustabilizowaniu domeny.
12. Uzupełnić dane administratora, wykonać review prawne i usunąć placeholder polityki przed deployem.

# Risks / notes

- Nie wykonano deployu ani jakiejkolwiek zmiany w panelach infrastruktury.
- `public/admin/sveltia-cms-0.173.0.js` zwiększa statyczny artefakt o około 2,1 MB, ale jest ładowany wyłącznie przez `/admin/`. Każda aktualizacja wymaga świadomej zmiany wersji, pliku, licencji, manifestu, SHA-256 i referencji HTML.
- Timeout klienta nie dowodzi braku wysyłki. Copy PL/EN mówi, że wynik jest nieznany i ostrzega pośrednio przed bezrefleksyjnym założeniem niepowodzenia; ponowienie może w rzadkim scenariuszu dać drugi e-mail.
- Aktualna reguła publikacji nadal publikuje niedraftowy wpis z przyszłą datą. Checker emituje w takim przypadku warning, nie zmienia arbitralnie semantyki.
- `[[LEGAL_CONTROLLER_NAME]]` nadal występuje w zastanej lokalnej polityce. Batch 1 nie publikuje ani merytorycznie nie zmienia tej treści.
- `preview (2).html` jest untracked i nieużywany; pozostawiono go jako plik użytkownika.
- `public/images/insights/screenshot-2026-07-26-at-11-30-23.webp` nie ma referencji, ale pozostaje manual cleanup candidate z uwagi na niepewną intencję redakcyjną.
- Workaround Sveltia image fields jest objęty testem i nie został zmieniony.

## Follow-up candidates

- dostępny fallback formularza bez JavaScriptu (FORM-02);
- produkcyjne security headers/CSP po osobnym inventory zasobów;
- branch protection/editorial workflow przy większej liczbie redaktorów;
- stały, lekki browser smoke w CI, jeśli zostanie wybrany wspierany runtime przeglądarki;
- responsive dimensions/srcset dla przyszłych obrazów artykułów;
- provenance nieudokumentowanych assetów po potwierdzeniu przez właściciela.
