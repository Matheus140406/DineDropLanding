// Nichos: a lista da página inicial (<!--nichos-->) e as páginas /nichos/<slug>/, geradas de src/nichos.js.
// As páginas reaproveitam do dist/index.html já pronto: CSS e JS com hash, ícones (sprite) e rodapé.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { NICHOS, GRUPOS } from '../src/nichos.js';

const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const seta = '<svg class="seta" width="22" height="22" aria-hidden="true"><use href="#i-seta"/></svg>';

// Seção "Nichos" da página inicial: para cada nicho, o que o DineDrop resolve + link para a página dele
export function secaoNichos() {
  return '<div class="nichos">' + GRUPOS.map((g, i) => `
   <article class="bloco${i ? ' bloco--cafe' : ''}" data-r="1"${i ? ' data-d="100"' : ''}>
    <p class="demo-tipo">${esc(g.titulo)}</p>
    <h3 class="h3 h3--g">${esc(g.subtitulo)}</h3>
    <p>${esc(g.texto)}</p>
    <ul class="nicho-lista">${NICHOS.filter((n) => n.grupo === g.id).map((n) => `
     <li id="nicho-${n.slug}"><a href="/nichos/${n.slug}/" title="${esc(n.titulo)}"><span class="nicho-nome">${esc(n.nome)}</span><span class="nicho-ajuda">${esc(n.ajuda)}</span>${seta}</a></li>`).join('')}
    </ul>
   </article>`).join('') + '\n  </div>';
}

const JS_CLASSE = '<script>document.documentElement.classList.add("js")</script>'; // igual ao index.html: o hash está na CSP

function pagina(n, base, site, app) {
  const url = `${site}/nichos/${n.slug}/`;
  const titulo = `${n.titulo} | DineDrop`;
  const outros = NICHOS.filter((o) => o.slug !== n.slug);
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': `${url}#pagina`, url, name: titulo, description: n.descricao, inLanguage: 'pt-BR', isPartOf: { '@id': `${site}/#site` }, about: { '@id': `${site}/#app` }, breadcrumb: { '@id': `${url}#trilha` }, primaryImageOfPage: `${site}/img/og-1200x630.png` },
      { '@type': 'BreadcrumbList', '@id': `${url}#trilha`, itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: `${site}/` },
        { '@type': 'ListItem', position: 2, name: 'Nichos', item: `${site}/#nichos` },
        { '@type': 'ListItem', position: 3, name: n.nome, item: url },
      ] },
    ],
  };
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${JS_CLASSE}
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(n.descricao)}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="theme-color" content="#F57C00">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="pt-BR" href="${url}">
<meta property="og:type" content="website"><meta property="og:locale" content="pt_BR"><meta property="og:site_name" content="DineDrop"><meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(titulo)}"><meta property="og:description" content="${esc(n.descricao)}">
<meta property="og:image" content="${site}/img/og-1200x630.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="DineDrop: cardápio digital e painel de pedidos">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(titulo)}"><meta name="twitter:description" content="${esc(n.descricao)}"><meta name="twitter:image" content="${site}/img/og-1200x630.png">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
${base.fontes}
<link rel="icon" type="image/png" href="/img/dinedrop-icon.png">
<link rel="apple-touch-icon" href="/img/dinedrop-icon.png">
${base.assets}
</head>
<body>
${base.sprite}
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header id="topo" class="topo rolou">
 <div class="topo-in">
  <a href="/" class="logo logo--p" title="DineDrop, página inicial"><img src="/img/dinedrop-icon.webp" alt="" width="36" height="36" decoding="async"><span>DineDrop</span></a>
  <nav id="menu" class="nav" aria-label="Principal">
   <a href="/#vantagens">Vantagens</a>
   <a href="/#nichos">Nichos</a>
   <a href="/#como">Como funciona</a>
   <a href="/#planos">Planos</a>
   <a href="/#perguntas">Perguntas</a>
  </nav>
  <a href="${app}" class="btn btn--laranja btn--p topo-cta" title="Comece com 2 semanas grátis" target="_blank" rel="noopener">2 semanas grátis</a>
  <button type="button" class="menu-btn" aria-controls="menu" aria-expanded="false" aria-label="Abrir menu"><svg width="24" height="24" aria-hidden="true"><use href="#i-menu"/></svg></button>
 </div>
 <div id="prog" class="prog"></div>
</header>

<main id="conteudo">
<section class="sec nicho-topo">
 <div class="wrap">
  <nav class="trilha" aria-label="Você está em"><a href="/">Início</a><span aria-hidden="true">/</span><a href="/#nichos">Nichos</a><span aria-hidden="true">/</span><span aria-current="page">${esc(n.nome)}</span></nav>
  <p class="eyebrow"><span>DineDrop</span>${esc(n.nome)}</p>
  <h1 class="h2 nicho-h1">${esc(n.titulo)}</h1>
  <p class="sub">${esc(n.intro)}</p>
  <div class="acoes">
   <a href="${app}" class="btn btn--cafe" title="Comece com 2 semanas grátis" target="_blank" rel="noopener">Comece com 2 semanas grátis</a>
   <a href="/#teste" class="btn btn--contorno" title="Ver o cardápio de exemplo">Ver o cardápio de exemplo</a>
  </div>
 </div>
</section>

<section class="sec sec--cafe" aria-labelledby="dores-h">
 <div class="wrap">
  <div class="cab">
   <p class="eyebrow"><span>Nº 01</span>As dores e a solução</p>
   <h2 class="h2" id="dores-h">O que trava ${esc(n.negocio)}, e o que o DineDrop resolve</h2>
  </div>
  <ol class="curas">${n.dores.map(([dor, cura], i) => `
   <li class="cura"><p class="cura-n">${String(i + 1).padStart(2, '0')}</p><div class="cura-dor"><p class="painel-rot">A dor</p><h3 class="h3">${esc(dor)}</h3></div><div class="cura-sol"><p class="painel-rot">Com o DineDrop</p><p>${esc(cura)}</p></div></li>`).join('')}
  </ol>
 </div>
</section>

<section class="sec sec--areia" aria-labelledby="plano-h">
 <div class="wrap duas">
  <div class="cab">
   <p class="eyebrow"><span>Nº 02</span>Plano indicado</p>
   <h2 class="h2" id="plano-h">Plano ${esc(n.plano)}</h2>
   <p class="sub">Teste tudo por 2 semanas, sem cartão e sem fidelidade. Depois, escolha o plano que cabe na sua operação.</p>
   <p class="links-legais"><a href="/#planos">Comparar os planos</a><a href="/#perguntas">Perguntas frequentes</a></p>
  </div>
  <div>
   <p class="rodape-tit rodape-tit--escuro">Outros nichos</p>
   <div class="chips">${outros.map((o) => `<a class="chip" href="/nichos/${o.slug}/" title="${esc(o.titulo)}">${esc(o.curto)}</a>`).join('')}</div>
  </div>
 </div>
</section>

<section class="sec">
 <div class="wrap">
  <div class="final">
   <div>
    <h2 class="h2">Comece com 2 semanas grátis</h2>
    <p class="lead">Sem cartão e sem fidelidade. Crie o cardápio, imprima os QR Codes e receba o primeiro pedido.</p>
    <a href="${app}" class="btn btn--cafe" title="Criar minha conta" target="_blank" rel="noopener">Criar minha conta</a>
   </div>
   <img class="mascote mascote--final" src="/mascote/rato-comemorando.svg" alt="Pierre, o mascote, comemorando" width="300" height="321" loading="lazy" decoding="async">
  </div>
 </div>
</section>
</main>

${base.rodape}
</body>
</html>
`;
}

// Depois do build: escreve dist/nichos/<slug>/index.html e coloca as páginas no sitemap
export function gerarPaginasNichos(dist, site, app) {
  const idx = readFileSync(resolve(dist, 'index.html'), 'utf8');
  const pega = (re, nome) => { const m = idx.match(re); if (!m) throw new Error('nichos: não achei ' + nome + ' no index.html'); return m[0]; };
  const base = {
    fontes: [...idx.matchAll(/<link rel="preconnect"[^>]*>|<link rel="stylesheet" href="https:\/\/fonts[^>]*>/g)].map((m) => m[0]).join('\n'),
    assets: [...idx.matchAll(/<script type="module" crossorigin src="\/assets\/[^"]+"><\/script>|<link rel="stylesheet" crossorigin href="\/assets\/[^"]+">/g)].map((m) => m[0]).join('\n'),
    sprite: pega(/<svg width="0" height="0"[\s\S]*?<\/svg>\n?/, 'sprite'),
    rodape: pega(/<footer class="rodape">[\s\S]*?<\/footer>/, 'rodapé').replace(/<a href="#/g, '<a href="/#'),
  };
  if (!base.assets.includes('.js') || !base.assets.includes('.css')) throw new Error('nichos: CSS/JS do build não encontrados');
  for (const n of NICHOS) {
    const arq = resolve(dist, 'nichos', n.slug, 'index.html');
    mkdirSync(dirname(arq), { recursive: true });
    writeFileSync(arq, pagina(n, base, site, app));
  }
  const sm = resolve(dist, 'sitemap.xml');
  if (existsSync(sm)) {
    const urls = NICHOS.map((n) => `  <url><loc>${site}/nichos/${n.slug}/</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`).join('\n');
    writeFileSync(sm, readFileSync(sm, 'utf8').replace('</urlset>', urls + '\n</urlset>'));
  }
}
