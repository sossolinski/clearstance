import type { Locale } from './routes';
import { protectPolishVisibleCopy } from './typography.js';

const sharedHome = {
  hero: {
    eyebrow: 'Crisis readiness · facilitation · exercises',
    title: 'Clarity when',
    titleAccent: 'it matters most.'
  },
  readiness: {
    quote: [
      'Know where you are.',
      'Understand what is changing.',
      'Decide where to go.'
    ]
  }
};

export const translations = {
  pl: {
    locale: 'pl',
    site: {
      name: 'ClearStance',
      skip: 'Przejdź do treści',
      mainNavigation: 'Główna nawigacja',
      languageNavigation: 'Wybór języka',
      homeLabel: 'ClearStance - strona główna',
      menuOpen: 'Otwórz menu',
      menuClose: 'Zamknij menu',
      currentLanguage: 'Polski',
      otherLanguage: 'English',
      email: 'contact@clearstance.pl',
      location: 'Warszawa · Polska',
      footerTagline: 'Navigation under uncertainty',
      copyright: 'ClearStance. Wszelkie prawa zastrzeżone.',
      privacy: 'Prywatność i cookies',
      nav: {
        approach: 'Podejście',
        services: 'Oferta',
        insights: 'Insights',
        practice: 'Jak pracujemy',
        experience: 'O ClearStance',
        contact: 'Kontakt'
      }
    },
    home: {
      meta: {
        title: 'ClearStance - Clarity when it matters most',
        description:
          'ClearStance wspiera organizacje w przygotowaniu sposobu podejmowania decyzji, komunikowania się i wspierania ludzi podczas poważnych zdarzeń.'
      },
      hero: {
        ...sharedHome.hero,
        copy:
          'Pomagamy organizacjom przygotować struktury, zespoły i sposób działania w sytuacjach wymagających szybkich decyzji przy niepełnej informacji.',
        cta: 'Poznaj nasze podejście',
        featured: 'Wyróżnione',
        imageAlt: 'Spokojne nadmorskie ujęcie latarni morskiej o zmierzchu.'
      },
      approach: {
        eyebrow: 'Nasze podejście',
        title: 'Gotowość kryzysowa w praktyce.',
        lead:
          'Dobra gotowość opiera się na wspólnym obrazie sytuacji, jasnej odpowiedzialności i zasadach, które zespół potrafi zastosować przy niepełnej informacji.',
        body:
          'Dlatego struktury, procedury i scenariusze oceniamy w odniesieniu do rzeczywistego modelu operacyjnego, jego zależności oraz decyzji, które trzeba podjąć.',
        pillars: [
          {
            title: 'Zrozumienie sytuacji',
            text: 'Ryzyka, zależności, priorytety i ograniczenia operacyjne.'
          },
          {
            title: 'Jasne role i odpowiedzialność',
            text: 'Informacja, eskalacja i sposób podejmowania decyzji.'
          },
          {
            title: 'Sprawdzenie w praktyce',
            text: 'Scenariusze, ćwiczenia, presja czasu i współpraca.'
          }
        ]
      },
      services: {
        eyebrow: 'Oferta',
        title: 'Wsparcie w budowaniu gotowości kryzysowej.',
        intro:
          'Pomagamy organizacjom przygotować sposób podejmowania decyzji, komunikacji i wsparcia ludzi podczas poważnych zdarzeń.',
        items: [
          {
            title: 'Zarządzanie kryzysowe',
            text: 'Struktury, role, plany i mechanizmy aktywacji, które pomagają organizacji sprawnie przejść od pierwszego sygnału do skoordynowanego działania.'
          },
          {
            title: 'Ćwiczenia i facylitacja',
            text: 'Scenariusze, ćwiczenia i facylitowana praca zespołów, które pozwalają sprawdzić decyzje, współpracę i komunikację w realistycznych warunkach.'
          },
          {
            title: 'Komunikacja kryzysowa',
            text: 'Projektowanie i testowanie zespołów, procesów oraz narzędzi potrzebnych do szybkiej, spójnej i odpowiedzialnej komunikacji podczas zdarzenia.'
          },
          {
            title: 'Wsparcie osób dotkniętych zdarzeniem i ich bliskich',
            text: 'Organizacja zespołów, procedur i rozwiązań wspierających osoby dotknięte zdarzeniem, ich bliskich oraz personel zaangażowany w reakcję.'
          }
        ],
        linkLabel: 'Pełna oferta',
        link: 'Zobacz pełną ofertę'
      },
      readiness: {
        eyebrow: 'Cykl gotowości',
        title: 'Od orientacji do działania.',
        quote: sharedHome.readiness.quote,
        items: [
          {
            title: 'Rozpoznanie',
            text: 'Ocena ryzyk, zależności i obecnego sposobu reagowania wyznacza punkt wyjścia.'
          },
          {
            title: 'Przygotowanie',
            text: 'Role, uprawnienia, progi eskalacji i przepływ informacji są uzgodnione i zrozumiałe.'
          },
          {
            title: 'Ćwiczenie',
            text: 'Realistyczny scenariusz pozwala sprawdzić założenia, decyzje i współpracę zespołu.'
          },
          {
            title: 'Reagowanie',
            text: 'Podczas zdarzenia zespół potrafi eskalować, aktualizować obraz sytuacji i koordynować decyzje.'
          },
          {
            title: 'Doskonalenie',
            text: 'Wnioski z ćwiczeń i zdarzeń mają właścicieli, priorytety i termin ponownego sprawdzenia.'
          }
        ]
      },
      experience: {
        eyebrow: 'Doświadczenie',
        title: 'Doświadczenie operacyjne i perspektywa strategiczna.',
        paragraphs: [
          'ClearStance łączy doświadczenie z żeglugi morskiej i lotnictwa z pracą nad bezpieczeństwem operacyjnym, strategią i zarządzaniem kryzysowym.'
        ],
        closing:
          'Pełny kontekst tej praktyki oraz droga od odpowiedzialności operacyjnej do pracy doradczej są opisane na stronie O ClearStance.',
        tracks: [
          {
            title: 'Żegluga morska',
            text: 'oficer wachtowy · operacje · bezpieczeństwo'
          },
          {
            title: 'Lotnictwo',
            text: 'analityka · projekty · strategia · zarządzanie kryzysowe'
          }
        ],
        mediaAlt: {
          maritime:
            'Dłonie nawigatora pracującego z mapą morską na mostku statku.',
          aviation:
            'Fragment płyty lotniska z infrastrukturą obsługi samolotu po deszczu.'
        },
        link: 'Poznaj ClearStance'
      },
      practice: {
        eyebrow: 'Jak pracujemy',
        title: 'Sposób pracy.',
        paragraphs: [
          'Punktem wyjścia jest rzeczywisty model działania organizacji: role, zależności, przepływ informacji i sposób podejmowania decyzji.',
          'Zakres i sposób pracy dobieramy do konkretnego problemu. Wspólnie z zespołem dochodzimy do ustaleń, które można wykorzystać w strukturach, procedurach, ćwiczeniu lub dalszym doskonaleniu.'
        ],
        items: [
          {
            title: 'Kontekst operacyjny',
            text: 'Praca odnosi się do rzeczywistych ról, zależności i ograniczeń organizacji.'
          },
          {
            title: 'Wspólna praca',
            text: 'Facylitacja angażuje osoby odpowiedzialne za decyzje i wykonanie działań.'
          },
          {
            title: 'Proporcjonalny zakres',
            text: 'Metoda i poziom szczegółowości odpowiadają problemowi oraz dojrzałości organizacji.'
          },
          {
            title: 'Ustalenia do wykorzystania',
            text: 'Rezultat wskazuje konkretne decyzje, zmiany lub działania doskonalące.'
          }
        ]
      },
      statement: {
        first: 'Gotowość porządkuje działanie.',
        second:
          'Jasne role, decyzje i zasady eskalacji pomagają działać sprawnie pod presją.',
        imageAlt: 'Latarnia morska oświetlająca drogę w ciemności'
      },
      insights: {
        eyebrow: 'INSIGHTS',
        title: 'ClearStance Insights',
        copy:
          'Publikacje o gotowości organizacyjnej, zarządzaniu kryzysowym, ćwiczeniach i decyzjach podejmowanych pod presją.',
        all: 'Zobacz wszystkie publikacje'
      },
      contact: {
        eyebrow: 'Kontakt',
        title: 'Porozmawiajmy o gotowości Twojej organizacji.',
        text: 'Możemy zacząć od krótkiej rozmowy o obecnym modelu reagowania, planowanym ćwiczeniu albo konkretnym problemie wymagającym uporządkowania.',
        cta: 'Napisz do nas'
      }
    },
    servicesPage: {
      metaTitle: 'Oferta - ClearStance',
      metaDescription:
        'Zarządzanie kryzysowe, ćwiczenia, komunikacja kryzysowa oraz organizacja wsparcia osób dotkniętych zdarzeniem i ich bliskich.',
      eyebrow: 'Oferta',
      title: 'Gotowość, która działa w rzeczywistym środowisku.',
      lead:
        'Zakres wsparcia dopasowujemy do modelu operacyjnego, ekspozycji na ryzyko i aktualnego poziomu przygotowania organizacji.',
      introTitle: 'Cztery obszary wsparcia',
      intro:
        'ClearStance wspiera organizacje w przygotowaniu sposobu reagowania na poważne zdarzenia: od uruchomienia zespołu i podejmowania decyzji, przez komunikację, po organizację wsparcia osób dotkniętych zdarzeniem i ich bliskich.',
      services: [
        {
          title: 'Zarządzanie kryzysowe',
          summary:
            'Przegląd i projektowanie systemu zarządzania kryzysowego, od zasad aktywacji po organizację pracy zespołu zarządzającego.',
          points: [
            'przegląd obecnego modelu i dokumentacji',
            'struktura zespołu kryzysowego',
            'role, odpowiedzialności i uprawnienia',
            'aktywacja, alarmowanie i poziomy eskalacji',
            'przepływ informacji i dokumentowanie decyzji',
            'plany, procedury, checklisty i role cards',
            'przygotowanie CMT i kadry zarządzającej'
          ]
        },
        {
          title: 'Ćwiczenia i facylitacja',
          summary:
            'Projektowanie i prowadzenie ćwiczeń sprawdzających sposób podejmowania decyzji, współpracę zespołów i działanie pod presją czasu.',
          points: [
            'tabletop exercises',
            'ćwiczenia sztabowe i decyzyjne',
            'projektowanie scenariuszy i injectów',
            'facylitacja pracy CMT i innych zespołów',
            'organizacja kontroli i obserwacji ćwiczenia',
            'After Action Review',
            'identyfikacja luk i obszarów do poprawy',
            'plany działań doskonalących'
          ]
        },
        {
          title: 'Komunikacja kryzysowa',
          summary:
            'Projektowanie i testowanie systemu komunikacji kryzysowej, z naciskiem na organizację zespołu, zatwierdzanie treści i przepływ informacji.',
          note:
            'Usługa dotyczy przygotowania organizacyjnego do komunikacji podczas poważnego zdarzenia. Bieżąca obsługa PR i codzienne prowadzenie relacji z mediami pozostają poza zakresem.',
          points: [
            'struktura zespołu komunikacji kryzysowej',
            'role rzecznika, komunikacji wewnętrznej, social media i monitoringu',
            'przepływ informacji między CMT a zespołem komunikacji',
            'proces przygotowania i zatwierdzania komunikatów',
            'holding statements i szablony komunikatów',
            'crisis communication toolkit',
            'przygotowanie organizacyjne dark site',
            'symulacje presji medialnej i informacyjnej',
            'analiza komunikacji po zdarzeniu'
          ]
        },
        {
          title: 'Wsparcie osób dotkniętych zdarzeniem i ich bliskich',
          summary:
            'Projektowanie organizacyjnego systemu pomocy osobom dotkniętym poważnym zdarzeniem, ich rodzinom i osobom oczekującym na informację.',
          note:
            'ClearStance projektuje organizację, procedury, role, zespoły i ćwiczenia. Pomoc psychologiczna, medyczna i prawna jest realizowana przez odpowiednio wykwalifikowanych specjalistów i partnerów.',
          points: [
            'model organizacji zespołu pomocy',
            'role i zakresy odpowiedzialności',
            'aktywacja i mobilizacja personelu',
            'centra pomocy i miejsca przyjęcia rodzin',
            'infolinia kryzysowa i rejestracja zgłoszeń',
            'zarządzanie informacją o osobach',
            'komunikacja z rodzinami i osobami bliskimi',
            'współpraca z władzami, służbami i partnerami',
            'zasady ochrony danych i poufności',
            'organizacja podróży, zakwaterowania i bieżącego wsparcia',
            'szkolenia dla członków zespołów pomocowych',
            'ćwiczenia affected people and family assistance',
            'przygotowanie rozwiązań wspierających personel zaangażowany w reakcję'
          ]
        }
      ],
      closingTitle: 'Zaplecze metodyczne',
      closingText:
        'Projekty mogą uwzględniać odpowiednie standardy zarządzania kryzysowego, ćwiczeń i ciągłości działania oraz wymagania branżowe właściwe dla organizacji. Standardy stanowią punkt odniesienia dla zakresu pracy, a nie osobny produkt.',
      closingReferences: [
        {
          code: 'ISO 22361',
          description: 'zarządzanie kryzysowe'
        },
        {
          code: 'ISO 22398',
          description: 'ćwiczenia'
        },
        {
          code: 'ISO 22301',
          description: 'ciągłość działania'
        },
        {
          label: 'Wytyczne branżowe',
          description: 'organizacja pomocy osobom i rodzinom po poważnym zdarzeniu'
        }
      ]
    },
    aboutPage: {
      metaTitle: 'O ClearStance - niezależna praktyka doradcza',
      metaDescription:
        'ClearStance łączy doświadczenie operacyjne z żeglugi i lotnictwa z perspektywą strategiczną i zarządzaniem kryzysowym.',
      eyebrow: 'O ClearStance',
      title: 'From the bridge to the boardroom.',
      lead: 'Doświadczenie operacyjne połączone z perspektywą strategiczną.',
      storyTitle: 'Praktyka zbudowana na odpowiedzialności operacyjnej.',
      paragraphs: [
        'ClearStance jest niezależną praktyką doradczą wspierającą organizacje w przygotowaniu sposobu podejmowania decyzji, komunikowania się i wspierania ludzi podczas poważnych zdarzeń.',
        'Jej podstawą jest doświadczenie z dwóch środowisk, w których bezpieczeństwo, koordynacja i jakość decyzji mają bezpośrednie znaczenie: żeglugi morskiej i lotnictwa.',
        'Założyciel ClearStance przez kilka lat pracował jako oficer wachtowy na statkach kontenerowych. Odpowiadał za bezpieczne prowadzenie statku i pracował w obszarach bezpieczeństwa operacyjnego oraz ochrony.',
        'Od 2018 roku jest związany z lotnictwem. Doświadczenie obejmuje role analityczne, projektowe i strategiczne, a także zarządzanie kryzysowe.'
      ],
      mediaAlt: {
        maritime:
          'Stół nawigacyjny z mapą morską i narzędziami na mostku statku.',
        aviation:
          'Podwozie samolotu i światła drogi kołowania na mokrej płycie lotniska.'
      },
      experienceAxisLabel: 'Oś doświadczenia',
      experienceAxis: [
        'Odpowiedzialność operacyjna na morzu',
        'Analiza i strategia w lotnictwie',
        'Doradztwo ClearStance'
      ],
      perspectiveTitle: 'Perspektywa operacyjna w pracy doradczej.',
      perspectiveText:
        'ClearStance łączy rozumienie realiów operacyjnych z pracą nad strukturami, procesami i decyzjami zarządczymi. Rozwiązania są osadzane w warunkach działania organizacji, aby zespół mógł wykorzystać je podczas rzeczywistego zdarzenia.'
    },
    contactPage: {
      metaTitle: 'Kontakt - ClearStance',
      metaDescription:
        'Skontaktuj się z ClearStance w sprawie gotowości kryzysowej, ćwiczeń, facylitacji lub przeglądu przygotowania.',
      eyebrow: 'Kontakt',
      title: 'Zacznijmy od konkretnej sytuacji.',
      lead:
        'Napisz, jeśli planujesz ćwiczenie, przegląd gotowości albo potrzebujesz uporządkować sposób reagowania i podejmowania decyzji.',
      emailLabel: 'E-mail',
      locationLabel: 'Lokalizacja',
      cta: 'contact@clearstance.pl',
      note:
        'Wiadomość może krótko opisywać kontekst, oczekiwany zakres i horyzont czasowy rozmowy.',
      form: {
        eyebrow: 'Wiadomość',
        title: 'Wyślij wiadomość',
        name: 'Imię i nazwisko',
        email: 'E-mail',
        organisation: 'Organizacja (opcjonalnie)',
        message: 'W czym możemy pomóc?',
        submit: 'Wyślij wiadomość',
        sending: 'Wysyłanie…',
        success: 'Dziękujemy. Wiadomość została wysłana.',
        timeout:
          'Nie udało się potwierdzić wyniku wysyłki. Wiadomość mogła zostać przekazana. Możesz spróbować ponownie lub napisać na contact@clearstance.pl.',
        failure:
          'Nie udało się wysłać wiadomości. Możesz napisać bezpośrednio na contact@clearstance.pl.',
        verification: 'Potwierdź weryfikację i spróbuj ponownie.',
        unavailable:
          'Formularz jest chwilowo niedostępny. Napisz bezpośrednio na contact@clearstance.pl.',
        privacyPrefix:
          'Informacje o przetwarzaniu danych znajdziesz w\u00a0',
        privacyLink: 'Polityce prywatności'
      }
    },
    insightsPage: {
      metaTitle: 'ClearStance Insights - gotowość i zarządzanie kryzysowe',
      metaDescription:
        'ClearStance Insights: publikacje o gotowości organizacyjnej, zarządzaniu kryzysowym, ćwiczeniach i decyzjach pod presją.',
      eyebrow: 'CLEARSTANCE INSIGHTS',
      title: 'Publikacje o gotowości i zarządzaniu kryzysowym.',
      lead:
        'Materiały dotyczące struktur reagowania, ćwiczeń, pracy zespołów i decyzji podejmowanych pod presją.',
      read: 'Czytaj materiał',
      empty: 'Pierwsze publikacje pojawią się wkrótce.',
      back: 'ClearStance Insights',
      published: 'Data publikacji',
      updated: 'Aktualizacja',
      category: 'Kategoria',
      author: 'Autor',
      readingTime: 'Czas czytania',
      readingTimeUnit: 'min czytania',
      contents: 'Spis treści',
      related: 'Powiązane publikacje',
      publisher: {
        eyebrow: 'O wydawcy',
        title: 'ClearStance',
        text:
          'ClearStance jest niezależną praktyką doradczą zajmującą się gotowością kryzysową, ćwiczeniami, facylitacją i decyzjami podejmowanymi przy niepełnej informacji.',
        services: 'Zakres wsparcia',
        about: 'O ClearStance',
        contact: 'Kontakt'
      },
      share: {
        heading: 'Udostępnij',
        email: 'E-mail',
        copy: 'Kopiuj link',
        copied: 'Link skopiowany',
        copyFailure: 'Nie udało się skopiować linku',
        native: 'Udostępnij w systemie',
        shareFailure: 'Nie udało się udostępnić'
      }
    }
  },
  en: {
    locale: 'en',
    site: {
      name: 'ClearStance',
      skip: 'Skip to content',
      mainNavigation: 'Main navigation',
      languageNavigation: 'Language selection',
      homeLabel: 'ClearStance - home',
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
      currentLanguage: 'English',
      otherLanguage: 'Polski',
      email: 'contact@clearstance.pl',
      location: 'Warsaw · Poland',
      footerTagline: 'Navigation under uncertainty',
      copyright: 'ClearStance. All rights reserved.',
      privacy: 'Privacy & cookies',
      nav: {
        approach: 'Approach',
        services: 'Services',
        insights: 'Insights',
        practice: 'How we work',
        experience: 'About',
        contact: 'Contact'
      }
    },
    home: {
      meta: {
        title: 'ClearStance - Clarity when it matters most',
        description:
          'ClearStance helps organisations prepare how they will make decisions, communicate and support people during serious incidents.'
      },
      hero: {
        ...sharedHome.hero,
        copy:
          'We help organisations prepare their structures, teams and ways of working for situations that demand timely decisions with incomplete information.',
        cta: 'Explore our approach',
        featured: 'Featured',
        imageAlt: 'A calm coastal view of a lighthouse at dusk.'
      },
      approach: {
        eyebrow: 'Our approach',
        title: 'Crisis readiness in practice.',
        lead:
          'Good readiness rests on a shared operating picture, clear accountability and principles a team can apply with incomplete information.',
        body:
          'Structures, procedures and scenarios are therefore assessed against the real operating model, its dependencies and the decisions that need to be made.',
        pillars: [
          {
            title: 'Understand the situation',
            text: 'Risks, dependencies, priorities and operational constraints.'
          },
          {
            title: 'Clear roles and accountability',
            text: 'Information, escalation and the way decisions are made.'
          },
          {
            title: 'Test it in practice',
            text: 'Scenarios, exercises, time pressure and collaboration.'
          }
        ]
      },
      services: {
        eyebrow: 'Services',
        title: 'Support for stronger crisis readiness.',
        intro:
          'We help organisations prepare how decisions are made, communication is managed and people are supported during serious incidents.',
        items: [
          {
            title: 'Crisis Management',
            text: 'Structures, roles, plans and activation mechanisms that help organisations move from the first signal to a coordinated response.'
          },
          {
            title: 'Exercises & Facilitation',
            text: 'Scenarios, exercises and facilitated team sessions designed to test decisions, cooperation and communication in realistic conditions.'
          },
          {
            title: 'Crisis Communication',
            text: 'Designing and testing the teams, processes and tools needed for timely, consistent and responsible communication during a serious incident.'
          },
          {
            title: 'Affected People & Family Assistance',
            text: 'Designing teams, procedures and arrangements that support affected people, their families and personnel involved in the response.'
          }
        ],
        linkLabel: 'Full offer',
        link: 'Explore the full offer'
      },
      readiness: {
        eyebrow: 'Readiness cycle',
        title: 'From orientation to action.',
        quote: sharedHome.readiness.quote,
        items: [
          {
            title: 'Assess',
            text: 'An assessment of risks, dependencies and current response arrangements establishes the starting point.'
          },
          {
            title: 'Prepare',
            text: 'Roles, authority, escalation thresholds and information flows are agreed and understood.'
          },
          {
            title: 'Exercise',
            text: 'A realistic scenario puts assumptions, decisions and team coordination into practice.'
          },
          {
            title: 'Respond',
            text: 'During an event, the team can escalate, update the operating picture and coordinate decisions.'
          },
          {
            title: 'Improve',
            text: 'Lessons from exercises and events have owners, priorities and a date for review.'
          }
        ]
      },
      experience: {
        eyebrow: 'Experience',
        title: 'Operational experience with a strategic perspective.',
        paragraphs: [
          'ClearStance combines experience from maritime shipping and aviation with work in operational safety, strategy and crisis management.'
        ],
        closing:
          'The full context behind the practice, from operational responsibility to advisory work, is set out on the About page.',
        tracks: [
          {
            title: 'Maritime shipping',
            text: 'Officer of the Watch · operations · safety and security'
          },
          {
            title: 'Aviation',
            text: 'analysis · projects · strategy · crisis management'
          }
        ],
        mediaAlt: {
          maritime:
            'A navigator’s hands working with a nautical chart on a ship’s bridge.',
          aviation:
            'An airport apron and aircraft ground-handling infrastructure after rain.'
        },
        link: 'About ClearStance'
      },
      practice: {
        eyebrow: 'How we work',
        title: 'Our way of working.',
        paragraphs: [
          'We begin with the organisation’s actual operating model: roles, dependencies, information flows and the way decisions are made.',
          'The scope and method reflect the specific challenge. We work with the team to reach agreements that can be used in structures, procedures, an exercise or further improvement.'
        ],
        items: [
          {
            title: 'Operating context',
            text: 'The work reflects the organisation’s actual roles, dependencies and constraints.'
          },
          {
            title: 'Work with the team',
            text: 'Facilitation involves the people responsible for decisions and delivery.'
          },
          {
            title: 'Proportionate scope',
            text: 'The method and level of detail fit the challenge and the organisation’s maturity.'
          },
          {
            title: 'Usable outcomes',
            text: 'The result identifies specific decisions, changes or improvement actions.'
          }
        ]
      },
      statement: {
        first: 'Readiness brings structure to response.',
        second:
          'Clear roles, decisions and escalation paths help teams operate effectively under pressure.',
        imageAlt: 'A lighthouse casting a clear beam through darkness'
      },
      insights: {
        eyebrow: 'INSIGHTS',
        title: 'ClearStance Insights',
        copy:
          'Publications on organizational readiness, crisis management, exercises and decision-making under pressure.',
        all: 'Browse all Insights'
      },
      contact: {
        eyebrow: 'Contact',
        title: 'Let’s discuss your organisation’s readiness.',
        text: 'We can begin with a focused conversation about your current response model, a planned exercise or a specific issue that needs to be brought into clearer order.',
        cta: 'Start a conversation'
      }
    },
    servicesPage: {
      metaTitle: 'Services - ClearStance',
      metaDescription:
        'Crisis management, exercises, crisis communication and organisational arrangements supporting affected people and their families.',
      eyebrow: 'Services',
      title: 'Readiness designed for the real operating environment.',
      lead:
        'Support is shaped around your operating model, exposure to risk and current level of organisational preparedness.',
      introTitle: 'Four areas of support',
      intro:
        'ClearStance helps organisations prepare how they will respond to serious incidents: from activating teams and making decisions to communicating clearly and organising support for affected people and their families.',
      services: [
        {
          title: 'Crisis Management',
          summary:
            'Reviewing and designing crisis management arrangements, from activation rules to the organisation of the crisis management team.',
          points: [
            'review of the existing operating model and documentation',
            'crisis management team structure',
            'roles, responsibilities and authority',
            'activation, alerting and escalation levels',
            'information flow and decision logging',
            'plans, procedures, checklists and role cards',
            'preparation of the CMT and senior leadership'
          ]
        },
        {
          title: 'Exercises & Facilitation',
          summary:
            'Designing and facilitating exercises that test decision-making, team cooperation and performance under time pressure.',
          points: [
            'tabletop exercises',
            'command-post and decision-making exercises',
            'scenario and inject design',
            'facilitation of CMT and other response teams',
            'exercise control and observation',
            'After Action Review',
            'identification of gaps and improvement areas',
            'improvement action plans'
          ]
        },
        {
          title: 'Crisis Communication',
          summary:
            'Designing and testing crisis communication arrangements, with a focus on team structure, content approval and information flow.',
          note:
            'The service focuses on organisational preparedness for communication during a serious incident. Ongoing PR support and day-to-day media relations remain outside its scope.',
          points: [
            'crisis communication team structure',
            'spokesperson, internal communication, social media and monitoring roles',
            'information flow between the CMT and communication team',
            'message preparation and approval process',
            'holding statements and message templates',
            'crisis communication toolkit',
            'organisational preparation of a dark site',
            'simulations of media and information pressure',
            'post-incident communication review'
          ]
        },
        {
          title: 'Affected People & Family Assistance',
          summary:
            'Designing the organisational arrangements used to support people affected by a serious incident, their families and those awaiting information.',
          note:
            'ClearStance designs organisational arrangements, procedures, roles, teams and exercises. Psychological, medical and legal services are provided by appropriately qualified professionals and specialist partners.',
          points: [
            'assistance team operating model',
            'roles and responsibilities',
            'activation and mobilisation of personnel',
            'assistance centres and family reception locations',
            'crisis helpline and enquiry registration',
            'management of information about people',
            'communication with families and close relatives',
            'cooperation with authorities, emergency services and partners',
            'data protection and confidentiality arrangements',
            'travel, accommodation and ongoing practical support',
            'training for assistance team members',
            'affected people and family assistance exercises',
            'arrangements supporting personnel involved in the response'
          ]
        }
      ],
      closingTitle: 'Methodological reference points',
      closingText:
        'Engagements may draw on relevant standards for crisis management, exercises and business continuity, together with sector-specific requirements applicable to the organisation. These provide reference points for the work rather than separate products.',
      closingReferences: [
        {
          code: 'ISO 22361',
          description: 'crisis management'
        },
        {
          code: 'ISO 22398',
          description: 'exercises'
        },
        {
          code: 'ISO 22301',
          description: 'business continuity'
        },
        {
          label: 'Sector-specific guidance',
          description: 'organisational arrangements for supporting affected people and their families after a serious incident'
        }
      ]
    },
    aboutPage: {
      metaTitle: 'About ClearStance - independent advisory practice',
      metaDescription:
        'ClearStance combines operational experience from maritime shipping and aviation with strategic and crisis management perspective.',
      eyebrow: 'About ClearStance',
      title: 'From the bridge to the boardroom.',
      lead: 'Operational experience combined with a strategic perspective.',
      storyTitle: 'An advisory practice grounded in operational experience.',
      paragraphs: [
        'ClearStance is an independent advisory practice helping organisations prepare how they will make decisions, communicate and support people during serious incidents.',
        'It is grounded in experience from two environments where safety, coordination and decision quality have immediate consequences: maritime shipping and aviation.',
        'ClearStance’s founder spent several years as an Officer of the Watch on container ships. He was responsible for safe navigation and worked across operational safety and security.',
        'Since 2018, he has worked in aviation. His background spans analytical, project and strategic roles, as well as crisis management.'
      ],
      mediaAlt: {
        maritime:
          'A ship’s bridge chart table with a nautical chart and navigation tools.',
        aviation:
          'Aircraft landing gear and taxiway lights on a wet airport apron.'
      },
      experienceAxisLabel: 'Experience progression',
      experienceAxis: [
        'Maritime operational responsibility',
        'Aviation analysis and strategy',
        'ClearStance advisory'
      ],
      perspectiveTitle: 'Operational perspective in advisory work.',
      perspectiveText:
        'ClearStance connects an understanding of operational realities with work on structures, processes and management decisions. Solutions are grounded in the organisation’s operating conditions so that the team can use them during a real event.'
    },
    contactPage: {
      metaTitle: 'Contact - ClearStance',
      metaDescription:
        'Contact ClearStance about crisis readiness, exercises, facilitation or a preparedness review.',
      eyebrow: 'Contact',
      title: 'Start with the situation at hand.',
      lead:
        'Write to us if you are planning an exercise, reviewing readiness or need to bring greater clarity to response and decision-making.',
      emailLabel: 'Email',
      locationLabel: 'Location',
      cta: 'contact@clearstance.pl',
      note:
        'A short note on the context, intended scope and timing is enough to begin the conversation.',
      form: {
        eyebrow: 'Enquiry',
        title: 'Send a message',
        name: 'Name',
        email: 'Email',
        organisation: 'Organisation (optional)',
        message: 'How can we help?',
        submit: 'Send message',
        sending: 'Sending…',
        success: 'Thank you. Your message has been sent.',
        timeout:
          'We could not confirm the result. Your message may have been submitted. You can try again or email contact@clearstance.pl directly.',
        failure:
          'The message could not be sent. You can email contact@clearstance.pl directly.',
        verification: 'Complete the verification and try again.',
        unavailable:
          'The form is temporarily unavailable. Please email contact@clearstance.pl directly.',
        privacyPrefix:
          'Information about how we process personal data is available in our ',
        privacyLink: 'Privacy Policy'
      }
    },
    insightsPage: {
      metaTitle: 'ClearStance Insights - readiness and crisis management',
      metaDescription:
        'ClearStance Insights publishes articles on organizational readiness, crisis management, exercises and decision-making under pressure.',
      eyebrow: 'CLEARSTANCE INSIGHTS',
      title: 'Publications on readiness and crisis management.',
      lead:
        'Articles and materials on response structures, exercises, how teams work and decision-making under pressure.',
      read: 'Read insight',
      empty: 'The first publications will appear here soon.',
      back: 'ClearStance Insights',
      published: 'Publication date',
      updated: 'Updated',
      category: 'Category',
      author: 'Author',
      readingTime: 'Reading time',
      readingTimeUnit: 'min read',
      contents: 'Contents',
      related: 'Related Insights',
      publisher: {
        eyebrow: 'About the publisher',
        title: 'ClearStance',
        text:
          'ClearStance is an independent advisory practice focused on crisis readiness, exercises, facilitation and decision-making with incomplete information.',
        services: 'Explore services',
        about: 'About ClearStance',
        contact: 'Contact'
      },
      share: {
        heading: 'Share',
        email: 'E-mail',
        copy: 'Copy link',
        copied: 'Link copied',
        copyFailure: 'Could not copy link',
        native: 'Share via device',
        shareFailure: 'Could not share'
      }
    }
  }
} as const satisfies Record<Locale, unknown>;

const visibleTranslations = {
  pl: protectPolishVisibleCopy(translations.pl),
  en: translations.en
};

export function getTranslations(locale: Locale) {
  return translations[locale];
}

export function getVisibleTranslations(locale: Locale) {
  return visibleTranslations[locale];
}
