// Palavra que gira na abertura ("Feito para pizzarias / bares / ..."). Sem script ou com movimento reduzido, fica a primeira palavra.
const PALAVRAS = ['pizzarias', 'hamburguerias', 'bares', 'restaurantes', 'açaiterias', 'cafeterias', 'marmitarias', 'lanchonetes'];

export function initGira() {
  const el = document.getElementById('gira');
  if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let i = 0;
  setInterval(() => {
    if (document.hidden) return;
    el.classList.add('sai');
    setTimeout(() => {
      i = (i + 1) % PALAVRAS.length;
      el.textContent = PALAVRAS[i];
      el.classList.remove('sai');
      el.classList.add('entra');
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove('entra')));
    }, 300);
  }, 2400);
}
