import './styles.css';
import { FLAGS } from './config.js';
import { initReveal } from './reveal.js';
import { initCalculator } from './calculator.js';
import { initPlans } from './plans.js';
import { initMotion } from './motion.js';
import { initHeader } from './header.js';
import { initAbas } from './abas.js';
import { initKds } from './kds.js';
import { initTilt } from './tilt.js';
import { initConta } from './conta.js';
import { initComent } from './coment.js';

document.documentElement.classList.add('js-ok');

const flag = document.getElementById('sc-semComissao');
if (flag) flag.hidden = !FLAGS.semComissao;

initHeader();
initAbas();
initKds();
initTilt();
initConta();
initComent();
initReveal();
initCalculator();
initPlans();
initMotion();
