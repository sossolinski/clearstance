/**
 * Serialize structured data for an inline application/ld+json element.
 *
 * JSON permits a literal "<", but HTML parsing would treat a matching
 * "</script>" sequence as the end of the element. Encoding the character as a
 * JSON Unicode escape preserves the parsed value while keeping it inert in
 * HTML. The two line separator escapes also keep the output safe for older
 * JavaScript-aware tooling.
 */
export function serializeJsonLd(value: unknown): string {
  const serialized = JSON.stringify(value);

  if (serialized === undefined) {
    throw new TypeError('JSON-LD value must be JSON-serializable.');
  }

  return serialized
    .replaceAll('<', '\\u003c')
    .replaceAll('\u2028', '\\u2028')
    .replaceAll('\u2029', '\\u2029');
}
