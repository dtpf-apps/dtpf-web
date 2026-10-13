const MARK = 'data-prerender';

// Tags a previous run (or a crawler-visible copy) may already have put in the template.
const MARKED_TAG = /<(title|meta|link|script)\b[^>]*\bdata-prerender\b[^>]*?(?:\/>|>[\s\S]*?<\/\1>|>)\s*/g;

/** Adds the `data-prerender` marker to an element's opening tag (title and script have no void form). */
export function markTag(html) {
  const trimmed = html.trim();
  if (/^<[a-z]+\b[^>]*\bdata-prerender\b/i.test(trimmed)) return trimmed;
  return trimmed.replace(/^<([a-z]+)/i, `<$1 ${MARK}=""`);
}

/** The template with any previously injected tags removed. */
export function stripMarked(html) {
  return html.replace(MARKED_TAG, '');
}

/**
 * Builds a route's HTML from the ORIGINAL template string: marked tags go right before `</head>` and
 * `<html lang>` is set. Pure, and stripping earlier marked tags first makes a second pass over its
 * own output a no-op rather than a second copy of every tag.
 */
export function injectHead(template, { lang, tags }) {
  const clean = stripMarked(template);
  if (!clean.includes('</head>')) throw new Error('Template has no </head>');
  const block = tags.map((tag) => `    ${markTag(tag)}\n`).join('');
  const withTags = clean.replace(/[ \t]*<\/head>/, () => `${block}  </head>`);
  if (!/<html\b[^>]*>/.test(withTags)) throw new Error('Template has no <html> element');
  return withTags.replace(/<html\b([^>]*)>/, (_, attrs) => {
    const rest = attrs.replace(/\s+lang="[^"]*"/, '');
    return `<html lang="${lang}"${rest}>`;
  });
}
