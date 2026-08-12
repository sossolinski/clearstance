import type { CommercialContent } from './types';

const capabilities: CommercialContent['capabilities'] = [
  {
    id: 'crisis-management',
    anchor: 'zarzadzanie-kryzysowe',
    title: 'Zarządzanie kryzysowe',
    text: 'Projektujemy i porządkujemy model działania zespołu zarządzania kryzysowego: jego mandat, role, aktywację, eskalację, rytm pracy, przepływ informacji oraz narzędzia wspierające decyzje.',
    scope: [
      'mandat, skład i model działania CMT',
      'role, odpowiedzialności i uprawnienia decyzyjne',
      'aktywacja, eskalacja i rytm pracy',
      'wspólny obraz sytuacji i przepływ informacji',
      'plany, checklisty, role cards i narzędzia decyzyjne'
    ],
    outputs: [
      'model działania i uzgodnione role',
      'zasady eskalacji i obiegu informacji',
      'narzędzia wspierające pracę zespołu',
      'priorytetowy plan działań'
    ]
  },
  {
    id: 'crisis-communication',
    anchor: 'komunikacja-kryzysowa',
    title: 'Przygotowanie do komunikacji kryzysowej',
    text: 'Przygotowujemy organizację do komunikacji w pierwszych godzinach i kolejnych fazach zdarzenia. Zakres obejmuje role, ścieżki zatwierdzania, potrzeby interesariuszy, holding statements oraz współpracę CMT z zespołem komunikacji.',
    scope: [
      'role i odpowiedzialności komunikacyjne',
      'współpraca CMT z zespołem komunikacji',
      'przygotowanie i zatwierdzanie komunikatów',
      'holding statements i zestaw narzędzi',
      'gotowość do presji informacyjnej'
    ],
    outputs: [
      'model współpracy i ścieżki zatwierdzania',
      'szablony i narzędzia pierwszej godziny',
      'ustalenia dotyczące interesariuszy i kanałów',
      'priorytety poprawy'
    ]
  },
  {
    id: 'affected-people',
    anchor: 'wsparcie-osob-i-rodzin',
    title: 'Wsparcie osób dotkniętych zdarzeniem i ich bliskich',
    text: 'Projektujemy rozwiązania organizacyjne służące przekazywaniu informacji i praktycznemu wsparciu osób dotkniętych zdarzeniem, ich bliskich oraz personelu zaangażowanego w reakcję.',
    scope: [
      'struktury, role i zasady aktywacji',
      'informacja o osobach i poufność',
      'kontakt z bliskimi i osobami oczekującymi na informację',
      'miejsca przyjęcia, infolinia i praktyczne wsparcie',
      'współpraca z władzami, służbami i partnerami'
    ],
    outputs: [
      'model organizacyjny i zakresy odpowiedzialności',
      'koncepcja wsparcia i przepływu informacji',
      'procedury, role cards i narzędzia',
      'priorytety ćwiczeń i dalszego przygotowania'
    ]
  }
];

const exercisePhases: CommercialContent['exercisePhases'] = [
  {
    id: 'frame',
    title: 'Ustalenie ram',
    text: 'Ustalamy kontekst, cele, uczestników, granice zakresu i pytania, na które ćwiczenie ma dostarczyć odpowiedzi.',
    output: 'Uzgodniony Exercise Brief, cele i zakres.'
  },
  {
    id: 'design',
    title: 'Projektowanie',
    text: 'Budujemy logikę scenariusza, momenty decyzyjne, informacje wejściowe, sposób kontroli oraz ramy obserwacji.',
    output: 'Plan ćwiczenia, informacja dla uczestników i uzgodnione założenia.'
  },
  {
    id: 'exercise',
    title: 'Ćwiczenie',
    text: 'Prowadzimy briefing i facylitowaną sesję, zarządzamy przebiegiem oraz zbieramy obserwacje odnoszące się do uzgodnionych celów.',
    output: 'Sesja, hot debrief i uporządkowany materiał obserwacyjny.'
  },
  {
    id: 'improve',
    title: 'Doskonalenie',
    text: 'Łączymy obserwacje w After Action Review i pomagamy określić priorytetowe działania oraz sposób ich ponownego sprawdzenia.',
    output: 'After Action Review i priorytetowy rejestr działań.'
  }
];

export const commercialPl: CommercialContent = {
  capabilities,
  exercisePhases,
  home: {
    meta: {
      title: 'ClearStance | Doradztwo i ćwiczenia kryzysowe',
      description: 'ClearStance wspiera organizacje w projektowaniu i sprawdzaniu struktur, decyzji, komunikacji oraz wsparcia ludzi podczas poważnych zdarzeń.'
    },
    hero: {
      eyebrow: 'Boutique crisis readiness advisory',
      title: 'Clarity when',
      titleAccent: 'it matters most.',
      copy: 'ClearStance pomaga organizacjom projektować i sprawdzać sposób zarządzania poważnymi zdarzeniami — od modelu pracy zespołu kryzysowego i komunikacji po rozwiązania wspierające osoby dotknięte zdarzeniem i ich bliskich.',
      primaryCta: 'Zobacz, jak możemy pomóc',
      secondaryCta: 'Poznaj ćwiczenia'
    },
    capabilities: {
      eyebrow: 'Zakres kompetencji',
      title: 'Trzy obszary gotowości kryzysowej.',
      intro: 'Pracujemy nad trzema połączonymi obszarami gotowości. Każdy z nich dotyczy struktur, odpowiedzialności, informacji i decyzji, które muszą działać razem podczas poważnego zdarzenia.'
    },
    ways: {
      eyebrow: 'Sposób współpracy',
      title: 'Doradztwo i ćwiczenia.',
      intro: 'Te same zdolności rozwijamy poprzez doradztwo oraz ćwiczenia. Właściwa droga zależy od tego, czy organizacja potrzebuje oceny i projektu rozwiązania, czy sprawdzenia go w działaniu.',
      advisory: {
        title: 'Doradztwo',
        text: 'Oceniamy istniejące rozwiązania, projektujemy model działania i pomagamy ustalić priorytety poprawy. Rezultatem mogą być uzgodnione role, procesy, narzędzia, raport dla kierownictwa lub plan dalszego rozwoju gotowości.',
        link: 'Poznaj Doradztwo'
      },
      exercises: {
        title: 'Ćwiczenia',
        text: 'Projektujemy i prowadzimy ćwiczenia, które pozwalają obserwować decyzje, koordynację, eskalację i przepływ informacji. Wnioski są porządkowane w formie After Action Review i działań doskonalących.',
        link: 'Poznaj Ćwiczenia'
      }
    },
    engagements: {
      eyebrow: 'Punkt wyjścia',
      title: 'Od czego możemy zacząć.',
      intro: 'Współpracę można rozpocząć od ograniczonego przeglądu istniejącej gotowości albo od ćwiczenia zaprojektowanego wokół konkretnych celów.',
      review: {
        type: 'Doradztwo · przegląd',
        title: 'Crisis Readiness Review',
        text: 'Ustrukturyzowany, jasno określony przegląd istniejących rozwiązań. Łączy analizę dokumentów, wybrane rozmowy i warsztat, a kończy się syntetycznym raportem dla kierownictwa oraz listą priorytetowych działań.',
        link: 'Poznaj zakres przeglądu'
      },
      tabletop: {
        type: 'Ćwiczenia · format główny',
        title: 'Executive Tabletop Exercise',
        text: 'Facylitowane ćwiczenie dla kadry zarządzającej i CMT, projektowane wokół uzgodnionych celów, decyzji i punktów współpracy. Obejmuje przygotowanie, sesję ćwiczeniową, obserwację, hot debrief oraz After Action Review.',
        link: 'Zobacz, jak przebiega ćwiczenie'
      }
    },
    readiness: {
      eyebrow: 'Gotowość i podejście',
      title: 'Od rozpoznania do doskonalenia.',
      quote: ['Know where you are.', 'Understand what is changing.', 'Decide where to go.'],
      stages: [
        { title: 'Rozpoznanie', text: 'Ocena ryzyk, zależności i obecnego sposobu reagowania wyznacza punkt wyjścia.' },
        { title: 'Przygotowanie', text: 'Role, uprawnienia, progi eskalacji i przepływ informacji są uzgodnione i zrozumiałe.' },
        { title: 'Ćwiczenie', text: 'Scenariusz pozwala sprawdzić założenia, decyzje i współpracę zespołu.' },
        { title: 'Reagowanie', text: 'Organizacja wykorzystuje przygotowany model podczas rzeczywistego zdarzenia.' },
        { title: 'Doskonalenie', text: 'Wnioski mają właścicieli, priorytety i termin ponownego sprawdzenia.' }
      ],
      note: 'Doradztwo wspiera rozpoznanie, przygotowanie i doskonalenie. Ćwiczenia łączą sprawdzenie gotowości z działaniami poprawiającymi. Reagowanie pozostaje zdolnością organizacji wykorzystywaną podczas rzeczywistego zdarzenia.',
      approachTitle: 'Praca osadzona w rzeczywistym modelu działania.',
      approachLead: 'Punktem wyjścia jest rzeczywisty sposób działania organizacji: jej odpowiedzialności, zależności, ograniczenia i decyzje. Zakres pracy pozostaje proporcjonalny do problemu i prowadzi do ustaleń, które można zastosować w planie, modelu działania albo kolejnym ćwiczeniu.',
      principles: [
        { title: 'Kontekst operacyjny', text: 'Ocena uwzględnia rzeczywiste role, zależności i ograniczenia organizacji.' },
        { title: 'Role i punkty współpracy', text: 'Ustalenia porządkują odpowiedzialność, informację, decyzje i eskalację.' },
        { title: 'Praca z odpowiedzialnymi osobami', text: 'W proces angażowane są role, które podejmują decyzje i wykonują działania.' },
        { title: 'Rezultaty do wykorzystania', text: 'Wnioski prowadzą do konkretnych zmian, narzędzi lub działań doskonalących.' }
      ]
    },
    experience: {
      eyebrow: 'Doświadczenie',
      title: 'Doświadczenie operacyjne i perspektywa strategiczna.',
      paragraphs: ['ClearStance jest praktyką prowadzoną przez założyciela i łączy doświadczenie z żeglugi morskiej oraz lotnictwa z pracą w obszarach bezpieczeństwa operacyjnego, strategii i zarządzania kryzysowego.'],
      closing: 'Pełny kontekst drogi od odpowiedzialności operacyjnej do pracy doradczej znajduje się na stronie O ClearStance.',
      tracks: [
        { title: 'Żegluga morska', text: 'oficer wachtowy · operacje · bezpieczeństwo' },
        { title: 'Lotnictwo', text: 'analityka · projekty · strategia · zarządzanie kryzysowe' }
      ],
      link: 'Poznaj ClearStance'
    },
    insights: {
      eyebrow: 'Insights',
      title: 'ClearStance Insights',
      copy: 'Publikacje o gotowości organizacyjnej, pracy zespołów, ćwiczeniach i decyzjach podejmowanych przy niepełnej informacji.',
      all: 'Zobacz wszystkie publikacje'
    },
    contact: {
      eyebrow: 'Kontakt',
      title: 'Porozmawiajmy o potrzebach organizacji.',
      text: 'Możemy zacząć od planowanego ćwiczenia, przeglądu gotowości albo konkretnego obszaru, który wymaga uporządkowania.',
      cta: 'Omów potrzeby organizacji'
    }
  },
  advisory: {
    meta: {
      title: 'Doradztwo w zarządzaniu kryzysowym | ClearStance',
      description: 'Doradztwo dla organizacji rozwijających model zarządzania kryzysowego, komunikację oraz rozwiązania wspierające osoby dotknięte zdarzeniem.'
    },
    hero: {
      eyebrow: 'Doradztwo',
      title: 'Doradztwo dla organizacji przygotowujących się do poważnych zdarzeń.',
      lead: 'ClearStance ocenia i projektuje struktury, role, zasady eskalacji, przepływ informacji oraz narzędzia wspierające pracę organizacji podczas kryzysu.'
    },
    intro: {
      title: 'Kiedy doradztwo jest potrzebne',
      text: 'Zakres może dotyczyć całego modelu zarządzania kryzysowego albo konkretnego punktu współpracy, takiego jak komunikacja czy wsparcie osób dotkniętych zdarzeniem. Punktem wyjścia jest rzeczywisty sposób działania organizacji oraz decyzje, które muszą zostać podjęte.',
      triggers: [
        { title: 'Model rozwijał się etapami', text: 'Role, dokumenty i narzędzia powstawały w różnym czasie i nie tworzą jeszcze spójnego sposobu działania.' },
        { title: 'Zmieniła się organizacja', text: 'Nowa struktura, kierownictwo lub zakres odpowiedzialności wymagają ponownego uzgodnienia modelu kryzysowego.' },
        { title: 'Wymagania grupowe potrzebują lokalnego przełożenia', text: 'Polska spółka potrzebuje rozwiązania zgodnego z oczekiwaniami grupy i możliwego do zastosowania lokalnie.' },
        { title: 'Planowane jest ważne ćwiczenie', text: 'Przed scenariuszem trzeba uporządkować role, decyzje lub najważniejsze założenia sposobu reagowania.' }
      ]
    },
    capabilities: {
      eyebrow: 'Obszary doradztwa',
      title: 'Trzy połączone obszary gotowości.',
      intro: 'Doradztwo może obejmować jeden obszar lub punkty współpracy pomiędzy nimi. Zakres i oczekiwane rezultaty są ustalane przed rozpoczęciem pracy.'
    },
    review: {
      eyebrow: 'Crisis Readiness Review',
      title: 'Przegląd gotowości kryzysowej.',
      descriptor: 'Jasno określony przegląd doradczy · raport dla kierownictwa · priorytetowe działania',
      lead: 'Crisis Readiness Review daje kierownictwu uporządkowany obraz obecnych rozwiązań i priorytetów poprawy. Obejmuje uzgodniony zakres organizacyjny, wybrane dokumenty, rozmowy z kluczowymi rolami oraz wspólną analizę sposobu działania.',
      triggerTitle: 'Kiedy warto rozpocząć przegląd',
      triggers: [
        'dokumenty istnieją, lecz ich praktyczna użyteczność nie jest jasna',
        'role, uprawnienia i zasady eskalacji wymagają ponownego uzgodnienia',
        'lokalna organizacja wdraża wymagania grupowe',
        'ćwiczenie, zdarzenie lub zmiana organizacyjna pozostawiły rozproszone działania',
        'przed ważnym ćwiczeniem potrzebny jest wiarygodny punkt wyjścia'
      ],
      audienceTitle: 'Sponsor i uczestnicy',
      audience: 'Przegląd jest zwykle sponsorowany przez członka kierownictwa, dyrektora operacyjnego albo osobę odpowiedzialną za ryzyko, odporność organizacyjną, BCM lub zarządzanie kryzysowe. W rozmowach uczestniczą wybrane osoby posiadające wiedzę o modelu działania.',
      scopeTitle: 'Obszary oceny',
      scope: [
        'ład zarządczy, mandat i aktywacja',
        'role, odpowiedzialności i uprawnienia decyzyjne',
        'eskalacja, wspólny obraz sytuacji i przepływ informacji',
        'rytm pracy CMT, decyzje i śledzenie działań',
        'współpraca z komunikacją i funkcjami wspierającymi ludzi',
        'plany, narzędzia, ćwiczenia i zarządzanie doskonaleniem'
      ],
      includesTitle: 'Zakres współpracy obejmuje',
      includes: [
        'uzgodnienie pytania zarządczego i granic przeglądu',
        'analizę wybranych dokumentów i narzędzi',
        'rozmowy z osobami pełniącymi kluczowe role',
        'warsztat weryfikujący model działania i punkty współpracy',
        'analizę oraz podsumowanie dla kierownictwa'
      ],
      receivesTitle: 'Organizacja otrzymuje',
      receives: [
        'uzgodnione ramy oceny',
        'syntetyczny obraz obecnej gotowości',
        'ustalenia powiązane z ich znaczeniem dla działania',
        'raport dla kierownictwa',
        'priorytetowy plan działań'
      ],
      outcomeTitle: 'Rezultat',
      outcome: 'Kierownictwo wie, które elementy są użyteczne, gdzie występują najważniejsze luki oraz które zmiany należy wykonać przed kolejnym ćwiczeniem lub dalszą pracą nad modelem CMT.',
      nextTitle: 'Możliwy następny krok',
      next: 'Przegląd może prowadzić do ukierunkowanej pracy nad modelem działania CMT, komunikacją lub wsparciem osób dotkniętych zdarzeniem, a następnie do Executive Tabletop Exercise.',
      cta: 'Omów przegląd gotowości'
    },
    cmt: {
      eyebrow: 'Ukierunkowany zakres doradczy',
      title: 'Model działania CMT',
      text: 'Zakres służący uzgodnieniu sposobu pracy zespołu zarządzania kryzysowego i narzędzi, które mają wspierać decyzje podczas poważnego zdarzenia.',
      points: [
        'mandat, skład i role',
        'uprawnienia decyzyjne i zastępstwa',
        'aktywacja i eskalacja',
        'rytm spotkań i wspólny obraz sytuacji',
        'decyzje, działania i dokumentowanie',
        'współpraca z komunikacją i funkcjami operacyjnymi'
      ]
    },
    process: {
      eyebrow: 'Sposób współpracy',
      title: 'Od pytania do użytecznych ustaleń.',
      intro: 'Każdy zakres jest dostosowany do problemu, ale sposób pracy pozostaje przejrzysty i oparty na rzeczywistych dowodach organizacyjnych.',
      items: [
        { title: 'Ustalenie pytania i zakresu', text: 'Określamy decyzję, problem lub model, który wymaga oceny albo zaprojektowania.' },
        { title: 'Zebranie materiału', text: 'Analizujemy uzgodnione dokumenty, narzędzia i perspektywy osób pełniących kluczowe role.' },
        { title: 'Praca nad modelem', text: 'Wspólnie sprawdzamy odpowiedzialności, informacje, decyzje, ograniczenia i punkty współpracy.' },
        { title: 'Uzgodnienie rezultatów', text: 'Porządkujemy wnioski, oczekiwane zmiany i kolejne działania w formie odpowiedniej dla kierownictwa i właścicieli.' }
      ]
    },
    outputs: {
      title: 'Co pozostaje po projekcie',
      intro: 'Zestaw rezultatów zależy od uzgodnionego zakresu. Może obejmować:',
      items: [
        'ustalenia i priorytety dla kierownictwa',
        'model działania i opis ról',
        'zasady aktywacji, eskalacji i przepływu informacji',
        'role cards, checklisty i narzędzia decyzyjne',
        'plan działań doskonalących'
      ],
      note: 'ClearStance nie sprzedaje certyfikacji. Odpowiednie standardy mogą stanowić punkt odniesienia dla jakości i kompletności rozwiązania.'
    },
    insights: {
      eyebrow: 'Powiązane publikacje',
      title: 'Materiały związane z gotowością organizacyjną.',
      copy: 'Wybrane publikacje pokazują problemy, które często pojawiają się w przeglądach i pracy nad modelem CMT.'
    },
    contact: {
      title: 'Omówmy potrzeby organizacji.',
      text: 'Wystarczy krótki opis obecnego modelu, problemu albo planowanej zmiany. Na tej podstawie można ustalić właściwy zakres pierwszej rozmowy.',
      cta: 'Omów potrzeby organizacji'
    }
  },
  exercises: {
    meta: {
      title: 'Ćwiczenia kryzysowe dla organizacji | ClearStance',
      description: 'Projektowanie i prowadzenie ćwiczeń kryzysowych dla kadry zarządzającej, CMT, komunikacji oraz funkcji wspierających osoby dotknięte zdarzeniem.'
    },
    hero: {
      eyebrow: 'Ćwiczenia kryzysowe',
      title: 'Ćwiczenia zaprojektowane wokół decyzji, koordynacji i informacji.',
      lead: 'ClearStance projektuje i prowadzi ćwiczenia dla kadry zarządzającej, CMT oraz funkcji odpowiedzialnych za komunikację i wsparcie osób dotkniętych zdarzeniem.'
    },
    intro: {
      title: 'Cele ćwiczenia wyznaczają scenariusz i obserwację.',
      text: 'Przed ćwiczeniem określamy role, decyzje, punkty współpracy i zachowania wymagające obserwacji. Scenariusz tworzy warunki do pracy, a wnioski po sesji są porządkowane w odniesieniu do uzgodnionych celów.'
    },
    focus: {
      eyebrow: 'Obszary obserwacji',
      title: 'Co ćwiczenie może pokazać.',
      intro: 'Zakres obserwacji jest wybierany przed rozpoczęciem projektowania i pozostaje proporcjonalny do czasu, uczestników oraz celu ćwiczenia.',
      items: [
        'aktywacja i moment eskalacji',
        'jasność ról i uprawnień decyzyjnych',
        'wspólny obraz sytuacji',
        'decyzje i ustalanie priorytetów',
        'rytm pracy zespołu',
        'przepływ informacji',
        'koordynacja pomiędzy funkcjami',
        'komunikacja i wsparcie osób dotkniętych zdarzeniem'
      ]
    },
    formats: {
      eyebrow: 'Formaty ćwiczeń',
      title: 'Zakres dopasowany do celu.',
      intro: 'Executive Tabletop jest głównym formatem dla kadry zarządzającej i CMT. Specjalistyczne symulacje pozwalają skupić się na komunikacji lub wsparciu ludzi, a program ćwiczeń łączy kilka etapów rozwoju.',
      items: [
        {
          id: 'executive-tabletop',
          title: 'Executive Tabletop Exercise',
          text: 'Strategiczna, facylitowana sesja dla kadry zarządzającej, CMT albo obu grup. Koncentruje się na obrazie sytuacji, eskalacji, decyzjach, koordynacji i priorytetach organizacji.',
          link: '/cwiczenia-kryzysowe/executive-tabletop/',
          linkLabel: 'Poznaj Executive Tabletop'
        },
        {
          id: 'communication-simulation',
          title: 'Symulacja komunikacji kryzysowej',
          text: 'Ćwiczenie ścieżek zatwierdzania, potrzeb interesariuszy, pierwszych komunikatów oraz współpracy pomiędzy CMT i zespołem komunikacji.'
        },
        {
          id: 'affected-people-exercise',
          title: 'Ćwiczenie wsparcia osób dotkniętych zdarzeniem',
          text: 'Sprawdzenie aktywacji, informacji o osobach, kontaktu z bliskimi, organizacji wsparcia oraz współpracy z partnerami i władzami.'
        },
        {
          id: 'exercise-programme',
          title: 'Program ćwiczeń',
          text: 'Sekwencja powiązanych ćwiczeń albo szerszy zakres łączący kilka zespołów i funkcji w kolejnych etapach rozwoju gotowości.'
        }
      ]
    },
    methodology: {
      eyebrow: 'Metodyka',
      title: 'Od ustalenia ram do działań doskonalących.',
      intro: 'Cztery fazy porządkują projekt, wskazują odpowiedzialności i pozwalają zachować związek pomiędzy celami, obserwacją oraz późniejszymi działaniami.'
    },
    inclusion: {
      title: 'Zakres współpracy i rezultaty',
      engagementTitle: 'Współpraca obejmuje',
      engagement: [
        'ustalenie zakresu i celów',
        'projekt ćwiczenia i scenariusza',
        'przygotowanie informacji dla uczestników',
        'facylitację i kontrolę przebiegu',
        'obserwację',
        'hot debrief',
        'podsumowanie dla kierownictwa'
      ],
      clientTitle: 'Organizacja otrzymuje',
      client: [
        'uzgodniony Exercise Brief i cele',
        'After Action Review',
        'priorytetowy rejestr działań doskonalących',
        'inne dokumenty uzgodnione w zakresie projektu'
      ],
      note: 'Główny dokument scenariusza, szczegółowa sekwencja informacji wejściowych, instrukcje kontroli, skrypty symulacji i surowe formularze obserwacyjne pozostają materiałami projektowymi, o ile strony nie uzgodnią inaczej.'
    },
    standard: {
      title: 'Metodyczne punkty odniesienia',
      text: 'Projekt może korzystać z odpowiednich elementów ISO 22398 dotyczących planowania, prowadzenia i doskonalenia ćwiczeń oraz ISO 22361 w zakresie strategicznego zarządzania kryzysowego. Standardy wspierają metodę, a nie stanowią osobnego produktu ani certyfikacji.'
    },
    insights: {
      eyebrow: 'Powiązane publikacje',
      title: 'Materiały o projektowaniu i obserwacji ćwiczeń.',
      copy: 'Wybrane Insights rozwijają pytania o cele, decyzje, scenariusz i sposób pracy zespołu podczas ćwiczenia.'
    },
    contact: {
      title: 'Omówmy planowane ćwiczenie.',
      text: 'Na początek wystarczy kontekst, grupa uczestników i najważniejszy obszar, który organizacja chce sprawdzić.',
      cta: 'Omów planowane ćwiczenie'
    }
  },
  executive: {
    meta: {
      title: 'Executive Tabletop Exercise dla zarządu i CMT | ClearStance',
      description: 'Facylitowane ćwiczenie tabletop dla kadry zarządzającej i CMT, obejmujące projekt, obserwację, After Action Review i działania doskonalące.'
    },
    hero: {
      eyebrow: 'Ćwiczenia kryzysowe',
      title: 'Executive Tabletop Exercise',
      lead: 'Facylitowane ćwiczenie dla kadry zarządzającej i zespołu zarządzania kryzysowego. Uczestnicy pracują na rozwijającej się sytuacji, porządkują informacje, ustalają priorytety i podejmują decyzje w ramach rzeczywistych ról organizacji.'
    },
    snapshot: {
      title: 'Ćwiczenie w skrócie',
      items: [
        { term: 'Format', description: 'Facylitowane tabletop exercise' },
        { term: 'Uczestnicy', description: 'Kadra zarządzająca, CMT lub obie grupy' },
        { term: 'Koncentracja', description: 'Decyzje, koordynacja i informacja' },
        { term: 'Rezultaty', description: 'AAR i priorytetowe działania' },
        { term: 'Cykl gotowości', description: 'Exercise → Improve' }
      ]
    },
    useful: {
      eyebrow: 'Zastosowanie',
      title: 'Kiedy warto wybrać ten format.',
      intro: 'Executive Tabletop sprawdza strategiczną warstwę reakcji bez organizowania pełnego ćwiczenia operacyjnego.',
      items: [
        { title: 'Coroczny test gotowości', text: 'Organizacja lub grupa wymaga okresowego sprawdzenia CMT i kadry zarządzającej.' },
        { title: 'Zmiana modelu działania', text: 'Nowa struktura, plan, skład zespołu lub zakres odpowiedzialności wymaga wspólnego przećwiczenia.' },
        { title: 'Nowy albo rzadko ćwiczący CMT', text: 'Zespół potrzebuje bezpiecznych warunków do pracy na rolach, informacjach i decyzjach.' },
        { title: 'Sprawdzenie priorytetów', text: 'Przegląd gotowości lub wcześniejsze zdarzenie wskazały obszary, które należy sprawdzić w działaniu.' }
      ]
    },
    participation: {
      title: 'Cele wyznaczają skład i zakres ćwiczenia.',
      text: 'Uczestnicy są dobierani do decyzji i punktów współpracy objętych celami. Format może być przeznaczony dla kadry zarządzającej, istniejącego CMT albo obu poziomów pracujących razem.',
      coreTitle: 'Role podstawowe',
      core: ['sponsor ćwiczenia', 'lider CMT', 'osoby posiadające właściwe uprawnienia decyzyjne', 'koordynator lub sekretarz CMT'],
      optionalTitle: 'Według celów ćwiczenia',
      optional: ['operacje', 'komunikacja', 'HR i wsparcie ludzi', 'obsługa prawna', 'ciągłość działania', 'bezpieczeństwo', 'obsługa klientów lub gości']
    },
    observationAreas: {
      eyebrow: 'Obszary obserwacji',
      title: 'Co ćwiczenie może pokazać.',
      intro: 'Zakres jest uzgadniany przed rozpoczęciem pracy nad scenariuszem i ograniczany do elementów, które można wiarygodnie zaobserwować.',
      items: [
        'moment i jakość eskalacji',
        'aktywacja oraz jasność ról',
        'wspólny obraz sytuacji',
        'uprawnienia i sposób podejmowania decyzji',
        'priorytety ochrony ludzi i działania',
        'przepływ informacji i rytm pracy',
        'koordynacja pomiędzy funkcjami',
        'zatwierdzanie komunikacji i wsparcie osób dotkniętych zdarzeniem'
      ]
    },
    design: {
      eyebrow: 'Projekt ćwiczenia',
      title: 'Scenariusz zbudowany wokół celów.',
      paragraphs: [
        'Scenariusz uwzględnia kontekst operacyjny, zależności, ważne role, potrzeby interesariuszy i wiarygodne konsekwencje zdarzenia.',
        'Najważniejsze są momenty, w których zespół musi ocenić zmianę sytuacji, ustalić priorytet, wykorzystać uprawnienia albo skoordynować decyzję. Kolejne informacje tworzą warunki do obserwacji tych elementów.'
      ],
      sequence: ['Cel', 'Moment decyzyjny', 'Informacja wejściowa', 'Obserwacja']
    },
    methodology: {
      eyebrow: 'Przebieg projektu',
      title: 'Od ustalenia ram do działań doskonalących.',
      intro: 'Cztery fazy utrzymują związek pomiędzy celami ćwiczenia, jego projektem, obserwacją i rezultatami przekazywanymi organizacji.'
    },
    session: {
      title: 'Jak przebiega sesja.',
      text: 'Informacje są przekazywane w kontrolowanej sekwencji. Facylitator utrzymuje warunki pracy i tempo, a uczestnicy określają kierunek działania. Decyzje, pytania i istotne zmiany sytuacji są dokumentowane na potrzeby późniejszej analizy.',
      items: ['briefing uczestników', 'wprowadzenie sytuacji początkowej', 'kolejne informacje i momenty decyzyjne', 'facylitowana praca zespołu', 'dokumentowanie decyzji i działań', 'hot debrief']
    },
    observation: {
      eyebrow: 'Metoda obserwacji',
      title: 'Obserwacja oparta na uzgodnionych celach.',
      text: 'Obserwatorzy zapisują zdarzenia i ich znaczenie dla działania zespołu. Przykład pokazuje strukturę metody bez ujawniania pełnego wewnętrznego formularza.',
      labels: ['Co się wydarzyło', 'Kiedy', 'Na podstawie jakiej informacji', 'Zaangażowane role', 'Wpływ na decyzje lub koordynację'],
      example: ['Eskalacja została podniesiona po potwierdzeniu wpływu na ludzi.', 'Po drugiej aktualizacji sytuacji.', 'Raport operacyjny i niepotwierdzony sygnał od partnera.', 'Lider CMT, operacje, komunikacja.', 'Zespół uzgodnił priorytet, ale nie przypisał właściciela kolejnej aktualizacji.']
    },
    outputs: {
      eyebrow: 'Zakres i rezultaty',
      title: 'Co obejmuje współpraca i co otrzymuje organizacja.',
      intro: 'Realizacja sesji, praca projektowa i dokumenty końcowe pełnią różne funkcje. Zakres jest uzgadniany przed rozpoczęciem projektu.',
      engagementTitle: 'Współpraca obejmuje',
      engagement: ['ustalenie zakresu i celów', 'projekt ćwiczenia', 'przygotowanie informacji dla uczestników', 'facylitację', 'obserwację', 'hot debrief', 'podsumowanie dla kierownictwa'],
      clientTitle: 'Organizacja otrzymuje',
      client: ['uzgodniony Exercise Brief i cele', 'After Action Review', 'priorytetowy rejestr działań doskonalących', 'inne dokumenty uzgodnione w zakresie projektu'],
      artefactsNote: 'Główny dokument scenariusza, szczegółowa sekwencja informacji wejściowych, instrukcje dla kontroli, skrypty symulacji i surowe formularze obserwacyjne są materiałami projektowymi. Ich przekazanie wymaga odrębnego uzgodnienia.'
    },
    aar: {
      title: 'After Action Review',
      text: 'Hot debrief rejestruje pierwsze perspektywy uczestników. Następnie materiał obserwacyjny jest analizowany w odniesieniu do celów i rozwijany w After Action Review.',
      items: ['obserwacje powiązane z celami', 'elementy wspierające skuteczne działanie', 'luki i punkty utrudniające pracę', 'czynniki wpływające, jeśli pozwala na to materiał', 'znaczenie ustaleń', 'rekomendacje i priorytety', 'proponowana funkcja właścicielska', 'działanie doskonalące'],
      note: 'Właścicieli i terminy potwierdza organizacja. Opcjonalny warsztat działań może pomóc w ich uzgodnieniu i zaplanowaniu ponownego sprawdzenia.'
    },
    preparation: {
      title: 'Zakres i przygotowanie.',
      clientTitle: 'Po stronie organizacji',
      client: ['wskazanie sponsora i koordynatora', 'uzgodnienie celów', 'udostępnienie wybranych planów i narzędzi', 'potwierdzenie uczestników i uprawnień', 'uzgodnienie poufności i ograniczeń'],
      scopeTitle: 'Granice podstawowego formatu',
      scope: 'Podstawowy produkt obejmuje strategiczną, facylitowaną sesję decyzyjną. Ćwiczenia z fizycznym rozwinięciem zasobów, testami systemów technicznych, udziałem służb albo pełną symulacją medialną wymagają osobnych celów, zasobów i planowania.'
    },
    related: {
      eyebrow: 'Powiązane zakresy',
      title: 'Praca przed ćwiczeniem i po nim.',
      links: [
        { label: 'Crisis Readiness Review', route: 'services', hash: 'przeglad-gotowosci' },
        { label: 'Doradztwo', route: 'services' },
        { label: 'Pozostałe formaty ćwiczeń', route: 'exercises' }
      ]
    },
    insights: {
      eyebrow: 'Powiązane publikacje',
      title: 'Materiały o wartości i projektowaniu ćwiczeń.',
      copy: 'Wybrane publikacje rozwijają pytania o cele, scenariusz, decyzje i obserwację.'
    },
    contact: {
      title: 'Omówmy planowane ćwiczenie.',
      text: 'Na początek wystarczy kontekst, grupa uczestników i najważniejszy cel. Szczegółowy zakres może zostać ustalony podczas pierwszej rozmowy.',
      cta: 'Omów planowane ćwiczenie'
    }
  }
};
