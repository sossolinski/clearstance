export const INSIGHT_VISUAL_THEMES = [
  'situation-field-a',
  'situation-field-b',
  'decision-route-outbound',
  'decision-route-checkpoints',
  'interface-map-a',
  'interface-map-b'
] as const;

export type InsightVisualTheme = typeof INSIGHT_VISUAL_THEMES[number];

export const AUTOMATIC_INSIGHT_VISUAL_THEMES = [
  'situation-field-a',
  'decision-route-outbound',
  'decision-route-checkpoints',
  'interface-map-a'
] as const;

export type AutomaticInsightVisualTheme =
  typeof AUTOMATIC_INSIGHT_VISUAL_THEMES[number];

// Backwards-compatible alias for the accepted POC component API.
export type InsightVisualVariant = InsightVisualTheme;

export const INSIGHT_CATEGORY_KEYS = [
  'crisis-management',
  'crisis-communication',
  'exercises-and-simulations',
  'business-continuity'
] as const;

export type InsightCategoryKey = typeof INSIGHT_CATEGORY_KEYS[number];

export const CATEGORY_THEME_MAP: Readonly<
  Record<InsightCategoryKey, AutomaticInsightVisualTheme>
> =
  Object.freeze({
    'crisis-management': 'situation-field-a',
    'crisis-communication': 'decision-route-outbound',
    'exercises-and-simulations': 'decision-route-checkpoints',
    'business-continuity': 'interface-map-a'
  });

const CATEGORY_ALIASES: Readonly<Record<string, InsightCategoryKey>> = Object.freeze({
  'business continuity': 'business-continuity',
  'crisis communication': 'crisis-communication',
  'crisis management': 'crisis-management',
  'exercises & simulations': 'exercises-and-simulations',
  'exercises and simulations': 'exercises-and-simulations',
  'ćwiczenia i symulacje': 'exercises-and-simulations'
});

const visualThemeSet = new Set<string>(INSIGHT_VISUAL_THEMES);

export type InsightVisualResolution =
  | {
      kind: 'image';
      source: 'header-image';
      src: string;
    }
  | {
      kind: 'micro-illustration';
      source: 'visual-theme' | 'category';
      theme: InsightVisualTheme;
    }
  | {
      kind: 'typographic';
      source: 'fallback';
    };

export interface InsightVisualInput {
  headerImage?: string;
  visualTheme?: string;
  categoryKey?: InsightCategoryKey;
}

export interface InsightEntryVisualInput {
  headerImage?: string;
  visualTheme?: string;
  category: string;
}

/**
 * Convert an editorial category label to a neutral key using full-value,
 * explicit aliases. Source content is not changed and partial matches are
 * intentionally unsupported.
 */
export function getInsightCategoryKey(
  category: string
): InsightCategoryKey | undefined {
  return CATEGORY_ALIASES[category.trim().toLocaleLowerCase('pl-PL')];
}

export function isInsightVisualTheme(
  value: string
): value is InsightVisualTheme {
  return visualThemeSet.has(value);
}

/**
 * Resolve a future Insights visual without coupling the POC to Astro content.
 * An authored header image always wins; an invalid optional theme falls
 * through to the explicit neutral category key and then to typography.
 */
export function resolveInsightVisual(
  input: InsightVisualInput
): InsightVisualResolution {
  const headerImage = input.headerImage?.trim();
  if (headerImage) {
    return {
      kind: 'image',
      source: 'header-image',
      src: headerImage
    };
  }

  const visualTheme = input.visualTheme?.trim();
  if (visualTheme && isInsightVisualTheme(visualTheme)) {
    return {
      kind: 'micro-illustration',
      source: 'visual-theme',
      theme: visualTheme
    };
  }

  if (input.categoryKey) {
    return {
      kind: 'micro-illustration',
      source: 'category',
      theme: CATEGORY_THEME_MAP[input.categoryKey]
    };
  }

  return {
    kind: 'typographic',
    source: 'fallback'
  };
}

/**
 * Resolve directly from an Insights entry while keeping category aliases in
 * one explicit, full-value map.
 */
export function resolveInsightEntryVisual(
  input: InsightEntryVisualInput
): InsightVisualResolution {
  return resolveInsightVisual({
    headerImage: input.headerImage,
    visualTheme: input.visualTheme,
    categoryKey: getInsightCategoryKey(input.category)
  });
}
