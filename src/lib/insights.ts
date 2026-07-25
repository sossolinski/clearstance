import type { CollectionEntry } from 'astro:content';
import sharp from 'sharp';
import type { Locale } from '../i18n/routes';

export const DEFAULT_INSIGHTS_SOCIAL_IMAGE = '/social/clearstance-og.webp';
export const READING_WORDS_PER_MINUTE = 200;
export const RELATED_INSIGHTS_LIMIT = 3;

export type InsightEntry = CollectionEntry<'insights'>;

export interface InsightTaxonomy {
  category: string;
  tags: string[];
}

export interface InsightTaxonomyMatch {
  sameCategory: boolean;
  sharedTagCount: number;
}

interface InsightSocialImageFields {
  socialImage?: string;
  headerImage?: string;
}

export interface PublicImageDimensions {
  width: number;
  height: number;
}

const imageDimensionCache = new Map<string, Promise<PublicImageDimensions>>();

/**
 * Retrieve public Insights for an optional locale using the publication order
 * already established by the Insights indexes.
 */
export async function getPublishedInsights(
  locale?: Locale
): Promise<InsightEntry[]> {
  const { getCollection } = await import('astro:content');
  const entries = await getCollection(
    'insights',
    ({ data }) => !data.draft && (!locale || data.locale === locale)
  );

  return entries.sort(
    (first, second) =>
      second.data.publishedAt.valueOf() - first.data.publishedAt.valueOf()
  );
}

/**
 * Find a published translation pair by translationKey and opposite locale.
 */
export function getAlternateInsight(
  current: InsightEntry,
  publishedEntries: InsightEntry[]
): InsightEntry | undefined {
  const alternateLocale = current.data.locale === 'pl' ? 'en' : 'pl';

  return publishedEntries.find(
    (candidate) =>
      !candidate.data.draft &&
      candidate.data.locale === alternateLocale &&
      candidate.data.translationKey === current.data.translationKey
  );
}

/**
 * Normalize taxonomy values only for comparison. Source content remains
 * untouched and retains its editorial casing and spacing.
 */
export function normalizeTaxonomyValue(value: string): string {
  return value.trim().toLowerCase();
}

function getNormalizedTaxonomySet(values: string[]): Set<string> {
  return new Set(
    values
      .map(normalizeTaxonomyValue)
      .filter((value) => value.length > 0)
  );
}

/**
 * Compare category and tags without allowing duplicate tags to increase the
 * shared-tag count.
 */
export function getInsightTaxonomyMatch(
  current: InsightTaxonomy,
  candidate: InsightTaxonomy
): InsightTaxonomyMatch {
  const currentCategory = normalizeTaxonomyValue(current.category);
  const candidateCategory = normalizeTaxonomyValue(candidate.category);
  const sameCategory =
    currentCategory.length > 0 && currentCategory === candidateCategory;
  const currentTags = getNormalizedTaxonomySet(current.tags);
  const candidateTags = getNormalizedTaxonomySet(candidate.tags);
  let sharedTagCount = 0;

  for (const tag of currentTags) {
    if (candidateTags.has(tag)) sharedTagCount += 1;
  }

  return { sameCategory, sharedTagCount };
}

function getStableInsightKey(entry: InsightEntry): string {
  return `${entry.data.slug}\u0000${entry.id}`;
}

/**
 * Return at most three meaningfully related, same-locale published Insights.
 * Category match, shared-tag count, publication date and a stable entry key
 * form the deterministic ranking tuple.
 */
export function getRelatedInsights(
  current: InsightEntry,
  publishedEntries: InsightEntry[]
): InsightEntry[] {
  return publishedEntries
    .flatMap((candidate) => {
      const isCurrent =
        candidate.id === current.id ||
        (
          candidate.data.locale === current.data.locale &&
          candidate.data.slug === current.data.slug
        );

      if (
        candidate.data.draft ||
        candidate.data.locale !== current.data.locale ||
        isCurrent
      ) {
        return [];
      }

      const match = getInsightTaxonomyMatch(current.data, candidate.data);
      if (!match.sameCategory && match.sharedTagCount === 0) return [];

      return [{ entry: candidate, ...match }];
    })
    .sort((first, second) => {
      if (first.sameCategory !== second.sameCategory) {
        return first.sameCategory ? -1 : 1;
      }
      if (first.sharedTagCount !== second.sharedTagCount) {
        return second.sharedTagCount - first.sharedTagCount;
      }

      const dateDifference =
        second.entry.data.publishedAt.valueOf() -
        first.entry.data.publishedAt.valueOf();
      if (dateDifference !== 0) return dateDifference;

      const firstKey = getStableInsightKey(first.entry);
      const secondKey = getStableInsightKey(second.entry);
      if (firstKey < secondKey) return -1;
      if (firstKey > secondKey) return 1;
      return 0;
    })
    .slice(0, RELATED_INSIGHTS_LIMIT)
    .map(({ entry }) => entry);
}

/**
 * Resolve the image used by article metadata without changing the visible
 * header-image decision.
 */
export function resolveInsightSocialImage(
  insight: InsightSocialImageFields
): string {
  return (
    insight.socialImage ??
    insight.headerImage ??
    DEFAULT_INSIGHTS_SOCIAL_IMAGE
  );
}

/**
 * Return an editorial reading-time estimate from Markdown source. Code fences,
 * inline code, image syntax, link destinations, URLs and HTML tags are removed
 * before Unicode-aware word counting. The estimate uses a fixed 200 WPM rate.
 */
export function calculateReadingTime(markdown: string): number {
  const prose = markdown
    .replace(/^---\s*[\s\S]*?\s*---/u, ' ')
    .replace(/(?:^|\n)\s*(```|~~~)[^\n]*\n[\s\S]*?\n\s*\1(?=\n|$)/gu, ' ')
    .replace(/`[^`\n]*`/gu, ' ')
    .replace(/!\[[^\x5D]*\]\([^)]*\)/gu, ' ')
    .replace(/\[([^\x5D]+)\]\([^)]*\)/gu, '$1')
    .replace(/^\s*\[[^\x5D]+\]:\s+\S+.*$/gmu, ' ')
    .replace(/<https?:\/\/[^>]+>/giu, ' ')
    .replace(/\b(?:https?:\/\/|www\.)\S+/giu, ' ')
    .replace(/<[^>]+>/gu, ' ')
    .replace(/&(?:#\d+|#x[\da-f]+|[a-z][\da-z]+);/giu, ' ')
    .replace(/^\s{0,3}(?:#{1,6}|>|[-+*]\s|\d+[.)]\s)/gmu, ' ')
    .replace(/[|*_~]/gu, ' ');

  const words =
    prose.match(
      /[\p{L}\p{M}\p{N}]+(?:[’'-][\p{L}\p{M}\p{N}]+)*/gu
    ) ?? [];

  return Math.max(1, Math.ceil(words.length / READING_WORDS_PER_MINUTE));
}

/**
 * Read dimensions from a repository-hosted public image during the static
 * build. Paths are constrained to the public directory and cached per build.
 */
export function getPublicImageDimensions(
  imagePath: string
): Promise<PublicImageDimensions> {
  const cached = imageDimensionCache.get(imagePath);
  if (cached) return cached;

  const pending = (async () => {
    const pathname = imagePath.split(/[?#]/u, 1)[0];
    if (!pathname.startsWith('/')) {
      throw new Error(`Public image paths must start with "/": ${imagePath}`);
    }

    const relativePath = decodeURIComponent(pathname).replace(/^\/+/u, '');
    if (
      relativePath
        .split('/')
        .some((segment) => segment === '' || segment === '.' || segment === '..')
    ) {
      throw new Error(`Public image path escapes the public directory: ${imagePath}`);
    }

    const runtime = globalThis as typeof globalThis & {
      process: { cwd: () => string };
    };
    const filePath = `${runtime.process.cwd()}/public/${relativePath}`;
    const metadata = await sharp(filePath).metadata();
    if (!metadata.width || !metadata.height) {
      throw new Error(`Unable to determine image dimensions: ${imagePath}`);
    }

    return {
      width: metadata.width,
      height: metadata.height
    };
  })();

  imageDimensionCache.set(imagePath, pending);
  return pending;
}
