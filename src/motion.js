const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initMotion() {
  const prog = document.getElementById('prog');
  const head = document.getElementById('topo');
  const pars = [...document.querySelectorAll('[data-par]')];
  let tick = false;
  const update = () => {
    tick = false;
    const y = window.scrollY;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (prog) prog.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    if (head) head.style.borderBottomColor = y > 10 ? '#E8E0D2' : 'transparent';
    if (!reduce) pars.forEach((p) => { p.style.translate = '0 ' + y * parseFloat(p.dataset.par) + 'px'; });
  };
  window.addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(update); } }, { passive: true });
  update();
  if (reduce) return;

  const mq = document.getElementById('mq');
  if (mq) mq.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }], { duration: 48000, iterations: Infinity, easing: 'linear' });
  document.querySelectorAll('img[alt^="Pierre"]').forEach((im, k) => im.animate(
    [{ transform: 'translateY(0) rotate(-1.5deg)' }, { transform: 'translateY(-12px) rotate(1.5deg)' }],
    { duration: 3800 + k * 500, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' }
  ));
}
