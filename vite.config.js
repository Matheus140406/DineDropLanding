import { defineConfig } from 'vite';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import QRCode from 'qrcode';
import { secaoNichos, gerarPaginasNichos } from './scripts/paginas-nichos.mjs';
import { secaoDepoimentos, secaoComentarios } from './scripts/depoimentos.mjs';

process.env.VITE_APP_URL ||= 'https://appdinedrop.com';
process.env.VITE_SITE_URL ||= 'https://www.dinedrop.com.br';

const demos = (env) => {
  const app = (env.VITE_APP_URL || process.env.VITE_APP_URL).replace(/\/$/, '');
  return { principal: env.VITE_DEMO || `${app}/devteam2026tech`, mesa: env.VITE_DEMO_MESA || '', delivery: env.VITE_DEMO_DELIVERY || '', balcao: env.VITE_DEMO_BALCAO || '' };
};
const NOMES = { principal: 'demonstração', mesa: 'restaurante e bar', delivery: 'delivery', balcao: 'retirada no balcão' };
const esc = (t) => t.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const qrSvg = async (url, nome) => (await QRCode.toString(url, { type: 'svg', margin: 0, errorCorrectionLevel: 'M', color: { dark: '#2B211A', light: '#FFFFFF' } }))
  .replace('<svg ', `<svg role="img" aria-label="QR Code do cardápio de exemplo de ${nome}" `);

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
      const video = existsSync(resolve('public/video/cardapio.mp4'))
        ? `<video class="papel-video" controls playsinline preload="metadata" poster="/img/cardapio-app-720.webp" aria-label="Vídeo do prato aberto no cardápio do DineDrop"><source src="/video/cardapio.mp4" type="video/mp4"></video>`
        : '';
      return html.replace('<!--video:cardapio-->', video).replace('<!--nichos-->', secaoNichos()).replace('<!--depoimentos-->', secaoDepoimentos()).replace('<!--comentarios-->', secaoComentarios());
    },
  };
};

const enderecoNosArquivos = () => ({
  name: 'endereco-nos-arquivos',
  closeBundle() {
    for (const nome of ['robots.txt', 'sitemap.xml']) {
      const arq = resolve('dist', nome);
      if (existsSync(arq)) writeFileSync(arq, readFileSync(arq, 'utf8').split('__SITE_URL__').join(process.env.VITE_SITE_URL.replace(/\/$/, '')));
    }
  },
});

const paginasNichos = () => ({
  name: 'paginas-nichos',
  closeBundle() {
    gerarPaginasNichos(resolve('dist'), process.env.VITE_SITE_URL.replace(/\/$/, ''), process.env.VITE_APP_URL.replace(/\/$/, ''));
  },
});

export default defineConfig({ plugins: [cardapiosDeExemplo(), enderecoNosArquivos(), paginasNichos()], build: { target: 'es2020', assetsInlineLimit: 0 } });
