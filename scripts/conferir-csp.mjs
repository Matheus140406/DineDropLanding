// Confere se cada <script> embutido do build (dist/index.html) tem o hash liberado na CSP do vercel.json.
// Mudou o script embutido? Rode "npm run check:csp": ele mostra o hash novo para colar no vercel.json.
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'

const html = readFileSync('dist/index.html', 'utf8')
const csp = JSON.parse(readFileSync('vercel.json', 'utf8')).headers[0].headers.find(h => h.key === 'Content-Security-Policy').value
let falhou = false
for (const [, attrs, corpo] of html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)) {
  if (/ld\+json/.test(attrs)) continue // bloco de dados: não executa, a CSP não se aplica
  const hash = `'sha256-${createHash('sha256').update(corpo, 'utf8').digest('base64')}'`
  if (csp.includes(hash)) console.log('ok', hash)
  else { console.log('FALTA na CSP do vercel.json:', hash, 'para o script:', corpo.slice(0, 60)); falhou = true }
}
process.exit(falhou ? 1 : 0)
