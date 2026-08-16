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
    output: 'Uzgodnione cele, zakres i założenia ćwiczenia.'
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
      eyebrow: 'Doradztwo w gotowości kryzysowej',
      title: 'Clarity when',
      titleAccent: 'it matters most.',
      copy: 'ClearStance pomaga organizacjom projektować i sprawdzać sposób zarządzania poważnymi zdarzeniami: od modelu pracy zespołu kryzysowego i komunikacji po rozwiązania wspierające osoby dotknięte zdarzeniem i ich bliskich.',
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
  crisisManagement: {
    meta: {
      title: 'Zarządzanie kryzysowe dla organizacji | ClearStance',
      description: 'Doradztwo w projektowaniu i rozwijaniu modelu zarządzania kryzysowego: CMT, aktywacja, eskalacja, informacje, decyzje i współpraca funkcji.'
    },
    hero: {
      eyebrow: 'Zarządzanie kryzysowe',
      title: 'Model działania, który porządkuje decyzje podczas kryzysu.',
      lead: 'ClearStance pomaga organizacjom projektować i rozwijać sposób pracy zespołu zarządzania kryzysowego. Zakres może obejmować mandat i skład CMT, aktywację, eskalację, wspólny obraz sytuacji, przepływ informacji, decyzje oraz współpracę z funkcjami operacyjnymi, komunikacją i zespołami wspierającymi ludzi.',
      cta: 'Omów potrzeby organizacji'
    },
    situations: {
      eyebrow: 'Typowe sytuacje',
      title: 'Sygnały, że sposób działania wymaga ponownego uzgodnienia.',
      intro: 'Potrzeba zmiany często pojawia się po reorganizacji, ważnym ćwiczeniu, rzeczywistym zdarzeniu albo wdrożeniu nowych wymagań grupowych. Wspólnym punktem jest potrzeba połączenia formalnych ustaleń z praktyką podejmowania decyzji.',
      items: [
        {
          title: 'Role są opisane, a decyzje nadal skupiają się w kilku osobach',
          text: 'Praktyczne uprawnienia, zastępstwa i odpowiedzialność za kolejne działania wymagają doprecyzowania.'
        },
        {
          title: 'Zmieniła się struktura organizacji',
          text: 'Nowe funkcje, linie raportowania lub odpowiedzialności tworzą inne punkty współpracy i eskalacji.'
        },
        {
          title: 'CMT pracuje na wielu wersjach sytuacji',
          text: 'Aktualizacje napływają z różnych źródeł, a zespół potrzebuje wspólnego sposobu oceny informacji i wskazywania decyzji.'
        },
        {
          title: 'Ćwiczenie lub zdarzenie pozostawiło rozproszone działania',
          text: 'Wnioski dotyczą kilku dokumentów, zespołów i narzędzi. Potrzebny jest jeden uporządkowany model dalszej pracy.'
        }
      ]
    },
    model: {
      eyebrow: 'Obszary pracy',
      title: 'Elementy, które tworzą spójny sposób działania.',
      intro: 'Model zarządzania kryzysowego łączy strukturę, informację i decyzje. Każdy element powinien odpowiadać rzeczywistemu sposobowi działania organizacji oraz charakterowi zdarzeń, które mogą wymagać zaangażowania kierownictwa.',
      items: [
        {
          title: 'Mandat, skład i role',
          text: 'Cel CMT, zakres jego odpowiedzialności, stały skład, role wspierające oraz relacja z zarządem i strukturami operacyjnymi.'
        },
        {
          title: 'Aktywacja i eskalacja',
          text: 'Kryteria uruchomienia zespołu, poziomy reakcji, progi eskalacji, sposób powiadamiania oraz zasady przechodzenia pomiędzy poziomami zarządzania.'
        },
        {
          title: 'Wspólny obraz sytuacji',
          text: 'Uzgodniony zestaw informacji potrzebnych do oceny wpływu zdarzenia, priorytetów organizacji, założeń i obszarów wymagających decyzji.'
        },
        {
          title: 'Rytm pracy i decyzje',
          text: 'Częstotliwość odpraw, struktura agendy, przygotowanie aktualizacji, wykorzystanie uprawnień decyzyjnych i sposób przekazywania decyzji do realizacji.'
        },
        {
          title: 'Działania i dokumentowanie',
          text: 'Rejestrowanie decyzji, przypisywanie właścicieli, terminy aktualizacji oraz utrzymanie obrazu działań prowadzonych pomiędzy odprawami.'
        },
        {
          title: 'Punkty współpracy',
          text: 'Przepływ informacji i odpowiedzialności pomiędzy CMT, operacjami, BCM, komunikacją, HR, bezpieczeństwem i funkcjami wspierającymi osoby dotknięte zdarzeniem.'
        }
      ]
    },
    interfaces: {
      eyebrow: 'Interfejsy organizacyjne',
      title: 'CMT łączy decyzje strategiczne z pracą całej organizacji.',
      intro: 'Skuteczność modelu zależy od jakości połączeń pomiędzy zespołem zarządzania kryzysowego a funkcjami, które dostarczają informacji i wykonują działania.',
      items: [
        {
          id: 'operations',
          title: 'Operacje i ciągłość działania',
          text: 'CMT potrzebuje wiarygodnego obrazu wpływu zdarzenia, dostępnych opcji, zależności oraz przewidywanych konsekwencji decyzji.'
        },
        {
          id: 'communication',
          title: 'Komunikacja kryzysowa',
          text: 'Zespół komunikacji potrzebuje aktualnego obrazu sytuacji, uzgodnionych priorytetów i sprawnej ścieżki zatwierdzania kolejnych komunikatów.'
        },
        {
          id: 'affected-people',
          title: 'Wsparcie osób dotkniętych zdarzeniem',
          text: 'Decyzje dotyczące ludzi wymagają połączenia informacji operacyjnych, potrzeb praktycznych, komunikacji z bliskimi oraz współpracy z partnerami zewnętrznymi.'
        }
      ],
      link: 'Poznaj obszar'
    },
    routes: {
      eyebrow: 'Punkt wyjścia',
      title: 'Zakres pracy wynika z pytania organizacji.',
      items: [
        {
          id: 'readiness-review',
          title: 'Crisis Readiness Review',
          text: 'Przegląd daje kierownictwu uporządkowany obraz obecnych rozwiązań i priorytetów poprawy. Może stanowić punkt wyjścia przed szerszą zmianą modelu lub ważnym ćwiczeniem.',
          link: 'Poznaj Crisis Readiness Review'
        },
        {
          id: 'cmt-model',
          title: 'Model działania CMT',
          text: 'Ukierunkowana praca nad mandatem, rolami, aktywacją, rytmem odpraw, informacją, decyzjami i narzędziami wspierającymi zespół.',
          link: 'Poznaj zakres pracy nad modelem CMT'
        },
        {
          id: 'executive-tabletop',
          title: 'Executive Tabletop Exercise',
          text: 'Facylitowana sesja pozwala sprawdzić sposób działania CMT i kierownictwa w rozwijającej się sytuacji wymagającej priorytetów, decyzji i koordynacji.',
          link: 'Poznaj Executive Tabletop Exercise'
        }
      ]
    },
    outcomes: {
      eyebrow: 'Po projekcie',
      title: 'Rezultaty, które porządkują dalsze działanie.',
      intro: 'Praca może prowadzić do uzgodnionego modelu zarządzania kryzysowego oraz narzędzi wspierających jego wykorzystanie.',
      items: [
        'mandat, skład i model działania CMT',
        'opis ról, odpowiedzialności i uprawnień decyzyjnych',
        'zasady aktywacji, eskalacji i zastępstw',
        'rytm odpraw oraz struktura wspólnego obrazu sytuacji',
        'sposób rejestrowania decyzji i śledzenia działań',
        'zasady współpracy z funkcjami operacyjnymi, komunikacją i wsparciem ludzi',
        'priorytetowy plan dalszych zmian i ćwiczeń'
      ]
    },
    insights: {
      eyebrow: 'Powiązane publikacje',
      title: 'Decyzje, informacja i punkty współpracy.',
      copy: 'Wybrane publikacje rozwijają dwa problemy szczególnie ważne dla pracy CMT: utrzymanie wspólnego obrazu sytuacji oraz działanie na styku odpowiedzialności.'
    },
    contact: {
      title: 'Omówmy potrzeby organizacji.',
      text: 'Krótki opis obecnego modelu, planowanej zmiany albo problemu ujawnionego podczas ćwiczenia wystarczy, aby przygotować pierwszą rozmowę.',
      cta: 'Omów potrzeby organizacji'
    }
  },
  crisisCommunication: {
    meta: {
      title: 'Przygotowanie do komunikacji kryzysowej | ClearStance',
      description: 'Przygotowanie organizacji do komunikacji kryzysowej: role, zatwierdzanie, potrzeby interesariuszy, pierwsze komunikaty i rytm aktualizacji.'
    },
    hero: {
      eyebrow: 'Przygotowanie do komunikacji kryzysowej',
      title: 'Gotowość komunikacyjna na pierwsze godziny zdarzenia.',
      lead: 'ClearStance pomaga organizacjom uzgodnić role, przepływ informacji, ścieżki zatwierdzania i narzędzia potrzebne pod presją czasu. Praca łączy komunikację z modelem działania CMT oraz decyzjami dotyczącymi interesariuszy, pierwszych komunikatów i kolejnych aktualizacji.',
      cta: 'Omów przygotowanie komunikacji kryzysowej'
    },
    situations: {
      eyebrow: 'Typowe sytuacje',
      title: 'Presja informacyjna ujawnia jakość wcześniejszych ustaleń.',
      intro: 'Pierwsze pytania pojawiają się zwykle przed pełnym potwierdzeniem faktów. Organizacja potrzebuje wtedy jasnego sposobu zbierania informacji, podejmowania decyzji i utrzymania spójności kolejnych komunikatów.',
      items: [
        {
          title: 'Zatwierdzenie wymaga wielu kolejnych uzgodnień',
          text: 'Osoby odpowiedzialne za treść, decyzję i publikację potrzebują wspólnej ścieżki działania oraz ustalonych zastępstw.'
        },
        {
          title: 'CMT i komunikacja pracują na różnych aktualizacjach',
          text: 'Różne źródła i tempo przekazywania informacji utrudniają utrzymanie jednego obrazu sytuacji.'
        },
        {
          title: 'Centrala i lokalne zespoły mają nakładające się role',
          text: 'Potrzebne są zasady dotyczące właściciela komunikatu, lokalnego dostosowania treści i kolejności publikacji.'
        },
        {
          title: 'Przygotowane materiały nie mają ustalonego sposobu użycia',
          text: 'Holding statements, listy interesariuszy i szablony wymagają właścicieli, kryteriów uruchomienia oraz zasad aktualizacji.'
        }
      ]
    },
    firstHours: {
      eyebrow: 'Pierwsze godziny',
      title: 'Przygotowany proces łączy informację, decyzję i kolejną aktualizację.',
      items: [
        {
          title: 'Aktywacja i role',
          text: 'Kryteria uruchomienia zespołu komunikacji, relacja z CMT, dostępność kluczowych osób i zasady zastępstw.'
        },
        {
          title: 'Obraz sytuacji',
          text: 'Sposób pozyskiwania potwierdzonych informacji, oznaczania założeń i przekazywania zmian istotnych dla interesariuszy.'
        },
        {
          title: 'Decyzja i zatwierdzanie',
          text: 'Uprawnienia do zatwierdzania pierwszego komunikatu, kolejnych aktualizacji, kanałów i informacji wymagających dodatkowej weryfikacji.'
        },
        {
          title: 'Potrzeby interesariuszy',
          text: 'Priorytetowe grupy, ich pytania, dostępne kanały oraz kolejność przekazywania informacji wewnątrz i na zewnątrz organizacji.'
        },
        {
          title: 'Pierwsze komunikaty',
          text: 'Holding statements, potwierdzenie zdarzenia, komunikaty dla pracowników i materiały wspierające spójne odpowiedzi.'
        },
        {
          title: 'Monitoring i rytm aktualizacji',
          text: 'Obserwacja zmian, pytań i reakcji interesariuszy oraz ustalony sposób przygotowania kolejnej aktualizacji dla CMT i zespołu komunikacji.'
        }
      ]
    },
    routes: {
      eyebrow: 'Sposób pracy',
      title: 'Przygotowanie można rozwinąć doradczo i sprawdzić w ćwiczeniu.',
      items: [
        {
          id: 'advisory',
          title: 'Ukierunkowane doradztwo',
          text: 'Przegląd lub projekt ról, procesu zatwierdzania, przepływu informacji, potrzeb interesariuszy i narzędzi pierwszej godziny.',
          link: 'Poznaj Doradztwo'
        },
        {
          id: 'communication-simulation',
          title: 'Symulacja komunikacji kryzysowej',
          text: 'Ćwiczenie koncentruje się na zatwierdzaniu, potrzebach informacyjnych, pierwszych komunikatach i współpracy z CMT.',
          link: 'Poznaj symulację komunikacji kryzysowej'
        },
        {
          id: 'executive-tabletop',
          title: 'Executive Tabletop Exercise',
          text: 'Format jest właściwy, gdy komunikacja stanowi jeden z kluczowych interfejsów decyzji podejmowanych przez kierownictwo lub CMT.',
          link: 'Poznaj Executive Tabletop Exercise'
        }
      ]
    },
    outcomes: {
      eyebrow: 'Po projekcie',
      title: 'Ustalenia i narzędzia gotowe do użycia.',
      items: [
        'role komunikacyjne i zasady aktywacji',
        'ścieżki zatwierdzania oraz zastępstwa',
        'mapa potrzeb informacyjnych interesariuszy',
        'zasady współpracy pomiędzy CMT i komunikacją',
        'holding statements, szablony i materiały pierwszej godziny',
        'sposób monitorowania oraz przygotowania kolejnych aktualizacji',
        'priorytety dalszego przygotowania i ćwiczeń'
      ]
    },
    insights: {
      eyebrow: 'Powiązane publikacje',
      title: 'Pierwsza godzina i wspólny obraz sytuacji.',
      copy: 'Publikacje pokazują, jak presja czasu, niepełne informacje i uprawnienia decyzyjne wpływają na jakość komunikacji.'
    },
    contact: {
      eyebrow: 'Kontakt',
      title: 'Omówmy przygotowanie komunikacji kryzysowej.',
      text: 'Wystarczy opisać obecny proces, planowaną zmianę albo sytuację, w której role i zatwierdzanie wymagają uporządkowania.',
      cta: 'Omów przygotowanie komunikacji kryzysowej'
    }
  },
  affectedPeople: {
    meta: {
      title: 'Wsparcie osób dotkniętych zdarzeniem | ClearStance',
      description: 'Projektowanie organizacyjnych rozwiązań wspierających osoby dotknięte zdarzeniem, ich bliskich i zespoły odpowiedzialne za reakcję.'
    },
    hero: {
      eyebrow: 'Wsparcie osób dotkniętych zdarzeniem i ich bliskich',
      title: 'Organizacyjne przygotowanie do wsparcia ludzi po poważnym zdarzeniu.',
      lead: 'ClearStance projektuje struktury, role, przepływ informacji i praktyczne rozwiązania potrzebne do wsparcia osób bezpośrednio dotkniętych zdarzeniem, ich bliskich oraz personelu zaangażowanego w reakcję. Model jest dopasowany do odpowiedzialności organizacji, jej lokalizacji, partnerów i charakteru możliwych zdarzeń.',
      cta: 'Omów przygotowanie organizacji'
    },
    situations: {
      eyebrow: 'Typowe sytuacje',
      title: 'Wsparcie ludzi angażuje wiele funkcji jednocześnie.',
      intro: 'Poważne zdarzenie może uruchomić potrzebę rejestracji informacji, kontaktu z bliskimi, organizacji miejsc wsparcia, pomocy praktycznej i współpracy z partnerami zewnętrznymi. Jasny model pozwala połączyć te działania z decyzjami CMT.',
      items: [
        {
          title: 'Zdarzenie może dotknąć większej liczby osób',
          text: 'Działalność organizacji obejmuje transport, obiekt, wydarzenie, podróż, zakład przemysłowy albo usługę, w której potrzebna może być skoordynowana reakcja wobec ludzi.'
        },
        {
          title: 'Odpowiedzialności są rozproszone pomiędzy kilka funkcji',
          text: 'Operacje, HR, komunikacja, bezpieczeństwo, obsługa klienta i partnerzy posiadają części potrzebnych informacji i zasobów.'
        },
        {
          title: 'Informacje o osobach wymagają wspólnego sposobu działania',
          text: 'Rejestracja, aktualizacja, dostęp i przekazywanie informacji potrzebują uzgodnionych ról, źródeł oraz zasad współpracy.'
        },
        {
          title: 'Zmieniła się działalność lub sieć partnerów',
          text: 'Nowa lokalizacja, trasa, obiekt, dostawca lub model operacyjny wpływa na sposób organizacji wsparcia i kontaktu z bliskimi.'
        }
      ]
    },
    supportFlow: {
      eyebrow: 'Model działania',
      title: 'Gotowy model prowadzi od pierwszej informacji do skoordynowanej pomocy.',
      items: [
        {
          title: 'Aktywacja',
          text: 'Kryteria uruchomienia zespołu, wskazanie osoby odpowiedzialnej, powiązanie z CMT oraz powiadomienie funkcji i partnerów potrzebnych w pierwszej fazie.'
        },
        {
          title: 'Informacja o osobach',
          text: 'Zbieranie, weryfikowanie i aktualizowanie informacji o osobach dotkniętych zdarzeniem oraz utrzymanie jednego uzgodnionego obrazu dostępnego dla odpowiedzialnych ról.'
        },
        {
          title: 'Kontakt z bliskimi',
          text: 'Organizacja kanałów kontaktu, przyjmowanie zapytań, przekazywanie potwierdzonych informacji i utrzymanie rytmu kolejnych aktualizacji.'
        },
        {
          title: 'Wsparcie praktyczne',
          text: 'Przygotowanie punktów przyjęcia, infolinii, informacji na miejscu, transportu, zakwaterowania lub innych rozwiązań właściwych dla charakteru działalności i zdarzenia.'
        },
        {
          title: 'Koordynacja',
          text: 'Współpraca z władzami, służbami, operatorami miejsc, dostawcami, partnerami podróży i innymi podmiotami uczestniczącymi w reakcji.'
        }
      ]
    },
    responsibilities: {
      eyebrow: 'Punkty współpracy',
      title: 'Wsparcie ludzi wymaga jasno połączonych ról.',
      items: [
        {
          id: 'cmt',
          title: 'CMT i kierownictwo',
          text: 'Ustalają priorytety, uruchamiają zasoby, podejmują decyzje przekraczające uprawnienia zespołów operacyjnych i utrzymują obraz całego zdarzenia.'
        },
        {
          id: 'operations',
          title: 'Operacje i zespoły obsługi',
          text: 'Dostarczają informacji o zdarzeniu, osobach, miejscach i praktycznych możliwościach udzielenia wsparcia.'
        },
        {
          id: 'communication',
          title: 'Komunikacja i HR',
          text: 'Koordynują informacje dla pracowników, osób dotkniętych zdarzeniem, ich bliskich oraz szerszych grup interesariuszy.'
        },
        {
          id: 'partners',
          title: 'Partnerzy zewnętrzni',
          text: 'Wnoszą zasoby, informacje i możliwości działania wynikające z lokalizacji, rodzaju zdarzenia i odpowiedzialności poszczególnych podmiotów.'
        }
      ],
      crisisManagementLink: 'Zarządzanie kryzysowe',
      crisisCommunicationLink: 'Przygotowanie do komunikacji kryzysowej'
    },
    routes: {
      eyebrow: 'Przygotowanie i sprawdzenie',
      title: 'Model można zaprojektować, rozwinąć i przećwiczyć.',
      items: [
        {
          id: 'advisory',
          title: 'Ukierunkowane doradztwo',
          text: 'Praca może objąć struktury, role, aktywację, informację o osobach, kontakt z bliskimi, punkty wsparcia, współpracę z partnerami oraz potrzebne narzędzia.',
          link: 'Poznaj Doradztwo'
        },
        {
          id: 'affected-people-exercise',
          title: 'Ćwiczenie wsparcia osób dotkniętych zdarzeniem',
          text: 'Ćwiczenie sprawdza aktywację, przepływ informacji, kontakt, praktyczną organizację wsparcia i współpracę pomiędzy odpowiedzialnymi funkcjami.',
          link: 'Poznaj format ćwiczenia'
        }
      ]
    },
    outcomes: {
      eyebrow: 'Po projekcie',
      title: 'Rozwiązania, które łączą odpowiedzialność z praktycznym działaniem.',
      items: [
        'model organizacyjny i zasady aktywacji',
        'role oraz punkty współpracy z CMT i komunikacją',
        'sposób rejestrowania i aktualizowania informacji o osobach',
        'zasady kontaktu z bliskimi i obsługi zapytań',
        'koncepcja punktów wsparcia, infolinii lub innych właściwych rozwiązań',
        'role cards, checklisty i narzędzia wspierające zespoły',
        'mapa współpracy z partnerami zewnętrznymi',
        'priorytety ćwiczeń i dalszego przygotowania'
      ]
    },
    insights: {
      eyebrow: 'Powiązane publikacje',
      title: 'Informacja i odpowiedzialność na styku zespołów.',
      copy: 'Istniejące materiały pokazują problemy związane z przekazywaniem odpowiedzialności oraz utrzymaniem spójnej informacji pod presją czasu.'
    },
    contact: {
      eyebrow: 'Kontakt',
      title: 'Omówmy przygotowanie organizacji.',
      text: 'Pierwsza rozmowa może dotyczyć rodzaju działalności, możliwych zdarzeń, obecnych odpowiedzialności oraz elementu modelu, który wymaga uporządkowania lub sprawdzenia.',
      cta: 'Omów przygotowanie organizacji'
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
        { title: 'Model rozwijał się etapami', text: 'Role, dokumenty i narzędzia powstawały w różnym czasie. Teraz wymagają uporządkowania w jeden sposób działania.' },
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
        'praktyczna użyteczność dokumentów wymaga sprawdzenia',
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
      intro: 'Sposób pracy odpowiada konkretnemu problemowi i opiera się na dokumentach, narzędziach oraz doświadczeniu osób pełniących kluczowe role.',
      items: [
        { title: 'Ustalenie pytania i zakresu', text: 'Określamy decyzję, problem lub model, który wymaga oceny albo zaprojektowania.' },
        { title: 'Zebranie materiału', text: 'Analizujemy uzgodnione dokumenty, narzędzia i perspektywy osób pełniących kluczowe role.' },
        { title: 'Praca nad modelem', text: 'Wspólnie sprawdzamy odpowiedzialności, informacje, decyzje, ograniczenia i punkty współpracy.' },
        { title: 'Uzgodnienie rezultatów', text: 'Porządkujemy wnioski, oczekiwane zmiany i kolejne kroki w formie odpowiedniej dla kierownictwa i osób odpowiedzialnych za ich realizację.' }
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
      ]
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
        'Exercise Brief: uzgodnione cele, zakres i założenia ćwiczenia',
        'After Action Review',
        'priorytetowy rejestr działań doskonalących'
      ]
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
        { term: 'Format', description: 'Facylitowane ćwiczenie tabletop' },
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
      text: 'Obserwatorzy zapisują zdarzenia i ich znaczenie dla działania zespołu. Przykład pokazuje sposób łączenia obserwacji z celami ćwiczenia.',
      labels: ['Co się wydarzyło', 'Kiedy', 'Na podstawie jakiej informacji', 'Zaangażowane role', 'Wpływ na decyzje lub koordynację'],
      example: ['Eskalacja została podniesiona po potwierdzeniu wpływu na ludzi.', 'Po drugiej aktualizacji sytuacji.', 'Raport operacyjny i niepotwierdzony sygnał od partnera.', 'Lider CMT, operacje, komunikacja.', 'Zespół uzgodnił priorytet, ale nie przypisał właściciela kolejnej aktualizacji.']
    },
    outputs: {
      eyebrow: 'Zakres i rezultaty',
      title: 'Co obejmuje współpraca i co otrzymuje organizacja.',
      engagementTitle: 'Współpraca obejmuje',
      engagement: ['ustalenie zakresu i celów', 'projekt ćwiczenia', 'przygotowanie informacji dla uczestników', 'facylitację', 'obserwację', 'hot debrief', 'podsumowanie dla kierownictwa'],
      clientTitle: 'Organizacja otrzymuje',
      client: ['Exercise Brief: uzgodnione cele, zakres i założenia ćwiczenia', 'After Action Review', 'priorytetowy rejestr działań doskonalących', 'inne dokumenty uzgodnione w zakresie projektu']
    },
    aar: {
      title: 'After Action Review',
      text: 'Hot debrief zbiera pierwsze perspektywy uczestników. Materiał obserwacyjny jest następnie analizowany w odniesieniu do celów i rozwijany w After Action Review.',
      items: ['obserwacje powiązane z celami', 'elementy wspierające skuteczne działanie', 'luki i punkty utrudniające pracę', 'czynniki wpływające, jeśli wynika to z materiału', 'znaczenie ustaleń', 'rekomendacje i priorytety', 'proponowana funkcja odpowiedzialna', 'działanie doskonalące']
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
