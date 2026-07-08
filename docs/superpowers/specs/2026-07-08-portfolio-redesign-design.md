# Portfolio Site Redesign — Design Spec

## Overview

Full rebuild of `SandyeepSharma/Sandeep_Sharma`, a personal portfolio site currently live at `https://sandyeepsharma.github.io/Sandeep_Sharma/`. The current site runs on a 2019-era free Bootstrap/jQuery template (Owl Carousel, Magnific Popup, etc.), and its content is stale — it lists Johnson Controls as the current role and "Senior Data Scientist" as the title, with no mention of Mavarick, PepsiCo, or the candidate's recent GenAI/RAG/agentic-AI work.

This spec covers a ground-up rebuild: new visual design, new content (sourced from the current resume), same zero-build static-site deployment model (GitHub Pages serving `index.html` directly from `main`).

## Goals

- Replace the dated template with a modern, "glossy," creative-portfolio-grade design that visually reads as *built by* an AI engineer, not just describing one
- Update all content to match the current resume (role, employer, experience, skills, education, certifications)
- Add rich scroll-driven and ambient motion (reveal animations, floating/glowing imagery, a live WebGL element, animated counters) so the page feels alive
- Keep the zero-build deploy model — no bundler, no `node_modules`, no framework. Plain HTML/CSS/JS is the base, freely augmented with CDN-loaded libraries (e.g. Three.js) where they materially improve the result — still just static files served as-is on GitHub Pages

## Non-goals

- No CMS, no build tooling (Vite/webpack/etc.), no JS framework (React/Vue/etc.), no `npm install` step
- No real/live AI feature (no chat widget, no backend, no API keys) — explicitly decided against; the "AI engineer" signature is conveyed visually (see **Signature element** below), not functionally
- No blog (the template's unused `single.html`/blog section is not being revived)
- Not attempting to fix the GitHub push-access problem in this spec — see **Deployment** below

## Visual Design

### References
- Primary color/mood reference: a dark, bold "creative agency" portfolio (black background, orange accent, oversized display type, numbered feature cards, arc-shaped image gallery)
- Layout/motion reference: [alethia.earth](https://www.alethia.earth/) — cinematic floating hero imagery (a main image with smaller fragments floating around it at different depths/scales), alternating full-bleed dark/light sections, small monospace uppercase pill labels as section eyebrows, large rounded-corner photo cards for case studies with bottom-left text overlay on a gradient scrim, a circular "scroll to discover" cue, and pinned/crossfading headline transitions between sections
- Atmosphere/product reference: [cosmoq.framer.website](https://cosmoq.framer.website/) — aurora-gradient background glow with film grain, a centered pill-shaped nav, glossy glass-sphere floating elements (gradient + specular highlight, replacing flatter floating shapes), and a floating glass "product/dashboard preview" card that peeks into the hero from below a fold

The final direction combines all three: **Alethia's + Cosmoq's layout and motion language (aurora glow, floating glass elements, dashboard-preview card), rendered in the black + orange palette**, with a live WebGL node-graph (Three.js, via CDN) as an additional hero element.

### Signature element: the floating "dashboard preview" card
The single strongest way to make the site feel *built by* the person it describes: a floating glass panel in the hero, styled like a real product UI, previewing actual ranked output from the Decarbonisation Engine (e.g. "#1 Switch supplier — frame rails · -8.4 tCO2e/yr · 92%"). It's static/mocked data, not a live API call (per the visual-only decision above) — but it reads as a real screenshot of a real system, which does more to establish credibility than an icon or a stock illustration would.

### Palette
- Background: `#0d0d0d`/`#050505` (near-black), with select sections stepping to `#111111`/white for rhythm (alternating dark/light, not one flat black page)
- Text: white (`#ffffff`) primary, `#9a9a9a` muted secondary
- Accent: orange `#ff6a2b` (buttons, pill labels, headline highlight words, active states, aurora glow, orb gradients)
- Hero-only accent glints: small amounts of teal (`#5eead4`) and violet (`#a78bfa`) on secondary floating orbs/graph nodes for depth — orange stays dominant everywhere else

### Typography
- Display headline font: a bold geometric sans (e.g. Space Grotesk) loaded via Google Fonts `<link>` — no build step required
- Body font: system font stack (`-apple-system, Segoe UI, Roboto, sans-serif`) for performance
- Section eyebrows: small uppercase monospace pill labels, orange background/text on dark, tracked letter-spacing — recurring motif before every section headline

### Layout pattern
Sections alternate dark/light backgrounds to create visual rhythm as the user scrolls, rather than one continuous black page.

## Content & Sections

Content is sourced from the current resume (`Sandeep_Sharma_Updated.docx`). Final section list:

1. **Sticky nav** — wordmark left, centered pill-shaped nav-link group (Cosmoq pattern: About, Work, Experience, Contact), resume download button right, scroll progress bar
2. **Hero**
   - Aurora-gradient glow background (orange-dominant radial blooms, animated slow breathing/drift) with subtle film-grain texture over near-black
   - Live WebGL node-graph (Three.js via CDN): a rotating, semi-transparent point cloud with connecting edges, a subset of nodes pulsing orange, all reacting subtly to cursor position — representing a knowledge/RAG graph
   - Eyebrow pill: availability/title ("Available for Lead AI Engineering roles")
   - Oversized headline: "Sandeep Sharma"
   - Subheadline: adapted from resume professional summary
   - 2–3 glossy gradient "orb" elements (radial gradient + specular highlight, Cosmoq-style glass spheres) floating at different depths/scales, replacing flat shapes
   - A floating monospace "terminal" card that continuously types and cycles through a few real-feeling log lines from the pipeline (e.g. `ranked_lever: switch_supplier`, `Δco2e: -8.4 tCO2e/yr`)
   - The floating "dashboard preview" signature card (see above), peeking up from the bottom of the hero
   - Circular "scroll to discover" cue
   - Stat counters (years of experience, docs in RAG knowledge base, constraint rules built) — animate on scroll into the About section below, not crammed into the hero itself
3. **About** — bio paragraph from resume summary; quick facts (location, current role); this is where the real profile photo (from repo `images/`) appears, tilted and floating with slow drift + mouse-parallax; animated stat counters (8+ years, 135 docs, 133 rules) live here
4. **Trusted companies strip** — Mavarick, PepsiCo, Johnson Controls, Dell, TCS (wordmark row — honest substitute for the old fake-star testimonials)
5. **What I Do** — bento-grid feature cards (Cosmoq pattern: each card has a unique glow/gradient illustration behind numbered title + description, rather than a plain list):
   - 01 GenAI & RAG Pipelines
   - 02 MLOps & Production Deployment
   - 03 Constraint Validation & Compliance
6. **Featured Work** — large rounded-corner cards, 2-up grid, full-bleed gradient imagery, bold white headline overlaid bottom-left with gradient scrim (Alethia case-study pattern):
   - Decarbonisation Engine (Mavarick) — 4-stage AI pipeline, GPT-4o, RAG over 135 industry docs, 133-rule constraint engine
   - Demand Forecasting (PepsiCo) — forecast accuracy improved 55% → 82% across 15+ markets
   - RAG Chatbot for Fire Safety Ops (Johnson Controls) — Mistral 7B/Falcon 40B, LangChain, PEFT/LoRA fine-tuning
   - *(Old Dropbox-hosted personal project links — Computer Vision, NLP, Regression, Classification, Clustering — are dropped; they're template-era, unrelated to current positioning, and the links' validity wasn't verified.)*
7. **Tech stack** — arc/orbit visual of core tools: Python, LangChain, GPT-4o, MongoDB, AWS, Docker, FastAPI, PyTorch
8. **Experience** — full timeline from resume:
   - Mavarick — Lead AI Engineer (Mar 2026–Present)
   - PepsiCo PGCS — SC Data Scientist (Jul 2024–Present)
   - Johnson Controls — Data Scientist and Analyst (May 2022–Feb 2024)
   - Dell Technologies — Senior Data Analyst & Scientist (Jul 2020–May 2022)
   - Tata Consultancy Services — Data Scientist and Analyst (Dec 2016–Sep 2019)
   - Each entry: role, company, dates, 3–4 resume bullet highlights
9. **Skills** — categorized chips matching resume's Core Competencies: Machine Learning & AI, GenAI, Programming & Tools, LLM Models, Databases, MLOps & Automation, Visualization & Analytics
10. **Education & Certifications**
    - MSc Data Science & Analytics — MTU Cork (2019–2020)
    - BTech Electrical Engineering — India (2012–2016)
    - Certifications: Google Cloud Generative AI, Sentiment Analysis using BERT, SQL Certification (HackerRank), Data Analytics on AWS, Visualizing Citibike Trips with Tableau, Visual ML with Yellowbrick
    - Highlights: 2nd place FDC Hackathon, Runner-up JCI Tech-Innovation
11. **CTA banner** — "Let's Build Something That Ships" + contact button, floating imagery echo from hero
12. **Footer** — email (sandyeep70@gmail.com), phone, LinkedIn/GitHub/Medium links, copyright

## Motion & Interaction

- Hero WebGL node-graph: continuous slow auto-rotation + camera drift, pulsing glow on a subset of nodes, cursor-reactive tilt (Three.js)
- Aurora background: slow breathing/drift animation (CSS keyframes on a blurred gradient layer)
- Floating orbs, terminal card, and dashboard-preview card: independent slow CSS float loops (different durations/offsets so they don't move in sync)
- Terminal card: JS typewriter effect, looping through a few real pipeline log snippets
- Scroll-reveal: sections fade + slide up into view via `IntersectionObserver`
- Staggered entrance for skill chips and tag rows
- Animated count-up for stat numbers in the About section, triggered once on first scroll into view
- Floating parallax images elsewhere on the page (About-section profile photo): continuous slow float (CSS `@keyframes`) + subtle offset on mouse move (vanilla JS, desktop only — disabled on touch)
- Sticky nav with a scroll-progress bar (fills as the page scrolls)
- Section eyebrow pills and headline text get a light crossfade/parallax as they scroll past, echoing Alethia's stacked-text transition — applied only at the hero → about boundary to keep it tasteful rather than gimmicky throughout
- All animations respect `prefers-reduced-motion: reduce` (disable floats/parallax/3D auto-rotation, keep simple opacity fades only; the WebGL canvas itself still renders a static frame rather than fully removing it)

## Technical Approach

- HTML/CSS/vanilla JS as the base — no bundler, no `node_modules`, no build step. Matches the current zero-build GitHub Pages deploy.
- CDN-loaded libraries used where they materially improve the result:
  - **Three.js** (r128, via cdnjs) for the hero node-graph — the one piece that genuinely needs WebGL rather than CSS
  - No other libraries are anticipated (GSAP was prototyped but plain `IntersectionObserver` + CSS keyframes proved sufficient in the mockups and keeps the dependency surface smaller)
- File structure (replacing, not patching, the current template):
  - `index.html` — single-page site, all sections
  - `css/style.css` — new stylesheet (old template CSS files removed)
  - `js/main.js` — scroll reveal, parallax, counters, nav behavior (vanilla JS, `IntersectionObserver`)
  - `js/hero-graph.js` — Three.js node-graph scene, isolated from the rest of the interaction code
  - `images/` — reused: existing profile/about photos. No new binary assets required; orbs, aurora, terminal and dashboard-preview cards are pure CSS/HTML, not images.
  - Google Fonts loaded via `<link>` in `<head>` (Space Grotesk or equivalent)
- Remove unused legacy template assets (`fonts/`, old `css/`, `js/` vendor libraries — Owl Carousel, Magnific Popup, AOS, jQuery, Bootstrap SCSS source, etc.) once the new page no longer depends on them
- Responsive: mobile-first breakpoints; the Three.js canvas, orbs, and dashboard-preview card simplify, shrink, or stack on small screens; the WebGL scene is skipped entirely below a width/capability threshold in favor of the static aurora background, to keep mobile performance solid
- `single.html` (unused legacy blog template) is deleted — the site is single-page

## Deployment

The clone used for this work has no push access (this machine's cached Git credentials belong to a different GitHub account than `SandyeepSharma`). Work will be done on a branch in the local clone; final delivery is a reviewable diff/branch that the repo owner pushes themselves (or grants push access on this machine to complete it directly) — to be resolved at implementation hand-off, not a blocker for design or build work.

## Out of Scope / Explicitly Dropped From the Old Site

- Pricing-card section (from the visual reference) — doesn't map to an engineer's portfolio, dropped
- Star-rating testimonials — replaced with the honest "companies I've worked with" strip
- Dropbox-hosted personal project gallery — replaced with the three professional Featured Work case studies
- Blog section / `single.html` — unused, removed
- Google Search Console verification file (`google75a54c8922027a50.html`) — retained as-is if present; not part of the redesign
