import { Button } from "@/components/ui/button";
import { BookmarkButton } from "@/components/ui/bookmark-button";
import { ArrowRight, Shield, Zap, Infinity as InfinityIcon, Sparkles, CreditCard, Clock, Users, Lock } from "lucide-react";

const CTASection = () => {
  const handleCTA = () => {
    import("@/lib/tracking").then(({ trackInitiateCheckout }) => trackInitiateCheckout({ value: 147, source: 'cta-section' }));
    window.open("https://pay.cakto.com.br/y2pgfgv_879248", "_blank");
  };

  return (
    <section className="border-white/[0.06] border-t pt-20 pb-24 md:pt-24 md:pb-32 px-4 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-blue-500/12 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-400/6 rounded-full blur-[120px]" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="relative">
          {/* Animated outer glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/30 via-blue-400/30 to-blue-600/30 rounded-[2rem] blur-2xl animate-pulse-glow"></div>

          {/* Solid frame */}
          <div className="relative rounded-3xl border border-blue-500/40 bg-[#0E0F11] overflow-hidden">

            {/* Top live bar */}
            <div className="bg-gradient-to-r from-red-500/15 via-orange-500/15 to-red-500/15 border-b border-orange-500/20 px-4 py-2.5 flex items-center justify-center gap-3 flex-wrap text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-red-300 font-mono uppercase tracking-wider font-bold">AO VIVO</span>
              </div>
              <span className="text-white/60">·</span>
              <span className="text-white/70">
                <Users className="inline w-3 h-3 mr-1 -mt-0.5" />
                117 vendo agora
              </span>
              <span className="text-white/60">·</span>
              <span className="text-white/70">
                <Clock className="inline w-3 h-3 mr-1 -mt-0.5" />
                Maria de Belo Horizonte acabou de comprar
              </span>
            </div>

            <div className="p-6 sm:p-10 md:p-14 lg:p-16">

              {/* Eyebrow */}
              <div className="flex justify-center mb-6 animate-slide-up">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border border-blue-500/40">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="ty-eyebrow font-bold">Sua decisão · agora</span>
                </div>
              </div>

              {/* Headline */}
              <h2 className="ty-h2 text-center mb-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
                Você Tá a <span className="text-blue-400">1 Hora</span>
                <br className="hidden sm:block" />
                {" "}do Seu Primeiro Produto
                <br className="hidden md:block" />
                {" "}<span className="text-blue-400">LowTicket No Ar</span>
              </h2>

              {/* Sub progression */}
              <div className="text-center mb-10 animate-slide-up" style={{ animationDelay: "150ms" }}>
                <div className="inline-flex items-center gap-2 sm:gap-3 flex-wrap justify-center text-sm sm:text-base lg:text-lg text-white/50 font-mono">
                  <span>Próximo botão</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-400/60" />
                  <span className="text-white/80">Cakto</span>
                  <span className="text-white/30">·</span>
                  <span>1 minuto</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-400/60" />
                  <span className="text-white/80">Login</span>
                  <span className="text-white/30">·</span>
                  <span>1 hora</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-400/60" />
                  <span className="text-blue-300 font-bold">Produto vendendo</span>
                </div>
              </div>

              {/* Massive price */}
              <div className="text-center mb-3 animate-slide-up" style={{ animationDelay: "200ms" }}>
                <p className="text-xs text-blue-400 uppercase font-mono tracking-[0.2em] mb-1">Por apenas</p>
                <div className="flex items-baseline justify-center gap-1 mb-1">
                  <span className="text-3xl sm:text-4xl text-blue-300 font-light">R$</span>
                  <span className="text-7xl sm:text-8xl md:text-9xl font-black bg-gradient-to-br from-blue-300 via-blue-400 to-blue-600 bg-clip-text text-transparent leading-none tracking-tighter">
                    147
                  </span>
                </div>
                <p className="text-sm text-white/50 mt-2">
                  ou <strong className="text-blue-300 font-mono">12x R$ 14,87</strong> sem juros
                </p>
              </div>

              {/* CTA Mega · Bookmark style */}
              <div className="mb-10 mt-8 animate-slide-up flex justify-center" style={{ animationDelay: "300ms" }}>
                <BookmarkButton
                  size="xl"
                  onClick={handleCTA}
                  text={
                    <>
                      <span className="sm:hidden">PRODUTO EM 1 HORA</span>
                      <span className="hidden sm:inline">QUERO MEU PRODUTO VENDENDO EM 1 HORA</span>
                    </>
                  }
                  sub="acesso liberado em 1 minuto · garantia tripla"
                  className="animate-pulse-glow"
                />
              </div>

              {/* 4 Feature cards · refined */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: "400ms" }}>
                {[
                  { icon: Zap, title: "Acesso Imediato", subtitle: "Login em 1 minuto" },
                  { icon: Shield, title: "Garantia Resultado", subtitle: "Não de reembolso" },
                  { icon: InfinityIcon, title: "Acesso Vitalício", subtitle: "Sem renovação" },
                  { icon: CreditCard, title: "12x R$14,87", subtitle: "Sem juros · Pix · Cartão" },
                ].map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="group relative rounded-xl bg-blue-500/[0.04] border border-blue-500/15 p-3 sm:p-4 hover:bg-blue-500/[0.08] hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div className="flex flex-col items-center text-center gap-2">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
                          <Icon className="w-5 h-5 text-blue-300" strokeWidth={1.75} />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-white leading-tight">{feature.title}</p>
                          <p className="text-[10px] sm:text-xs text-white/45 mt-0.5">{feature.subtitle}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Trust badges row · scrollable on mobile */}
              <div className="pt-6 border-t border-white/[0.06] animate-slide-up overflow-x-auto" style={{ animationDelay: "500ms" }}>
                <div className="flex items-center justify-center gap-x-3 sm:gap-x-5 text-[10px] sm:text-xs text-white/40 font-mono whitespace-nowrap min-w-min">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <Lock className="w-3 h-3 text-blue-400 flex-shrink-0" />
                    <span>SSL 256-bit</span>
                  </div>
                  <span className="text-white/20">·</span>
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <Shield className="w-3 h-3 text-blue-400 flex-shrink-0" />
                    <span>Cakto seguro</span>
                  </div>
                  <span className="text-white/20">·</span>
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <CreditCard className="w-3 h-3 text-blue-400 flex-shrink-0" />
                    <span>Pix · Cartão</span>
                  </div>
                  <span className="text-white/20">·</span>
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <Sparkles className="w-3 h-3 text-blue-400 flex-shrink-0" />
                    <span>Garantia tripla</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
