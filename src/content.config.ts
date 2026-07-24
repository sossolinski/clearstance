import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const optionalHeaderImage = z.preprocess(
  (value) => value === '' ? undefined : value,
  z
    .string()
    .regex(
      /^\/images\/insights\/[^/]+$/,
      'Header images must be repository-hosted under /public/images/insights.'
    )
    .optional()
);

const optionalHeaderImageAlt = z.preprocess(
  (value) => typeof value === 'string' && value.trim() === '' ? undefined : value,
  z.string().trim().optional()
);

const insights = defineCollection({
  loader: glob({
    base: './src/content/insights',
    pattern: '**/*.{md,mdx}'
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string(),
    slug: z.string(),
    locale: z.enum(['pl', 'en']),
    translationKey: z.string(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    headerImage: optionalHeaderImage,
    headerImageAlt: optionalHeaderImageAlt,
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
  })
});

export const collections = { insights };
