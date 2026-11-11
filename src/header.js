// Cabeçalho fixo: a logo pequena aparece quando a logo grande da abertura sai da tela,
// e no celular os atalhos ficam num menu (mesma ordem do computador).
export function initHeader() {
  const head = document.getElementById('topo');
  if (!head) return;

  const grande = document.getElementById('logo-grande');
  if (grande && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => head.classList.toggle('rolou', !e.isIntersecting), { rootMargin: '-64px 0px 0px 0px' }).observe(grande);
  } else {
    head.classList.add('rolou');
  }

  const btn = head.querySelector('.menu-btn');
  const nav = document.getElementById('menu');
  if (!btn || !nav) return;
  const use = btn.querySelector('use');
  const set = (aberto) => {
    head.classList.toggle('aberto', aberto);
    btn.setAttribute('aria-expanded', String(aberto));
    btn.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    if (use) use.setAttribute('href', aberto ? '#i-fechar' : '#i-menu');
  };
  btn.addEventListener('click', () => set(!head.classList.contains('aberto')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && head.classList.contains('aberto')) { set(false); btn.focus(); } });
  document.addEventListener('click', (e) => { if (head.classList.contains('aberto') && !head.contains(e.target)) set(false); });
}
