import { defineConfig } from 'vite';

// Endereço do app (painel, Termos, Privacidade). Os links do index.html usam %VITE_APP_URL%: no dia da migração para o domínio
// próprio, basta definir VITE_APP_URL na hospedagem da landing. Sem a variável, vale o endereço de hoje (nenhum link quebra).
process.env.VITE_APP_URL ||= 'https://dinedrop-app.vercel.app';

export default defineConfig({ build: { target: 'es2020', assetsInlineLimit: 0 } });
