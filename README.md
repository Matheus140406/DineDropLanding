# DineDrop · Landing page

Site estático em HTML, CSS e JavaScript, com Vite. O HTML já vem completo no `index.html`, então o Google lê tudo sem executar script.

## Rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
npm run preview  # testa o build
```

## Estrutura

```
index.html          conteúdo, metatags, Open Graph e JSON-LD
src/main.js         ponto de entrada
src/config.js       flags e preço do plano usado na calculadora
src/reveal.js       aparecer ao rolar
src/motion.js       barra de progresso, parallax, faixa de nichos, mascote
src/calculator.js   calculadora "Faça a conta"
src/plans.js        alternância Mensal/Anual
src/styles.css      base, hover, foco e movimento
public/             imagens (PNG + WebP leve), mascote, robots.txt, sitemap.xml
```

## Domínio

A landing fica em `https://www.dinedrop.com.br` (Vercel; `dinedrop.com.br` redireciona para o www). O endereço vem de `VITE_SITE_URL` no `.env` e entra no canonical, og:url, og:image, JSON-LD, `robots.txt` e `sitemap.xml`.

## Pendências

- Links de Termos de Uso e Política de Privacidade (hoje `#`, aguardando as páginas legais).
- Ligar "Sem comissão por pedido": `FLAGS.semComissao` em `src/config.js` (só depois de conferir a taxa de 5%).
- Trocar os prints por um restaurante demo e conferir o QR de teste.
- Search Console: propriedade de domínio `dinedrop.com.br` criada; falta o registro TXT `google-site-verification=…` no DNS do Registro.br. A meta tag no `index.html` já verifica a propriedade de prefixo `https://www.dinedrop.com.br/`. Depois, enviar `sitemap.xml`.

## Deploy

Vercel, Netlify ou Cloudflare Pages: comando `npm run build`, pasta de saída `dist`.
