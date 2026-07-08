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

  document.addEventListener('DOMContentLoaded', function () {
    initFns.forEach(function (fn) { fn(); });
  });
})();
