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



// this makes the height of each page equal to the height of the window
// $('.page').css('height', $( window ).height());

// scrollspy section
(function($){
  //variable that will hold the href attr of the links in the menu
  var sections = [];
  //variable that stores the id of the section
  var id = false;
  //variable for the selection of the anchors in the navbar
  var $navbara = $('#navi a');
  
  $navbara.click(function(e){
    //prevent the page from refreshing
    e.preventDefault();
    //set the top offset animation and speed
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top - 180
},500);
    hash($(this).attr('href'));
  });
  
  
  
  //select all the anchors in the navbar one after another
  $navbara.each(function(){
   // and adds them in the sections variable
    sections.push($($(this).attr('href')));
    
  })
  $(window).scroll(function(e){
    // scrollTop retains the value of the scroll top with the reference at the middle of the page
    var scrollTop = $(this).scrollTop() + ($(window).height()/2);
    //cycle through the values in sections array
    for (var i in sections) {
      var section = sections[i];
      //if scrollTop variable is bigger than the top offset of a section in the sections array then 
      if (scrollTop > section.offset().top){
        var scrolled_id = section.attr('id');
      }
    }
    if (scrolled_id !== id) {
      id = scrolled_id;
      $($navbara).removeClass('current');
      $('#navi a[href="#' + id + '"]').addClass('current'); 
    }
  })
})(jQuery);

hash = function(h){
  if (history.pushState){
    history.pushState(null, null, h);
  }else{
    location.hash = h;
  }
}


$(function() {

  $(".progress").each(function() {

    var value = $(this).attr('data-value');
    var left = $(this).find('.progress-left .progress-bar');
    var right = $(this).find('.progress-right .progress-bar');

    if (value > 0) {
      if (value <= 50) {
        right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
      } else {
        right.css('transform', 'rotate(180deg)')
        left.css('transform', 'rotate(' + percentageToDegrees(value - 50) + 'deg)')
      }
    }

  })

  function percentageToDegrees(percentage) {

    return percentage / 100 * 360

  }

});

