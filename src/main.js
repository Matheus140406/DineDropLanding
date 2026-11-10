import './styles/main.css';
import { FLAGS } from './scripts/config.js';
import { initReveal } from './scripts/reveal.js';
import { initCalculator } from './scripts/calculator.js';
import { initPlans } from './scripts/plans.js';
import { initMotion } from './scripts/motion.js';

document.documentElement.classList.add('js-ok');

const flag = document.getElementById('sc-semComissao');
if (flag) flag.hidden = !FLAGS.semComissao;

initReveal();
initCalculator();
initPlans();
initMotion();
