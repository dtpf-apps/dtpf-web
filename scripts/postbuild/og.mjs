import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

// Repeated from src/config/site.ts (Node cannot resolve its aliases); a test keeps them equal.
export const BRAND_NAME = 'David T. Pizarro Frick';
export const BRAND_HOST = 'dtpf.es';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;
/** A card smaller than this is a blank or failed render, not a design choice. */
export const OG_MIN_BYTES = 5 * 1024;

// The site's own font files, so a card can never use a face the page does not.
const FONT_DIR = resolve('src/assets/fonts');

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Card texts come from the rendered page, so the card can never disagree with the page it shares.
 * The home title is "<name> — <role>": the name is the big line and the role the headline.
 */
export function cardContent({ key, title, description }) {
  const suffix = ` — ${BRAND_NAME}`;
  if (key === 'home') {
    const dash = title.indexOf(' — ');
    const headline = dash === -1 ? title : title.slice(dash + 3);
    return { big: BRAND_NAME, headline, description };
  }
  const big = title.endsWith(suffix) ? title.slice(0, -suffix.length) : title;
  return { big, headline: '', description };
}

/** First desktop capture of a project, as a data URL, or null for a page without media. */
export function projectImage(distDir, slug) {
  const dir = join(distDir, 'projects', slug);
  if (!existsSync(dir)) return null;
  const file = readdirSync(dir)
    .filter((f) => f.endsWith('-desktop.webp'))
    .sort()[0];
  if (!file) return null;
  return `data:image/webp;base64,${readFileSync(join(dir, file)).toString('base64')}`;
}

let fontCss;
function embeddedFonts() {
  if (fontCss) return fontCss;
  const face = (family, weight, file) =>
    `@font-face{font-family:'${family}';font-weight:${weight};font-style:normal;` +
    `src:url(data:font/woff2;base64,${readFileSync(join(FONT_DIR, file)).toString('base64')}) format('woff2');}`;
  fontCss =
    face('Space Grotesk', 700, 'space-grotesk-700-latin.woff2') + face('Inter', 500, 'inter-500-latin.woff2');
  return fontCss;
}

export function cardHtml({ big, headline, description, image }) {
  const hasImage = Boolean(image);
  const bigSize = hasImage ? 56 : big.length > 28 ? 60 : 72;
  const textWidth = hasImage ? 590 : 1056;
  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
${embeddedFonts()}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${OG_WIDTH}px;height:${OG_HEIGHT}px;overflow:hidden}
body{position:relative;background:#0B0F19;color:#F3F4F6;font-family:'Inter',sans-serif;font-weight:500;
  background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);
  background-size:60px 60px}
.glow{position:absolute;right:-160px;top:-200px;width:620px;height:620px;border-radius:50%;
  background:radial-gradient(circle,rgba(45,212,191,.22),transparent 70%)}
.brand{position:absolute;left:72px;top:64px;display:flex;align-items:center;gap:20px}
.mono{width:64px;height:64px;border-radius:16px;background:#2DD4BF;color:#0B0F19;display:flex;
  align-items:center;justify-content:center;font:700 30px 'Space Grotesk',sans-serif}
.name{font:700 28px 'Space Grotesk',sans-serif;color:#F3F4F6}
.text{position:absolute;left:72px;top:176px;width:${textWidth}px}
h1{font:700 ${bigSize}px/1.08 'Space Grotesk',sans-serif;letter-spacing:-.01em;color:#F3F4F6}
.headline{margin-top:18px;font:700 36px/1.2 'Space Grotesk',sans-serif;color:#2DD4BF}
.desc{margin-top:24px;font-size:28px;line-height:1.4;color:#A8B3C7;display:-webkit-box;
  -webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.foot{position:absolute;left:72px;bottom:56px;display:flex;align-items:center;gap:14px;
  font:700 26px 'Space Grotesk',sans-serif;color:#FBBF24}
.foot i{display:block;width:36px;height:4px;border-radius:2px;background:#FBBF24}
.shot{position:absolute;right:56px;top:72px;width:470px;height:486px;border-radius:18px;overflow:hidden;
  border:2px solid rgba(45,212,191,.55);box-shadow:0 24px 60px rgba(0,0,0,.55)}
.shot img{width:100%;height:100%;object-fit:cover;object-position:top left;display:block}
</style></head><body>
<div class="glow"></div>
<div class="brand"><div class="mono">DP</div><div class="name">${escapeHtml(BRAND_NAME)}</div></div>
<div class="text">
<h1>${escapeHtml(big)}</h1>
${headline ? `<div class="headline">${escapeHtml(headline)}</div>` : ''}
<p class="desc">${escapeHtml(description)}</p>
</div>
${hasImage ? `<div class="shot"><img src="${image}" alt="" aria-hidden="true"></div>` : ''}
<div class="foot"><i></i>${escapeHtml(BRAND_HOST)}</div>
</body></html>`;
}

/** Renders one card on an already-open page (one browser, pages reused) and returns the PNG size. */
export async function renderCard(page, distDir, route, content) {
  const slug = route.key.startsWith('project-') ? route.key.slice('project-'.length) : null;
  const image = slug ? projectImage(distDir, slug) : null;
  await page.setContent(cardHtml({ ...content, image }), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const file = join(distDir, 'og', route.lang, `${route.key}.png`);
  mkdirSync(dirname(file), { recursive: true });
  const png = await page.screenshot({
    type: 'png',
    clip: { x: 0, y: 0, width: OG_WIDTH, height: OG_HEIGHT },
  });
  writeFileSync(file, png);
  return statSync(file).size;
}
