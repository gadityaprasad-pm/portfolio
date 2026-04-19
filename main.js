// =============================================================================
// main.js — rendering and routing
// =============================================================================
// Edit content in data.js. Edit styles in style.css.
// =============================================================================

(function () {

  var root   = document.getElementById("root");
  var params = new URLSearchParams(window.location.search);
  var csId   = params.get("id");

  // Always start at the top
  if (window.location.hash) {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }
  window.scrollTo(0, 0);

  if (csId) {
    renderCaseStudyPage(csId);
  } else {
    renderIndexPage();
  }

  // ===========================================================================
  // INDEX PAGE
  // ===========================================================================

  function renderIndexPage() {
    document.title = DATA.name + " — " + DATA.role;
    root.innerHTML = [
      renderHero(),
      renderAbout(),
      renderCaseStudies(),
      renderMySpace(),
      renderExperience(),
      renderAiUsage(),
      renderToolkit(),
      renderContact(),
    ].join("");

    // CTA scroll
    var btn = document.getElementById("js-cta");
    if (btn) {
      btn.addEventListener("click", function () {
        var t = document.getElementById("case-studies");
        if (t) t.scrollIntoView({ behavior: "smooth" });
      });
    }
  }

  // ---------------------------------------------------------------------------
  // Shared section header: "01 ── LABEL" + big heading
  // ---------------------------------------------------------------------------
  function sectionHeader(num, label, heading) {
    return (
      '<div class="section-meta">' +
        '<span class="section-num">' + num + '</span>' +
        '<span class="section-bar"></span>' +
        '<span class="section-lbl">' + label + '</span>' +
      '</div>' +
      (heading ? '<h2 class="section-heading">' + heading + '</h2>' : '')
    );
  }

  // ---------------------------------------------------------------------------
  // HERO
  // ---------------------------------------------------------------------------
  function renderHero() {
    var c = DATA.contact;
    var h = DATA.sectionHeadings;

    // ── SVG icon definitions ──────────────────────────────────────────────────
    var icons = [
      { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 3.5 3.5"/></svg>', label: null,    active: false },
      { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l4-8 4 5 3-6 4 9"/></svg>', label: null,    active: false },
      { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="13" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M12 12v4M10 14h4"/></svg>', label: null, active: false },
      { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>', label: null, active: false },
      { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6 4 12l4 6M16 6l4 6-4 6M14 4l-4 16"/></svg>', label: null, active: false },
      { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 4c-1 0-2 1-3.5 2.5L9 8 2.8 6.2c-.5-.2-.9.1-.8.5l1.5 4.8c.2.7.7 1.2 1.4 1.4l3.3.9-.7.7-3.8 3.8a.5.5 0 0 0 0 .7l1.4 1.4a.5.5 0 0 0 .7 0l3.8-3.8.7-.7.9 3.3c.2.7.7 1.2 1.4 1.4l4.8 1.5c.4.1.7-.3.5-.8z"/></svg>', label: "Travel", active: true },
      { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>', label: null, active: false },
      { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>', label: null, active: false },
      { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>', label: null, active: false },
      { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07"/></svg>', label: null, active: false },
      { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/></svg>', label: null, active: false },
      { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>', label: null, active: false },
    ];

    var iconCards = icons.map(function (icon) {
      var cls = 'icon-card' + (icon.active ? ' active' : '');
      return (
        '<div class="' + cls + '">' +
          icon.svg +
          (icon.label ? '<span class="icon-card-label">' + icon.label + '</span>' : '') +
        '</div>'
      );
    }).join('');

    // ── Career timeline ───────────────────────────────────────────────────────
    var tlNodes = DATA.timeline.map(function (node, i) {
      var isLast = i === DATA.timeline.length - 1;
      var dotCls = 'tl-dot' + (node.current ? ' current' : '');
      var yrCls  = 'tl-year' + (node.current ? ' current' : '');
      return (
        '<div class="tl-node">' +
          '<div class="tl-content">' +
            '<span class="' + yrCls + '">' + node.year + '</span>' +
            '<div class="' + dotCls + '"></div>' +
            '<span class="tl-event">' + node.event + '</span>' +
          '</div>' +
          (!isLast ? '<div class="tl-line"></div>' : '') +
        '</div>'
      );
    }).join('');

    // ── Icon SVGs for contact row ─────────────────────────────────────────────
    var iconGmail =
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6" stroke-linecap="round"/></svg>';
    var iconLinkedin =
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="3"/><path d="M7 10v7M7 7v.01" stroke-linecap="round"/><path d="M11 17v-3.5a2.5 2.5 0 0 1 5 0V17M11 10v7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var iconPhone =
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6.6 3H9l1.5 4.5-1.8 1.8a11 11 0 0 0 4 4l1.8-1.8L19 13v2.4A2.6 2.6 0 0 1 16.4 18C9.5 18 3 11.5 3 6.6A2.6 2.6 0 0 1 5.6 4"/></svg>';
    var iconDoc =
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>';

    return (
      '<div class="hero">' +

        '<div class="hero-inner">' +

          // ── Left column ──────────────────────────────────────────────────
          '<div class="hero-left">' +
            '<span class="hero-eyebrow">' + DATA.role + '</span>' +
            '<h1 class="hero-name">' + DATA.name + '</h1>' +
            '<p class="hero-desc">' + DATA.heroDesc + '</p>' +

            '<div class="hero-actions">' +
              '<button class="cta" id="js-cta">See my work ↓</button>' +
              '<a class="cta cta--ghost" href="' + (c.resume || '#') + '" target="_blank" rel="noopener">' +
                iconDoc + 'Resume' +
              '</a>' +
            '</div>' +

            '<div class="hero-contacts">' +
              '<a class="hero-contact-link" href="mailto:' + c.email + '">' + iconGmail + '<span>' + c.email + '</span></a>' +
              '<a class="hero-contact-link" href="' + c.linkedin + '" target="_blank" rel="noopener">' + iconLinkedin + '<span>LinkedIn</span></a>' +
              '<span class="hero-contact-link hero-contact-plain">' + iconPhone + '<span>' + c.phone + '</span></span>' +
            '</div>' +
          '</div>' +

          // ── Right column: icon grid ──────────────────────────────────────
          '<div class="hero-right">' +
            '<div class="hero-icon-grid">' + iconCards + '</div>' +
          '</div>' +

        '</div>' + // .hero-inner

        // ── Career timeline ────────────────────────────────────────────────
        '<div class="hero-timeline">' + tlNodes + '</div>' +
        '<div class="hero-scroll">SCROLL</div>' +

      '</div>'
    );
  }

  // ---------------------------------------------------------------------------
  // ABOUT — two-column (text + stats)
  // ---------------------------------------------------------------------------
  function renderAbout() {
    var paras = DATA.about.map(function (p) {
      return '<p>' + p + '</p>';
    }).join('');

    var stats = DATA.aboutStats.map(function (s) {
      return (
        '<div class="about-stat">' +
          '<span class="about-stat-value">' + s.value + '</span>' +
          '<span class="about-stat-label">'  + s.label + '</span>' +
        '</div>'
      );
    }).join('');

    return (
      '<section class="section" id="about">' +
        sectionHeader('01', 'About', DATA.sectionHeadings.about) +
        '<div class="about-layout">' +
          '<div class="about-body">' + paras + '</div>' +
          '<div class="about-stats">'  + stats + '</div>' +
        '</div>' +
      '</section>'
    );
  }

  // ---------------------------------------------------------------------------
  // CASE STUDIES — numbered rows with metric on right
  // ---------------------------------------------------------------------------
  function renderCaseStudies() {
    var cards = DATA.caseStudies.map(function (cs, i) {
      var num = (i + 1).toString().padStart(2, '0');
      return (
        '<a class="cs-card" href="case-study.html?id=' + cs.id + '">' +
          '<span class="cs-num">' + num + '</span>' +
          '<span class="cs-card-body">' +
            '<span class="cs-card-title">' + cs.title + '</span>' +
            '<span class="cs-card-tag">'   + cs.tag   + '</span>' +
          '</span>' +
          (cs.metric
            ? '<span class="cs-card-metric">' +
                '<span class="cs-metric-value">' + cs.metric      + '</span>' +
                '<span class="cs-metric-label">' + cs.metricLabel + '</span>' +
              '</span>'
            : '') +
        '</a>'
      );
    }).join('');

    return (
      '<section class="section" id="case-studies">' +
        sectionHeader('02', 'Work', DATA.sectionHeadings.work) +
        '<div class="cs-list">' + cards + '</div>' +
      '</section>'
    );
  }

  // ---------------------------------------------------------------------------
  // MY SPACE
  // ---------------------------------------------------------------------------
  function renderMySpace() {
    var iconArrow =
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>';

    var cards = DATA.mySpace.map(function (item) {
      return (
        '<a class="myspace-card" href="' + item.url + '" target="_blank" rel="noopener">' +
          '<div class="myspace-card-body">' +
            '<span class="myspace-title">' + item.title       + '</span>' +
            '<p class="myspace-desc">'     + item.description + '</p>' +
          '</div>' +
          '<span class="myspace-link">' + item.label + ' ' + iconArrow + '</span>' +
        '</a>'
      );
    }).join('');

    return (
      '<section class="section" id="my-space">' +
        sectionHeader('03', 'My Space', DATA.sectionHeadings.mySpace) +
        '<div class="myspace-list">' + cards + '</div>' +
      '</section>'
    );
  }

  // ---------------------------------------------------------------------------
  // EXPERIENCE + EDUCATION
  // ---------------------------------------------------------------------------
  function renderExperience() {
    var jobs = DATA.experience.map(function (job) {
      return (
        '<div class="timeline-item">' +
          '<div class="timeline-meta">' +
            '<span class="timeline-period">' + job.period + '</span>' +
            (job.location ? '<span class="timeline-location">' + job.location + '</span>' : '') +
          '</div>' +
          '<div>' +
            '<div class="timeline-role">' +
              job.role + ' <span class="timeline-company">@ ' + job.company + '</span>' +
            '</div>' +
            '<p class="timeline-desc">' + job.description + '</p>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    var edu = DATA.education.map(function (e) {
      return (
        '<div class="timeline-item">' +
          '<div class="timeline-meta">' +
            '<span class="timeline-period">' + (e.period || '') + '</span>' +
          '</div>' +
          '<div>' +
            '<div class="timeline-role">' + e.degree      + '</div>' +
            '<p class="timeline-desc">'   + e.institution + '</p>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    return (
      '<section class="section" id="experience">' +
        sectionHeader('04', 'Experience', DATA.sectionHeadings.exp) +
        '<div class="timeline">' + jobs + '</div>' +
        '<h3 class="section-meta" style="margin-top:3rem;margin-bottom:1.5rem">' +
          '<span class="section-num"></span><span class="section-bar"></span>' +
          '<span class="section-lbl">Education &amp; Certifications</span>' +
        '</h3>' +
        '<div class="timeline">' + edu + '</div>' +
      '</section>'
    );
  }

  // ---------------------------------------------------------------------------
  // AI USAGE — horizontal cards
  // ---------------------------------------------------------------------------
  function renderAiUsage() {
    var cards = DATA.aiUsage.map(function (item) {
      return (
        '<div class="ai-card">' +
          '<span class="ai-area">' + item.area        + '</span>' +
          '<p class="ai-desc">'    + item.description + '</p>' +
        '</div>'
      );
    }).join('');

    return (
      '<section class="section" id="ai">' +
        sectionHeader('05', 'AI Workflow', DATA.sectionHeadings.ai) +
        '<div class="ai-grid">' + cards + '</div>' +
      '</section>'
    );
  }

  // ---------------------------------------------------------------------------
  // TOOLKIT — 2×2 grid with category icons
  // ---------------------------------------------------------------------------
  function renderToolkit() {
    var catIcons = {
      'Product': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
      'AI & Automation': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>',
      'Analytics': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6"  y1="20" x2="6"  y2="14"/></svg>',
      'Technical': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6l-4 6 4 6M16 6l4 6-4 6M14 4l-4 16"/></svg>',
    };

    var cats = DATA.toolkit.map(function (row) {
      var pills = row.skills.map(function (s) {
        return '<span class="pill">' + s + '</span>';
      }).join('');

      var icon = catIcons[row.category] || '';

      return (
        '<div class="toolkit-cat">' +
          '<div class="toolkit-cat-header">' +
            '<span class="toolkit-cat-icon">' + icon + '</span>' +
            '<span class="toolkit-cat-name">'  + row.category + '</span>' +
          '</div>' +
          '<div class="toolkit-pills">' + pills + '</div>' +
        '</div>'
      );
    }).join('');

    return (
      '<section class="section" id="toolkit">' +
        sectionHeader('06', 'Toolkit', DATA.sectionHeadings.toolkit) +
        '<div class="toolkit-grid">' + cats + '</div>' +
      '</section>'
    );
  }

  // ---------------------------------------------------------------------------
  // CONTACT
  // ---------------------------------------------------------------------------
  function renderContact() {
    var c = DATA.contact;
    return (
      '<section class="section" id="contact">' +
        sectionHeader('07', 'Contact', DATA.sectionHeadings.contact) +
        '<div class="contact-links">' +
          '<a class="contact-link" href="mailto:' + c.email + '">'  + c.email + '</a>' +
          '<a class="contact-link" href="' + c.linkedin + '" target="_blank" rel="noopener">LinkedIn →</a>' +
          '<span class="contact-meta">' + c.phone + ' &nbsp;·&nbsp; ' + c.location + '</span>' +
        '</div>' +
      '</section>'
    );
  }

  // ===========================================================================
  // CASE STUDY DETAIL PAGE
  // ===========================================================================

  function renderCaseStudyPage(id) {
    var cs  = DATA.caseStudies.find(function (c) { return c.id === id; });

    if (!cs) {
      root.innerHTML =
        '<div class="section"><p style="color:var(--text-muted)">' +
        'Case study not found. <a href="index.html" style="color:var(--accent)">← Back</a></p></div>';
      return;
    }

    document.title = cs.title + " — " + DATA.name;

    var all  = DATA.caseStudies;
    var idx  = all.findIndex(function (c) { return c.id === id; });
    var prev = idx > 0              ? all[idx - 1] : null;
    var next = idx < all.length - 1 ? all[idx + 1] : null;

    var navLinks =
      '<div class="cs-nav">' +
        (prev
          ? '<a class="cs-nav-link" href="case-study.html?id=' + prev.id + '">← ' + prev.title + '</a>'
          : '<span></span>') +
        (next
          ? '<a class="cs-nav-link cs-nav-link--next" href="case-study.html?id=' + next.id + '">' + next.title + ' →</a>'
          : '') +
      '</div>';

    var sections = Object.values(cs.sections).map(function (sec) {
      return (
        '<div class="cs-section">' +
          '<h2 class="cs-section-heading">' + sec.heading + '</h2>' +
          '<div class="cs-section-body">'   + sec.body    + '</div>' +
        '</div>'
      );
    }).join('');

    root.innerHTML =
      '<div class="cs-detail">' +
        '<header class="cs-detail-header">' +
          '<span class="cs-detail-tag">' + cs.tag   + '</span>' +
          '<h1 class="cs-detail-title">' + cs.title + '</h1>' +
        '</header>' +
        '<div class="cs-sections">' + sections + '</div>' +
        navLinks +
      '</div>';
  }

})();
