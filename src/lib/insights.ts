import sharp from 'sharp';

export const DEFAULT_INSIGHTS_SOCIAL_IMAGE = '/social/clearstance-og.webp';
export const READING_WORDS_PER_MINUTE = 200;

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
