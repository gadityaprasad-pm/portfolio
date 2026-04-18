// =============================================================================
// data.js — ALL SITE CONTENT LIVES HERE
// =============================================================================
// This is the only file you need to edit to update the site.
// The five section bodies in each case study accept plain text or HTML
// (e.g. <p>, <ul>, <li>). Everything else is plain strings.
// =============================================================================

const DATA = {

  // ---------------------------------------------------------------------------
  // IDENTITY
  // ---------------------------------------------------------------------------
  name:    "G. Aditya Prasad",
  tagline: "Product Manager. I build systems that actually work.",
  role:    "Product Manager",

  // ---------------------------------------------------------------------------
  // CONTACT
  // ---------------------------------------------------------------------------
  contact: {
    email:    "gadityaprasad98@gmail.com",
    linkedin: "https://linkedin.com/in/gadityaprasad",
    phone:    "+91 75066 32140",
    location: "Bengaluru, KA",
    resume:   "https://drive.google.com/file/d/1MnV7LXYzeW5f4HiyJtRsYceEnNDHCDvm/view?usp=sharing",
  },

  // ---------------------------------------------------------------------------
  // ABOUT
  // Each string becomes one paragraph.
  // ---------------------------------------------------------------------------
  about: [
    "Product Manager with 5+ years building consumer products, enterprise platforms, and internal tools across travel-tech and insurance-tech. Core work spans search and discovery, conversion optimization, billing and rules engine design, ERP automation, and API integrations.",
    "I operate at the intersection of business operations and product engineering — translating messy, manual workflows into configurable, scalable systems.",
    "My approach is grounded in structured discovery (Shop Floor Reality), data-driven prioritization, and shipping end-to-end. I have owned products serving 150K+ annual bookings, 800+ ops staff, and 3,000+ B2B clients.",
  ],

  // ---------------------------------------------------------------------------
  // IMPACT METRICS
  // Shown as a stat grid. Keep values short (they're displayed large).
  // ---------------------------------------------------------------------------
  impact: [
    { value: "~75–90%",    label: "Billing errors reduced"            },
    { value: "30%",        label: "Search volume increase"            },
    { value: "38%",        label: "End-to-end conversion lift"        },
    { value: "70%",        label: "Manual ops effort cut"             },
    { value: "~50%",       label: "Turnaround time reduced"           },
    { value: "5–7%",       label: "PDP engagement (AI feature)"       },
    { value: "60→20 min",  label: "Broker onboarding time"            },
    { value: "$2M+",       label: "Revenue impact (Hidden Brains)"    },
  ],

  // ---------------------------------------------------------------------------
  // CASE STUDIES
  // ---------------------------------------------------------------------------
  caseStudies: [
    // ── 1. Billing Rules Engine ──────────────────────────────────────────────
    {
      id:    "rules-engine",
      title: "Replacing Hardcoded Chaos with a Rules Engine",
      tag:   "Visa SOA · Veena World",
      sections: {
        mess: {
          heading: "The Mess",
          body: `<p>Visa billing was hardcoded across 4 guest types, 5 visa types, 6+ charge heads, and 3 booking stages. Every special case got patched directly into the codebase. Wrong charges appeared on SOAs regularly, triggering reconciliation delays and finance escalations. The team treated billing errors as a support issue. They were a product issue.</p>`,
        },
        discovery: {
          heading: "Discovery",
          body: `<p>I mapped the full combinatorial space — 4 × 5 × 6 × 3 = 360+ possible charge configurations. I used Claude to generate the complete rule matrix, surface valid vs. invalid combinations, and flag edge cases (partial cancellations, mid-trip upgrades, group-size thresholds) before writing a single spec line.</p><p>Separately, I walked through real SOAs with the finance team to understand which error types actually triggered escalations and how long each took to resolve manually.</p>`,
        },
        approach: {
          heading: "The Approach",
          body: `<p>Rather than fix individual bugs, I designed a configurable rules engine with a three-tab frontend: <strong>Country Groups</strong> (manage visa regions), <strong>Charge Rules</strong> (define logic per combination), and a <strong>Simulation Sandbox</strong> (test charge outputs before going live).</p><p>The goal was to give the operations team ownership of billing logic without needing engineering involvement for every change. The sandbox was non-negotiable — ops staff needed to be able to verify a rule's output on real booking scenarios before activating it.</p>`,
        },
        execution: {
          heading: "Execution",
          body: `<p>Built conflict detection logic that flags overlapping or contradictory rules before saving. Added rule trace tooltips on SOA charge lines so ops staff could see exactly which rule triggered a charge. Implemented auto-application of rules at invoice generation.</p><p>Built an interactive HTML mockup — using Claude — that matched the ERP's visual language precisely. It was used directly in stakeholder reviews before design handoff, replacing static wireframes and cutting review cycles.</p>`,
        },
        outcome: {
          heading: "Outcome",
          body: `<p>Caught 3 rule conflicts pre-launch, including a partial cancellation edge case that would have incorrectly waived visa fees for mid-trip cancellations. Billing errors reduced by ~75–90%. Finance escalations dropped significantly. Ops team can now modify billing rules independently — no engineering ticket required.</p>`,
        },
      },
    },

    // ── 2. Search & Conversion ───────────────────────────────────────────────
    {
      id:    "search-conversion",
      title: "Rebuilding Search and Conversion from First Principles",
      tag:   "Consumer Product · Veena World",
      sections: {
        mess: {
          heading: "The Mess",
          body: `<p>Consumer search was underperforming on multiple dimensions simultaneously. Search volume was low. Query understanding was weak — the system couldn't handle synonyms, intent signals, or partial matches. Drop-off from landing to search to PDP to checkout was high, and there was no mechanism to surface the right tour to the right user at the right moment.</p>`,
        },
        discovery: {
          heading: "Discovery",
          body: `<p>Ran funnel analysis across the full landing → search → PDP → checkout flow using GA4 and Mixpanel. Mapped drop-off points with MS Clarity heatmaps and session recordings. Ran usability sessions to understand where users lost confidence in the product.</p><p>Identified 15+ friction points across query handling, result ranking, pricing presentation, and checkout flow. Prioritized by drop-off volume × effort to fix.</p>`,
        },
        approach: {
          heading: "The Approach",
          body: `<p>Rebuilt search from first principles rather than patching the existing system. Reworked query understanding (synonyms, intent detection, partial match handling), redesigned result ranking to incorporate user-persona signals, and drove a full UX overhaul across high-value flows.</p><p>Paired every major change with an A/B test. No assumption shipped without measurement.</p>`,
        },
        execution: {
          heading: "Execution",
          body: `<p>Ran 15+ A/B tests across UI elements, pricing nudges, and recommendation logic. Validated designs through usability sessions with real users. Worked closely with engineering on ranking algorithm changes and with design on PDP and checkout flows.</p><p>Maintained a prioritized backlog of test hypotheses ranked by expected lift × implementation cost. Killed 4 tests early that showed no signal within the first week.</p>`,
        },
        outcome: {
          heading: "Outcome",
          body: `<ul><li>30% increase in search volume</li><li>12% lift in search-led PDP conversion</li><li>38% end-to-end conversion improvement</li><li>~20% higher adoption across new releases</li></ul>`,
        },
      },
    },

    // ── 3. AI Itinerary Summaries ────────────────────────────────────────────
    {
      id:    "ai-feature",
      title: "Shipping an AI Feature Without the Hype",
      tag:   "ChatGPT Integration · Veena World",
      sections: {
        mess: {
          heading: "The Mess",
          body: `<p>Users had to read full PDF brochures — sometimes 30+ pages — to evaluate whether a tour matched what they were looking for. This was a significant friction point in the consideration phase. Internally, product creators spent hours writing package descriptions and SEO metadata for hundreds of tours. Both problems were slow, manual, and solved by the same technology.</p>`,
        },
        discovery: {
          heading: "Discovery",
          body: `<p>Identified two separate problem surfaces with a shared solution. On the consumer side: users weren't reading PDFs, and PDP engagement on detailed content was low. Internally: content creation was a bottleneck that delayed tour publishing.</p><p>A single LLM integration could serve both use cases with different prompt strategies — consumer-facing prompts optimized for conversational clarity, internal prompts optimized for SEO structure.</p>`,
        },
        approach: {
          heading: "The Approach",
          body: `<p>Integrated ChatGPT API on consumer PDPs for on-demand itinerary summaries. Built a separate LLM integration inside the ERP product creation module for content generation and SEO metadata. Treated them as two distinct products sharing an API layer, not one feature.</p>`,
        },
        execution: {
          heading: "Execution",
          body: `<p>Owned prompt design, input schema definition, and edge case handling — multi-day tours, tours with special categories, departures with variable itineraries. Coordinated API integration with engineering. Ran UAT specifically on edge cases before release. Defined fallback behaviour for API failures and rate limit scenarios.</p>`,
        },
        outcome: {
          heading: "Outcome",
          body: `<ul><li>5–7% PDP engagement on the consumer-facing feature</li><li>~70% reduction in manual description writing time internally</li><li>Faster tour publishing cycle — content no longer blocked on a single writer</li></ul>`,
        },
      },
    },

    // ── 4. Payment Gateway ───────────────────────────────────────────────────
    {
      id:    "payment-gateway",
      title: "Owning a Payment Integration End-to-End",
      tag:   "JustPay Integration · Veena World",
      sections: {
        mess: {
          heading: "The Mess",
          body: `<p>Payment tracking was fragmented across booking types. There was no unified layer for real-time payment status — teams relied on manual reconciliation to determine whether payments had settled, failed, or were stuck in a retry loop. Partial failures had no recovery path.</p>`,
        },
        discovery: {
          heading: "Discovery",
          body: `<p>Mapped all booking type payment flows end-to-end. Identified gaps: no timeout handling, no partial failure recovery, no unified status model across payment states. Worked with finance and engineering to understand how payment data was consumed downstream and where reconciliation breakdowns were occurring.</p>`,
        },
        approach: {
          heading: "The Approach",
          body: `<p>Treated the JustPay integration as a platform-layer problem, not a feature. Designed the transaction flow, payment state model, timeout thresholds, retry logic, and edge cases (partial failures, double-debit prevention, session expiry) before any engineering work began. Wrote detailed acceptance criteria that required full state coverage across all payment paths.</p>`,
        },
        execution: {
          heading: "Execution",
          body: `<p>Led UAT with engineering and finance teams across all payment states. Stress-tested partial failure and retry scenarios with deliberately constructed edge cases. Required sign-off from finance on reconciliation accuracy before launch.</p>`,
        },
        outcome: {
          heading: "Outcome",
          body: `<p>Enabled real-time payment tracking across all booking types. Eliminated manual reconciliation for payment status checks. Finance team gained a reliable status layer they could query directly.</p>`,
        },
      },
    },

    // ── 5. Shop Floor / Ops Digitization ─────────────────────────────────────
    {
      id:    "shop-floor",
      title: "Going to the Shop Floor Before Writing a Single Spec",
      tag:   "Ops Digitization · Veena World",
      sections: {
        mess: {
          heading: "The Mess",
          body: `<p>Sales, air ticketing, visa processing, and document management ran on fragmented, manual workflows — email, Excel, WhatsApp, and an ERP that ops staff worked around rather than with. High manual effort per transaction, slow turnaround, no visibility into workflow status across departments. The ERP had features that nobody used because they didn't match how work actually moved.</p>`,
        },
        discovery: {
          heading: "Discovery",
          body: `<p>Led structured field research with frontline ops teams — what I call Shop Floor Reality. Spent time directly with visa processing, air ticketing, and document management teams. Observed work in progress, not reported work. Identified 50+ product and automation opportunities from direct observation and structured interviews — not secondhand reporting from managers.</p><p>The key finding: most of the friction was in handoffs, not in individual tasks. Work stalled between people, not within them.</p>`,
        },
        approach: {
          heading: "The Approach",
          body: `<p>Prioritized the highest-effort, highest-frequency manual tasks first. Designed workflow digitization around how ops teams actually worked, not how the ERP assumed they worked. Built department-specific dashboards for visibility before touching any workflow logic — the team needed to see their own state clearly before we could change it.</p>`,
        },
        execution: {
          heading: "Execution",
          body: `<p>Built utilities for arrival card copy (Thailand, South Korea), automated cover letter and tour joining letter generation, follow-up automation, and integrated vendor/tracking tools. Automated reporting across departments. Redesigned end-to-end workflows for visa and document management. Deployed across 800+ ops staff.</p>`,
        },
        outcome: {
          heading: "Outcome",
          body: `<ul><li>~20 minutes cut per transaction</li><li>70% reduction in manual effort</li><li>~50% reduction in turnaround time</li><li>Internal email overhead eliminated entirely for tracked workflows</li></ul>`,
        },
      },
    },

    // ── 6. 0-to-1 Insurance Platform (LAYR) ──────────────────────────────────
    {
      id:    "layr-insurance",
      title: "Building a 0-to-1 Insurance Platform in 6 Months",
      tag:   "B2B SaaS · Hidden Brains InfoTech",
      sections: {
        mess: {
          heading: "The Mess",
          body: `<p>US commercial P&C insurance ran on phone calls, PDFs, and disconnected broker tools. No digital platform existed for brokerages or small business policyholders. Onboarding, policy management, and claims were entirely manual. Brokers spent 60+ minutes onboarding a single client.</p>`,
        },
        discovery: {
          heading: "Discovery",
          body: `<p>Requirements gathered directly from US-based clients and brokerages. Mapped the end-to-end insurance lifecycle: broker onboarding, insured profile filing, policy binding, mid-term endorsements, renewals, and claims. Identified the biggest time sinks — broker onboarding and policy filing — and anchored the initial scope around solving those first.</p>`,
        },
        approach: {
          heading: "The Approach",
          body: `<p>Scoped and structured the 0-to-1 build to ship a usable beta in 6 months against a 12-month plan. Prioritized the broker-facing onboarding flow and policy lifecycle as the foundation. Deferred claims complexity to post-beta. The goal was to get brokers and policyholders into a working system as fast as possible — learning from real usage was worth more than a perfect first spec.</p>`,
        },
        execution: {
          heading: "Execution",
          body: `<p>Owned onboarding journeys for all user types (brokers, agents, policyholders), insurance profile filing workflows, policy lifecycle (bind, endorse, cancel, renew), and claims workflows. Coordinated requirements across US-based clients, the Indian dev team, and product leadership — three time zones, two languages, one roadmap.</p>`,
        },
        outcome: {
          heading: "Outcome",
          body: `<ul><li>Beta launched in 6 months vs. 12 planned</li><li>3,000+ brokerages and agents served</li><li>1M+ small business policyholders</li><li>Broker onboarding time: 60 minutes → 20 minutes (66% reduction)</li><li>Revenue impact: $2M+</li></ul>`,
        },
      },
    },

    // ── 7. Internal Tools (CMS, Recs, Ads) ───────────────────────────────────
    {
      id:    "internal-tools",
      title: "Three Internal Tools, One Ops Problem",
      tag:   "CMS · Rec Engine · Ad Platform · Veena World",
      sections: {
        mess: {
          heading: "The Mess",
          body: `<p>Tour inventory surfacing, content management, and ad placement were all manual processes. Ops teams spent significant time deciding what showed up where. There was no recommendation logic, no CMS, and ad placements were managed by spreadsheet with no performance tracking.</p>`,
        },
        discovery: {
          heading: "Discovery",
          body: `<p>Identified three related problems with overlapping solutions: (1) no logic-driven recommendation layer for tour inventory surfacing, (2) manual content ops with no CMS — every change required a dev ticket, (3) ad placements managed by spreadsheet with no CTR or conversion tracking.</p><p>Each was independently worth solving, but they shared underlying inventory and rules infrastructure. Building them together was more efficient than sequencing them.</p>`,
        },
        approach: {
          heading: "The Approach",
          body: `<p>Built three interconnected internal tools: a recommendation engine, a CMS with automated upselling logic, and a rules-based ad serving platform. Each addressed a distinct ops bottleneck. Each reduced the number of engineering tickets ops teams had to raise to do their jobs.</p>`,
        },
        execution: {
          heading: "Execution",
          body: `<p><strong>Recommendation engine:</strong> Defined ranking logic incorporating vendor geography, historical sales patterns, and real-time seat availability. Wrote acceptance criteria around inventory freshness and ranking staleness thresholds.</p><p><strong>CMS:</strong> Automated upselling logic, reduced organic traffic dependency on manual updates.</p><p><strong>Ad platform:</strong> Rules-based serving across homepage, SRP, and PDP with priority logic, 5 auto-generated template variations, and placement tracking (CTR, clicks, booking conversions) for internal and paid partner placements (airlines, tourism boards).</p>`,
        },
        outcome: {
          heading: "Outcome",
          body: `<ul><li>Recommendation engine: 10% conversion lift</li><li>CMS: 70% reduction in manual content ops, 8% organic traffic lift</li><li>Ad platform: enabled paid partner placements as a net-new revenue stream with full conversion tracking</li></ul>`,
        },
      },
    },
  ],

  // ---------------------------------------------------------------------------
  // EXPERIENCE
  // Most recent first.
  // ---------------------------------------------------------------------------
  experience: [
    {
      role:        "Product Manager",
      company:     "Veena World (Blue Cloud Tech)",
      period:      "May 2023 – Present",
      location:    "Bengaluru",
      description: "Building consumer and enterprise products across search, billing, ops tooling, and AI integrations for a travel platform serving 150K+ annual bookings and 800+ ops staff.",
    },
    {
      role:        "Product Analyst",
      company:     "Hidden Brains InfoTech",
      period:      "Jan 2021 – May 2023",
      location:    "Ahmedabad",
      description: "Scoped and launched LAYR — a 0-to-1 commercial P&C insurance platform for US brokerages — from zero to beta in 6 months. Served 3,000+ brokerages and 1M+ policyholders.",
    },
  ],

  // ---------------------------------------------------------------------------
  // EDUCATION
  // ---------------------------------------------------------------------------
  education: [
    {
      degree:      "B.Tech, Mechanical Engineering",
      institution: "Manipal University Jaipur",
      period:      "2016 – 2020",
    },
    {
      degree:      "AI for Product Management",
      institution: "Pendo.io",
      period:      "Certification",
    },
    {
      degree:      "Data Science — Python, AI, ML",
      institution: "Certification",
      period:      "",
    },
  ],

  // ---------------------------------------------------------------------------
  // TOOLKIT
  // Categories with comma-separated skill lists.
  // ---------------------------------------------------------------------------
  toolkit: [
    {
      category: "Product",
      skills:   ["Search & Discovery", "Conversion Optimization", "Billing & Rules Engines", "API Product Management", "ERP", "Internal Tools", "A/B Testing", "GTM & Launch", "Agile / Scrum"],
    },
    {
      category: "AI & Automation",
      skills:   ["LLM API Integration", "Prompt Engineering", "AI Feature Scoping", "Recommendation Systems", "Workflow Automation"],
    },
    {
      category: "Analytics",
      skills:   ["GA4", "Mixpanel / Amplitude", "SQL", "MS Clarity", "Funnel & Cohort Analysis"],
    },
    {
      category: "Technical",
      skills:   ["API Integration", "Postman", "Claude Code", "Replit", "PRD / FRD / BRD", "Figma", "JIRA", "Confluence"],
    },
  ],

  // ---------------------------------------------------------------------------
  // HOW I USE AI
  // Each entry is one row in a two-column table.
  // ---------------------------------------------------------------------------
  aiUsage: [
    {
      area:        "Problem Structuring",
      description: "Used Claude to map combinatorial spaces, identify edge cases, and generate hypothesis frameworks from qualitative data. Replaced weeks of manual mapping.",
    },
    {
      area:        "Solution Architecture",
      description: "Iterated on rules engine design through back-and-forth with AI — pressure-testing architecture, conflict detection logic, and rule trace design before involving engineering.",
    },
    {
      area:        "Interactive Mockups",
      description: "Built fully interactive HTML mockups matching ERP visual language using AI. Used directly in stakeholder reviews, replacing static wireframes.",
    },
    {
      area:        "Edge Case Validation",
      description: "Fed real booking scenarios into AI to validate rule structures. Caught 3 rule conflicts pre-launch, including a partial cancellation edge case.",
    },
    {
      area:        "PRD & Spec Writing",
      description: "Drafted PRD structure, acceptance criteria, and edge case documentation with AI. Reduced spec writing time from days to hours.",
    },
    {
      area:        "Rapid Prototyping",
      description: "Hands-on with Claude Code and Replit for building working prototypes, utilities, and internal tools without waiting for engineering cycles.",
    },
  ],

};
