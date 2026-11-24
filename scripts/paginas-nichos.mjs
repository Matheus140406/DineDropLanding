import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { NICHOS, GRUPOS } from '../src/nichos.js';
import { GUIAS } from '../src/guias.js';

const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function secaoNichos() {
  return '<div class="nichos">' + GRUPOS.map((g, i) => `
   <article class="bloco${i ? ' bloco--cafe' : ''}">
    <p class="demo-tipo">${esc(g.titulo)}</p>
    <h3 class="h3 h3--g">${esc(g.subtitulo)}</h3>
    <p>${esc(g.texto)}</p>
    <ul class="nicho-lista">${NICHOS.filter((n) => n.grupo === g.id).map((n) => `
     <li id="nicho-${n.slug}"><a href="/nichos/${n.slug}/" title="${esc(n.titulo)}"><span class="nicho-nome">${esc(n.nome)}</span><span class="nicho-ajuda">${esc(n.ajuda)}</span></a></li>`).join('')}
    </ul>
   </article>`).join('') + '\n  </div>';
}

const JS_CLASSE = '<script>document.documentElement.classList.add("js")</script>';

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
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
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
${base.cabecalho}

<main id="conteudo">
<section class="sec nicho-topo">
 <div class="wrap">
  <nav class="trilha" aria-label="Você está em"><a href="/">Início</a><span aria-hidden="true">/</span><a href="/#nichos">Nichos</a><span aria-hidden="true">/</span><span aria-current="page">${esc(n.nome)}</span></nav>
  <h1 class="h2 nicho-h1">${esc(n.titulo)}</h1>
  <p class="sub">${esc(n.intro)}</p>
  <div class="acoes">
   <a href="${app}" class="btn btn--cafe" title="Testar grátis por 2 semanas" target="_blank" rel="noopener">Testar grátis por 2 semanas</a>
   <a href="/#teste" class="btn btn--contorno" title="Ver o cardápio de exemplo">Ver o cardápio de exemplo</a>
  </div>
 </div>
</section>

<section class="sec sec--cafe" aria-labelledby="dores-h">
 <div class="wrap">
  <div class="cab">
   <h2 class="h2" id="dores-h">O que trava ${esc(n.negocio)}, e o que o DineDrop resolve</h2>
  </div>
  <ol class="curas">${n.dores.map(([dor, cura]) => `
   <li class="cura"><div class="cura-dor"><p class="painel-rot">A dor</p><h3 class="h3">${esc(dor)}</h3></div><div class="cura-sol"><p class="painel-rot">Com o DineDrop</p><p>${esc(cura)}</p></div></li>`).join('')}
  </ol>
 </div>
</section>

<section class="sec sec--areia" aria-labelledby="plano-h">
 <div class="wrap duas">
  <div class="cab">
   <h2 class="h2" id="plano-h">Plano ${esc(n.plano)}</h2>
   <p class="sub">Teste tudo por 2 semanas, sem cartão e sem fidelidade. Depois, escolha o plano que cabe na sua operação.</p>
   <p class="links-legais"><a href="/#planos">Comparar os planos</a><a href="/#perguntas">Perguntas frequentes</a></p>
  </div>
  <div>
   <p class="rotulo rotulo--escuro">Outros nichos</p>
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
    <a href="${app}" class="btn btn--cafe" title="Testar grátis por 2 semanas" target="_blank" rel="noopener">Testar grátis por 2 semanas</a>
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

function paginaGuia(g, base, site, app) {
  const url = `${site}/guias/${g.slug}/`;
  const titulo = `${g.titulo} | DineDrop`;
  const outros = GUIAS.filter((o) => o.slug !== g.slug);
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Article', '@id': `${url}#artigo`, headline: g.titulo, description: g.descricao, inLanguage: 'pt-BR', mainEntityOfPage: url, image: `${site}/img/og-1200x630.png`, author: { '@type': 'Organization', name: 'Team Dev Tech' }, publisher: { '@type': 'Organization', name: 'DineDrop', url: `${site}/` }, isPartOf: { '@id': `${site}/#site` } },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: `${site}/` },
        { '@type': 'ListItem', position: 2, name: 'Guias', item: url },
        { '@type': 'ListItem', position: 3, name: g.curto, item: url },
      ] },
    ],
  };
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${JS_CLASSE}
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(g.descricao)}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="theme-color" content="#F57C00">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article"><meta property="og:locale" content="pt_BR"><meta property="og:site_name" content="DineDrop"><meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(titulo)}"><meta property="og:description" content="${esc(g.descricao)}">
<meta property="og:image" content="${site}/img/og-1200x630.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(titulo)}"><meta name="twitter:description" content="${esc(g.descricao)}"><meta name="twitter:image" content="${site}/img/og-1200x630.png">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
${base.fontes}
<link rel="icon" type="image/png" href="/img/dinedrop-icon.png">
<link rel="apple-touch-icon" href="/img/dinedrop-icon.png">
${base.assets}
</head>
<body>
${base.sprite}
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${base.cabecalho}

<main id="conteudo">
<section class="sec nicho-topo">
 <div class="wrap">
  <nav class="trilha" aria-label="Você está em"><a href="/">Início</a><span aria-hidden="true">/</span><span>Guias</span><span aria-hidden="true">/</span><span aria-current="page">${esc(g.curto)}</span></nav>
  <h1 class="h2 nicho-h1">${esc(g.titulo)}</h1>
  <p class="sub">${esc(g.intro)}</p>
 </div>
</section>

<article class="sec sec--sem-topo">
 <div class="wrap guia">
  ${g.secoes.map((x) => `<h2 class="h3">${esc(x.h)}</h2>${x.p.map((t) => `<p>${esc(t)}</p>`).join('')}`).join('\n  ')}
  <aside class="guia-ficha" aria-label="O que o DineDrop oferece para isso"><p class="painel-rot">Com o DineDrop</p><ul class="lista-ok">${g.ficha.map((f) => `<li><svg width="22" height="22" aria-hidden="true"><use href="#i-check"/></svg><span>${esc(f)}</span></li>`).join('')}</ul></aside>
  <div class="acoes"><a href="${app}" class="btn btn--cafe" title="Testar grátis por 2 semanas" target="_blank" rel="noopener">Testar grátis por 2 semanas</a><a href="/#planos" class="btn btn--contorno">Ver os planos</a></div>
  <p class="guia-mais"><strong>Continue lendo:</strong> ${outros.map((o) => `<a href="/guias/${o.slug}/">${esc(o.curto)}</a>`).join(' · ')}</p>
 </div>
</article>
</main>

${base.rodape}
</body>
</html>
`;
}

export function gerarPaginasNichos(dist, site, app) {
  const idx = readFileSync(resolve(dist, 'index.html'), 'utf8');
  const pega = (re, nome) => { const m = idx.match(re); if (!m) throw new Error('nichos: não achei ' + nome + ' no index.html'); return m[0]; };
  const base = {
    fontes: [...idx.matchAll(/<link rel="preconnect"[^>]*>|<link rel="stylesheet" href="https:\/\/fonts[^>]*>/g)].map((m) => m[0]).join('\n'),
    assets: [...idx.matchAll(/<script type="module" crossorigin src="\/assets\/[^"]+"><\/script>|<link rel="stylesheet" crossorigin href="\/assets\/[^"]+">/g)].map((m) => m[0]).join('\n'),
    sprite: pega(/<svg width="0" height="0"[\s\S]*?<\/svg>\n?/, 'sprite'),
    cabecalho: pega(/<header id="topo" class="topo">[\s\S]*?<\/header>/, 'cabeçalho').replace('<a href="#conteudo"', '<a href="/"').replace(/<a href="#/g, '<a href="/#'),
    rodape: pega(/<footer class="rodape">[\s\S]*?<\/footer>/, 'rodapé').replace(/<a href="#/g, '<a href="/#'),
  };
  if (!base.assets.includes('.js') || !base.assets.includes('.css')) throw new Error('nichos: CSS/JS do build não encontrados');
  for (const n of NICHOS) {
    const arq = resolve(dist, 'nichos', n.slug, 'index.html');
    mkdirSync(dirname(arq), { recursive: true });
    writeFileSync(arq, pagina(n, base, site, app));
  }
  for (const g of GUIAS) {
    const arq = resolve(dist, 'guias', g.slug, 'index.html');
    mkdirSync(dirname(arq), { recursive: true });
    writeFileSync(arq, paginaGuia(g, base, site, app));
  }
  const sm = resolve(dist, 'sitemap.xml');
  if (existsSync(sm)) {
    const urls = [...NICHOS.map((n) => `  <url><loc>${site}/nichos/${n.slug}/</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`), ...GUIAS.map((g) => `  <url><loc>${site}/guias/${g.slug}/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`)].join('\n');
    writeFileSync(sm, readFileSync(sm, 'utf8').replace('</urlset>', urls + '\n</urlset>'));
  }
}
