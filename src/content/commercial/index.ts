import type { Locale } from '../../i18n/routes';
import { protectPolishVisibleCopy } from '../../i18n/typography.js';
import { commercialEn } from './en';
import { commercialPl } from './pl';
import type { CommercialContent } from './types';

const content: Record<Locale, CommercialContent> = {
  pl: protectPolishVisibleCopy(commercialPl),
  en: commercialEn
};

export function getCommercialContent(locale: Locale): CommercialContent {
  return content[locale];
}

export type {
  AdvisoryContent,
  CapabilityContent,
  CommercialContent,
  ExecutiveContent,
  ExercisePhase,
  ExercisesContent,
  HomeCommercialContent
} from './types';
