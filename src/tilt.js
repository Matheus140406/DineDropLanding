export function initTilt() {
  const ok = matchMedia('(hover: hover) and (pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!ok) return;
  document.querySelectorAll('[data-tilt]').forEach((el) => {
    let quadro = 0;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(() => {
        el.style.setProperty('--ry', (x * 14).toFixed(2) + 'deg');
        el.style.setProperty('--rx', (-y * 10).toFixed(2) + 'deg');
      });
    };
    const sai = () => { el.style.removeProperty('--ry'); el.style.removeProperty('--rx'); };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', sai);
  });
}
