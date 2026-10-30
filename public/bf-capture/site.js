import { createTrackingLoader } from './tracking-consent.mjs';
import { identifySavedLead } from './tracking-identity.mjs';
import { submitRegistration, boundedTracking } from './registration-request.mjs';

(() => {

  'use strict';

  const CONFIG = { CAPTURE_MODE: 'direct', eventAt: '2026-11-18T20:00:00-03:00' };

  const measurementBox = document.querySelector('#measurement-consent');
  if (measurementBox) {
    try { measurementBox.checked = sessionStorage.getItem('bf_measurement_consent') === '1'; } catch { /* Consent remains unchecked. */ }
  }
  let measurementAllowed = () => {
    try { return !!(measurementBox && measurementBox.checked) || sessionStorage.getItem('bf_measurement_consent') === '1'; }
    catch { return !!(measurementBox && measurementBox.checked); }
  };
  let trackingReady = () => Promise.resolve(false);
  let thankYouViewSent = false;

  const sendMetricageekEvent = event => {
    const send = () => {
      if (!window.gpx || !measurementAllowed()) return;
      if (event === 'form_start') window.gpx.event('FormStart', {}, null, { event_id: crypto.randomUUID() });
      if (event === 'group_invite_click') window.gpx.event('GroupInviteClick', { placement: 'thank-you' }, null, { event_id: crypto.randomUUID() });
      if (event === 'thank_you_view') window.gpx.event('ThankYouView', {}, null, { event_id: crypto.randomUUID() });
    };
    if (window.gpx) send();
    else void trackingReady().then(send);
  };

  const fire = (event, properties = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...properties });
    window.dispatchEvent(new CustomEvent('fpm:event', { detail: { event, ...properties } }));
    if (['form_start', 'group_invite_click', 'thank_you_view'].includes(event)) sendMetricageekEvent(event);
  };

  const loadTrackingScript = createTrackingLoader({
    hasConsent: measurementAllowed,
    fetchConfig: async () => {
      const response = await fetch('/api/blackfriday-tracking-config', { credentials: 'same-origin', cache: 'no-store' });
      if (!response.ok) return null;
      return response.json();
    },
    appendScript: scriptUrl => new Promise(resolve => {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.head.append(script);
      }),
  });

  trackingReady = async () => {
    const loaded = await loadTrackingScript();
    if (!loaded || !measurementAllowed() || !window.gpx || typeof window.gpx.consent !== 'function') return false;
    window.gpx.consent(true);
    await window.gpx.ready;
    if (!measurementAllowed()) return false;
    if (document.body.classList.contains('thankyou-page') && !thankYouViewSent) {
      thankYouViewSent = true;
      fire('thank_you_view');
    }
    return true;
  };

  if (measurementAllowed()) void trackingReady();

  if (measurementBox) {
    measurementBox.addEventListener('change', () => {
      try {
        if (measurementBox.checked) sessionStorage.setItem('bf_measurement_consent', '1');
        else sessionStorage.removeItem('bf_measurement_consent');
      } catch { /* Do not block form use when storage is unavailable. */ }
      if (measurementBox.checked) void trackingReady();
      else window.gpx?.consent(false);
      if (measurementBox.checked && form && form.contains(document.activeElement) && !formStarted) {
        formStarted = true;
        fire('form_start');
      }
    });
  }

  const utmKeys = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'];

  let campaign = {};

  try { campaign = JSON.parse(sessionStorage.getItem('fpm_campaign') || '{}'); } catch { campaign = {}; }

  const currentParams = new URLSearchParams(location.search);

  for (const key of utmKeys) if(currentParams.has(key)) campaign[key] = currentParams.get(key).slice(0,250);

  campaign = Object.fromEntries(utmKeys.filter(key => typeof campaign[key] === 'string').map(key => [key,campaign[key]]));

  try { sessionStorage.setItem('fpm_campaign',JSON.stringify(campaign)); } catch { /* Attribution remains available on this page. */ }

  document.querySelectorAll('a[href="/"],a[href="/bf-capture/privacidade/index.html"],a[href="#cadastro"],a[href="#como-funciona"],a[href="#presente"]').forEach(a => { const target = new URL(a.href); for(const [key,value] of Object.entries(campaign)) target.searchParams.set(key,value); a.href=target.pathname+target.search+target.hash; });

  const money = value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  document.querySelectorAll('[data-carousel-banner]').forEach(banner => {

    const track=banner.querySelector('.banner-track'), button=banner.querySelector('.banner-pause');

    if(!track||!button)return;

    let paused=false;

    const render=()=>{track.style.setProperty('animation-play-state',paused||document.hidden?'paused':'running','important');button.setAttribute('aria-pressed',String(paused));button.setAttribute('aria-label',paused?'Retomar faixa animada':'Pausar faixa animada');button.textContent=paused?'Retomar':'Pausar';};

    render();button.addEventListener('click',()=>{paused=!paused;render();});document.addEventListener('visibilitychange',render);

    reducedMotion.addEventListener?.('change',event=>{if(event.matches){paused=true;render();}});

  });

  const form = document.querySelector('#capture-form');

  let captureDialog = null;

  if(form && CONFIG.CAPTURE_MODE === 'modal'){

    const captureBlock=document.querySelector('#cadastro');

    const placeholder=document.createElement('div');placeholder.className='capture-block capture-invitation';placeholder.innerHTML='<h2>Sua aula.<br>Seu kit gratuito.</h2><p>Preencha nome, e-mail e WhatsApp para liberar os cinco comandos e o checklist.</p><a class="button primary" href="#cadastro">Abrir meu cadastro</a>';

    captureBlock.before(placeholder);

    captureDialog=document.createElement('dialog');captureDialog.className='capture-modal';captureDialog.setAttribute('aria-label','Cadastro para a aula e kit gratuito');

    const close=document.createElement('button');close.type='button';close.className='modal-close';close.textContent='Fechar';close.addEventListener('click',()=>captureDialog.close());

    captureDialog.append(close,captureBlock);document.body.append(captureDialog);

    captureDialog.addEventListener('click',e=>{if(e.target===captureDialog)captureDialog.close();});

    if(location.hash==='#cadastro')captureDialog.showModal();

  }

  if (form) {
    let submitting = false;

    let requestId = crypto.randomUUID();
    let formStarted = false;

    form.addEventListener('focusin', () => {
      if (formStarted || !measurementAllowed()) return;
      formStarted = true;
      fire('form_start');
    });

    let accessToken = Array.from(crypto.getRandomValues(new Uint8Array(32)), n => n.toString(16).padStart(2, '0')).join('');

    const startedAt = Date.now();

    const phone = form.querySelector('#whatsapp');

    phone.addEventListener('input', () => { let v = phone.value.replace(/\D/g, ''); if (v.startsWith('55') && v.length > 11) v = v.slice(2); v = v.slice(0, 11); phone.value = v.length > 7 ? '(' + v.slice(0, 2) + ') ' + v.slice(2, 7) + '-' + v.slice(7) : v.length > 2 ? '(' + v.slice(0, 2) + ') ' + v.slice(2) : v; });

    form.addEventListener('submit', async e => {

      e.preventDefault();
      if (submitting) return;

      const errorBox = form.querySelector('#form-error');

      const submit = form.querySelector('#submit-button');

      errorBox.hidden = true;

      for (const field of form.querySelectorAll('[aria-invalid]')) field.removeAttribute('aria-invalid');

      const fail = (text, field) => { errorBox.textContent = text; errorBox.hidden = false; if (field) { field.setAttribute('aria-invalid', 'true'); field.focus(); } else errorBox.focus(); };

      const name = form.elements.name.value.trim();

      const email = form.elements.email.value.trim();

      const whatsapp = phone.value.replace(/\D/g, '');

      if (name.length < 2) return fail('Informe seu nome para continuar.', form.elements.name);

      if (!form.elements.email.validity.valid || !email) return fail('Confira o e-mail. Exemplo: voce@email.com.', form.elements.email);

      if (!/^[1-9]\d9\d{8}$/.test(whatsapp)) return fail('Informe seu celular com DDD. Exemplo: (11) 91234-5678.', phone);

      if (form.elements.consent && !form.elements.consent.checked) return fail('Marque a autorização para receber as informações da aula.', form.elements.consent);

      const utm = campaign;

      submit.disabled = true;
      submitting = true;

      submit.querySelector('span').textContent = 'Salvando seu cadastro…';

      fire('lead_submit_attempt');

      try {

        const readCookie = name => { const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)')); return match ? decodeURIComponent(match[1]) : null; };
        const measurementConsent = !!measurementBox?.checked;
        if (measurementConsent) await boundedTracking(trackingReady);
        const currentMeasurementConsent = measurementConsent && measurementAllowed();
        const result = await submitRegistration({ name, email, whatsapp, consent: true, measurementConsent: currentMeasurementConsent, attribution: currentMeasurementConsent ? { fbp: readCookie('_fbp'), fbc: readCookie('_fbc'), sid: window.gpx?.sid } : {}, utm, requestId, accessToken, startedAt, website: form.elements.website.value });

        if (result.measurement_consent === true && result.event_id && measurementAllowed()) {
          await boundedTracking(async () => { await trackingReady(); await identifySavedLead(window.gpx, result, measurementAllowed); });
        }

        fire('lead_saved', { origin: utm.utm_source || 'direct' });

        if(window.top&&window.top!==window){window.top.location.assign(result.next)}else{location.assign(result.next)};

      } catch (error) {

        fail(error instanceof Error ? error.message : 'O envio falhou. Confira sua conexão e tente novamente.');

        submit.disabled = false;
        submitting = false;

        submit.querySelector('span').textContent = 'Quero a aula + meu kit gratuito';

      }

    });

    const sticky = document.querySelector('.mobile-cta');

    if (sticky && 'IntersectionObserver' in window) new IntersectionObserver(entries => { sticky.classList.toggle('hide', entries[0].isIntersecting); }, {threshold: .1}).observe(document.querySelector('#cadastro'));

  }

  document.querySelectorAll('a').forEach(a => { if(new URL(a.href).hash === '#cadastro') a.addEventListener('click', event => {if(captureDialog){event.preventDefault();captureDialog.showModal();}}); });

  const steps = [

    ['Tenho experiência em [tema]. Ajude a escolher um público específico e uma tarefa pequena que eu consiga ajudar a resolver.', 'Uma pessoa. Uma situação. Um próximo passo.', 'Troque “quero vender para todo mundo” por uma hipótese de público que você consiga investigar.', ['Uma pessoa que você consegue descrever.', 'Uma tarefa pequena e específica.', 'Uma hipótese para pesquisar.']],

    ['Estas são as frases que ouvi de [público]: [frases reais]. Agrupe as dificuldades e proponha uma hipótese para testar.', 'Uma dor descrita por quem vive ela.', 'A IA organiza os sinais. Você confere as fontes e conversa com pessoas antes de concluir que existe demanda.', ['Frases reais de quem vive a situação.', 'Um problema específico e recorrente.', 'Uma conversa para validar a hipótese.']],

    ['Ajudo [pessoa] a [resultado limitado] com [entrega]. Escreva uma oferta clara usando apenas as informações confirmadas.', 'O que é. Para quem. O que entrega.', 'Defina escopo, limites, preço de teste e custos. Uma promessa entendida é o começo da conversa.', ['Para quem a oferta foi pensada.', 'O que entrega e até onde vai.', 'Preço e custos do primeiro teste.']],

    ['Minha oferta é [frase]. Planeje a menor versão útil de [SaaS, ferramenta ou material] e diga como testar a função principal.', 'A menor versão que resolve uma tarefa.', 'Um protótipo bonito ainda precisa funcionar. Confira a entrega completa, os erros e o resultado que a pessoa recebe.', ['A menor versão que conclui a tarefa.', 'O fluxo principal até a entrega.', 'Erros, dados e custos a conferir.']],

    ['Use este briefing confirmado para escrever uma página curta com headline, entrega, funcionamento, dúvidas e uma ação principal.', 'Uma página pronta para o primeiro teste.', 'Publique uma oferta honesta, confira o caminho de compra e escolha como você vai medir o interesse.', ['Promessa e entrega fáceis de entender.', 'Dúvidas respondidas com fatos.', 'Ação principal e interesse para medir.']]

  ];

  let selectedStep = 0;

  const stageNames = ['PÚBLICO', 'PROBLEMA', 'OFERTA', 'PRODUTO', 'PÁGINA'];

  const selectStep = index => {

    selectedStep = (index + steps.length) % steps.length;

    const [command,title,text,checks] = steps[selectedStep];

    document.querySelectorAll('.step').forEach((b,i) => { b.classList.toggle('active', i === selectedStep); b.setAttribute('aria-selected', String(i === selectedStep)); b.tabIndex = i === selectedStep ? 0 : -1; });

    document.querySelector('#command-text').textContent = command;

    document.querySelector('#result-title').textContent = title;

    document.querySelector('#result-text').textContent = text;

    const insightStage=document.querySelector('#insight-stage');

    if(insightStage) insightStage.textContent=String(selectedStep+1).padStart(2,'0')+' / '+stageNames[selectedStep];

    checks.forEach((item,i)=>{const target=document.querySelector('#insight-'+(i+1));if(target)target.textContent=item;});

    document.querySelector('#command-panel').setAttribute('aria-labelledby', 'tab-' + selectedStep);

  };

  document.querySelectorAll('.step').forEach((button,i) => {

    button.addEventListener('click', () => selectStep(i));

    button.addEventListener('keydown', event => { let next; if (['ArrowRight','ArrowDown'].includes(event.key)) next=i+1; if (['ArrowLeft','ArrowUp'].includes(event.key)) next=i-1; if (event.key==='Home') next=0; if (event.key==='End') next=4; if(next!==undefined){event.preventDefault();selectStep(next);document.querySelector('#tab-' + selectedStep).focus();} });

  });

  document.querySelector('#next-step')?.addEventListener('click', () => selectStep(selectedStep+1));

  const price = document.querySelector('#price-range');

  const sales = document.querySelector('#sales-range');

  function updateCalculator() {

    const p = Number(price.value), s = Number(sales.value);

    document.querySelector('#price-output').textContent = money(p);

    document.querySelector('#sales-output').textContent = s;

    document.querySelector('#daily-result').replaceChildren(document.createTextNode(money(p*s)));

    const suffix=document.createElement('span'); suffix.textContent='/ dia'; document.querySelector('#daily-result').append(suffix);

    document.querySelector('#monthly-result').textContent = money(p*s*30);

    document.querySelectorAll('.scenario').forEach(b => { const active=Number(b.dataset.price)===p&&Number(b.dataset.sales)===s;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active)); });

  }

  if(price&&sales){price.addEventListener('input',updateCalculator);sales.addEventListener('input',updateCalculator);document.querySelectorAll('.scenario').forEach(b=>b.addEventListener('click',()=>{price.value=b.dataset.price;sales.value=b.dataset.sales;updateCalculator();}));updateCalculator();}

  const demoViews={

    idea:{step:'PASSO 01 / IDEIA',eyebrow:'COMECE PELO PROBLEMA',title:'O que você quer ajudar alguém a resolver?',label:'RASCUNHO DE PRODUTO · EXEMPLO',output:'Planner de estudos semanal',copy:'Ajuda estudantes a organizar matérias e visualizar a próxima tarefa.'},

    product:{step:'PASSO 02 / PRODUTO',eyebrow:'DEFINA UMA TAREFA',title:'O que a pessoa vai conseguir fazer?',label:'FLUXO DO PRODUTO · EXEMPLO',output:'Organizar → acompanhar → concluir',copy:'Uma sequência ilustrativa: registrar tarefas, escolher uma prioridade e ver o próximo passo.'},

    page:{step:'PASSO 03 / PÁGINA',eyebrow:'APRESENTE A OFERTA',title:'Como explicar o valor com clareza?',label:'ESBOÇO DE PÁGINA · EXEMPLO',output:'Problema · solução · próximo passo',copy:'Uma estrutura inicial para explicar para quem é, o que entrega e como começar.'}

  };

  const demoInput=document.querySelector('#demo-idea');

  if(demoInput){

    let demoView='idea', drafted=false;

    const tabs=[...document.querySelectorAll('[data-demo-view]')];

    const renderDemo=()=>{

      const view=demoViews[demoView];

      document.querySelector('#mock-step-label').textContent=view.step;

      document.querySelector('#mock-eyebrow').textContent=view.eyebrow;

      document.querySelector('#mock-title').textContent=view.title;

      document.querySelector('#mock-output>span').textContent=view.label;

      document.querySelector('#mock-output-title').textContent=drafted?(demoInput.value.trim()||view.output):view.output;

      document.querySelector('#mock-output-copy').textContent=drafted?'Prévia local baseada em "'+(demoInput.value.trim()||'sua ideia')+'". Revise público, entrega e custos.':view.copy;

      document.querySelector('#demo-feedback').textContent=drafted?'Rascunho de demonstração atualizado no seu navegador.':'Edite o exemplo ou escolha Produto e Página no menu lateral.';

      tabs.forEach(tab=>{const active=tab.dataset.demoView===demoView;tab.classList.toggle('active',active);tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});

    };

    tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>{demoView=tab.dataset.demoView;renderDemo();});tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowDown'||event.key==='ArrowRight')next=(index+1)%tabs.length;if(event.key==='ArrowUp'||event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;if(next!==undefined){event.preventDefault();tabs[next].focus();demoView=tabs[next].dataset.demoView;renderDemo();}});});

    document.querySelector('#demo-run').addEventListener('click',()=>{drafted=true;renderDemo();document.querySelector('#mock-output').classList.remove('demo-output-in');requestAnimationFrame(()=>document.querySelector('#mock-output').classList.add('demo-output-in'));});

    demoInput.addEventListener('input',()=>{if(drafted)renderDemo();});

    renderDemo();

  }

  const courseViewport=document.querySelector('#course-viewport');

  if(courseViewport){

    const slides=[...courseViewport.querySelectorAll('[data-course-slide]')],dots=[...document.querySelectorAll('#course-dots button')],counter=document.querySelector('#course-counter'),pauseButton=document.querySelector('#course-pause');

    let index=0,paused=false,timer=0,scrollFrame=0;

    const updateIndicator=()=>{dots.forEach((dot,i)=>dot.setAttribute('aria-current',String(i===index)));counter.innerHTML=String(index+1).padStart(2,'0')+' <i>/</i> '+String(slides.length).padStart(2,'0');};

    const setIndex=(next,behavior='smooth')=>{index=(next+slides.length)%slides.length;const viewportRect=courseViewport.getBoundingClientRect();const viewportStyle=getComputedStyle(courseViewport);const inset=courseViewport.clientLeft+(parseFloat(viewportStyle.paddingLeft)||0);const targetLeft=courseViewport.scrollLeft+slides[index].getBoundingClientRect().left-viewportRect.left-inset;courseViewport.scrollTo({left:Math.max(0,targetLeft),behavior});updateIndicator();};

    const stop=()=>{clearInterval(timer);timer=0;};

    const start=()=>{stop();if(!paused&&!document.hidden)timer=setInterval(()=>setIndex(index+1),6500);};

    const setPaused=value=>{paused=value;pauseButton.setAttribute('aria-pressed',String(paused));pauseButton.textContent=paused?'Retomar':'Pausar';pauseButton.setAttribute('aria-label',paused?'Retomar rotação dos banners':'Pausar rotação dos banners');start();};

    document.querySelector('#course-prev').addEventListener('click',()=>{setIndex(index-1);start();});

    document.querySelector('#course-next').addEventListener('click',()=>{setIndex(index+1);start();});

    dots.forEach((dot,i)=>dot.addEventListener('click',()=>{setIndex(i);start();}));

    pauseButton.addEventListener('click',()=>setPaused(!paused));

    courseViewport.addEventListener('focusin',stop);courseViewport.addEventListener('focusout',event=>{if(!courseViewport.contains(event.relatedTarget))start();});

    courseViewport.addEventListener('scroll',()=>{cancelAnimationFrame(scrollFrame);scrollFrame=requestAnimationFrame(()=>{const left=courseViewport.getBoundingClientRect().left;let nearest=0,distance=Infinity;slides.forEach((slide,i)=>{const d=Math.abs(slide.getBoundingClientRect().left-left);if(d<distance){distance=d;nearest=i;}});index=nearest;updateIndicator();});},{passive:true});

    document.addEventListener('visibilitychange',start);reducedMotion.addEventListener?.('change',event=>{if(event.matches)setPaused(true);});

    setIndex(0,'instant');start();

  }

  const countdown = document.querySelector('#countdown');

  function tick(){const ms=Date.parse(CONFIG.eventAt)-Date.now();if(ms<=0){countdown.textContent='A data desta aula chegou. Confira o acesso no grupo.';return;}document.querySelector('#count-days').textContent=String(Math.floor(ms/86400000)).padStart(2,'0');document.querySelector('#count-hours').textContent=String(Math.floor(ms/3600000)%24).padStart(2,'0');document.querySelector('#count-mins').textContent=String(Math.floor(ms/60000)%60).padStart(2,'0');}

  if(countdown){tick();setInterval(tick,30000);}

  document.querySelector('#join-group')?.addEventListener('click', () => {fire('group_invite_click');});

  document.querySelector('#download-gift')?.addEventListener('click',()=>fire('gift_download_requested'));

  let deleteConfirmed = false;

  document.querySelector('#delete-lead')?.addEventListener('click', async e => {

    const button=e.currentTarget,status=document.querySelector('#delete-status');

    if(!deleteConfirmed){deleteConfirmed=true;button.textContent='Confirmar exclusão do meu cadastro';status.textContent='Esta ação apaga o cadastro desta sessão. Clique novamente para confirmar.';return;}

    button.disabled=true;

    try{const r=await fetch('/api/blackfriday-leads',{method:'DELETE',credentials:'same-origin'});const d=await r.json();if(!r.ok)throw new Error(d.error);status.textContent='Seu cadastro foi excluído.';document.querySelectorAll('.thanks-grid .button,.thanks-grid .text-link').forEach(a=>a.remove());button.remove();document.querySelector('.thankyou .edition').textContent='CADASTRO EXCLUÍDO';document.querySelector('.thankyou h1').textContent='Você controla seus dados.';document.querySelector('.thanks-lead').textContent='O cadastro desta sessão foi excluído. O acesso ao kit por este navegador foi encerrado.';document.querySelector('.thanks-grid').hidden=true;document.querySelector('.thanks-note').textContent='Você pode voltar à página inicial se quiser cadastrar novamente.';}catch(error){status.textContent=error.message||'Não foi possível excluir agora. Tente novamente.';button.disabled=false;}

  });

})();
