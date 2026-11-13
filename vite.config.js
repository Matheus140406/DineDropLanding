import { defineConfig } from 'vite';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import QRCode from 'qrcode';
import { secaoNichos, gerarPaginasNichos } from './scripts/paginas-nichos.mjs';

// Endereços (10/11/2026): o app e os cardápios em appdinedrop.com; a landing em www.dinedrop.com.br (dinedrop.com.br redireciona para o www na Vercel).
// Os links do index.html usam %VITE_APP_URL% e %VITE_SITE_URL%; na hospedagem, basta definir as variáveis. Sem elas, valem estes padrões.
process.env.VITE_APP_URL ||= 'https://appdinedrop.com';
process.env.VITE_SITE_URL ||= 'https://www.dinedrop.com.br';

// Cardápio de exemplo da seção "Teste agora": VITE_DEMO (padrão: o restaurante de demonstração /devteam2026tech).
// Opcional: VITE_DEMO_MESA, VITE_DEMO_DELIVERY e VITE_DEMO_BALCAO põem um QR próprio em cada vertente; vazios, a vertente fica só com o texto.
const demos = (env) => {
  const app = (env.VITE_APP_URL || process.env.VITE_APP_URL).replace(/\/$/, '');
  return { principal: env.VITE_DEMO || `${app}/devteam2026tech`, mesa: env.VITE_DEMO_MESA || '', delivery: env.VITE_DEMO_DELIVERY || '', balcao: env.VITE_DEMO_BALCAO || '' };
};
const NOMES = { principal: 'demonstração', mesa: 'restaurante e bar', delivery: 'delivery', balcao: 'retirada no balcão' };
const esc = (t) => t.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const qrSvg = async (url, nome) => (await QRCode.toString(url, { type: 'svg', margin: 0, errorCorrectionLevel: 'M', color: { dark: '#2B211A', light: '#FFFFFF' } }))
  .replace('<svg ', `<svg role="img" aria-label="QR Code do cardápio de exemplo de ${nome}" `);

// Troca <!--demo:principal--> e <!--demo:mesa|delivery|balcao--> pelos QR Codes, e <!--nichos--> pela lista de nichos
const cardapiosDeExemplo = () => {
  let env = {};
  return {
    name: 'cardapios-de-exemplo',
    configResolved(config) { env = config.env; },
    async transformIndexHtml(html) {
      for (const [chave, url] of Object.entries(demos(env))) {
        let bloco = '';
        if (url && chave === 'principal') {
          const curto = esc(url.replace(/^https?:\/\//, ''));
          bloco = `<div class="exp-qr"><div class="qr qr--g">${await qrSvg(url, NOMES[chave])}</div><p class="exp-url">${curto}</p><a class="btn btn--cafe btn--bloco" href="${esc(url)}" target="_blank" rel="noopener" title="Abrir o cardápio de exemplo">Abrir o cardápio de exemplo</a></div>`;
        } else if (url) {
          bloco = `<div class="demo-qr"><div class="qr">${await qrSvg(url, NOMES[chave])}</div><a class="btn btn--contorno btn--p" href="${esc(url)}" target="_blank" rel="noopener" title="Abrir o cardápio de exemplo de ${NOMES[chave]}">Abrir o exemplo</a></div>`;
        }
        html = html.replace(`<!--demo:${chave}-->`, bloco);
      }
      return html.replace('<!--nichos-->', secaoNichos());
    },
  };
};

// robots.txt e sitemap.xml (em public/) levam __SITE_URL__: troca pelo endereço da landing depois do build
const enderecoNosArquivos = () => ({
  name: 'endereco-nos-arquivos',
  closeBundle() {
    for (const nome of ['robots.txt', 'sitemap.xml']) {
      const arq = resolve('dist', nome);
      if (existsSync(arq)) writeFileSync(arq, readFileSync(arq, 'utf8').split('__SITE_URL__').join(process.env.VITE_SITE_URL.replace(/\/$/, '')));
    }
  },
});

// Páginas /nichos/<slug>/ (dores e soluções de cada nicho) e entradas no sitemap, depois do build
const paginasNichos = () => ({
  name: 'paginas-nichos',
  closeBundle() {
    gerarPaginasNichos(resolve('dist'), process.env.VITE_SITE_URL.replace(/\/$/, ''), process.env.VITE_APP_URL.replace(/\/$/, ''));
  },
});

export default defineConfig({ plugins: [cardapiosDeExemplo(), enderecoNosArquivos(), paginasNichos()], build: { target: 'es2020', assetsInlineLimit: 0 } });
