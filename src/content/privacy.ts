import type { Locale } from '../i18n/routes';
import { protectPolishVisibleCopy } from '../i18n/typography.js';

interface PrivacyLink {
  before: string;
  label: string;
  href: string;
}

interface PrivacySection {
  id: string;
  title: string;
  paragraphs: string[];
  items?: string[];
  externalLink?: PrivacyLink;
}

interface PrivacyContent {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  updated: string;
  controller: {
    title: string;
    description: string;
    contact: string;
    location: string;
  };
  sections: PrivacySection[];
}

const privacyContent: Record<Locale, PrivacyContent> = {
  pl: {
    metaTitle: 'Polityka prywatności - ClearStance',
    metaDescription:
      'Informacje o przetwarzaniu danych osobowych oraz technologiach wykorzystywanych w serwisie ClearStance.',
    eyebrow: 'Prywatność',
    title: 'Polityka prywatności.',
    lead:
      'Informacje o przetwarzaniu danych osobowych oraz technologiach wykorzystywanych w serwisie ClearStance.',
    updated: 'Ostatnia aktualizacja: 24 lipca 2026 r.',
    controller: {
      title: '1. Administrator danych',
      description:
        'Administratorem danych osobowych jest Sebastian Ossoliński, prowadzący działalność gospodarczą pod firmą Sebastian Ossoliński, NIP 7941800558, REGON 520446791, działający pod marką ClearStance.',
      contact: 'Kontakt w sprawach prywatności',
      location: 'Warszawa, Polska'
    },
    sections: [
      {
        id: 'data',
        title: '2. Zakres przetwarzanych danych',
        paragraphs: [
          'Serwis przetwarza wyłącznie dane potrzebne do obsługi kontaktu oraz zapewnienia bezpiecznego działania strony i formularza.'
        ],
        items: [
          'Formularz kontaktowy: imię i nazwisko, adres e-mail, organizacja, jeśli została podana, treść wiadomości, język formularza, adres strony źródłowej oraz czas wysłania.',
          'Korespondencja: informacje przekazane w dalszej wymianie wiadomości e-mail.',
          'Dane techniczne i bezpieczeństwa: adres IP, informacje o przeglądarce lub user-agent, podobne dane żądania, sygnały bezpieczeństwa Cloudflare i Turnstile, token weryfikacyjny Turnstile oraz wynik jego sprawdzenia.'
        ]
      },
      {
        id: 'purposes',
        title: '3. Cele i podstawy prawne',
        paragraphs: [
          'Dane z zapytań kontaktowych są przetwarzane w celu udzielenia odpowiedzi i prowadzenia korespondencji. Podstawą jest prawnie uzasadniony interes administratora, zgodnie z art. 6 ust. 1 lit. f RODO.',
          'Jeżeli zapytanie dotyczy możliwej współpracy lub działań przed zawarciem umowy, podstawą może być również art. 6 ust. 1 lit. b RODO, zależnie od okoliczności.',
          'Dane techniczne i sygnały bezpieczeństwa są przetwarzane w celu ochrony serwisu i formularza przed nadużyciami, botami, automatycznymi zgłoszeniami oraz atakami. Podstawą jest prawnie uzasadniony interes administratora, zgodnie z art. 6 ust. 1 lit. f RODO.'
        ]
      },
      {
        id: 'contact-form',
        title: '4. Formularz kontaktowy',
        paragraphs: [
          'Dane przesłane w formularzu służą wyłącznie do obsługi konkretnego zapytania. Adres e-mail osoby wysyłającej wiadomość jest używany do udzielenia odpowiedzi.',
          'Wysłanie formularza nie tworzy konta użytkownika ani automatycznego zapisu na komunikację marketingową. Formularz jest chroniony przez Cloudflare Turnstile.'
        ]
      },
      {
        id: 'turnstile',
        title: '5. Cloudflare Turnstile i bezpieczeństwo',
        paragraphs: [
          'ClearStance korzysta z Cloudflare Turnstile, aby odróżniać prawidłowych odwiedzających od ruchu automatycznego i chronić formularz kontaktowy. Turnstile działa w trybie Managed. Interakcja jest wyświetlana tylko wtedy, gdy Cloudflare uzna ją za potrzebną. Funkcja pre-clearance jest wyłączona.',
          'W tym celu Cloudflare może przetwarzać techniczne sygnały przeglądarki i bezpieczeństwa, w tym adres IP, user-agent, parametry połączenia, informacje o konfiguracji przeglądarki i urządzenia, krótkotrwałe identyfikatory urządzenia lub bezpieczeństwa, sitekey i powiązane pochodzenie oraz wynik oceny ruchu.',
          'Turnstile nie jest opisywany jako całkowicie anonimowy. Token weryfikacyjny jest przesyłany do serwera ClearStance i sprawdzany przez usługę Cloudflare przed przyjęciem wiadomości.'
        ],
        externalLink: {
          before: 'Więcej informacji znajduje się w\u00a0',
          label: 'informacji o prywatności Cloudflare Turnstile',
          href: 'https://www.cloudflare.com/turnstile-privacy-policy/'
        }
      },
      {
        id: 'cookies',
        title: '6. Cookies i podobne technologie',
        paragraphs: [
          'ClearStance nie używa obecnie reklamowych ani marketingowych plików cookie, plików cookie do profilowania behawioralnego, zewnętrznych pikseli reklamowych ani analitycznych plików cookie wymagających zgody. Kod publicznej strony nie zapisuje danych w localStorage ani sessionStorage i nie zawiera skryptu analitycznego.',
          'Infrastruktura i mechanizmy bezpieczeństwa Cloudflare mogą, zależnie od zdarzenia bezpieczeństwa i aktywnej usługi, zapisywać lub odczytywać technicznie niezbędne pliki cookie albo podobne identyfikatory. Mogą one służyć do ochrony serwisu, odróżniania złośliwego lub automatycznego ruchu, utrzymania stanu wyzwania oraz stosowania ograniczeń bezpieczeństwa lub liczby żądań.',
          'Takie mechanizmy nie są wykorzystywane przez ClearStance do reklamy ani marketingu behawioralnego. Ponieważ serwis nie korzysta z nieistotnych mechanizmów wymagających zgody, nie wyświetla banera Akceptuj lub Odrzuć.'
        ],
        externalLink: {
          before:
            'Aktualne informacje o plikach cookie Cloudflare są dostępne w\u00a0',
          label: 'dokumentacji Cloudflare Cookies',
          href: 'https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/'
        }
      },
      {
        id: 'recipients',
        title: '7. Odbiorcy danych',
        paragraphs: [
          'Dane mogą być udostępniane wyłącznie kategoriom odbiorców potrzebnym do działania serwisu i obsługi korespondencji. ClearStance nie sprzedaje danych osobowych.'
        ],
        items: [
          'Dostawcy hostingu, CDN, infrastruktury i usług bezpieczeństwa, w tym Cloudflare.',
          'Dostawcy usług poczty elektronicznej wykorzystywani do doręczenia i obsługi korespondencji.',
          'Dostawcy usług technicznych lub IT, jeżeli dostęp do danych jest niezbędny do realizacji ich zadań.'
        ]
      },
      {
        id: 'transfers',
        title: '8. Przekazywanie danych poza EOG',
        paragraphs: [
          'Dostawcy wykorzystywani przez ClearStance mogą przetwarzać dane poza Europejskim Obszarem Gospodarczym. Jeżeli wymagają tego przepisy, przekazanie odbywa się na podstawie mechanizmów dopuszczonych przez RODO, takich jak decyzja stwierdzająca odpowiedni stopień ochrony lub odpowiednie zabezpieczenia umowne. Konkretny mechanizm zależy od dostawcy, usługi i miejsca przetwarzania.'
        ]
      },
      {
        id: 'retention',
        title: '9. Okres przechowywania',
        paragraphs: [
          'Korespondencja jest przechowywana przez okres potrzebny do obsługi zapytania. Następnie może być zachowana, jeżeli jest to potrzebne do udokumentowania kontaktu albo ustalenia, dochodzenia lub obrony roszczeń.',
          'Jeżeli korespondencja prowadzi do relacji umownej, odpowiednie dane mogą być przechowywane przez okres wynikający z obowiązujących wymogów prawnych, księgowych lub umownych.',
          'Dane techniczne i bezpieczeństwa są przechowywane zgodnie ze sposobem działania oraz okresami retencji właściwej infrastruktury bezpieczeństwa.'
        ]
      },
      {
        id: 'rights',
        title: '10. Prawa osoby',
        paragraphs: [
          'W zależności od podstawy prawnej i okoliczności przetwarzania osoba może żądać dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania lub przenoszenia, a także wnieść sprzeciw.',
          'W sprawie realizacji praw można napisać na contact@clearstance.pl. Osobie przysługuje również prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.'
        ]
      },
      {
        id: 'automated-decisions',
        title: '11. Zautomatyzowane podejmowanie decyzji',
        paragraphs: [
          'ClearStance nie wykorzystuje danych przesłanych w formularzu do zautomatyzowanego podejmowania decyzji ani profilowania marketingowego. Automatyczna ocena bezpieczeństwa wykonywana przez Cloudflare służy wyłącznie ochronie serwisu i nie stanowi decyzji umownej dotyczącej odwiedzającego.'
        ]
      },
      {
        id: 'changes',
        title: '12. Zmiany polityki',
        paragraphs: [
          'Polityka może być aktualizowana, gdy zmienia się sposób działania serwisu, wykorzystywane usługi lub obowiązujące wymagania. Data ostatniej aktualizacji jest wskazana na początku dokumentu.'
        ]
      }
    ]
  },
  en: {
    metaTitle: 'Privacy Policy - ClearStance',
    metaDescription:
      'Information about how ClearStance processes personal data and the technologies used by the website.',
    eyebrow: 'Privacy',
    title: 'Privacy policy.',
    lead:
      'Information about how ClearStance processes personal data and the technologies used by the website.',
    updated: 'Last updated: 24 July 2026',
    controller: {
      title: '1. Data controller',
      description:
        'The controller of personal data is Sebastian Ossoliński, a sole trader operating under the business name Sebastian Ossoliński, Polish Tax Identification Number (NIP) 7941800558 and REGON 520446791, operating under the ClearStance brand.',
      contact: 'Privacy contact',
      location: 'Warsaw, Poland'
    },
    sections: [
      {
        id: 'data',
        title: '2. Data we process',
        paragraphs: [
          'The website processes only the data needed to handle enquiries and keep the website and contact form secure.'
        ],
        items: [
          'Contact form data: name, email address, organisation if provided, message content, form language, source page URL, and submission time.',
          'Correspondence data: information included in subsequent email exchanges.',
          'Technical and security data: IP address, browser or user-agent information, similar request data, Cloudflare and Turnstile security signals, the Turnstile verification token, and its validation result.'
        ]
      },
      {
        id: 'purposes',
        title: '3. Purposes and legal bases',
        paragraphs: [
          'Enquiry data is processed to respond and conduct related correspondence. The legal basis is the controller’s legitimate interest under Article 6(1)(f) GDPR.',
          'Where an enquiry concerns potential cooperation or steps before entering into a contract, Article 6(1)(b) GDPR may also apply, depending on the circumstances.',
          'Technical data and security signals are processed to protect the website and form against abuse, bots, automated submissions, and attacks. The legal basis is the controller’s legitimate interest under Article 6(1)(f) GDPR.'
        ]
      },
      {
        id: 'contact-form',
        title: '4. Contact form',
        paragraphs: [
          'Information submitted through the form is used only to handle the specific enquiry. The sender’s email address is used to reply.',
          'Submitting the form does not create a user account or an automatic marketing subscription. The form is protected by Cloudflare Turnstile.'
        ]
      },
      {
        id: 'turnstile',
        title: '5. Cloudflare Turnstile and security',
        paragraphs: [
          'ClearStance uses Cloudflare Turnstile to distinguish legitimate visitors from automated traffic and protect the contact form. Turnstile operates in Managed mode. It presents an interaction only when Cloudflare considers one necessary. Pre-clearance is disabled.',
          'For this purpose, Cloudflare may process technical browser and security signals, including IP address, user-agent, connection parameters, browser and device configuration information, short-lived device or security identifiers, the sitekey and associated origin, and the traffic assessment result.',
          'Turnstile is not described as completely anonymous. The verification token is sent to the ClearStance server and validated with Cloudflare before the message is accepted.'
        ],
        externalLink: {
          before: 'More information is available in the ',
          label: 'Cloudflare Turnstile Privacy Addendum',
          href: 'https://www.cloudflare.com/turnstile-privacy-policy/'
        }
      },
      {
        id: 'cookies',
        title: '6. Cookies and similar technologies',
        paragraphs: [
          'ClearStance does not currently use advertising or marketing cookies, behavioural profiling cookies, third-party advertising pixels, or analytics cookies requiring consent. The public website code does not write to localStorage or sessionStorage and contains no analytics script.',
          'Cloudflare infrastructure and security functions may, depending on a security event and the active service, store or access technically necessary cookies or similar identifiers. These mechanisms may protect the service, distinguish malicious or automated traffic, maintain challenge state, and apply security or request-rate controls.',
          'ClearStance does not use these mechanisms for advertising or behavioural marketing. Because the website does not use non-essential mechanisms requiring consent, it does not display an Accept or Reject banner.'
        ],
        externalLink: {
          before: 'Current information about Cloudflare cookies is available in the ',
          label: 'Cloudflare Cookies documentation',
          href: 'https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/'
        }
      },
      {
        id: 'recipients',
        title: '7. Recipients',
        paragraphs: [
          'Data may be disclosed only to categories of recipients needed to operate the website and handle correspondence. ClearStance does not sell personal data.'
        ],
        items: [
          'Hosting, CDN, infrastructure, and security providers, including Cloudflare.',
          'Email service providers used to deliver and handle correspondence.',
          'Technical or IT service providers where access is necessary to perform their work.'
        ]
      },
      {
        id: 'transfers',
        title: '8. International transfers',
        paragraphs: [
          'Providers used by ClearStance may process data outside the European Economic Area. Where required, transfers rely on mechanisms permitted by GDPR, such as an adequacy decision or appropriate contractual safeguards. The applicable mechanism depends on the provider, service, and processing location.'
        ]
      },
      {
        id: 'retention',
        title: '9. Retention',
        paragraphs: [
          'Correspondence is retained for as long as needed to handle the enquiry. It may then be kept where necessary to document the exchange or to establish, pursue, or defend legal claims.',
          'If the correspondence results in a contractual relationship, relevant data may be retained for periods arising from applicable legal, accounting, or contractual requirements.',
          'Technical and security data is retained according to the operation and retention periods of the relevant security infrastructure.'
        ]
      },
      {
        id: 'rights',
        title: '10. Your rights',
        paragraphs: [
          'Depending on the legal basis and circumstances, you may request access, rectification, erasure, restriction, or portability of your data, and you may object to processing.',
          'To exercise your rights, email contact@clearstance.pl. You also have the right to lodge a complaint with the President of the Personal Data Protection Office in Poland.'
        ]
      },
      {
        id: 'automated-decisions',
        title: '11. Automated decision-making',
        paragraphs: [
          'ClearStance does not use information submitted through the contact form for automated decision-making or marketing profiling. Cloudflare’s automated security assessment is used only to protect the website and does not make contractual decisions about a visitor.'
        ]
      },
      {
        id: 'changes',
        title: '12. Changes to this policy',
        paragraphs: [
          'This policy may be updated when the website, the services it uses, or applicable requirements change. The latest revision date appears at the beginning of this document.'
        ]
      }
    ]
  }
};

export function getPrivacyContent(locale: Locale): PrivacyContent {
  return locale === 'pl'
    ? protectPolishVisibleCopy(privacyContent.pl)
    : privacyContent.en;
}
