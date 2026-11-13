// Cabeçalho fixo: menu no celular (mesma ordem do computador) e destaque da seção que está na tela.
export function initHeader() {
  const head = document.getElementById('topo');
  if (!head) return;
  const btn = head.querySelector('.menu-btn');
  const nav = document.getElementById('menu');

  if (btn && nav) {
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
    window.matchMedia('(min-width: 1101px)').addEventListener('change', (e) => { if (e.matches) set(false); });
  }

  // Seção atual destacada no menu (só links da própria página, "#secao")
  const links = nav ? [...nav.querySelectorAll('a[href^="#"]')].filter((a) => a.getAttribute('href').length > 1) : [];
  const alvos = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if (!alvos.length || !('IntersectionObserver' in window)) return;
  const visiveis = new Set();
  const marca = () => {
    const atual = alvos.find((s) => visiveis.has(s));
    links.forEach((a) => { if (atual && a.getAttribute('href') === '#' + atual.id) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
  };
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => (e.isIntersecting ? visiveis.add(e.target) : visiveis.delete(e.target)));
    marca();
  }, { rootMargin: '-45% 0px -50% 0px' });
  alvos.forEach((s) => io.observe(s));
}
