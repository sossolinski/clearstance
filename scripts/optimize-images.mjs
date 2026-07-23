import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const images = [
  ['public/images/hero-navigation.jpg', 'public/images/hero-navigation.webp'],
  ['public/images/operational-briefing.jpg', 'public/images/operational-briefing.webp'],
  ['public/images/brand-statement.jpg', 'public/images/brand-statement.webp']
];

await mkdir('public/social', { recursive: true });

for (const [source, destination] of images) {
  await sharp(source)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(destination);
}

await sharp('public/images/hero-navigation.jpg')
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .webp({ quality: 84, effort: 5 })
  .toFile('public/social/clearstance-og.webp');

console.log('Optimized three approved images and generated the social preview.');
