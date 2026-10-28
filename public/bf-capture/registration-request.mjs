export async function submitRegistration(payload, fetcher = fetch, timeoutMs = 12000) {
  for (let attempt = 0; attempt < 2; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetcher('/api/blackfriday-leads', {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload), signal: controller.signal,
      });
      let result;
      try { result = await response.json(); } catch { throw new Error('invalid_response'); }
      if (response.ok && result.ok === true) return result;
      if (attempt === 0 && (response.status >= 500 || response.status === 429)) continue;
      const messages = {
        invalid_name: 'Confira seu nome para continuar.',
        invalid_email: 'Confira seu e-mail para continuar.',
        invalid_whatsapp: 'Confira o WhatsApp com DDD.',
        consent_required: 'Marque a autorização para receber as informações da aula.',
        consent_change_requires_original_browser: 'Seu cadastro já existe. Use o navegador do cadastro original para alterar a autorização de medição.',
      };
      const error = new Error(messages[result.error] || 'Não foi possível concluir agora. Seus dados continuam preenchidos; tente novamente.');
      error.permanent = response.status >= 400 && response.status < 500 && response.status !== 429;
      throw error;
    } catch (error) {
      if (error.permanent) throw error;
      if (attempt === 1) throw new Error('A conexão demorou ou falhou. Confira sua internet e toque novamente; seus dados continuam preenchidos.');
    } finally { clearTimeout(timer); }
  }
}

export async function boundedTracking(task, timeoutMs = 800) {
  let timer;
  try { await Promise.race([Promise.resolve().then(task).catch(() => undefined), new Promise(resolve => { timer = setTimeout(resolve, timeoutMs); })]); }
  finally { clearTimeout(timer); }
}
