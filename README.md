# Produtor Milionário 2.0 — Landing Page

Landing page de vendas do curso **Produtor Milionário 2.0 — LowTicket com Claude**.

**Preço atual:** R$ 247 à vista ou 12x de R$ 20,59 sem juros.
**Checkout:** Cakto (`pay.geekacademy.site/c/produtor-milion-rio-2-0-up`)
**Domínio produção:** `https://produtor.geekacademy.site` (Vercel)
**Origem:** Lovable (project `42b60598-b3da-455d-83f4-0d3dbfcf1161`)
**Repo:** `github.com/Geeknosnegocios/produtor.milionario-2.0`

---

## Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui** (Radix primitives)
- **TanStack Query**
- **React Router DOM v6**
- **Deploy:** Vercel (SPA + Edge Function `/api/capi`)
- **Tracking:** Meta Pixel + GTM + CAPI server-side com dedup por `event_id`

---

## Setup local

```bash
npm install
npm run dev      # http://localhost:8080
npm run build    # build de produção
npm run preview  # serve o build local
npm run lint     # eslint
```

> Requer Node 20+. Recomendado usar `nvm`.

---

## Variáveis de ambiente

### Frontend (Vite — prefixo `VITE_`)

| Var | Obrigatório | Descrição |
|---|---|---|
| `VITE_SUPABASE_URL` | sim | URL do projeto Supabase (ex: `https://xxx.supabase.co`) |

### Vercel (server-side, em **Project Settings → Environment Variables**)

| Var | Obrigatório | Descrição |
|---|---|---|
| `FB_CAPI_TOKEN` | **sim** | Token de acesso da Meta Conversions API. Se faltar, `/api/capi` retorna 500 silencioso. |
| `FB_PIXEL_ID` | não | Override do pixel ID (default: `2072830730255789`) |

---

## Rotas

| Path | Página | Função |
|---|---|---|
| `/` | `Index.tsx` | LP principal com VSL + 14 seções de venda |
| `/upsell` | `Upsell.tsx` | Upsell 1 |
| `/upsell-2` | `Upsell2.tsx` | Upsell 2 |
| `/aula` e `/captura` | `Captura.tsx` | Página de captura da aula grátis (leva pro grupo WhatsApp) |
| `/obrigado` | `Obrigado.tsx` | Thank you page |

---

## Estrutura

```
src/
├── App.tsx                # Rotas
├── main.tsx               # Entry
├── pages/
│   ├── Index.tsx          # LP principal
│   ├── Captura.tsx        # Página de captura (rota /aula e /captura)
│   ├── Upsell.tsx         # Upsell 1
│   ├── Upsell2.tsx        # Upsell 2
│   ├── Obrigado.tsx       # Thank you
│   └── NotFound.tsx
├── components/
│   ├── HeroSection.tsx
│   ├── ProofSection.tsx
│   ├── ModulesSection.tsx
│   ├── PainPointsSection.tsx
│   ├── VibeCodingSection.tsx
│   ├── TestimonialsSection.tsx
│   ├── DifferenceSection.tsx
│   ├── TargetAudienceSection.tsx
│   ├── BonusSection.tsx
│   ├── ValueSection.tsx       # ← preço e value stack (CENTRALIZAR preço aqui)
│   ├── GuaranteeSection.tsx
│   ├── AuthorSection.tsx
│   ├── FAQSection.tsx
│   ├── ContactSection.tsx
│   ├── CTASection.tsx         # CTA final
│   ├── FixedCTA.tsx           # CTA fixo no scroll
│   ├── ExitIntentModal.tsx    # Popup quando o mouse sai pelo topo (downsell R$127)
│   ├── Header.tsx
│   └── Footer.tsx
├── lib/
│   ├── tracking.ts        # Pixel + CAPI + GTM helpers
│   └── utils.ts
├── hooks/
└── assets/                # imagens, logos, capas

api/
└── capi.ts                # Vercel serverless function · Meta CAPI relay

conteudo/aulas/            # 22 slides HTML do curso (abrir em F, gravar)
├── M1-1-mindset-produtor-2-0.html
├── M1-2-setup-antigravity-claude.html
└── ... (22 arquivos)

VSL-V3-4MIN.md             # Roteiro VSL 4 min (default · winner)
VSL-V2-ROTEIRO.md          # Roteiro VSL V2 (5-6 min, mais longo)
VSL-V3-APRESENTACAO.html   # Versão HTML da VSL V3 (slides)
CHECKLIST-PRODUCAO.md      # 22 aulas · 6 módulos · status gravação
```

---

## Tracking — Configuração séria

Esse projeto tem **setup profissional** de tracking (CAPI + Pixel + GTM com dedup). Não remover sem entender.

### IDs hardcoded

- **Meta Pixel:** `2072830730255789` (FPM2)
- **GTM Container:** `GTM-N393KNX3`
- **Pixel padrão em `/api/capi`:** `2072830730255789`

### Fluxo de dedup

1. Usuário faz ação → `fireEvent()` no `tracking.ts`
2. Gera `event_id` (UUID)
3. Dispara `fbq('track', ...)` com `{ eventID }` (browser)
4. Dispara `dataLayer.push` (GTM)
5. POSTa pra `/api/capi` com **mesmo `event_id`** (server-side)
6. Meta deduplica → 1 evento, não 2

### Eventos disparados

| Evento | Onde | `source` |
|---|---|---|
| `ViewContent` | Mount da `Index.tsx` | (sem source) |
| `InitiateCheckout` | Hero, Header, FixedCTA, ValueSection, CTASection, ExitIntentModal | hero/header/fixed-cta/value-section/cta-section/exit-modal |
| `Lead` | ExitIntentModal "gift", Captura | (default) |

### `source` (custom data)

Rastreia **qual botão** gerou o InitiateCheckout. Permite analisar conversão por CTA. Ver `tracking.ts → trackInitiateCheckout`.

### Test mode

```js
localStorage.setItem('fb_test_event_code', 'TEST12345')
```

Aparece no Meta Events Manager → Test Events.

---

## Preço — onde centralizar

> O preço **NÃO** tá em variável única. Está hardcoded em vários lugares.

Quando mudar de preço, atualizar:

1. **`src/lib/tracking.ts`** — `trackLead` value default + `trackViewContent` value
2. **`src/components/ValueSection.tsx`** — `offerPrice` (constante), JSX, e os 9 textos
3. **`src/components/HeroSection.tsx`** — tracking + 2 textos
4. **`src/components/CTASection.tsx`** — tracking + texto + parcela
5. **`src/components/FixedCTA.tsx`** — tracking + texto + parcela
6. **`src/components/Header.tsx`** — tracking + texto
7. **`src/components/ExitIntentModal.tsx`** — tracking + 2 textos (NÃO mexer no R$ 127 do backredirect)
8. **`src/components/FAQSection.tsx`** — pergunta + resposta
9. **`src/components/DifferenceSection.tsx`** — "R$ X vs R$ 1.997+"
10. **`src/components/PainPointsSection.tsx`** — resultado
11. **`src/components/TargetAudienceSection.tsx`** — 3 ocorrências
12. **`index.html`** — meta description, og:description, twitter:description
13. **`VSL-V3-4MIN.md`** e **`VSL-V2-ROTEIRO.md`** — oferta no roteiro
14. **`VSL-V3-APRESENTACAO.html`** — preço mega + CTA
15. **`conteudo/aulas/M1-1-mindset-produtor-2-0.html`** — range didático "R$ 27-R$ X"
16. **Cakto** — o produto no checkout tem que estar no mesmo valor (CRÍTICO)

> **Cuidado:** o parcelamento (12x) precisa ser recalculado. Para R$ 247 → 12x de R$ 20,59. Para R$ 147 era R$ 14,87 (que era inconsistente: 14,87 × 12 = 178, não 147). Corrigido em 2026-07-07.

---

## Downsell (ExitIntentModal)

Quando o usuário fecha o popup pelo **X**, é redirecionado pra:
```
https://pay.geekacademy.site/c/produtor-milion-rio-2-0-up?o=saide-2-0
```

Esse é o **downsell** (slug `saide-2-0`). Estava em R$ 127 hardcoded nos comentários, mas **a URL não tem preço** — o preço fica configurado na Cakto. Se for ajustar, mudar lá.

---

## Comandos úteis

```bash
# Dev
npm run dev

# Build local
npm run build

# Lint
npm run lint

# Push (deploy via Vercel auto)
git push origin main

# Buscar preço em todos os lugares
grep -rn "147\|14,87" src/ index.html VSL-*.md VSL-*.html
```

---

## Pendências (do projeto)

- [ ] Gravar as 22 aulas (status: 0/22 — ver `CHECKLIST-PRODUCAO.md`)
- [ ] Subir aulas na plataforma (Cakto ou área de membros)
- [ ] Configurar área de membros (LMS)
- [ ] Decidir se downsell (slug `saide-2-0`) também sobe pra acompanhar preço
- [ ] A/B test dos 4 hooks da VSL V3 (winner em 5 dias)

---

## Convenções

- **Identação:** 2 espaços
- **Estilo:** Tailwind classes inline (não tem CSS modules além do `index.css`)
- **Componentes:** PascalCase, em `src/components/`
- **Constantes de copy/config:** no topo do componente ou em `src/lib/`
- **Tracking:** sempre usar helpers de `src/lib/tracking.ts` (nunca chamar `fbq` direto)
- **Commits:** Conventional Commits (`feat:`, `fix:`, `chore:`)
- **Idioma:** PT-BR em copy e comentários
