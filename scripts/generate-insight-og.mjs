import { Buffer } from 'node:buffer';
import { readdir, readFile, mkdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { parse } from 'yaml';
import { resolveInsightEntryVisual } from '../src/lib/insight-visual-theme.ts';
import { getGeneratedInsightSocialImagePath } from '../src/lib/insights.ts';

const root = process.cwd();
const contentRoot = path.join(root, 'src/content/insights');
const outputRoot = path.join(root, 'public/images/insights/og');
const visualRoot = path.join(root, 'src/assets/visuals/insights');
const locales = ['pl', 'en'];
const expectedOutputs = new Set();

const visualSources = {
  'situation-field': await readFile(
    path.join(visualRoot, 'situation-field.svg'),
    'utf8'
  ),
  'decision-route': await readFile(
    path.join(visualRoot, 'decision-route.svg'),
    'utf8'
  ),
  'interface-map': await readFile(
    path.join(visualRoot, 'interface-map.svg'),
    'utf8'
  )
};

function readFrontmatter(source, file) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/u);
  if (!match) throw new Error(`${file}: missing YAML frontmatter.`);
  return parse(match[1]);
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function wrapTitle(title, maximumCharacters = 30) {
  const words = title.trim().split(/\s+/u);
  const lines = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (current && candidate.length > maximumCharacters) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);

  if (lines.length <= 3) return lines;
  return [lines[0], lines[1], lines.slice(2).join(' ')];
}

function formatDate(value, locale) {
  const date = value instanceof Date ? value : new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.valueOf())) throw new Error(`Invalid publication date: ${value}`);

  if (locale === 'pl') {
    return new Intl.DateTimeFormat('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'UTC'
    }).format(date);
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(date);
}

function getSymbol(theme) {
  const family = theme.startsWith('situation-field')
    ? 'situation-field'
    : theme.startsWith('decision-route')
      ? 'decision-route'
      : 'interface-map';
  const source = visualSources[family];
  const escapedTheme = theme.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
  const match = source.match(
    new RegExp(`<symbol\\s+id="${escapedTheme}"[^>]*>([\\s\\S]*?)<\\/symbol>`, 'u')
  );
  if (!match) throw new Error(`Missing SVG symbol: ${theme}`);

  return match[1]
    .replaceAll('var(--insight-visual-line, #385e5d)', '#a7bbb7')
    .replaceAll('var(--insight-visual-muted, #6f8f89)', '#829496')
    .replaceAll('var(--insight-visual-paper, #f2eee7)', '#081722')
    .replaceAll('var(--insight-visual-signal, #c65348)', '#c65348');
}

function renderOgSvg(entry, theme) {
  const lines = wrapTitle(entry.title);
  const lineHeight = 58;
  const lastBaseline = 505;
  const firstBaseline = lastBaseline - ((lines.length - 1) * lineHeight);
  const title = lines
    .map(
      (line, index) =>
        `<tspan x="64" y="${firstBaseline + (index * lineHeight)}">${escapeXml(line)}</tspan>`
    )
    .join('');
  const visual = theme
    ? `<svg x="750" y="104" width="420" height="289" viewBox="0 0 320 220" fill="none">${getSymbol(theme)}</svg>`
    : '';

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <rect width="1200" height="630" fill="#081722"/>
      <g transform="translate(64 48) scale(.75)" fill="none" stroke="#F8F6F2">
        <path d="M35 9a18 18 0 1 0 0 30" stroke-width="1.3"/>
        <path d="M31 15a12 12 0 1 0 0 18" stroke-width="1"/>
        <circle cx="36" cy="24" r="2.4" fill="#C65348" stroke="none"/>
      </g>
      <text x="110" y="75" fill="#f8f6f2" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700" letter-spacing="3">CLEARSTANCE</text>
      ${visual}
      <text fill="#f8f6f2" font-family="Arial, Helvetica, sans-serif" font-size="54" font-weight="500" letter-spacing="-1.9">${title}</text>
      <text x="64" y="558" fill="#a7bbb7" font-family="Courier New, monospace" font-size="11" font-weight="700" letter-spacing="1.4">${escapeXml(entry.category.toLocaleUpperCase(entry.locale === 'pl' ? 'pl-PL' : 'en-GB'))}  ·  ${escapeXml(formatDate(entry.publishedAt, entry.locale))}</text>
      <line x1="64" y1="590" x2="1136" y2="590" stroke="#f8f6f2" stroke-opacity=".16"/>
    </svg>
  `;
}

async function writeIfChanged(file, buffer) {
  try {
    const current = await readFile(file);
    if (current.equals(buffer)) return false;
  } catch {
    // The output does not exist yet.
  }
  await writeFile(file, buffer);
  return true;
}

let generated = 0;
let unchanged = 0;

for (const locale of locales) {
  const contentDirectory = path.join(contentRoot, locale);
  const outputDirectory = path.join(outputRoot, locale);
  await mkdir(outputDirectory, { recursive: true });
  const files = (await readdir(contentDirectory))
    .filter((file) => /\.(?:md|mdx)$/u.test(file))
    .sort();

  for (const file of files) {
    const source = await readFile(path.join(contentDirectory, file), 'utf8');
    const entry = readFrontmatter(source, file);
    if (entry.draft) continue;

    const resolution = resolveInsightEntryVisual({
      visualTheme: entry.visualTheme,
      category: entry.category
    });
    const theme = resolution.kind === 'micro-illustration'
      ? resolution.theme
      : undefined;
    const publicPath = getGeneratedInsightSocialImagePath(locale, entry.slug);
    const output = path.join(root, 'public', publicPath.slice(1));
    expectedOutputs.add(output);
    const buffer = await sharp(Buffer.from(renderOgSvg(entry, theme)))
      .webp({ quality: 90, effort: 5 })
      .toBuffer();
    const metadata = await sharp(buffer).metadata();
    if (metadata.width !== 1200 || metadata.height !== 630) {
      throw new Error(`${publicPath}: generated dimensions are not 1200 × 630.`);
    }
    if (await writeIfChanged(output, buffer)) generated += 1;
    else unchanged += 1;
  }
}

for (const locale of locales) {
  const outputDirectory = path.join(outputRoot, locale);
  for (const file of await readdir(outputDirectory)) {
    const absolutePath = path.join(outputDirectory, file);
    if (/\.webp$/u.test(file) && !expectedOutputs.has(absolutePath)) {
      await unlink(absolutePath);
    }
  }
}

console.log(
  `Insights OG: ${generated} generated, ${unchanged} unchanged, ${expectedOutputs.size} current.`
);
