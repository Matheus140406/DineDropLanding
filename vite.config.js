import { defineConfig } from 'vite';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import QRCode from 'qrcode';
import { secaoNichos, gerarPaginasNichos } from './scripts/paginas-nichos.mjs';

// Endereços (10/11/2026): o app e os cardápios em appdinedrop.com; a landing em www.dinedrop.com.br (dinedrop.com.br redireciona para o www na Vercel).
// Os links do index.html usam %VITE_APP_URL% e %VITE_SITE_URL%; na hospedagem, basta definir as variáveis. Sem elas, valem estes padrões.
process.env.VITE_APP_URL ||= 'https://appdinedrop.com';
process.env.VITE_SITE_URL ||= 'https://www.dinedrop.com.br';

// Cardápios de exemplo da seção "Teste agora" (um por vertente): VITE_DEMO_MESA, VITE_DEMO_DELIVERY e VITE_DEMO_BALCAO (do .env ou da hospedagem).
// Vazio = mostra o espaço reservado, sem QR. O de mesa usa o cardápio de teste que já existia (/mexico); delivery e balcão esperam os cardápios de exemplo serem criados no app.
const demos = (env) => {
  const app = (env.VITE_APP_URL || process.env.VITE_APP_URL).replace(/\/$/, '');
  return { mesa: env.VITE_DEMO_MESA ?? `${app}/mexico`, delivery: env.VITE_DEMO_DELIVERY ?? '', balcao: env.VITE_DEMO_BALCAO ?? '' };
};
const NOMES = { mesa: 'restaurante e bar', delivery: 'delivery', balcao: 'retirada no balcão' };
const esc = (t) => t.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// Troca <!--demo:mesa--> (e os outros) pelo QR em SVG + botão, ou pelo espaço reservado
const cardapiosDeExemplo = () => {
  let env = {};
  return {
  name: 'cardapios-de-exemplo',
  configResolved(config) { env = config.env; },
  async transformIndexHtml(html) {
    for (const [chave, url] of Object.entries(demos(env))) {
      let bloco;
      if (url) {
        const svg = (await QRCode.toString(url, { type: 'svg', margin: 0, errorCorrectionLevel: 'M', color: { dark: '#2B211A', light: '#FFFFFF' } }))
          .replace('<svg ', `<svg role="img" aria-label="QR Code do cardápio de exemplo de ${NOMES[chave]}" `);
        bloco = `<div class="demo-qr"><div class="qr">${svg}</div><a class="btn btn--contorno btn--p" href="${esc(url)}" target="_blank" rel="noopener" title="Abrir o cardápio de exemplo de ${NOMES[chave]}">Abrir o exemplo</a></div>`;
      } else {
        bloco = `<p class="demo-vazio" data-demo-pendente="${chave}">O cardápio de exemplo deste nicho está sendo preparado. Enquanto isso, <a href="#conta">crie o seu e teste por 2 semanas</a>.</p>`;
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
