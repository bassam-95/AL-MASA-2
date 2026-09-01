const fs = require("fs");

function generateSubpage(pageSlug, pageTitle, heroBreadcrumb, heroTitle, mainContentHtml, activeMenu) {
  return `<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&family=Jost:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./css/inline_styles.css">
  <link rel="stylesheet" href="./wp_content/uploads/elementor/css/post_546.css">
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      font-family: 'Poppins', 'Jost', sans-serif;
      background-color: #f8fafc;
      color: #1e293b;
      display: flex;
      min-height: 100vh;
    }
    .almasa-layout-wrapper {
      display: flex;
      width: 100%;
      min-height: 100vh;
    }
    .almasa-sidebar {
      width: 290px;
      min-width: 290px;
      background: #ffffff;
      border-right: 1px solid #e2e8f0;
      padding: 30px 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 2px 0 10px rgba(0,0,0,0.03);
      position: sticky;
      top: 0;
      height: 100vh;
      z-index: 100;
    }
    .almasa-logo-container {
      text-align: center;
      margin-bottom: 25px;
    }
    .almasa-logo-img {
      max-width: 100%;
      height: auto;
      max-height: 90px;
      display: inline-block;
    }
    .almasa-nav-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .almasa-nav-item a {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 16px;
      font-size: 16px;
      font-weight: 600;
      color: #003A6B;
      text-decoration: none;
      border-radius: 8px;
      transition: all 0.2s ease;
    }
    .almasa-nav-item a:hover {
      color: #D54B00;
      background-color: #f1f5f9;
    }
    .almasa-nav-item.active a {
      color: #D54B00;
      font-weight: 700;
    }
    .almasa-dropdown-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      cursor: pointer;
      width: 100%;
      padding: 10px 16px;
      font-size: 16px;
      font-weight: 600;
      color: #003A6B;
      border-radius: 8px;
    }
    .almasa-dropdown-toggle:hover {
      color: #D54B00;
      background-color: #f1f5f9;
    }
    .almasa-submenu {
      list-style: none;
      padding: 4px 0;
      margin: 0;
      background: #f8fafc;
      border-radius: 8px;
      display: ${activeMenu === 'experience' ? 'block' : 'none'};
    }
    .almasa-submenu.open {
      display: block;
    }
    .almasa-submenu li a {
      font-size: 14px;
      font-weight: 500;
      color: #003A6B;
      padding: 8px 16px;
      display: block;
      text-align: center;
      text-decoration: none;
    }
    .almasa-submenu li a:hover {
      color: #D54B00;
    }
    .almasa-sidebar-bottom {
      margin-top: 20px;
      text-align: center;
    }
    .almasa-flags {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-bottom: 20px;
    }
    .almasa-phone-box {
      font-size: 15px;
      color: #003A6B;
      font-weight: 600;
      line-height: 1.5;
    }
    .almasa-phone-box a {
      color: #003A6B;
      text-decoration: none;
      display: block;
    }
    .almasa-emergency-badge {
      font-size: 13px;
      color: #D54B00;
      font-weight: 600;
      margin-top: 4px;
    }
    .almasa-main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .almasa-hero {
      background: linear-gradient(135deg, #091e36 0%, #003A6B 100%);
      color: #ffffff;
      padding: 70px 50px;
      position: relative;
    }
    .almasa-hero-breadcrumb {
      font-size: 15px;
      font-weight: 500;
      color: #93c5fd;
      margin-bottom: 12px;
    }
    .almasa-hero-breadcrumb a {
      color: #93c5fd;
      text-decoration: none;
    }
    .almasa-hero-title {
      font-size: 44px;
      font-weight: 800;
      margin: 0;
      letter-spacing: 1.5px;
    }
    .almasa-body-container {
      padding: 50px;
      max-width: 1200px;
    }
    .almasa-card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 24px;
      margin-top: 30px;
    }
    .almasa-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
      transition: all 0.3s ease;
    }
    .almasa-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 20px -3px rgba(0,0,0,0.1);
      border-color: #cbd5e1;
    }
    .almasa-btn-primary {
      display: inline-block;
      background: #003A6B;
      color: #ffffff;
      padding: 12px 24px;
      font-size: 15px;
      font-weight: 600;
      border-radius: 8px;
      text-decoration: none;
      transition: background 0.2s ease;
      border: none;
      cursor: pointer;
    }
    .almasa-btn-primary:hover {
      background: #D54B00;
    }
    @media (max-width: 900px) {
      .almasa-layout-wrapper {
        flex-direction: column;
      }
      .almasa-sidebar {
        width: 100%;
        height: auto;
        position: relative;
      }
      .almasa-body-container {
        padding: 24px;
      }
      .almasa-hero {
        padding: 40px 24px;
      }
      .almasa-hero-title {
        font-size: 32px;
      }
    }
  </style>
</head>
<body>
  <div class="almasa-layout-wrapper">
    <!-- Left Sidebar Matching Original Website -->
    <aside class="almasa-sidebar" id="almasaSidebar">
      <div>
        <div class="almasa-logo-container">
          <a href="./index.html">
            <img src="./wp_content/uploads/2020/03/almasa_logo.svg" alt="AL MASA Construction & Design" class="almasa-logo-img">
          </a>
        </div>
        <nav>
          <ul class="almasa-nav-list">
            <li class="almasa-nav-item ${activeMenu === 'home' ? 'active' : ''}"><a href="./index.html">Home</a></li>
            <li class="almasa-nav-item ${activeMenu === 'about' ? 'active' : ''}"><a href="./about.html">About</a></li>
            <li class="almasa-nav-item ${activeMenu === 'experience' ? 'active' : ''}">
              <div class="almasa-dropdown-toggle" onclick="toggleDropdown()">
                <span>Our Experience</span>
                <span id="dropArrow">${activeMenu === 'experience' ? '▲' : '▼'}</span>
              </div>
              <ul class="almasa-submenu ${activeMenu === 'experience' ? 'open' : ''}" id="experienceSubmenu">
                <li><a href="./concrete-structure.html">Concrete structure</a></li>
                <li><a href="./landscape.html">Landscape</a></li>
                <li><a href="./interior-and-exterior-finishing.html">Interior and Exterior Finishing</a></li>
                <li><a href="./projects.html">All Projects</a></li>
              </ul>
            </li>
            <li class="almasa-nav-item ${activeMenu === 'strategies' ? 'active' : ''}"><a href="./strategies-approaches.html">Strategies &amp; Approaches</a></li>
            <li class="almasa-nav-item ${activeMenu === 'contact' ? 'active' : ''}"><a href="./contact.html">Contact</a></li>
            <li class="almasa-nav-item ${activeMenu === 'careers' ? 'active' : ''}"><a href="./careers.html">Careers</a></li>
            <li class="almasa-nav-item ${activeMenu === 'blog' ? 'active' : ''}"><a href="./blog.html">Blog</a></li>
          </ul>
        </nav>
      </div>
      <div class="almasa-sidebar-bottom">
        <div class="almasa-flags">
          <a href="?lang=en"><img src="./image/flag_en.svg" alt="English" style="width:24px;height:16px;border-radius:2px;box-shadow:0 1px 3px rgba(0,0,0,0.2);"></a>
          <a href="?lang=ar"><img src="./image/flag_ar.svg" alt="العربية" style="width:24px;height:16px;border-radius:2px;box-shadow:0 1px 3px rgba(0,0,0,0.2);"></a>
        </div>
        <div class="almasa-phone-box">
          <a href="tel:+201273350041">📞 +20 127 335 0041</a>
          <a href="tel:+201204966069">📞 +20 120 496 6069</a>
          <div class="almasa-emergency-badge">Emergency? Call Now!</div>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="almasa-main-content">
      <!-- Dark Blue Hero Header (Screenshot 2) -->
      <section class="almasa-hero">
        <div class="almasa-hero-breadcrumb">${heroBreadcrumb}</div>
        <h1 class="almasa-hero-title">${heroTitle}</h1>
      </section>

      <!-- Page Content -->
      <div class="almasa-body-container">
        ${mainContentHtml}
      </div>

      <!-- Footer -->
      <footer style="background:#091e36;color:#94a3b8;padding:30px 50px;margin-top:auto;font-size:14px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;">
        <div>© 2026 AL MASA Construction &amp; Design. All rights reserved.</div>
        <div style="display:flex;gap:20px;">
          <a href="./about.html" style="color:#cbd5e1;text-decoration:none;">About</a>
          <a href="./projects.html" style="color:#cbd5e1;text-decoration:none;">Projects</a>
          <a href="./contact.html" style="color:#cbd5e1;text-decoration:none;">Contact</a>
        </div>
      </footer>
    </main>
  </div>

  <script>
    function toggleDropdown() {
      const menu = document.getElementById("experienceSubmenu");
      const arrow = document.getElementById("dropArrow");
      if (menu.classList.contains("open")) {
        menu.classList.remove("open");
        arrow.textContent = "▼";
      } else {
        menu.classList.add("open");
        arrow.textContent = "▲";
      }
    }
  </script>
</body>
</html>`;
}

// 1. About Page
const aboutContent = `
  <div style="display:flex;flex-direction:column;gap:40px;">
    <div style="background:#ffffff;border-radius:12px;padding:36px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);border:1px solid #e2e8f0;">
      <h2 style="font-size:30px;color:#003A6B;margin-top:0;margin-bottom:16px;font-weight:700;">About AL MASA</h2>
      <p style="font-size:17px;line-height:1.7;color:#475569;">
        <strong>AL MASA Construction &amp; Design</strong> is one of Egypt's premier general contracting firms, operating with unwavering dedication to civil engineering excellence, precision architectural finishing, and sustainable landscape infrastructure. Established with a vision to shape the future of modern urban spaces, we deliver turnkey solutions for government entities, corporate giants, and private developers.
      </p>
      <p style="font-size:17px;line-height:1.7;color:#475569;">
        From high-rise concrete skeletons and deep raft foundations in the New Administrative Capital to luxury residential resorts and mega industrial hubs, AL MASA combines cutting-edge construction technology with stringent safety and quality protocols.
      </p>
    </div>

    <!-- Stats Section Matching Screenshot 1 -->
    <div class="almasa-stats-section" style="border-radius:12px;">
      <div class="almasa-stats-grid">
        <div class="almasa-stat-item">
          <div class="almasa-stat-number">250+</div>
          <div class="almasa-stat-label">Projects Completed</div>
        </div>
        <div class="almasa-stat-item">
          <div class="almasa-stat-number">13+</div>
          <div class="almasa-stat-label">Market Leaders &amp; Partners</div>
        </div>
        <div class="almasa-stat-item">
          <div class="almasa-stat-number">200+</div>
          <div class="almasa-stat-label">Loyal &amp; Satisfied Clients</div>
        </div>
      </div>
      <div class="almasa-dotted-pattern"></div>
    </div>

    <!-- Core Pillars -->
    <div class="almasa-card-grid">
      <div class="almasa-card">
        <div style="font-size:32px;margin-bottom:12px;">🏗️</div>
        <h3 style="color:#003A6B;margin-top:0;margin-bottom:10px;font-size:20px;">Civil &amp; Structural Prowess</h3>
        <p style="color:#64748b;line-height:1.6;font-size:15px;">Advanced post-tensioning, heavy piling, and reinforced concrete superstructures engineered to withstand high dynamic loads.</p>
      </div>
      <div class="almasa-card">
        <div style="font-size:32px;margin-bottom:12px;">🌳</div>
        <h3 style="color:#003A6B;margin-top:0;margin-bottom:10px;font-size:20px;">Urban Landscape Mastery</h3>
        <p style="color:#64748b;line-height:1.6;font-size:15px;">Hardscape promenades, smart water management systems, and ambient lighting that elevate human well-being.</p>
      </div>
      <div class="almasa-card">
        <div style="font-size:32px;margin-bottom:12px;">🏛️</div>
        <h3 style="color:#003A6B;margin-top:0;margin-bottom:10px;font-size:20px;">Turnkey Finishing &amp; MEP</h3>
        <p style="color:#64748b;line-height:1.6;font-size:15px;">Luxury curtain wall facades, GRC cladding, precision acoustic ceilings, and integrated mechanical-electrical systems.</p>
      </div>
    </div>
  </div>
`;
fs.writeFileSync("about.html", generateSubpage("about", "About Us | AL MASA Construction & Design", '<a href="./index.html">Home</a> — About', "WE BUILD FUTURE", aboutContent, "about"));

// 2. Concrete Structure Page
const concreteContent = `
  <div style="display:flex;flex-direction:column;gap:36px;">
    <div style="background:#ffffff;border-radius:12px;padding:36px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);border:1px solid #e2e8f0;">
      <h2 style="font-size:28px;color:#003A6B;margin-top:0;margin-bottom:16px;">Heavy Concrete &amp; Structural Engineering</h2>
      <p style="font-size:16px;line-height:1.7;color:#475569;">
        Our concrete engineering division executes high-tolerance cast-in-place and pre-cast concrete structures. With our own modern machinery fleet including stationary boom pumps, tower cranes, and laser screening systems, we ensure the highest durability in extreme soil and climate conditions.
      </p>
    </div>

    <div class="almasa-card-grid">
      <div class="almasa-card">
        <img src="./wp_content/uploads/2020/04/dji_0232_1024x683.jpg" alt="Piling & Raft" style="width:100%;height:200px;object-fit:cover;border-radius:8px;margin-bottom:16px;">
        <h3 style="color:#003A6B;margin:0 0 8px 0;font-size:20px;">Deep Piling &amp; Raft Foundation</h3>
        <p style="color:#64748b;font-size:14px;line-height:1.6;">Continuous flight auger (CFA) piling and massive multi-thousand cubic meter concrete pours for skyscraper basements.</p>
      </div>
      <div class="almasa-card">
        <img src="./wp_content/uploads/2020/04/dji_0997_1024x683.jpg" alt="Commercial Slabs" style="width:100%;height:200px;object-fit:cover;border-radius:8px;margin-bottom:16px;">
        <h3 style="color:#003A6B;margin:0 0 8px 0;font-size:20px;">Post-Tensioned Slabs</h3>
        <p style="color:#64748b;font-size:14px;line-height:1.6;">High-span column-free layouts for retail malls, corporate office buildings, and multi-deck underground parking facilities.</p>
      </div>
      <div class="almasa-card">
        <img src="./wp_content/uploads/2020/04/1_1170x878_1_1024x683.jpg" alt="Industrial Frames" style="width:100%;height:200px;object-fit:cover;border-radius:8px;margin-bottom:16px;">
        <h3 style="color:#003A6B;margin:0 0 8px 0;font-size:20px;">Industrial Mega-Frames</h3>
        <p style="color:#64748b;font-size:14px;line-height:1.6;">Reinforced concrete columns, pre-stressed beams, and heavy machine foundation pads engineered for industrial plants.</p>
      </div>
    </div>
  </div>
`;
fs.writeFileSync("concrete-structure.html", generateSubpage("concrete", "Concrete Structure | AL MASA Construction & Design", '<a href="./index.html">Home</a> — Our Experience — Concrete structure', "CONCRETE STRUCTURE", concreteContent, "experience"));

// 3. Landscape Page
const landscapeContent = `
  <div style="display:flex;flex-direction:column;gap:36px;">
    <div style="background:#ffffff;border-radius:12px;padding:36px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);border:1px solid #e2e8f0;">
      <h2 style="font-size:28px;color:#003A6B;margin-top:0;margin-bottom:16px;">Comprehensive Landscape &amp; Urban Masterplanning</h2>
      <p style="font-size:16px;line-height:1.7;color:#475569;">
        AL MASA delivers breathtaking outdoor environments that blend botanical beauty with cutting-edge hardscape engineering. We specialize in public parks, gated compounds, commercial promenades, and sports complexes.
      </p>
    </div>

    <div class="almasa-card-grid">
      <div class="almasa-card">
        <img src="./wp_content/uploads/2024/12/october_7.png" alt="Hardscape Plaza" style="width:100%;height:200px;object-fit:cover;border-radius:8px;margin-bottom:16px;">
        <h3 style="color:#003A6B;margin:0 0 8px 0;font-size:20px;">Hardscape &amp; Pedestrian Plazas</h3>
        <p style="color:#64748b;font-size:14px;line-height:1.6;">Interlocking pavers, stamped concrete, natural Egyptian granite, pergolas, and architectural water fountains.</p>
      </div>
      <div class="almasa-card">
        <img src="./wp_content/uploads/2024/12/gareb_3.jpg" alt="Softscape & Irrigation" style="width:100%;height:200px;object-fit:cover;border-radius:8px;margin-bottom:16px;">
        <h3 style="color:#003A6B;margin:0 0 8px 0;font-size:20px;">Softscape &amp; Smart Irrigation</h3>
        <p style="color:#64748b;font-size:14px;line-height:1.6;">Automated central weather-controlled drip and rotor irrigation, indigenous drought-tolerant flora, and lush green lawns.</p>
      </div>
    </div>
  </div>
`;
fs.writeFileSync("landscape.html", generateSubpage("landscape", "Landscape | AL MASA Construction & Design", '<a href="./index.html">Home</a> — Our Experience — Landscape', "LANDSCAPE ARCHITECTURE", landscapeContent, "experience"));

// 4. Finishing Page
const finishingContent = `
  <div style="display:flex;flex-direction:column;gap:36px;">
    <div style="background:#ffffff;border-radius:12px;padding:36px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);border:1px solid #e2e8f0;">
      <h2 style="font-size:28px;color:#003A6B;margin-top:0;margin-bottom:16px;">Interior &amp; Exterior Architectural Finishing</h2>
      <p style="font-size:16px;line-height:1.7;color:#475569;">
        We craft elegant spaces with world-class materials and exacting craftsmanship. From double-glazed thermal curtain walls and GRC facades to ultra-luxurious marble lobbies and intelligent acoustic workspaces.
      </p>
    </div>

    <div class="almasa-card-grid">
      <div class="almasa-card">
        <img src="./wp_content/uploads/2024/12/gareb_3.jpg" alt="Façade Engineering" style="width:100%;height:200px;object-fit:cover;border-radius:8px;margin-bottom:16px;">
        <h3 style="color:#003A6B;margin:0 0 8px 0;font-size:20px;">Curtain Walls &amp; Cladding</h3>
        <p style="color:#64748b;font-size:14px;line-height:1.6;">Structural glazing, GRC ornate panels, aluminum composite cladding, and energy-efficient building envelopes.</p>
      </div>
      <div class="almasa-card">
        <img src="./wp_content/uploads/2024/12/whatsapp_image_2024_12_18_at_12.05.57_am.jpeg" alt="Turnkey Fitout" style="width:100%;height:200px;object-fit:cover;border-radius:8px;margin-bottom:16px;">
        <h3 style="color:#003A6B;margin:0 0 8px 0;font-size:20px;">Turnkey Interior Fit-Out</h3>
        <p style="color:#64748b;font-size:14px;line-height:1.6;">Italian Carrara marble flooring, gypsum partition systems, custom joinery, smart lighting, and MEP integration.</p>
      </div>
    </div>
  </div>
`;
fs.writeFileSync("interior-and-exterior-finishing.html", generateSubpage("finishing", "Interior & Exterior Finishing | AL MASA Construction & Design", '<a href="./index.html">Home</a> — Our Experience — Finishing', "FINISHING & DESIGN", finishingContent, "experience"));

// 5. Projects Page
const projectsContent = `
  <div style="display:flex;flex-direction:column;gap:36px;">
    <div style="background:#ffffff;border-radius:12px;padding:36px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);border:1px solid #e2e8f0;">
      <h2 style="font-size:28px;color:#003A6B;margin-top:0;margin-bottom:16px;">Our Landmark Projects</h2>
      <p style="font-size:16px;line-height:1.7;color:#475569;">
        Explore our diverse portfolio spanning civic landmarks, commercial towers, gated residential developments, and industrial facilities across Egypt.
      </p>
    </div>

    <div class="almasa-card-grid">
      <div class="almasa-card">
        <img src="./wp_content/uploads/2020/04/dji_0232_1024x683.jpg" alt="Capital Tower" style="width:100%;height:220px;object-fit:cover;border-radius:8px;margin-bottom:16px;">
        <div style="color:#eab308;font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:1px;">New Administrative Capital</div>
        <h3 style="color:#003A6B;margin:6px 0 8px 0;font-size:20px;">Capital Financial Center</h3>
        <p style="color:#64748b;font-size:14px;">Full reinforced concrete skeleton, 3 underground basement parking levels, and structural steel rooftop crowns.</p>
      </div>
      <div class="almasa-card">
        <img src="./wp_content/uploads/2020/04/dji_0997_1024x683.jpg" alt="October Complex" style="width:100%;height:220px;object-fit:cover;border-radius:8px;margin-bottom:16px;">
        <div style="color:#eab308;font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:1px;">6th of October City</div>
        <h3 style="color:#003A6B;margin:6px 0 8px 0;font-size:20px;">Al-Masa Industrial Park</h3>
        <p style="color:#64748b;font-size:14px;">Heavy load-bearing concrete flooring, precast industrial sheds, and logistical access networks.</p>
      </div>
      <div class="almasa-card">
        <img src="./wp_content/uploads/2024/12/october_7.png" alt="Zayed Resort" style="width:100%;height:220px;object-fit:cover;border-radius:8px;margin-bottom:16px;">
        <div style="color:#eab308;font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Sheikh Zayed City</div>
        <h3 style="color:#003A6B;margin:6px 0 8px 0;font-size:20px;">Green Valley Landscape</h3>
        <p style="color:#64748b;font-size:14px;">45,000 sqm of hardscape promenades, artificial lagoons, automated irrigation, and decorative pergolas.</p>
      </div>
    </div>
  </div>
`;
fs.writeFileSync("projects.html", generateSubpage("projects", "Projects | AL MASA Construction & Design", '<a href="./index.html">Home</a> — Projects', "LANDMARK PROJECTS", projectsContent, "experience"));
fs.writeFileSync("projects-en.html", generateSubpage("projects-en", "Projects | AL MASA Construction & Design", '<a href="./index.html">Home</a> — Projects', "LANDMARK PROJECTS", projectsContent, "experience"));

// 6. Strategies & Approaches
const strategiesContent = `
  <div style="display:flex;flex-direction:column;gap:36px;">
    <div style="background:#ffffff;border-radius:12px;padding:36px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);border:1px solid #e2e8f0;">
      <h2 style="font-size:28px;color:#003A6B;margin-top:0;margin-bottom:16px;">Our 4-Phase Delivery Framework</h2>
      <p style="font-size:16px;line-height:1.7;color:#475569;">
        At AL MASA, project success is driven by rigorous engineering discipline, transparent scheduling, and advanced 4D BIM modeling.
      </p>
    </div>

    <div class="almasa-card-grid">
      <div class="almasa-card">
        <div style="font-size:24px;font-weight:800;color:#D54B00;margin-bottom:8px;">01</div>
        <h3 style="color:#003A6B;margin:0 0 8px 0;font-size:20px;">Value Engineering</h3>
        <p style="color:#64748b;font-size:14px;line-height:1.6;">Detailed soil analysis, structural optimization, and cost-effective material selection before breaking ground.</p>
      </div>
      <div class="almasa-card">
        <div style="font-size:24px;font-weight:800;color:#D54B00;margin-bottom:8px;">02</div>
        <h3 style="color:#003A6B;margin:0 0 8px 0;font-size:20px;">BIM &amp; Timeline Scheduling</h3>
        <p style="color:#64748b;font-size:14px;line-height:1.6;">Clash detection between architectural, structural, and MEP trades to ensure zero on-site delays.</p>
      </div>
      <div class="almasa-card">
        <div style="font-size:24px;font-weight:800;color:#D54B00;margin-bottom:8px;">03</div>
        <h3 style="color:#003A6B;margin:0 0 8px 0;font-size:20px;">QA/QC &amp; Safety Protocols</h3>
        <p style="color:#64748b;font-size:14px;line-height:1.6;">ISO certified quality inspections at every stage: slump tests, cube crush tests, and zero-accident HSE standards.</p>
      </div>
      <div class="almasa-card">
        <div style="font-size:24px;font-weight:800;color:#D54B00;margin-bottom:8px;">04</div>
        <h3 style="color:#003A6B;margin:0 0 8px 0;font-size:20px;">Handover &amp; Maintenance</h3>
        <p style="color:#64748b;font-size:14px;line-height:1.6;">Comprehensive as-built drawings, warranties, and proactive post-delivery facility management support.</p>
      </div>
    </div>
  </div>
`;
fs.writeFileSync("strategies-approaches.html", generateSubpage("strategies", "Strategies & Approaches | AL MASA Construction & Design", '<a href="./index.html">Home</a> — Strategies &amp; Approaches', "STRATEGIES &amp; APPROACHES", strategiesContent, "strategies"));

// 7. Contact Page
const contactContent = `
  <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(340px, 1fr));gap:36px;">
    <div style="background:#ffffff;border-radius:12px;padding:36px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);border:1px solid #e2e8f0;">
      <h2 style="font-size:26px;color:#003A6B;margin-top:0;margin-bottom:16px;">Request a Quote / Consultation</h2>
      <form id="contactForm" onsubmit="event.preventDefault(); document.getElementById('formSuccess').style.display='block';">
        <div style="margin-bottom:16px;">
          <label style="display:block;font-size:14px;font-weight:600;color:#334155;margin-bottom:6px;">Your Name *</label>
          <input type="text" required placeholder="Eng. Ahmed Hassan" style="width:100%;padding:12px;border:1px solid #cbd5e1;border-radius:8px;">
        </div>
        <div style="margin-bottom:16px;">
          <label style="display:block;font-size:14px;font-weight:600;color:#334155;margin-bottom:6px;">Email Address *</label>
          <input type="email" required placeholder="ahmed@company.com" style="width:100%;padding:12px;border:1px solid #cbd5e1;border-radius:8px;">
        </div>
        <div style="margin-bottom:16px;">
          <label style="display:block;font-size:14px;font-weight:600;color:#334155;margin-bottom:6px;">Phone Number *</label>
          <input type="tel" required placeholder="+20 100 000 0000" style="width:100%;padding:12px;border:1px solid #cbd5e1;border-radius:8px;">
        </div>
        <div style="margin-bottom:16px;">
          <label style="display:block;font-size:14px;font-weight:600;color:#334155;margin-bottom:6px;">Service Needed</label>
          <select style="width:100%;padding:12px;border:1px solid #cbd5e1;border-radius:8px;background:#fff;">
            <option>Concrete Structure &amp; Foundations</option>
            <option>Landscape &amp; Irrigation</option>
            <option>Interior &amp; Exterior Finishing</option>
            <option>Turnkey General Contracting</option>
          </select>
        </div>
        <div style="margin-bottom:20px;">
          <label style="display:block;font-size:14px;font-weight:600;color:#334155;margin-bottom:6px;">Project Details</label>
          <textarea rows="4" placeholder="Briefly describe project location, square meters, timeline..." style="width:100%;padding:12px;border:1px solid #cbd5e1;border-radius:8px;"></textarea>
        </div>
        <button type="submit" class="almasa-btn-primary" style="width:100%;">Submit Inquiry</button>
        <div id="formSuccess" style="display:none;margin-top:16px;padding:12px;background:#dcfce7;color:#166534;border-radius:8px;font-weight:600;text-align:center;">
          ✓ Thank you! Our engineering team will contact you within 24 hours.
        </div>
      </form>
    </div>

    <div style="display:flex;flex-direction:column;gap:24px;">
      <div class="almasa-card">
        <h3 style="color:#003A6B;margin-top:0;">Headquarters</h3>
        <p style="color:#64748b;line-height:1.6;font-size:15px;">
          📍 Cairo, Egypt<br>
          🏢 New Administrative Capital &amp; New Cairo Branch Offices<br>
          📞 +20 127 335 0041<br>
          📞 +20 120 496 6069<br>
          ✉️ info@almasa-ta.com
        </p>
      </div>
      <div class="almasa-card">
        <h3 style="color:#003A6B;margin-top:0;">Working Hours</h3>
        <p style="color:#64748b;line-height:1.6;font-size:15px;">
          Saturday – Thursday: 8:00 AM – 6:00 PM<br>
          Site Operations: 24/7 Active Duty<br>
          Emergency Technical Support: Always Available
        </p>
      </div>
    </div>
  </div>
`;
fs.writeFileSync("contact.html", generateSubpage("contact", "Contact Us | AL MASA Construction & Design", '<a href="./index.html">Home</a> — Contact', "GET IN TOUCH", contactContent, "contact"));

// 8. Careers Page
const careersContent = `
  <div style="display:flex;flex-direction:column;gap:36px;">
    <div style="background:#ffffff;border-radius:12px;padding:36px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);border:1px solid #e2e8f0;">
      <h2 style="font-size:28px;color:#003A6B;margin-top:0;margin-bottom:16px;">Build Your Future With AL MASA</h2>
      <p style="font-size:16px;line-height:1.7;color:#475569;">
        We are constantly looking for talented civil engineers, project managers, BIM specialists, and site supervisors who are passionate about mega-scale construction.
      </p>
    </div>

    <div class="almasa-card-grid">
      <div class="almasa-card">
        <div style="color:#D54B00;font-weight:700;font-size:13px;">FULL TIME • NEW CAPITAL</div>
        <h3 style="color:#003A6B;margin:6px 0 8px 0;font-size:20px;">Senior Structural Site Engineer</h3>
        <p style="color:#64748b;font-size:14px;line-height:1.6;">Min 7 years experience overseeing high-rise reinforced concrete framing and post-tensioning.</p>
        <a href="./contact.html" class="almasa-btn-primary" style="margin-top:10px;padding:8px 16px;font-size:13px;">Apply Now</a>
      </div>
      <div class="almasa-card">
        <div style="color:#D54B00;font-weight:700;font-size:13px;">FULL TIME • CAIRO HQ</div>
        <h3 style="color:#003A6B;margin:6px 0 8px 0;font-size:20px;">Landscape &amp; Irrigation Architect</h3>
        <p style="color:#64748b;font-size:14px;line-height:1.6;">Expertise in hardscape construction drawings, automated hydraulic irrigation, and softscape planting.</p>
        <a href="./contact.html" class="almasa-btn-primary" style="margin-top:10px;padding:8px 16px;font-size:13px;">Apply Now</a>
      </div>
      <div class="almasa-card">
        <div style="color:#D54B00;font-weight:700;font-size:13px;">FULL TIME • SITE BASED</div>
        <h3 style="color:#003A6B;margin:6px 0 8px 0;font-size:20px;">HSE &amp; Quality Control Manager</h3>
        <p style="color:#64748b;font-size:14px;line-height:1.6;">OSHA / NEBOSH certified with track record of zero-incident site management on large commercial projects.</p>
        <a href="./contact.html" class="almasa-btn-primary" style="margin-top:10px;padding:8px 16px;font-size:13px;">Apply Now</a>
      </div>
    </div>
  </div>
`;
fs.writeFileSync("careers.html", generateSubpage("careers", "Careers | AL MASA Construction & Design", '<a href="./index.html">Home</a> — Careers', "JOIN OUR TEAM", careersContent, "careers"));

// 9. Blog Page
const blogContent = `
  <div style="display:flex;flex-direction:column;gap:36px;">
    <div style="background:#ffffff;border-radius:12px;padding:36px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);border:1px solid #e2e8f0;">
      <h2 style="font-size:28px;color:#003A6B;margin-top:0;margin-bottom:16px;">Engineering Insights &amp; Industry News</h2>
      <p style="font-size:16px;line-height:1.7;color:#475569;">
        Technical articles and updates from AL MASA’s engineering desk on sustainable civil design, modern facade technology, and project milestones.
      </p>
    </div>

    <div class="almasa-card-grid">
      <div class="almasa-card">
        <img src="./wp_content/uploads/2020/04/dji_0232_1024x683.jpg" alt="Blog 1" style="width:100%;height:180px;object-fit:cover;border-radius:8px;margin-bottom:16px;">
        <div style="color:#64748b;font-size:13px;">August 2026 • Concrete Engineering</div>
        <h3 style="color:#003A6B;margin:6px 0 8px 0;font-size:18px;">Advances in High-Strength Concrete for High-Rise Basements</h3>
        <p style="color:#64748b;font-size:14px;line-height:1.6;">How self-compacting mixes reduce void ratios and increase structural longevity under extreme ground pressure.</p>
      </div>
      <div class="almasa-card">
        <img src="./wp_content/uploads/2024/12/october_7.png" alt="Blog 2" style="width:100%;height:180px;object-fit:cover;border-radius:8px;margin-bottom:16px;">
        <div style="color:#64748b;font-size:13px;">July 2026 • Landscape Tech</div>
        <h3 style="color:#003A6B;margin:6px 0 8px 0;font-size:18px;">Smart Centralized Irrigation in Arid Urban Environments</h3>
        <p style="color:#64748b;font-size:14px;line-height:1.6;">Reducing potable water usage by 40% using IoT soil moisture sensors and weather forecast automation.</p>
      </div>
      <div class="almasa-card">
        <img src="./wp_content/uploads/2024/12/gareb_3.jpg" alt="Blog 3" style="width:100%;height:180px;object-fit:cover;border-radius:8px;margin-bottom:16px;">
        <div style="color:#64748b;font-size:13px;">June 2026 • Architectural Finishing</div>
        <h3 style="color:#003A6B;margin:6px 0 8px 0;font-size:18px;">Curtain Wall Thermal Envelope Performance in North Africa</h3>
        <p style="color:#64748b;font-size:14px;line-height:1.6;">Selecting Low-E coatings and thermal break aluminum frames to achieve LEED Gold energy certifications.</p>
      </div>
    </div>
  </div>
`;
fs.writeFileSync("blog.html", generateSubpage("blog", "Blog & Insights | AL MASA Construction & Design", '<a href="./index.html">Home</a> — Blog', "NEWS &amp; INSIGHTS", blogContent, "blog"));

console.log("All subpages generated!");
