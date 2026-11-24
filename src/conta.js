export function initConta() {
  const els = [...document.querySelectorAll('[data-conta]')];
  if (!els.length || matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((itens) => {
    itens.forEach((it) => {
      if (!it.isIntersecting) return;
      io.unobserve(it.target);
      const alvo = Number(it.target.dataset.conta);
      const ini = performance.now();
      const passo = (t) => {
        const k = Math.min(1, (t - ini) / 900);
        it.target.textContent = String(Math.round(alvo * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(passo);
      };
      it.target.textContent = '0';
      requestAnimationFrame(passo);
    });
  }, { threshold: 0.6 });
  els.forEach((el) => io.observe(el));
}
