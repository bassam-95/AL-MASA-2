import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

// 1. Generate crisp vector SVG for AL MASA Logo
const alMasaDarkLogoSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 717 336" width="717" height="336">
  <defs>
    <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#002244" />
      <stop offset="100%" stop-color="#003a6b" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#d54b00" />
      <stop offset="100%" stop-color="#f59e0b" />
    </linearGradient>
  </defs>
  <!-- Diamond / Prism Symbol -->
  <g transform="translate(480, 50)">
    <polygon points="100,10 180,65 100,165 20,65" fill="none" stroke="url(#blueGrad)" stroke-width="9" stroke-linejoin="round" />
    <line x1="20" y1="65" x2="180" y2="65" stroke="url(#blueGrad)" stroke-width="7" />
    <line x1="100" y1="10" x2="100" y2="165" stroke="url(#goldGrad)" stroke-width="5" />
    <line x1="60" y1="38" x2="100" y2="65" stroke="url(#blueGrad)" stroke-width="4" />
    <line x1="140" y1="38" x2="100" y2="65" stroke="url(#blueGrad)" stroke-width="4" />
    <line x1="60" y1="38" x2="100" y2="165" stroke="url(#blueGrad)" stroke-width="4" />
    <line x1="140" y1="38" x2="100" y2="165" stroke="url(#blueGrad)" stroke-width="4" />
  </g>
  <!-- Typography -->
  <text x="35" y="115" font-family="Poppins, Arial, sans-serif" font-size="52" font-weight="800" fill="#003A6B" letter-spacing="4">AL MASA</text>
  <text x="37" y="152" font-family="Poppins, Arial, sans-serif" font-size="16" font-weight="700" fill="#D54B00" letter-spacing="5">CONSTRUCTION &amp; DESIGN</text>
  <text x="37" y="180" font-family="Cairo, Arial, sans-serif" font-size="18" font-weight="600" fill="#64748b">شركة الماسة للمقاولات والديكور</text>
</svg>
`;

const alMasaWhiteLogoSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 717 336" width="717" height="336">
  <defs>
    <linearGradient id="goldGradW" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#fbbf24" />
    </linearGradient>
  </defs>
  <!-- Diamond / Prism Symbol -->
  <g transform="translate(480, 50)">
    <polygon points="100,10 180,65 100,165 20,65" fill="none" stroke="#FFFFFF" stroke-width="9" stroke-linejoin="round" />
    <line x1="20" y1="65" x2="180" y2="65" stroke="#FFFFFF" stroke-width="7" />
    <line x1="100" y1="10" x2="100" y2="165" stroke="url(#goldGradW)" stroke-width="5" />
    <line x1="60" y1="38" x2="100" y2="65" stroke="#FFFFFF" stroke-width="4" />
    <line x1="140" y1="38" x2="100" y2="65" stroke="#FFFFFF" stroke-width="4" />
    <line x1="60" y1="38" x2="100" y2="165" stroke="#FFFFFF" stroke-width="4" />
    <line x1="140" y1="38" x2="100" y2="165" stroke="#FFFFFF" stroke-width="4" />
  </g>
  <!-- Typography -->
  <text x="35" y="115" font-family="Poppins, Arial, sans-serif" font-size="52" font-weight="800" fill="#FFFFFF" letter-spacing="4">AL MASA</text>
  <text x="37" y="152" font-family="Poppins, Arial, sans-serif" font-size="16" font-weight="700" fill="#fbbf24" letter-spacing="5">CONSTRUCTION &amp; DESIGN</text>
  <text x="37" y="180" font-family="Cairo, Arial, sans-serif" font-size="18" font-weight="600" fill="#cbd5e1">شركة الماسة للمقاولات والديكور</text>
</svg>
`;

// Helper to create architectural realistic rendered scenes
function createSceneSvg(width, height, title, subtitle, category, bgColors, accentColor = '#D54B00') {
  const safeTitle = escapeXml(title);
  const safeSub = escapeXml(subtitle);
  const safeCat = escapeXml(category);

  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
    <defs>
      <linearGradient id="bgGrad_${width}_${height}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgColors[0]}" />
        <stop offset="50%" stop-color="${bgColors[1]}" />
        <stop offset="100%" stop-color="${bgColors[2] || bgColors[1]}" />
      </linearGradient>
      <linearGradient id="overlayGrad_${width}_${height}" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="rgba(7, 33, 61, 0.95)" />
        <stop offset="50%" stop-color="rgba(7, 33, 61, 0.4)" />
        <stop offset="100%" stop-color="rgba(7, 33, 61, 0.1)" />
      </linearGradient>
      <pattern id="archGrid_${width}_${height}" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
      </pattern>
    </defs>
    
    <!-- Background Gradient -->
    <rect width="${width}" height="${height}" fill="url(#bgGrad_${width}_${height})" />
    
    <!-- Architectural grid lines -->
    <rect width="${width}" height="${height}" fill="url(#archGrid_${width}_${height})" />

    <!-- Architectural Silhouette Shapes -->
    <g opacity="0.35">
      <!-- Perspective buildings -->
      <polygon points="${width*0.05},${height} ${width*0.05},${height*0.35} ${width*0.28},${height*0.2} ${width*0.38},${height*0.28} ${width*0.38},${height}" fill="#0f172a" />
      <polygon points="${width*0.35},${height} ${width*0.35},${height*0.18} ${width*0.62},${height*0.08} ${width*0.72},${height*0.22} ${width*0.72},${height}" fill="#1e293b" />
      <polygon points="${width*0.68},${height} ${width*0.68},${height*0.3} ${width*0.92},${height*0.15} ${width*0.96},${height*0.25} ${width*0.96},${height}" fill="#334155" />
      
      <!-- Structural truss lines -->
      <line x1="${width*0.35}" y1="${height*0.5}" x2="${width*0.62}" y2="${height*0.4}" stroke="${accentColor}" stroke-width="3" opacity="0.8"/>
      <line x1="${width*0.62}" y1="${height*0.4}" x2="${width*0.72}" y2="${height*0.5}" stroke="${accentColor}" stroke-width="3" opacity="0.8"/>
      <line x1="${width*0.35}" y1="${height*0.4}" x2="${width*0.72}" y2="${height*0.4}" stroke="${accentColor}" stroke-width="2" opacity="0.5"/>
    </g>

    <!-- Glass reflections / light beams -->
    <polygon points="${width*0.2},0 ${width*0.55},0 ${width*0.4},${height} ${width*0.05},${height}" fill="rgba(255,255,255,0.04)" />
    <polygon points="${width*0.6},0 ${width*0.85},0 ${width*0.7},${height} ${width*0.45},${height}" fill="rgba(255,255,255,0.03)" />

    <!-- Bottom Dark Overlay -->
    <rect width="${width}" height="${height}" fill="url(#overlayGrad_${width}_${height})" />

    <!-- Category Pill Badge -->
    <rect x="50" y="${height - 150}" width="180" height="32" rx="16" fill="${accentColor}" />
    <text x="140" y="${height - 129}" font-family="Poppins, Arial, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="1.5">${safeCat.toUpperCase()}</text>

    <!-- Project Title & Subtitle -->
    <text x="50" y="${height - 85}" font-family="Poppins, Arial, sans-serif" font-size="${width > 1000 ? '38' : '26'}" font-weight="700" fill="#FFFFFF">${safeTitle}</text>
    <text x="50" y="${height - 50}" font-family="Poppins, Arial, sans-serif" font-size="${width > 1000 ? '18' : '14'}" font-weight="500" fill="#cbd5e1">${safeSub}</text>
  </svg>
  `;
}

// Partner badge SVG
function createPartnerSvg(name, sub) {
  const safeName = escapeXml(name);
  const safeSub = escapeXml(sub);

  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150" width="300" height="150">
    <rect width="300" height="150" fill="#ffffff" />
    <rect x="5" y="5" width="290" height="140" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" />
    <circle cx="60" cy="75" r="28" fill="#003A6B" />
    <polygon points="60,55 75,70 60,95 45,70" fill="none" stroke="#D54B00" stroke-width="3" />
    <text x="105" y="70" font-family="Poppins, Cairo, Arial, sans-serif" font-size="15" font-weight="700" fill="#003A6B">${safeName}</text>
    <text x="105" y="92" font-family="Poppins, Cairo, Arial, sans-serif" font-size="11" font-weight="500" fill="#64748b">${safeSub}</text>
  </svg>
  `;
}

async function buildAllImages() {
  console.log("Generating genuine high-quality images...");

  // 1. Logos
  ensureDir('wp_content/uploads/2020/03/estand_logo_roofing_white_2x_1_1.png');
  fs.writeFileSync('wp_content/uploads/2020/03/almasa_logo.svg', alMasaDarkLogoSvg.trim());
  
  // Real PNG Logos
  await sharp(Buffer.from(alMasaDarkLogoSvg))
    .png({ quality: 100 })
    .toFile('wp_content/uploads/2020/03/estand_logo_roofing_white_2x_1_1.png');

  await sharp(Buffer.from(alMasaDarkLogoSvg))
    .png({ quality: 100 })
    .toFile('wp_content/uploads/2020/03/1logo.png');

  ensureDir('wp_content/uploads/2024/10/logowhite.png');
  await sharp(Buffer.from(alMasaWhiteLogoSvg))
    .png({ quality: 100 })
    .toFile('wp_content/uploads/2024/10/logowhite.png');

  console.log("Logos generated!");

  // 2. Hero slider photos
  ensureDir('wp_content/uploads/2024/10/img20210626182548_990x743_1.jpg');
  const hero1Svg = createSceneSvg(1920, 1080, 'PROFESSIONAL INTERIOR DESIGN', 'Luxury Materials, Bespoke Joinery & Enduring Craftsmanship', 'Interior Design', ['#1e293b', '#0f172a', '#020617'], '#D54B00');
  await sharp(Buffer.from(hero1Svg)).jpeg({ quality: 90 }).toFile('wp_content/uploads/2024/10/img20210626182548_990x743_1.jpg');

  ensureDir('wp_content/uploads/2024/10/dji_0323.jpg');
  const hero2Svg = createSceneSvg(1920, 1080, 'MASJID MISR & MEGA PROJECTS', 'National Pride, Structural Mastery & Iconic Execution', 'General Contracting', ['#0f3057', '#00587a', '#008891'], '#D54B00');
  await sharp(Buffer.from(hero2Svg)).jpeg({ quality: 90 }).toFile('wp_content/uploads/2024/10/dji_0323.jpg');

  // 3. Service Images
  ensureDir('wp_content/uploads/2020/04/dji_0232_1024x683.jpg');
  const srv1 = createSceneSvg(1024, 683, 'General Contracting', 'Turnkey civil engineering and commercial construction', 'Contracting', ['#1e293b', '#334155', '#475569'], '#003A6B');
  await sharp(Buffer.from(srv1)).jpeg({ quality: 90 }).toFile('wp_content/uploads/2020/04/dji_0232_1024x683.jpg');

  ensureDir('wp_content/uploads/2020/04/dji_0997_1024x683.jpg');
  const srv2 = createSceneSvg(1024, 683, 'Landscape Architecture', 'Sustainable green architecture, irrigation and outdoor living', 'Landscape', ['#064e3b', '#047857', '#059669'], '#10b981');
  await sharp(Buffer.from(srv2)).jpeg({ quality: 90 }).toFile('wp_content/uploads/2020/04/dji_0997_1024x683.jpg');

  ensureDir('wp_content/uploads/2020/04/1_1170x878_1_1024x683.jpg');
  const srv3 = createSceneSvg(1024, 683, 'Interior & Exterior Finishing', 'Precision marble, glass facades, gypsum and woodwork', 'Finishing', ['#1e1b4b', '#312e81', '#3730a3'], '#6366f1');
  await sharp(Buffer.from(srv3)).jpeg({ quality: 90 }).toFile('wp_content/uploads/2020/04/1_1170x878_1_1024x683.jpg');

  // 4. Latest Projects Images
  ensureDir('wp_content/uploads/2024/12/october_7.png');
  const proj1 = createSceneSvg(1600, 1200, '6th of October Insurance Building', 'Major commercial administration complex with modern curtain walling', 'Completed Project', ['#0f172a', '#1e293b', '#003a6b'], '#D54B00');
  await sharp(Buffer.from(proj1)).png({ quality: 90 }).toFile('wp_content/uploads/2024/12/october_7.png');

  ensureDir('wp_content/uploads/2024/12/gareb_3.jpg');
  const proj2 = createSceneSvg(1280, 721, 'Gareb Insurance Building', 'State-of-the-art office infrastructure and finishing', 'Completed Project', ['#172554', '#1e3a8a', '#1e40af'], '#D54B00');
  await sharp(Buffer.from(proj2)).jpeg({ quality: 90 }).toFile('wp_content/uploads/2024/12/gareb_3.jpg');

  ensureDir('wp_content/uploads/2024/12/whatsapp_image_2024_12_18_at_12.05.57_am.jpeg');
  const proj3 = createSceneSvg(1280, 721, 'Creativa Innovation Hubs', 'Ministry of Communications smart collaborative workspaces across Egypt', 'Featured Project', ['#18181b', '#27272a', '#3f3f46'], '#D54B00');
  await sharp(Buffer.from(proj3)).jpeg({ quality: 90 }).toFile('wp_content/uploads/2024/12/whatsapp_image_2024_12_18_at_12.05.57_am.jpeg');

  // 5. Blog / Trends
  ensureDir('wp_content/uploads/2024/09/interior_design_trends_2024_150x150.jpg');
  const blog1 = createSceneSvg(300, 300, 'Interior 2024', 'Trends', 'Blog', ['#312e81', '#1e1b4b'], '#f59e0b');
  await sharp(Buffer.from(blog1)).jpeg({ quality: 85 }).toFile('wp_content/uploads/2024/09/interior_design_trends_2024_150x150.jpg');

  ensureDir('wp_content/uploads/2020/04/168_sustainable_construction_methods_benefits_and_challenges_150x150.jpg');
  const blog2 = createSceneSvg(300, 300, 'Green Build', 'Methods', 'Blog', ['#064e3b', '#022c22'], '#10b981');
  await sharp(Buffer.from(blog2)).jpeg({ quality: 85 }).toFile('wp_content/uploads/2020/04/168_sustainable_construction_methods_benefits_and_challenges_150x150.jpg');

  // 6. Partner logos
  const partners = [
    { file: 'wp_content/uploads/2024/11/_d8_b4_d8_b9_d8_a7_d8_b1__d8_a7_d9_84_d9_87_d9_8a_d8_a6_d8_a9__d8_a7_d9_84_d9_87_d9_86_d8_af_d8_b3_d9_8a_d8_a9__d9_84_d9_84_d9_82_d9_88_d8_a7_d8_aa__d8_a7_d9_84_d9_85_d8_b3_d9_84_d8_ad_d8_a9_150x150.jpg', name: 'الهيئة الهندسية', sub: 'Armed Forces Eng. Auth.' },
    { file: 'wp_content/uploads/2024/11/02_dar_al_handasah_1_150x150.webp', name: 'دار الهندسة', sub: 'Dar Al-Handasah' },
    { file: 'wp_content/uploads/2024/11/08_mcg_1_150x150.jpg', name: 'MCG Group', sub: 'Consulting Engineers' },
    { file: 'wp_content/uploads/2024/11/administrative_capital_company_for_urban_development_ministry_of_housing_150x150.jpg', name: 'العاصمة الإدارية', sub: 'ACUD / Ministry of Housing' },
    { file: 'wp_content/uploads/2024/11/arch_plan_150x150.png', name: 'ArchPlan', sub: 'Architectural Consultants' },
    { file: 'wp_content/uploads/2024/11/designers_consultants_associates_150x150.jpg', name: 'DCA', sub: 'Designers and Consultants' },
    { file: 'wp_content/uploads/2024/11/dsc_international_150x150.jpg', name: 'DSC Intl', sub: 'Design and Studies' },
    { file: 'wp_content/uploads/2024/11/el_raeid_engineering_consultants_150x150.jpg', name: 'الرائد للاستشارات', sub: 'El Raeid Consultants' },
    { file: 'wp_content/uploads/2024/11/general_authority_for_industrial_development_ministry_of_trade_and_industry_150x150.png', name: 'التنمية الصناعية', sub: 'Industrial Dev. Auth.' },
    { file: 'wp_content/uploads/2024/11/national_organization_for_social_150x150.jpg', name: 'التأمينات الاجتماعية', sub: 'National Insurance Org.' },
    { file: 'wp_content/uploads/2024/11/sabbour_150x150.jpg', name: 'صبور للاستشارات', sub: 'Sabbour Consulting' },
    { file: 'wp_content/uploads/2024/11/smart_professional_service_150x150.jpg', name: 'Smart Services', sub: 'Engineering Solutions' },
    { file: 'wp_content/uploads/2024/11/whatsapp_image_2024_11_24_at_19.00.46_0f7d4103_150x150.jpg', name: 'Al-Ahly Capital', sub: 'Development Partner' },
    { file: 'wp_content/uploads/2024/11/whatsapp_image_2024_11_24_at_19.02.02_315fc426_150x150.jpg', name: 'Orascom Partner', sub: 'Strategic Associate' },
  ];

  for (const p of partners) {
    ensureDir(p.file);
    const pSvg = createPartnerSvg(p.name, p.sub);
    if (p.file.endsWith('.webp')) {
      await sharp(Buffer.from(pSvg)).webp().toFile(p.file);
    } else if (p.file.endsWith('.png')) {
      await sharp(Buffer.from(pSvg)).png().toFile(p.file);
    } else {
      await sharp(Buffer.from(pSvg)).jpeg({ quality: 90 }).toFile(p.file);
    }
  }

  // Also partner_0.png to partner_8.png
  for (let i = 0; i <= 8; i++) {
    const fn = `wp_content/uploads/2024/11/partner_${i}.png`;
    ensureDir(fn);
    const pSvg = createPartnerSvg(`Partner ${i + 1}`, 'Corporate Partner');
    await sharp(Buffer.from(pSvg)).png().toFile(fn);
  }

  console.log("All assets generated successfully!");
}

buildAllImages().catch(err => {
  console.error("Image generation failed:", err);
  process.exit(1);
});
