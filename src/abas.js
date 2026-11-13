// Abas acessíveis (seção "As dores"): setas, Home e End trocam de aba. Sem script, todos os painéis aparecem.
export function initAbas() {
  document.querySelectorAll('[data-abas]').forEach((box) => {
    const abas = [...box.querySelectorAll('[role="tab"]')];
    const paineis = abas.map((a) => document.getElementById(a.getAttribute('aria-controls')));
    const mostra = (i, foco) => {
      abas.forEach((a, k) => {
        const sel = k === i;
        a.setAttribute('aria-selected', String(sel));
        a.tabIndex = sel ? 0 : -1;
        paineis[k].hidden = !sel;
        paineis[k].classList.toggle('entra', sel);
      });
      if (foco) abas[i].focus();
      // no celular a lista rola de lado: deixa a aba escolhida à vista, sem mexer na rolagem da página
      const lista = abas[i].parentElement;
      if (lista.scrollWidth > lista.clientWidth) lista.scrollTo({ left: abas[i].offsetLeft - lista.offsetLeft - 20, behavior: 'smooth' });
    };
    abas.forEach((a, i) => {
      a.addEventListener('click', () => mostra(i, false));
      a.addEventListener('keydown', (e) => {
        const n = abas.length;
        const alvo = { ArrowRight: (i + 1) % n, ArrowDown: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, ArrowUp: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
        if (alvo !== undefined) { e.preventDefault(); mostra(alvo, true); }
      });
    });
    paineis.forEach((p) => p.setAttribute('tabindex', '0'));
    mostra(0, false);
  });
}
