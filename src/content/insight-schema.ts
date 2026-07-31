import { z } from 'astro/zod';
import { INSIGHT_VISUAL_THEMES } from '../lib/insight-visual-theme.ts';

export const INSIGHT_IDENTIFIER_PATTERN =
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const INSIGHT_MEDIA_PATH_PATTERN =
  /^\/images\/insights\/[^/]+\.(?:avif|gif|jpe?g|png|svg|webp)$/i;

const optionalInsightImage = z.preprocess(
  (value) => value === '' ? undefined : value,
  z
    .string()
    .regex(
      INSIGHT_MEDIA_PATH_PATTERN,
      'Insight images must be a supported repository-hosted image under /public/images/insights.'
    )
    .optional()
);

const optionalHeaderImageAlt = z.preprocess(
  (value) => typeof value === 'string' && value.trim() === '' ? undefined : value,
  z.string().trim().optional()
);

const optionalInsightVisualTheme = z.preprocess(
  (value) => value === '' ? undefined : value,
  z.enum(INSIGHT_VISUAL_THEMES).optional()
);

export const insightSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  author: z.string(),
  slug: z.string().regex(INSIGHT_IDENTIFIER_PATTERN),
  locale: z.enum(['pl', 'en']),
  translationKey: z.string().regex(INSIGHT_IDENTIFIER_PATTERN),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  headerImage: optionalInsightImage,
  headerImageAlt: optionalHeaderImageAlt,
  socialImage: optionalInsightImage,
  visualTheme: optionalInsightVisualTheme,
  seoTitle: z.string(),
  seoDescription: z.string()
}).superRefine((data, context) => {
  if (data.headerImage && !data.headerImageAlt) {
    context.addIssue({
      code: 'custom',
      path: ['headerImageAlt'],
      message: 'A meaningful image alternative text is required when headerImage is set.'
    });
  }

  if (
    data.updatedAt &&
    data.updatedAt.valueOf() < data.publishedAt.valueOf()
  ) {
    context.addIssue({
      code: 'custom',
      path: ['updatedAt'],
      message: 'updatedAt cannot be earlier than publishedAt.'
    });
  }
});

export const INSIGHT_SCHEMA_FIELDS = Object.freeze(
  Object.keys(insightSchema.shape)
);
