# Black Friday: identidade e qualidade de correspondência

## Objetivo e evidência inicial

Corrigir as lacunas do tracking da captura Black Friday visando EMQ 9,0, sem tratar essa nota como resultado garantido. Em 28/10/2026 a API da Meta retornou Lead 2,7, e-mail 33,3%, external_id 66,7% e correspondência automática desligada no pixel 1627848199021741. Não retornou nota de PageView ou Purchase. Reconsultar após a implementação; a amostra é pequena.

## Escopo

- Captura: C:/Users/freit/Documents/Geek/produtor-milionario-2-0-blackfriday-tracking.
- Relay: C:/Users/freit/Documents/Geekholdind/03-SOFTWARE/metricageek-blackfriday.
- Identidade comum entre Pixel, PageView CAPI e Lead CAPI; persistência e recuperação por visitante autorizado.
- Campos disponíveis: e-mail, telefone, nome/sobrenome quando informados, external_id, fbp/fbc legítimos, IP/UA do visitante e geolocalização disponível na infraestrutura.
- Revisão do Purchase no checkout efetivo: evento somente após pagamento aprovado, identidade correspondente à compra e deduplicação por transação.
- Ativar correspondência avançada automática do pixel e verificar a configuração resultante quando houver acesso suportado.

## Restrições

- Medição depende de consentimento explícito; revogação interrompe os envios e elimina a identidade de medição do navegador.
- Não salvar contato em texto aberto no localStorage, cookies ou dataLayer; preferir persistência server-side com vínculo protegido ao visitante.
- Hashes também são dados de identificação. Não criar hidratação pública que permita consultar a identidade de outro SID.
- Usar SHA-256 após normalização; não hashear IP, UA, fbp ou fbc. Campo de CEP na CAPI: zp.
- Não inventar fbc, sobrenome, endereço ou identidade para subir a nota. Não substituir IP/UA do visitante pelos do webhook.
- Não ligar uma compra à identidade mais recente de outro visitante do workspace.
- Preservar event_id entre Pixel e CAPI; reenvio técnico não gera outra conversão.
- Manter escopo Black Friday e compatibilidade dos consumidores existentes do Metricageek; não ativar automações de WhatsApp nem reenviar históricos.
- Publicação, compra real e eventos reais enviados à Meta devem ter execução e evidências explícitas; simulação não comprova entrega.

## Critérios de aceite

Testes provam identidade estável entre eventos autorizados, recusa/revogação, retorno ao site, enriquecimento sem apagar hashes anteriores, normalização brasileira, origem dos cabeçalhos, isolamento entre visitantes e deduplicação. Builds passam. Os recibos informam quais campos foram enviados sem expor seus valores. Purchase é validado em ambiente de teste do provedor sem criar receita fictícia. A nota efetiva é reportada separadamente da prontidão técnica.
