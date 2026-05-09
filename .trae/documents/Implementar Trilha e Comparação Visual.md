## Objetivo
Aplicar o estilo de “trilha” à seção Nova Era do Desenvolvimento e ao Método, e refatorar a comparação para um layout com dois cards e barras de custo/tempo, seguindo os prints.

## Componentes Novos
- TrailSteps (src/components/ui/trail-steps.tsx)
  - Props: steps[{ icon, title, subtitle }], badgeLabel?, tone("primary"|"secondary"), orientation("horizontal"|"vertical")
  - Render: cards com ícone e índice (01…05) conectados por um caminho SVG com gradiente.
- MetricBar (src/components/ui/metric-bar.tsx)
  - Props: label, valueLabel, valuePercent, tone("success"|"danger"|"primary")
  - Render: barra com gradiente, label à esquerda e valor à direita.
- PerformanceComparison (src/components/PerformanceComparison.tsx)
  - Dois cards: “Desenvolvimento Tradicional” (danger) e “No‑Code & Vibe Coding” (primary)
  - Cada card usa ícone grande, texto de apoio e duas MetricBars (Custo e Tempo), com badges (“Tradicional” / “60% a 90% OFF”).

## Atualizações de Seções
- VibeCodingSection (Nova Era do Desenvolvimento)
  - Substituir o bloco atual por TrailSteps com 5 etapas: Entendemos a dor → Proposta → Vibe Coding → Entrega → Suporte.
  - Manter título e subtítulo, adicionar badge “Nossa Metodologia”.
- ModulesSection (O Método)
  - Reaproveitar TrailSteps com etapas mais voltadas ao método Produtor Milionário (Ideia → Validação → Construção com IA → Lançamento → Escala).
- ComparisonSection
  - Substituir conteúdo por PerformanceComparison com os dois cards do print e barras de custo/tempo.

## Estilo e Utilitários
- CSS utilitário para trilha: stroke gradiente (SVG), marcadores discretos, vidro (glass) com backdrop‑blur, cantos arredondados e borda suave.
- Responsividade: horizontal em desktop, vertical/empilhado em mobile (TrailSteps com orientation automático).
- Acessibilidade: headings semânticos, ícones com aria-hidden, cores com contraste.

## Verificação
- Validar em 360x640 e 1280x800; sem overflow, textos legíveis, barras proporcionalmente visíveis.
- Checar consistência com shadcn (Card/Badge) já presentes.

## Entregáveis
- Novos arquivos: ui/trail-steps.tsx, ui/metric-bar.tsx, PerformanceComparison.tsx
- Seções atualizadas: VibeCodingSection, ModulesSection, ComparisonSection
- CSS utilitário leve para gradientes e glass, reaproveitando estilos existentes.