import { GARCOM_PRICE } from './config.js';

const fmt = (n) => 'R$ ' + Math.round(n).toLocaleString('pt-BR');

export function initCalculator() {
  const fat = document.getElementById('fat');
  const com = document.getElementById('com');
  if (!fat || !com) return;
  const yes = document.getElementById('sc-economiza');
  const no = document.getElementById('sc-naoEconomiza');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // número que corre até o valor novo (450 ms, desacelera no fim); com movimento reduzido, troca direto
  const out = (k, n) => document.querySelectorAll('[data-out="' + k + '"]').forEach((e) => {
    const de = Number(e.dataset.v ?? n), para = Math.round(n);
    e.dataset.v = String(para);
    cancelAnimationFrame(e._raf);
    if (reduce || de === para) { e.textContent = fmt(para); return; }
    const t0 = performance.now();
    const passo = (t) => {
      const p = Math.min(1, (t - t0) / 450);
      e.textContent = fmt(de + (para - de) * (1 - Math.pow(1 - p, 4)));
      if (p < 1) e._raf = requestAnimationFrame(passo);
    };
    e._raf = requestAnimationFrame(passo);
  });

  const update = () => {
    const f = parseInt(fat.value.replace(/\D/g, ''), 10) || 0;
    const c = Math.min(100, parseFloat(com.value.replace(',', '.')) || 0);
    const mes = (f * c) / 100;
    const eco = mes - GARCOM_PRICE;
    out('comissaoMes', mes);
    out('comissaoAno', mes * 12);
    out('economiaMes', Math.max(eco, 0));
    out('economiaAno', Math.max(eco, 0) * 12);
    yes.hidden = eco <= 0;
    no.hidden = eco > 0;
  };

  fat.addEventListener('input', () => {
    const d = fat.value.replace(/\D/g, '').slice(0, 9);
    fat.value = d ? parseInt(d, 10).toLocaleString('pt-BR') : '';
    update();
  });
  com.addEventListener('input', () => {
    com.value = com.value.replace(/[^\d,]/g, '').replace(/,(?=.*,)/g, '').slice(0, 5);
    update();
  });
  update();
}
