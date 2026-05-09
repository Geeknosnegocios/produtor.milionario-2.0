import { useEffect, useRef, useState } from "react";
import { Search, Lightbulb, FileText, Package, Megaphone, Sparkles, Clock, Terminal } from "lucide-react";

const steps = [
  {
    id: 1,
    label: "P",
    name: "/pesquisar-nicho",
    title: "Pesquisa de Nicho",
    description: "Claude varre Meta Ads Library em 30 segundos. Mostra exatamente quais nichos estão pagando agora, com prova viva de demanda.",
    duration: "30 segundos",
    icon: Search,
    output: "Nicho validado com prova de mercado",
  },
  {
    id: 2,
    label: "I",
    name: "/criar-lowticket",
    title: "Ideação do Produto",
    description: "Você descreve a dor. Claude monta produto + funil + persona + headline + 7 ângulos de copy. Tudo estruturado, pronto pra executar.",
    duration: "2 minutos",
    icon: Lightbulb,
    output: "Briefing completo + funil + persona",
  },
  {
    id: 3,
    label: "P",
    name: "/AGENTE-PAGINA",
    title: "Página de Vendas",
    description: "HTML completo com copy black, hero, prova social, value stack, garantia e CTAs prontos. Mobile-first, otimizado pra conversão.",
    duration: "5 minutos",
    icon: FileText,
    output: "Página HTML pronta pra deploy",
  },
  {
    id: 4,
    label: "E",
    name: "/AGENTE-ENTREGAS",
    title: "Entregáveis",
    description: "PDF do produto + planilhas + scripts WhatsApp + lista de contatos. Tudo formatado, pronto pra enviar ao cliente após o Pix.",
    duration: "10 minutos",
    icon: Package,
    output: "PDF + planilha + scripts copia-cola",
  },
  {
    id: 5,
    label: "A",
    name: "/criativo-ad",
    title: "Anúncios Meta",
    description: "17 ângulos de criativo testados, cada um com hook 3s + caption + CTA. Vídeo + carrossel + estática. Cola na campanha.",
    duration: "15 minutos",
    icon: Megaphone,
    output: "17 criativos prontos pra subir",
  },
];

const VibeCodingSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [progressHeight, setProgressHeight] = useState(0);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    let triggered = false;
    const fire = () => {
      if (triggered) return;
      triggered = true;
      setProgressHeight(100);
      steps.forEach((_, i) => {
        setTimeout(() => setActiveStep(i + 1), 400 + i * 600);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) fire();
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(node);

    // Fallback: if section already visible on mount, fire immediately
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setTimeout(fire, 100);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="border-white/[0.06] border-t pt-24 pb-24 px-4 relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px]" />
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[140px]" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <p className="ty-eyebrow mb-4">
            <Terminal className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />
            Método Proprietário
          </p>
          <h2 className="ty-h2 mb-6">
            Método <span className="text-blue-400 font-medium">PIPE-IA</span>
          </h2>
          <p className="max-w-2xl mx-auto ty-lead">
            5 passos. 1 comando cada. Você não decora método, você executa em comando.{" "}
            <span className="text-white">Claude faz o trabalho duro. Você apenas orquestra.</span>
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative" ref={containerRef}>
          {/* Center progress line · desktop only */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-1 bg-white/10 rounded-full overflow-hidden hidden lg:block">
            <div
              className="w-full bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.6)]"
              style={{
                height: `${progressHeight}%`,
                transition: "height 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            />
          </div>

          {/* Mobile vertical line · left side */}
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-white/10 rounded-full overflow-hidden lg:hidden">
            <div
              className="w-full bg-gradient-to-b from-blue-400 to-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              style={{
                height: `${progressHeight}%`,
                transition: "height 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            />
          </div>

          <div className="space-y-12 lg:space-y-16">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              const isActive = activeStep > index;
              const Icon = step.icon;

              return (
                <div
                  key={step.id}
                  className="relative flex flex-col lg:flex-row gap-6 lg:gap-12 items-start lg:items-center pl-12 lg:pl-0"
                  style={{
                    opacity: isActive ? 1 : 0.35,
                    transform: isActive ? "translateY(0)" : "translateY(20px)",
                    transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {/* LEFT slot */}
                  <div className="flex-1 lg:text-right lg:pr-12 w-full">
                    {isLeft && <StepCard step={step} Icon={Icon} alignRight />}
                  </div>

                  {/* Center dot */}
                  <div
                    className="absolute lg:relative left-1 lg:left-auto top-2 lg:top-auto w-9 h-9 lg:w-14 lg:h-14 z-10 flex-shrink-0 rounded-full"
                    style={{
                      background: isActive
                        ? "linear-gradient(135deg, #60A5FA, #3B82F6)"
                        : "rgba(255,255,255,0.08)",
                      border: isActive ? "2px solid rgba(96,165,250,0.4)" : "2px solid rgba(255,255,255,0.1)",
                      transform: isActive ? "scale(1)" : "scale(0.8)",
                      opacity: isActive ? 1 : 0.5,
                      boxShadow: isActive ? "0 0 25px rgba(59,130,246,0.6), 0 0 50px rgba(59,130,246,0.25)" : "none",
                      transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-base lg:text-2xl text-white font-mono font-black">
                      {step.label}
                    </span>
                  </div>

                  {/* RIGHT slot */}
                  <div className="flex-1 lg:pl-12 w-full">
                    {!isLeft && <StepCard step={step} Icon={Icon} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom summary */}
        <div className="text-center mt-20 animate-slide-up" style={{ animationDelay: "300ms" }}>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-500/10 border border-blue-500/30 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm sm:text-base text-white/70">
              Soma dos 5 passos:
            </span>
            <span className="text-sm sm:text-base text-white/30 line-through font-mono">60 dias</span>
            <span className="text-blue-400">→</span>
            <span className="text-sm sm:text-base text-blue-300 font-mono font-semibold">1 hora com Claude</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Reusable step card
const StepCard = ({ step, Icon, alignRight = false }: { step: typeof steps[0]; Icon: typeof Search; alignRight?: boolean }) => {
  return (
    <div className="group relative rounded-3xl border border-white/[0.08] bg-[#0E0F11] p-8 sm:p-10 hover:border-blue-500/30 transition-colors duration-500">
      {/* Subtle glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-500/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className={`flex gap-3 mb-6 items-center ${alignRight ? "lg:justify-end" : ""}`}>
        <span className="uppercase text-sm font-mono text-blue-400/80 tracking-[0.18em] font-semibold">
          Passo {step.id.toString().padStart(2, "0")}
        </span>
        <div className="h-px flex-1 bg-white/[0.06]"></div>
      </div>

      <div className={`flex items-center gap-5 mb-6 ${alignRight ? "lg:flex-row-reverse" : ""}`}>
        <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_25px_rgba(59,130,246,0.2)]">
          <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-blue-400" strokeWidth={1.75} />
        </div>
        <div className={alignRight ? "lg:text-right" : ""}>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl text-white font-medium tracking-tight mb-1">
            {step.title}
          </h3>
          <code className="text-sm lg:text-base text-blue-300/80 font-mono">{step.name}</code>
        </div>
      </div>

      <p className={`text-base sm:text-lg text-white/65 leading-relaxed mb-6 ${alignRight ? "lg:text-right" : ""}`}>
        {step.description}
      </p>

      <div className={`flex flex-wrap gap-3 items-center ${alignRight ? "lg:justify-end" : ""}`}>
        <div className="flex items-center gap-2 text-sm text-blue-400/90 font-mono px-3 py-1.5 rounded-md bg-blue-500/10 border border-blue-500/20">
          <Clock className="w-3.5 h-3.5" />
          {step.duration}
        </div>
        <div className="text-xs sm:text-sm text-white/40 font-mono">
          → {step.output}
        </div>
      </div>
    </div>
  );
};

export default VibeCodingSection;
