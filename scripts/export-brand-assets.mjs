import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const outputDir = path.resolve('public/brand');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Load Vazirmatn Persian web fonts for SVG embedding
const fontsDir = path.resolve('public/fonts');
let fontStyleDefs = '';
try {
  if (fs.existsSync(path.join(fontsDir, 'Vazirmatn-Bold.ttf'))) {
    const boldB64 = fs.readFileSync(path.join(fontsDir, 'Vazirmatn-Bold.ttf')).toString('base64');
    const semiB64 = fs.existsSync(path.join(fontsDir, 'Vazirmatn-SemiBold.ttf'))
      ? fs.readFileSync(path.join(fontsDir, 'Vazirmatn-SemiBold.ttf')).toString('base64')
      : boldB64;
    fontStyleDefs = `
    <style>
      @font-face {
        font-family: 'Vazirmatn';
        font-style: normal;
        font-weight: 700;
        src: url('data:font/ttf;base64,${boldB64}') format('truetype');
      }
      @font-face {
        font-family: 'Vazirmatn';
        font-style: normal;
        font-weight: 800;
        src: url('data:font/ttf;base64,${boldB64}') format('truetype');
      }
      @font-face {
        font-family: 'Vazirmatn';
        font-style: normal;
        font-weight: 600;
        src: url('data:font/ttf;base64,${semiB64}') format('truetype');
      }
      @font-face {
        font-family: 'Vazirmatn';
        font-style: normal;
        font-weight: 500;
        src: url('data:font/ttf;base64,${semiB64}') format('truetype');
      }
    </style>`;
  }
} catch (e) {
  console.warn('Could not read local Persian fonts for base64 SVG embedding:', e.message);
}

// 1. Base SVG generator for the Emblem / Icon Mark
function getMarkSvg({
  width = 100,
  height = 100,
  houseColor = '#0F172A',
  bg = null,
  padding = 0,
  glow = false
}) {
  const contentWidth = 100;
  const contentHeight = 100;
  
  // Calculate viewbox or scale if padding is requested
  const totalSize = 100 + padding * 2;
  const vbX = -padding;
  const vbY = -padding;
  const vbW = totalSize;
  const vbH = totalSize;

  return `
  <svg width="${width}" height="${height}" viewBox="${vbX} ${vbY} ${vbW} ${vbH}" xmlns="http://www.w3.org/2000/svg" fill="none">
    <defs>
      <linearGradient id="circGrad" x1="20%" y1="100%" x2="90%" y2="20%">
        <stop offset="0%" stop-color="#06B6D4" />
        <stop offset="50%" stop-color="#0EA5E9" />
        <stop offset="100%" stop-color="#10B981" />
      </linearGradient>
      ${glow ? `
      <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>` : ''}
    </defs>

    ${bg ? `<rect x="${vbX}" y="${vbY}" width="${vbW}" height="${vbH}" fill="${bg}" />` : ''}

    <g ${glow ? 'filter="url(#subtleGlow)"' : ''}>
      <!-- Architectural House Outline -->
      <path
        d="M 85 42 L 50 18 L 19 42 L 19 70 L 48 70"
        stroke="${houseColor}"
        stroke-width="5.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <!-- 4-Pane Window -->
      <rect x="42.5" y="38.5" width="6" height="6" rx="0.8" fill="${houseColor}" />
      <rect x="51.5" y="38.5" width="6" height="6" rx="0.8" fill="${houseColor}" />
      <rect x="42.5" y="47.5" width="6" height="6" rx="0.8" fill="${houseColor}" />
      <rect x="51.5" y="47.5" width="6" height="6" rx="0.8" fill="${houseColor}" />

      <!-- Circuit Trace 1 (Top) -->
      <path
        d="M 29 77 L 55 77 L 76.5 51 L 78 51"
        stroke="url(#circGrad)"
        stroke-width="4.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx="81.5" cy="51" r="4.2" stroke="url(#circGrad)" stroke-width="2.6" fill="none" />

      <!-- Circuit Trace 2 (Middle) -->
      <path
        d="M 44 84 L 60 84 L 74.5 68 L 78 68"
        stroke="url(#circGrad)"
        stroke-width="4.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx="81.5" cy="68" r="4.2" stroke="url(#circGrad)" stroke-width="2.6" fill="none" />

      <!-- Circuit Trace 3 (Bottom) -->
      <path
        d="M 60 91 L 68 91 L 76 82.5 L 78 82.5"
        stroke="url(#circGrad)"
        stroke-width="4.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx="81.5" cy="82.5" r="4.2" stroke="url(#circGrad)" stroke-width="2.6" fill="none" />
    </g>
  </svg>`;
}

// 2. Full Horizontal Lockup (Mark + "NOVAND")
function getHorizontalLockupSvg({
  width = 1600,
  height = 500,
  bg = null,
  textColor = '#FFFFFF',
  houseColor = '#FFFFFF',
  withSubtitle = true,
  subtitleColor = 'rgba(255,255,255,0.65)'
}) {
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 1600 500" xmlns="http://www.w3.org/2000/svg" fill="none">
    <defs>
      <linearGradient id="circGradH" x1="20%" y1="100%" x2="90%" y2="20%">
        <stop offset="0%" stop-color="#06B6D4" />
        <stop offset="50%" stop-color="#0EA5E9" />
        <stop offset="100%" stop-color="#10B981" />
      </linearGradient>
    </defs>

    ${bg ? `<rect width="1600" height="500" fill="${bg}" />` : ''}

    <g transform="translate(180, 110)">
      <!-- Mark scaled to 280x280 -->
      <g transform="scale(2.8)">
        <path
          d="M 85 42 L 50 18 L 19 42 L 19 70 L 48 70"
          stroke="${houseColor}"
          stroke-width="5.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <rect x="42.5" y="38.5" width="6" height="6" rx="0.8" fill="${houseColor}" />
        <rect x="51.5" y="38.5" width="6" height="6" rx="0.8" fill="${houseColor}" />
        <rect x="42.5" y="47.5" width="6" height="6" rx="0.8" fill="${houseColor}" />
        <rect x="51.5" y="47.5" width="6" height="6" rx="0.8" fill="${houseColor}" />

        <path
          d="M 29 77 L 55 77 L 76.5 51 L 78 51"
          stroke="url(#circGradH)"
          stroke-width="4.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="81.5" cy="51" r="4.2" stroke="url(#circGradH)" stroke-width="2.6" fill="none" />

        <path
          d="M 44 84 L 60 84 L 74.5 68 L 78 68"
          stroke="url(#circGradH)"
          stroke-width="4.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="81.5" cy="68" r="4.2" stroke="url(#circGradH)" stroke-width="2.6" fill="none" />

        <path
          d="M 60 91 L 68 91 L 76 82.5 L 78 82.5"
          stroke="url(#circGradH)"
          stroke-width="4.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="81.5" cy="82.5" r="4.2" stroke="url(#circGradH)" stroke-width="2.6" fill="none" />
      </g>

      <!-- Wordmark -->
      <text x="350" y="160" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="132" font-weight="800" letter-spacing="24" fill="${textColor}">NOVAND</text>
      
      ${withSubtitle ? `
      <!-- Subtitle -->
      <text x="358" y="222" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="28" font-weight="600" letter-spacing="10" fill="${subtitleColor}">INTEGRATED SYSTEMS &amp; INFRASTRUCTURE</text>
      ` : ''}
    </g>
  </svg>`;
}

// 3. Instagram Post Layout (1080x1080 Square Graphic)
function getInstagramPostSvg({ dark = true }) {
  const bg = dark ? '#0B0F19' : '#F9F8F6';
  const houseColor = dark ? '#FFFFFF' : '#0F172A';
  const textColor = dark ? '#FFFFFF' : '#0F172A';
  const subtextColor = dark ? 'rgba(255,255,255,0.65)' : 'rgba(15,23,42,0.65)';
  const gridColor = dark ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.035)';
  const frameBorder = dark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.12)';

  return `
  <svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg" fill="none">
    <defs>
      <linearGradient id="postCircGrad" x1="20%" y1="100%" x2="90%" y2="20%">
        <stop offset="0%" stop-color="#06B6D4" />
        <stop offset="50%" stop-color="#0EA5E9" />
        <stop offset="100%" stop-color="#10B981" />
      </linearGradient>
      <pattern id="postGrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${gridColor}" stroke-width="1"/>
      </pattern>
    </defs>

    <!-- Background -->
    <rect width="1080" height="1080" fill="${bg}" />
    <rect width="1080" height="1080" fill="url(#postGrid)" />

    <!-- Architectural Framing lines -->
    <rect x="70" y="70" width="940" height="940" stroke="${frameBorder}" stroke-width="1.5" />
    
    <!-- Crosshair markers -->
    <path d="M 60 70 L 80 70 M 70 60 L 70 80" stroke="${frameBorder}" stroke-width="2" />
    <path d="M 1000 70 L 1020 70 M 1010 60 L 1010 80" stroke="${frameBorder}" stroke-width="2" />
    <path d="M 60 1010 L 80 1010 M 70 1000 L 70 1020" stroke="${frameBorder}" stroke-width="2" />
    <path d="M 1000 1010 L 1020 1010 M 1010 1000 L 1010 1020" stroke="${frameBorder}" stroke-width="2" />

    <!-- Centered Logo Group -->
    <g transform="translate(540, 430)">
      <!-- Mark centered (width: 320, height: 320) -->
      <g transform="translate(-160, -160) scale(3.2)">
        <path
          d="M 85 42 L 50 18 L 19 42 L 19 70 L 48 70"
          stroke="${houseColor}"
          stroke-width="5.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <rect x="42.5" y="38.5" width="6" height="6" rx="0.8" fill="${houseColor}" />
        <rect x="51.5" y="38.5" width="6" height="6" rx="0.8" fill="${houseColor}" />
        <rect x="42.5" y="47.5" width="6" height="6" rx="0.8" fill="${houseColor}" />
        <rect x="51.5" y="47.5" width="6" height="6" rx="0.8" fill="${houseColor}" />

        <path
          d="M 29 77 L 55 77 L 76.5 51 L 78 51"
          stroke="url(#postCircGrad)"
          stroke-width="4.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="81.5" cy="51" r="4.2" stroke="url(#postCircGrad)" stroke-width="2.6" fill="none" />

        <path
          d="M 44 84 L 60 84 L 74.5 68 L 78 68"
          stroke="url(#postCircGrad)"
          stroke-width="4.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="81.5" cy="68" r="4.2" stroke="url(#postCircGrad)" stroke-width="2.6" fill="none" />

        <path
          d="M 60 91 L 68 91 L 76 82.5 L 78 82.5"
          stroke="url(#postCircGrad)"
          stroke-width="4.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="81.5" cy="82.5" r="4.2" stroke="url(#postCircGrad)" stroke-width="2.6" fill="none" />
      </g>
    </g>

    <!-- Typography -->
    <text x="540" y="680" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="78" font-weight="800" letter-spacing="22" fill="${textColor}">NOVAND</text>
    <text x="540" y="740" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="20" font-weight="600" letter-spacing="9" fill="${subtextColor}">INTEGRATED SYSTEMS &amp; INFRASTRUCTURE</text>

    <!-- Bottom Pillars / Domains -->
    <g transform="translate(540, 880)">
      <text x="0" y="0" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="15" font-weight="500" letter-spacing="4" fill="${subtextColor}">SMART BUILDINGS  •  ENTERPRISE NETWORKS  •  SECURITY SYSTEMS</text>
    </g>
  </svg>`;
}

// 4. Instagram Story Layout (1080x1920 Vertical)
function getInstagramStorySvg({ dark = true }) {
  const bg = dark ? '#0B0F19' : '#F9F8F6';
  const houseColor = dark ? '#FFFFFF' : '#0F172A';
  const textColor = dark ? '#FFFFFF' : '#0F172A';
  const subtextColor = dark ? 'rgba(255,255,255,0.65)' : 'rgba(15,23,42,0.65)';
  const gridColor = dark ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.035)';

  return `
  <svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg" fill="none">
    <defs>
      <linearGradient id="storyCircGrad" x1="20%" y1="100%" x2="90%" y2="20%">
        <stop offset="0%" stop-color="#06B6D4" />
        <stop offset="50%" stop-color="#0EA5E9" />
        <stop offset="100%" stop-color="#10B981" />
      </linearGradient>
      <pattern id="storyGrid" width="48" height="48" patternUnits="userSpaceOnUse">
        <path d="M 48 0 L 0 0 0 48" fill="none" stroke="${gridColor}" stroke-width="1"/>
      </pattern>
    </defs>

    <rect width="1080" height="1920" fill="${bg}" />
    <rect width="1080" height="1920" fill="url(#storyGrid)" />

    <!-- Centered Group -->
    <g transform="translate(540, 840)">
      <!-- Mark centered (width: 360, height: 360) -->
      <g transform="translate(-180, -180) scale(3.6)">
        <path
          d="M 85 42 L 50 18 L 19 42 L 19 70 L 48 70"
          stroke="${houseColor}"
          stroke-width="5.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <rect x="42.5" y="38.5" width="6" height="6" rx="0.8" fill="${houseColor}" />
        <rect x="51.5" y="38.5" width="6" height="6" rx="0.8" fill="${houseColor}" />
        <rect x="42.5" y="47.5" width="6" height="6" rx="0.8" fill="${houseColor}" />
        <rect x="51.5" y="47.5" width="6" height="6" rx="0.8" fill="${houseColor}" />

        <path
          d="M 29 77 L 55 77 L 76.5 51 L 78 51"
          stroke="url(#storyCircGrad)"
          stroke-width="4.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="81.5" cy="51" r="4.2" stroke="url(#storyCircGrad)" stroke-width="2.6" fill="none" />

        <path
          d="M 44 84 L 60 84 L 74.5 68 L 78 68"
          stroke="url(#storyCircGrad)"
          stroke-width="4.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="81.5" cy="68" r="4.2" stroke="url(#storyCircGrad)" stroke-width="2.6" fill="none" />

        <path
          d="M 60 91 L 68 91 L 76 82.5 L 78 82.5"
          stroke="url(#storyCircGrad)"
          stroke-width="4.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="81.5" cy="82.5" r="4.2" stroke="url(#storyCircGrad)" stroke-width="2.6" fill="none" />
      </g>
    </g>

    <!-- Typography -->
    <text x="540" y="1120" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="88" font-weight="800" letter-spacing="26" fill="${textColor}">NOVAND</text>
    <text x="540" y="1190" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="22" font-weight="600" letter-spacing="10" fill="${subtextColor}">INTEGRATED SYSTEMS &amp; INFRASTRUCTURE</text>
  </svg>`;
}

// 5. Persian Horizontal Lockup (Standard LTR or Natural RTL)
function getPersianHorizontalLockupSvg({
  width = 2400,
  height = 750,
  bg = null,
  textColor = '#FFFFFF',
  houseColor = '#FFFFFF',
  withSubtitle = true,
  subtitleColor = 'rgba(255,255,255,0.7)',
  rtl = true,
}) {
  const gradId = `circGradP_${rtl ? 'RTL' : 'LTR'}_${bg ? 'Solid' : 'Trans'}`;
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 1600 500" xmlns="http://www.w3.org/2000/svg" fill="none">
    <defs>
      ${fontStyleDefs}
      <linearGradient id="${gradId}" x1="20%" y1="100%" x2="90%" y2="20%">
        <stop offset="0%" stop-color="#06B6D4" />
        <stop offset="50%" stop-color="#0EA5E9" />
        <stop offset="100%" stop-color="#10B981" />
      </linearGradient>
    </defs>

    ${bg ? `<rect width="1600" height="500" fill="${bg}" />` : ''}

    ${rtl ? `
    <!-- RTL Layout: Mark positioned on the right side -->
    <g transform="translate(1160, 110)">
      <g transform="scale(2.8)">
        <path
          d="M 85 42 L 50 18 L 19 42 L 19 70 L 48 70"
          stroke="${houseColor}"
          stroke-width="5.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <rect x="42.5" y="38.5" width="6" height="6" rx="0.8" fill="${houseColor}" />
        <rect x="51.5" y="38.5" width="6" height="6" rx="0.8" fill="${houseColor}" />
        <rect x="42.5" y="47.5" width="6" height="6" rx="0.8" fill="${houseColor}" />
        <rect x="51.5" y="47.5" width="6" height="6" rx="0.8" fill="${houseColor}" />

        <path
          d="M 29 77 L 55 77 L 76.5 51 L 78 51"
          stroke="url(#${gradId})"
          stroke-width="4.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="81.5" cy="51" r="4.2" stroke="url(#${gradId})" stroke-width="2.6" fill="none" />

        <path
          d="M 44 84 L 60 84 L 74.5 68 L 78 68"
          stroke="url(#${gradId})"
          stroke-width="4.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="81.5" cy="68" r="4.2" stroke="url(#${gradId})" stroke-width="2.6" fill="none" />

        <path
          d="M 60 91 L 68 91 L 76 82.5 L 78 82.5"
          stroke="url(#${gradId})"
          stroke-width="4.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="81.5" cy="82.5" r="4.2" stroke="url(#${gradId})" stroke-width="2.6" fill="none" />
      </g>
    </g>

    <!-- Persian Typography right-aligned towards the mark -->
    <text x="1100" y="240" text-anchor="end" font-family="'Vazirmatn', sans-serif" font-size="124" font-weight="800" fill="${textColor}">نوَند</text>
    ${withSubtitle ? `
    <text x="1100" y="315" text-anchor="end" font-family="'Vazirmatn', sans-serif" font-size="28" font-weight="600" fill="${subtitleColor}">سیستم‌های یکپارچه و زیرساخت</text>
    ` : ''}
    ` : `
    <!-- LTR Layout: Mark on Left, Persian text on Right -->
    <g transform="translate(180, 110)">
      <g transform="scale(2.8)">
        <path
          d="M 85 42 L 50 18 L 19 42 L 19 70 L 48 70"
          stroke="${houseColor}"
          stroke-width="5.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <rect x="42.5" y="38.5" width="6" height="6" rx="0.8" fill="${houseColor}" />
        <rect x="51.5" y="38.5" width="6" height="6" rx="0.8" fill="${houseColor}" />
        <rect x="42.5" y="47.5" width="6" height="6" rx="0.8" fill="${houseColor}" />
        <rect x="51.5" y="47.5" width="6" height="6" rx="0.8" fill="${houseColor}" />

        <path
          d="M 29 77 L 55 77 L 76.5 51 L 78 51"
          stroke="url(#${gradId})"
          stroke-width="4.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="81.5" cy="51" r="4.2" stroke="url(#${gradId})" stroke-width="2.6" fill="none" />

        <path
          d="M 44 84 L 60 84 L 74.5 68 L 78 68"
          stroke="url(#${gradId})"
          stroke-width="4.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="81.5" cy="68" r="4.2" stroke="url(#${gradId})" stroke-width="2.6" fill="none" />

        <path
          d="M 60 91 L 68 91 L 76 82.5 L 78 82.5"
          stroke="url(#${gradId})"
          stroke-width="4.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="81.5" cy="82.5" r="4.2" stroke="url(#${gradId})" stroke-width="2.6" fill="none" />
      </g>
    </g>

    <!-- Persian Typography left-to-right alignment -->
    <text x="510" y="240" text-anchor="start" font-family="'Vazirmatn', sans-serif" font-size="124" font-weight="800" fill="${textColor}">نوَند</text>
    ${withSubtitle ? `
    <text x="515" y="315" text-anchor="start" font-family="'Vazirmatn', sans-serif" font-size="28" font-weight="600" fill="${subtitleColor}">سیستم‌های یکپارچه و زیرساخت</text>
    ` : ''}
    `}
  </svg>`;
}

// 6. Bilingual Horizontal Brand Lockup (NOVAND | نوَند)
function getBilingualHorizontalLockupSvg({
  width = 2400,
  height = 750,
  bg = null,
  textColor = '#FFFFFF',
  houseColor = '#FFFFFF',
  subtitleColor = 'rgba(255,255,255,0.7)',
}) {
  const gradId = `circGradBi_${bg ? 'Solid' : 'Trans'}`;
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 1600 500" xmlns="http://www.w3.org/2000/svg" fill="none">
    <defs>
      ${fontStyleDefs}
      <linearGradient id="${gradId}" x1="20%" y1="100%" x2="90%" y2="20%">
        <stop offset="0%" stop-color="#06B6D4" />
        <stop offset="50%" stop-color="#0EA5E9" />
        <stop offset="100%" stop-color="#10B981" />
      </linearGradient>
    </defs>

    ${bg ? `<rect width="1600" height="500" fill="${bg}" />` : ''}

    <g transform="translate(100, 110)">
      <g transform="scale(2.8)">
        <path
          d="M 85 42 L 50 18 L 19 42 L 19 70 L 48 70"
          stroke="${houseColor}"
          stroke-width="5.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <rect x="42.5" y="38.5" width="6" height="6" rx="0.8" fill="${houseColor}" />
        <rect x="51.5" y="38.5" width="6" height="6" rx="0.8" fill="${houseColor}" />
        <rect x="42.5" y="47.5" width="6" height="6" rx="0.8" fill="${houseColor}" />
        <rect x="51.5" y="47.5" width="6" height="6" rx="0.8" fill="${houseColor}" />

        <path
          d="M 29 77 L 55 77 L 76.5 51 L 78 51"
          stroke="url(#${gradId})"
          stroke-width="4.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="81.5" cy="51" r="4.2" stroke="url(#${gradId})" stroke-width="2.6" fill="none" />

        <path
          d="M 44 84 L 60 84 L 74.5 68 L 78 68"
          stroke="url(#${gradId})"
          stroke-width="4.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="81.5" cy="68" r="4.2" stroke="url(#${gradId})" stroke-width="2.6" fill="none" />

        <path
          d="M 60 91 L 68 91 L 76 82.5 L 78 82.5"
          stroke="url(#${gradId})"
          stroke-width="4.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="81.5" cy="82.5" r="4.2" stroke="url(#${gradId})" stroke-width="2.6" fill="none" />
      </g>

      <!-- Bilingual Wordmarks -->
      <text x="350" y="155" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="104" font-weight="800" letter-spacing="15" fill="${textColor}">NOVAND</text>
      <rect x="915" y="65" width="2.5" height="100" fill="${textColor}" opacity="0.25" />
      <text x="950" y="158" font-family="'Vazirmatn', sans-serif" font-size="96" font-weight="800" fill="${textColor}">نوَند</text>

      <!-- Bilingual Subtitle -->
      <text x="356" y="222" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Vazirmatn', sans-serif" font-size="20" font-weight="600" letter-spacing="2" fill="${subtitleColor}">INTEGRATED SYSTEMS &amp; INFRASTRUCTURE  •  سیستم‌های یکپارچه و زیرساخت</text>
    </g>
  </svg>`;
}

// 7. Persian Instagram Post (1080x1080 Square Graphic)
function getPersianInstagramPostSvg({ dark = true }) {
  const bg = dark ? '#0B0F19' : '#F9F8F6';
  const houseColor = dark ? '#FFFFFF' : '#0F172A';
  const textColor = dark ? '#FFFFFF' : '#0F172A';
  const subtextColor = dark ? 'rgba(255,255,255,0.65)' : 'rgba(15,23,42,0.65)';
  const gridColor = dark ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.035)';
  const frameBorder = dark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.12)';

  return `
  <svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg" fill="none">
    <defs>
      ${fontStyleDefs}
      <linearGradient id="postPersianCircGrad" x1="20%" y1="100%" x2="90%" y2="20%">
        <stop offset="0%" stop-color="#06B6D4" />
        <stop offset="50%" stop-color="#0EA5E9" />
        <stop offset="100%" stop-color="#10B981" />
      </linearGradient>
      <pattern id="postPersianGrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${gridColor}" stroke-width="1"/>
      </pattern>
    </defs>

    <!-- Background -->
    <rect width="1080" height="1080" fill="${bg}" />
    <rect width="1080" height="1080" fill="url(#postPersianGrid)" />

    <!-- Architectural Framing lines -->
    <rect x="70" y="70" width="940" height="940" stroke="${frameBorder}" stroke-width="1.5" />
    <path d="M 60 70 L 80 70 M 70 60 L 70 80" stroke="${frameBorder}" stroke-width="2" />
    <path d="M 1000 70 L 1020 70 M 1010 60 L 1010 80" stroke="${frameBorder}" stroke-width="2" />
    <path d="M 60 1010 L 80 1010 M 70 1000 L 70 1020" stroke="${frameBorder}" stroke-width="2" />
    <path d="M 1000 1010 L 1020 1010 M 1010 1000 L 1010 1020" stroke="${frameBorder}" stroke-width="2" />

    <!-- Centered Logo Group -->
    <g transform="translate(540, 420)">
      <g transform="translate(-160, -160) scale(3.2)">
        <path
          d="M 85 42 L 50 18 L 19 42 L 19 70 L 48 70"
          stroke="${houseColor}"
          stroke-width="5.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <rect x="42.5" y="38.5" width="6" height="6" rx="0.8" fill="${houseColor}" />
        <rect x="51.5" y="38.5" width="6" height="6" rx="0.8" fill="${houseColor}" />
        <rect x="42.5" y="47.5" width="6" height="6" rx="0.8" fill="${houseColor}" />
        <rect x="51.5" y="47.5" width="6" height="6" rx="0.8" fill="${houseColor}" />

        <path
          d="M 29 77 L 55 77 L 76.5 51 L 78 51"
          stroke="url(#postPersianCircGrad)"
          stroke-width="4.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="81.5" cy="51" r="4.2" stroke="url(#postPersianCircGrad)" stroke-width="2.6" fill="none" />

        <path
          d="M 44 84 L 60 84 L 74.5 68 L 78 68"
          stroke="url(#postPersianCircGrad)"
          stroke-width="4.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="81.5" cy="68" r="4.2" stroke="url(#postPersianCircGrad)" stroke-width="2.6" fill="none" />

        <path
          d="M 60 91 L 68 91 L 76 82.5 L 78 82.5"
          stroke="url(#postPersianCircGrad)"
          stroke-width="4.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="81.5" cy="82.5" r="4.2" stroke="url(#postPersianCircGrad)" stroke-width="2.6" fill="none" />
      </g>
    </g>

    <!-- Persian Typography -->
    <text x="540" y="665" text-anchor="middle" font-family="'Vazirmatn', sans-serif" font-size="84" font-weight="800" fill="${textColor}">نوَند</text>
    <text x="540" y="730" text-anchor="middle" font-family="'Vazirmatn', sans-serif" font-size="24" font-weight="600" fill="${subtextColor}">سیستم‌های یکپارچه و زیرساخت</text>

    <!-- Bottom Pillars / Domains -->
    <g transform="translate(540, 880)">
      <text x="0" y="0" text-anchor="middle" font-family="'Vazirmatn', sans-serif" font-size="17" font-weight="500" fill="${subtextColor}">ساختمان‌های هوشمند  •  شبکه‌های سازمانی  •  سیستم‌های امنیتی و نظارتی</text>
    </g>
  </svg>`;
}

// 8. Persian Instagram Story Layout (1080x1920 Vertical)
function getPersianInstagramStorySvg({ dark = true }) {
  const bg = dark ? '#0B0F19' : '#F9F8F6';
  const houseColor = dark ? '#FFFFFF' : '#0F172A';
  const textColor = dark ? '#FFFFFF' : '#0F172A';
  const subtextColor = dark ? 'rgba(255,255,255,0.65)' : 'rgba(15,23,42,0.65)';
  const gridColor = dark ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.035)';

  return `
  <svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg" fill="none">
    <defs>
      ${fontStyleDefs}
      <linearGradient id="storyPersianCircGrad" x1="20%" y1="100%" x2="90%" y2="20%">
        <stop offset="0%" stop-color="#06B6D4" />
        <stop offset="50%" stop-color="#0EA5E9" />
        <stop offset="100%" stop-color="#10B981" />
      </linearGradient>
      <pattern id="storyPersianGrid" width="48" height="48" patternUnits="userSpaceOnUse">
        <path d="M 48 0 L 0 0 0 48" fill="none" stroke="${gridColor}" stroke-width="1"/>
      </pattern>
    </defs>

    <rect width="1080" height="1920" fill="${bg}" />
    <rect width="1080" height="1920" fill="url(#storyPersianGrid)" />

    <!-- Centered Group -->
    <g transform="translate(540, 820)">
      <g transform="translate(-180, -180) scale(3.6)">
        <path
          d="M 85 42 L 50 18 L 19 42 L 19 70 L 48 70"
          stroke="${houseColor}"
          stroke-width="5.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <rect x="42.5" y="38.5" width="6" height="6" rx="0.8" fill="${houseColor}" />
        <rect x="51.5" y="38.5" width="6" height="6" rx="0.8" fill="${houseColor}" />
        <rect x="42.5" y="47.5" width="6" height="6" rx="0.8" fill="${houseColor}" />
        <rect x="51.5" y="47.5" width="6" height="6" rx="0.8" fill="${houseColor}" />

        <path
          d="M 29 77 L 55 77 L 76.5 51 L 78 51"
          stroke="url(#storyPersianCircGrad)"
          stroke-width="4.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="81.5" cy="51" r="4.2" stroke="url(#storyPersianCircGrad)" stroke-width="2.6" fill="none" />

        <path
          d="M 44 84 L 60 84 L 74.5 68 L 78 68"
          stroke="url(#storyPersianCircGrad)"
          stroke-width="4.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="81.5" cy="68" r="4.2" stroke="url(#storyPersianCircGrad)" stroke-width="2.6" fill="none" />

        <path
          d="M 60 91 L 68 91 L 76 82.5 L 78 82.5"
          stroke="url(#storyPersianCircGrad)"
          stroke-width="4.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="81.5" cy="82.5" r="4.2" stroke="url(#storyPersianCircGrad)" stroke-width="2.6" fill="none" />
      </g>
    </g>

    <!-- Typography -->
    <text x="540" y="1100" text-anchor="middle" font-family="'Vazirmatn', sans-serif" font-size="94" font-weight="800" fill="${textColor}">نوَند</text>
    <text x="540" y="1175" text-anchor="middle" font-family="'Vazirmatn', sans-serif" font-size="28" font-weight="600" fill="${subtextColor}">سیستم‌های یکپارچه و زیرساخت</text>
    <text x="540" y="1250" text-anchor="middle" font-family="'Vazirmatn', sans-serif" font-size="18" font-weight="500" fill="${subtextColor}">طراحی و پیاده‌سازی زیرساخت‌های مهندسی و هوشمندسازی</text>
  </svg>`;
}

async function exportAll() {
  console.log('Generating Brand & Instagram assets...');

  // 1. Instagram Profile Picture (Square 1080x1080 with 25% padding for safe circular crop)
  // Dark version
  const instaProfDarkSvg = getMarkSvg({
    width: 1080,
    height: 1080,
    houseColor: '#FFFFFF',
    bg: '#0B0F19',
    padding: 24, // Ensures icon is safely inside circle radius (circle diameter = 1080)
  });
  await sharp(Buffer.from(instaProfDarkSvg))
    .png({ quality: 100 })
    .toFile(path.join(outputDir, 'novand-instagram-profile-dark.png'));
  fs.writeFileSync(path.join(outputDir, 'novand-instagram-profile-dark.svg'), instaProfDarkSvg);

  // Light version
  const instaProfLightSvg = getMarkSvg({
    width: 1080,
    height: 1080,
    houseColor: '#0F172A',
    bg: '#FFFFFF',
    padding: 24,
  });
  await sharp(Buffer.from(instaProfLightSvg))
    .png({ quality: 100 })
    .toFile(path.join(outputDir, 'novand-instagram-profile-light.png'));
  fs.writeFileSync(path.join(outputDir, 'novand-instagram-profile-light.svg'), instaProfLightSvg);

  // Transparent Instagram / Avatar (1080x1080)
  const instaProfTransSvg = getMarkSvg({
    width: 1080,
    height: 1080,
    houseColor: '#FFFFFF',
    bg: null,
    padding: 24,
  });
  await sharp(Buffer.from(instaProfTransSvg))
    .png({ quality: 100 })
    .toFile(path.join(outputDir, 'novand-instagram-profile-transparent.png'));

  // 2. High-Res Standalone Mark (2048x2048 Transparent)
  // White house on transparent (for dark backgrounds)
  const markWhiteSvg = getMarkSvg({
    width: 2048,
    height: 2048,
    houseColor: '#FFFFFF',
    bg: null,
    padding: 6,
  });
  await sharp(Buffer.from(markWhiteSvg))
    .png({ quality: 100 })
    .toFile(path.join(outputDir, 'novand-mark-transparent-white.png'));

  // Dark house on transparent (for light backgrounds)
  const markDarkSvg = getMarkSvg({
    width: 2048,
    height: 2048,
    houseColor: '#0F172A',
    bg: null,
    padding: 6,
  });
  await sharp(Buffer.from(markDarkSvg))
    .png({ quality: 100 })
    .toFile(path.join(outputDir, 'novand-mark-transparent-dark.png'));
  fs.writeFileSync(path.join(outputDir, 'novand-mark.svg'), markDarkSvg);

  // 3. Instagram Post (1080x1080 Announcement / Feature Graphic)
  const postDarkSvg = getInstagramPostSvg({ dark: true });
  await sharp(Buffer.from(postDarkSvg))
    .png({ quality: 100 })
    .toFile(path.join(outputDir, 'novand-instagram-post-dark.png'));

  const postLightSvg = getInstagramPostSvg({ dark: false });
  await sharp(Buffer.from(postLightSvg))
    .png({ quality: 100 })
    .toFile(path.join(outputDir, 'novand-instagram-post-light.png'));

  // 4. Instagram Story / Vertical Wallpaper (1080x1920)
  const storyDarkSvg = getInstagramStorySvg({ dark: true });
  await sharp(Buffer.from(storyDarkSvg))
    .png({ quality: 100 })
    .toFile(path.join(outputDir, 'novand-instagram-story-dark.png'));

  // 5. Full Horizontal Brand Lockup (2400x750)
  // Dark bg
  const lockupDarkSvg = getHorizontalLockupSvg({
    width: 2400,
    height: 750,
    bg: '#0B0F19',
    textColor: '#FFFFFF',
    houseColor: '#FFFFFF',
    withSubtitle: true,
    subtitleColor: 'rgba(255,255,255,0.7)',
  });
  await sharp(Buffer.from(lockupDarkSvg))
    .png({ quality: 100 })
    .toFile(path.join(outputDir, 'novand-logo-horizontal-dark.png'));
  fs.writeFileSync(path.join(outputDir, 'novand-logo-horizontal-dark.svg'), lockupDarkSvg);

  // Light bg
  const lockupLightSvg = getHorizontalLockupSvg({
    width: 2400,
    height: 750,
    bg: '#FFFFFF',
    textColor: '#0F172A',
    houseColor: '#0F172A',
    withSubtitle: true,
    subtitleColor: 'rgba(15,23,42,0.7)',
  });
  await sharp(Buffer.from(lockupLightSvg))
    .png({ quality: 100 })
    .toFile(path.join(outputDir, 'novand-logo-horizontal-light.png'));
  fs.writeFileSync(path.join(outputDir, 'novand-logo-horizontal-light.svg'), lockupLightSvg);

  // Transparent lockup (white text)
  const lockupTransSvg = getHorizontalLockupSvg({
    width: 2400,
    height: 750,
    bg: null,
    textColor: '#FFFFFF',
    houseColor: '#FFFFFF',
    withSubtitle: true,
    subtitleColor: 'rgba(255,255,255,0.7)',
  });
  await sharp(Buffer.from(lockupTransSvg))
    .png({ quality: 100 })
    .toFile(path.join(outputDir, 'novand-logo-horizontal-transparent.png'));

  // 6. Persian Horizontal Lockups (Natural RTL: Mark on Right)
  console.log('Generating Persian Brand Assets (نسخه‌های فارسی و دوزبانه)...');

  // Persian RTL Dark
  const persianRtlDarkSvg = getPersianHorizontalLockupSvg({
    width: 2400,
    height: 750,
    bg: '#0B0F19',
    textColor: '#FFFFFF',
    houseColor: '#FFFFFF',
    withSubtitle: true,
    subtitleColor: 'rgba(255,255,255,0.7)',
    rtl: true,
  });
  await sharp(Buffer.from(persianRtlDarkSvg))
    .png({ quality: 100 })
    .toFile(path.join(outputDir, 'novand-logo-persian-rtl-dark.png'));
  fs.writeFileSync(path.join(outputDir, 'novand-logo-persian-rtl-dark.svg'), persianRtlDarkSvg);

  // Persian RTL Light
  const persianRtlLightSvg = getPersianHorizontalLockupSvg({
    width: 2400,
    height: 750,
    bg: '#FFFFFF',
    textColor: '#0F172A',
    houseColor: '#0F172A',
    withSubtitle: true,
    subtitleColor: 'rgba(15,23,42,0.7)',
    rtl: true,
  });
  await sharp(Buffer.from(persianRtlLightSvg))
    .png({ quality: 100 })
    .toFile(path.join(outputDir, 'novand-logo-persian-rtl-light.png'));
  fs.writeFileSync(path.join(outputDir, 'novand-logo-persian-rtl-light.svg'), persianRtlLightSvg);

  // Persian RTL Transparent
  const persianRtlTransSvg = getPersianHorizontalLockupSvg({
    width: 2400,
    height: 750,
    bg: null,
    textColor: '#FFFFFF',
    houseColor: '#FFFFFF',
    withSubtitle: true,
    subtitleColor: 'rgba(255,255,255,0.7)',
    rtl: true,
  });
  await sharp(Buffer.from(persianRtlTransSvg))
    .png({ quality: 100 })
    .toFile(path.join(outputDir, 'novand-logo-persian-rtl-transparent.png'));

  // 7. Persian Horizontal Lockups (Standard LTR Alignment: Mark on Left)
  // Persian LTR Dark
  const persianLtrDarkSvg = getPersianHorizontalLockupSvg({
    width: 2400,
    height: 750,
    bg: '#0B0F19',
    textColor: '#FFFFFF',
    houseColor: '#FFFFFF',
    withSubtitle: true,
    subtitleColor: 'rgba(255,255,255,0.7)',
    rtl: false,
  });
  await sharp(Buffer.from(persianLtrDarkSvg))
    .png({ quality: 100 })
    .toFile(path.join(outputDir, 'novand-logo-persian-horizontal-dark.png'));
  fs.writeFileSync(path.join(outputDir, 'novand-logo-persian-horizontal-dark.svg'), persianLtrDarkSvg);

  // Persian LTR Light
  const persianLtrLightSvg = getPersianHorizontalLockupSvg({
    width: 2400,
    height: 750,
    bg: '#FFFFFF',
    textColor: '#0F172A',
    houseColor: '#0F172A',
    withSubtitle: true,
    subtitleColor: 'rgba(15,23,42,0.7)',
    rtl: false,
  });
  await sharp(Buffer.from(persianLtrLightSvg))
    .png({ quality: 100 })
    .toFile(path.join(outputDir, 'novand-logo-persian-horizontal-light.png'));
  fs.writeFileSync(path.join(outputDir, 'novand-logo-persian-horizontal-light.svg'), persianLtrLightSvg);

  // Persian LTR Transparent
  const persianLtrTransSvg = getPersianHorizontalLockupSvg({
    width: 2400,
    height: 750,
    bg: null,
    textColor: '#FFFFFF',
    houseColor: '#FFFFFF',
    withSubtitle: true,
    subtitleColor: 'rgba(255,255,255,0.7)',
    rtl: false,
  });
  await sharp(Buffer.from(persianLtrTransSvg))
    .png({ quality: 100 })
    .toFile(path.join(outputDir, 'novand-logo-persian-horizontal-transparent.png'));

  // 8. Bilingual Horizontal Lockups (NOVAND | نوَند)
  // Bilingual Dark
  const bilingualDarkSvg = getBilingualHorizontalLockupSvg({
    width: 2400,
    height: 750,
    bg: '#0B0F19',
    textColor: '#FFFFFF',
    houseColor: '#FFFFFF',
    subtitleColor: 'rgba(255,255,255,0.7)',
  });
  await sharp(Buffer.from(bilingualDarkSvg))
    .png({ quality: 100 })
    .toFile(path.join(outputDir, 'novand-logo-bilingual-horizontal-dark.png'));
  fs.writeFileSync(path.join(outputDir, 'novand-logo-bilingual-horizontal-dark.svg'), bilingualDarkSvg);

  // Bilingual Light
  const bilingualLightSvg = getBilingualHorizontalLockupSvg({
    width: 2400,
    height: 750,
    bg: '#FFFFFF',
    textColor: '#0F172A',
    houseColor: '#0F172A',
    subtitleColor: 'rgba(15,23,42,0.7)',
  });
  await sharp(Buffer.from(bilingualLightSvg))
    .png({ quality: 100 })
    .toFile(path.join(outputDir, 'novand-logo-bilingual-horizontal-light.png'));
  fs.writeFileSync(path.join(outputDir, 'novand-logo-bilingual-horizontal-light.svg'), bilingualLightSvg);

  // Bilingual Transparent
  const bilingualTransSvg = getBilingualHorizontalLockupSvg({
    width: 2400,
    height: 750,
    bg: null,
    textColor: '#FFFFFF',
    houseColor: '#FFFFFF',
    subtitleColor: 'rgba(255,255,255,0.7)',
  });
  await sharp(Buffer.from(bilingualTransSvg))
    .png({ quality: 100 })
    .toFile(path.join(outputDir, 'novand-logo-bilingual-horizontal-transparent.png'));

  // 9. Persian Instagram Posts (1080x1080)
  const postPersianDarkSvg = getPersianInstagramPostSvg({ dark: true });
  await sharp(Buffer.from(postPersianDarkSvg))
    .png({ quality: 100 })
    .toFile(path.join(outputDir, 'novand-instagram-post-persian-dark.png'));

  const postPersianLightSvg = getPersianInstagramPostSvg({ dark: false });
  await sharp(Buffer.from(postPersianLightSvg))
    .png({ quality: 100 })
    .toFile(path.join(outputDir, 'novand-instagram-post-persian-light.png'));

  // 10. Persian Instagram Stories (1080x1920)
  const storyPersianDarkSvg = getPersianInstagramStorySvg({ dark: true });
  await sharp(Buffer.from(storyPersianDarkSvg))
    .png({ quality: 100 })
    .toFile(path.join(outputDir, 'novand-instagram-story-persian-dark.png'));

  const storyPersianLightSvg = getPersianInstagramStorySvg({ dark: false });
  await sharp(Buffer.from(storyPersianLightSvg))
    .png({ quality: 100 })
    .toFile(path.join(outputDir, 'novand-instagram-story-persian-light.png'));

  console.log('✅ All brand, Instagram, and Persian captioned assets successfully exported to public/brand/!');
}

exportAll().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
