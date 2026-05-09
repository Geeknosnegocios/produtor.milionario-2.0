## Objetivo
Deixar a seção com ícones mais estilosa convertendo listas distribuídas em containers padronizados de Card, com visual "glass", borda suave, ícones claros e tipografia consistente em mobile.

## Componentes Alvo
- Hero (benefícios com ícones) em src/components/HeroSection.tsx
- Prova Social (itens de evidência) em src/components/ProofSection.tsx:15–27
- Dor/Solução (duas colunas com ícones) em src/components/PainPointsSection.tsx:29–63

## Design
- Card com fundo `bg-card/80`, `backdrop-blur`, `rounded-2xl`, `card-glow`, `border border-primary/20`
- Ícones dentro de círculos `bg-primary/15` com cor de `primary` ou `destructive`, conforme a coluna
- Itens em grid responsivo (1 coluna no mobile, 2 em md+) com `gap-3`
- Tipografia: `text-sm` mobile, `text-base` md+

## Técnica
1. Criar `IconListCard` em `src/components/ui/icon-list-card.tsx`:
   - Props: `title?: string`, `items: { icon: ReactNode; text: string }[]`, `tone?: "primary" | "destructive"`, `className?`
   - Render: Card + optional título + map de itens com ícone e texto
2. Substituir listas existentes:
   - Hero: envolver os 3 benefícios em um `IconListCard` tone `primary` abaixo do CTA
   - Prova Social: trocar os blocos individuais por um único `IconListCard` com `proofItems` (src/components/ProofSection.tsx:15–27)
   - Dor/Solução: renderizar dois `IconListCard`s, um `destructive` (painPoints) e outro `primary` (solutions) (src/components/PainPointsSection.tsx:29–63)
3. Importar e aplicar variantes shadcn (`Card`, `Badge`) onde preciso para manter consistência

## Acessibilidade
- Ícones com `aria-hidden="true"`
- Títulos de cards como headings (`h3`) com hierarquia correta
- Contraste mantido via design tokens atuais

## Responsividade
- Mobile: 1 coluna, `text-sm`, `gap-3` e paddings reduzidos
- md+: 2 colunas, `text-base`, paddings regulares

## Verificação
- Visual em 360x640 e 414x896 sem overflow
- Checar que os textos não cortam e a navegação continua fluida

## Entregáveis
- Novo `IconListCard` reutilizável
- Hero, Prova Social e Dor/Solução atualizados para o novo estilo
- Padronização visual com shadcn Card/Badge
