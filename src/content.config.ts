import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

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
    seoTitle: z.string(),
    seoDescription: z.string()
  })
});

export const collections = { insights };
