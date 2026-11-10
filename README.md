# DineDrop · Landing page

Site estático em HTML, CSS e JavaScript, feito com Vite. O `index.html` já traz todo o conteúdo, então o Google lê a página sem executar script.

## Rodar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera dist/
npm run preview    # testa o build
npm run check:csp  # confere a CSP e os cabeçalhos do build
```

## Estrutura

```
index.html                 conteúdo, metatags, Open Graph e JSON-LD
public/
  img/                     prints, ícone, QR de teste e imagem de compartilhamento (PNG + WebP)
  mascote/                 SVGs do mascote
  _headers                 cabeçalhos de segurança (Cloudflare Pages)
  robots.txt, sitemap.xml  usam __SITE_URL__, trocado no build
scripts/check-csp.mjs      confere o hash da CSP e se _headers e vercel.json são iguais
src/
  main.js                  ponto de entrada
  scripts/
    config.js              flags e preço do plano usado na calculadora
    reveal.js              blocos aparecem ao rolar
    motion.js              barra de progresso, parallax, faixa de nichos, mascote
    calculator.js          calculadora "Faça a conta"
    plans.js               alternância Mensal/Anual
  styles/
    main.css               lista os arquivos abaixo, na ordem
    tokens.css             cores, fontes, espaços e easing (variáveis CSS)
    base.css               reset, links, foco, imagens
    motion.css             animação de entrada e prefers-reduced-motion
    layout.css             moldura da página
    components/            blocos reutilizáveis: tipografia, seção, botões, marca, chip, lista, link
    sections/              um arquivo por seção da página, do topo ao rodapé
vercel.json                redirecionamentos e cabeçalhos (Vercel)
vite.config.js             variáveis de endereço e troca do __SITE_URL__
```

## CSS

- Sem estilos inline: tudo está em classes, e as cores, fontes e espaços vêm de `tokens.css`.
- Nomes no padrão BEM: `bloco__elemento--variação` (`feature__title`, `btn--dark`, `plan__price--featured`).
- Cada seção da página tem o seu arquivo em `styles/sections/`, com o hover e as regras de tela pequena ao final.
- `data-r` marca o que aparece ao rolar e `data-d` define o atraso em milissegundos.
- O topo vira uma linha só (logo e botão) abaixo de 980 px; os atalhos continuam no rodapé.

## Endereços

Defina no `.env` (ou nas variáveis da hospedagem):

| Variável | Padrão | Onde entra |
|---|---|---|
| `VITE_SITE_URL` | `https://www.dinedrop.com.br` | canonical, og:url, og:image, JSON-LD, `robots.txt` e `sitemap.xml` |
| `VITE_APP_URL` | `https://appdinedrop.com` | links do painel, Termos e Privacidade |

## Deploy

Comando `npm run build`, pasta de saída `dist`.

- **Vercel:** `www.dinedrop.com.br` é o endereço principal; `dinedrop.com.br` redireciona para o www e `dinedrop-landing.vercel.app` redireciona pelo `vercel.json`.
- **Cloudflare Pages:** usa `public/_headers`, com os mesmos cabeçalhos do `vercel.json`.

## Segurança

O único script embutido do `index.html` (que liga a classe `js`) tem o hash liberado na CSP do `vercel.json` e do `public/_headers`. Se mudar esse script, rode `npm run check:csp`: ele mostra o hash novo e avisa se os dois arquivos de cabeçalhos ficaram diferentes.

## Pendências

- Termos de Uso e Política de Privacidade apontam para `VITE_APP_URL/termos` e `/privacidade`: conferir que as páginas existem no app.
- Ligar "Sem comissão por pedido": `FLAGS.semComissao` em `src/scripts/config.js` (só depois de conferir a taxa de 5%).
- Trocar os prints por um restaurante demo e conferir o QR de teste.
- Search Console: a propriedade `https://www.dinedrop.com.br/` já verifica pela meta tag do `index.html`. A propriedade de domínio `dinedrop.com.br` precisa do registro TXT `google-site-verification=…` no DNS do Registro.br. Depois, enviar `sitemap.xml`.
