import { defineConfig } from 'vite';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

// Endereços (05/11/2026): o app e os cardápios em appdinedrop.com; a landing em site.appdinedrop.com.
// Os links do index.html usam %VITE_APP_URL% e %VITE_SITE_URL%; na hospedagem, basta definir as variáveis. Sem elas, valem estes padrões.
process.env.VITE_APP_URL ||= 'https://appdinedrop.com';
process.env.VITE_SITE_URL ||= 'https://site.appdinedrop.com';

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

export default defineConfig({ plugins: [enderecoNosArquivos()], build: { target: 'es2020', assetsInlineLimit: 0 } });
