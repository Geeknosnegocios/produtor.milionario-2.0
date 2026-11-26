// Versão B — "Caderno de comandos": camada de movimento.
// Regras: só transform/translate/rotate/scale e opacity; nada pelo teclado; uma entrada por bloco;
// intervalos que encolhem (onda, não metrônomo); sem JS ou com "reduzir movimento", tudo aparece parado.
(() => {
  'use strict';

  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  // ?animacao=1 liga o movimento só para pré-visualizar (ex.: navegador com "reduzir movimento" ativo).
  const forceMotion = new URLSearchParams(location.search).has('animacao');
  if (forceMotion) root.classList.add('b-force-motion');
  const reduceOn = () => reduce.matches && !forceMotion;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const all = (sel, scope = document) => [...scope.querySelectorAll(sel)];

  // ---------- Processo: destaque laranja que desliza até a etapa escolhida ----------
  const selector = document.querySelector('.step-selector');
  const pill = document.createElement('div');
  pill.className = 'b-step-pill is-instant';
  pill.setAttribute('aria-hidden', 'true');
  const placePill = instant => {
    const active = selector?.querySelector('.step.active');
    if (!active) return;
    pill.classList.toggle('is-instant', instant);
    pill.style.width = active.offsetWidth + 'px';
    pill.style.height = active.offsetHeight + 'px';
    pill.style.transform = `translate(${active.offsetLeft}px, ${active.offsetTop}px)`;
  };
  if (selector) {
    selector.classList.add('b-has-pill');
    selector.prepend(pill);
    placePill(true);
    if ('ResizeObserver' in window) new ResizeObserver(() => placePill(true)).observe(selector);
    window.addEventListener('load', () => placePill(true));
  }

  // ---------- Comando: palavras aparecendo, como se estivesse sendo digitado ----------
  const command = document.querySelector('#command-text');
  let commandWaiting = false;
  const typeCommand = ({ capMs, stepMs, startMs = 0 }) => {
    if (!command) return;
    command.style.opacity = '';
    if (reduceOn()) return;
    const parts = command.textContent.split(/(\s+)/);
    const words = parts.filter(part => part.trim()).length || 1;
    const step = Math.min(stepMs, capMs / words);
    const fragment = document.createDocumentFragment();
    let i = 0;
    parts.forEach(part => {
      if (!part) return;
      if (!part.trim()) { fragment.append(document.createTextNode(part)); return; }
      const span = document.createElement('span');
      span.className = 'b-word';
      span.style.setProperty('--b-word-delay', Math.round(startMs + i * step) + 'ms');
      span.textContent = part;
      fragment.append(span);
      i += 1;
    });
    const caret = document.createElement('span');
    caret.className = 'b-caret';
    caret.setAttribute('aria-hidden', 'true');
    caret.style.setProperty('--b-caret-delay', Math.round(startMs + i * step + 160) + 'ms');
    fragment.append(caret);
    command.replaceChildren(fragment);
  };
  const swapResult = delayMs => {
    ['#result-title', '#result-text', '#insight-stage', '.insight-list'].forEach(sel => {
      const el = document.querySelector(sel);
      if (!el) return;
      el.classList.remove('b-swap-in');
      void el.offsetWidth; // reinicia em cliques seguidos
      el.style.setProperty('--b-swap-delay', delayMs + 'ms');
      el.classList.add('b-swap-in');
    });
  };
  document.addEventListener('bf:step', event => {
    const viaKeyboard = event.detail?.via === 'keyboard';
    placePill(viaKeyboard || reduceOn()); // teclado: troca instantânea
    if (viaKeyboard || reduceOn()) return;
    commandWaiting = false;
    typeCommand({ capMs: 380, stepMs: 14 });
    swapResult(90);
  });

  if (reduceOn() || !('IntersectionObserver' in window)) return;
  root.classList.add('b-motion');

  // ---------- Títulos: cada linha sobe de dentro de uma máscara ----------
  const splitLines = heading => {
    const lines = [[]];
    [...heading.childNodes].forEach(node => {
      if (node.nodeName === 'BR') lines.push([]);
      else lines[lines.length - 1].push(node);
    });
    // Tags próprias (não <span>): o CSS estiliza os <span> de dentro dos títulos.
    heading.replaceChildren(...lines.filter(nodes => nodes.some(n => n.textContent.trim())).map((nodes, i) => {
      const line = document.createElement('b-line');
      const lineInner = document.createElement('b-line-inner');
      line.className = 'b-line';
      lineInner.className = 'b-line-inner';
      lineInner.style.setProperty('--b-line-delay', [0, 90, 160, 210][i] + 'ms');
      lineInner.append(...nodes);
      line.append(lineInner);
      return line;
    }));
    heading.classList.add('b-lines');
  };
  const heroTitle = document.querySelector('.cover h1');
  if (heroTitle) {
    splitLines(heroTitle);
    requestAnimationFrame(() => requestAnimationFrame(() => heroTitle.classList.add('is-in')));
  }
  const titles = all('main section h2').filter(h => !h.closest('.cover'));
  titles.forEach(splitLines);
  const titleObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-in');
    titleObserver.unobserve(entry.target);
  }), { threshold: 0.35, rootMargin: '0px 0px -8% 0px' });
  titles.forEach(h => titleObserver.observe(h));

  // ---------- Entradas por bloco ----------
  const groups = [];
  const add = (el, delay, opts = {}) => {
    if (!el) return;
    el.setAttribute('data-b-reveal', '');
    el.style.setProperty('--b-from-x', opts.x || '0px');
    el.style.setProperty('--b-from-y', opts.y ?? '16px');
    groups.push({ el, delay });
  };

  // Comando + processo
  const work = document.querySelector('#como-funciona');
  if (work) {
    add(work.querySelector('.fold-head > p'), 160, { y: '10px' });
    // Gaps que encolhem depois do texto: 50, 40, 30, 20 ms.
    [220, 270, 310, 340, 360].forEach((d, i) => add(all('.step', work)[i], d, { y: '10px' }));
  }

  // Kit
  const gift = document.querySelector('#presente');
  if (gift) {
    add(gift.querySelector('.kit-art'), 0, { y: '36px' });
    add(gift.querySelector('.gift-label'), 80, { y: '0px' });
    add(gift.querySelector('.gift-copy h2 ~ p'), 200, { y: '10px' });
    [260, 310, 350].forEach((d, i) => add(all('.check-list li', gift)[i], d, { y: '8px' }));
  }

  // Recursos: o selo da edição primeiro, depois FPM 2.0 (01–03) e os recursos extras (04–06).
  const res = document.querySelector('.res-fold');
  if (res) {
    add(res.querySelector('.edition-summary'), 160, { y: '10px' });
    add(res.querySelector('.res-hub'), 0, { y: '20px' });
    const rows = all('.res-row', res);
    [120, 180, 230, 300, 340, 370].forEach((d, i) => add(rows[i], d, { x: '-14px', y: '0px' }));
    all('.edition-dates li', res).forEach((li, i) => add(li, [0, 70, 120][i], { y: '12px' }));
  }

  // Carrossel dos produtos
  const course = document.querySelector('.course-fold');
  if (course) {
    add(course.querySelector('.course-heading p'), 160, { y: '10px' });
    add(course.querySelector('.course-controls'), 220, { y: '8px' });
    [120, 190, 240, 275].forEach((d, i) => add(all('.course-slide', course)[i], d, { y: '24px' }));
  }

  // Comando: se ainda não foi visto, guarda o texto para "digitar" quando aparecer.
  if (command && command.getBoundingClientRect().top > window.innerHeight) {
    commandWaiting = true;
    command.style.opacity = '0';
  }

  const byEl = new Map(groups.map(g => [g.el, g]));
  const settle = (el, delay) => window.setTimeout(() => {
    // Depois da entrada, devolve o elemento às transições normais (hover, inclinação do kit).
    el.removeAttribute('data-b-reveal');
    el.classList.remove('is-in');
    ['--b-delay', '--b-from-x', '--b-from-y'].forEach(p => el.style.removeProperty(p));
  }, delay + 1000);

  const observer = new IntersectionObserver(entries => {
    const entering = entries.filter(e => e.isIntersecting).map(e => byEl.get(e.target)).filter(Boolean);
    if (!entering.length) return;
    // Quem entra junto mantém a ordem; quem entra sozinho (celular, rolando) aparece sem esperar.
    const base = Math.min(...entering.map(g => g.delay));
    entering.forEach(({ el, delay }) => {
      const d = delay - base;
      el.style.setProperty('--b-delay', d + 'ms');
      el.classList.add('is-in');
      observer.unobserve(el);
      settle(el, d);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
  groups.forEach(({ el }) => observer.observe(el));

  if (command && commandWaiting) {
    new IntersectionObserver((entries, io) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      if (!commandWaiting) return;
      commandWaiting = false;
      typeCommand({ capMs: 900, stepMs: 28, startMs: 200 });
    }, { threshold: 0.5 }).observe(command);
  }

  // ---------- Kit: a capa inclina em 3D seguindo o mouse (só com mouse) ----------
  const kitArt = document.querySelector('#presente .kit-art');
  if (kitArt && finePointer.matches) {
    const glare = document.createElement('span');
    glare.className = 'b-kit-glare';
    glare.setAttribute('aria-hidden', 'true');
    kitArt.append(glare);
    let frame = 0;
    kitArt.addEventListener('pointermove', event => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = kitArt.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width - 0.5;
        const y = (event.clientY - box.top) / box.height - 0.5;
        kitArt.classList.add('b-tilting');
        kitArt.style.transform = `perspective(1000px) rotateX(${(-y * 9).toFixed(2)}deg) rotateY(${(x * 12).toFixed(2)}deg) rotate(-2deg)`;
        glare.style.transform = `translate(${(x * 60).toFixed(1)}%, ${(y * 60).toFixed(1)}%)`;
      });
    });
    kitArt.addEventListener('pointerleave', () => {
      cancelAnimationFrame(frame);
      kitArt.classList.remove('b-tilting');
      kitArt.style.transform = '';
      glare.style.transform = '';
    });
  }
})();
