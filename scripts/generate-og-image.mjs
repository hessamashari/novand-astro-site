import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141210" />
      <stop offset="60%" stop-color="#191614" />
      <stop offset="100%" stop-color="#0e0d0c" />
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255, 255, 255, 0.04)" stroke-width="1"/>
    </pattern>
    <linearGradient id="accentLine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f6f3ee" stop-opacity="0.8" />
      <stop offset="50%" stop-color="#d8cbbb" stop-opacity="0.5" />
      <stop offset="100%" stop-color="#141210" stop-opacity="0" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <rect width="1200" height="630" fill="url(#grid)" />

  <!-- Subtle architectural accent frame -->
  <rect x="56" y="56" width="1088" height="518" fill="none" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
  
  <!-- Corner markers -->
  <path d="M 48 56 L 64 56 M 56 48 L 56 64" stroke="rgba(255, 255, 255, 0.3)" stroke-width="1.5" />
  <path d="M 1136 56 L 1152 56 M 1144 48 L 1144 64" stroke="rgba(255, 255, 255, 0.3)" stroke-width="1.5" />
  <path d="M 48 574 L 64 574 M 56 566 L 56 582" stroke="rgba(255, 255, 255, 0.3)" stroke-width="1.5" />
  <path d="M 1136 574 L 1152 574 M 1144 566 L 1144 582" stroke="rgba(255, 255, 255, 0.3)" stroke-width="1.5" />

  <!-- Top bar: Logo + Eyebrow -->
  <g transform="translate(100, 110)">
    <!-- Logo Symbol -->
    <rect x="0" y="0" width="38" height="38" fill="none" stroke="#f6f3ee" stroke-width="2" />
    <rect x="13" y="13" width="12" height="12" fill="#f6f3ee" />
    
    <!-- Logo Text -->
    <text x="54" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="4.5" fill="#f6f3ee">NOVAND</text>
    
    <!-- Vertical divider -->
    <line x1="210" y1="6" x2="210" y2="32" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" />
    
    <!-- Category Eyebrow -->
    <text x="232" y="25" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="12" font-weight="600" letter-spacing="2.5" fill="rgba(246, 243, 238, 0.5)">INTEGRATED SYSTEMS &amp; INFRASTRUCTURE</text>
  </g>

  <!-- Accent Rule -->
  <rect x="100" y="172" width="600" height="1.5" fill="url(#accentLine)" />

  <!-- Main Headline -->
  <g transform="translate(100, 248)">
    <text font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="48" font-weight="700" letter-spacing="-0.5" fill="#ffffff" line-height="1.15">
      <tspan x="0" dy="0">Integrated Technology &amp;</tspan>
      <tspan x="0" dy="64">Infrastructure Solutions</tspan>
    </text>
  </g>

  <!-- Description / Subtitle -->
  <g transform="translate(100, 404)">
    <text font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="19" font-weight="400" fill="rgba(246, 243, 238, 0.7)" line-height="1.5">
      <tspan x="0" dy="0">Engineering, deployment, and ongoing technical advisory for networking, security,</tspan>
      <tspan x="0" dy="30">enterprise systems, smart automation, and connected facility environments.</tspan>
    </text>
  </g>

  <!-- Feature Pills -->
  <g transform="translate(100, 492)">
    <!-- Pill 1 -->
    <rect x="0" y="0" width="194" height="34" rx="3" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.16)" stroke-width="1" />
    <text x="18" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="12" font-weight="600" letter-spacing="0.5" fill="#f6f3ee">Network Infrastructure</text>

    <!-- Pill 2 -->
    <rect x="206" y="0" width="168" height="34" rx="3" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.16)" stroke-width="1" />
    <text x="224" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="12" font-weight="600" letter-spacing="0.5" fill="#f6f3ee">Enterprise Servers</text>

    <!-- Pill 3 -->
    <rect x="386" y="0" width="186" height="34" rx="3" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.16)" stroke-width="1" />
    <text x="404" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="12" font-weight="600" letter-spacing="0.5" fill="#f6f3ee">CCTV &amp; Surveillance</text>

    <!-- Pill 4 -->
    <rect x="584" y="0" width="182" height="34" rx="3" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.16)" stroke-width="1" />
    <text x="602" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="12" font-weight="600" letter-spacing="0.5" fill="#f6f3ee">Smart Automation</text>
  </g>

  <!-- Subtle right decorative tech schematics -->
  <g transform="translate(860, 220)" stroke="rgba(255, 255, 255, 0.18)" fill="none" stroke-width="1.5">
    <circle cx="120" cy="120" r="110" stroke-dasharray="4 6" />
    <circle cx="120" cy="120" r="75" stroke="rgba(255, 255, 255, 0.25)" />
    <circle cx="120" cy="120" r="38" stroke="rgba(255, 255, 255, 0.4)" />
    <rect x="105" y="105" width="30" height="30" fill="rgba(255, 255, 255, 0.08)" stroke="#f6f3ee" stroke-width="2" />
    
    <line x1="10" y1="120" x2="60" y2="120" />
    <line x1="180" y1="120" x2="230" y2="120" />
    <line x1="120" y1="10" x2="120" y2="60" />
    <line x1="120" y1="180" x2="120" y2="230" />
    
    <circle cx="10" cy="120" r="4" fill="#f6f3ee" />
    <circle cx="230" cy="120" r="4" fill="#f6f3ee" />
    <circle cx="120" cy="10" r="4" fill="#f6f3ee" />
    <circle cx="120" cy="230" r="4" fill="#f6f3ee" />
  </g>
</svg>
`;

async function main() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write SVG source as well
  fs.writeFileSync(path.join(publicDir, 'og-image.svg'), svg.trim());

  // Render to 1200x630 high resolution PNG
  await sharp(Buffer.from(svg))
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(path.join(publicDir, 'og-image.png'));

  console.log('Successfully generated public/og-image.png and public/og-image.svg (1200x630)');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
