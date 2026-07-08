# Portfolio Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `index.html`/`css/style.css`/`js/*.js` for the portfolio at `SandyeepSharma/Sandeep_Sharma` from scratch — modern black+orange design with an aurora hero, a live Three.js node-graph, a floating "dashboard preview" of the Decarbonisation Engine, and content refreshed from the current resume — replacing the stale 2019 Bootstrap template.

**Architecture:** Single-page static site (`index.html`), one stylesheet (`css/style.css`), two vanilla-JS files (`js/main.js` for nav/scroll-reveal/counters/parallax, `js/hero-graph.js` for the isolated Three.js scene). No build step — deploys as-is to GitHub Pages. Both `index.html` and `css/style.css` grow section-by-section across tasks via a stable anchor-comment pattern (`<!-- SECTION_INSERT_POINT -->`, `<!-- SCRIPTS_INSERT_POINT -->`, `/* STYLE_INSERT_POINT */`) so each task's diff is a clean insertion, not a rewrite.

**Tech Stack:** Plain HTML5, CSS3 (custom properties, `IntersectionObserver`-driven reveal), vanilla ES5-safe JS, Three.js r128 (via cdnjs CDN, no npm), Google Fonts (Space Grotesk).

## Global Constraints

- Repo root for every path below: `C:\Users\sandy\Documents\Sandeep_Sharma_Portfolio`
- No build tooling, no bundler, no `npm install`, no JS framework — plain HTML/CSS/JS, Three.js loaded only via CDN `<script>` tag
- No live/backend AI feature anywhere on the site — the "Decarbonisation Engine" dashboard card and terminal log are static/mocked content, not API calls
- Palette is fixed: background `#050505`/`#0d0d0d`, primary accent orange `#ff6a2b` (soft variant `#ffb27a`), text `#ffffff`/`#9a9a9a`, secondary hero-only accents teal `#5eead4` and violet `#a78bfa`
- All content (roles, dates, employers, metrics, skills, certifications) must come from the resume facts recorded in this plan — do not invent or alter numbers
- Reuse only the existing `images/profile.jpeg` and `images/about.jpeg` — no new binary image assets
- Every animation/motion effect must be neutralized under `prefers-reduced-motion: reduce`
- Final site must remain a pure static deploy — GitHub Pages serves `index.html` directly from `main`, no server-side anything
- `resume.pdf` already exists at the repo root (converted from the source docx) — link to it, do not regenerate it

---

### Task 1: Page skeleton, design tokens, and nav

**Files:**
- Create: `index.html`
- Create: `css/style.css`

**Interfaces:**
- Produces: anchor comments `<!-- SECTION_INSERT_POINT -->` and `<!-- SCRIPTS_INSERT_POINT -->` in `index.html` (body), and `/* STYLE_INSERT_POINT */` in `css/style.css` — every later task inserts content immediately before these markers, leaving one copy of each marker after the edit
- Produces: CSS custom properties consumed by every later task: `--bg`, `--bg-alt`, `--bg-alt-text`, `--text`, `--text-muted`, `--accent`, `--accent-soft`, `--accent-teal`, `--accent-violet`, `--border`, `--radius-sm`, `--radius-md`, `--radius-lg`, `--font-display`, `--font-body`, `--font-mono`, `--container-w`, `--transition`
- Produces: layout helper classes consumed by every later task: `.container`, `.section`, `.section--alt`, `.section-title`, `.eyebrow`, `.reveal`, `.reveal.in`, `.stagger` (container marker, styled by `.rchild`), `.rchild`, `.rchild.in`

- [ ] **Step 1: Write `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sandeep Sharma — Lead AI Engineer</title>
  <meta name="description" content="Lead AI Engineer building production GenAI, RAG and agentic systems for supply chain and manufacturing.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="nav-progress"></div>
  <nav class="nav">
    <a href="#hero" class="nav-logo"><span class="dot"></span>SANDEEP</a>
    <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false"><span></span><span></span><span></span></button>
    <div class="nav-links">
      <a href="#about">About</a>
      <a href="#work">Work</a>
      <a href="#experience">Experience</a>
      <a href="#contact">Contact</a>
    </div>
    <a href="resume.pdf" class="nav-cta" download>Resume</a>
  </nav>

  <!-- SECTION_INSERT_POINT -->

  <!-- SCRIPTS_INSERT_POINT -->
</body>
</html>
```

- [ ] **Step 2: Write `css/style.css`**

```css
/* ============ Design Tokens ============ */
:root {
  --bg: #050505;
  --bg-alt: #ffffff;
  --bg-alt-text: #0d0d0d;
  --text: #ffffff;
  --text-muted: #9a9a9a;
  --accent: #ff6a2b;
  --accent-soft: #ffb27a;
  --accent-teal: #5eead4;
  --accent-violet: #a78bfa;
  --border: rgba(255, 255, 255, 0.1);
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 24px;
  --font-display: 'Space Grotesk', -apple-system, sans-serif;
  --font-body: -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'Courier New', monospace;
  --container-w: 1120px;
  --transition: 0.3s ease;
}

/* ============ Reset ============ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: var(--bg); color: var(--text); font-family: var(--font-body); line-height: 1.5; overflow-x: hidden; }
img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; }
h1, h2, h3 { font-family: var(--font-display); }

/* ============ Layout helpers ============ */
.container { max-width: var(--container-w); margin: 0 auto; padding: 0 24px; }
.section { position: relative; padding: 100px 0; background: var(--bg); color: var(--text); }
.section--alt { background: var(--bg-alt); color: var(--bg-alt-text); }
.section-title { font-size: clamp(28px, 4vw, 40px); font-weight: 800; letter-spacing: -0.5px; margin-bottom: 20px; max-width: 640px; }
.eyebrow { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; padding: 6px 14px; border-radius: 999px; background: var(--accent); color: #0d0d0d; font-weight: 700; margin-bottom: 20px; }
.section--alt .eyebrow { background: #0d0d0d; color: var(--accent); }

/* ============ Reveal / stagger motion ============ */
.reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
.reveal.in { opacity: 1; transform: none; }
.rchild { opacity: 0; transform: translateY(14px) scale(0.94); transition: opacity 0.4s ease, transform 0.4s ease; }
.rchild.in { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .reveal, .rchild { transition: opacity 0.3s ease; transform: none !important; }
  *, *::before, *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; }
}

/* ============ Nav ============ */
.nav-progress { position: fixed; top: 0; left: 0; height: 3px; width: 0%; background: linear-gradient(90deg, var(--accent), var(--accent-soft)); z-index: 200; }
.nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 18px 32px; }
.nav-logo { font-family: var(--font-display); font-weight: 700; color: #fff; font-size: 15px; display: flex; align-items: center; gap: 8px; }
.nav-logo .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 10px var(--accent); }
.nav-links { display: flex; gap: 4px; background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border); padding: 6px; border-radius: 999px; backdrop-filter: blur(12px); }
.nav-links a { padding: 8px 16px; font-size: 13px; color: #d4d4d4; border-radius: 999px; transition: var(--transition); }
.nav-links a:hover { background: rgba(255, 255, 255, 0.08); color: #fff; }
.nav-cta { display: inline-flex; align-items: center; gap: 8px; background: transparent; border: 1px solid var(--accent); color: #fff; font-size: 13px; font-weight: 600; padding: 9px 18px; border-radius: 999px; transition: var(--transition); }
.nav-cta:hover { background: var(--accent); color: #0d0d0d; }
.nav-toggle { display: none; flex-direction: column; gap: 4px; background: none; border: none; cursor: pointer; padding: 8px; }
.nav-toggle span { width: 20px; height: 2px; background: #fff; }

/* STYLE_INSERT_POINT */
```

- [ ] **Step 3: Serve and verify the skeleton renders**

Use the `preview_start` tool with `name: "portfolio"` (reads `.claude/launch.json`, already present at the repo root). Then use `preview_screenshot` and `preview_console_logs` (`level: "error"`).

Expected: a black page with the nav bar visible (wordmark left, pill nav-links center, "Resume" button right), zero console errors, zero failed network requests (`preview_network` with `filter: "failed"` returns empty).

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "Add page skeleton, design tokens, and nav"
```

---

### Task 2: Core interactions — `js/main.js`

**Files:**
- Create: `js/main.js`
- Modify: `index.html` (replace `<!-- SCRIPTS_INSERT_POINT -->`)

**Interfaces:**
- Consumes: `.nav-progress`, `.nav-toggle`, `.nav-links`, `.reveal`, `.stagger`/`.rchild` classes from Task 1
- Produces: `registerInit(fn)` pattern inside the IIFE — every later task that needs a new behavior defines a function and adds one `registerInit(fnName);` line immediately before the `// SECTION: REGISTER_HOOKS` marker (the anchor this task creates). Also produces the global reveal/stagger behavior every later section relies on by just adding `.reveal`/`.stagger`/`.rchild` classes to its markup — no further JS needed for plain reveal.

- [ ] **Step 1: Write `js/main.js`**

```javascript
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var initFns = [];
  function registerInit(fn) { initFns.push(fn); }

  function initNavProgress() {
    var bar = document.querySelector('.nav-progress');
    if (!bar) return;
    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = pct + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  function initNavToggle() {
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { links.classList.remove('is-open'); });
    });
  }

  function initReveal() {
    var targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;
    if (prefersReducedMotion) {
      targets.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    targets.forEach(function (el) { observer.observe(el); });
  }

  function initStagger() {
    var containers = document.querySelectorAll('.stagger');
    if (!containers.length) return;
    if (prefersReducedMotion) {
      containers.forEach(function (c) {
        c.querySelectorAll('.rchild').forEach(function (el) { el.classList.add('in'); });
      });
      return;
    }
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var children = entry.target.querySelectorAll('.rchild');
          children.forEach(function (el, i) {
            setTimeout(function () { el.classList.add('in'); }, i * 70);
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    containers.forEach(function (el) { observer.observe(el); });
  }

  function initFooterYear() {
    var el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  registerInit(initNavProgress);
  registerInit(initNavToggle);
  registerInit(initReveal);
  registerInit(initStagger);
  registerInit(initFooterYear);
  // SECTION: REGISTER_HOOKS

  document.addEventListener('DOMContentLoaded', function () {
    initFns.forEach(function (fn) { fn(); });
  });
})();
```

- [ ] **Step 2: Wire the script tag into `index.html`**

In `index.html`, replace:

```html
  <!-- SCRIPTS_INSERT_POINT -->
```

with:

```html
  <script src="js/main.js" defer></script>
  <!-- SCRIPTS_INSERT_POINT -->
```

- [ ] **Step 3: Verify nav progress bar and reveal observer work**

Use `preview_start` (name: `"portfolio"`), then `preview_eval` with:

```javascript
(function(){
  var div = document.createElement('div');
  div.className = 'reveal';
  div.id = 'test-reveal-probe';
  div.style.cssText = 'position:fixed;top:5000px;';
  document.body.appendChild(div);
  return 'probe added';
})()
```

Then `preview_eval` with `window.scrollTo(0, 4990)`, wait briefly, then `preview_eval` with:

```javascript
document.getElementById('test-reveal-probe').classList.contains('in')
```

Expected: `true` (proves the `IntersectionObserver` in `initReveal` is running). Clean up with `preview_eval`: `document.getElementById('test-reveal-probe').remove()`.

Also check `preview_console_logs` (`level: "error"`) returns empty.

- [ ] **Step 4: Commit**

```bash
git add js/main.js index.html
git commit -m "Add core nav/scroll-reveal interactions in main.js"
```

---

### Task 3: Hero section (aurora, orbs, terminal, dashboard preview)

**Files:**
- Modify: `index.html` (replace `<!-- SECTION_INSERT_POINT -->`)
- Modify: `css/style.css` (replace `/* STYLE_INSERT_POINT */`)
- Modify: `js/main.js` (replace `// SECTION: REGISTER_HOOKS`)

**Interfaces:**
- Consumes: `registerInit` from Task 2
- Produces: `#hero-canvas` element (empty canvas, sized by CSS) that Task 4's `hero-graph.js` renders into; `#hero-terminal-body` element that this task's own `initHeroTerminal` types into

- [ ] **Step 1: Insert hero markup into `index.html`**

Replace:

```html
  <!-- SECTION_INSERT_POINT -->
```

with:

```html
  <header class="hero" id="hero">
    <div class="hero-aurora" aria-hidden="true"></div>
    <div class="hero-grain" aria-hidden="true"></div>
    <canvas id="hero-canvas" aria-hidden="true"></canvas>

    <div class="hero-orb hero-orb--1" aria-hidden="true"></div>
    <div class="hero-orb hero-orb--2" aria-hidden="true"></div>
    <div class="hero-orb hero-orb--3" aria-hidden="true"></div>

    <div class="hero-content">
      <span class="hero-pill">● Available for Lead AI Engineering roles</span>
      <h1 class="hero-title">Sandeep <span class="hl">Sharma</span></h1>
      <p class="hero-sub">Lead AI Engineer building production GenAI, RAG &amp; agentic systems for supply chain and manufacturing.</p>
      <a href="#work" class="hero-cta">See the Work →</a>
    </div>

    <div class="hero-terminal" aria-hidden="true">
      <div class="hero-terminal__bar">
        <span class="dot dot--red"></span><span class="dot dot--yellow"></span><span class="dot dot--green"></span>
      </div>
      <div class="hero-terminal__body" id="hero-terminal-body"></div>
    </div>

    <div class="hero-scrollcue"><span class="ring">↓</span> scroll</div>

    <div class="hero-dashboard">
      <div class="hero-dashboard__head">
        <span class="hero-dashboard__title"><span class="sq"></span>Decarbonisation Engine</span>
        <span class="hero-dashboard__badge">LIVE PROJECT</span>
      </div>
      <div class="hero-dashboard__rows">
        <div class="hero-dashboard__row"><span class="name">#1 Switch supplier — frame rails</span><span class="meta">-8.4 tCO2e/yr</span><span class="score">92%</span></div>
        <div class="hero-dashboard__row"><span class="name">#2 Energy efficiency retrofit</span><span class="meta">-5.1 tCO2e/yr</span><span class="score">87%</span></div>
        <div class="hero-dashboard__row"><span class="name">#3 Material change — S420MC</span><span class="meta">-3.6 tCO2e/yr</span><span class="score">74%</span></div>
      </div>
    </div>
  </header>

  <!-- SECTION_INSERT_POINT -->
```

- [ ] **Step 2: Insert hero CSS into `css/style.css`**

Replace:

```css
/* STYLE_INSERT_POINT */
```

with:

```css
/* ============ Hero ============ */
.hero { position: relative; min-height: 100vh; overflow: hidden; background: #050505; display: flex; flex-direction: column; }
.hero-aurora { position: absolute; inset: -10%; z-index: 0; filter: blur(50px); opacity: 0.7; animation: auroraShift 10s ease-in-out infinite; }
.hero-aurora::before { content: ""; position: absolute; inset: 0; background:
  radial-gradient(circle at 30% 20%, rgba(255, 106, 43, 0.5), transparent 40%),
  radial-gradient(circle at 70% 15%, rgba(255, 178, 122, 0.3), transparent 35%),
  radial-gradient(circle at 50% 80%, rgba(120, 60, 20, 0.35), transparent 45%);
}
@keyframes auroraShift { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-3%) scale(1.05); } }
.hero-grain { position: absolute; inset: 0; z-index: 1; opacity: 0.05; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
#hero-canvas { position: absolute; inset: 0; z-index: 2; width: 100%; height: 100%; }

.hero-orb { position: absolute; z-index: 3; border-radius: 50%; }
.hero-orb--1 { width: 120px; height: 120px; top: 22%; left: 8%; background: radial-gradient(circle at 35% 30%, rgba(255,255,255,.9), rgba(255,178,122,.5) 35%, rgba(120,50,10,.9) 75%, #050505 100%); box-shadow: 0 0 50px rgba(255,106,43,.35); animation: orbFloat1 8s ease-in-out infinite; }
.hero-orb--2 { width: 70px; height: 70px; top: 40%; right: 10%; background: radial-gradient(circle at 35% 30%, rgba(255,255,255,.85), rgba(94,234,212,.35) 40%, rgba(10,40,40,.9) 78%, #050505 100%); box-shadow: 0 0 34px rgba(94,234,212,.25); animation: orbFloat2 6.5s ease-in-out infinite; }
.hero-orb--3 { width: 42px; height: 42px; top: 60%; left: 18%; background: radial-gradient(circle at 35% 30%, rgba(255,255,255,.8), rgba(167,139,250,.4) 40%, rgba(30,10,50,.9) 78%, #050505 100%); box-shadow: 0 0 24px rgba(167,139,250,.25); animation: orbFloat3 7s ease-in-out infinite; }
@keyframes orbFloat1 { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(12px,-28px); } }
@keyframes orbFloat2 { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(-16px,-18px); } }
@keyframes orbFloat3 { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(10px,20px); } }

.hero-content { position: relative; z-index: 5; flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 120px 24px 60px; }
.hero-pill { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-family: var(--font-mono); letter-spacing: 1.5px; text-transform: uppercase; padding: 7px 16px; border-radius: 999px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.16); color: #e5e5e5; margin-bottom: 22px; }
.hero-title { font-size: clamp(44px, 8vw, 88px); font-weight: 800; line-height: 1; letter-spacing: -2px; color: #fff; margin-bottom: 18px; }
.hero-title .hl { background: linear-gradient(90deg, var(--accent), var(--accent-soft)); -webkit-background-clip: text; background-clip: text; color: transparent; }
.hero-sub { font-size: 16px; color: #c9c9c9; max-width: 480px; line-height: 1.6; margin-bottom: 30px; }
.hero-cta { display: inline-flex; align-items: center; gap: 8px; background: #0d0d0d; border: 1px solid var(--accent); color: #fff; font-weight: 700; font-size: 14px; padding: 13px 26px; border-radius: 999px; box-shadow: 0 0 24px rgba(255,106,43,.3); transition: var(--transition); }
.hero-cta:hover { background: var(--accent); color: #0d0d0d; }

.hero-terminal { position: absolute; z-index: 6; top: 110px; right: 6%; width: 240px; background: rgba(15,15,15,.75); border: 1px solid rgba(255,255,255,.14); border-radius: 10px; backdrop-filter: blur(14px); box-shadow: 0 20px 50px rgba(0,0,0,.5); font-family: var(--font-mono); font-size: 11px; overflow: hidden; animation: termFloat 5.5s ease-in-out infinite; }
@keyframes termFloat { 0%, 100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-14px) rotate(1.5deg); } }
.hero-terminal__bar { display: flex; gap: 5px; padding: 8px 10px; background: rgba(255,255,255,.04); }
.hero-terminal__bar .dot { width: 7px; height: 7px; border-radius: 50%; }
.dot--red { background: #ff5f56; } .dot--yellow { background: #ffbd2e; } .dot--green { background: #27c93f; }
.hero-terminal__body { padding: 10px 12px 14px; color: var(--accent-teal); line-height: 1.7; min-height: 84px; }
.hero-terminal__body .dim { color: #8b93a7; }
.hero-terminal__body .hl2 { color: var(--accent-soft); }
.term-cursor { display: inline-block; width: 6px; height: 11px; background: var(--accent-teal); vertical-align: middle; animation: blink 1s step-end infinite; }
@keyframes blink { 50% { opacity: 0; } }

.hero-scrollcue { position: absolute; z-index: 6; bottom: 140px; right: 6%; display: flex; align-items: center; gap: 8px; font-size: 10px; color: #c9c9c9; letter-spacing: 1px; text-transform: uppercase; }
.hero-scrollcue .ring { width: 26px; height: 26px; border-radius: 50%; border: 1px solid rgba(255,106,43,.6); display: flex; align-items: center; justify-content: center; color: var(--accent); animation: bob 1.4s ease-in-out infinite; }
@keyframes bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }

.hero-dashboard { position: relative; z-index: 5; margin: 0 auto -1px; width: 92%; max-width: 560px; background: rgba(13,13,13,.75); border: 1px solid rgba(255,255,255,.14); border-radius: 18px 18px 0 0; backdrop-filter: blur(16px); box-shadow: 0 -10px 60px rgba(255,106,43,.12), 0 -4px 40px rgba(0,0,0,.6); padding: 18px 20px; animation: dashFloat 7s ease-in-out infinite; }
@keyframes dashFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
.hero-dashboard__head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.hero-dashboard__title { font-size: 12px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 8px; }
.hero-dashboard__title .sq { width: 16px; height: 16px; border-radius: 5px; background: linear-gradient(135deg, var(--accent), var(--accent-soft)); }
.hero-dashboard__badge { font-size: 9px; padding: 4px 10px; border-radius: 999px; background: rgba(94,234,212,.14); color: var(--accent-teal); border: 1px solid rgba(94,234,212,.3); }
.hero-dashboard__rows { display: flex; flex-direction: column; gap: 8px; }
.hero-dashboard__row { display: flex; justify-content: space-between; align-items: center; gap: 8px; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.06); border-radius: 8px; padding: 9px 12px; }
.hero-dashboard__row .name { font-size: 11px; color: #e5e5e5; flex: 1; }
.hero-dashboard__row .meta { font-size: 10px; color: #9a9a9a; }
.hero-dashboard__row .score { font-size: 11px; font-weight: 700; color: var(--accent-teal); }

/* STYLE_INSERT_POINT */
```

- [ ] **Step 3: Add the terminal typewriter to `js/main.js`**

Replace:

```javascript
  // SECTION: REGISTER_HOOKS
```

with:

```javascript
  function initHeroTerminal() {
    var body = document.getElementById('hero-terminal-body');
    if (!body) return;
    var logSets = [
      [
        { text: '&gt; analyzing_hotspots.py', cls: 'dim' },
        { text: 'ranked_lever: switch_supplier', cls: '' },
        { text: '&Delta;co2e: <span class="hl2">-8.4 tCO2e/yr</span>', cls: '' }
      ],
      [
        { text: '&gt; rag_query.py --k=5', cls: 'dim' },
        { text: 'searching 135 docs...', cls: '' },
        { text: 'citations: <span class="hl2">5/5 grounded</span>', cls: '' }
      ],
      [
        { text: '&gt; validate_constraints.py', cls: 'dim' },
        { text: 'checking 133 rules...', cls: '' },
        { text: 'status: <span class="hl2">FEASIBLE</span>', cls: '' }
      ]
    ];
    var setIdx = 0;

    if (prefersReducedMotion) {
      body.innerHTML = logSets[0].map(function (l) { return '<div>' + l.text + '</div>'; }).join('');
      return;
    }

    function runSet() {
      body.innerHTML = '';
      var lines = logSets[setIdx];
      var li = 0;
      function typeLine() {
        if (li >= lines.length) {
          setTimeout(function () { setIdx = (setIdx + 1) % logSets.length; runSet(); }, 1400);
          return;
        }
        var line = lines[li];
        var div = document.createElement('div');
        div.className = line.cls;
        body.appendChild(div);
        var raw = line.text;
        var ci = 0;
        function step() {
          ci++;
          div.innerHTML = raw.slice(0, ci) + '<span class="term-cursor"></span>';
          if (ci < raw.length) { setTimeout(step, 16); }
          else { div.innerHTML = raw; li++; setTimeout(typeLine, 260); }
        }
        step();
      }
      typeLine();
    }
    runSet();
  }

  function initHeroScrollFade() {
    var hero = document.getElementById('hero');
    var content = document.querySelector('.hero-content');
    if (!hero || !content || prefersReducedMotion) return;
    function update() {
      var rect = hero.getBoundingClientRect();
      var progress = Math.min(1, Math.max(0, -rect.top / rect.height));
      content.style.opacity = String(1 - progress);
      content.style.transform = 'translateY(' + (progress * 40) + 'px)';
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  registerInit(initHeroTerminal);
  registerInit(initHeroScrollFade);
  // SECTION: REGISTER_HOOKS
```

- [ ] **Step 4: Verify hero renders, the terminal types, and the hero fades on scroll**

Use `preview_start` (name: `"portfolio"`), `preview_screenshot` to confirm the hero fills the viewport with the headline "Sandeep Sharma", the pill, the CTA, three orbs, the terminal card, and the dashboard card peeking from the bottom.

Then `preview_eval`:

```javascript
document.getElementById('hero-terminal-body').textContent.length > 0
```

Expected: `true` (terminal has started typing).

Then `preview_eval` `window.scrollTo(0, 400)`, wait briefly, then `preview_eval`:

```javascript
parseFloat(getComputedStyle(document.querySelector('.hero-content')).opacity) < 1
```

Expected: `true` (the hero content has started fading as the page scrolls past it — the hero→about crossfade). Scroll back with `preview_eval` `window.scrollTo(0, 0)`.

Check `preview_console_logs` (`level: "error"`) is empty.

- [ ] **Step 5: Commit**

```bash
git add index.html css/style.css js/main.js
git commit -m "Add hero section: aurora, orbs, terminal log, dashboard preview"
```

---

### Task 4: Hero WebGL node-graph (`js/hero-graph.js`)

**Files:**
- Create: `js/hero-graph.js`
- Modify: `index.html` (replace `<!-- SCRIPTS_INSERT_POINT -->`)

**Interfaces:**
- Consumes: `#hero-canvas` and `#hero` from Task 3
- Produces: nothing consumed by later tasks — fully self-contained IIFE

- [ ] **Step 1: Write `js/hero-graph.js`**

```javascript
(function () {
  'use strict';
  var canvas = document.getElementById('hero-canvas');
  var hero = document.getElementById('hero');
  if (!canvas || !hero || typeof THREE === 'undefined') return;

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (window.innerWidth < 768) {
    canvas.style.display = 'none';
    return;
  }

  var w = hero.clientWidth, h = hero.clientHeight;
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 1000);
  camera.position.z = 24;
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  var group = new THREE.Group();
  scene.add(group);

  var NODE_COUNT = 34;
  var nodePositions = [];
  var nodeMeshes = [];
  var nodeGeo = new THREE.SphereGeometry(0.13, 8, 8);
  var nodeMatMain = new THREE.MeshBasicMaterial({ color: 0xff6a2b, transparent: true, opacity: 0.85 });
  var nodeMatDim = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 });

  for (var i = 0; i < NODE_COUNT; i++) {
    var radius = 10 + Math.random() * 5;
    var theta = Math.random() * Math.PI * 2;
    var phi = Math.acos((Math.random() * 2) - 1);
    var x = radius * Math.sin(phi) * Math.cos(theta);
    var y = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
    var z = radius * Math.cos(phi);
    var isMain = Math.random() > 0.82;
    var mesh = new THREE.Mesh(nodeGeo, isMain ? nodeMatMain : nodeMatDim);
    mesh.position.set(x, y, z);
    mesh.userData.phase = Math.random() * Math.PI * 2;
    mesh.userData.isMain = isMain;
    group.add(mesh);
    nodeMeshes.push(mesh);
    nodePositions.push(new THREE.Vector3(x, y, z));
  }

  var lineMat = new THREE.LineBasicMaterial({ color: 0x8a5a3a, transparent: true, opacity: 0.18 });
  for (var a = 0; a < nodePositions.length; a++) {
    for (var b = a + 1; b < nodePositions.length; b++) {
      if (nodePositions[a].distanceTo(nodePositions[b]) < 6.5) {
        var geo = new THREE.BufferGeometry().setFromPoints([nodePositions[a], nodePositions[b]]);
        group.add(new THREE.Line(geo, lineMat));
      }
    }
  }

  var mouseX = 0, mouseY = 0;
  hero.addEventListener('mousemove', function (e) {
    var rect = hero.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / w) - 0.5;
    mouseY = ((e.clientY - rect.top) / h) - 0.5;
  });

  window.addEventListener('resize', function () {
    w = hero.clientWidth; h = hero.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  var clock = new THREE.Clock();
  function renderFrame() {
    var t = clock.getElapsedTime();
    group.rotation.y += prefersReducedMotion ? 0 : 0.0018;
    group.rotation.x += (mouseY * 0.3 - group.rotation.x) * 0.03;
    group.rotation.y += (mouseX * 0.15) * 0.01;
    nodeMeshes.forEach(function (m) {
      var s = m.userData.isMain ? (1 + Math.sin(t * 2 + m.userData.phase) * 0.3) : 1;
      m.scale.setScalar(s);
    });
    renderer.render(scene, camera);
  }

  if (prefersReducedMotion) {
    renderFrame();
  } else {
    (function animate() {
      requestAnimationFrame(animate);
      renderFrame();
    })();
  }
})();
```

- [ ] **Step 2: Wire the Three.js CDN and `hero-graph.js` script tags into `index.html`**

Replace:

```html
  <!-- SCRIPTS_INSERT_POINT -->
```

with:

```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" defer></script>
  <script src="js/hero-graph.js" defer></script>
  <!-- SCRIPTS_INSERT_POINT -->
```

- [ ] **Step 3: Verify the WebGL scene renders**

Use `preview_start` (name: `"portfolio"`), `preview_resize` to `{ width: 1280, height: 800 }` (desktop), then `preview_eval`:

```javascript
(function(){
  var c = document.getElementById('hero-canvas');
  return { display: getComputedStyle(c).display, width: c.width, height: c.height };
})()
```

Expected: `display` is not `"none"`, `width`/`height` are non-zero (canvas has been sized and rendered into). Take a `preview_screenshot` to visually confirm the faint rotating node/line graph is visible behind the hero content. Check `preview_console_logs` (`level: "error"`) is empty (confirms Three.js loaded and ran without WebGL errors).

Then `preview_resize` to `{ width: 600, height: 800 }` (below the 768px threshold), reload, and `preview_eval` the same expression — expected `display: "none"`.

- [ ] **Step 4: Commit**

```bash
git add js/hero-graph.js index.html
git commit -m "Add live Three.js node-graph to hero"
```

---

### Task 5: About section (bio, photo, stat counters)

**Files:**
- Modify: `index.html` (replace `<!-- SECTION_INSERT_POINT -->`)
- Modify: `css/style.css` (replace `/* STYLE_INSERT_POINT */`)
- Modify: `js/main.js` (replace `// SECTION: REGISTER_HOOKS`)

**Interfaces:**
- Consumes: `registerInit`, `.reveal`, `.section`/`.container` from earlier tasks; `images/profile.jpeg` (existing asset)

- [ ] **Step 1: Insert About markup into `index.html`**

Replace:

```html
  <!-- SECTION_INSERT_POINT -->
```

with:

```html
  <section class="section" id="about">
    <div class="container about-grid">
      <div class="about-photo reveal">
        <div class="about-photo__frame">
          <img src="images/profile.jpeg" alt="Sandeep Sharma" loading="lazy">
        </div>
      </div>
      <div class="about-copy reveal">
        <span class="eyebrow">About</span>
        <h2 class="section-title">Building AI systems that ship, not just demo</h2>
        <p class="about-text">Lead AI Engineer with 8+ years of experience building production-grade AI systems across supply chain, manufacturing, and FMCG. Expert in end-to-end AI pipelines, LLMs, RAG, Agentic AI, and MLOps. Currently architecting an AI-powered supply chain decarbonisation platform at Mavarick, combining GPT-4o reasoning, vector search over 135 industry documents, multi-stage constraint validation, and a production FastAPI backend — delivering ranked, cited decarbonisation recommendations from raw emissions data in under 2 minutes.</p>
        <div class="about-facts">
          <span>📍 Carrigaline, Co. Cork, Ireland</span>
          <span>💼 Lead AI Engineer @ Mavarick</span>
        </div>
        <div class="stat-row">
          <div class="stat"><span class="stat__num" data-target="8">0</span><span class="stat__label">Years Experience</span></div>
          <div class="stat"><span class="stat__num" data-target="135">0</span><span class="stat__label">Docs in RAG KB</span></div>
          <div class="stat"><span class="stat__num" data-target="133">0</span><span class="stat__label">Constraint Rules</span></div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION_INSERT_POINT -->
```

- [ ] **Step 2: Insert About CSS into `css/style.css`**

Replace:

```css
/* STYLE_INSERT_POINT */
```

with:

```css
/* ============ About ============ */
.about-grid { display: grid; grid-template-columns: 320px 1fr; gap: 60px; align-items: center; }
.about-photo__frame { width: 100%; max-width: 300px; aspect-ratio: 1; border-radius: 50%; overflow: hidden; border: 2px solid rgba(255,106,43,.5); box-shadow: 0 20px 50px rgba(255,106,43,.15); transition: transform .15s ease-out; animation: photoFloat 7s ease-in-out infinite; }
.about-photo__frame img { width: 100%; height: 100%; object-fit: cover; }
@keyframes photoFloat { 0%, 100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-12px) rotate(1.5deg); } }
.about-text { font-size: 16px; color: var(--text-muted); line-height: 1.75; margin-bottom: 24px; max-width: 620px; }
.about-facts { display: flex; gap: 20px; flex-wrap: wrap; font-size: 13px; color: #d4d4d4; margin-bottom: 40px; }
.stat-row { display: flex; gap: 48px; flex-wrap: wrap; }
.stat__num { display: block; font-family: var(--font-display); font-size: 34px; font-weight: 800; background: linear-gradient(90deg, var(--accent), var(--accent-soft)); -webkit-background-clip: text; background-clip: text; color: transparent; }
.stat__label { font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }

/* STYLE_INSERT_POINT */
```

- [ ] **Step 3: Add photo parallax and stat counters to `js/main.js`**

Replace:

```javascript
  // SECTION: REGISTER_HOOKS
```

with:

```javascript
  function initAboutPhotoParallax() {
    var frame = document.querySelector('.about-photo__frame');
    if (!frame || prefersReducedMotion) return;
    frame.addEventListener('mousemove', function (e) {
      var rect = frame.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) - 0.5;
      var y = ((e.clientY - rect.top) / rect.height) - 0.5;
      frame.style.transform = 'rotate(' + (x * 6) + 'deg) translate(' + (x * 8) + 'px,' + (y * 8) + 'px)';
    });
    frame.addEventListener('mouseleave', function () {
      frame.style.transform = '';
    });
  }

  function initStatCounters() {
    var row = document.querySelector('.stat-row');
    if (!row) return;
    var nums = row.querySelectorAll('.stat__num');
    if (prefersReducedMotion) {
      nums.forEach(function (el) { el.textContent = el.getAttribute('data-target'); });
      return;
    }
    var counted = false;
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !counted) {
          counted = true;
          nums.forEach(function (el) {
            var target = parseInt(el.getAttribute('data-target'), 10);
            var cur = 0;
            var step = Math.max(1, Math.round(target / 30));
            var t = setInterval(function () {
              cur += step;
              if (cur >= target) { cur = target; clearInterval(t); }
              el.textContent = cur;
            }, 30);
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    observer.observe(row);
  }

  registerInit(initAboutPhotoParallax);
  registerInit(initStatCounters);
  // SECTION: REGISTER_HOOKS
```

- [ ] **Step 4: Verify About section and counters**

Use `preview_start` (name: `"portfolio"`), `preview_eval` with `document.getElementById('about').scrollIntoView()`, wait briefly, then `preview_eval`:

```javascript
Array.from(document.querySelectorAll('.stat__num')).map(function(el){ return el.textContent; })
```

Expected: `["8", "135", "133"]` (counters finished counting up). `preview_screenshot` to confirm the circular photo and bio render correctly. `preview_console_logs` (`level: "error"`) empty.

- [ ] **Step 5: Commit**

```bash
git add index.html css/style.css js/main.js
git commit -m "Add About section with photo parallax and animated stat counters"
```

---

### Task 6: Trusted companies strip

**Files:**
- Modify: `index.html` (replace `<!-- SECTION_INSERT_POINT -->`)
- Modify: `css/style.css` (replace `/* STYLE_INSERT_POINT */`)

- [ ] **Step 1: Insert markup**

Replace:

```html
  <!-- SECTION_INSERT_POINT -->
```

with:

```html
  <section class="section trusted" id="trusted">
    <div class="container">
      <p class="trusted__label reveal">Companies I&rsquo;ve worked with</p>
      <div class="trusted__row reveal">
        <span>Mavarick</span><span>PepsiCo</span><span>Johnson Controls</span><span>Dell</span><span>Tata Consultancy Services</span>
      </div>
    </div>
  </section>

  <!-- SECTION_INSERT_POINT -->
```

- [ ] **Step 2: Insert CSS**

Replace:

```css
/* STYLE_INSERT_POINT */
```

with:

```css
/* ============ Trusted strip ============ */
.trusted { padding: 60px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.trusted__label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--text-muted); margin-bottom: 20px; }
.trusted__row { display: flex; gap: 40px; flex-wrap: wrap; align-items: center; }
.trusted__row span { font-family: var(--font-display); font-size: 16px; font-weight: 700; color: #5a5a5a; }

/* STYLE_INSERT_POINT */
```

- [ ] **Step 3: Verify**

Use `preview_start` (name: `"portfolio"`), `preview_eval`: `document.getElementById('trusted').scrollIntoView()`, `preview_screenshot`. Expected: all five company names visible in a row. `preview_console_logs` (`level: "error"`) empty.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "Add trusted companies strip"
```

---

### Task 7: What I Do — bento grid

**Files:**
- Modify: `index.html` (replace `<!-- SECTION_INSERT_POINT -->`)
- Modify: `css/style.css` (replace `/* STYLE_INSERT_POINT */`)

- [ ] **Step 1: Insert markup**

Replace:

```html
  <!-- SECTION_INSERT_POINT -->
```

with:

```html
  <section class="section section--alt" id="what-i-do">
    <div class="container">
      <span class="eyebrow reveal">What I Do</span>
      <h2 class="section-title reveal">AI systems that actually ship to production</h2>
      <div class="bento reveal stagger">
        <article class="bento-card rchild">
          <div class="bento-card__glow bento-card__glow--1"></div>
          <span class="bento-card__num">01</span>
          <h3>GenAI &amp; RAG Pipelines</h3>
          <p>LLM reasoning, vector search, and grounded citations over real industry documents.</p>
        </article>
        <article class="bento-card rchild">
          <div class="bento-card__glow bento-card__glow--2"></div>
          <span class="bento-card__num">02</span>
          <h3>MLOps &amp; Production Deployment</h3>
          <p>FastAPI backends, caching, retries, CI/CD, and cloud-native ML systems.</p>
        </article>
        <article class="bento-card rchild">
          <div class="bento-card__glow bento-card__glow--3"></div>
          <span class="bento-card__num">03</span>
          <h3>Constraint Validation &amp; Compliance</h3>
          <p>Rule engines that check every AI recommendation against real-world regulation.</p>
        </article>
      </div>
    </div>
  </section>

  <!-- SECTION_INSERT_POINT -->
```

- [ ] **Step 2: Insert CSS**

Replace:

```css
/* STYLE_INSERT_POINT */
```

with:

```css
/* ============ Bento (What I Do) ============ */
.bento { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 40px; }
.bento-card { position: relative; overflow: hidden; border-radius: var(--radius-lg); border: 1px solid rgba(13,13,13,.1); background: #f6f6f6; padding: 28px; min-height: 220px; display: flex; flex-direction: column; justify-content: flex-end; }
.bento-card__glow { position: absolute; top: -30%; right: -20%; width: 200px; height: 200px; border-radius: 50%; filter: blur(40px); opacity: .5; }
.bento-card__glow--1 { background: var(--accent); }
.bento-card__glow--2 { background: var(--accent-teal); }
.bento-card__glow--3 { background: var(--accent-violet); }
.bento-card__num { position: relative; font-family: var(--font-mono); font-size: 13px; font-weight: 700; color: var(--accent); margin-bottom: 40px; }
.bento-card h3 { position: relative; font-size: 19px; margin-bottom: 8px; }
.bento-card p { position: relative; font-size: 13px; color: #52525b; line-height: 1.6; }

/* STYLE_INSERT_POINT */
```

- [ ] **Step 3: Verify**

Use `preview_start` (name: `"portfolio"`), `preview_eval`: `document.getElementById('what-i-do').scrollIntoView()`, wait briefly, `preview_screenshot`. Expected: white section, three cards each with a distinct colored glow (orange/teal/violet) and numbered 01/02/03. `preview_eval`:

```javascript
document.querySelectorAll('#what-i-do .bento-card.rchild.in').length
```

Expected: `3` (stagger reveal completed). `preview_console_logs` (`level: "error"`) empty.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "Add What I Do bento grid"
```

---

### Task 8: Featured Work cards

**Files:**
- Modify: `index.html` (replace `<!-- SECTION_INSERT_POINT -->`)
- Modify: `css/style.css` (replace `/* STYLE_INSERT_POINT */`)

- [ ] **Step 1: Insert markup**

Replace:

```html
  <!-- SECTION_INSERT_POINT -->
```

with:

```html
  <section class="section" id="work">
    <div class="container">
      <span class="eyebrow reveal">Featured Work</span>
      <h2 class="section-title reveal">Systems built to ship, not to demo</h2>
      <div class="work-grid reveal stagger">
        <article class="work-card rchild work-card--1">
          <div class="work-card__scrim"></div>
          <div class="work-card__body">
            <h3>Decarbonisation Engine</h3>
            <p>4-stage AI pipeline &mdash; GPT-4o hotspot analysis, RAG over 135 industry docs, 133-rule constraint validation. Mavarick.</p>
            <div class="work-card__tags"><span>GPT-4o</span><span>RAG</span><span>FastAPI</span></div>
          </div>
        </article>
        <article class="work-card rchild work-card--2">
          <div class="work-card__scrim"></div>
          <div class="work-card__body">
            <h3>Demand Forecasting</h3>
            <p>Forecast accuracy improved from 55% to 82% across 15+ markets using ARIMA, XGBoost, and LSTM ensembles. PepsiCo.</p>
            <div class="work-card__tags"><span>XGBoost</span><span>LSTM</span><span>Power BI</span></div>
          </div>
        </article>
        <article class="work-card rchild work-card--3">
          <div class="work-card__scrim"></div>
          <div class="work-card__body">
            <h3>RAG Chatbot for Fire Safety Ops</h3>
            <p>Conversational chatbot over inventory and real-time logs using Mistral 7B and Falcon 40B with PEFT/LoRA fine-tuning. Johnson Controls.</p>
            <div class="work-card__tags"><span>Mistral 7B</span><span>LangChain</span><span>LoRA</span></div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- SECTION_INSERT_POINT -->
```

- [ ] **Step 2: Insert CSS**

Replace:

```css
/* STYLE_INSERT_POINT */
```

with:

```css
/* ============ Featured Work ============ */
.work-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 40px; }
.work-card { position: relative; min-height: 340px; border-radius: var(--radius-lg); overflow: hidden; display: flex; align-items: flex-end; padding: 28px; }
.work-card--3 { grid-column: 1 / -1; }
.work-card--1 { background: linear-gradient(135deg, #ff6a2b 0%, #3a1608 100%); }
.work-card--2 { background: linear-gradient(135deg, #1a4a45 0%, #0d0d0d 100%); }
.work-card--3 { background: linear-gradient(135deg, #4a2f7a 0%, #0d0d0d 100%); }
.work-card__scrim { position: absolute; inset: 0; background: linear-gradient(0deg, rgba(0,0,0,.75), transparent 60%); }
.work-card__body { position: relative; z-index: 1; max-width: 480px; }
.work-card__body h3 { font-size: 24px; color: #fff; margin-bottom: 10px; }
.work-card__body p { font-size: 14px; color: #e5e5e5; line-height: 1.6; margin-bottom: 14px; }
.work-card__tags { display: flex; gap: 8px; flex-wrap: wrap; }
.work-card__tags span { font-size: 11px; padding: 5px 12px; border-radius: 999px; background: rgba(255,255,255,.14); color: #fff; border: 1px solid rgba(255,255,255,.2); }

/* STYLE_INSERT_POINT */
```

- [ ] **Step 3: Verify**

Use `preview_start` (name: `"portfolio"`), `preview_eval`: `document.getElementById('work').scrollIntoView()`, `preview_screenshot`. Expected: two cards side by side (orange, teal-dark gradients) and a third full-width violet-dark card below, each with title/description/tags readable over the gradient. `preview_console_logs` (`level: "error"`) empty.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "Add Featured Work case-study cards"
```

---

### Task 9: Tech stack orbit

**Files:**
- Modify: `index.html` (replace `<!-- SECTION_INSERT_POINT -->`)
- Modify: `css/style.css` (replace `/* STYLE_INSERT_POINT */`)

- [ ] **Step 1: Insert markup**

Replace:

```html
  <!-- SECTION_INSERT_POINT -->
```

with:

```html
  <section class="section" id="stack">
    <div class="container">
      <span class="eyebrow reveal">Tech Stack</span>
      <h2 class="section-title reveal">The stack I build with</h2>
      <div class="orbit reveal stagger">
        <div class="orbit-item rchild">Python</div>
        <div class="orbit-item rchild">LangChain</div>
        <div class="orbit-item rchild">GPT-4o</div>
        <div class="orbit-item rchild">MongoDB</div>
        <div class="orbit-item rchild">AWS</div>
        <div class="orbit-item rchild">Docker</div>
        <div class="orbit-item rchild">FastAPI</div>
        <div class="orbit-item rchild">PyTorch</div>
      </div>
    </div>
  </section>

  <!-- SECTION_INSERT_POINT -->
```

- [ ] **Step 2: Insert CSS**

Replace:

```css
/* STYLE_INSERT_POINT */
```

with:

```css
/* ============ Tech stack orbit ============ */
.orbit { display: flex; flex-wrap: wrap; justify-content: center; gap: 28px; margin-top: 60px; padding: 0 20px; }
.orbit-item { display: flex; align-items: center; justify-content: center; min-width: 110px; padding: 14px 20px; border-radius: 999px; background: rgba(255,255,255,.04); border: 1px solid var(--border); font-family: var(--font-mono); font-size: 13px; color: #e5e5e5; }
.orbit-item:nth-child(odd) { transform: translateY(-16px); }
.orbit-item:nth-child(even) { transform: translateY(14px); }

/* STYLE_INSERT_POINT */
```

- [ ] **Step 3: Verify**

Use `preview_start` (name: `"portfolio"`), `preview_eval`: `document.getElementById('stack').scrollIntoView()`, `preview_screenshot`. Expected: 8 pill badges in a wavy arc arrangement (alternating up/down). `preview_console_logs` (`level: "error"`) empty.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "Add tech stack orbit"
```

---

### Task 10: Experience timeline

**Files:**
- Modify: `index.html` (replace `<!-- SECTION_INSERT_POINT -->`)
- Modify: `css/style.css` (replace `/* STYLE_INSERT_POINT */`)

- [ ] **Step 1: Insert markup**

Replace:

```html
  <!-- SECTION_INSERT_POINT -->
```

with:

```html
  <section class="section section--alt" id="experience">
    <div class="container">
      <span class="eyebrow reveal">Experience</span>
      <h2 class="section-title reveal">Where I&rsquo;ve built this</h2>
      <div class="timeline">
        <article class="timeline-item reveal">
          <div class="timeline-item__meta"><span class="timeline-item__role">Lead AI Engineer</span><span class="timeline-item__org">Mavarick &middot; Mar 2026 &ndash; Present</span></div>
          <ul class="timeline-item__points">
            <li>Architected an end-to-end 4-stage decarbonisation pipeline (hotspot detection, lever generation, constraint validation, evaluation/ranking) delivering recommendations in under 2 minutes.</li>
            <li>Built a RAG knowledge base over 135 industry PDFs (23,170 chunks) using sentence-transformers and MongoDB Atlas vector search.</li>
            <li>Designed a 133-rule constraint validation engine combining GPT-4o entity extraction with four pure-Python validator classes.</li>
            <li>Deployed a production FastAPI backend with parallel processing, response caching, and exponential-backoff retry logic.</li>
          </ul>
        </article>
        <article class="timeline-item reveal">
          <div class="timeline-item__meta"><span class="timeline-item__role">SC Data Scientist</span><span class="timeline-item__org">PepsiCo PGCS &middot; Jul 2024 &ndash; Present</span></div>
          <ul class="timeline-item__points">
            <li>Lead Data Science entity for the Supply Chain Demand Planning team.</li>
            <li>Built RAG pipelines and a fine-tuned (PEFT/LoRA) business chatbot using LangChain and Hugging Face.</li>
            <li>Developed a demand forecasting tool combining ARIMA, SARIMA, Prophet, XGBoost, and LSTM/GRU models.</li>
            <li>Increased forecast accuracy from 55% to 82% across 15+ markets.</li>
          </ul>
        </article>
        <article class="timeline-item reveal">
          <div class="timeline-item__meta"><span class="timeline-item__role">Data Scientist and Analyst</span><span class="timeline-item__org">Johnson Controls &middot; May 2022 &ndash; Feb 2024</span></div>
          <ul class="timeline-item__points">
            <li>Led data science and AI for fire-detection SaaS products.</li>
            <li>Built a RAG chatbot with Mistral 7B and Falcon 40B, integrated with inventory management and real-time log analysis.</li>
            <li>Automated document summarisation with BART, cutting summarisation time by 60% at 95% accuracy.</li>
            <li>Fine-tuned a BERT model to classify device failure reasons from inspector notes.</li>
          </ul>
        </article>
        <article class="timeline-item reveal">
          <div class="timeline-item__meta"><span class="timeline-item__role">Senior Data Analyst &amp; Scientist</span><span class="timeline-item__org">Dell Technologies &middot; Jul 2020 &ndash; May 2022</span></div>
          <ul class="timeline-item__points">
            <li>Used RNN and BERT for root-cause analysis of customer dissatisfaction in support conversations.</li>
            <li>Applied LDA topic modelling to identify frequent complaint types across social channels.</li>
            <li>Built a bi-directional LSTM/TF-IDF classifier to route community-forum posts.</li>
            <li>Built an Early Warning System for volume and staffing capacity gaps.</li>
          </ul>
        </article>
        <article class="timeline-item reveal">
          <div class="timeline-item__meta"><span class="timeline-item__role">Data Scientist and Analyst</span><span class="timeline-item__org">Tata Consultancy Services &middot; Dec 2016 &ndash; Sep 2019</span></div>
          <ul class="timeline-item__points">
            <li>Built a real-time FAQ chatbot using bag-of-words embeddings and bi-directional LSTM sentiment analysis.</li>
            <li>Built a 1-class SVM anomaly-detection model for banking fraud, plus baseline tree/ensemble models.</li>
            <li>Built an AI product automating Fault Analysis, Impact Analysis, and What-If Analysis for clients.</li>
          </ul>
        </article>
      </div>
    </div>
  </section>

  <!-- SECTION_INSERT_POINT -->
```

- [ ] **Step 2: Insert CSS**

Replace:

```css
/* STYLE_INSERT_POINT */
```

with:

```css
/* ============ Experience timeline ============ */
.timeline { display: flex; flex-direction: column; gap: 36px; margin-top: 40px; }
.timeline-item { border-left: 2px solid rgba(255,106,43,.4); padding-left: 24px; }
.timeline-item__meta { display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px; margin-bottom: 12px; }
.timeline-item__role { font-family: var(--font-display); font-size: 19px; font-weight: 700; }
.timeline-item__org { font-size: 12px; color: var(--accent); }
.timeline-item__points { display: flex; flex-direction: column; gap: 8px; }
.timeline-item__points li { font-size: 13.5px; color: #4b4b52; line-height: 1.6; padding-left: 16px; position: relative; }
.timeline-item__points li::before { content: "—"; position: absolute; left: 0; color: var(--accent); }

/* STYLE_INSERT_POINT */
```

- [ ] **Step 3: Verify**

Use `preview_start` (name: `"portfolio"`), `preview_eval`: `document.getElementById('experience').scrollIntoView()`, `preview_screenshot`. Expected: light section, 5 timeline entries in reverse-chronological order (Mavarick first, TCS last) each with role/org/dates and bullets. `preview_eval`:

```javascript
document.querySelectorAll('.timeline-item').length
```

Expected: `5`. `preview_console_logs` (`level: "error"`) empty.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "Add Experience timeline"
```

---

### Task 11: Skills chips

**Files:**
- Modify: `index.html` (replace `<!-- SECTION_INSERT_POINT -->`)
- Modify: `css/style.css` (replace `/* STYLE_INSERT_POINT */`)

- [ ] **Step 1: Insert markup**

Replace:

```html
  <!-- SECTION_INSERT_POINT -->
```

with:

```html
  <section class="section" id="skills">
    <div class="container">
      <span class="eyebrow reveal">Skills</span>
      <h2 class="section-title reveal">Core competencies</h2>
      <div class="skills-grid">
        <div class="skills-cat reveal">
          <h3>Machine Learning &amp; AI</h3>
          <div class="chip-row stagger"><span class="chip rchild">PyTorch</span><span class="chip rchild">TensorFlow</span><span class="chip rchild">NLP</span><span class="chip rchild">Embeddings</span></div>
        </div>
        <div class="skills-cat reveal">
          <h3>GenAI</h3>
          <div class="chip-row stagger"><span class="chip rchild">LLMs</span><span class="chip rchild">LangChain</span><span class="chip rchild">LangGraph</span><span class="chip rchild">RAG</span><span class="chip rchild">Agentic AI</span><span class="chip rchild">OpenAI</span><span class="chip rchild">Anthropic</span><span class="chip rchild">MCP</span><span class="chip rchild">PEFT</span><span class="chip rchild">LoRA</span></div>
        </div>
        <div class="skills-cat reveal">
          <h3>Programming &amp; Tools</h3>
          <div class="chip-row stagger"><span class="chip rchild">Python</span><span class="chip rchild">R</span><span class="chip rchild">Java</span><span class="chip rchild">Pandas</span><span class="chip rchild">NumPy</span><span class="chip rchild">Scikit-learn</span><span class="chip rchild">PySpark</span><span class="chip rchild">AWS</span><span class="chip rchild">SageMaker</span></div>
        </div>
        <div class="skills-cat reveal">
          <h3>LLM Models</h3>
          <div class="chip-row stagger"><span class="chip rchild">OpenAI</span><span class="chip rchild">Anthropic</span><span class="chip rchild">Google Gemini</span><span class="chip rchild">Hugging Face</span><span class="chip rchild">MCP</span></div>
        </div>
        <div class="skills-cat reveal">
          <h3>Databases</h3>
          <div class="chip-row stagger"><span class="chip rchild">SQL</span><span class="chip rchild">Postgres</span><span class="chip rchild">Redis</span><span class="chip rchild">NoSQL</span><span class="chip rchild">FAISS</span><span class="chip rchild">Pinecone</span><span class="chip rchild">MongoDB Atlas</span><span class="chip rchild">ChromaDB</span></div>
        </div>
        <div class="skills-cat reveal">
          <h3>MLOps &amp; Automation</h3>
          <div class="chip-row stagger"><span class="chip rchild">Git</span><span class="chip rchild">Docker</span><span class="chip rchild">CI/CD</span><span class="chip rchild">Jenkins</span><span class="chip rchild">Kubernetes</span><span class="chip rchild">FastAPI</span><span class="chip rchild">uvicorn</span></div>
        </div>
        <div class="skills-cat reveal">
          <h3>Visualization &amp; Analytics</h3>
          <div class="chip-row stagger"><span class="chip rchild">Power BI</span><span class="chip rchild">Matplotlib</span><span class="chip rchild">Seaborn</span><span class="chip rchild">Excel</span></div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION_INSERT_POINT -->
```

- [ ] **Step 2: Insert CSS**

Replace:

```css
/* STYLE_INSERT_POINT */
```

with:

```css
/* ============ Skills ============ */
.skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 36px; margin-top: 40px; }
.skills-cat h3 { font-size: 14px; margin-bottom: 14px; color: #fff; }
.chip-row { display: flex; flex-wrap: wrap; gap: 8px; }
.chip { font-size: 12px; padding: 7px 14px; border-radius: 999px; background: rgba(255,255,255,.05); border: 1px solid var(--border); color: #d4d4d4; }

/* STYLE_INSERT_POINT */
```

- [ ] **Step 3: Verify**

Use `preview_start` (name: `"portfolio"`), `preview_eval`: `document.getElementById('skills').scrollIntoView()`, wait briefly, `preview_screenshot`. Expected: 7 category groups, each a row of pill chips. `preview_eval`:

```javascript
document.querySelectorAll('#skills .chip.rchild.in').length
```

Expected: `43` (total chip count across all 7 categories: 4+10+9+5+8+7+4). `preview_console_logs` (`level: "error"`) empty.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "Add Skills chips section"
```

---

### Task 12: Education & Certifications

**Files:**
- Modify: `index.html` (replace `<!-- SECTION_INSERT_POINT -->`)
- Modify: `css/style.css` (replace `/* STYLE_INSERT_POINT */`)

- [ ] **Step 1: Insert markup**

Replace:

```html
  <!-- SECTION_INSERT_POINT -->
```

with:

```html
  <section class="section section--alt" id="education">
    <div class="container edu-grid">
      <div class="edu-col reveal">
        <span class="eyebrow">Education</span>
        <h2 class="section-title">Education</h2>
        <div class="edu-item">
          <h3>MSc Data Science &amp; Analytics</h3>
          <p>Munster Technological University (MTU), Cork &middot; 2019 &ndash; 2020</p>
        </div>
        <div class="edu-item">
          <h3>BTech Electrical Engineering</h3>
          <p>India &middot; 2012 &ndash; 2016</p>
        </div>
        <div class="edu-highlights">
          <span>🏆 2nd place, FDC Hackathon</span>
          <span>🏆 Runner-up, JCI Tech-Innovation</span>
        </div>
      </div>
      <div class="edu-col reveal">
        <span class="eyebrow">Certifications</span>
        <h2 class="section-title">Certifications</h2>
        <ul class="cert-list">
          <li>Google Cloud Generative AI</li>
          <li>Sentiment Analysis using BERT</li>
          <li>SQL Certification &mdash; HackerRank</li>
          <li>Data Analytics on AWS</li>
          <li>Visualizing Citibike Trips with Tableau</li>
          <li>Visual ML with Yellowbrick</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- SECTION_INSERT_POINT -->
```

- [ ] **Step 2: Insert CSS**

Replace:

```css
/* STYLE_INSERT_POINT */
```

with:

```css
/* ============ Education ============ */
.edu-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
.edu-item { margin-bottom: 20px; }
.edu-item h3 { font-size: 16px; margin-bottom: 4px; }
.edu-item p { font-size: 13px; color: #52525b; }
.edu-highlights { display: flex; flex-direction: column; gap: 8px; margin-top: 20px; font-size: 13px; color: #3f3f46; }
.cert-list li { font-size: 14px; padding: 10px 0; border-bottom: 1px solid rgba(13,13,13,.1); color: #27272a; }

/* STYLE_INSERT_POINT */
```

- [ ] **Step 3: Verify**

Use `preview_start` (name: `"portfolio"`), `preview_eval`: `document.getElementById('education').scrollIntoView()`, `preview_screenshot`. Expected: light section, two columns — Education (MTU + BTech + 2 highlights) and Certifications (6 items). `preview_console_logs` (`level: "error"`) empty.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "Add Education and Certifications section"
```

---

### Task 13: CTA banner and footer

**Files:**
- Modify: `index.html` (replace `<!-- SECTION_INSERT_POINT -->`)
- Modify: `css/style.css` (replace `/* STYLE_INSERT_POINT */`)

**Interfaces:**
- Consumes: `initFooterYear` from Task 2, which already targets `#footer-year` defensively — no `js/main.js` change needed here

- [ ] **Step 1: Insert markup**

Replace:

```html
  <!-- SECTION_INSERT_POINT -->
```

with:

```html
  <section class="section cta-banner" id="contact">
    <div class="container cta-banner__inner reveal">
      <h2>Let&rsquo;s build something that ships</h2>
      <p>Open to Lead AI Engineering roles, consulting, and speaking on applied GenAI in supply chain and manufacturing.</p>
      <a class="hero-cta" href="mailto:sandyeep70@gmail.com">Get in Touch →</a>
    </div>
  </section>

  <footer class="footer">
    <div class="container footer__inner">
      <span>&copy; <span id="footer-year"></span> Sandeep Sharma</span>
      <div class="footer__links">
        <a href="mailto:sandyeep70@gmail.com">Email</a>
        <a href="tel:+353894025075">+353 89 402 5075</a>
        <a href="https://www.linkedin.com/in/sandyeepsharma/" target="_blank" rel="noopener">LinkedIn</a>
        <a href="https://github.com/SandyeepSharma" target="_blank" rel="noopener">GitHub</a>
        <a href="https://medium.com/@sandyeep70" target="_blank" rel="noopener">Medium</a>
      </div>
    </div>
  </footer>

  <!-- SECTION_INSERT_POINT -->
```

- [ ] **Step 2: Insert CSS**

Replace:

```css
/* STYLE_INSERT_POINT */
```

with:

```css
/* ============ CTA + Footer ============ */
.cta-banner { text-align: center; }
.cta-banner__inner h2 { font-size: clamp(28px, 5vw, 44px); margin-bottom: 16px; }
.cta-banner__inner p { font-size: 15px; color: var(--text-muted); max-width: 480px; margin: 0 auto 28px; }
.footer { padding: 32px 0; border-top: 1px solid var(--border); background: var(--bg); }
.footer__inner { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 16px; font-size: 12px; color: var(--text-muted); }
.footer__links { display: flex; gap: 20px; flex-wrap: wrap; }
.footer__links a { color: var(--text-muted); transition: var(--transition); }
.footer__links a:hover { color: #fff; }

/* STYLE_INSERT_POINT */
```

- [ ] **Step 3: Verify**

Use `preview_start` (name: `"portfolio"`), `preview_eval`: `window.scrollTo(0, document.body.scrollHeight)`, `preview_screenshot`. Expected: CTA banner then footer with the current year and 5 links. `preview_eval`:

```javascript
document.getElementById('footer-year').textContent
```

Expected: `"2026"` (or the current year — proves `initFooterYear` from Task 2 ran). `preview_console_logs` (`level: "error"`) empty.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "Add CTA banner and footer"
```

---

### Task 14: Responsive pass

**Files:**
- Modify: `css/style.css` (replace `/* STYLE_INSERT_POINT */`)

- [ ] **Step 1: Insert responsive CSS**

Replace:

```css
/* STYLE_INSERT_POINT */
```

with:

```css
/* ============ Responsive ============ */
@media (max-width: 900px) {
  .about-grid { grid-template-columns: 1fr; text-align: center; }
  .about-photo__frame { margin: 0 auto; }
  .about-facts, .stat-row { justify-content: center; }
  .bento { grid-template-columns: 1fr; }
  .work-grid { grid-template-columns: 1fr; }
  .work-card--3 { grid-column: auto; }
  .skills-grid { grid-template-columns: 1fr; }
  .edu-grid { grid-template-columns: 1fr; gap: 40px; }
}

@media (max-width: 768px) {
  .nav-links { position: fixed; top: 70px; left: 16px; right: 16px; flex-direction: column; background: rgba(10,10,10,.96); border-radius: var(--radius-md); padding: 12px; display: none; }
  .nav-links.is-open { display: flex; }
  .nav-links a { padding: 12px 16px; text-align: center; }
  .nav-toggle { display: flex; }
  .nav-cta { display: none; }
  .hero-terminal, .hero-scrollcue { display: none; }
  .hero-orb--2, .hero-orb--3 { display: none; }
  .hero-dashboard { width: 96%; }
  #hero-canvas { display: none; }
  .section { padding: 70px 0; }
}

@media (max-width: 480px) {
  .hero-title { font-size: 42px; }
  .stat-row { gap: 28px; }
  .hero-dashboard__row .meta { display: none; }
}
```

- [ ] **Step 2: Verify mobile nav toggle works**

Use `preview_start` (name: `"portfolio"`), `preview_resize` with `preset: "mobile"`, `preview_screenshot`. Expected: hamburger icon visible, pill nav-links hidden, no horizontal scrollbar, hero terminal/scrollcue/side-orbs/canvas hidden.

Then `preview_click` on `.nav-toggle`, `preview_screenshot`. Expected: nav-links panel now visible, full-width, stacked vertically.

- [ ] **Step 3: Verify tablet and desktop still look correct**

`preview_resize` with `preset: "tablet"`, then `preset: "desktop"` — `preview_screenshot` at each. Expected: no layout breakage (overlapping text, cut-off cards) at either size. `preview_console_logs` (`level: "error"`) empty at all three sizes.

- [ ] **Step 4: Commit**

```bash
git add css/style.css
git commit -m "Add responsive breakpoints for mobile/tablet"
```

---

### Task 15: Remove legacy template assets

**Files:**
- Delete: `single.html`
- Delete: `js/aos.js`, `js/bootstrap.min.js`, `js/google-map.js`, `js/jquery-3.2.1.min.js`, `js/jquery-migrate-3.0.1.min.js`, `js/jquery.animateNumber.min.js`, `js/jquery.easing.1.3.js`, `js/jquery.magnific-popup.min.js`, `js/jquery.min.js`, `js/jquery.stellar.min.js`, `js/jquery.waypoints.min.js`, `js/owl.carousel.min.js`, `js/popper.min.js`, `js/scrollax.min.js`
- Delete: `css/ajax-loader.gif`, `css/animate.css`, `css/aos.css`, `css/bootstrap.min.css`, `css/bootstrap/`, `css/css/`, `css/flaticon.css`, `css/icomoon.css`, `css/ionicons.min.css`, `css/magnific-popup.css`, `css/open-iconic-bootstrap.min.css`, `css/owl.carousel.min.css`, `css/owl.theme.default.min.css`
- Delete: `fonts/` (entire directory)
- Delete: `scss/` (entire directory)
- Delete: `prepros-6.config`
- Keep as-is: `css/style.css`, `js/main.js`, `js/hero-graph.js`, `index.html`, `images/`, `google75a54c8922027a50.html`, `ReadMe.md`, `.gitattributes`, `resume.pdf`

- [ ] **Step 1: Confirm nothing in `index.html` still references files being deleted**

Run: `grep -n -E "single\.html|aos\.|bootstrap|jquery|owl\.|popper|scrollax|magnific|flaticon|icomoon|ionicons|open-iconic" index.html`

Expected: no output (the rewritten `index.html` from Tasks 1–13 never referenced any legacy vendor file).

- [ ] **Step 2: Delete the legacy files**

```bash
git rm single.html prepros-6.config
git rm -r fonts scss
git rm js/aos.js js/bootstrap.min.js js/google-map.js js/jquery-3.2.1.min.js js/jquery-migrate-3.0.1.min.js js/jquery.animateNumber.min.js js/jquery.easing.1.3.js js/jquery.magnific-popup.min.js js/jquery.min.js js/jquery.stellar.min.js js/jquery.waypoints.min.js js/owl.carousel.min.js js/popper.min.js js/scrollax.min.js
git rm css/ajax-loader.gif css/animate.css css/aos.css css/bootstrap.min.css css/flaticon.css css/icomoon.css css/ionicons.min.css css/magnific-popup.css css/open-iconic-bootstrap.min.css css/owl.carousel.min.css css/owl.theme.default.min.css
git rm -r css/bootstrap css/css
```

- [ ] **Step 3: Verify the site still loads correctly after deletion**

Use `preview_start` (name: `"portfolio"`), `preview_network` (`filter: "failed"`). Expected: empty (no 404s for the deleted files — confirms `index.html` truly never depended on them). `preview_console_logs` (`level: "error"`) empty. `preview_screenshot` at desktop size — page should look identical to before this task.

- [ ] **Step 4: Commit**

```bash
git commit -m "Remove legacy Bootstrap/jQuery template assets"
```

---

### Task 16: Full verification pass

**Files:** none (verification only)

- [ ] **Step 1: Full scroll-through at desktop size**

Use `preview_start` (name: `"portfolio"`), `preview_resize` (`preset: "desktop"`). Take a `preview_screenshot`, then repeatedly `preview_eval` `window.scrollBy(0, 700)` and `preview_screenshot` until reaching the footer (roughly 8–10 screenshots). Confirm every section from Task 3 through Task 13 renders with no visual breakage, no overlapping text, no missing images.

- [ ] **Step 2: Console and network check across all three breakpoints**

For each of `preview_resize` `preset: "desktop"`, `"tablet"`, `"mobile"`: reload via `preview_eval` `location.reload()`, wait, then check `preview_console_logs` (`level: "error"`) is empty and `preview_network` (`filter: "failed"`) is empty.

- [ ] **Step 3: Confirm resume content accuracy via spot-check strings**

Use `preview_eval`:

```javascript
(function(){
  var text = document.body.innerText;
  var checks = {
    mavarick: text.indexOf('Mavarick') !== -1,
    pepsico: text.indexOf('PepsiCo') !== -1,
    jci: text.indexOf('Johnson Controls') !== -1,
    dell: text.indexOf('Dell') !== -1,
    tcs: text.indexOf('Tata Consultancy Services') !== -1,
    mtu: text.indexOf('MTU') !== -1,
    forecastStat: text.indexOf('82%') !== -1,
    noOldTitle: text.indexOf('Senior Data Scientist') === -1
  };
  return checks;
})()
```

Expected: every key is `true` (the `noOldTitle` check confirms the stale "Senior Data Scientist" title from the old site is gone).

- [ ] **Step 4: Confirm nav anchors scroll to the right sections**

For each nav link, `preview_click` on `.nav-links a[href="#about"]`, then `preview_eval` `document.getElementById('about').getBoundingClientRect().top` — expected: a small number close to `0` (within ~100px, accounting for the fixed nav height). Repeat for `#work`, `#experience`, `#contact`.

- [ ] **Step 5: Confirm reduced-motion CSS is present**

Run: `grep -n "prefers-reduced-motion" css/style.css`

Expected: at least one match (the rule added in Task 1).

- [ ] **Step 6: Final commit (only if any fixes were made during this task)**

```bash
git add -A
git commit -m "Fix issues found in full verification pass"
```

If no fixes were needed, skip this step — Task 16 is verification-only.

---

## Post-Plan Manual Steps (not part of the automated build)

- **Push to GitHub:** the working clone at `C:\Users\sandy\Documents\Sandeep_Sharma_Portfolio` has no push access on this machine (cached credentials belong to a different GitHub account than `SandyeepSharma`). Once this plan is fully executed and committed locally, the repo owner needs to either push from an authenticated environment or add this machine's account as a collaborator.
- **Verify `resume.pdf` content:** it was auto-generated via Word's PDF export from the source docx — open it once after Task 1 to confirm formatting/pagination looks right; regenerate manually if not.
