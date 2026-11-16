export function initPlans() {
  const btns = [...document.querySelectorAll('.plan-btn')];
  const prices = [...document.querySelectorAll('[data-price]')];
  const cobrancas = [...document.querySelectorAll('[data-cobr]')];
  const grupo = document.querySelector('.alterna');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const set = (plan, animar) => {
    btns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.plan === plan)));
    if (grupo) grupo.dataset.plano = plan;
    const troca = () => {
      prices.forEach((p) => { p.textContent = 'R$ ' + (plan === 'anual' ? p.dataset.a : p.dataset.m); p.classList.remove('troca'); });
      cobrancas.forEach((c) => { c.textContent = plan === 'anual' ? c.dataset.a : c.dataset.m; });
    };
    if (animar && !reduce) { prices.forEach((p) => p.classList.add('troca')); setTimeout(troca, 150); } else troca();
  };
  btns.forEach((b) => b.addEventListener('click', () => set(b.dataset.plan, true)));
  set('mensal', false);
  // comparativo: aberto no computador, fechado no celular (cada linha vira um bloco, e a tabela fica longa)
  const comparar = document.querySelector('.comparar');
  if (comparar && window.matchMedia('(max-width: 760px)').matches) comparar.open = false;
}
