import { createRequire } from 'node:module';
import { preview } from 'vite';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const PORT = 4173;
const BASE = `http://localhost:${PORT}`;
const LARGURAS = [320, 360, 390, 412, 430, 768, 1024, 1280, 1440, 1920];

let falhas = 0;
const confere = (ok, nome, detalhe = '') => {
  console.log(`${ok ? 'ok   ' : 'FALHA'} ${nome}${!ok && detalhe ? ' → ' + detalhe : ''}`);
  if (!ok) falhas++;
};

const servidor = await preview({ preview: { port: PORT, strictPort: true } });
const navegador = await chromium.launch();

try {
  const erros = [];
  const celular = await navegador.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  celular.on('pageerror', (e) => erros.push(e.message));
  celular.on('console', (m) => m.type() === 'error' && erros.push(m.text()));
  await celular.goto(BASE, { waitUntil: 'networkidle' });

  const textoPagina = await celular.evaluate(() => document.body.innerText);
  confere(!/17 dias/.test(textoPagina), 'nenhum "17 dias" na página');
  confere((await celular.$$('h1')).length === 1, 'um único h1');

  await celular.click('.menu-btn');
  confere(await celular.isVisible('#menu a[href="#planos"]'), 'menu do celular abre');
  const ordem = await celular.$$eval('#menu > a', (as) => as.map((a) => a.textContent.trim()).join(','));
  confere(ordem === 'Telas,Exemplo,Vantagens,Nichos,Como funciona,Planos,Perguntas', 'ordem dos atalhos do menu', ordem);
  await celular.keyboard.press('Escape');
  confere(!(await celular.isVisible('#menu a[href="#planos"]')), 'Esc fecha o menu');

  await celular.evaluate(() => document.getElementById('telas').scrollIntoView());
  await celular.tap('#papel-2');
  confere(await celular.isVisible('#p-cozinha'), 'aba "Sua cozinha" abre');
  await celular.focus('#papel-2');
  await celular.keyboard.press('ArrowRight');
  confere((await celular.getAttribute('#papel-3', 'aria-selected')) === 'true', 'seta do teclado troca de aba');

  await celular.evaluate(() => document.getElementById('planos').scrollIntoView());
  await celular.click('.plan-btn[data-plan="anual"]');
  await celular.waitForTimeout(500);
  confere((await celular.textContent('[data-m="89"]')) === 'R$ 69', 'plano anual mostra R$ 69');
  const riscado = await celular.$$eval('.preco-de', (els) => els.filter((e) => !e.hidden && e.textContent.includes('R$')).length);
  confere(riscado === 3, 'plano anual mostra o preço cheio riscado nos 3 planos', String(riscado));
  confere((await celular.$$('#dores .painel .btn')).length === 8, 'cada dor termina com um botão de cadastro');
  confere((await celular.$$('#depoimentos')).length === 0, 'sem depoimentos reais, a seção não aparece');
  await celular.evaluate(() => document.getElementById('papel-2').click());
  await celular.click('[data-kds-pausa]');
  confere((await celular.getAttribute('[data-kds-pausa]', 'aria-pressed')) === 'true', 'botão pausa a animação do KDS');

  await celular.fill('#fat', '');
  await celular.type('#fat', '50000');
  await celular.fill('#com', '');
  await celular.type('#com', '20');
  await celular.waitForTimeout(800);
  confere((await celular.textContent('[data-out="comissaoMes"]')) === 'R$ 10.000', 'calculadora: comissão do mês');

  const linhas = await celular.$$eval('.tabela tbody tr', (r) => r.length);
  confere(linhas === 15, 'tabela comparativa com 15 linhas', String(linhas));

  await celular.click('#perguntas summary >> nth=0');
  await celular.waitForTimeout(600);
  confere(await celular.isVisible('#perguntas details[open] p'), 'pergunta frequente abre');
  confere(erros.length === 0, 'sem erros no console', erros.join(' | '));

  const links = await celular.$$eval('#nichos .nicho-lista a', (a) => a.map((x) => x.getAttribute('href')));
  confere(links.length === 13, '13 nichos na página inicial', String(links.length));
  for (const caminho of links) {
    const pagina = await navegador.newPage({ viewport: { width: 390, height: 844 } });
    const resposta = await pagina.goto(BASE + caminho, { waitUntil: 'domcontentloaded' });
    const info = await pagina.evaluate(() => ({
      h1: document.querySelectorAll('h1').length,
      descricao: document.querySelector('meta[name=description]')?.content ?? '',
      canonico: document.querySelector('link[rel=canonical]')?.href ?? '',
      ld: [...document.querySelectorAll('script[type="application/ld+json"]')].every((s) => {
        try { JSON.parse(s.textContent); return true; } catch { return false; }
      }),
      dores: document.querySelectorAll('.cura').length,
    }));
    const ok = resposta.status() === 200 && info.h1 === 1 && info.ld && info.dores === 3
      && info.descricao.length > 0 && info.descricao.length <= 170 && info.canonico.endsWith(caminho);
    confere(ok, `página ${caminho}`, JSON.stringify(info));
    await pagina.close();
  }

  for (const largura of LARGURAS) {
    for (const caminho of ['/', '/nichos/bar/']) {
      const pagina = await navegador.newPage({ viewport: { width: largura, height: 800 }, isMobile: largura < 1000 });
      await pagina.goto(BASE + caminho, { waitUntil: 'networkidle' });
      const medida = await pagina.evaluate(() => {
        const q = (s) => document.querySelector(s);
        const logo = q('.topo .logo').getBoundingClientRect();
        const acoes = q('.topo-acoes').getBoundingClientRect();
        const menu = q('#menu');
        const menuVisivel = getComputedStyle(menu).display !== 'none';
        const m = menu.getBoundingClientRect();
        return {
          sobra: document.documentElement.scrollWidth - innerWidth,
          logoSobrepoe: logo.right > acoes.left + 0.5,
          menuSobrepoe: menuVisivel && (m.left < logo.right - 0.5 || m.right > acoes.left + 0.5),
        };
      });
      confere(
        medida.sobra === 0 && !medida.logoSobrepoe && !medida.menuSobrepoe,
        `${largura}px ${caminho}: sem rolagem lateral e cabeçalho sem sobreposição`,
        JSON.stringify(medida),
      );
      await pagina.close();
    }
  }
} finally {
  await navegador.close();
  await new Promise((resolver) => servidor.httpServer.close(resolver));
}

console.log(falhas ? `\n${falhas} falha(s)` : '\ntudo certo');
process.exit(falhas ? 1 : 0);
