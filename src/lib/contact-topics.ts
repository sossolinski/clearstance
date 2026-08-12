import type { Locale } from '../i18n/routes';

export const CONTACT_TOPICS = [
  'general',
  'advisory',
  'crisis-readiness-review',
  'exercises',
  'executive-tabletop'
] as const;

export type ContactTopic = typeof CONTACT_TOPICS[number];

const topicSet = new Set<string>(CONTACT_TOPICS);

export function isContactTopic(value: unknown): value is ContactTopic {
  return typeof value === 'string' && topicSet.has(value);
}

export function resolveContactTopic(value: unknown): ContactTopic {
  return isContactTopic(value) ? value : 'general';
}

const labels: Record<Locale, Record<ContactTopic, string>> = {
  pl: {
    general: 'Zapytanie ogólne',
    advisory: 'Doradztwo',
    'crisis-readiness-review': 'Crisis Readiness Review',
    exercises: 'Ćwiczenia kryzysowe',
    'executive-tabletop': 'Executive Tabletop Exercise'
  },
  en: {
    general: 'General enquiry',
    advisory: 'Advisory',
    'crisis-readiness-review': 'Crisis Readiness Review',
    exercises: 'Crisis exercises',
    'executive-tabletop': 'Executive Tabletop Exercise'
  }
};

export function getContactTopicLabel(
  locale: Locale,
  topic: ContactTopic
): string {
  return labels[locale][topic];
}

export function getContactPathWithTopic(
  locale: Locale,
  topic: ContactTopic
): string {
  const path = locale === 'pl' ? '/kontakt/' : '/en/contact/';
  return `${path}?topic=${encodeURIComponent(topic)}`;
}
