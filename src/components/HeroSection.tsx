import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookmarkButton } from "@/components/ui/bookmark-button";
import { IconBadge } from "@/components/ui/icon-badge";
import { ArrowRight, Check, Sparkles, Zap, Users, Infinity as InfinityIcon, ShieldCheck, Volume2, Play } from "lucide-react";
import { trackInitiateCheckout } from "@/lib/tracking";
import review1 from "@/assets/reviews/review-1.jpg";
import review2 from "@/assets/reviews/review-2.jpg";
import review3 from "@/assets/reviews/review-3.jpg";

const VIDEO_ID = "8MSb3SIFZm4";

const HeroSection = () => {
  const [playing, setPlaying] = useState(false);

  const handleCTA = () => {
    trackInitiateCheckout({ value: 147, source: 'hero' });
    window.location.href = "https://pay.cakto.com.br/y2pgfgv_879248";
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 sm:pt-24 sm:pb-16 md:py-24 px-3 sm:px-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/3 -right-1/4 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -left-1/4 w-[400px] h-[400px] bg-blue-600/6 rounded-full blur-[80px]" />
      </div>

      <div className="absolute inset-0 bg-grid opacity-40" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center max-w-5xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
          {/* Top eyebrow chip · compact mobile */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full glass-card border border-blue-500/40 animate-slide-up">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
            <span className="text-[10px] sm:text-sm font-semibold uppercase tracking-wider sm:tracking-normal sm:normal-case bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">
              <span className="sm:hidden">PRODUTOR 2.0 · LIVE</span>
              <span className="hidden sm:inline">✨ NOVO 2026 · Era de IA para LowTicket no Digital (Claude)</span>
            </span>
          </div>

          {/* Headline · ALL CAPS punch style */}
          <div className="space-y-4 sm:space-y-5 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <h1 className="text-[20px] leading-[1.15] sm:text-[32px] md:text-[44px] lg:text-[56px] font-black tracking-tight text-white px-2 uppercase">
              PRODUTO LOWTICKET <span className="gradient-text">NO AR EM 1 HORA.</span> PRIMEIRA VENDA <span className="text-blue-300">NO MESMO DIA</span>, COM CLAUDE.
            </h1>
          </div>

          {/* Body · diferenciação */}
          <div className="max-w-2xl mx-auto px-3 sm:px-4 md:px-0 animate-slide-up" style={{ animationDelay: "300ms" }}>
            <p className="text-sm sm:text-lg md:text-xl text-white/55 leading-relaxed">
              <span className="hidden sm:inline">ChatGPT é o iPhone da sua mãe. </span>
              <span className="text-white font-medium">Claude é o iPhone do produtor que vende.</span>
              {" "}A diferença? <span className="text-blue-300 font-bold">R$200k em 2 meses.</span>
            </p>
            <p className="mt-2 sm:mt-3 text-xs sm:text-base text-blue-400 font-semibold">
              👉 7 skills fazem 99% do trabalho. Você orquestra.
            </p>
          </div>

          {/* Video · larger + AO VIVO badge on mobile */}
          <div className="relative max-w-4xl mx-auto px-1 sm:px-4 md:px-0 animate-slide-up" style={{ animationDelay: "400ms" }}>
            <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-blue-500/30 via-blue-500/25 to-blue-500/30 rounded-3xl blur-2xl animate-pulse" />

            <div className="relative glass-card rounded-2xl md:rounded-3xl overflow-hidden border border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.25)]">
              {/* Video header bar */}
              <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                  <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-400/80" />
                  <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                </div>
                {/* AO VIVO badge */}
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-red-500/15 border border-red-500/40 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-[9px] sm:text-[11px] text-red-300 font-mono uppercase tracking-wider font-bold">AO VIVO</span>
                </div>
                <div className="text-[10px] sm:text-sm text-muted-foreground font-medium hidden sm:block">Vídeo de apresentação</div>
              </div>

              <div className="relative w-full aspect-video bg-black">
                {playing ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                    title="Produtor Milionário - Vídeo de Apresentação"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    aria-label="Dar play no vídeo de apresentação"
                    className="group absolute inset-0 w-full h-full cursor-pointer overflow-hidden"
                  >
                    {/* Thumbnail YouTube */}
                    <img
                      src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                      alt="Capa do vídeo Produtor Milionário 2.0"
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="eager"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = `https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg`;
                      }}
                    />
                    {/* Dark overlay · forte pra evidenciar o botão */}
                    <div className="absolute inset-0 bg-black/75 group-hover:bg-black/60 transition duration-300" />
                    <div className="absolute inset-0 backdrop-blur-[3px] group-hover:backdrop-blur-[1.5px] transition duration-300" />
                    <div
                      className="absolute inset-0 transition duration-300"
                      style={{
                        background: "radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.85) 100%)"
                      }}
                    />

                    {/* Pulse rings around play button */}
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-red-500/30 animate-ping" />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-red-500/40 animate-pulse" />

                    {/* SQUARE PLAY BUTTON · centered */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-1.5 sm:gap-2 w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px] rounded-2xl bg-gradient-to-br from-red-500 via-red-600 to-orange-500 shadow-[0_0_60px_rgba(239,68,68,0.8)] border-2 border-red-400/80 group-hover:scale-110 group-hover:shadow-[0_0_80px_rgba(239,68,68,1)] transition-all duration-300 animate-pulse">
                      <span className="absolute top-2.5 right-2.5 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-full w-full bg-white"></span>
                      </span>
                      <Play className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white fill-white drop-shadow-lg ml-1" />
                      <span className="text-xs sm:text-sm md:text-base font-black uppercase tracking-wider text-white text-center leading-tight">
                        DÊ PLAY<br />AGORA
                      </span>
                      <div className="flex items-center gap-1">
                        <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wide text-white/95">4 MIN · COM SOM</span>
                      </div>
                    </div>

                    {/* Bottom caption */}
                    <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 text-center">
                      <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/90 bg-black/50 backdrop-blur px-3 py-1 rounded-full border border-white/20">
                        ▶ Clique para assistir
                      </span>
                    </div>
                  </button>
                )}
              </div>

              {/* Sound reminder bar · mobile only */}
              <div className="sm:hidden flex items-center justify-center gap-2 px-3 py-2 border-t border-white/5 bg-orange-500/5">
                <Volume2 className="w-3 h-3 text-orange-400 animate-pulse" />
                <span className="text-[10px] text-orange-300 font-mono uppercase tracking-wider font-bold">Verifique se o som está ligado</span>
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

            <div className="hidden lg:block absolute -bottom-6 -left-8 glass-card border border-blue-500/40 rounded-xl p-4 animate-float neon-glow-purple" style={{ animationDelay: "-3s" }}>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold neon-text-purple">1 hora</div>
                  <div className="text-xs text-muted-foreground">da ideia ao caixa</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA · full-width mobile */}
          <div className="px-2 sm:px-4 w-full max-w-md mx-auto md:max-w-fit md:w-auto animate-slide-up flex justify-center" style={{ animationDelay: "500ms" }}>
            <BookmarkButton
              size="xl"
              onClick={handleCTA}
              text={
                <>
                  <span className="sm:hidden text-sm">QUERO EM 1 HORA · R$147</span>
                  <span className="hidden sm:inline">QUERO MEU PRODUTO EM 1 HORA · R$147</span>
                </>
              }
              sub="acesso liberado em 1 minuto"
              fullWidth
              className="w-full sm:w-auto"
            />
          </div>

          {/* Social proof · always inline */}
          <div className="flex flex-row items-center justify-center gap-2 sm:gap-10 pt-2 sm:pt-4 px-1 sm:px-4 animate-slide-up" style={{ animationDelay: "600ms" }}>
            <div className="flex items-center gap-2 sm:gap-3 glass-card px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
              <div className="flex -space-x-2">
                <img src={review1} alt="Aluno" className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border-2 border-background object-cover" />
                <img loading="lazy" src={review2} alt="Aluna" className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border-2 border-background object-cover" />
                <img loading="lazy" src={review3} alt="Aluna" className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border-2 border-background object-cover" />
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                <span className="text-xs sm:text-sm font-medium text-white">+1.000 alunos</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 glass-card px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.5)]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1 sm:ml-1.5 text-xs sm:text-sm font-medium text-white">5.0 avaliação</span>
            </div>
          </div>

          <div className="px-0 sm:px-4 animate-slide-up max-w-7xl mx-auto pt-6 sm:pt-8" style={{ animationDelay: "700ms" }}>
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-neutral-900 ring-1 ring-white/10">
              <div className="relative grid grid-cols-1 lg:grid-cols-2">
                {/* Left column · pitch */}
                <div className="p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-white/10">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-blue-400 font-mono">
                    O Que Você Recebe Hoje
                  </p>
                  <h2 className="mt-2 text-3xl sm:text-4xl text-white tracking-tighter font-light text-left">
                    Tudo pra <span className="text-blue-400">vender em 1 hora</span>
                  </h2>
                  <p className="mt-3 text-sm text-neutral-300 text-left">
                    Sem agência. Sem copy paga. Sem programador. Claude faz o trabalho duro, você apenas orquestra.
                  </p>

                  <ul className="mt-6 space-y-3 text-left">
                    <li className="flex items-center gap-3 text-neutral-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      Acesso vitalício + atualizações
                    </li>
                    <li className="flex items-center gap-3 text-neutral-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      Garantia de Resultado (não de reembolso)
                    </li>
                    <li className="flex items-center gap-3 text-neutral-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      12x R$14,87 sem juros · acesso em 1 minuto
                    </li>
                  </ul>
                </div>

                {/* Right column · 3 benefit cards */}
                <div className="p-6 sm:p-10 space-y-4">
                  <div className="group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 transition">
                    <div className="flex items-center gap-3">
                      <IconBadge Icon={Zap} size="md" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-white">Produto No Ar em 1 Hora</p>
                        <p className="text-xs text-neutral-400">Da ideia ao checkout funcionando</p>
                      </div>
                    </div>
                    <Check className="w-5 h-5 text-blue-400" />
                  </div>

                  <div className="group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 transition">
                    <div className="flex items-center gap-3">
                      <IconBadge Icon={InfinityIcon} size="md" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-white">Acesso Vitalício</p>
                        <p className="text-xs text-neutral-400">Atualizações futuras inclusas</p>
                      </div>
                    </div>
                    <Check className="w-5 h-5 text-blue-400" />
                  </div>

                  <div className="group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 transition">
                    <div className="flex items-center gap-3">
                      <IconBadge Icon={ShieldCheck} size="md" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-white">Garantia de Resultado</p>
                        <p className="text-xs text-neutral-400">3 camadas · não de reembolso</p>
                      </div>
                    </div>
                    <Check className="w-5 h-5 text-blue-400" />
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

export default HeroSection;
