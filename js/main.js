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
