(function () {
  'use strict';

  /* Header shadow on scroll */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile nav toggle */
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('is-open'); });
    });
  }

  /* Smooth-scroll + FAQ accordion, both via delegation so they
     keep working even if content is re-rendered later. */
  document.addEventListener('click', function (e) {
    var summary = e.target.closest ? e.target.closest('summary') : null;
    if (summary) {
      var details = summary.closest('details');
      var content = details ? details.querySelector('p') : null;
      if (details && content) {
        e.preventDefault();
        if (details.open) {
          content.style.maxHeight = content.scrollHeight + 'px';
          requestAnimationFrame(function () { content.style.maxHeight = '0px'; });
          content.addEventListener('transitionend', function te(ev) {
            if (ev.propertyName !== 'max-height') return;
            content.removeEventListener('transitionend', te);
            details.open = false;
          });
        } else {
          details.open = true;
          var h = content.scrollHeight;
          content.style.maxHeight = '0px';
          requestAnimationFrame(function () { content.style.maxHeight = h + 'px'; });
        }
        return;
      }
    }

    var anchor = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (anchor) {
      var id = anchor.getAttribute('href').slice(1);
      if (!id) return;
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      var headerOffset = 84;
      var startY = window.pageYOffset;
      var endY = target.getBoundingClientRect().top + startY - headerOffset;
      var duration = 650;
      var startTime = null;
      function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
      function step(ts) {
        if (!startTime) startTime = ts;
        var progress = Math.min((ts - startTime) / duration, 1);
        window.scrollTo(0, startY + (endY - startY) * ease(progress));
        if (progress < 1) requestAnimationFrame(step);
        else if (history.pushState) history.pushState(null, '', '#' + id);
      }
      requestAnimationFrame(step);
    }
  });

  /* Pricing: monthly / annual toggle */
  var billing = document.querySelector('[data-billing-toggle]');
  if (billing) {
    var buttons = billing.querySelectorAll('button');
    var priceEls = document.querySelectorAll('[data-price]');
    function setBilling(mode) {
      billing.setAttribute('data-billing', mode);
      buttons.forEach(function (b) { b.classList.toggle('is-active', b.dataset.mode === mode); });
      priceEls.forEach(function (el) {
        el.textContent = el.dataset[mode === 'anual' ? 'anual' : 'mensal'];
      });
    }
    buttons.forEach(function (b) {
      b.addEventListener('click', function () { setBilling(b.dataset.mode); });
    });
    setBilling('mensal');
  }

  /* Commission calculator */
  var calc = document.querySelector('[data-calc]');
  if (calc) {
    var revenueInput = calc.querySelector('[data-calc-revenue]');
    var feeInput = calc.querySelector('[data-calc-fee]');
    var revenueOut = calc.querySelector('[data-calc-revenue-out]');
    var feeOut = calc.querySelector('[data-calc-fee-out]');
    var monthOut = calc.querySelector('[data-calc-month]');
    var yearOut = calc.querySelector('[data-calc-year]');
    var saveMonthOut = calc.querySelector('[data-calc-save-month]');
    var saveYearOut = calc.querySelector('[data-calc-save-year]');
    var PLAN_PRICE = 89;

    function brl(n) {
      return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
    }

    function update() {
      var revenue = Number(revenueInput.value);
      var fee = Number(feeInput.value);
      revenueOut.textContent = brl(revenue);
      feeOut.textContent = fee + '%';
      var commissionMonth = revenue * (fee / 100);
      var commissionYear = commissionMonth * 12;
      var saveMonth = Math.max(commissionMonth - PLAN_PRICE, 0);
      var saveYear = saveMonth * 12;
      monthOut.textContent = brl(commissionMonth);
      yearOut.textContent = brl(commissionYear);
      saveMonthOut.textContent = brl(saveMonth);
      saveYearOut.textContent = brl(saveYear) + ' por ano';
    }

    [revenueInput, feeInput].forEach(function (el) {
      el.addEventListener('input', update);
    });
    update();
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
