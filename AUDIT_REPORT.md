# Auditoria LP Produtor Milionário 2.0

**Data:** 2026-07-07
**Autor:** Mavis (auditoria manual após plan `plan_8634cb4b` abortar)
**Status:** Relatório de findings — nenhuma edição foi feita

---

## Resumo executivo

A LP está **estruturalmente bem** (preço novo bem propagado, tracking funcionando, vídeo da /aula OK), mas tem **3 inconsistências críticas** que precisam de decisão antes de qualquer campanha forte de tráfego:

1. 🔴 **Value stack NÃO fecha**: itens somam R$ 7.361, mas a LP diz R$ 5.773 e o FixedCTA diz R$ 5.364. **Três números diferentes no mesmo ecossistema.**
2. 🔴 **ExitIntentModal reporta InitiateCheckout com value: 197** (downsell), poluindo a métrica do produto principal.
3. 🟡 **canonical + og:image apontam pra `produtormilionario2.com`**, mas o domínio em produção é `produtor.geekacademy.site`. SEO canônico errado.

Total de issues: **3 críticas, 2 médias, 0 menores**.

---

## 1. Consistência de preço

- **Ocorrências de "247":** 69
- **Ocorrências de "20,59":** (somadas no total)
- **Ocorrências de "147" stale:** 0 em código/VSL/conteúdo (apenas em `AGENTS.md` e `README.md`, que são docs históricos — OK)

✅ Preço novo (R$ 247 / 12x R$ 20,59) **bem propagado** em todos os pontos de copy e tracking.

---

## 2. Inconsistências numéricas

### 🔴 CRÍTICO — Value stack com 3 valores diferentes

| Onde | Valor |
|---|---|
| `src/components/ValueSection.tsx` (soma real dos itens) | **R$ 7.361** |
| `src/components/ValueSection.tsx` (display "R$ 5.773") | R$ 5.773 |
| `VSL-V2-ROTEIRO.md` linha 137 | R$ 5.773 |
| `VSL-V3-4MIN.md` linha 102 | R$ 5.773 |
| `VSL-V3-APRESENTACAO.html` linha 421 | R$ 5.773 |
| `src/components/FixedCTA.tsx` linha 93 | **R$ 5.364** (sem origem aparente) |

**Itens em `valueItems` array (ValueSection.tsx):**

| Item | value |
|---|---|
| Curso Era IA | 1.997 |
| Curso Fundamentos | 497 |
| 16 Módulos Avançado | 497 |
| 8 Bônus Exclusivos | 3.776 |
| Acesso Vitalício | 497 |
| Comunidade Geek Produtores | 97 |
| **TOTAL** | **7.361** |

**Diagnóstico:** A LP inteira diz R$ 5.773 (em 4 lugares), mas a soma real é R$ 7.361. **O anchor está errado pra baixo** (5.773 em vez de 7.361). Pior: o FixedCTA tem um terceiro valor (5.364) que não corresponde a nada.

**Opções de fix (decisão do Andrey):**
- A) Atualizar tudo pra R$ 7.361 (soma real) — anchor mais forte, copy honesta
- B) Ajustar os items do array pra fechar em R$ 5.773 — anchor mantido, mas precisa decidir qual item diminuir
- C) Verificar se tem item "Escondido" que deveria entrar/sair do array (provavelmente algum foi removido sem atualizar soma)

**Recomendação:** opção A (anchor maior = mais persuasivo).

### 🟡 MÉDIO — Parcelamento 12x R$ 20,59 = 247,08 ≠ 247,00

Cálculo: 12 × 20,59 = 247,08. Diferença de 8 centavos. Cliente atento pode notar.

**Fix:** ou usar 12x R$ 20,58 (= 246,96, faltam 4 centavos), ou 12x R$ 20,59 (sobra 8 centavos). 20,59 é padrão de checkout BR.

**Decisão:** manter 20,59 (já é a escolha atual, sobra de 8 centavos é invisível na conversão).

---

## 3. Tracking CAPI / Pixel / GTM

### Pixel ID, GTM, CAPI: ✅ corretos
- Pixel `2072830730255789` (FPM2) hardcoded
- GTM `GTM-N393KNX3` hardcoded
- CAPI endpoint `/api/capi` existe
- Dedup por `event_id` UUID funcionando

### 🔴 CRÍTICO — ExitIntentModal reporta `InitiateCheckout` com value errado

**Arquivo:** `src/components/ExitIntentModal.tsx` linha 18

```tsx
trackInitiateCheckout({ value: 197, source: 'exit-modal' })
```

**Problema:** o exit modal vende o **downsell** (R$ 197, não R$ 247), mas está disparando `InitiateCheckout` com value 197. Isso bagunça a métrica:
- No Meta Events Manager, "InitiateCheckout" vai misturar R$ 247 (produto principal) e R$ 197 (downsell)
- A otimização de campanha do Meta vai usar o valor médio errado pra fase de aprendizado
- A análise de CVR por source fica inconsistente (exit-modal tem ticket menor)

**Correção recomendada:**
- Opção A: trocar `trackInitiateCheckout` por `trackCustomEvent` (sai do evento padrão, vira custom)
- Opção B: trocar `trackInitiateCheckout` por `trackLead` (sai de InitiateCheckout, vira Lead)
- Opção C: manter `trackInitiateCheckout` mas com value: 247 (preço do produto, mesmo a URL sendo downsell — vai dar mismatch com Cakto, não recomendo)

**Recomendação:** opção A (custom event), é o mais limpo. O exit modal é uma decisão de compra diferente do CTA principal.

### ✅ Os outros 5 InitiateCheckout estão OK
- HeroSection, Header, FixedCTA, CTASection, ValueSection: todos com value: 247

---

## 4. SEO / Social

### 🟡 MÉDIO — canonical e og:image apontam pro domínio errado

**Arquivo:** `index.html`

```html
<link rel="canonical" href="https://produtormilionario2.com" />
<meta property="og:image" content="https://produtormilionario2.com/og-image.jpg" />
<meta name="twitter:image" content="https://produtormilionario2.com/og-image.jpg" />
```

**Problema:** o `AGENTS.md` diz que o domínio em produção é `https://produtor.geekacademy.site`. Se o `produtormilionario2.com` NÃO está mais em produção, o canonical tá apontando pro lugar errado e o Google pode indexar o domínio morto.

**Decisão necessária:**
- Se `produtormilionario2.com` está morto/redirect → atualizar tudo pra `https://produtor.geekacademy.site`
- Se `produtormilionario2.com` está vivo (mirror) → adicionar `<link rel="alternate">` ou canonicalizar pro principal

### ✅ Outras meta tags OK
- og:title, og:description (atualizados pra R$ 247), twitter:card, twitter:title, twitter:description

---

## 5. Vídeo / Página /aula

### ✅ Tudo OK
- `Captura.tsx` linha 7: `MICROVSL_VIDEO_ID = "KixSgwClqh4"` ✅ preenchido
- `Captura.tsx` linha 9: `PRESENTE_VIDEO_EMBED = "https://www.youtube.com/embed/KixSgwClqh4"` ✅ preenchido
- Ambos apontam pro mesmo vídeo (intencional, conforme decidido)

---

## 6. Downsell (ExitIntentModal)

### ✅ Comportamento correto (mas tracking está errado — ver §3)
- URL: `https://pay.geekacademy.site/c/produtor-milion-rio-2-0-up?o=saide-2-0` (BACKREDIRECT_URL)
- Comentários dizem R$ 197 (não R$ 127 como eu havia assumido na seção anterior)
- Quando o user clica no botão "QUERO O BÔNUS" do modal → vai pro checkout de saída (downsell)
- Quando o user clica no X → vai pro mesmo checkout de saída

**Atualizar AGENTS.md:** meu commit anterior errou (coloquei "R$ 127" no AGENTS, mas o downsell é R$ 197).

---

## 7. Pendências conhecidas

| Item | Status |
|---|---|
| Preço R$ 247 aplicado | ✅ Completo |
| Vídeo /aula configurado | ✅ Completo (KixSgwClqh4) |
| README + AGENTS.md | ✅ Completo |
| Cakto `perpetuo-fpm2-0` precisa estar em R$ 247 | ❓ Verificar na Cakto (fora do código) |
| Cakto `saide-2-0` precisa estar em R$ 197 | ❓ Verificar na Cakto |
| Gravações 22 aulas | ⏳ 0/22 |
| Área de membros | ⏳ Pendente |
| A/B test 4 hooks VSL V3 | ⏳ Pendente |

---

## Top 5 issues a corrigir (por impacto)

1. 🔴 **Value stack inconsistente** — quebra credibilidade, expõe o vendedor. Decisão: 7.361 ou ajustar array.
2. 🔴 **ExitIntentModal trackInitiateCheckout value: 197** — polui métrica do Meta, prejudica otimização de campanha.
3. 🟡 **canonical + og:image domínio errado** — SEO, pode estar indexando URL morta.
4. 🟡 **AGENTS.md diz "R$ 127" mas o real é R$ 197** — memory drift, futuro agente fica confuso.
5. ℹ️ (não issue) **Verificar Cakto** se o produto principal tá em R$ 247 e o downsell em R$ 197.

---

## Ações sugeridas (em ordem de prioridade)

1. **Decidir entre opção A ou B do value stack** (1 min de decisão, ~30 min de fix)
2. **Trocar `trackInitiateCheckout` → `trackCustomEvent` no ExitIntentModal** (1 linha)
3. **Atualizar canonical e og:image** pra `https://produtor.geekacademy.site` (2 linhas)
4. **Atualizar AGENTS.md** pra refletir downsell R$ 197 (não R$ 127)
5. **Verificar Cakto** (não é código, é fora do repo)
