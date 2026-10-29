export function initPlans() {
  const btns = [...document.querySelectorAll('.plan-btn')];
  const prices = [...document.querySelectorAll('[data-price]')];
  const set = (plan) => {
    btns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.plan === plan)));
    prices.forEach((p) => { p.textContent = 'R$ ' + (plan === 'anual' ? p.dataset.a : p.dataset.m); });
  };
  btns.forEach((b) => b.addEventListener('click', () => set(b.dataset.plan)));
  set('mensal');
}
