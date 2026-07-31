# ClearStance Insights visual system — POC review

Status: POC zaakceptowany i wdrożony produkcyjnie 31 lipca 2026. Katalog `screenshots/` pozostaje historycznym zapisem POC, a `final/` zawiera screenshoty aktualnego wdrożenia.

## Historyczne materiały POC

### System

- `screenshots/system-board-1440.png` — trzy motywy i sześć kontrolowanych wariantów.

### Indeks Insights

- `screenshots/index-pl-1440.png`;
- `screenshots/index-pl-390.png`;
- `screenshots/index-en-1440.png`;
- `screenshots/index-en-390.png`.

### Nagłówek przykładowego artykułu

- `screenshots/article-pl-1440.png`;
- `screenshots/article-pl-390.png`;
- `screenshots/article-en-1440.png`;
- `screenshots/article-en-390.png`.

### Open Graph

- `screenshots/og-pl-1200x630.png`;
- `screenshots/og-en-1200x630.png`.

### Walidacja

- `screenshots/validation-report.json`.

## Finalne wdrożenie

Katalog `final/` zawiera:

- indeks PL/EN przy 1440 i 390 px;
- wszystkie cztery artykuły PL i EN przy 1440 i 390 px;
- `validation-report.json` z 60 audytami responsywnymi.

Aktualny generator:

```bash
node scripts/review-insights-production.mjs
```

Wymaga uruchomionego `npm run preview -- --host 127.0.0.1 --port 4321`. Skrypt korzysta z Chrome przez CDP i sprawdza wszystkie produkcyjne indeksy i artykuły oraz kontrolnie Home PL/EN.

## Kryteria oceny

- czy motywy są rozróżnialne semantycznie bez kodowania kolorem;
- czy warianty nadal wyglądają jak jeden system;
- czy ilustracje pozostają editorialowe i nie przypominają UI;
- czy rytm indeksu wspiera skanowanie bez dominowania nad tytułami;
- czy wersje paper, ink i Open Graph są równoważne;
- czy układ mobilny zachowuje właściwą hierarchię;
- czy fallback i proponowane pole CMS są wystarczająco przewidywalne.

Dokumenty:

- historyczny POC: `docs/insights-visual-system-poc.md`;
- finalne wdrożenie: `docs/insights-visual-system-production.md`.
