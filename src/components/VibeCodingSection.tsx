import { Search, Lightbulb, FileText, Package, Megaphone, Sparkles } from "lucide-react";
import { TrailSteps } from "./ui/trail-steps";

const benefits = [
  "Você não decora método. Executa em comando.",
  "Cada passo = 1 skill que faz o trabalho duro.",
  "Você apenas orquestra.",
];

const VibeCodingSection = () => {
  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px]" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-emerald-500/40 mb-6">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-300">Método Proprietário</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 px-4">
            Método <span className="gradient-text">PIPE-IA</span> — 5 Passos · 1 Comando Cada
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
            Você não decora método. Você executa em comando. Cada passo é uma skill que faz o trabalho duro com Claude.
          </p>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "100ms" }}>
          <TrailSteps
            badgeLabel="Comando:"
            steps={[
              { icon: <Search className="w-full h-full" />, title: "/pesquisar-nicho", subtitle: "Meta Ads em 30s" },
              { icon: <Lightbulb className="w-full h-full" />, title: "/criar-lowticket", subtitle: "Produto em 2 min" },
              { icon: <FileText className="w-full h-full" />, title: "/AGENTE-PAGINA", subtitle: "HTML em 5 min" },
              { icon: <Package className="w-full h-full" />, title: "/AGENTE-ENTREGAS", subtitle: "PDF em 10 min" },
              { icon: <Megaphone className="w-full h-full" />, title: "/criativo-ad", subtitle: "17 ângulos prontos" },
            ]}
          />
        </div>

        <div className="text-center space-y-3 mt-12 animate-slide-up" style={{ animationDelay: "200ms" }}>
          {benefits.map((benefit, index) => (
            <p key={index} className="text-base md:text-lg text-muted-foreground">
              {benefit}
            </p>
          ))}
        </div>

        <div className="text-center mt-10 animate-slide-up" style={{ animationDelay: "300ms" }}>
          <p className="text-lg md:text-xl font-bold">
            👉 Soma dos 5 passos:{" "}
            <span className="text-muted-foreground line-through">60 dias</span> →{" "}
            <span className="gradient-text">1 hora com Claude.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default VibeCodingSection;
