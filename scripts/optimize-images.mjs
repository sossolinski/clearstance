import { access, mkdir, stat } from 'node:fs/promises';
import { basename, dirname, extname } from 'node:path';
import sharp from 'sharp';

const images = [
  ['public/images/hero-navigation.jpg', 'public/images/hero-navigation.webp']
];
const responsiveWidths = [640, 960, 1440];
const experienceImages = [
  {
    source: 'assets/experience/source/experience-maritime-home-master.png',
    outputName: 'experience-maritime-home',
    widths: [480, 720, 960],
    aspect: [4, 5]
  },
  {
    source: 'assets/experience/source/experience-aviation-home-master.png',
    outputName: 'experience-aviation-home',
    widths: [480, 720, 960],
    aspect: [4, 5]
  },
  {
    source: 'assets/experience/source/experience-maritime-about-master.png',
    outputName: 'experience-maritime-about',
    widths: [640, 960, 1280],
    aspect: [16, 10]
  },
  {
    source: 'assets/experience/source/experience-aviation-about-master.png',
    outputName: 'experience-aviation-about',
    widths: [640, 960, 1280],
    aspect: [16, 10]
  }
];

await mkdir('public/social', { recursive: true });
await mkdir('public/images/experience', { recursive: true });

for (const [source, destination] of images) {
  const outputDirectory = dirname(destination);
  const outputName = basename(destination, extname(destination));

  await Promise.all(
    responsiveWidths.map((width) =>
      sharp(source)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82, effort: 5 })
        .toFile(`${outputDirectory}/${outputName}-${width}.webp`)
    )
  );

  await sharp(source)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(destination);
}

await sharp('public/images/hero-navigation.jpg')
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .webp({ quality: 84, effort: 5 })
  .toFile('public/social/clearstance-og.webp');

const experienceOutputs = [];

for (const image of experienceImages) {
  try {
    await access(image.source);
  } catch {
    throw new Error(`Missing Experience master: ${image.source}`);
  }

  const [aspectWidth, aspectHeight] = image.aspect;

  for (const width of image.widths) {
    const height = Math.round((width * aspectHeight) / aspectWidth);

    for (const format of ['avif', 'webp']) {
      const output = `public/images/experience/${image.outputName}-${width}.${format}`;
      const pipeline = sharp(image.source).resize(width, height, {
        fit: 'cover',
        position: 'centre',
        withoutEnlargement: true
      });

      if (format === 'avif') {
        await pipeline.avif({ quality: 54, effort: 5 }).toFile(output);
      } else {
        await pipeline.webp({ quality: 78, effort: 5 }).toFile(output);
      }

      const { size } = await stat(output);
      experienceOutputs.push({ output, width, height, size });
    }
  }
}

console.log('Optimized the legacy hero-navigation source and refreshed the social preview.');
console.log('Generated Experience variants:');
for (const output of experienceOutputs) {
  console.log(
    `- ${output.output}: ${output.width}x${output.height}, ${(output.size / 1024).toFixed(1)} KiB`
  );
}
