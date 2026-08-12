export type Locale = 'pl' | 'en';
export type PageKey =
  | 'home'
  | 'services'
  | 'exercises'
  | 'executiveTabletop'
  | 'insights'
  | 'about'
  | 'contact'
  | 'privacy';

export const routes: Record<Locale, Record<PageKey, string>> = {
  pl: {
    home: '/',
    services: '/oferta/',
    exercises: '/cwiczenia-kryzysowe/',
    executiveTabletop: '/cwiczenia-kryzysowe/executive-tabletop/',
    insights: '/insights/',
    about: '/o-clearstance/',
    contact: '/kontakt/',
    privacy: '/polityka-prywatnosci/'
  },
  en: {
    home: '/en/',
    services: '/en/services/',
    exercises: '/en/exercises/',
    executiveTabletop: '/en/exercises/executive-tabletop/',
    insights: '/en/insights/',
    about: '/en/about/',
    contact: '/en/contact/',
    privacy: '/en/privacy/'
  }
};

export const homeAnchors = {
  approach: 'approach',
  services: 'services',
  readiness: 'readiness',
  experience: 'experience',
  practice: 'practice',
  contact: 'contact'
} as const;

const localizedAnchors: Record<Locale, Record<keyof typeof homeAnchors, string>> = {
  pl: {
    approach: 'podejscie',
    services: 'oferta',
    readiness: 'gotowosc',
    experience: 'doswiadczenie',
    practice: 'praktyka',
    contact: 'kontakt'
  },
  en: {
    approach: 'approach',
    services: 'services',
    readiness: 'readiness',
    experience: 'experience',
    practice: 'practice',
    contact: 'contact'
  }
};

export function getRoute(locale: Locale, page: PageKey): string {
  return routes[locale][page];
}

export function getHomeAnchor(
  locale: Locale,
  section: keyof typeof homeAnchors,
  onHomepage = false
): string {
  const hash = `#${localizedAnchors[locale][section]}`;
  return onHomepage ? hash : `${routes[locale].home}${hash}`;
}

export function getArticlePath(locale: Locale, slug: string): string {
  return locale === 'pl' ? `/insights/${slug}/` : `/en/insights/${slug}/`;
}

export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'pl' ? 'pl-PL' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}
