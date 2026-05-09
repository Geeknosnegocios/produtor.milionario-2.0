import testimonial1 from "@/assets/testimonials/testimonial-1.png";
import testimonial2 from "@/assets/testimonials/testimonial-2.png";
import testimonial3 from "@/assets/testimonials/testimonial-3.png";
import testimonial4 from "@/assets/testimonials/testimonial-4.png";
import testimonial5 from "@/assets/testimonials/testimonial-5.png";

const testimonials = [
  {
    image: testimonial1,
    rating: "5.0",
    quote: "Cara, não é puxa-saco. Você tá disparado como um dos melhores mentores do digital. Concordo e assino embaixo.",
    name: "Murilo Costa",
    date: "Mar 2026",
    revenue: "R$ 12.4k",
  },
  {
    image: testimonial2,
    rating: "5.0",
    quote: "Vai ser no YouTube mesmo? Precisamos nos inscrever! Conteúdo de outro nível. YouTube + Instagram + dia a dia + vídeo semanal.",
    name: "Andrews Formighieri",
    date: "Fev 2026",
    revenue: "R$ 8.7k",
  },
  {
    image: testimonial3,
    rating: "5.0",
    quote: "Boa noite irmão, venho te falar que vocês acertaram na oferta. Já está rodando. Agora só preciso escalar.",
    name: "Aluno verificado",
    date: "Fev 2026",
    revenue: "R$ 27.3k",
  },
  {
    image: testimonial4,
    rating: "4.9",
    quote: "Roubei a conversa que fala sobre os produtos validados. Os meus produtos estão validados também. Agora é vender.",
    name: "Cliente validado",
    date: "Jan 2026",
    revenue: "R$ 5.2k",
  },
  {
    image: testimonial5,
    rating: "5.0",
    quote: "Valeu demais Geek, me ajudou a destravar no digital. 100% válido o investimento na mentoria! Bora caralho, só o começo papai!",
    name: "Marcos · Lastlink",
    date: "Jan 2026",
    revenue: "R$ 18.9k",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="overflow-hidden bg-[#080A0F] pt-32 pb-32 relative" id="reviews">
      {/* Giant Background Text */}
      <div className="absolute top-[8%] left-0 right-0 w-full text-center pointer-events-none select-none z-0">
        <h2 className="text-[18vw] font-bold tracking-tighter text-white/[0.03] leading-none whitespace-nowrap">
          Resultados Reais
        </h2>
      </div>

      <div className="md:px-12 z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto px-6 relative items-end">

        {/* Left Controls/Info */}
        <div className="lg:col-span-4 flex flex-col h-full justify-start">
          <div className="mt-4 mb-8">
            <span className="ty-eyebrow mb-6 block">
              [ +1.000 ALUNOS REAIS ]
            </span>
            <h2 className="ty-h2 mb-6">
              Quem já fez<br />
              <span className="text-blue-400">primeiro Pix.</span>
            </h2>
            <p className="ty-lead max-w-md">
              Resultados reais de alunos que executaram o método PIPE-IA.
              Conversas autênticas via WhatsApp, sem montagem, sem ator.
            </p>

            <div className="mt-10 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-sm text-white/50 font-mono">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                Atualizado em tempo real
              </div>
              <div className="flex items-center gap-3 text-sm text-white/50 font-mono">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                R$ 200k+ faturamento acumulado
              </div>
              <div className="flex items-center gap-3 text-sm text-white/50 font-mono">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                5.0 ★ avaliação média
              </div>
            </div>
          </div>
        </div>

        {/* Right Carousel */}
        <div
          className="lg:col-span-8 relative overflow-hidden"
          style={{
            maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="testimonial-track flex pb-4 gap-x-6">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="group testimonial-card w-[280px] md:w-[320px] bg-[#0E0F11] border border-white/[0.08] hover:border-blue-500/30 transition-colors duration-500 rounded-xl overflow-hidden flex-shrink-0 flex flex-col"
              >
                {/* Image · full print preserved */}
                <div className="relative w-full overflow-hidden bg-gradient-to-br from-blue-950/30 to-[#0B0C0E] flex items-center justify-center">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-auto max-h-[480px] object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  {/* Rating badge */}
                  <div className="absolute top-2 right-2 bg-[#0E0F11]/90 backdrop-blur-sm border border-blue-500/30 px-2 py-1 text-[10px] font-bold text-blue-400 uppercase tracking-wide font-mono rounded z-10">
                    [{t.rating}]
                  </div>
                  {/* Revenue badge */}
                  <div className="absolute top-2 left-2 bg-blue-500 px-2 py-1 text-[10px] font-bold text-white uppercase tracking-wide font-mono rounded shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10">
                    + {t.revenue}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 border-t border-white/[0.06]">
                  <p className="text-xs text-white/65 leading-relaxed mb-5 line-clamp-3">
                    "{t.quote}"
                  </p>
                  <div className="flex justify-between items-end border-t border-white/[0.06] pt-3">
                    <span className="text-xs font-bold text-white">{t.name}</span>
                    <span className="text-[10px] text-white/30 uppercase font-mono">{t.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .testimonial-track {
          width: max-content;
          animation: testimonial-scroll 45s linear infinite;
        }
        .testimonial-track:hover {
          animation-play-state: paused;
        }
        @keyframes testimonial-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
