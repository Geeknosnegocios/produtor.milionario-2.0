import { ChevronLeft, ChevronRight, Gift, Sparkles } from "lucide-react";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

import bonusCapcut from "@/assets/bonus-capcut.jpg";
import bonusElementor from "@/assets/bonus-elementor.jpg";
import bonusQuiz from "@/assets/bonus-quiz.jpg";
import bonusGeekSaas from "@/assets/bonus-geek-saas.jpg";
import { Button } from "./ui/button";

const bonuses = [
  {
    image: bonusQuiz,
    title: "🎯 Quiz Interativo Pago/Free",
    value: "R$ 297,00",
    description: "Quiz que captura lead e entrega resultado personalizado. Versão paga + free. Use em qualquer nicho."
  },
  {
    image: bonusCapcut,
    title: "🎬 Kit de Edição para Criativos",
    value: "R$ 197,00",
    description: "Templates CapCut prontos. Hooks visuais. Transições que param o scroll."
  },
  {
    image: bonusElementor,
    title: "📄 50 Templates de Página",
    value: "R$ 197,00",
    description: "50 páginas de venda que faturaram 7 dígitos. Modela a estrutura, troca o produto, lança."
  },
  {
    image: bonusGeekSaas,
    title: "🤝 Comunidade Geek Produtores 30d",
    value: "R$ 97,00",
    description: "Acesso à comunidade VIP por 30 dias. Tira dúvida, mostra produto, recebe feedback."
  },
  {
    image: bonusQuiz,
    title: "💎 100 Comandos Master Claude",
    value: "R$ 197,00",
    description: "100 comandos prontos pra Claude e ChatGPT fazerem pesquisa, copy, tráfego e design. Cola e executa."
  },
  {
    image: bonusElementor,
    title: "🔍 Auditoria Gravada da Sua Página",
    value: "R$ 497,00",
    description: "Você manda sua página depois de criar. Eu gravo vídeo de 15min apontando ajustes de copy, design e gatilhos."
  },
  {
    image: bonusGeekSaas,
    title: "🛠️ Templates Cakto Prontos pra Clonar",
    value: "R$ 297,00",
    description: "3 funis completos no Cakto (front + 5 OBs + 2 upsells) prontos pra clonar e adaptar pro seu produto."
  }
];

const BonusSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const totalValue = bonuses.reduce((acc, bonus) => {
    const value = parseFloat(bonus.value.replace('R$ ', '').replace('.', '').replace(',', '.'));
    return acc + value;
  }, 0);

  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px]" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-emerald-500/30 mb-6">
            <Gift className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold text-purple-300">Bônus Exclusivos</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
            🎁 7 Bônus Exclusivos — Liberados <span className="gradient-text">Hoje</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Valor total R$1.779 grátis com sua compra do Produtor 2.0
          </p>
        </div>

        {/* Carousel */}
        <div className="relative animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {bonuses.map((bonus, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
                >
                  <div className="group relative h-full">
                    {/* Gradient border on hover */}
                    <div className="absolute -inset-[1px] bg-gradient-to-br from-blue-500/0 to-emerald-500/0 group-hover:from-blue-500/50 group-hover:to-emerald-500/50 rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

                    <div className="relative glass-card rounded-2xl overflow-hidden h-full flex flex-col border border-white/5 group-hover:border-white/10 transition-all duration-300 hover:-translate-y-2">
                      {/* Image */}
                      <div className="relative h-36 md:h-44 overflow-hidden">
                        <img
                          src={bonus.image}
                          alt={bonus.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />

                        {/* Free badge */}
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[10px] md:text-xs font-bold shadow-[0_0_20px_rgba(34,197,94,0.5)]">
                          GRÁTIS
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 md:p-5 flex-1 flex flex-col">
                        <h3 className="text-base md:text-lg font-bold mb-1.5 text-white group-hover:text-cyan-300 transition-colors duration-300">
                          {bonus.title}
                        </h3>

                        <p className="text-muted-foreground line-through text-xs md:text-sm mb-2">
                          {bonus.value}
                        </p>

                        <p className="text-muted-foreground leading-relaxed flex-1 text-xs md:text-sm">
                          {bonus.description}
                        </p>

                        {/* Decorative line */}
                        <div className="mt-3 pt-3 border-t border-white/5">
                          <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full opacity-50 group-hover:opacity-100 group-hover:w-full transition-all duration-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
            {/* Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-emerald-500/20 to-blue-500/20 rounded-xl md:rounded-2xl blur-xl" />

            <div className="relative glass-card border border-blue-500/30 rounded-xl md:rounded-2xl p-5 md:p-8">
              <div className="flex items-center justify-center gap-2 mb-2 md:mb-3">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                <p className="text-sm md:text-base text-muted-foreground">Valor Total dos Bônus</p>
              </div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold gradient-text">
                R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BonusSection;
