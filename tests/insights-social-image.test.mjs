import assert from 'node:assert/strict';
import test from 'node:test';
import {
  getGeneratedInsightSocialImagePath,
  resolveInsightSocialImage
} from '../src/lib/insights.ts';

test('builds a localized, article-specific generated social image path', () => {
  assert.equal(
    getGeneratedInsightSocialImagePath('pl', 'przykladowy-artykul'),
    '/images/insights/og/pl/przykladowy-artykul.webp'
  );
  assert.equal(
    getGeneratedInsightSocialImagePath('en', 'example-article'),
    '/images/insights/og/en/example-article.webp'
  );
});

test('uses an authored social image before the generated article composition', () => {
  assert.equal(
    resolveInsightSocialImage({
      locale: 'en',
      slug: 'example-article',
      socialImage: '/images/insights/authored.webp'
    }),
    '/images/insights/authored.webp'
  );
  assert.equal(
    resolveInsightSocialImage({
      locale: 'en',
      slug: 'example-article'
    }),
    '/images/insights/og/en/example-article.webp'
  );
});
