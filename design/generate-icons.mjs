import sharp from 'sharp';
import { writeFileSync } from 'fs';

// Concept 3: Code Brackets {dtpf}
// Since sharp can't render text with custom fonts in SVG reliably,
// we use a geometric approach: convert the text concept to pure paths/shapes

function createLogoSvg(size) {
  // Scale factor from 512 base
  const s = size / 512;
  const rx = Math.round(111 * s);

  // For very small sizes, simplify
  const showBraces = size >= 64;
  const strokeW = Math.max(2, Math.round(21 * s));
  const braceOpacity = size >= 128 ? 0.35 : 0.25;

  // Font size and positioning scaled
  const fontSize = Math.round(137 * s);
  const textY = Math.round(286 * s);

  let bracesLeft = '';
  let bracesRight = '';

  if (showBraces) {
    const lx = Math.round(119 * s);
    const lx2 = Math.round(77 * s);
    const ty = Math.round(170 * s);
    const my = Math.round(256 * s);
    const by = Math.round(342 * s);
    const rx2 = Math.round(393 * s);
    const rx3 = Math.round(435 * s);

    bracesLeft = `<path d="M${lx} ${ty}C${lx} ${ty} ${lx2} ${ty} ${lx2} ${my}C${lx2} ${by} ${lx} ${by} ${lx} ${by}" stroke="#2DD4BF" stroke-width="${strokeW}" stroke-linecap="round" fill="none" opacity="${braceOpacity}"/>`;
    bracesRight = `<path d="M${rx2} ${ty}C${rx2} ${ty} ${rx3} ${ty} ${rx3} ${my}C${rx3} ${by} ${rx2} ${by} ${rx2} ${by}" stroke="#2DD4BF" stroke-width="${strokeW}" stroke-linecap="round" fill="none" opacity="${braceOpacity}"/>`;
  }

  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2DD4BF"/>
      <stop offset="100%" stop-color="#FBBF24"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${rx}" fill="#0B0F19"/>
  ${bracesLeft}
  ${bracesRight}
  <text x="${size / 2}" y="${textY}" text-anchor="middle" font-family="monospace" font-weight="700" font-size="${fontSize}" fill="url(#g)">dtpf</text>
</svg>`;
}

function createMaskableSvg(size) {
  // Maskable icons need safe zone (inner 80%), so we add padding
  const padding = Math.round(size * 0.1);
  const innerSize = size - padding * 2;
  const innerS = innerSize / 512;
  const fontSize = Math.round(137 * innerS);
  const textY = padding + Math.round(286 * innerS);
  const cx = size / 2;

  const strokeW = Math.max(2, Math.round(21 * innerS));
  const lx = padding + Math.round(119 * innerS);
  const lx2 = padding + Math.round(77 * innerS);
  const ty = padding + Math.round(170 * innerS);
  const my = padding + Math.round(256 * innerS);
  const by = padding + Math.round(342 * innerS);
  const rx2 = padding + Math.round(393 * innerS);
  const rx3 = padding + Math.round(435 * innerS);

  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2DD4BF"/>
      <stop offset="100%" stop-color="#FBBF24"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="#0B0F19"/>
  <path d="M${lx} ${ty}C${lx} ${ty} ${lx2} ${ty} ${lx2} ${my}C${lx2} ${by} ${lx} ${by} ${lx} ${by}" stroke="#2DD4BF" stroke-width="${strokeW}" stroke-linecap="round" fill="none" opacity="0.35"/>
  <path d="M${rx2} ${ty}C${rx2} ${ty} ${rx3} ${ty} ${rx3} ${my}C${rx3} ${by} ${rx2} ${by} ${rx2} ${by}" stroke="#2DD4BF" stroke-width="${strokeW}" stroke-linecap="round" fill="none" opacity="0.35"/>
  <text x="${cx}" y="${textY}" text-anchor="middle" font-family="monospace" font-weight="700" font-size="${fontSize}" fill="url(#g)">dtpf</text>
</svg>`;
}

const publicDir = '../public';

// Generate all sizes
const sizes = [
  { name: 'favicon.svg', size: 32, type: 'svg' },
  { name: 'logo192.png', size: 192, type: 'png' },
  { name: 'logo512.png', size: 512, type: 'png' },
  { name: 'logo192_maskable.png', size: 192, type: 'png-maskable' },
  { name: 'apple-touch-icon.png', size: 180, type: 'png-maskable' },
  { name: 'favicon.ico', size: 64, type: 'png' }, // We'll generate PNG, rename won't matter for modern browsers
];

for (const { name, size, type } of sizes) {
  const isMaskable = type === 'png-maskable';
  const svg = isMaskable ? createMaskableSvg(size) : createLogoSvg(size);

  if (type === 'svg') {
    // Save the master SVG for favicon
    writeFileSync(`${publicDir}/${name}`, createLogoSvg(512));
    console.log(`Created ${name} (SVG)`);
  } else {
    const buf = Buffer.from(svg);
    await sharp(buf).png().toFile(`${publicDir}/${name}`);
    console.log(`Created ${name} (${size}x${size})`);
  }
}

// Generate favicon.ico from 64px PNG using sharp
const ico64Svg = Buffer.from(createLogoSvg(64));
await sharp(ico64Svg).png().toFile(`${publicDir}/favicon-64.png`);

// Also create a 32px version for ICO
const ico32Svg = Buffer.from(createLogoSvg(32));
await sharp(ico32Svg).png().toFile(`${publicDir}/favicon-32.png`);

console.log('\nAll icons generated in public/');
console.log('Note: favicon.ico is actually a PNG (works in all modern browsers)');
console.log('For a true .ico, use an online converter with favicon-32.png + favicon-64.png');
