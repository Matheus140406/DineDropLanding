# DineDrop · Landing page

Landing page do DineDrop (cardápio digital com QR Code, pedidos, delivery próprio e Cozinha KDS), publicada em <https://www.dinedrop.com.br>.

Site estático feito com HTML, CSS e JavaScript, empacotado com [Vite](https://vite.dev). O conteúdo já vem completo no HTML, então buscadores leem tudo sem executar script.

## Começando

Requisitos: Node 20 ou mais novo (o `.nvmrc` indica a versão usada).

```bash
npm ci
npm run dev       # http://localhost:5173
npm run build     # gera dist/
npm run preview   # serve o build
npm test          # build + testes de navegador
```

## Estrutura

```
index.html                    conteúdo, metatags, Open Graph e JSON-LD
src/
  main.js                     ponto de entrada
  styles.css                  todo o visual (celular primeiro): tokens, tipografia, seções
  header.js                   cabeçalho: menu no celular e seção atual destacada
  motion.js                   barra de progresso e cabeçalho que some ao descer
  abas.js                     abas acessíveis (três telas e dores)
  plans.js                    alternância Mensal/Anual
  calculator.js               calculadora "Faça a conta"
  kds.js                      ilustração animada da Cozinha (KDS)
  reveal.js                   aparecer ao rolar (usado só na TV do KDS)
  nichos.js                   dados dos nichos: dores, soluções e textos de busca
  config.js                   flags e preço usado na calculadora
scripts/
  paginas-nichos.mjs          gera a lista de nichos e as páginas /nichos/<slug>/ + sitemap
  conferir-csp.mjs            confere o hash do script embutido na CSP
tests/smoke.mjs               testes de navegador (Playwright)
public/                       imagens (WebP + fallback), mascote, robots.txt, sitemap.xml
vercel.json, public/_headers  cabeçalhos de segurança (iguais nas duas hospedagens)
```

## Variáveis de ambiente

Definidas no `.env` ou na hospedagem. Sem elas valem os padrões abaixo (veja `.env.example`).

| Variável | Padrão | Uso |
| --- | --- | --- |
| `VITE_SITE_URL` | `https://www.dinedrop.com.br` | canonical, Open Graph, JSON-LD, `robots.txt` e `sitemap.xml` |
| `VITE_APP_URL` | `https://appdinedrop.com` | links para o app (entrar, criar conta, Termos e Privacidade) |
| `VITE_DEMO` | `VITE_APP_URL/devteam2026tech` | cardápio de exemplo do "Teste agora" (o QR é gerado no build) |
| `VITE_DEMO_MESA`, `VITE_DEMO_DELIVERY`, `VITE_DEMO_BALCAO` | vazio | QR próprio por vertente (opcional) |

## Conteúdo

- **Nichos**: cada item de `src/nichos.js` vira `/nichos/<slug>/` no build, com título, descrição, canonical, Open Graph, trilha em JSON-LD e entrada no `sitemap.xml`. Para mudar um texto ou criar um nicho, edite só esse arquivo.
- **Planos e preços**: ficam no `index.html` (cards e tabela comparativa) e devem bater com as assinaturas do app.
- **Vídeo do cardápio**: coloque o arquivo em `public/video/cardapio.mp4` (vertical, até uns 10 MB). No build, o player aparece na aba "Seu cliente" no lugar da imagem; sem o arquivo, a imagem continua.

- **Depoimentos**: edite `src/depoimentos.js`. Vazio, a seção não aparece. Cada item precisa de texto, nome, cargo, negócio, cidade e data, e pode ter foto em `public/img/depoimentos/`. Publique só relatos de clientes reais que autorizaram.

## Segurança (CSP)

A `Content-Security-Policy` libera um único script embutido (a marcação da classe `js` no `<head>`), identificado pelo hash. Se esse script mudar, rode `npm run check:csp`: ele mostra o hash novo para colocar no `vercel.json` e no `public/_headers`, e confere que os dois arquivos têm os mesmos cabeçalhos.

## Testes e CI

`npm test` gera o build e roda `tests/smoke.mjs`, que abre a página no Chromium e confere: menu, abas, planos, calculadora, perguntas, as 13 páginas de nicho (título, descrição, canonical e JSON-LD) e, em 10 larguras de tela, ausência de rolagem lateral e de sobreposição no cabeçalho.

O GitHub Actions (`.github/workflows/ci.yml`) roda `npm run check:csp` e `npm test` em todo push na `main` e em todo pull request.

## Deploy

Vercel (ou Netlify, Cloudflare Pages): comando `npm run build`, pasta de saída `dist`. O endereço antigo da Vercel redireciona para o domínio oficial; `dinedrop.com.br` redireciona para o `www`.

## Pendências

- Ligar "Sem comissão por pedido": `FLAGS.semComissao` em `src/config.js`, só depois de conferir a taxa.
- Search Console: criar o registro TXT `google-site-verification=…` no DNS e enviar o `sitemap.xml`.
