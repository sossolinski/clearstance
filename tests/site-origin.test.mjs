import assert from 'node:assert/strict';
import test from 'node:test';
import {
  LEGACY_SITE_ORIGIN,
  TARGET_SITE_ORIGIN,
  resolveSiteOrigin
} from '../scripts/site-origin.mjs';

test('keeps clearstance.pl as the safe default until cutover', () => {
  assert.equal(resolveSiteOrigin(undefined), LEGACY_SITE_ORIGIN);
});

test('accepts only the approved clearstance.eu migration origin', () => {
  assert.equal(resolveSiteOrigin(TARGET_SITE_ORIGIN), TARGET_SITE_ORIGIN);
  assert.equal(resolveSiteOrigin(`${TARGET_SITE_ORIGIN}/`), TARGET_SITE_ORIGIN);
});

test('rejects unsafe or unapproved canonical origins', () => {
  for (const value of [
    'http://clearstance.eu',
    'https://www.clearstance.eu',
    'https://clearstance.eu/path',
    'https://clearstance.eu?preview=true',
    ' https://clearstance.eu',
    'https://example.com'
  ]) {
    assert.throws(() => resolveSiteOrigin(value));
  }
});
