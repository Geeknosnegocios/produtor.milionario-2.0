import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { TrendingUp, Rocket, Sparkles, MessageSquare } from "lucide-react";

import testimonial1 from "@/assets/testimonials/testimonial-1.png";
import testimonial2 from "@/assets/testimonials/testimonial-2.png";
import testimonial3 from "@/assets/testimonials/testimonial-3.png";
import testimonial4 from "@/assets/testimonials/testimonial-4.png";
import testimonial5 from "@/assets/testimonials/testimonial-5.png";

const testimonials = [
  { image: testimonial1, alt: "Depoimento de aluno - Murilo Costa" },
  { image: testimonial2, alt: "Depoimento de aluno - Andrews Formighieri" },
  { image: testimonial3, alt: "Depoimento de aluno - Andrews Formighieri parte 2" },
  { image: testimonial4, alt: "Depoimento de aluno - Produtos validados" },
  { image: testimonial5, alt: "Depoimento de aluno - Marcos comissões" },
];

const stats = [
  { icon: TrendingUp, value: "+R$ 200k", label: "Faturamento acumulado" },
  { icon: Rocket, value: "Ofertas", label: "Lançadas com IA" },
  { icon: Sparkles, value: "100%", label: "Criados do zero" },
];

const TestimonialsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
    },
    [
      AutoScroll({
        playOnInit: true,
        speed: 1,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      })
    ]
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi]);

  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-12 md:mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-blue-500/30 mb-6">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-cyan-300">Prova Social</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 px-4">
            Resultados reais{" "}
            <span className="gradient-text">vêm de oferta no ar</span>
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground px-4">
            👉 Aqui você aprende a criar, publicar e vender infoprodutos com IA em menos tempo.
          </p>
        </div>

        <div className="overflow-hidden animate-slide-up" style={{ animationDelay: "100ms" }} ref={emblaRef}>
          <div className="flex gap-4 md:gap-6">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={index}
                className="flex-[0_0_auto] w-[280px] sm:w-[300px] md:w-[350px]"
              >
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.alt}
                      className="w-full h-auto rounded-xl border border-white/10 shadow-lg group-hover:border-blue-500/50 transition-all duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 mt-8 md:mt-12 animate-slide-up overflow-x-auto" style={{ animationDelay: "200ms" }}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass-card border border-white/5 hover:border-blue-500/30 rounded-lg md:rounded-xl px-4 md:px-6 py-3 md:py-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
            >
              <div className="flex items-center justify-center gap-1.5 md:gap-2 mb-0.5 md:mb-1">
                <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                <div className="text-base md:text-xl font-bold neon-text">{stat.value}</div>
              </div>
              <div className="text-[10px] md:text-xs text-muted-foreground whitespace-nowrap">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
