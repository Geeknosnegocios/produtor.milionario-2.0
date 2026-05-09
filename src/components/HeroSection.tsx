import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Sparkles, Zap, Users } from "lucide-react";
import { IconListCard } from "@/components/ui/icon-list-card";
import review1 from "@/assets/reviews/review-1.jpg";
import review2 from "@/assets/reviews/review-2.jpg";
import review3 from "@/assets/reviews/review-3.jpg";

const HeroSection = () => {
  const handleCTA = () => {
    window.location.href = "https://cakto.com.br/produtor-milionario-2-0";
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-16 md:py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/3 -right-1/4 w-[500px] h-[500px] bg-emerald-500/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -left-1/4 w-[400px] h-[400px] bg-blue-600/6 rounded-full blur-[80px]" />
      </div>

      <div className="absolute inset-0 bg-grid opacity-40" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center max-w-5xl mx-auto space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card border border-blue-500/40 animate-slide-up">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              ✨ NOVO 2026 — Era de IA para LowTicket no Digital (Claude)
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.1] text-balance px-2 md:px-0 animate-slide-up" style={{ animationDelay: "100ms" }}>
            Seu Primeiro Produto LowTicket{" "}
            <span className="gradient-text">NO AR em 1 Hora</span>,
            Primeira <span className="gradient-text">VENDA em 7 Dias</span>
            {" "}— Garantido com Claude
          </h1>

          <div className="hero-underline w-32 sm:w-48 md:w-56 mx-auto animate-slide-up" style={{ animationDelay: "200ms" }} />

          <div className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto px-4 md:px-0 space-y-4 animate-slide-up" style={{ animationDelay: "300ms" }}>
            <p>
              ChatGPT é o iPhone da sua mãe.{" "}
              <span className="text-white font-medium">
                Claude é o iPhone do produtor que vende.
              </span>
              {" "}A diferença? R$200k em 12 meses.
            </p>
            <p className="text-blue-400 font-semibold">👉 7 skills fazem 99% do trabalho. Você apenas orquestra.</p>
          </div>

          <div className="relative max-w-4xl mx-auto px-4 md:px-0 animate-slide-up" style={{ animationDelay: "400ms" }}>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-blue-500/20 to-emerald-500/20 rounded-3xl blur-2xl" />

            <div className="relative glass-card rounded-2xl md:rounded-3xl overflow-hidden border border-white/10">
              <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">Vídeo de apresentação</div>
              </div>

              <div className="relative w-full aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/M_EOnrEOBsQ"
                  title="Produtor Milionário - Vídeo de Apresentação"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>

            <div className="hidden lg:block absolute -top-6 -right-8 glass-card border border-blue-500/40 rounded-xl p-4 animate-float neon-glow">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold neon-text">R$ 200k+</div>
                  <div className="text-xs text-muted-foreground">em LowTicket com Claude</div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block absolute -bottom-6 -left-8 glass-card border border-emerald-500/40 rounded-xl p-4 animate-float neon-glow-purple" style={{ animationDelay: "-3s" }}>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-2xl font-bold neon-text-purple">1 hora</div>
                  <div className="text-xs text-muted-foreground">da ideia ao caixa</div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 w-full max-w-md mx-auto md:max-w-none md:w-auto animate-slide-up" style={{ animationDelay: "500ms" }}>
            <Button
              variant="hero"
              size="xl"
              onClick={handleCTA}
              className="group w-full md:w-auto px-10 py-6 text-lg"
            >
              <span>QUERO MEU PRODUTO VENDENDO EM 1 HORA — R$147</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 pt-4 px-4 animate-slide-up" style={{ animationDelay: "600ms" }}>
            <div className="flex items-center gap-3 glass-card px-4 py-2 rounded-full">
              <div className="flex -space-x-2">
                <img src={review1} alt="Aluno" className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-background object-cover" />
                <img loading="lazy" src={review2} alt="Aluna" className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-background object-cover" />
                <img loading="lazy" src={review3} alt="Aluna" className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-background object-cover" />
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-white">+1.000 alunos</span>
              </div>
            </div>

            <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.5)]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1.5 text-sm font-medium text-white">5.0 avaliação</span>
            </div>
          </div>

          <div className="px-4 animate-slide-up" style={{ animationDelay: "700ms" }}>
            <IconListCard
              tone="primary"
              items={[
                { icon: <Check aria-hidden="true" />, text: "Produto LowTicket no ar em 1 hora" },
                { icon: <Check aria-hidden="true" />, text: "Acesso vitalício + atualizações" },
                { icon: <Check aria-hidden="true" />, text: "Garantia de Resultado (não de reembolso)" },
              ]}
              className="max-w-3xl mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
