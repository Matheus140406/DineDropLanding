import { DEPOIMENTOS } from '../src/depoimentos.js';

const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function secaoDepoimentos() {
  if (!DEPOIMENTOS.length) return '';
  const itens = DEPOIMENTOS.map((d) => {
    const quem = [d.cargo, d.negocio, d.cidade].filter(Boolean).map(esc).join(', ');
    const foto = d.foto ? `<img src="${esc(d.foto)}" alt="" width="56" height="56" loading="lazy" decoding="async">` : '';
    const data = d.data ? `<span class="depo-data">${esc(d.data)}</span>` : '';
    return `<figure class="depo"><blockquote><p>${esc(d.texto)}</p></blockquote><figcaption>${foto}<div><strong>${esc(d.nome)}</strong><span>${quem}</span>${data}</div></figcaption></figure>`;
  }).join('\n   ');
  return `<section id="depoimentos" class="sec sec--areia" aria-labelledby="depo-h">
 <div class="wrap">
  <div class="cab"><h2 class="h2" id="depo-h">Quem já usa o DineDrop</h2></div>
  <div class="depos">
   ${itens}
  </div>
 </div>
</section>`;
}
