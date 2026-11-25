export function initComent() {
  const faixa = document.querySelector('.coments');
  if (!faixa || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const VEL = 28;
  let pos = 0;
  let ultimo = 0;
  let quadro = 0;
  let pausa = false;
  let visivel = false;
  let espera = 0;

  const para = () => { cancelAnimationFrame(quadro); quadro = 0; faixa.classList.remove('rola'); };
  const passo = (t) => {
    const dt = Math.min(64, t - ultimo) / 1000;
    ultimo = t;
    if (!pausa && visivel) {
      const max = faixa.scrollWidth - faixa.clientWidth;
      if (espera > 0) espera -= dt;
      else {
        pos = Math.min(max, pos + VEL * dt);
        faixa.scrollLeft = pos;
        if (pos >= max) { espera = 1.8; pos = 0; faixa.classList.remove('rola'); faixa.scrollTo({ left: 0, behavior: 'smooth' }); setTimeout(() => faixa.classList.add('rola'), 900); espera = 2.4; }
      }
    }
    quadro = requestAnimationFrame(passo);
  };
  const liga = () => { if (quadro) return; pos = faixa.scrollLeft; ultimo = performance.now(); faixa.classList.add('rola'); quadro = requestAnimationFrame(passo); };

  const segura = () => { pausa = true; };
  const seguraToque = () => { pausa = true; faixa.classList.remove('rola'); };
  const solta = () => { pos = faixa.scrollLeft; pausa = false; faixa.classList.add('rola'); };
  ['pointerenter', 'focusin'].forEach((e) => faixa.addEventListener(e, segura));
  ['pointerleave', 'focusout'].forEach((e) => faixa.addEventListener(e, solta));
  ['touchstart', 'wheel'].forEach((e) => faixa.addEventListener(e, () => { seguraToque(); clearTimeout(faixa._t); faixa._t = setTimeout(solta, 4000); }, { passive: true }));

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { visivel = e.isIntersecting; if (visivel && !document.hidden) liga(); else para(); }, { threshold: 0.2 }).observe(faixa);
    document.addEventListener('visibilitychange', () => { if (document.hidden) para(); else if (visivel) liga(); });
  }
}
