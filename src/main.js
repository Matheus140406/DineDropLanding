import './styles.css';
import { FLAGS } from './config.js';
import { initReveal } from './reveal.js';
import { initCalculator } from './calculator.js';
import { initPlans } from './plans.js';
import { initMotion } from './motion.js';

const flag = document.getElementById('sc-semComissao');
if (flag) flag.hidden = !FLAGS.semComissao;

initReveal();
initCalculator();
initPlans();
initMotion();
