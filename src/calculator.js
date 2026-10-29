import { GARCOM_PRICE } from './config.js';

const fmt = (n) => 'R$ ' + Math.round(n).toLocaleString('pt-BR');

export function initCalculator() {
  const fat = document.getElementById('fat');
  const com = document.getElementById('com');
  if (!fat || !com) return;
  const yes = document.getElementById('sc-economiza');
  const no = document.getElementById('sc-naoEconomiza');
  const out = (k, v) => document.querySelectorAll('[data-out="' + k + '"]').forEach((e) => { e.textContent = v; });

  const update = () => {
    const f = parseInt(fat.value.replace(/\D/g, ''), 10) || 0;
    const c = Math.min(100, parseFloat(com.value.replace(',', '.')) || 0);
    const mes = (f * c) / 100;
    const eco = mes - GARCOM_PRICE;
    out('comissaoMes', fmt(mes));
    out('comissaoAno', fmt(mes * 12));
    out('economiaMes', fmt(Math.max(eco, 0)));
    out('economiaAno', fmt(Math.max(eco, 0) * 12));
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
