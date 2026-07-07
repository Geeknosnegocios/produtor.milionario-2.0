# AGENTS.md — Produtor Milionário 2.0 (LP)

> **Read this first** se você é um agente operando nesse repo. Aqui tá o contexto, as convenções e as armadilhas que não dá pra descobrir só lendo o código.

## O que é esse projeto

Landing page de venda (Vite + React + TS) do curso **Produtor Milionário 2.0**, da Geek Academy. **Não é o LMS** (esse tá em outro repo: `geekacademy-v2`). Aqui é **a página que vende**.

- **Domínio prod:** `https://produtor.geekacademy.site`
- **Repo:** `github.com/Geeknosnegocios/produtor.milionario-2.0`
- **Deploy:** Vercel auto-deploy on push to `main`
- **Origem:** Lovable (project `42b60598-b3da-455d-83f4-0d3dbfcf1161`)

## Estado atual (2026-07-07)

- Preço: **R$ 247** (era R$ 147). Parcela 12x R$ 20,59. Commit `167b8b8`.
- Vídeo da página `/aula` (MicroVSL): **`KixSgwClqh4`**
- CAPI + Pixel + GTM funcionando com dedup
- Gravações das 22 aulas: 0/22 (pendente)
- Área de membros: pendente
- Downsell (slug Cakto `saide-2-0`): preço na Cakto precisa subir junto

## Quando alguém pedir algo aqui, sempre

1. **Ler `README.md`** primeiro — tem a estrutura, env vars, comandos, e a lista de onde o preço aparece (16 lugares)
2. **Verificar `git status`** antes de editar — saber se tá limpo
3. **NÃO mexer no `ExitIntentModal` linha 12 (`BACKREDIRECT_URL`)** sem perguntar — é o link do downsell
4. **NÃO mexer no `MICROVSL_VIDEO_ID` (Captura.tsx)** sem perguntar — config do hero da `/aula`
5. **PowerShell + git commit tem problema de encoding em `R$`** — usar arquivo temporário + `git commit -F arquivo` em vez de `-m "string"`
6. **NUNCA chamar `fbq` direto** — sempre usar helpers em `src/lib/tracking.ts`

## Convenções do repo

- 2 espaços de indentação
- Tailwind inline, sem CSS modules (só `index.css` global)
- Componentes em `src/components/` (PascalCase)
- Páginas em `src/pages/` (PascalCase)
- Constantes de config no topo do componente
- Conventional Commits em PT-BR
- Copy e comentários em PT-BR

## Onde mexer quando o preço mudar (16 lugares)

1. `src/lib/tracking.ts` — `trackLead` default + `trackViewContent`
2. `src/components/ValueSection.tsx` — `offerPrice` constante + textos (≈ 6 ocorrências)
3. `src/components/HeroSection.tsx` — tracking + 2 textos
4. `src/components/CTASection.tsx` — tracking + preço + parcela
5. `src/components/FixedCTA.tsx` — tracking + preço + parcela
6. `src/components/Header.tsx` — tracking + texto
7. `src/components/ExitIntentModal.tsx` — tracking + 2 textos (NÃO mexer no R$ 127 do backredirect)
8. `src/components/FAQSection.tsx` — pergunta + resposta
9. `src/components/DifferenceSection.tsx` — comparação
10. `src/components/PainPointsSection.tsx` — resultado
11. `src/components/TargetAudienceSection.tsx` — 3 ocorrências
12. `index.html` — meta description, og, twitter
13. `VSL-V3-4MIN.md` e `VSL-V2-ROTEIRO.md` — oferta no roteiro
14. `VSL-V3-APRESENTACAO.html` — preço mega + CTA
15. `conteudo/aulas/M1-1-mindset-produtor-2-0.html` — range didático
16. **Cakto** — o produto no checkout tem que estar no mesmo valor (CRÍTICO)

> Dica: `grep -rn "247\|20,59" src/ index.html VSL-*.md VSL-*.html` pra conferir o estado.

## Pendências

- Gravar as 22 aulas (status em `CHECKLIST-PRODUCAO.md`)
- Subir aulas na plataforma
- Configurar área de membros (LMS)
- A/B test dos 4 hooks da VSL V3 (winner em 5 dias)
- Decidir se downsell (slug `saide-2-0`) também sobe pra acompanhar preço

## Env vars

- Frontend: `VITE_SUPABASE_URL` (obrigatório)
- Vercel: `FB_CAPI_TOKEN` (obrigatório pro CAPI funcionar)
- Ver README pra detalhes
