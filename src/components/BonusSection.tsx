import { ChevronLeft, ChevronRight, Gift, Sparkles, FileText, Video, Layout, Users, Bot, Search, Wrench, Cpu } from "lucide-react";
import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { Button } from "./ui/button";

import bonusQuiz from "@/assets/bonus-quiz.jpg";
import bonusCapcut from "@/assets/bonus-capcut.jpg";
import bonusElementor from "@/assets/bonus-elementor.jpg";
import bonusComunidade from "@/assets/bonus-comunidade.jpg";
import bonusComandos from "@/assets/bonus-comandos.jpg";
import bonusAuditoria from "@/assets/bonus-auditoria.jpg";
import bonusCakto from "@/assets/bonus-cakto.jpg";
import bonusGeekSaas from "@/assets/bonus-geek-saas.jpg";

const bonuses = [
  {
    image: bonusQuiz,
    icon: FileText,
    title: "Quiz Interativo Pago/Free",
    value: "R$ 297,00",
    description: "Quiz que captura lead e entrega resultado personalizado. Versão paga + free. Use em qualquer nicho."
  },
  {
    image: bonusCapcut,
    icon: Video,
    title: "Kit de Edição para Criativos",
    value: "R$ 197,00",
    description: "Templates CapCut prontos. Hooks visuais. Transições que param o scroll."
  },
  {
    image: bonusElementor,
    icon: Layout,
    title: "50 Templates de Página",
    value: "R$ 197,00",
    description: "50 páginas de venda que faturaram 7 dígitos. Modela a estrutura, troca o produto, lança."
  },
  {
    image: bonusComunidade,
    icon: Users,
    title: "Comunidade Geek Produtores 30d",
    value: "R$ 97,00",
    description: "Acesso à comunidade VIP por 30 dias. Tira dúvida, mostra produto, recebe feedback."
  },
  {
    image: bonusComandos,
    icon: Bot,
    title: "100 Comandos Master Claude",
    value: "R$ 197,00",
    description: "100 comandos prontos pra Claude e ChatGPT fazerem pesquisa, copy, tráfego e design. Cola e executa."
  },
  {
    image: bonusAuditoria,
    icon: Search,
    title: "Auditoria Gravada da Sua Página",
    value: "R$ 497,00",
    description: "Você manda sua página depois de criar. Eu gravo vídeo de 15min apontando ajustes de copy, design e gatilhos."
  },
  {
    image: bonusCakto,
    icon: Wrench,
    title: "Templates Cakto Prontos pra Clonar",
    value: "R$ 297,00",
    description: "3 funis completos no Cakto (front + 5 OBs + 2 upsells) prontos pra clonar e adaptar pro seu produto."
  },
  {
    image: bonusGeekSaas,
    icon: Cpu,
    title: "Geek SAAS",
    value: "R$ 1.997,00",
    description: "Construa sua base de produto digital sem escrever uma linha de código · gere front-end, back-end, autenticação e deploy automático com templates inteligentes de IA."
  }
];

const BonusSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: true,
    },
    [
      AutoScroll({
        playOnInit: true,
        speed: 0.8,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        startDelay: 1000,
      })
    ]
  );

  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      const autoScroll = emblaApi.plugins()?.autoScroll;
      autoScroll?.stop();
      emblaApi.scrollPrev();
      setTimeout(() => autoScroll?.play(), 3000);
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      const autoScroll = emblaApi.plugins()?.autoScroll;
      autoScroll?.stop();
      emblaApi.scrollNext();
      setTimeout(() => autoScroll?.play(), 3000);
    }
  }, [emblaApi]);

  const totalValue = bonuses.reduce((acc, bonus) => {
    const value = parseFloat(bonus.value.replace('R$ ', '').replace('.', '').replace(',', '.'));
    return acc + value;
  }, 0);

  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-blue-500/30 mb-6">
            <Gift className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-purple-300">Bônus Exclusivos</span>
          </div>
          <h2 className="ty-h2 mb-6">
            🎁 8 Bônus Exclusivos · Liberados <span className="text-blue-400">Hoje</span>
          </h2>
          <p className="ty-lead">
            Valor total R$3.776 grátis com sua compra do Produtor 2.0
          </p>
        </div>

        {/* Carousel */}
        <div className="relative animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {bonuses.map((bonus, index) => {
                const Icon = bonus.icon;
                return (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
                >
                  <div className="group relative h-full">
                    {/* Gradient border on hover */}
                    <div className="absolute -inset-[1px] bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/60 group-hover:to-blue-400/40 rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

                    <div className="relative bg-[#0E0F11] rounded-2xl overflow-hidden h-full flex flex-col border border-blue-500/10 group-hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-2">
                      {/* Real image hero */}
                      <div className="relative h-44 md:h-48 overflow-hidden bg-gradient-to-br from-blue-950/40 to-[#0B0C0E]">
                        <img
                          src={bonus.image}
                          alt={bonus.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Bottom gradient fade */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F11] via-[#0E0F11]/30 to-transparent pointer-events-none" />

                        {/* Number badge */}
                        <div className="absolute top-3 left-3 font-mono text-xs text-blue-300 bg-[#0E0F11]/80 backdrop-blur-sm border border-blue-500/30 rounded-md px-2 py-1">
                          {String(index + 1).padStart(2, '0')}/08
                        </div>

                        {/* Icon mini badge bottom-left */}
                        <div className="absolute bottom-3 left-3 w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                          <Icon className="w-4 h-4 text-blue-300" strokeWidth={2} />
                        </div>

                        {/* Free badge */}
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-blue-500 text-white text-[10px] md:text-xs font-bold shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                          GRÁTIS
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 md:p-5 flex-1 flex flex-col">
                        <h3 className="text-base md:text-lg font-bold mb-1.5 text-white group-hover:text-blue-300 transition-colors duration-300">
                          {bonus.title}
                        </h3>

                        <p className="text-white/40 line-through text-xs md:text-sm mb-2 font-mono">
                          {bonus.value}
                        </p>

                        <p className="text-white/55 leading-relaxed flex-1 text-xs md:text-sm">
                          {bonus.description}
                        </p>

                        {/* Decorative line */}
                        <div className="mt-3 pt-3 border-t border-blue-500/10">
                          <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full opacity-50 group-hover:opacity-100 group-hover:w-full transition-all duration-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </div>

          {/* Navigation buttons */}
          <Button
            variant="glass"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex hover:border-blue-500/50"
            onClick={scrollPrev}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="glass"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex hover:border-blue-500/50"
            onClick={scrollNext}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Total value card */}
        <div className="mt-8 md:mt-12 text-center animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="relative inline-block">
            {/* Outer glow */}
            <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/30 via-blue-400/30 to-blue-600/30 rounded-3xl blur-3xl opacity-70" />
            <div className="absolute -inset-3 bg-gradient-to-r from-blue-500/40 to-blue-400/40 rounded-3xl blur-xl" />

            <div className="relative bg-[#0E0F11] border border-blue-500/40 rounded-3xl px-8 sm:px-16 lg:px-24 py-10 sm:py-12 lg:py-14 shadow-[0_0_60px_rgba(59,130,246,0.25)]">
              {/* Top eyebrow */}
              <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
                <div className="h-px w-8 bg-blue-500/40"></div>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                <p className="text-xs sm:text-sm text-blue-400 uppercase font-mono tracking-[0.18em] font-semibold">
                  Valor Total dos Bônus
                </p>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                <div className="h-px w-8 bg-blue-500/40"></div>
              </div>

              {/* Main value */}
              <p className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-white tracking-tighter text-center leading-none">
                R$ <span className="bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent">{totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </p>

              {/* Bottom badge */}
              <div className="mt-6 sm:mt-8 flex items-center justify-center gap-3 flex-wrap">
                <div className="px-4 py-2 rounded-full bg-blue-500/15 border border-blue-500/40 backdrop-blur-sm">
                  <span className="text-xs sm:text-sm text-blue-300 font-mono uppercase tracking-wider font-semibold">100% GRÁTIS HOJE</span>
                </div>
                <div className="text-xs sm:text-sm text-white/50 font-mono">
                  com sua compra do Produtor 2.0
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BonusSection;
