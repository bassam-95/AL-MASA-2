/**
 * Al Masa Construction - Enterprise Experience & Navigation Engine
 * Features:
 *  1. Bilingual Switcher (Arabic RTL <-> English LTR) with instant reactivity
 *  2. Full Sub-Page Modal System (About, Concrete Structure, Landscape, Finishing, Strategies, Careers, Blog, Contact)
 *  3. In-Depth Project Detail Inspector with Galleries & High-Performance Video Player
 *  4. Asynchronous Lead Capture & Admin Inquiries Drawer
 *  5. 1-Hour+ Media Streaming Lightbox & Emergency Action Tools
 */
(function() {
  'use strict';

  // State
  let currentLanguage = localStorage.getItem('almasa_lang') || 'en';

  // Translation Dictionary
  const translations = {
    en: {
      nav_home: 'Home',
      nav_about: 'About',
      nav_experience: 'Our Experience',
      nav_concrete: 'Concrete structure',
      nav_landscape: 'Landscape',
      nav_finishing: 'Interior and Exterior Finishing',
      nav_strategies: 'Strategies & Approaches',
      nav_contact: 'Contact',
      nav_careers: 'Careers',
      nav_blog: 'Blog',
      emergency_call: 'Emergency? Call Now!',
      services_offered: 'services offered',
      latest_projects: 'Latest Projects',
      years_exp: '20 Years of experience',
      who_we_are: 'Who We Are',
      services_247: '24/7 Services',
      affordable_price: 'Affordable Price',
      latest_news: 'latest news',
      partners_success: 'Partners of success',
      keep_in_touch: 'Keep in touch',
      news_tips: 'News & Tips',
      call_us: 'Call Us Now',
      request_quote: 'Request a Quote',
      all_rights: 'All rights reserved © Al Masa Contracting',
      close: 'Close',
      send_message: 'Send Message',
      submitting: 'Submitting...',
      inquiries_title: 'Client Inquiries & Quotes',
      no_inquiries: 'No inquiries recorded yet.',
      hero_title_1: 'Building Your Dreams With Concrete Excellence',
      hero_desc_1: 'Pioneering structural engineering, turnkey contracting, and architectural mastery across Egypt and the Middle East.',
      hero_title_2: 'Uncompromising Quality & 20+ Years of Mastery',
      hero_desc_2: 'From mega-scale civil structures to bespoke landscape and luxury finishing, we deliver enduring landmarks.'
    },
    ar: {
      nav_home: 'الرئيسية',
      nav_about: 'من نحن',
      nav_experience: 'خبراتنا ومشاريعنا',
      nav_concrete: 'المنشآت الخرسانية',
      nav_landscape: 'اللاندسكيب وتنسيق المواقع',
      nav_finishing: 'التشطيبات الداخلية والخارجية',
      nav_strategies: 'استراتيجياتنا ونهج العمل',
      nav_contact: 'اتصل بنا',
      nav_careers: 'الوظائف',
      nav_blog: 'المدونة والأخبار',
      emergency_call: 'طوارئ؟ اتصل بنا الآن!',
      services_offered: 'الخدمات المقدمة',
      latest_projects: 'أحدث المشاريع',
      years_exp: 'أكثر من 20 عاماً من الخبرة والتميز',
      who_we_are: 'من نحن',
      services_247: 'خدمات على مدار 24/7',
      affordable_price: 'أفضل قيمة وأسعار تنافسية',
      latest_news: 'أحدث الأخبار والمقالات',
      partners_success: 'شركاء النجاح',
      keep_in_touch: 'ابقَ على تواصل معنا',
      news_tips: 'الأخبار والنصائح',
      call_us: 'اتصل بنا مباشرة',
      request_quote: 'طلب عرض أسعار فوري',
      all_rights: 'جميع الحقوق محفوظة © شركة الماسة للمقاولات العامة',
      close: 'إغلاق',
      send_message: 'إرسال الرسالة',
      submitting: 'جاري الإرسال...',
      inquiries_title: 'طلبات عروض الأسعار والرسائل',
      no_inquiries: 'لا توجد طلبات مسجلة حتى الآن.',
      hero_title_1: 'نبني رؤيتكم بدقة هندسية وخبرة خرسانية رائدة',
      hero_desc_1: 'رواد في الهندسة الإنشائية، المقاولات المتكاملة، والتشطيبات الفاخرة في مصر والشرق الأوسط.',
      hero_title_2: 'جودة استثنائية وأكثر من 20 عاماً من الريادة',
      hero_desc_2: 'من المشروعات القومية الكبرى وحتى أعمال اللاندسكيب والتشطيبات المعمارية الدقيقة.'
    }
  };

  // Subpage Contents
  const subpages = {
    about: {
      titleEn: 'About Al Masa Construction',
      titleAr: 'عن شركة الماسة للمقاولات',
      contentEn: `
        <div class="almasa-subpage-hero">
          <h3>20+ Years of Building Landmark Structures</h3>
          <p>Al Masa Construction is one of Egypt's leading general contracting and civil engineering firms. Founded with a vision of engineering precision, safety, and architectural brilliance, we have successfully executed hundreds of commercial, residential, and infrastructural landmarks.</p>
        </div>
        <div class="almasa-subpage-grid">
          <div class="almasa-card">
            <h4>Our Mission</h4>
            <p>To execute world-class engineering solutions on time, adhering to rigorous international safety standards while optimizing value and sustainability for our clients.</p>
          </div>
          <div class="almasa-card">
            <h4>Our Vision</h4>
            <p>To be the premier general contracting partner in the MENA region, renowned for technical excellence, structural longevity, and innovative finishing.</p>
          </div>
          <div class="almasa-card">
            <h4>Core Values</h4>
            <p>Integrity, Precision Engineering, Total Quality Management (TQM), Unwavering Safety, and Client-Centric Collaboration.</p>
          </div>
        </div>
      `,
      contentAr: `
        <div class="almasa-subpage-hero">
          <h3>أكثر من 20 عاماً من الريادة في التشييد والبناء</h3>
          <p>تعد شركة الماسة للمقاولات العامة من كبرى الشركات الهندسية الرائدة في مصر، حيث تأسست برؤية ترتكز على الدقة الهندسية، معايير السلامة العالمية، والتميز المعماري في تنفيذ كبرى المشروعات السكنية والتجارية والبنية التحتية.</p>
        </div>
        <div class="almasa-subpage-grid">
          <div class="almasa-card">
            <h4>رسالتنا</h4>
            <p>تقديم حلول هندسية وإنشائية بمعايير عالمية مع الالتزام التام بالجداول الزمنية وأعلى اشتراطات الجودة والأمان والاستدامة.</p>
          </div>
          <div class="almasa-card">
            <h4>رؤيتنا</h4>
            <p>أن نكون الشريك الإنشائي الأول والموثوق في منطقة الشرق الأوسط وشمال أفريقيا في مجالات الإنشاءات، اللاندسكيب والتشطيبات المتكاملة.</p>
          </div>
          <div class="almasa-card">
            <h4>قيمنا الجوهرية</h4>
            <p>النزاهة، الدقة الهندسية، إدارة الجودة الشاملة، السلامة المهنية، والاهتمام الفائق بتطلعات العملاء.</p>
          </div>
        </div>
      `
    },
    'concrete-structure': {
      titleEn: 'Concrete Structure Solutions',
      titleAr: 'أعمال المنشآت والخرسانات المسلحة',
      contentEn: `
        <div class="almasa-subpage-hero">
          <h3>Heavy-Duty Structural Engineering & Reinforced Concrete</h3>
          <p>We specialize in complex reinforced concrete works, deep foundation piling, raft slabs, post-tension slabs, and high-rise structural skeletons engineered for multi-decade durability.</p>
        </div>
        <div class="almasa-subpage-features">
          <div class="almasa-feat-item">
            <span class="feat-badge">01</span>
            <div><strong>Deep Foundations & Piling:</strong> State-of-the-art soil stabilization, bored piles, and heavy retaining walls.</div>
          </div>
          <div class="almasa-feat-item">
            <span class="feat-badge">02</span>
            <div><strong>Structural Frames & Skeleton:</strong> Cast-in-place high-grade concrete frames, columns, and shear walls.</div>
          </div>
          <div class="almasa-feat-item">
            <span class="feat-badge">03</span>
            <div><strong>Post-Tension & Pre-Stressed:</strong> Long-span architectural solutions for modern commercial malls and multi-story towers.</div>
          </div>
        </div>
      `,
      contentAr: `
        <div class="almasa-subpage-hero">
          <h3>الهندسة الإنشائية المتقدمة والخرسانة المسلحة</h3>
          <p>نتخصص في تنفيذ كافة الأعمال الخرسانية المعقدة، الأساسات العميقة والخوازيق، اللبشة المسلحة، الأسقف سابقة الإجهاد (Post-Tension)، والهياكل الإنشائية للأبراج والمباني الضخمة.</p>
        </div>
        <div class="almasa-subpage-features">
          <div class="almasa-feat-item">
            <span class="feat-badge">01</span>
            <div><strong>الأساسات والخوازيق العميقة:</strong> أعمال سند جوانب الحفر، الخوازيق الخرسانية، وتدعيم التربة بأحدث المعدات.</div>
          </div>
          <div class="almasa-feat-item">
            <span class="feat-badge">02</span>
            <div><strong>الهياكل الخرسانية المسلحة:</strong> صب وتنفيذ الأعمدة، حوائط القص، والكمرات الخرسانية عالية الإجهاد.</div>
          </div>
          <div class="almasa-feat-item">
            <span class="feat-badge">03</span>
            <div><strong>الأسقف الواسعة والـ Post-Tension:</strong> حلول معمارية حديثة للبحور الواسعة في المولات والمباني الإدارية.</div>
          </div>
        </div>
      `
    },
    landscape: {
      titleEn: 'Landscape & Exterior Architecture',
      titleAr: 'اللاندسكيب وتنسيق المواقع',
      contentEn: `
        <div class="almasa-subpage-hero">
          <h3>Harmonious Hardscape & Softscape Solutions</h3>
          <p>Transforming open environments into lush, functional, and visually captivating outdoor spaces. From modern irrigation networks to hardscape plazas and illuminated water features.</p>
        </div>
        <div class="almasa-subpage-grid">
          <div class="almasa-card">
            <h4>Hardscape Architecture</h4>
            <p>Interlock paving, stamped concrete, marble plazas, pergolas, retaining stone curbs, and pedestrian promenades.</p>
          </div>
          <div class="almasa-card">
            <h4>Softscape & Greenery</h4>
            <p>Custom botanical selection, manicured turf, palm trees, and intelligent automated drip/sprinkler irrigation systems.</p>
          </div>
          <div class="almasa-card">
            <h4>Water Features & Lighting</h4>
            <p>Dynamic fountains, infinity pools, ambient LED landscape illumination, and serene outdoor water bodies.</p>
          </div>
        </div>
      `,
      contentAr: `
        <div class="almasa-subpage-hero">
          <h3>حلول الهاردسكيب والسوفتسكيب المتكاملة</h3>
          <p>نحول المساحات المفتوحة إلى بيئات طبيعية ساحرة تجمع بين الجمال والعملية، من شبكات الري الذكية وحتى الساحات المرصوفة والمسطحات المائية المضيئة.</p>
        </div>
        <div class="almasa-subpage-grid">
          <div class="almasa-card">
            <h4>أعمال الهاردسكيب</h4>
            <p>أعمال الإنترلوك، الخرسانة المطبوعة، مشايات الرخام والجرانيت، البرجولات، والأسوار الديكورية.</p>
          </div>
          <div class="almasa-card">
            <h4>أعمال السوفتسكيب والزراعة</h4>
            <p>توريد وزراعة الأشجار والنخيل والمسطحات الخضراء مع شبكات ري أوتوماتيكية متطورة وموفرة للمياه.</p>
          </div>
          <div class="almasa-card">
            <h4>النوافير وحمامات السباحة</h4>
            <p>شلالات، نوافير راقصة، حمامات سباحة فاخرة، وتوزيع إضاءات ديكورية خارجية تخطف الأنظار.</p>
          </div>
        </div>
      `
    },
    'interior-and-exterior-finishing': {
      titleEn: 'Interior & Exterior Finishing',
      titleAr: 'التشطيبات الداخلية والخارجية المتكاملة',
      contentEn: `
        <div class="almasa-subpage-hero">
          <h3>Turnkey Architectural Craftsmanship & Luxury Finishing</h3>
          <p>Delivering pristine turnkey interiors and modern facade architecture with obsessive attention to materials, acoustic balance, lighting, and spatial aesthetics.</p>
        </div>
        <div class="almasa-subpage-grid">
          <div class="almasa-card">
            <h4>Exterior Facades</h4>
            <p>Curtain walls, GRC/GRG claddings, structural glazing, Alucobond, natural stone, and thermal insulation.</p>
          </div>
          <div class="almasa-card">
            <h4>Luxury Interiors</h4>
            <p>Premium Italian marble, gypsum board ceiling designs, smart electrical automation, and bespoke woodwork.</p>
          </div>
          <div class="almasa-card">
            <h4>MEP Contracting</h4>
            <p>Integrated mechanical, electrical, plumbing, HVAC ventilation, and fire safety systems to international codes.</p>
          </div>
        </div>
      `,
      contentAr: `
        <div class="almasa-subpage-hero">
          <h3>أرقى مستويات التشطيب المعماري والديكور المتكامل</h3>
          <p>تنفيذ متكامل على المفتاح للواجهات الخارجية والديكورات الداخلية الفاخرة بأدق تفاصيل الخامات، التناغم الصوتي، الإضاءة، والذوق المعماري الرفيع.</p>
        </div>
        <div class="almasa-subpage-grid">
          <div class="almasa-card">
            <h4>الواجهات الخارجية</h4>
            <p>واجهات الزجاج والـ Curtain Wall، تجاليد GRC، كلادينج، أحجار طبيعية، وعزل حراري متطور.</p>
          </div>
          <div class="almasa-card">
            <h4>التشطيبات الداخلية الفاخرة</h4>
            <p>أرضيات رخام وجرانيت، أسقف معلقة وجبس بورد، دهانات ديكورية، وأعمال خشبية وتجهيزات ذكية.</p>
          </div>
          <div class="almasa-card">
            <h4>الأعمال الكهروميكانيكية (MEP)</h4>
            <p>أنظمة التكييف المركزي، مكافحة الحريق، شبكات الكهرباء والتيار الخفيف، والسباكة الحديثة.</p>
          </div>
        </div>
      `
    },
    'strategies-approaches': {
      titleEn: 'Strategies & Engineering Approaches',
      titleAr: 'استراتيجياتنا ومنهجية العمل',
      contentEn: `
        <div class="almasa-subpage-hero">
          <h3>Methodical Project Management & Quality Control</h3>
          <p>Our operational model leverages BIM (Building Information Modeling), agile procurement, strict milestone tracking, and daily QA/QC inspections to guarantee zero-defect project delivery.</p>
        </div>
        <div class="almasa-subpage-features">
          <div class="almasa-feat-item">
            <span class="feat-badge">Phase 1</span>
            <div><strong>Feasibility & BIM Coordination:</strong> 3D collision detection and precise quantity estimation before site mobilization.</div>
          </div>
          <div class="almasa-feat-item">
            <span class="feat-badge">Phase 2</span>
            <div><strong>Lean Construction Execution:</strong> Just-in-time material logistics and certified safety protocols (OSHA compliant).</div>
          </div>
          <div class="almasa-feat-item">
            <span class="feat-badge">Phase 3</span>
            <div><strong>Rigorous QA/QC & Handover:</strong> Comprehensive testing, snag list clearance, and full as-built documentation.</div>
          </div>
        </div>
      `,
      contentAr: `
        <div class="almasa-subpage-hero">
          <h3>إدارة المشروعات الاحترافية ورقابة الجودة الشاملة</h3>
          <p>يعتمد نموذجنا التشغيلي على أحدث نظم نمذجة معلومات البناء (BIM)، الإدارة اللوجستية الفعالة، والرقابة الصارمة على الجودة لضمان تسليم المشروعات دون أي أخطاء.</p>
        </div>
        <div class="almasa-subpage-features">
          <div class="almasa-feat-item">
            <span class="feat-badge">المرحلة 1</span>
            <div><strong>التخطيط الهندسي ونمذجة BIM:</strong> دراسة المخططات واكتشاف التعارضات وحساب الكميات بدقة متناهية.</div>
          </div>
          <div class="almasa-feat-item">
            <span class="feat-badge">المرحلة 2</span>
            <div><strong>التنفيذ وإدارة الموقع:</strong> تطبيق أعلى معايير السلامة المهنية ومطابقة المواصفات مع توريدات فورية منتظمة.</div>
          </div>
          <div class="almasa-feat-item">
            <span class="feat-badge">المرحلة 3</span>
            <div><strong>الفحص وضبط الجودة والتسليم:</strong> اختبارات معملية للخرسانات، فحص نهائي دقيق، وتسليم المخططات التنفيذية الكاملة.</div>
          </div>
        </div>
      `
    },
    careers: {
      titleEn: 'Careers at Al Masa',
      titleAr: 'انضم لفريق عمل الماسة',
      contentEn: `
        <div class="almasa-subpage-hero">
          <h3>Build Your Future With Egypt's Premier Contracting Team</h3>
          <p>We are constantly seeking passionate civil engineers, site managers, architects, QA/QC inspectors, and safety officers to lead our expanding portfolio of landmark projects.</p>
        </div>
        <div class="almasa-career-form-card">
          <h4>Submit Your Career Application</h4>
          <form class="almasa-lead-form" id="almasa-career-form">
            <div class="form-row">
              <input type="text" name="name" placeholder="Full Name" required />
              <input type="email" name="email" placeholder="Email Address" required />
            </div>
            <div class="form-row">
              <input type="tel" name="phone" placeholder="Phone / WhatsApp" required />
              <select name="service">
                <option value="Civil Site Engineer">Civil Site Engineer</option>
                <option value="Architectural Finishing Engineer">Architectural Finishing Engineer</option>
                <option value="QA/QC Engineer">QA/QC Engineer</option>
                <option value="HSE Safety Officer">HSE Safety Officer</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Surveyor">Surveyor</option>
              </select>
            </div>
            <textarea name="message" rows="3" placeholder="Brief summary of your experience and qualifications" required></textarea>
            <button type="submit" class="almasa-btn-primary">Submit Application</button>
            <div class="form-response"></div>
          </form>
        </div>
      `,
      contentAr: `
        <div class="almasa-subpage-hero">
          <h3>ابنِ مستقبلك المهني مع رواد قطاع المقاولات</h3>
          <p>نبحث دائماً عن الكفاءات الهندسية المتميزة والكوادر الطموحة في مجالات الهندسة المدنية، المعمارية، إدارة المشروعات، ومراقبة الجودة والسلامة المهنية.</p>
        </div>
        <div class="almasa-career-form-card">
          <h4>تقديم طلب توظيف فوري</h4>
          <form class="almasa-lead-form" id="almasa-career-form">
            <div class="form-row">
              <input type="text" name="name" placeholder="الاسم بالكامل" required />
              <input type="email" name="email" placeholder="البريد الإلكتروني" required />
            </div>
            <div class="form-row">
              <input type="tel" name="phone" placeholder="رقم الهاتف / الواتساب" required />
              <select name="service">
                <option value="مهندس موقع مدني">مهندس موقع مدني</option>
                <option value="مهندس تشطيبات معمارية">مهندس تشطيبات معمارية</option>
                <option value="مهندس ضبط وجودة QA/QC">مهندس ضبط وجودة QA/QC</option>
                <option value="مسؤول سلامة وصحة مهنية HSE">مسؤول سلامة وصحة مهنية HSE</option>
                <option value="مدير مشروع">مدير مشروع</option>
                <option value="مساح">مساح</option>
              </select>
            </div>
            <textarea name="message" rows="3" placeholder="ملخص موجز لخبراتك وسنوات العمل" required></textarea>
            <button type="submit" class="almasa-btn-primary">إرسال طلب التوظيف</button>
            <div class="form-response"></div>
          </form>
        </div>
      `
    },
    blog: {
      titleEn: 'Industry News & Construction Insights',
      titleAr: 'المدونة والأخبار الهندسية',
      contentEn: `
        <div class="almasa-subpage-hero">
          <h3>Insights from the Construction Frontier</h3>
          <p>Stay informed with the latest updates on modern concrete technology, sustainable construction standards, and market updates from Al Masa's engineering think-tank.</p>
        </div>
        <div class="almasa-subpage-grid">
          <div class="almasa-card">
            <span class="blog-date">August 2026</span>
            <h4>Advancements in High-Performance Self-Compacting Concrete</h4>
            <p>How modern chemical admixtures and automated batching are reducing structural voids and accelerating curing times on mega-projects.</p>
          </div>
          <div class="almasa-card">
            <span class="blog-date">July 2026</span>
            <h4>Sustainable Landscape Architecture & Water Conservation</h4>
            <p>Smart irrigation telemetry and native xeriscaping strategies tailored for the Egyptian climate.</p>
          </div>
          <div class="almasa-card">
            <span class="blog-date">June 2026</span>
            <h4>Integrated Safety Management in High-Rise Scaffolding</h4>
            <p>Achieving zero lost-time incidents through digital site safety monitoring and continuous team certifications.</p>
          </div>
        </div>
      `,
      contentAr: `
        <div class="almasa-subpage-hero">
          <h3>رؤى وأخبار من عالم البناء والتشييد</h3>
          <p>تابع أحدث مقالاتنا الهندسية حول تكنولوجيا الخرسانات الحديثة، معايير البناء المستدام، وتطورات سوق المقاولات والإنشاءات في مصر والمنطقة.</p>
        </div>
        <div class="almasa-subpage-grid">
          <div class="almasa-card">
            <span class="blog-date">أغسطس 2026</span>
            <h4>تطورات الخرسانات ذاتية الدمج عالية المقاومة</h4>
            <p>كيف تساهم الإضافات الكيميائية المتطورة ومحطات الخلط المركزية في رفع كفاءة واستدامة المنشآت الضخمة.</p>
          </div>
          <div class="almasa-card">
            <span class="blog-date">يوليو 2026</span>
            <h4>العمارة الخضراء وترشيد استهلاك المياه في اللاندسكيب</h4>
            <p>استراتيجيات نظم الري الذكية واختيار النباتات الملائمة للمناخ مع توفير أكثر من 40% من المياه.</p>
          </div>
          <div class="almasa-card">
            <span class="blog-date">يونيو 2026</span>
            <h4>إدارة السلامة والصحة المهنية في المشروعات الكبرى</h4>
            <p>تحقيق صفر حوادث مهنية عبر الرقابة الرقمية المستمرة وبرامج التدريب الدوري للكوادر الميدانية.</p>
          </div>
        </div>
      `
    },
    contact: {
      titleEn: 'Contact Al Masa Construction',
      titleAr: 'تواصل مع شركة الماسة',
      contentEn: `
        <div class="almasa-subpage-hero">
          <h3>Let's Build Something Exceptional Together</h3>
          <p>Ready to start your next landmark project? Contact our engineering consultancy and estimating teams today for immediate consultation and quotation.</p>
        </div>
        <div class="almasa-subpage-grid">
          <div class="almasa-card">
            <h4>Head Office</h4>
            <p>Cairo, Egypt<br>Hotline: <a href="tel:+201273350041">+20 127 335 0041</a><br>Secondary: <a href="tel:+201204966069">+20 120 496 6069</a><br>Email: info@almasa-ta.com</p>
          </div>
          <div class="almasa-card">
            <h4>Working Hours</h4>
            <p>Saturday – Thursday: 8:00 AM – 6:00 PM<br>Emergency Response & Field Services: 24/7 Available</p>
          </div>
        </div>
      `,
      contentAr: `
        <div class="almasa-subpage-hero">
          <h3>فلنبدأ معاً في بناء مشروعكم القادم</h3>
          <p>هل ترغب في البدء في مشروعك الجديد؟ تواصل مع خبرائنا وفريق التسعير والاستشارات الهندسية للحصول على دراسة تفصيلية وعرض أسعار فوري.</p>
        </div>
        <div class="almasa-subpage-grid">
          <div class="almasa-card">
            <h4>المقر الرئيسي</h4>
            <p>القاهرة، مصر<br>الخط الساخن: <a href="tel:+201273350041">+20 127 335 0041</a><br>هاتف مباشر: <a href="tel:+201204966069">+20 120 496 6069</a><br>البريد: info@almasa-ta.com</p>
          </div>
          <div class="almasa-card">
            <h4>ساعات العمل</h4>
            <p>السبت – الخميس: 8:00 صباحاً – 6:00 مساءً<br>فرق الطوارئ والدعم الميداني: متاحة 24/7 على مدار الساعة</p>
          </div>
        </div>
      `
    }
  };

  /**
   * Initialize App Subsystems
   */
  function init() {
    injectAppletStyles();
    setupLanguageSwitcher();
    setupSubpageNavigation();
    setupProjectDetailTriggers();
    setupFloatingQuickActions();
    setupInquiriesDrawer();
    setupFormPipelines();
    setupVideoEngine();
    applyLanguage(currentLanguage);
  }

  /**
   * Injects CSS styles for modals, bilingual support, and sleek UI components
   */
  function injectAppletStyles() {
    const style = document.createElement('style');
    style.id = 'almasa-enhanced-styles';
    style.textContent = `
      /* Bilingual RTL & Font Tweaks */
      html[dir="rtl"] body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Cairo", "Tajawal", Roboto, Helvetica, Arial, sans-serif !important;
        text-align: right;
      }
      html[dir="rtl"] .deo-elementor-header-aside--left {
        left: auto !important;
        right: 0 !important;
      }
      html[dir="rtl"] .main-wrapper {
        margin-left: 0 !important;
        margin-right: auto !important;
      }
      
      /* Subpage Modal Canvas */
      #almasa-subpage-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(10, 25, 45, 0.85);
        backdrop-filter: blur(12px);
        z-index: 99999;
        display: none;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        padding: 20px;
        box-sizing: border-box;
      }
      #almasa-subpage-card {
        background: #ffffff;
        color: #1e293b;
        width: 100%;
        max-width: 960px;
        max-height: 88vh;
        border-radius: 14px;
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transform: translateY(20px);
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        border: 1px solid #e2e8f0;
      }
      #almasa-subpage-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 28px;
        background: #002244;
        color: #ffffff;
        border-bottom: 2px solid #eab308;
      }
      #almasa-subpage-header h2 {
        margin: 0;
        font-size: 22px;
        font-weight: 700;
        color: #ffffff;
      }
      #almasa-subpage-close {
        background: rgba(255, 255, 255, 0.15);
        border: none;
        color: #ffffff;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s;
      }
      #almasa-subpage-close:hover {
        background: rgba(255, 255, 255, 0.3);
      }
      #almasa-subpage-body {
        padding: 32px 28px;
        overflow-y: auto;
        line-height: 1.7;
        font-size: 16px;
      }
      .almasa-subpage-hero {
        margin-bottom: 24px;
        padding-bottom: 20px;
        border-bottom: 1px solid #f1f5f9;
      }
      .almasa-subpage-hero h3 {
        font-size: 20px;
        color: #002244;
        margin-bottom: 10px;
      }
      .almasa-subpage-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 20px;
        margin-top: 20px;
      }
      .almasa-card {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        padding: 20px;
      }
      .almasa-card h4 {
        margin-top: 0;
        color: #003a6b;
        font-size: 17px;
        margin-bottom: 8px;
      }
      .almasa-subpage-features {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .almasa-feat-item {
        display: flex;
        align-items: flex-start;
        gap: 16px;
        background: #f8fafc;
        padding: 16px;
        border-radius: 8px;
        border: 1px solid #e2e8f0;
      }
      .feat-badge {
        background: #002244;
        color: #eab308;
        font-weight: 800;
        font-size: 14px;
        padding: 6px 12px;
        border-radius: 6px;
      }
      .almasa-lead-form {
        display: flex;
        flex-direction: column;
        gap: 14px;
        margin-top: 16px;
      }
      .almasa-lead-form .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 14px;
      }
      @media (max-width: 600px) {
        .almasa-lead-form .form-row {
          grid-template-columns: 1fr;
        }
      }
      .almasa-lead-form input,
      .almasa-lead-form select,
      .almasa-lead-form textarea {
        width: 100%;
        padding: 12px 14px;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        font-size: 15px;
        box-sizing: border-box;
      }
      .almasa-btn-primary {
        background: #003a6b;
        color: #ffffff;
        font-weight: 700;
        padding: 14px 24px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 16px;
        transition: background 0.2s;
      }
      .almasa-btn-primary:hover {
        background: #002244;
      }
      .blog-date {
        font-size: 12px;
        color: #64748b;
        text-transform: uppercase;
        font-weight: 600;
        display: block;
        margin-bottom: 4px;
      }

      /* Floating Action Tools */
      .almasa-floating-actions {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      html[dir="rtl"] .almasa-floating-actions {
        right: auto;
        left: 24px;
      }
      .almasa-float-btn {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
        cursor: pointer;
        border: none;
        text-decoration: none;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .almasa-float-btn:hover {
        transform: translateY(-3px) scale(1.05);
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
      }
      .btn-phone { background: #003a6b; }
      .btn-quote { background: #eab308; color: #002244; font-weight: bold; }
      .btn-inquiries { background: #10b981; }

      /* Inquiries Drawer */
      #almasa-inquiries-drawer {
        position: fixed;
        top: 0;
        right: -420px;
        width: 400px;
        height: 100vh;
        background: #ffffff;
        box-shadow: -10px 0 30px rgba(0, 0, 0, 0.3);
        z-index: 100000;
        transition: right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex;
        flex-direction: column;
      }
      #almasa-inquiries-drawer.open {
        right: 0;
      }
      html[dir="rtl"] #almasa-inquiries-drawer {
        right: auto;
        left: -420px;
        box-shadow: 10px 0 30px rgba(0, 0, 0, 0.3);
        transition: left 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }
      html[dir="rtl"] #almasa-inquiries-drawer.open {
        left: 0;
      }
      .drawer-header {
        padding: 20px;
        background: #002244;
        color: #ffffff;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .drawer-body {
        padding: 20px;
        flex: 1;
        overflow-y: auto;
      }
      .inquiry-item {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 14px;
        margin-bottom: 12px;
      }
      .inquiry-meta {
        font-size: 12px;
        color: #64748b;
        margin-bottom: 6px;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Setup Language Switching
   */
  function setupLanguageSwitcher() {
    document.addEventListener('click', (e) => {
      const enBtn = e.target.closest('.lang-item-en, a[href*="/en/"], img[alt="English"]');
      const arBtn = e.target.closest('.lang-item-ar, a[href*="/ar/"], img[alt="العربية"]');

      if (enBtn) {
        e.preventDefault();
        applyLanguage('en');
      } else if (arBtn) {
        e.preventDefault();
        applyLanguage('ar');
      }
    });
  }

  function applyLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('almasa_lang', lang);
    const dict = translations[lang] || translations.en;

    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // Update main nav items
    updateText('.menu-item-home > a, a[href="https://almasa-ta.com/"]', dict.nav_home);
    updateText('.menu-item-1559 > a, a[href*="/about/"]', dict.nav_about);
    updateText('.menu-item-3715 > a, a[href*="/projects-en/"]', dict.nav_experience);
    updateText('.menu-item-3760 > a, a[href*="/concrete-structure/"]', dict.nav_concrete);
    updateText('.menu-item-3762 > a, a[href*="/landscape/"]', dict.nav_landscape);
    updateText('.menu-item-3763 > a, a[href*="/interior-and-exterior-finishing/"]', dict.nav_finishing);
    updateText('.menu-item-3224 > a, a[href*="/strategies-approaches/"]', dict.nav_strategies);
    updateText('.menu-item-1584 > a, a[href*="/contact/"]', dict.nav_contact);
    updateText('.menu-item-3801 > a, a[href*="/careers/"]', dict.nav_careers);
    updateText('.menu-item-1122 > a, a[href*="/blog/"]', dict.nav_blog);

    // Update section titles
    updateText('.elementor-element-63aedf4 .elementor-heading-title a', dict.emergency_call);
    updateHeadingByContent('services offered', dict.services_offered);
    updateHeadingByContent('Latest Projects', dict.latest_projects);
    updateHeadingByContent('20 Years of experience', dict.years_exp);
    updateHeadingByContent('Who We Are', dict.who_we_are);
    updateHeadingByContent('24/7 Services', dict.services_247);
    updateHeadingByContent('Affordable Price', dict.affordable_price);
    updateHeadingByContent('latest news', dict.latest_news);
    updateHeadingByContent('Partners of success', dict.partners_success);
    updateHeadingByContent('Keep in touch', dict.keep_in_touch);
    updateHeadingByContent('News & Tips', dict.news_tips);
  }

  function updateText(selector, newText) {
    document.querySelectorAll(selector).forEach(el => {
      if (el && newText) el.textContent = newText;
    });
  }

  function updateHeadingByContent(matchText, newText) {
    document.querySelectorAll('.elementor-heading-title').forEach(el => {
      if (el.textContent.trim().toLowerCase() === matchText.toLowerCase()) {
        el.textContent = newText;
      }
    });
  }

  /**
   * Setup Subpage Navigation
   */
  function setupSubpageNavigation() {
    // Create Subpage Modal Container
    const modal = document.createElement('div');
    modal.id = 'almasa-subpage-overlay';
    modal.innerHTML = `
      <div id="almasa-subpage-card" role="dialog" aria-modal="true">
        <div id="almasa-subpage-header">
          <h2 id="almasa-subpage-title">Al Masa</h2>
          <button id="almasa-subpage-close" aria-label="Close">&times;</button>
        </div>
        <div id="almasa-subpage-body"></div>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('#almasa-subpage-close');
    function closeSubpage() {
      modal.style.opacity = '0';
      const card = modal.querySelector('#almasa-subpage-card');
      if (card) card.style.transform = 'translateY(20px)';
      setTimeout(() => { modal.style.display = 'none'; }, 300);
    }
    closeBtn.addEventListener('click', closeSubpage);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeSubpage();
    });

    // Intercept internal links to sub-sections
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (!link) return;

      const href = link.getAttribute('href') || '';
      
      // Determine target subpage
      let targetKey = null;
      if (href.includes('/about/')) targetKey = 'about';
      else if (href.includes('/concrete-structure/')) targetKey = 'concrete-structure';
      else if (href.includes('/landscape/')) targetKey = 'landscape';
      else if (href.includes('/interior-and-exterior-finishing/')) targetKey = 'interior-and-exterior-finishing';
      else if (href.includes('/strategies-approaches/')) targetKey = 'strategies-approaches';
      else if (href.includes('/careers/')) targetKey = 'careers';
      else if (href.includes('/blog/')) targetKey = 'blog';
      else if (href.includes('/contact/')) targetKey = 'contact';

      if (targetKey && subpages[targetKey]) {
        e.preventDefault();
        openSubpage(targetKey);
      }
    });

    window.openAlMasaSubpage = openSubpage;
  }

  function openSubpage(key) {
    const pageData = subpages[key];
    if (!pageData) return;

    const overlay = document.getElementById('almasa-subpage-overlay');
    const titleEl = document.getElementById('almasa-subpage-title');
    const bodyEl = document.getElementById('almasa-subpage-body');
    const card = document.getElementById('almasa-subpage-card');

    const isAr = currentLanguage === 'ar';
    titleEl.textContent = isAr ? pageData.titleAr : pageData.titleEn;
    bodyEl.innerHTML = isAr ? pageData.contentAr : pageData.contentEn;

    // Attach form handler if career form present
    const careerForm = bodyEl.querySelector('#almasa-career-form');
    if (careerForm) {
      careerForm.addEventListener('submit', handleFormSubmit);
    }

    overlay.style.display = 'flex';
    setTimeout(() => {
      overlay.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 10);
  }

  /**
   * Project Details Modal
   */
  function setupProjectDetailTriggers() {
    document.querySelectorAll('.deo-portfolio-item, .elementor-portfolio-item, .elementor-widget-deo-portfolio .entry-title a').forEach((el, idx) => {
      el.style.cursor = 'pointer';
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const projectTitle = el.querySelector('.entry-title, h3, h4')?.textContent.trim() || `Al Masa Landmark Project #${idx + 1}`;
        openProjectDetail(projectTitle);
      });
    });
  }

  function openProjectDetail(title) {
    const isAr = currentLanguage === 'ar';
    const overlay = document.getElementById('almasa-subpage-overlay');
    const titleEl = document.getElementById('almasa-subpage-title');
    const bodyEl = document.getElementById('almasa-subpage-body');
    const card = document.getElementById('almasa-subpage-card');

    titleEl.textContent = title;
    bodyEl.innerHTML = `
      <div class="almasa-subpage-hero">
        <h3>${isAr ? 'بيانات المشروع والمواصفات الفنية' : 'Project Specifications & Construction Overview'}</h3>
        <p>${isAr ? 'أحد المشروعات الرائدة المنفذة بواسطة شركة الماسة للمقاولات بأعلى معايير الدقة الهندسية والخرسانات المسلحة.' : 'A landmark development engineered and constructed by Al Masa Contracting adhering to world-class structural and architectural standards.'}</p>
      </div>
      <div class="almasa-subpage-grid">
        <div class="almasa-card">
          <h4>${isAr ? 'نطاق الأعمال' : 'Scope of Work'}</h4>
          <p>${isAr ? 'الهيكل الخرساني، الأساسات، التشطيبات الفاخرة، وشبكات اللاندسكيب.' : 'Turnkey Civil Skeleton, Deep Foundations, Luxury Facades, and Landscape.'}</p>
        </div>
        <div class="almasa-card">
          <h4>${isAr ? 'المدة الزمنية والجودة' : 'Duration & Quality'}</h4>
          <p>${isAr ? 'تم التسليم قبل الموعد التعاقدي مع شهادة ضبط الجودة الشاملة.' : 'Delivered ahead of schedule with zero safety incidents and ISO compliance.'}</p>
        </div>
      </div>
      <div style="margin-top: 24px; text-align: center;">
        <button class="almasa-btn-primary" onclick="window.openAlMasaVideo('/api/media/stream?file=corporate-presentation.mp4', '${title}')">
          ▶ ${isAr ? 'مشاهدة الجولة المرئية للمشروع (فيديو HD)' : 'Watch Project Video Walkthrough (HD Stream)'}
        </button>
      </div>
    `;

    overlay.style.display = 'flex';
    setTimeout(() => {
      overlay.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 10);
  }

  /**
   * Floating Action Tools (Emergency Call, Quick Quote, Inquiries Panel)
   */
  function setupFloatingQuickActions() {
    const actions = document.createElement('div');
    actions.className = 'almasa-floating-actions';
    actions.innerHTML = `
      <button class="almasa-float-btn btn-inquiries" id="almasa-open-inquiries-btn" title="View Inquiries" aria-label="View Inquiries">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
      </button>
      <button class="almasa-float-btn btn-quote" id="almasa-open-quote-btn" title="Request Quote" aria-label="Request Quote">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
      </button>
      <a href="tel:+201273350041" class="almasa-float-btn btn-phone" title="Call Now" aria-label="Call Now">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
      </a>
    `;
    document.body.appendChild(actions);

    document.getElementById('almasa-open-quote-btn').addEventListener('click', () => {
      openSubpage('contact');
    });
  }

  /**
   * Inquiries Drawer
   */
  function setupInquiriesDrawer() {
    const drawer = document.createElement('div');
    drawer.id = 'almasa-inquiries-drawer';
    drawer.innerHTML = `
      <div class="drawer-header">
        <h3 style="margin:0;font-size:18px;">${translations.en.inquiries_title}</h3>
        <button id="almasa-drawer-close" style="background:none;border:none;color:#fff;font-size:24px;cursor:pointer;">&times;</button>
      </div>
      <div class="drawer-body" id="almasa-inquiries-list">
        <p style="color:#64748b;font-size:14px;">Loading recorded inquiries...</p>
      </div>
    `;
    document.body.appendChild(drawer);

    const openBtn = document.getElementById('almasa-open-inquiries-btn');
    const closeBtn = document.getElementById('almasa-drawer-close');

    openBtn.addEventListener('click', () => {
      drawer.classList.toggle('open');
      if (drawer.classList.contains('open')) loadInquiries();
    });

    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  }

  async function loadInquiries() {
    const listEl = document.getElementById('almasa-inquiries-list');
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      if (!data || data.length === 0) {
        listEl.innerHTML = `<p style="color:#64748b;font-size:14px;">${currentLanguage === 'ar' ? translations.ar.no_inquiries : translations.en.no_inquiries}</p>`;
        return;
      }

      listEl.innerHTML = data.map(item => `
        <div class="inquiry-item">
          <div class="inquiry-meta">${new Date(item.date).toLocaleString()}</div>
          <strong>${item.name}</strong> (${item.service || 'Contracting'})
          <div style="font-size:13px;color:#334155;margin-top:4px;">📞 <a href="tel:${item.phone}">${item.phone}</a> | ✉️ ${item.email || 'N/A'}</div>
          ${item.message ? `<div style="font-size:13px;background:#fff;padding:8px;border-radius:4px;margin-top:6px;border:1px solid #e2e8f0;">"${item.message}"</div>` : ''}
        </div>
      `).join('');
    } catch (e) {
      listEl.innerHTML = '<p style="color:#ef4444;font-size:14px;">Failed to load inquiries.</p>';
    }
  }

  /**
   * Unified Form Submitter
   */
  async function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const responseBox = form.querySelector('.form-response');
    const originalText = btn ? btn.textContent : '';

    if (btn) {
      btn.textContent = currentLanguage === 'ar' ? translations.ar.submitting : translations.en.submitting;
      btn.disabled = true;
    }

    try {
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await res.json();

      if (responseBox) {
        responseBox.style.marginTop = '12px';
        responseBox.style.padding = '12px';
        responseBox.style.borderRadius = '6px';
        responseBox.style.background = '#dcfce7';
        responseBox.style.color = '#166534';
        responseBox.style.fontSize = '14px';
        responseBox.textContent = currentLanguage === 'ar' ? 'تم استلام طلبكم بنجاح وسيتواصل معكم فريق العمل فوراً.' : (result.message || 'Application submitted successfully.');
      }
      form.reset();
    } catch (err) {
      console.warn('Form submission handled:', err);
    } finally {
      if (btn) {
        btn.textContent = originalText;
        btn.disabled = false;
      }
    }
  }

  function setupFormPipelines() {
    document.querySelectorAll('form.wpcf7-form, .deo-contact-form').forEach(form => {
      form.addEventListener('submit', handleFormSubmit);
    });
  }

  /**
   * Video Streaming Modal Lightbox
   */
  function setupVideoEngine() {
    let modal = document.getElementById('almasa-video-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'almasa-video-modal';
      modal.style.cssText = `
        position: fixed;
        top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(10, 25, 40, 0.95);
        backdrop-filter: blur(8px);
        display: none; align-items: center; justify-content: center;
        z-index: 999999; opacity: 0; transition: opacity 0.3s ease;
      `;
      modal.innerHTML = `
        <div style="position:relative; width:90%; max-width:1100px; aspect-ratio:16/9; background:#000; border-radius:12px; overflow:hidden; box-shadow:0 25px 50px rgba(0,0,0,0.8); border:1px solid rgba(255,255,255,0.1);">
          <button id="almasa-video-close" aria-label="Close Video" style="position:absolute; top:14px; right:14px; width:40px; height:40px; background:rgba(22,51,87,0.8); border:1px solid rgba(255,255,255,0.2); color:#fff; border-radius:50%; cursor:pointer; font-size:20px; z-index:10;">&times;</button>
          <video id="almasa-modal-player" controls playsinline preload="metadata" style="width:100%; height:100%; object-fit:contain;"></video>
        </div>
      `;
      document.body.appendChild(modal);

      const closeBtn = document.getElementById('almasa-video-close');
      const video = document.getElementById('almasa-modal-player');

      function closeVideo() {
        modal.style.opacity = '0';
        setTimeout(() => {
          modal.style.display = 'none';
          video.pause();
          video.src = '';
        }, 300);
      }

      closeBtn.addEventListener('click', closeVideo);
      modal.addEventListener('click', (e) => { if (e.target === modal) closeVideo(); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeVideo(); });
    }

    window.openAlMasaVideo = function(url, title) {
      const modal = document.getElementById('almasa-video-modal');
      const video = document.getElementById('almasa-modal-player');
      if (!modal || !video) return;

      video.src = url || '/api/media/stream?file=corporate-presentation.mp4';
      modal.style.display = 'flex';
      setTimeout(() => {
        modal.style.opacity = '1';
        video.play().catch(() => {});
      }, 10);
    };
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
