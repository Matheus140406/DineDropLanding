const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initMotion() {
  const prog = document.getElementById('prog');
  const head = document.getElementById('topo');
  let ultimo = window.scrollY;
  let tick = false;

  const update = () => {
    tick = false;
    const y = Math.max(0, window.scrollY);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (prog) prog.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, y / h) : 0) + ')';
    if (!head) return;
    head.classList.toggle('borda', y > 10);
    const dy = y - ultimo;
    const preso = head.classList.contains('aberto') || head.contains(document.activeElement);
    if (reduce || preso || y < 120 || dy < -4) head.classList.remove('some');
    else if (dy > 6) head.classList.add('some');
    if (Math.abs(dy) > 2) ultimo = y;
  };
  window.addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}
