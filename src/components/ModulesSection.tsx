import {
  Activity,
  BarChart3,
  Boxes,
  Code2,
  FileText,
  Gem,
  HelpCircle,
  Layout,
  LayoutGrid,
  Leaf,
  Lightbulb,
  Megaphone,
  Package,
  Puzzle,
  RotateCw,
  ScanFace,
  Scissors,
  Search,
  Server,
  Settings,
  Sparkles,
  Waves,
} from "lucide-react";
import { TrailSteps } from "./ui/trail-steps";

const currentModules = [
  {
    number: "M1",
    title: "Fundação",
    lessons: 5,
    icon: <Settings className="w-full h-full" />,
    description: "Mindset, setup e visão do processo do produtor.",
  },
  {
    number: "M2",
    title: "Pesquisa de Nicho e Produto",
    lessons: 1,
    icon: <Search className="w-full h-full" />,
    description: "Leitura de mercado, demanda e escolha do produto.",
  },
  {
    number: "M3",
    title: "Produto e Funil",
    lessons: 1,
    icon: <Lightbulb className="w-full h-full" />,
    description: "Anatomia do low ticket e estrutura da oferta.",
  },
  {
    number: "M4",
    title: "Copy e Oferta",
    lessons: 1,
    icon: <FileText className="w-full h-full" />,
    description: "Copy, níveis de consciência, mecanismo e CTA.",
  },
  {
    number: "M5",
    title: "Estrutura Própria",
    lessons: 3,
    icon: <Layout className="w-full h-full" />,
    description: "Página, GitHub, Vercel, domínio e deploy.",
  },
  {
    number: "M6",
    title: "Geek Track: Tracking Avançado",
    lessons: 14,
    icon: <Server className="w-full h-full" />,
    description: "Pixel, GTM, CAPI server-side, webhooks e IA para auditoria.",
  },
  {
    number: "M7",
    title: "Facebook Ads",
    lessons: 4,
    icon: <Megaphone className="w-full h-full" />,
    description: "Contingência, criativos, testes e escala.",
  },
  {
    number: "M8",
    title: "Análise de Métricas",
    lessons: 2,
    icon: <BarChart3 className="w-full h-full" />,
    description: "Leitura de dados e plano de ação.",
  },
  {
    number: "M9",
    title: "Recuperação com N8N",
    lessons: 8,
    icon: <RotateCw className="w-full h-full" />,
    description: "Automação, recuperação e acompanhamento de vendas.",
  },
  {
    number: "M10",
    title: "Vibe Coding",
    lessons: 13,
    icon: <Code2 className="w-full h-full" />,
    description: "Criação de aplicações, integrações e deploy com IA.",
  },
];

const legacyModules = [
  "Bônus Oferta: João Campos",
  "Bônus Plugins",
  "Bônus Curso Elementor",
  "Checklist Notion GEEK",
  "Agentes GPT GEEK",
  "Mercado",
  "Oferta",
  "Estrutura de Copy VSL",
  "Estrutura Própria VSL",
  "Estrutura Própria Typebot",
  "Estratégias Orgânicas",
  "Recuperação de Vendas",
  "Quiz Interativo PAGO/FREE",
  "Biblioteca de materiais e templates",
];

const advancedTools = [
  { name: "Elementor", Icon: Layout },
  { name: "CapCut", Icon: Scissors },
  { name: "Quiz", Icon: HelpCircle },
  { name: "Tracking", Icon: Activity },
  { name: "CAPI + IA", Icon: Server },
  { name: "Plugins", Icon: Puzzle },
  { name: "Criativos IA", Icon: Sparkles },
  { name: "Recovery", Icon: RotateCw },
  { name: "FB ADS", Icon: Megaphone },
  { name: "Métricas", Icon: BarChart3 },
  { name: "API", Icon: Code2 },
  { name: "Vibe Coding", Icon: Waves },
  { name: "Estrutura", Icon: LayoutGrid },
  { name: "Deep Fake", Icon: ScanFace },
  { name: "Sofisticar", Icon: Gem },
  { name: "Orgânicas", Icon: Leaf },
  { name: "OOP", Icon: Boxes },
];

const currentTrail = currentModules.slice(0, 5).map((module) => ({
  icon: module.icon,
  title: `${module.number} · ${module.title}`,
  subtitle: `${module.lessons} ${module.lessons === 1 ? "aula" : "aulas"}`,
}));

const ModulesSection = () => {
  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-blue-500/40 mb-6">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-300">10 módulos atuais · 14 blocos legado</span>
          </div>
          <h2 className="ty-h2 mb-6 px-2">
            A trilha completa do produtor{" "}
            <span className="text-blue-400">do primeiro produto ao tracking</span>
          </h2>
          <p className="ty-lead mt-4 px-4">
            A trilha atual reúne 10 módulos e 52 aulas. O conteúdo legado fica organizado abaixo como biblioteca de aprofundamento.
          </p>
        </div>

        <div className="relative rounded-[28px] border border-blue-500/25 bg-[#0E0F11] p-6 sm:p-8 lg:p-10 mt-12 hover:border-blue-500/40 transition-colors duration-500">
          <span className="absolute -top-4 left-6 inline-flex items-center px-4 py-1.5 rounded-full border border-blue-500/40 bg-[#0E0F11] text-xs sm:text-sm text-blue-300 font-mono tracking-tight">
            TRILHA ATUAL <span className="ml-1.5 text-blue-400 font-bold">(2026)</span>
          </span>

          <div className="relative pt-4 pb-2 px-2 rounded-2xl bg-gradient-to-br from-blue-950/30 to-[#0B0C0E] border border-white/[0.06] overflow-hidden mb-8 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <TrailSteps steps={currentTrail} showTimeEstimate={true} />
          </div>

          <h3 className="ty-h3 mt-2">Era IA</h3>
          <p className="text-sm sm:text-base text-blue-400 font-mono mt-1">10 módulos atuais · 52 aulas</p>
          <p className="ty-body mt-3 max-w-[68ch]">
            Da pesquisa de nicho à publicação, tracking e leitura de métricas. O novo Geek Track inclui CAPI server-side, deduplicação por event_id e IA para auditar eventos e payloads.
          </p>

          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentModules.map((module) => (
              <div key={module.number} className="flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                <div className="mt-0.5 h-8 w-8 shrink-0 rounded-lg border border-blue-500/30 bg-blue-500/10 p-2 text-blue-300">
                  {module.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono text-blue-400">{module.number}</span>
                    <h4 className="text-sm font-semibold text-white">{module.title}</h4>
                  </div>
                  <p className="mt-1 text-xs font-mono text-blue-300/80">{module.lessons} {module.lessons === 1 ? "aula" : "aulas"}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/55">{module.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-2xl border border-blue-400/30 bg-blue-500/[0.08] p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/15">
                <Server className="h-5 w-5 text-blue-300" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-blue-300">NOVO MÓDULO · GEEK TRACK</p>
                <h4 className="mt-1 text-lg sm:text-xl font-semibold text-white">Tracking Server-Side com CAPI e IA</h4>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">
                  13 aulas para entender Pixel, GTM e CAPI, configurar eventos server-side, deduplicar com event_id, integrar webhook de compra e validar tudo no Events Manager.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-[28px] border border-white/[0.08] bg-[#0E0F11] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.03] text-xs sm:text-sm text-white/65 font-mono">
                BIBLIOTECA LEGADO
              </span>
              <h3 className="mt-5 text-2xl sm:text-3xl text-white tracking-tighter font-medium">Aprofundamento e materiais anteriores</h3>
              <p className="mt-2 text-sm sm:text-base text-white/55 max-w-[68ch]">
                Conteúdos preservados para quem quer estudar fundamentos, ferramentas e operações anteriores com mais profundidade.
              </p>
            </div>
            <span className="text-sm font-mono text-blue-300">14 blocos</span>
          </div>

          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {legacyModules.map((module, index) => (
              <div key={module} className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
                <span className="text-xs font-mono text-white/30">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-sm text-white/65">{module}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {advancedTools.map(({ name, Icon }) => (
            <span key={name} className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] sm:text-xs rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-300 font-mono">
              <Icon className="h-3 w-3" aria-hidden="true" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
