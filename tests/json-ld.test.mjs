import assert from 'node:assert/strict';
import test from 'node:test';
import { serializeJsonLd } from '../src/lib/json-ld.ts';

test('serializes JSON-LD without allowing data to close the script element', () => {
  const payload = {
    headline: '</script><script>alert(1)</script>',
    nested: {
      value: 'The semantic value must remain unchanged.'
    }
  };
  const serialized = serializeJsonLd(payload);

  assert.equal(serialized.includes('</script>'), false);
  assert.match(serialized, /\\u003c\/script>/u);
  assert.deepEqual(JSON.parse(serialized), payload);
});

test('rejects values that JSON cannot serialize at the root', () => {
  assert.throws(
    () => serializeJsonLd(undefined),
    /must be JSON-serializable/u
  );
});
