const POLISH_ONE_LETTER_WORD = /(?<![\p{L}\p{N}])([aiouwz])[ \t]+(?=\S)/giu;
const POLISH_TRAILING_ONE_LETTER_WORD = /(?<![\p{L}\p{N}])([aiouwz])[ \t]+$/iu;
const PROSE_CONTAINER_TYPES = new Set([
  'delete',
  'emphasis',
  'link',
  'linkReference',
  'strong'
]);
const NON_VISIBLE_COPY_KEYS = new Set([
  'anchor',
  'hash',
  'homeLabel',
  'id',
  'imageAlt',
  'languageNavigation',
  'mainNavigation',
  'meta',
  'metaDescription',
  'metaTitle',
  'menuClose',
  'menuOpen',
  'route'
]);
const VOID_HTML_ELEMENTS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
]);

/**
 * Keep Polish one-letter conjunctions and prepositions with the word that
 * follows. This helper is intended for visible prose, not metadata or machine
 * values.
 *
 * @param {string} value
 * @returns {string}
 */
export function protectPolishOneLetterWords(value) {
  return value.replace(POLISH_ONE_LETTER_WORD, '$1\u00A0');
}

/**
 * Apply Polish line-breaking typography recursively to a visible-copy object.
 *
 * @template T
 * @param {T} value
 * @returns {T}
 */
export function protectPolishVisibleCopy(value) {
  if (typeof value === 'string') {
    return /** @type {T} */ (protectPolishOneLetterWords(value));
  }

  if (Array.isArray(value)) {
    return /** @type {T} */ (value.map((item) => protectPolishVisibleCopy(item)));
  }

  if (value && typeof value === 'object') {
    return /** @type {T} */ (
      Object.fromEntries(
        Object.entries(value).map(([key, item]) => [
          key,
          NON_VISIBLE_COPY_KEYS.has(key)
            ? item
            : protectPolishVisibleCopy(item)
        ])
      )
    );
  }

  return value;
}

/**
 * Format a single visible string for its locale.
 *
 * @param {string} value
 * @param {'pl' | 'en'} locale
 * @returns {string}
 */
export function formatVisibleText(value, locale) {
  return locale === 'pl' ? protectPolishOneLetterWords(value) : value;
}

/**
 * Check whether an inline node starts with rendered prose. Code, HTML, images,
 * URLs and other technical nodes are intentionally excluded.
 *
 * @param {Record<string, any>} node
 * @returns {boolean}
 */
function startsWithProseText(node) {
  if (node.type === 'text') {
    return /^\S/u.test(node.value);
  }

  if (!PROSE_CONTAINER_TYPES.has(node.type) || !Array.isArray(node.children)) {
    return false;
  }

  for (const child of node.children) {
    if (child.type === 'text' && /^\s*$/u.test(child.value)) {
      continue;
    }

    return startsWithProseText(child);
  }

  return false;
}

/**
 * Sätteri represents inline raw HTML tags as `html` siblings and their
 * contents as text. Track open raw tags before the current text node so their
 * contents remain outside the prose transformation.
 *
 * @param {Record<string, any>} parent
 * @param {number} index
 * @returns {boolean}
 */
function isInsideRawHtml(parent, index) {
  const openElements = [];

  for (const sibling of parent.children.slice(0, index)) {
    if (sibling.type !== 'html') {
      continue;
    }

    for (const match of sibling.value.matchAll(
      /<\s*(\/)?\s*([a-z][\w:-]*)\b[^>]*>/giu
    )) {
      const closing = Boolean(match[1]);
      const name = match[2].toLowerCase();
      const selfClosing = /\/\s*>$/u.test(match[0]);

      if (closing) {
        const openIndex = openElements.lastIndexOf(name);

        if (openIndex !== -1) {
          openElements.splice(openIndex);
        }
      } else if (!selfClosing && !VOID_HTML_ELEMENTS.has(name)) {
        openElements.push(name);
      }
    }
  }

  return openElements.length > 0;
}

/**
 * Polish-only Markdown text-node transformation. Sätteri invokes this visitor
 * for normal text nodes only, so code, inline code, URLs, HTML and frontmatter
 * remain unchanged.
 */
export const polishMarkdownTypography = {
  name: 'polish-visible-typography',
  text(node, context) {
    if (context.data.astro?.frontmatter?.locale !== 'pl') {
      return;
    }

    let value = protectPolishOneLetterWords(node.value);
    const parent = context.parent(node);
    const index = context.indexOf(node);

    if (parent && index !== undefined && isInsideRawHtml(parent, index)) {
      return;
    }

    const nextSibling =
      parent && index !== undefined ? parent.children[index + 1] : undefined;

    if (nextSibling && startsWithProseText(nextSibling)) {
      value = value.replace(POLISH_TRAILING_ONE_LETTER_WORD, '$1\u00A0');
    }

    if (value !== node.value) {
      context.setProperty(node, 'value', value);
    }
  }
};
