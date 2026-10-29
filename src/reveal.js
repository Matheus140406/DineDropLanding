const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initReveal() {
  let els = [...document.querySelectorAll('[data-r]')];
  if (reduce) return;
  els.forEach((el) => { el.style.transitionDelay = (el.dataset.d || 0) + 'ms'; });
  const show = (el) => {
    el.classList.add('is-in');
    setTimeout(() => { el.style.transitionDelay = ''; el.classList.add('done'); }, 1700);
  };
  const check = () => {
    els = els.filter((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) { show(el); return false; }
      return true;
    });
  };
  let tick = false;
  const on = () => { if (!tick) { tick = true; requestAnimationFrame(() => { tick = false; check(); }); } };
  window.addEventListener('scroll', on, { passive: true });
  window.addEventListener('resize', on);
  requestAnimationFrame(check);
  setTimeout(() => { els.forEach(show); els = []; }, 6000);
}
