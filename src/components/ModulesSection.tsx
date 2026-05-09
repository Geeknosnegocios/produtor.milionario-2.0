import { Sparkles, Settings, Search, Lightbulb, FileText, Package, Megaphone } from "lucide-react";
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 px-2">
            3 Partes · 28 Módulos ·{" "}
            <span className="gradient-text">Cada Um Com Resultado em Minutos</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mt-4 px-4">
            Esquece "70 aulas pra assistir". Aqui cada módulo entrega RESULTADO. Soma tudo: 2h15 da ideia ao produto no ar.
          </p>
        </div>

        <div className="text-center mb-8 mt-12">
          <h3 className="text-xl md:text-2xl font-bold text-blue-400 mb-2">PARTE 1 — ERA IA (NOVO)</h3>
          <p className="text-sm text-muted-foreground">6 módulos · 24 aulas · todos com Claude</p>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "100ms" }}>
          <TrailSteps steps={eraIA.slice(0, 5)} showTimeEstimate={true} />
        </div>

        <div className="text-center mt-12 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <p className="text-xl md:text-2xl font-bold">
            <span className="gradient-text">👉 Soma: 2h15 da ideia ao produto no ar com Claude.</span>
          </p>
          <p className="text-sm md:text-base text-muted-foreground mt-2">
            Caminho crítico = 1 hora (M1+M3+M4+M5).
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-16">
          <div className="glass-card rounded-xl p-6 border border-blue-500/20">
            <h3 className="text-lg font-bold text-blue-400 mb-3">PARTE 2 — FUNDAMENTOS</h3>
            <p className="text-sm text-muted-foreground mb-4">6 módulos legado · 30 aulas</p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>✓ Boas Vindas</li>
              <li>✓ Checklist Notion GEEK</li>
              <li>✓ Mercado · Oferta</li>
              <li>✓ Agentes GPT (Bônus PRO)</li>
              <li>✓ Bônus VTURB (João Campos)</li>
            </ul>
          </div>

          <div className="glass-card rounded-xl p-6 border border-emerald-500/20">
            <h3 className="text-lg font-bold text-emerald-400 mb-3">PARTE 3 — AVANÇADO</h3>
            <p className="text-sm text-muted-foreground mb-4">16 módulos bônus</p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>✓ Elementor · CapCut · Quiz Interativo</li>
              <li>✓ Geek Track · Plugins · Deep Fake</li>
              <li>✓ Criativos IA · Recuperação Vendas</li>
              <li>✓ Facebook ADS · Análise Métricas</li>
              <li>✓ API · OOP · VIBE CODING</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
