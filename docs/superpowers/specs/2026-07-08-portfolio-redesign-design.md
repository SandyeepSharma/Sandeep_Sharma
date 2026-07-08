# Portfolio Site Redesign — Design Spec

## Overview

Full rebuild of `SandyeepSharma/Sandeep_Sharma`, a personal portfolio site currently live at `https://sandyeepsharma.github.io/Sandeep_Sharma/`. The current site runs on a 2019-era free Bootstrap/jQuery template (Owl Carousel, Magnific Popup, etc.), and its content is stale — it lists Johnson Controls as the current role and "Senior Data Scientist" as the title, with no mention of Mavarick, PepsiCo, or the candidate's recent GenAI/RAG/agentic-AI work.

This spec covers a ground-up rebuild: new visual design, new content (sourced from the current resume), same zero-build static-site deployment model (GitHub Pages serving `index.html` directly from `main`).

## Goals

- Replace the dated template with a modern, "glossy," creative-portfolio-grade design
- Update all content to match the current resume (role, employer, experience, skills, education, certifications)
- Add scroll-driven motion (reveal animations, floating parallax imagery, animated counters) so the page feels alive while scrolling
- Keep the zero-build deploy model — plain HTML/CSS/JS, no bundler, no framework

## Non-goals

- No CMS, no build tooling (Vite/webpack/etc.), no JS framework (React/Vue/etc.)
- No blog (the template's unused `single.html`/blog section is not being revived)
- Not attempting to fix the GitHub push-access problem in this spec — see **Deployment** below

## Visual Design

### References
- Primary color/mood reference: a dark, bold "creative agency" portfolio (black background, orange accent, oversized display type, numbered feature cards, arc-shaped image gallery)
- Layout/motion reference: [alethia.earth](https://www.alethia.earth/) — cinematic floating hero imagery (a main image with smaller fragments floating around it at different depths/scales), alternating full-bleed dark/light sections, small monospace uppercase pill labels as section eyebrows, large rounded-corner photo cards for case studies with bottom-left text overlay on a gradient scrim, a circular "scroll to discover" cue, and pinned/crossfading headline transitions between sections

The final direction combines both: **Alethia's layout and motion language, rendered in the black + orange palette.**

### Palette
- Background: `#0d0d0d` (near-black), with select sections stepping to `#111111`/white for rhythm (alternating dark/light, not one flat black page)
- Text: white (`#ffffff`) primary, `#9a9a9a` muted secondary
- Accent: orange `#ff6a2b` (buttons, pill labels, headline highlight words, active states)

### Typography
- Display headline font: a bold geometric sans (e.g. Space Grotesk) loaded via Google Fonts `<link>` — no build step required
- Body font: system font stack (`-apple-system, Segoe UI, Roboto, sans-serif`) for performance
- Section eyebrows: small uppercase monospace pill labels, orange background/text on dark, tracked letter-spacing — recurring motif before every section headline

### Layout pattern
Sections alternate dark/light backgrounds to create visual rhythm as the user scrolls, rather than one continuous black page.

## Content & Sections

Content is sourced from the current resume (`Sandeep_Sharma_Updated.docx`). Final section list:

1. **Sticky nav** — logo/wordmark, section links (About, Work, Experience, Contact), resume download button, scroll progress bar
2. **Hero**
   - Eyebrow pill: location/title ("Lead AI Engineer · Cork, Ireland")
   - Oversized headline: "Sandeep Sharma"
   - Subheadline: adapted from resume professional summary
   - Stat counters (animate on load/scroll): years of experience (8+), docs in RAG knowledge base (135), constraint rules built (133)
   - Floating imagery: existing profile photo (from repo `images/`) tilted and floating with slow drift + mouse-parallax, plus 2–3 abstract gradient "tiles" floating at different depths (stand-ins for Alethia's floating rock fragments — there's no real photography for an engineering portfolio), plus one small floating "data readout" card (monospace, referencing real project metrics, echoing Alethia's floating data-tooltip-on-hero-image detail)
   - Circular "scroll to discover" cue
3. **About** — bio paragraph from resume summary; quick facts (location, current role)
4. **Trusted companies strip** — Mavarick, PepsiCo, Johnson Controls, Dell, TCS (wordmark row — honest substitute for the old fake-star testimonials)
5. **What I Do** — numbered cards (Alethia/agency-reference numbered-feature pattern):
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

- Scroll-reveal: sections fade + slide up into view via `IntersectionObserver` (no scroll-jank libraries)
- Staggered entrance for skill chips and tag rows
- Animated count-up for hero stat numbers, triggered once on first scroll into view
- Floating parallax images: continuous slow float (CSS `@keyframes`) + subtle offset on mouse move (vanilla JS, desktop only — disabled on touch)
- Sticky nav with a scroll-progress bar (fills as the page scrolls)
- Section eyebrow pills and headline text get a light crossfade/parallax as they scroll past, echoing Alethia's stacked-text transition — applied only at the hero → about boundary to keep it tasteful rather than gimmicky throughout
- All animations respect `prefers-reduced-motion: reduce` (disable floats/parallax, keep simple opacity fades only)

## Technical Approach

- Plain HTML/CSS/JS — no bundler, no framework, no `node_modules`. Matches the current zero-build GitHub Pages deploy.
- File structure (replacing, not patching, the current template):
  - `index.html` — single-page site, all sections
  - `css/style.css` — new stylesheet (old template CSS files removed)
  - `js/main.js` — scroll reveal, parallax, counters, nav behavior (vanilla JS, `IntersectionObserver`)
  - `images/` — reused: existing profile/about photos. No new binary assets required; gradient "tiles" and data-readout cards are pure CSS/HTML, not images.
  - Google Fonts loaded via `<link>` in `<head>` (Space Grotesk or equivalent)
- Remove unused legacy template assets (`fonts/`, old `css/`, `js/` vendor libraries — Owl Carousel, Magnific Popup, AOS, jQuery, Bootstrap SCSS source, etc.) once the new page no longer depends on them
- Responsive: mobile-first breakpoints; floating parallax/orbit visuals simplify or stack on small screens
- `single.html` (unused legacy blog template) is deleted — the site is single-page

## Deployment

The clone used for this work has no push access (this machine's cached Git credentials belong to a different GitHub account than `SandyeepSharma`). Work will be done on a branch in the local clone; final delivery is a reviewable diff/branch that the repo owner pushes themselves (or grants push access on this machine to complete it directly) — to be resolved at implementation hand-off, not a blocker for design or build work.

## Out of Scope / Explicitly Dropped From the Old Site

- Pricing-card section (from the visual reference) — doesn't map to an engineer's portfolio, dropped
- Star-rating testimonials — replaced with the honest "companies I've worked with" strip
- Dropbox-hosted personal project gallery — replaced with the three professional Featured Work case studies
- Blog section / `single.html` — unused, removed
- Google Search Console verification file (`google75a54c8922027a50.html`) — retained as-is if present; not part of the redesign
