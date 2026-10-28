# Black Friday Match Quality Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Completar a identidade e o enriquecimento dos eventos Black Friday visando EMQ 9,0, comprovando os campos entregues e a deduplicação.

**Architecture:** Manter a captura e o relay Metricageek existentes. Compartilhar a identidade persistente autorizada entre navegador e servidor, recuperar hashes no servidor sem os expor publicamente e enriquecer cada evento com dados da própria pessoa. Corrigir a fronteira da API de cadastro para que o Lead carregue o mesmo contexto que o PageView.

**Tech Stack:** Vite/React, JavaScript, TypeScript, Next.js, Supabase e Meta Pixel/CAPI. Sem novo GTM/Stape ou dependência paga.

**Spec:** ../specs/2026-10-28-blackfriday-match-quality.md

## Global Constraints

- Medição depende de consentimento explícito; revogação interrompe os envios e elimina a identidade de medição do navegador.
- Não salvar contato em texto aberto no localStorage, cookies ou dataLayer; preferir persistência server-side com vínculo protegido ao visitante.
- Hashes também são dados de identificação. Não criar hidratação pública que permita consultar a identidade de outro SID.
- Usar SHA-256 após normalização; não hashear IP, UA, fbp ou fbc. Campo de CEP na CAPI: zp.
- Não inventar fbc, sobrenome, endereço ou identidade para subir a nota. Não substituir IP/UA do visitante pelos do webhook.
- Preservar event_id entre Pixel e CAPI; reenvio técnico não gera outra conversão.
- Não ligar uma compra à identidade mais recente de outro visitante do workspace.

## Review Focus

- Recusa, revogação e retorno em outra sessão: nenhuma coleta ocorre sem autorização vigente.
- Eventos concorrentes ou anônimos não apagam hashes conhecidos da mesma identidade.
- SID escolhido por terceiro não dá acesso a hashes ou associação de identidade de outra pessoa.
- Telefone com DDD 55, nomes incompletos e ausência de fbclid não geram identificadores falsos.
- Webhook repetido, pendente ou com contexto ausente não cria Purchase nem vincula outra pessoa.

## Task 1: Contrato enriquecido e contexto do cadastro

**Files:** captura `api/blackfriday-leads.ts`, `src/lib/blackfriday-metricageek.ts`, `api/cron/blackfriday-tracking.ts`; relay `src/lib/tracking-contract.ts`, `src/lib/tracking-delivery.ts`; testes existentes `tests/blackfriday-lead-consent.test.mjs` e `tests/tracking-contract.test.mjs`.

**Interfaces:** ampliar `MatchIdentity` com hashes de nome e geografia; `makeMetaEvent()` converte as chaves internas para em/ph/fn/ln/ct/st/zp/country/external_id. O produtor envia contexto do visitante capturado na requisição original, preservado nas retentativas; o contrato continua aceitando fontes antigas.

- [ ] Escrever e executar testes que falham: Lead inclui external_id estável, nome disponível e IP/UA originais; nenhum campo aparece sem consentimento; telefone com DDD 55 normaliza corretamente; zp não sai como zip.
- [ ] Implementar campos validados e limites de tamanho, contexto dos cabeçalhos confiáveis e persistência do contexto para retentativas. Inspecionar schema antes de decidir se cabe no attribution existente; se precisar de migration, criar pela CLI e testar antes de aplicar.
- [ ] Executar `node --test tests/*.test.mjs` em ambos os projetos e verificar payload sanitizado na fronteira do relay.
- [ ] Revisar e registrar commit com arquivos explícitos.

## Task 2: Identificação do navegador e retorno autorizado

**Files:** captura `public/bf-capture/site.js`, `public/bf-capture/tracking-consent.mjs`, novo `public/bf-capture/tracking-identity.mjs`; relay `src/app/p/[slug]/route.ts`, `src/app/api/gpx/identify/[ws]/route.ts`, `src/app/api/gpx/track/[ws]/route.ts`; novos testes de identidade em `tests/` dos dois projetos.

**Interfaces:** `gpx.identify(userData)` após cadastro confirmado e autorizado; `gpx.sid` e o contexto enviado ao cadastro representam a mesma identidade. Helpers de identidade exportados permitem testes comportamentais sem carregar o DOM completo.

- [ ] Testar falhas atuais: e-mail/telefone/nome identificam os próximos eventos; external_id coincide no Pixel e na CAPI; retorno autorizado recupera a própria identidade; revogação impede envio; SID de terceiro não expõe hashes.
- [ ] Implementar associação segura ao cadastro confirmado e estratégia de retorno server-side, com prova de posse de identidade para qualquer operação que associe ou recupere dados pessoais. Não reutilizar o endpoint público de hidratação como atalho.
- [ ] Fazer o relay recuperar identidade existente antes de construir o payload e preservar campos conhecidos quando o próximo evento não os tiver. Evitar perda por upsert concorrente; usar operação atômica testada se necessário.
- [ ] Validar registro, navegação e retorno com contexto local de navegador e rede interceptada; não enviar contatos sintéticos à Meta de produção.
- [ ] Executar as suites e registrar commit.

## Task 3: Geografia e normalização do relay

**Files:** relay `src/lib/fop-utils.ts`, `src/lib/meta-capi.ts`, rotas gpx e webhook consumidoras; novos testes `tests/fop-user-data.test.mjs`.

**Interfaces:** `buildUserData()` produz `zp`; `normalizePhone()` distingue número brasileiro de 10/11 dígitos de número com DDI; geo vem do request do visitante ou de contexto previamente atribuído à própria identidade.

- [ ] Escrever testes que falham para zp, DDD 55, acentos/normalização conforme documentação Meta, campos ausentes, hashes já existentes sem duplo hash e geo ausente.
- [ ] Corrigir o mapeamento e adaptar consumidores que hoje persistem ou leem `zip`; manter compatibilidade dos registros antigos.
- [ ] Rodar suite completa e ambos os builds `npm run build`; inspecionar guias locais Next.js antes de editar rotas.
- [ ] Registrar commit revisado.

## Task 4: Purchase e correspondência automática

**Files:** relay `src/app/api/webhook/[secret]/route.ts`, `src/lib/meta-capi.ts`, testes de webhook; documentação operacional do resultado em `docs/`.

**Interfaces:** webhook do checkout efetivo da Black Friday produz Purchase apenas após aprovação; event_id determinístico por transação. Identidade vem de vínculo explícito ao pedido, e-mail ou telefone correspondente, nunca do último visitante do workspace.

- [ ] Confirmar checkout, produto e fonte ativos em configuração somente leitura; mapear payload e status reais do provedor antes de editar.
- [ ] Escrever testes que falham para pendente, aprovado, repetição, estorno e ausência de associação; corrigir lacunas encontradas sem trocar provedor.
- [ ] Validar com sandbox/payload oficial do provedor e Meta Test Events. Se não houver caminho de teste acessível, reportar exatamente a validação que ficou pendente; não efetuar compra paga por conta própria.
- [ ] Ativar correspondência avançada automática e seus campos por API documentada ou painel autenticado. Os tools Meta disponíveis para consulta não alteram esse toggle; inspecionar capacidade suportada antes de usar fallback. Ler de volta a configuração para confirmar.
- [ ] Registrar evidências agregadas e commit, sem contatos ou credenciais.

## Task 5: Revisão, publicação e validação

**Files:** diffs dos dois repositórios, respectivos README e registro sanitizado de validação.

- [ ] Atualizar bases remotas e usar worktrees isolados na execução; preservar arquivos não relacionados e verificar alterações concorrentes da conversa original.
- [ ] Rodar todas as suites Node, builds e lint existente da captura. Reportar qualquer falha preexistente pelo nome, sem ocultá-la.
- [ ] Revisar isolamento, consentimento, origem de IP/geo, deduplicação, compatibilidade e migrações. Preparar PRs revisáveis e anexá-los ao chat.
- [ ] Publicar somente com autorização aplicável; confirmar o deploy ativo e arquivos servidos. Manter a ordem: relay compatível antes do novo produtor.
- [ ] Executar fluxo consentido de teste, observar aceite real da Meta e deduplicação. Não reenviar os Leads históricos.
- [ ] Consultar qualidade/cobertura por evento no pixel correto e registrar janela e amostra. Separar implementação concluída, entrega confirmada e EMQ observado; não declarar 9,0 sem a Meta retornar esse valor.

## Progresso

Plano preparado a partir da auditoria e dos contratos existentes. Nenhuma alteração de runtime, configuração Meta, schema ou publicação foi executada nesta etapa. Revisão do plano pelo usuário pendente, conforme gate do skill writing-plans.
