import { DEPOIMENTOS } from '../src/depoimentos.js';
import { COMENTARIOS } from '../src/comentarios.js';

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

// Comentários de donos antes do lançamento: faixa que rola de lado, sem script e sem estrelas
export function secaoComentarios() {
  if (!COMENTARIOS.length) return '';
  const cards = COMENTARIOS.map(([texto, nome, cargo], i) => `<figure class="coment" style="--i:${i % 3}"><blockquote><p>${esc(texto)}</p></blockquote><figcaption><span class="coment-av" aria-hidden="true">${esc(nome[0])}</span><div><strong>${esc(nome)}</strong><span>${esc(cargo)}</span></div></figcaption></figure>`).join('\n   ');
  return `<section id="comentarios" class="sec sec--cafe" aria-labelledby="coment-h">
 <div class="wrap">
  <div class="cab">
   <h2 class="h2" id="coment-h">O que donos de restaurante <em class="dest">comentam</em></h2>
   <p class="sub">Comentários de donos e gerentes que conheceram o DineDrop no lançamento. São primeiras impressões e dúvidas reais, não avaliações de quem já usa o sistema.</p>
  </div>
 </div>
 <div class="coments" role="region" aria-label="Comentários, role para o lado" tabindex="0">
   ${cards}
 </div>
</section>`;
}
