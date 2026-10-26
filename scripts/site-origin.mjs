export const LEGACY_SITE_ORIGIN = 'https://clearstance.pl';
export const TARGET_SITE_ORIGIN = 'https://clearstance.eu';

const APPROVED_SITE_ORIGINS = new Set([
  LEGACY_SITE_ORIGIN,
  TARGET_SITE_ORIGIN
]);

export function resolveSiteOrigin(
  value = process.env.CLEARSTANCE_SITE_ORIGIN
) {
  const candidate = value ?? LEGACY_SITE_ORIGIN;

  if (candidate !== candidate.trim()) {
    throw new Error('CLEARSTANCE_SITE_ORIGIN must not contain whitespace.');
  }

  let url;

  try {
    url = new URL(candidate);
  } catch {
    throw new Error('CLEARSTANCE_SITE_ORIGIN must be an absolute URL.');
  }

  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.pathname !== '/' ||
    url.search ||
    url.hash ||
    !APPROVED_SITE_ORIGINS.has(url.origin)
  ) {
    throw new Error(
      `CLEARSTANCE_SITE_ORIGIN must be ${LEGACY_SITE_ORIGIN} or ${TARGET_SITE_ORIGIN}.`
    );
  }

  return url.origin;
}
