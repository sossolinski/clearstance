import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const iconMapSource = await readFile(
  new URL('../src/lib/icon-map.ts', import.meta.url),
  'utf8'
);
const serviceIconsSource = await readFile(
  new URL('../src/lib/service-icons.ts', import.meta.url),
  'utf8'
);

test('the four offer areas use the accepted semantic icon mapping', () => {
  const assignedIcons = [
    ...serviceIconsSource.matchAll(/^\s{2}'([^']+)'[,]?$/gmu)
  ].map((match) => match[1]);

  assert.deepEqual(assignedIcons, [
    'network',
    'task-list',
    'message-text',
    'community'
  ]);
});

test('Iconoir assets are imported selectively as static SVG source', () => {
  const iconoirImports = [
    ...iconMapSource.matchAll(
      /^import\s+\w+\s+from\s+'(iconoir\/icons\/[^']+)'[;]$/gmu
    )
  ].map((match) => match[1]);

  assert.ok(iconoirImports.length > 0);
  assert.equal(iconMapSource.includes('iconoir-react'), false);
  assert.equal(iconMapSource.includes('iconoir/icons/index'), false);

  for (const importPath of iconoirImports) {
    assert.match(importPath, /^iconoir\/icons\/[a-z0-9-]+[.]svg[?]raw$/u);
  }
});

test('retired offer icon is absent from production imports and assignments', () => {
  assert.equal(iconMapSource.includes('refresh-double'), false);
  assert.equal(serviceIconsSource.includes('refresh-double'), false);
});
