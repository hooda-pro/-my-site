(function(){
  "use strict";
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- year ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- hero name: build per-letter spans ---- */
  var nameStr = "محمود أحمد سعيد";
  var lettersHost = document.querySelector('#heroName .letters');
  if (lettersHost) {
    var frag = document.createDocumentFragment();
    nameStr.split('').forEach(function(ch, i){
      var span = document.createElement('span');
      span.textContent = ch === ' ' ? ' ' : ch;
      span.style.animationDelay = (i * 0.032) + 's';
      frag.appendChild(span);
    });
    lettersHost.appendChild(frag);
  }

  /* ---- hero tagline: typing indicator -> text ---- */
  var dots = document.getElementById('typingDots');
  var taglineText = document.getElementById('taglineText');
  if (dots && taglineText) {
    if (reduceMotion) {
      dots.classList.add('hide');
      taglineText.classList.add('show');
    } else {
      setTimeout(function(){
        dots.classList.add('hide');
        taglineText.classList.add('show');
      }, 1200);
    }
  }

  /* ---- scroll reveal ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -50px 0px' });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('visible'); });
  }

  /* ---- mobile nav toggle ---- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function(){
      var open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape') {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- scrollspy: highlight active nav link ---- */
  var sections = document.querySelectorAll('main section[id], .hero[id]');
  var navA = document.querySelectorAll('.nav-link');
  if ('IntersectionObserver' in window && sections.length && navA.length) {
    var spy = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navA.forEach(function(a){
            a.classList.toggle('active', a.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-42% 0px -50% 0px' });
    sections.forEach(function(s){ spy.observe(s); });
  }

  /* ---- back to top ---- */
  var toTop = document.getElementById('toTop');
  if (toTop) {
    window.addEventListener('scroll', function(){
      toTop.classList.toggle('show', window.scrollY > 420);
    }, { passive: true });
    toTop.addEventListener('click', function(){
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }
})();
