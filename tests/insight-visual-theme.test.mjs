import assert from 'node:assert/strict';
import test from 'node:test';
import {
  getInsightCategoryKey,
  resolveInsightEntryVisual,
  resolveInsightVisual
} from '../src/lib/insight-visual-theme.ts';

test('resolves an authored header image before every automated option', () => {
  assert.deepEqual(
    resolveInsightVisual({
      headerImage: '/images/insights/authored.webp',
      visualTheme: 'interface-map-b',
      categoryKey: 'crisis-management'
    }),
    {
      kind: 'image',
      source: 'header-image',
      src: '/images/insights/authored.webp'
    }
  );
});

test('resolves an explicit valid theme before a category mapping', () => {
  assert.deepEqual(
    resolveInsightVisual({
      visualTheme: 'decision-route-outbound',
      categoryKey: 'business-continuity'
    }),
    {
      kind: 'micro-illustration',
      source: 'visual-theme',
      theme: 'decision-route-outbound'
    }
  );
});

test('uses a neutral category key when no authored visual is available', () => {
  assert.deepEqual(
    resolveInsightVisual({ categoryKey: 'exercises-and-simulations' }),
    {
      kind: 'micro-illustration',
      source: 'category',
      theme: 'decision-route-checkpoints'
    }
  );
});

test('automatic category mapping uses only the four accepted production variants', () => {
  assert.deepEqual(
    resolveInsightEntryVisual({ category: 'Crisis Management' }),
    {
      kind: 'micro-illustration',
      source: 'category',
      theme: 'situation-field-a'
    }
  );
  assert.deepEqual(
    resolveInsightEntryVisual({ category: 'Business Continuity' }),
    {
      kind: 'micro-illustration',
      source: 'category',
      theme: 'interface-map-a'
    }
  );
});

test('reserve variants are available only through an explicit visual theme', () => {
  assert.deepEqual(
    resolveInsightEntryVisual({
      category: 'Crisis Management',
      visualTheme: 'situation-field-b'
    }),
    {
      kind: 'micro-illustration',
      source: 'visual-theme',
      theme: 'situation-field-b'
    }
  );
  assert.deepEqual(
    resolveInsightEntryVisual({
      category: 'Business Continuity',
      visualTheme: 'interface-map-b'
    }),
    {
      kind: 'micro-illustration',
      source: 'visual-theme',
      theme: 'interface-map-b'
    }
  );
});

test('falls through invalid optional values to category and typography', () => {
  assert.deepEqual(
    resolveInsightVisual({
      headerImage: '  ',
      visualTheme: 'not-a-theme',
      categoryKey: 'crisis-communication'
    }),
    {
      kind: 'micro-illustration',
      source: 'category',
      theme: 'decision-route-outbound'
    }
  );
  assert.deepEqual(resolveInsightVisual({ visualTheme: 'not-a-theme' }), {
    kind: 'typographic',
    source: 'fallback'
  });
});

test('category aliases use complete normalized values, never partial matches', () => {
  assert.equal(getInsightCategoryKey('Crisis Management'), 'crisis-management');
  assert.equal(getInsightCategoryKey('  CRISIS MANAGEMENT  '), 'crisis-management');
  assert.equal(
    getInsightCategoryKey('Ćwiczenia i symulacje'),
    'exercises-and-simulations'
  );
  assert.equal(
    getInsightCategoryKey('Exercises & Simulations'),
    'exercises-and-simulations'
  );
  assert.equal(getInsightCategoryKey('Crisis'), undefined);
  assert.equal(getInsightCategoryKey('Advanced Crisis Management'), undefined);
});

test('an unknown category produces the intentional typographic fallback', () => {
  assert.deepEqual(resolveInsightEntryVisual({ category: 'Unmapped category' }), {
    kind: 'typographic',
    source: 'fallback'
  });
});
