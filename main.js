// =============================================================================
// main.js — rendering and routing
// =============================================================================
// Edit content in data.js. Edit styles in style.css.
// You should not need to touch this file.
// =============================================================================

(function () {

  var root   = document.getElementById("root");
  var params = new URLSearchParams(window.location.search);
  var csId   = params.get("id");

  // Always start at the top — prevent browser from restoring scroll
  // position or jumping to a #hash left in the URL from a previous visit.
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
  // Hero
  // ---------------------------------------------------------------------------
  function renderHero() {
    var c = DATA.contact;

    // SVG icons — inline, minimal, 20×20 viewport
    var iconGmail =
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6z" stroke="currentColor" stroke-width="1.5"/>' +
        '<path d="M2 6l10 7 10-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>';

    var iconLinkedin =
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" stroke-width="1.5"/>' +
        '<path d="M7 10v7M7 7v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>' +
        '<path d="M11 17v-4a2 2 0 0 1 4 0v4M11 10v7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>';

    var iconPhone =
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<path d="M6.6 3H9l1.5 4.5-1.8 1.8a11 11 0 0 0 4 4l1.8-1.8L19 13v2.4A2.6 2.6 0 0 1 16.4 18C9.5 18 3 11.5 3 6.6A2.6 2.6 0 0 1 5.6 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>';

    var iconDoc =
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>' +
        '<path d="M14 3v6h6M8 13h8M8 17h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>' +
      '</svg>';

    var contacts =
      '<div class="hero-contacts">' +
        '<a class="hero-contact-link" href="mailto:' + c.email + '" title="' + c.email + '">' +
          iconGmail + '<span>' + c.email + '</span>' +
        '</a>' +
        '<a class="hero-contact-link" href="' + c.linkedin + '" target="_blank" rel="noopener" title="LinkedIn">' +
          iconLinkedin + '<span>LinkedIn</span>' +
        '</a>' +
        '<span class="hero-contact-link hero-contact-plain">' +
          iconPhone + '<span>' + c.phone + '</span>' +
        '</span>' +
      '</div>';

    var actions =
      '<div class="hero-actions">' +
        '<button class="cta" id="js-cta">See my work</button>' +
        '<a class="cta cta--ghost" href="' + (c.resume || '#') + '" target="_blank" rel="noopener" title="Resume">'+
          iconDoc + 'Resume' +
        '</a>' +
      '</div>';

    return (
      '<div class="hero">' +
        '<span class="hero-eyebrow">' + DATA.role + '</span>' +
        '<h1 class="hero-name">' + DATA.name + '</h1>' +
        contacts +
        actions +
      '</div>'
    );
  }

  // ---------------------------------------------------------------------------
  // About — bio only, no stats
  // ---------------------------------------------------------------------------
  function renderAbout() {
    var paras = DATA.about.map(function (p) {
      return '<p>' + p + '</p>';
    }).join('');

    return (
      '<section class="section" id="about">' +
        '<h2 class="label">About</h2>' +
        '<div class="about-body">' + paras + '</div>' +
      '</section>'
    );
  }

  // ---------------------------------------------------------------------------
  // Case studies — numbered editorial list
  // ---------------------------------------------------------------------------
  function renderCaseStudies() {
    var cards = DATA.caseStudies.map(function (cs, i) {
      var num = (i + 1).toString().padStart(2, '0');
      return (
        '<a class="cs-card" href="case-study.html?id=' + cs.id + '">' +
          '<span class="cs-num">' + num + '</span>' +
          '<span class="cs-card-body">' +
            '<span class="cs-card-title">' + cs.title + '</span>' +
            '<span class="cs-card-tag">' + cs.tag + '</span>' +
          '</span>' +
        '</a>'
      );
    }).join('');

    return (
      '<section class="section" id="case-studies">' +
        '<h2 class="label">Case Studies</h2>' +
        '<div class="cs-list">' + cards + '</div>' +
      '</section>'
    );
  }

  // ---------------------------------------------------------------------------
  // Experience + Education
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
              job.role +
              ' <span class="timeline-company">@ ' + job.company + '</span>' +
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
            '<div class="timeline-role">' + e.degree + '</div>' +
            '<p class="timeline-desc">' + e.institution + '</p>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    return (
      '<section class="section" id="experience">' +
        '<h2 class="label">Experience</h2>' +
        '<div class="timeline">' + jobs + '</div>' +
        '<h2 class="label" style="margin-top:3.5rem">Education &amp; Certifications</h2>' +
        '<div class="timeline">' + edu + '</div>' +
      '</section>'
    );
  }

  // ---------------------------------------------------------------------------
  // How I use AI — striped table
  // ---------------------------------------------------------------------------
  function renderAiUsage() {
    var cards = DATA.aiUsage.map(function (item) {
      return (
        '<div class="ai-card">' +
          '<span class="ai-area">' + item.area + '</span>' +
          '<p class="ai-desc">' + item.description + '</p>' +
        '</div>'
      );
    }).join('');

    return (
      '<section class="section" id="ai">' +
        '<h2 class="label">How I use AI as a PM</h2>' +
        '<div class="ai-grid">' + cards + '</div>' +
      '</section>'
    );
  }

  // ---------------------------------------------------------------------------
  // Toolkit — category + pills
  // ---------------------------------------------------------------------------
  function renderToolkit() {
    var rows = DATA.toolkit.map(function (row) {
      var pills = row.skills.map(function (s) {
        return '<span class="pill">' + s + '</span>';
      }).join('');

      return (
        '<div class="toolkit-row">' +
          '<span class="toolkit-category">' + row.category + '</span>' +
          '<div class="toolkit-pills">' + pills + '</div>' +
        '</div>'
      );
    }).join('');

    return (
      '<section class="section" id="toolkit">' +
        '<h2 class="label">Toolkit</h2>' +
        '<div class="toolkit-section">' + rows + '</div>' +
      '</section>'
    );
  }

  // ---------------------------------------------------------------------------
  // Contact
  // ---------------------------------------------------------------------------
  function renderContact() {
    var c = DATA.contact;
    return (
      '<section class="section" id="contact">' +
        '<h2 class="label">Contact</h2>' +
        '<div class="contact-links">' +
          '<a class="contact-link" href="mailto:' + c.email + '">' + c.email + '</a>' +
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
        'Case study not found. <a href="index.html" style="color:var(--blue)">← Back</a></p></div>';
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
          '<div class="cs-section-body">' + sec.body + '</div>' +
        '</div>'
      );
    }).join('');

    root.innerHTML =
      '<div class="cs-detail">' +
        '<header class="cs-detail-header">' +
          '<span class="cs-detail-tag">' + cs.tag + '</span>' +
          '<h1 class="cs-detail-title">' + cs.title + '</h1>' +
        '</header>' +
        '<div class="cs-sections">' + sections + '</div>' +
        navLinks +
      '</div>';
  }

})();
