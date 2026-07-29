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
          'ClearStance wspiera organizacje w budowaniu gotowości kryzysowej, projektowaniu systemów reagowania, prowadzeniu ćwiczeń i facylitacji zespołów.'
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
            label: 'Kontekst',
            title: 'Zrozumienie sytuacji',
            text: 'Ryzyka, zależności, priorytety i ograniczenia operacyjne.'
          },
          {
            label: 'Decyzje',
            title: 'Jasne role i odpowiedzialność',
            text: 'Informacja, eskalacja i sposób podejmowania decyzji.'
          },
          {
            label: 'Działanie',
            title: 'Sprawdzenie w praktyce',
            text: 'Scenariusze, ćwiczenia, presja czasu i współpraca.'
          }
        ]
      },
      services: {
        eyebrow: 'Oferta',
        title: 'Wsparcie w budowaniu gotowości kryzysowej.',
        intro:
          'Zakres prac dobieramy do modelu operacyjnego, ryzyk i poziomu dojrzałości organizacji. Współpraca może obejmować pojedyncze ćwiczenie lub przegląd, a także szersze uporządkowanie systemu zarządzania kryzysowego.',
        items: [
          {
            title: 'System zarządzania kryzysowego',
            text: 'Projektowanie i przegląd struktur, ról, odpowiedzialności, planów, procedur, zasad aktywacji oraz przepływu informacji.'
          },
          {
            title: 'Ćwiczenia i symulacje',
            text: 'Ćwiczenia typu tabletop, ćwiczenia sztabowe i scenariusze sprawdzające decyzje, współpracę, komunikację oraz działanie pod presją czasu.'
          },
          {
            title: 'Facylitacja',
            text: 'Warsztaty, sesje decyzyjne i uporządkowana praca z zespołami nad konkretnymi problemami organizacyjnymi.'
          },
          {
            title: 'Przeglądy i doskonalenie',
            text: 'Ocena przygotowania, identyfikacja luk, przeglądy po ćwiczeniach i zdarzeniach (After Action Review) oraz planowanie działań doskonalących.'
          }
        ],
        perspectiveLabel: 'Perspektywa',
        perspective:
          'Pracę wspiera doświadczenie z żeglugi morskiej, lotnictwa, bezpieczeństwa operacyjnego, ochrony i zarządzania kryzysowego.',
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
        imageAlt: 'Briefing operacyjny i praca zespołu decyzyjnego',
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
        'Systemy zarządzania kryzysowego, ćwiczenia i symulacje, facylitacja oraz przeglądy gotowości organizacyjnej.',
      eyebrow: 'Oferta',
      title: 'Gotowość, która działa w rzeczywistym środowisku.',
      lead:
        'Zakres wsparcia dopasowujemy do modelu operacyjnego, ekspozycji na ryzyko i aktualnego poziomu przygotowania organizacji.',
      introTitle: 'Cztery obszary wsparcia',
      intro:
        'Każdy obszar może stanowić odrębne zlecenie albo część szerszego procesu porządkowania gotowości kryzysowej.',
      services: [
        {
          title: 'System zarządzania kryzysowego',
          summary:
            'Projektowanie i przegląd sposobu, w jaki organizacja rozpoznaje, eskaluje i koordynuje sytuacje kryzysowe.',
          illustration: {
            src: '/images/01_system_zarzadzania_kryzysowego.png',
            width: 1200,
            height: 815,
            alt: 'Szkic przedstawiający pracę nad systemem zarządzania kryzysowego'
          },
          points: [
            'struktury, role i odpowiedzialność',
            'zasady aktywacji i eskalacji',
            'plany, procedury i przepływ informacji',
            'powiązanie poziomu operacyjnego i strategicznego'
          ]
        },
        {
          title: 'Ćwiczenia i symulacje',
          summary:
            'Scenariusze pozwalające bezpiecznie sprawdzić decyzje, współpracę i komunikację przed rzeczywistym zdarzeniem.',
          illustration: {
            src: '/images/02_cwiczenia_i_symulacje.png',
            width: 1200,
            height: 771,
            alt: 'Szkic przedstawiający planowanie ćwiczenia kryzysowego'
          },
          points: [
            'ćwiczenia typu tabletop i ćwiczenia sztabowe',
            'projektowanie realistycznych scenariuszy',
            'prowadzenie i facylitacja przebiegu',
            'obserwacja, omówienie i wnioski'
          ]
        },
        {
          title: 'Facylitacja',
          summary:
            'Ustrukturyzowana praca z zespołami, kiedy problem wymaga wspólnego obrazu sytuacji i decyzji przekraczających granice funkcji.',
          illustration: {
            src: '/images/03_facylitacja.png',
            width: 1024,
            height: 525,
            alt: 'Szkic przedstawiający facylitowaną pracę zespołu'
          },
          points: [
            'warsztaty i sesje decyzyjne',
            'porządkowanie problemów i zależności',
            'uzgadnianie ról oraz kierunku działania',
            'przekładanie dyskusji na konkretne ustalenia'
          ]
        },
        {
          title: 'Przeglądy i doskonalenie',
          summary:
            'Ocena przygotowania oraz uporządkowanie wniosków z ćwiczeń, zdarzeń i dotychczasowego sposobu działania.',
          illustration: {
            src: '/images/04_przeglady_i_doskonalenie.png',
            width: 1200,
            height: 473,
            alt: 'Szkic przedstawiający przegląd i doskonalenie sposobu działania'
          },
          points: [
            'przeglądy gotowości i identyfikacja luk',
            'After Action Review',
            'priorytetyzacja działań doskonalących',
            'aktualizacja założeń, planów i sposobu pracy'
          ]
        }
      ],
      closingEyebrow: 'Punkt wyjścia',
      closingTitle: 'Zakres dopasowany do rzeczywistego problemu.',
      closingText:
        'Rozmowę rozpoczynamy od modelu działania organizacji, jej zależności i konkretnego problemu. Następnie uzgadniamy zakres oraz oczekiwany rezultat: decyzje, role, scenariusz ćwiczenia albo plan usprawnień — zależnie od sytuacji.'
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
        'ClearStance jest niezależną praktyką doradczą skoncentrowaną na gotowości kryzysowej, ćwiczeniach, facylitacji i decyzjach podejmowanych w warunkach niepewności.',
        'Jej podstawą jest doświadczenie z dwóch środowisk, w których bezpieczeństwo, koordynacja i jakość decyzji mają bezpośrednie znaczenie: żeglugi morskiej i lotnictwa.',
        'Założyciel ClearStance przez kilka lat pracował jako oficer wachtowy na statkach kontenerowych. Odpowiadał za bezpieczne prowadzenie statku i pracował w obszarach bezpieczeństwa operacyjnego oraz ochrony.',
        'Od 2018 roku jest związany z lotnictwem. Doświadczenie obejmuje role analityczne, projektowe i strategiczne, a także zarządzanie kryzysowe.'
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
          'ClearStance helps organisations strengthen crisis readiness through response design, exercises, facilitation and preparedness reviews.'
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
            label: 'Context',
            title: 'Understand the situation',
            text: 'Risks, dependencies, priorities and operational constraints.'
          },
          {
            label: 'Decisions',
            title: 'Clear roles and accountability',
            text: 'Information, escalation and the way decisions are made.'
          },
          {
            label: 'Action',
            title: 'Test it in practice',
            text: 'Scenarios, exercises, time pressure and collaboration.'
          }
        ]
      },
      services: {
        eyebrow: 'Services',
        title: 'Support for stronger crisis readiness.',
        intro:
          'The scope is shaped around the organisation’s operating model, risks and level of maturity. An engagement may focus on a single exercise or review, or on a broader refinement of the crisis management system.',
        items: [
          {
            title: 'Crisis management systems',
            text: 'Design and review of structures, roles, responsibilities, plans, procedures, activation principles and information flows.'
          },
          {
            title: 'Exercises and simulations',
            text: 'Tabletop and command-post exercises designed to test decisions, collaboration, communication and performance under time pressure.'
          },
          {
            title: 'Facilitation',
            text: 'Workshops, decision sessions and structured team work focused on specific organisational challenges.'
          },
          {
            title: 'Reviews and improvement',
            text: 'Readiness assessments, gap identification, After Action Reviews following exercises or events, and improvement planning.'
          }
        ],
        perspectiveLabel: 'Perspective',
        perspective:
          'The work draws on experience from maritime shipping, aviation, operational safety, security and crisis management.',
        link: 'View all services'
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
        imageAlt: 'An operational briefing with a decision-making team',
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
        'Crisis management systems, exercises and simulations, facilitation, and organisational readiness reviews.',
      eyebrow: 'Services',
      title: 'Readiness designed for the real operating environment.',
      lead:
        'Support is shaped around your operating model, exposure to risk and current level of organisational preparedness.',
      introTitle: 'Four areas of support',
      intro:
        'Each area can be commissioned independently or form part of a broader programme to strengthen crisis readiness.',
      services: [
        {
          title: 'Crisis management systems',
          summary:
            'Design and review of how an organisation identifies, escalates and coordinates crisis situations.',
          illustration: {
            src: '/images/01_system_zarzadzania_kryzysowego.png',
            width: 1200,
            height: 815,
            alt: 'Sketch illustrating work on a crisis management system'
          },
          points: [
            'structures, roles and accountability',
            'activation and escalation principles',
            'plans, procedures and information flows',
            'alignment between operational and strategic levels'
          ]
        },
        {
          title: 'Exercises and simulations',
          summary:
            'Scenarios that provide a safe setting to test decisions, collaboration and communication before a real event.',
          illustration: {
            src: '/images/02_cwiczenia_i_symulacje.png',
            width: 1200,
            height: 771,
            alt: 'Sketch illustrating crisis exercise planning'
          },
          points: [
            'tabletop and command-post exercises',
            'realistic scenario design',
            'exercise delivery and facilitation',
            'observation, debriefing and lessons'
          ]
        },
        {
          title: 'Facilitation',
          summary:
            'Structured work with teams when a challenge requires a shared picture and decisions that cross functional boundaries.',
          illustration: {
            src: '/images/03_facylitacja.png',
            width: 1024,
            height: 525,
            alt: 'Sketch illustrating facilitated team work'
          },
          points: [
            'workshops and decision sessions',
            'clarifying issues and dependencies',
            'aligning roles and direction',
            'turning discussion into concrete agreements'
          ]
        },
        {
          title: 'Reviews and improvement',
          summary:
            'Assessment of preparedness and systematic learning from exercises, events and existing ways of working.',
          illustration: {
            src: '/images/04_przeglady_i_doskonalenie.png',
            width: 1200,
            height: 473,
            alt: 'Sketch illustrating review and improvement of working practices'
          },
          points: [
            'readiness reviews and gap identification',
            'After Action Reviews',
            'prioritised improvement actions',
            'updates to assumptions, plans and ways of working'
          ]
        }
      ],
      closingEyebrow: 'Starting point',
      closingTitle: 'A scope shaped around the actual challenge.',
      closingText:
        'We begin with the organisation’s operating model, dependencies and specific challenge. We then agree the scope and intended result: decisions, roles, an exercise scenario or an improvement plan, depending on the situation.'
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
        'ClearStance is an independent advisory practice focused on crisis readiness, exercises, facilitation and decision-making under uncertainty.',
        'It is grounded in experience from two environments where safety, coordination and decision quality have immediate consequences: maritime shipping and aviation.',
        'ClearStance’s founder spent several years as an Officer of the Watch on container ships. He was responsible for safe navigation and worked across operational safety and security.',
        'Since 2018, he has worked in aviation. His background spans analytical, project and strategic roles, as well as crisis management.'
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
