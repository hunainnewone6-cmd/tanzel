/* ============================================================
   TANZEEL QURAN — main.js
   Sticky header · mobile nav · scroll reveal · counters ·
   testimonial slider · FAQ accordion · pricing toggle ·
   course preselection · booking form · scrollspy
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Header: scrolled state ---------- */
  var header = document.getElementById('site-header');

  function onScrollHeader() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 20);
  }

  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- Mobile navigation ---------- */
  var burger = document.getElementById('nav-burger');

  function setMenu(open) {
    if (!header) return;
    header.classList.toggle('open', open);
    document.body.classList.toggle('no-scroll', open);
    if (burger) burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  if (burger) {
    burger.addEventListener('click', function () {
      setMenu(!header.classList.contains('open'));
    });
  }

  var navLinks = document.getElementById('nav-links');
  if (navLinks) {
    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window && !reduceMotion) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) {
      revealIO.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll('[data-count]');

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var duration = 1400;
    var start = null;

    function formatNum(n) {
      return n.toLocaleString('en-GB');
    }

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = formatNum(Math.round(target * eased));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = formatNum(target);
      }
    }

    el.textContent = '0';
    window.requestAnimationFrame(step);
  }

  if (counters.length && 'IntersectionObserver' in window && !reduceMotion) {
    var counterIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(function (el) {
      counterIO.observe(el);
    });
  } else {
    counters.forEach(function (el) {
      if (!reduceMotion) animateCounter(el);
      else el.textContent = parseInt(el.getAttribute('data-count'), 10).toLocaleString('en-GB');
    });
  }

  /* ---------- Testimonials slider ---------- */
  var track = document.getElementById('slider-track');
  var dotsBox = document.getElementById('slider-dots');
  var prevBtn = document.getElementById('slider-prev');
  var nextBtn = document.getElementById('slider-next');

  if (track && dotsBox) {
    var slides = Array.prototype.slice.call(track.children);
    var index = 0;
    var autoTimer = null;
    var SLIDE_INTERVAL = 6000;

    function dotsRender() {
      dotsBox.innerHTML = '';
      slides.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.className = 'dot' + (i === index ? ' is-active' : '');
        dot.setAttribute('type', 'button');
        dot.setAttribute('aria-label', 'Show review ' + (i + 1) + ' of ' + slides.length);
        dot.addEventListener('click', function () {
          goTo(i);
          restartAuto();
        });
        dotsBox.appendChild(dot);
      });
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + index * 100 + '%)';
      if (dotsBox) {
        var dots = dotsBox.children;
        for (var d = 0; d < dots.length; d++) {
          dots[d].classList.toggle('is-active', d === index);
        }
      }
    }

    function startAuto() {
      if (autoTimer || reduceMotion || slides.length < 2) return;
      autoTimer = setInterval(function () {
        goTo(index + 1);
      }, SLIDE_INTERVAL);
    }

    function stopAuto() {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    }

    function restartAuto() {
      stopAuto();
      startAuto();
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(index - 1); restartAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(index + 1); restartAuto(); });

    var sliderRoot = track.closest('.slider');
    if (sliderRoot) {
      sliderRoot.addEventListener('mouseenter', stopAuto);
      sliderRoot.addEventListener('mouseleave', startAuto);
      sliderRoot.addEventListener('focusin', stopAuto);
      sliderRoot.addEventListener('focusout', startAuto);
    }

    dotsRender();
    startAuto();
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Pricing: billing toggle ---------- */
  var billingBtns = document.querySelectorAll('.billing-btn');
  var priceNums = document.querySelectorAll('.price-num');
  var pricePers = document.querySelectorAll('.price-per');

  billingBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      billingBtns.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');

      var isQuarterly = btn.getAttribute('data-billing') === 'quarterly';

      priceNums.forEach(function (num) {
        var monthly = parseInt(num.getAttribute('data-monthly'), 10) || 0;
        var value = isQuarterly ? Math.round(monthly * 3 * 0.7) : monthly;
        num.textContent = '£' + value.toLocaleString('en-GB');
      });

      pricePers.forEach(function (per) {
        per.textContent = isQuarterly ? '/ quarter' : '/ month';
      });
    });
  });

  /* ---------- Course links → preselect in booking form ---------- */
  var courseSelect = document.getElementById('f-course');
  var contactSection = document.getElementById('contact');

  document.querySelectorAll('[data-course]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var course = el.getAttribute('data-course');
      if (courseSelect && course) {
        var option = Array.prototype.find.call(courseSelect.options, function (opt) {
          return opt.value === course;
        });
        if (option) courseSelect.value = course;
      }
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    });
  });

  /* ---------- Booking form ---------- */
  var form = document.getElementById('booking-form');
  var successBox = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      form.hidden = true;
      if (successBox) successBox.hidden = false;
      successBox.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    });
  }

  /* ---------- Scrollspy ---------- */
  var spyLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));

  function currentAnchor() {
    var pos = window.scrollY + window.innerHeight * 0.35;
    var best = null;
    var bestTop = -Infinity;

    spyLinks.forEach(function (link) {
      var target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      var top = target.getBoundingClientRect().top + window.scrollY;
      if (top <= pos && top > bestTop) {
        bestTop = top;
        best = link;
      }
    });

    if (!best && spyLinks.length) best = spyLinks[0];

    spyLinks.forEach(function (link) {
      link.classList.toggle('active', link === best);
    });
  }

  if (spyLinks.length) {
    currentAnchor();
    window.addEventListener('scroll', currentAnchor, { passive: true });
  }
})();