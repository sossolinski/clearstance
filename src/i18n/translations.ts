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
  },
  experience: {
    eyebrow: 'From the bridge to the boardroom'
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
      nav: {
        approach: 'Podejście',
        services: 'Oferta',
        insights: 'Insights',
        practice: 'Jak pracujemy',
        experience: 'Doświadczenie',
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
        imageAlt: 'Latarnia morska wskazująca drogę na wzburzonym morzu'
      },
      approach: {
        eyebrow: 'Nasze podejście',
        title: 'Gotowość kryzysowa w praktyce.',
        lead:
          'Plany i procedury tworzą ramy działania. O rzeczywistym przygotowaniu decyduje również to, czy zespół zna swoje role, potrafi zbudować wspólny obraz sytuacji i działa według uzgodnionych zasad.',
        body:
          'Łączymy projektowanie struktur i procedur z ćwiczeniami, facylitacją i przeglądami gotowości. Pozwala to sprawdzić założenia, zidentyfikować luki i wprowadzić korekty przed rzeczywistym zdarzeniem.',
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
          'Doświadczenie obejmuje również bezpieczeństwo operacyjne, ochronę oraz pracę w środowiskach o wysokich wymaganiach bezpieczeństwa.',
        link: 'Zobacz pełną ofertę'
      },
      readiness: {
        eyebrow: 'Cykl gotowości',
        title: 'Od orientacji do działania.',
        quote: sharedHome.readiness.quote,
        items: [
          {
            title: 'Zrozumienie',
            text: 'Porządkujemy informacje, zależności i priorytety, aby zbudować wspólny obraz sytuacji.'
          },
          {
            title: 'Przygotowanie',
            text: 'Ustalamy struktury, role, procedury, przepływ informacji i zasady eskalacji.'
          },
          {
            title: 'Ćwiczenie',
            text: 'Testujemy założenia i sposób pracy zespołu na realistycznych scenariuszach.'
          },
          {
            title: 'Reagowanie',
            text: 'Przygotowanie ma wspierać skoordynowane działanie: eskalację, przepływ informacji, komunikację i podejmowanie decyzji.'
          },
          {
            title: 'Doskonalenie',
            text: 'Wnioski z ćwiczeń i zdarzeń przekładamy na działania, które wzmacniają przygotowanie organizacji.'
          }
        ]
      },
      experience: {
        ...sharedHome.experience,
        title: 'Doświadczenie operacyjne. Perspektywa strategiczna.',
        paragraphs: [
          'Podstawą ClearStance jest doświadczenie z dwóch środowisk operacyjnych: żeglugi morskiej i lotnictwa.',
          'Założyciel ClearStance przez kilka lat pracował jako oficer wachtowy na statkach kontenerowych, odpowiadając za bezpieczne prowadzenie statku i pracując w obszarach bezpieczeństwa operacyjnego (safety) oraz ochrony (security).',
          'Od 2018 roku jest związany z lotnictwem, gdzie przeszedł od ról analitycznych i projektowych do strategicznych oraz zarządzania kryzysowego.'
        ],
        closing:
          'To doświadczenie łączy perspektywę operacyjną z rozumieniem organizacji, procesów i decyzji zarządczych.',
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
          'Pracujemy na scenariuszach i problemach osadzonych w realnym środowisku operacyjnym. Rezultatem są konkretne zmiany w strukturach, procedurach, sposobie pracy lub przygotowaniu zespołu.'
        ],
        items: [
          {
            title: 'Doświadczenie operacyjne',
            text: 'Rozwiązania osadzone w realiach działania organizacji.'
          },
          {
            title: 'Perspektywa międzybranżowa',
            text: 'Doświadczenia z żeglugi i lotnictwa, uzupełnione praktyką w obszarach bezpieczeństwa i zarządzania kryzysowego.'
          },
          {
            title: 'Facylitacja',
            text: 'Praca z zespołem, decyzjami i zależnościami pomiędzy funkcjami.'
          },
          {
            title: 'Spokój i precyzja',
            text: 'Jasny język, proporcjonalne rozwiązania i koncentracja na tym, co organizacja rzeczywiście wykorzysta.'
          }
        ]
      },
      statement: {
        first: 'Niepewność jest częścią środowiska.',
        second: 'Chaos nie musi nią być.',
        source: 'ClearStance · filozofia gotowości',
        imageAlt: 'Latarnia morska oświetlająca drogę w ciemności'
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
      closingTitle: 'Najpierw kontekst. Potem rozwiązanie.',
      closingText:
        'Rozmowę rozpoczynamy od modelu działania organizacji, jej zależności i konkretnego problemu. Dzięki temu zakres pracy pozostaje proporcjonalny i użyteczny.',
      cta: 'Porozmawiajmy o zakresie'
    },
    aboutPage: {
      metaTitle: 'O ClearStance - niezależna praktyka doradcza',
      metaDescription:
        'ClearStance łączy doświadczenie operacyjne z żeglugi i lotnictwa z perspektywą strategiczną i zarządzaniem kryzysowym.',
      eyebrow: 'O ClearStance',
      title: 'From the bridge to the boardroom.',
      lead: 'Doświadczenie operacyjne. Perspektywa strategiczna.',
      storyTitle: 'Praktyka zbudowana na odpowiedzialności operacyjnej.',
      paragraphs: [
        'ClearStance jest niezależną praktyką doradczą skoncentrowaną na gotowości kryzysowej, ćwiczeniach, facylitacji i decyzjach podejmowanych w warunkach niepewności.',
        'Jej podstawą jest doświadczenie z dwóch środowisk, w których bezpieczeństwo, koordynacja i jakość decyzji mają bezpośrednie znaczenie: żeglugi morskiej i lotnictwa.',
        'Założyciel ClearStance przez kilka lat pracował jako oficer wachtowy na statkach kontenerowych. Odpowiadał za bezpieczne prowadzenie statku i pracował w obszarach bezpieczeństwa operacyjnego oraz ochrony.',
        'Od 2018 roku jest związany z lotnictwem. Doświadczenie obejmuje role analityczne, projektowe i strategiczne, a także zarządzanie kryzysowe.'
      ],
      perspectiveTitle: 'Perspektywa operacyjna i zarządcza.',
      perspectiveText:
        'ClearStance łączy rozumienie realiów operacyjnych z pracą nad strukturami, procesami i decyzjami zarządczymi. Celem jest przygotowanie, które pozostaje użyteczne pod presją, a nie tylko poprawne na papierze.',
      cta: 'Skontaktuj się'
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
        failure:
          'Nie udało się wysłać wiadomości. Możesz napisać bezpośrednio na contact@clearstance.pl.',
        verification: 'Potwierdź weryfikację i spróbuj ponownie.',
        unavailable:
          'Formularz jest chwilowo niedostępny. Napisz bezpośrednio na contact@clearstance.pl.'
      }
    },
    insightsPage: {
      metaTitle: 'Insights - ClearStance',
      metaDescription:
        'Analizy i materiały ClearStance o gotowości kryzysowej, ćwiczeniach, facylitacji i decyzjach pod presją.',
      eyebrow: 'Insights',
      title: 'Praktyczne spojrzenie na gotowość.',
      lead:
        'Analizy dotyczące struktur, ćwiczeń, pracy zespołów i decyzji podejmowanych w warunkach niepewności.',
      read: 'Czytaj materiał',
      empty: 'Pierwsze publikacje pojawią się wkrótce.',
      back: 'Wróć do Insights',
      published: 'Data publikacji',
      updated: 'Aktualizacja',
      category: 'Kategoria',
      author: 'Autor',
      readingTime: 'Czas czytania',
      readingTimeUnit: 'min czytania',
      contents: 'Spis treści',
      related: 'Powiązane publikacje',
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
      nav: {
        approach: 'Approach',
        services: 'Services',
        insights: 'Insights',
        practice: 'How we work',
        experience: 'Experience',
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
        imageAlt: 'A lighthouse providing orientation in rough seas'
      },
      approach: {
        eyebrow: 'Our approach',
        title: 'Crisis readiness in practice.',
        lead:
          'Plans and procedures provide a framework for action. Real readiness also depends on whether a team understands its roles, can establish a shared operating picture and works to agreed principles.',
        body:
          'We combine the design of structures and procedures with exercises, facilitation and readiness reviews. This makes it possible to test assumptions, identify gaps and make corrections before a real event.',
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
          'Our experience also covers operational safety, security and work in safety-critical environments.',
        link: 'View all services'
      },
      readiness: {
        eyebrow: 'Readiness cycle',
        title: 'From orientation to action.',
        quote: sharedHome.readiness.quote,
        items: [
          {
            title: 'Understand',
            text: 'We organise information, dependencies and priorities to establish a shared operating picture.'
          },
          {
            title: 'Prepare',
            text: 'We define structures, roles, procedures, information flows and escalation principles.'
          },
          {
            title: 'Exercise',
            text: 'We test assumptions and team performance through realistic scenarios.'
          },
          {
            title: 'Respond',
            text: 'Preparation should enable coordinated action: escalation, information flow, communication and decision-making.'
          },
          {
            title: 'Improve',
            text: 'We turn lessons from exercises and events into actions that strengthen organisational readiness.'
          }
        ]
      },
      experience: {
        ...sharedHome.experience,
        title: 'Operational experience. Strategic perspective.',
        paragraphs: [
          'ClearStance is grounded in experience from two operational environments: maritime shipping and aviation.',
          'ClearStance’s founder spent several years as an Officer of the Watch on container ships, responsible for safe navigation and working across operational safety and security.',
          'Since 2018, he has worked in aviation, progressing from analytical and project roles to strategic responsibilities and crisis management.'
        ],
        closing:
          'This background combines an operational perspective with an understanding of organisations, processes and management decisions.',
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
          'We work with scenarios and problems grounded in the real operational environment. The result is a concrete change to structures, procedures, ways of working or team readiness.'
        ],
        items: [
          {
            title: 'Operational experience',
            text: 'Solutions grounded in the realities of how an organisation operates.'
          },
          {
            title: 'Cross-sector perspective',
            text: 'Experience from maritime shipping and aviation, complemented by work in safety, security and crisis management.'
          },
          {
            title: 'Facilitation',
            text: 'Structured work with teams, decisions and dependencies across functions.'
          },
          {
            title: 'Calm and precision',
            text: 'Clear language, proportionate solutions and a focus on what the organisation will actually use.'
          }
        ]
      },
      statement: {
        first: 'Uncertainty is part of the operating environment.',
        second: 'Chaos need not be.',
        source: 'ClearStance · readiness philosophy',
        imageAlt: 'A lighthouse casting a clear beam through darkness'
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
      closingTitle: 'Context first. Then the solution.',
      closingText:
        'We begin with the organisation’s operating model, dependencies and specific challenge. This keeps the scope proportionate, relevant and useful.',
      cta: 'Discuss the scope'
    },
    aboutPage: {
      metaTitle: 'About ClearStance - independent advisory practice',
      metaDescription:
        'ClearStance combines operational experience from maritime shipping and aviation with strategic and crisis management perspective.',
      eyebrow: 'About ClearStance',
      title: 'From the bridge to the boardroom.',
      lead: 'Operational experience. Strategic perspective.',
      storyTitle: 'An advisory practice grounded in operational experience.',
      paragraphs: [
        'ClearStance is an independent advisory practice focused on crisis readiness, exercises, facilitation and decision-making under uncertainty.',
        'It is grounded in experience from two environments where safety, coordination and decision quality have immediate consequences: maritime shipping and aviation.',
        'ClearStance’s founder spent several years as an Officer of the Watch on container ships. He was responsible for safe navigation and worked across operational safety and security.',
        'Since 2018, he has worked in aviation. His background spans analytical, project and strategic roles, as well as crisis management.'
      ],
      perspectiveTitle: 'Operational insight. Strategic perspective.',
      perspectiveText:
        'ClearStance connects an understanding of operational realities with work on structures, processes and management decisions. The objective is readiness that remains useful under pressure, not merely correct on paper.',
      cta: 'Get in touch'
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
        failure:
          'The message could not be sent. You can email contact@clearstance.pl directly.',
        verification: 'Complete the verification and try again.',
        unavailable:
          'The form is temporarily unavailable. Please email contact@clearstance.pl directly.'
      }
    },
    insightsPage: {
      metaTitle: 'Insights - ClearStance',
      metaDescription:
        'ClearStance analysis on crisis readiness, exercises, facilitation and decision-making under pressure.',
      eyebrow: 'Insights',
      title: 'A practical view of readiness.',
      lead:
        'Analysis of structures, exercises, team performance and decisions made under uncertainty.',
      read: 'Read insight',
      empty: 'The first publications will appear here soon.',
      back: 'Back to Insights',
      published: 'Publication date',
      updated: 'Updated',
      category: 'Category',
      author: 'Author',
      readingTime: 'Reading time',
      readingTimeUnit: 'min read',
      contents: 'Contents',
      related: 'Related Insights',
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
