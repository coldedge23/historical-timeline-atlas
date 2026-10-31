// One-off: draw kamon-style avatars for Japan figures whose avatar file is missing,
// using the same layout as the 2026-10-31 ancient-medieval avatars (fig_jp_tenji.svg).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JAPAN_FIGURES } from '../../src/data/japan/japanFigures.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const svg = (f) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <defs>
    <radialGradient id="bg_${f.id}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${f.bgColor}" />
      <stop offset="100%" stop-color="#120e0b" />
    </radialGradient>
    <filter id="shadow_${f.id}" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <circle cx="60" cy="60" r="56" fill="url(#bg_${f.id})" stroke="${f.mainColor}" stroke-width="2.5" />
  <circle cx="60" cy="60" r="50" fill="none" stroke="${f.mainColor}" stroke-width="1" stroke-dasharray="3,2" opacity="0.7"/>
  <circle cx="60" cy="60" r="38" fill="none" stroke="${f.mainColor}" stroke-width="1.8" opacity="0.85" />

  <text x="60" y="65" font-family="'Noto Serif TC', 'Songti TC', 'Kozuka Mincho Pro', 'Yu Mincho', serif"
        font-size="28" font-weight="900" fill="${f.mainColor}" text-anchor="middle" dominant-baseline="middle"
        filter="url(#shadow_${f.id})">${esc(f.emblemChar)}</text>

  <rect x="25" y="8" width="70" height="15" rx="3" fill="#1c1611" stroke="${f.mainColor}" stroke-width="1"/>
  <text x="60" y="19" font-family="'Noto Sans TC', sans-serif" font-size="8.5" font-weight="bold" fill="#fef08a" text-anchor="middle">${esc(f.clanTag)}</text>

  <rect x="14" y="94" width="92" height="17" rx="3" fill="#1c1611" stroke="${f.mainColor}" stroke-width="1.2"/>
  <text x="60" y="106" font-family="'Noto Serif TC', 'Songti TC', serif" font-size="9.5" font-weight="bold" fill="#f8fafc" text-anchor="middle" letter-spacing="0.5">${esc(f.name)}</text>
</svg>
`;

let written = 0;
for (const f of JAPAN_FIGURES) {
  const file = path.join(root, f.avatar.replace(/^\.\//, ''));
  if (fs.existsSync(file)) continue;
  fs.writeFileSync(file, svg(f));
  written += 1;
  console.log('wrote', path.relative(root, file));
}
console.log(`${written} avatars written`);
