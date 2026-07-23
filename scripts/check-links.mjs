import { access, readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve('dist');
await access(dist);

async function walk(directory) {
  const entries = await readdir(directory);
  const files = [];
  for (const entry of entries) {
    const target = path.join(directory, entry);
    if ((await stat(target)).isDirectory()) files.push(...await walk(target));
    else files.push(target);
  }
  return files;
}

const htmlFiles = (await walk(dist)).filter((file) => file.endsWith('.html'));
const errors = [];

function routeCandidates(href) {
  const route = href.split('#')[0].split('?')[0];
  if (!route || route === '/') return [path.join(dist, 'index.html')];
  const relative = route.replace(/^\/+|\/+$/g, '');
  if (path.extname(relative)) return [path.join(dist, relative)];
  return [
    path.join(dist, `${relative}.html`),
    path.join(dist, relative, 'index.html')
  ];
}

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const links = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
  for (const href of links) {
    if (
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.startsWith('#') ||
      href.startsWith('/_astro/')
    ) continue;

    const exists = await Promise.any(
      routeCandidates(href).map((candidate) => access(candidate))
    ).then(() => true).catch(() => false);

    if (!exists) errors.push(`${path.relative(dist, file)} -> ${href}`);
  }
}

if (errors.length) {
  console.error(`Broken internal links:\n${errors.join('\n')}`);
  process.exit(1);
}

console.log(`Checked ${htmlFiles.length} generated HTML files: no broken internal links.`);
