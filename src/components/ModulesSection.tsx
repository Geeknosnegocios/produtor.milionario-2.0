import { Sparkles, Settings, Search, Lightbulb, FileText, Package, Megaphone, Layout, Scissors, HelpCircle, Activity, Puzzle, ScanFace, RotateCw, Gem, Leaf, BarChart3, Code2, Boxes, Waves, LayoutGrid } from "lucide-react";
import { TrailSteps } from "./ui/trail-steps";

const eraIA = [
  { icon: <Settings className="w-full h-full" />, title: "M1 · Sistema do Produtor 2026", subtitle: "Sistema instalado em 15 min" },
  { icon: <Search className="w-full h-full" />, title: "M2 · Validação de Nicho", subtitle: "Nicho validado em 30 min" },
  { icon: <Lightbulb className="w-full h-full" />, title: "M3 · Modelagem de Produto", subtitle: "Produto modelado em 20 min" },
  { icon: <FileText className="w-full h-full" />, title: "M4 · Copy + Página", subtitle: "Página criada em 25 min" },
  { icon: <Package className="w-full h-full" />, title: "M5 · Cakto + Deploy", subtitle: "Funil pronto em 30 min" },
  { icon: <Megaphone className="w-full h-full" />, title: "M6 · Tráfego + Escala", subtitle: "Primeiro criativo em 15 min" },
];

const ModulesSection = () => {
  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-blue-500/40 mb-6">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-300">3 Partes · 28 Módulos · 70+ Aulas</span>
          </div>
          <h2 className="ty-h2 mb-6 px-2">
            3 Partes · 28 Módulos ·{" "}
            <span className="text-blue-400">Cada Um Com Resultado em Minutos</span>
          </h2>
          <p className="ty-lead mt-4 px-4">
            Esquece "70 aulas pra assistir". Aqui cada módulo entrega RESULTADO. Soma tudo: 2h15 da ideia ao produto no ar.
          </p>
        </div>

        {/* PARTE 1 · ERA IA · card wrapper */}
        <div className="relative rounded-[28px] border border-blue-500/25 bg-[#0E0F11] p-6 sm:p-8 lg:p-10 mt-12 hover:border-blue-500/40 transition-colors duration-500">
          <span className="absolute -top-4 left-6 inline-flex items-center px-4 py-1.5 rounded-full border border-blue-500/40 bg-[#0E0F11] text-xs sm:text-sm text-blue-300 font-mono tracking-tight">
            PARTE 1 · ERA IA <span className="ml-1.5 text-blue-400 font-bold">(NOVO)</span>
          </span>

          {/* Trail visual · mantido como veio */}
          <div className="relative pt-4 pb-2 px-2 rounded-2xl bg-gradient-to-br from-blue-950/30 to-[#0B0C0E] border border-white/[0.06] overflow-hidden mb-8 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <TrailSteps steps={eraIA.slice(0, 5)} showTimeEstimate={true} />
          </div>

          {/* Title + meta + description */}
          <h3 className="ty-h3 mt-2">Era IA</h3>
          <p className="text-sm sm:text-base text-blue-400 font-mono mt-1">
            6 módulos · 24 aulas · todos com Claude
          </p>
          <p className="ty-body mt-3 max-w-[60ch]">
            O coração novo do curso. Da pesquisa de nicho ao tráfego escalado, cada módulo entrega resultado em minutos, não em meses. Soma do caminho crítico: <span className="text-blue-300 font-medium">1 hora</span> da ideia ao produto no ar.
          </p>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              'Sistema',
              'Validação',
              'Modelagem',
              'Copy + Página',
              'Cakto + Deploy',
              'Tráfego',
            ].map((tag) => (
              <span key={tag} className="px-2.5 py-1 text-[10px] sm:text-xs rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-300 font-mono">
                {tag}
              </span>
            ))}
          </div>

          {/* Footer summary line */}
          <div className="mt-6 pt-5 border-t border-blue-500/15 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs sm:text-sm text-blue-400/80 font-mono">
              CAMINHO CRÍTICO
            </span>
            <span className="text-sm sm:text-base text-white/70 font-mono">
              <span className="line-through text-white/30">60 dias</span>
              <span className="mx-2 text-blue-400">→</span>
              <span className="text-blue-300 font-semibold">1 hora com Claude</span>
            </span>
          </div>
        </div>

        {/* Header divider · "Bibliotecas inclusas" */}
        <div className="flex gap-6 items-center mt-24 mb-2 animate-slide-up">
          <h2 className="ty-h2">
            Bibliotecas inclusas.
          </h2>
          <span aria-hidden="true" className="hidden md:block w-px bg-white/10 h-12"></span>
          <p className="ty-lead mt-1 hidden md:block">
            Tudo que você precisa, num só lugar
          </p>
        </div>
        <div className="h-px bg-white/[0.06] mt-4"></div>

        {/* 2 visual cards · Parte 2 + Parte 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 mt-12 items-stretch">

          {/* PARTE 2 · FUNDAMENTOS */}
          <div className="lg:col-span-6 relative rounded-[28px] border border-white/[0.08] bg-[#0E0F11] p-6 sm:p-8 hover:border-blue-500/30 transition-colors duration-500 h-full flex flex-col group">
            <span className="absolute -top-4 left-6 inline-flex items-center px-4 py-1.5 rounded-full border border-blue-500/30 bg-[#0E0F11] text-xs sm:text-sm text-blue-300 font-mono tracking-tight">
              PARTE 2 · FUNDAMENTOS
            </span>

            {/* Visual: Notion-style checklist mockup */}
            <div className="relative h-48 sm:h-56 rounded-2xl bg-gradient-to-br from-blue-950/40 to-[#0B0C0E] border border-white/[0.06] overflow-hidden p-4 sm:p-5">
              <div className="bg-[#0B0C0E] border border-white/10 rounded-xl p-4 w-full shadow-2xl">
                {/* Notion header */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.06]">
                  <div className="w-2 h-2 rounded-full bg-red-400/60"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-400/60"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400/60"></div>
                  <span className="ml-2 text-[10px] text-white/40 font-mono">checklist-notion-geek.md</span>
                </div>
                {/* Checklist items */}
                {[
                  { txt: 'Boas Vindas', done: true, w: '60%' },
                  { txt: 'Checklist Notion GEEK', done: true, w: '75%' },
                  { txt: 'Mercado · Oferta', done: true, w: '55%' },
                  { txt: 'Agentes GPT (Bônus PRO)', done: false, w: '70%' },
                  { txt: 'Bônus VTURB · João Campos', done: false, w: '80%' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 mb-2 last:mb-0">
                    <div className={`w-3 h-3 rounded border ${item.done ? 'bg-blue-500 border-blue-400' : 'border-white/20'} flex items-center justify-center flex-shrink-0`}>
                      {item.done && <svg className="w-2 h-2 text-white" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10" style={{ width: item.w }}></div>
                    <div className="ml-auto text-[8px] text-white/30 font-mono">M{i + 1}</div>
                  </div>
                ))}
                {/* Progress badge */}
                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[10px] text-white/40 font-mono">3 de 6 concluídos</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-1/2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="text-[10px] text-blue-400 font-mono">50%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Copy */}
            <h3 className="mt-6 text-2xl sm:text-3xl text-white tracking-tighter font-medium">
              Fundamentos
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-blue-400 font-mono">
              6 módulos legado · 30 aulas
            </p>
            <p className="mt-3 text-sm sm:text-base text-white/60 max-w-[52ch] tracking-tight">
              Toda base que você precisa: produto, mercado, oferta, agentes GPT e VSL. Conteúdo testado em mais de 1.000 alunos.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {['Boas Vindas', 'Notion GEEK', 'Mercado', 'Oferta', 'Agentes GPT', 'VTURB'].map((tag) => (
                <span key={tag} className="px-2.5 py-1 text-[10px] rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-300 font-mono">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* PARTE 3 · AVANÇADO */}
          <div className="lg:col-span-6 relative rounded-[28px] border border-white/[0.08] bg-[#0E0F11] p-6 sm:p-8 hover:border-blue-500/30 transition-colors duration-500 h-full flex flex-col group">
            <span className="absolute -top-4 left-6 inline-flex items-center px-4 py-1.5 rounded-full border border-blue-500/30 bg-[#0E0F11] text-xs sm:text-sm text-blue-300 font-mono tracking-tight">
              PARTE 3 · AVANÇADO
            </span>

            {/* Visual: Tools grid mockup */}
            <div className="relative h-48 sm:h-56 rounded-2xl bg-gradient-to-br from-blue-950/40 to-[#0B0C0E] border border-white/[0.06] overflow-hidden p-4 sm:p-5">
              <div className="grid grid-cols-4 gap-2 h-full">
                {[
                  { name: 'Elementor', Icon: Layout },
                  { name: 'CapCut', Icon: Scissors },
                  { name: 'Quiz', Icon: HelpCircle },
                  { name: 'Tracking', Icon: Activity },
                  { name: 'Plugins', Icon: Puzzle },
                  { name: 'Deep Fake', Icon: ScanFace },
                  { name: 'Criativos IA', Icon: Sparkles },
                  { name: 'Recovery', Icon: RotateCw },
                  { name: 'Sofisticar', Icon: Gem },
                  { name: 'Orgânicas', Icon: Leaf },
                  { name: 'FB ADS', Icon: Megaphone },
                  { name: 'Métricas', Icon: BarChart3 },
                  { name: 'API', Icon: Code2 },
                  { name: 'OOP', Icon: Boxes },
                  { name: 'VIBE', Icon: Waves },
                  { name: 'Estrutura', Icon: LayoutGrid },
                ].map((tool, i) => {
                  const Icon = tool.Icon;
                  return (
                    <div
                      key={i}
                      className="bg-white/[0.04] border border-white/[0.08] rounded-md flex flex-col items-center justify-center hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-300 group/tool"
                      title={tool.name}
                    >
                      <Icon className="w-4 h-4 text-blue-400 group-hover/tool:scale-110 transition-transform duration-300" strokeWidth={1.75} />
                    </div>
                  );
                })}
              </div>

              <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-blue-500/15 border border-blue-500/30">
                <span className="text-[9px] text-blue-300 font-mono">16 TOOLS</span>
              </div>
            </div>

            {/* Copy */}
            <h3 className="mt-6 text-2xl sm:text-3xl text-white tracking-tighter font-medium">
              Avançado
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-blue-400 font-mono">
              16 módulos bônus
            </p>
            <p className="mt-3 text-sm sm:text-base text-white/60 max-w-[52ch] tracking-tight">
              Tudo que você precisa pra dominar o mercado depois do primeiro produto: tráfego, criativos, automações, hacks.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {['Elementor', 'CapCut', 'Quiz', 'Tracking', 'Deep Fake', 'FB ADS', '+10'].map((tag) => (
                <span key={tag} className="px-2.5 py-1 text-[10px] rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-300 font-mono">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
