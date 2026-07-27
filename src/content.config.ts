import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { insightSchema } from './content/insight-schema';

const insights = defineCollection({
  loader: glob({
    base: './src/content/insights',
    pattern: '**/*.{md,mdx}'
  }),
  schema: insightSchema
});

export const collections = { insights };
