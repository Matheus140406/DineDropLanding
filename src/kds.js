const PASSO = 2800;

export function initKds() {
  const tv = document.querySelector('[data-kds]');
  if (!tv || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const tks = [...tv.querySelectorAll('.tk')];
  let timer = null;
  let pausado = false;
  let visivel = false;

  const poe = (t, c) => { t.dataset.c = String(c); t.style.setProperty('--c', String(c)); };
  const passo = () => {
    tks.forEach((t) => {
      const c = Number(t.dataset.c);
      if (c < 2) { poe(t, c + 1); return; }

      t.classList.add('sai');
      setTimeout(() => {
        t.style.transition = 'transform 0s, opacity .5s ease';
        poe(t, 0);
        void t.offsetWidth;
        t.style.transition = '';
        requestAnimationFrame(() => t.classList.remove('sai'));
      }, 650);
    });
  };
  const liga = () => { if (!timer && !pausado) timer = setInterval(passo, PASSO); };
  const desliga = () => { clearInterval(timer); timer = null; };

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { visivel = e.isIntersecting; if (visivel && !document.hidden) liga(); else desliga(); }, { threshold: 0.25 }).observe(tv);
    document.addEventListener('visibilitychange', () => { if (document.hidden) desliga(); });
  } else liga();

  const botao = document.querySelector('[data-kds-pausa]');
  if (botao) {
    botao.addEventListener('click', () => {
      pausado = !pausado;
      botao.setAttribute('aria-pressed', String(pausado));
      botao.textContent = pausado ? 'Retomar animação' : 'Pausar animação';
      if (pausado) desliga();
      else if (visivel) liga();
    });
  }
}
