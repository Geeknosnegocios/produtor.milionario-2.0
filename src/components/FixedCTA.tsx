import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { BookmarkButton } from "./ui/bookmark-button";
import { ArrowRight, Zap, Clock, Users } from "lucide-react";

const FixedCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [viewers, setViewers] = useState(70 + Math.floor(Math.random() * 60));

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);

    const tick = setInterval(() => {
      setViewers((v) => Math.max(60, Math.min(140, v + (Math.random() > 0.5 ? 1 : -1) * (1 + Math.floor(Math.random() * 3)))));
    }, 8000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(tick);
    };
  }, []);

  const handleCTA = () => {
    import("@/lib/tracking").then(({ trackInitiateCheckout }) => trackInitiateCheckout({ value: 147, source: 'fixed-cta' }));
    window.open("https://pay.geekacademy.site/c/produtor-milion-rio-2-0-up?o=perpetuo-fpm2-0", "_blank");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-2 sm:p-4 safe-bottom pointer-events-none">
      {/* Backdrop fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-transparent backdrop-blur-sm" />

      <div className="container mx-auto max-w-5xl relative z-10 pointer-events-auto">
        <div className="relative">
          {/* Outer glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 via-blue-400/30 to-blue-600/30 rounded-2xl blur-xl opacity-70 animate-pulse-glow"></div>

          {/* Main frame */}
          <div className="relative rounded-xl border border-blue-500/40 bg-[#0E0F11] overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.2)]">

            {/* Top live ticker · desktop only */}
            <div className="hidden md:flex bg-gradient-to-r from-red-500/12 via-orange-500/12 to-red-500/12 border-b border-orange-500/20 px-4 py-1.5 items-center justify-center gap-3 text-[10px]">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-red-300 font-mono uppercase tracking-wider font-bold">AO VIVO</span>
              </div>
              <span className="text-white/40">·</span>
              <span className="text-white/70 font-mono">
                <Users className="inline w-2.5 h-2.5 mr-1 -mt-0.5" />
                {viewers} pessoas vendo agora
              </span>
              <span className="text-white/40">·</span>
              <span className="text-orange-300 font-mono">
                <Clock className="inline w-2.5 h-2.5 mr-1 -mt-0.5" />
                preço sobe em breve
              </span>
            </div>

            {/* Content row */}
            <div className="p-3 md:p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 md:gap-5">

              {/* Left · Info */}
              <div className="flex items-center gap-3 text-center sm:text-left flex-1 min-w-0">
                {/* Icon badge */}
                <div className="hidden sm:flex w-11 h-11 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/40 items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.25)]">
                  <Zap className="w-5 h-5 text-blue-300" strokeWidth={2} />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Eyebrow + viewers */}
                  <div className="flex items-center gap-2 mb-0.5 justify-center sm:justify-start">
                    <span className="text-[10px] sm:text-[11px] text-blue-400 uppercase font-mono tracking-[0.18em] font-bold">
                      Produtor 2.0
                    </span>
                    <span className="md:hidden flex items-center gap-1 text-[9px] text-red-300 font-mono">
                      <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse"></span>
                      {viewers} ON
                    </span>
                  </div>

                  {/* Title */}
                  <p className="text-sm md:text-base font-bold text-white leading-tight truncate">
                    Produto LowTicket no ar em 1 hora
                  </p>

                  {/* Price line */}
                  <div className="flex items-center gap-2 mt-1 justify-center sm:justify-start text-[11px] md:text-xs flex-wrap">
                    <span className="text-white/40 line-through font-mono">R$ 5.364</span>
                    <ArrowRight className="w-3 h-3 text-blue-400/60" />
                    <span className="text-blue-300 font-bold font-mono">R$ 147</span>
                    <span className="hidden sm:inline text-white/30">·</span>
                    <span className="hidden sm:inline text-white/50 font-mono">12x R$ 14,87</span>
                    <span className="px-1.5 py-0.5 rounded bg-blue-500/15 border border-blue-500/30 text-blue-300 font-mono text-[9px] uppercase tracking-wider font-bold">
                      98% OFF
                    </span>
                  </div>
                </div>
              </div>

              {/* Right · CTA */}
              <div className="flex-shrink-0 flex justify-center w-full sm:w-auto">
                <BookmarkButton
                  size="lg"
                  onClick={handleCTA}
                  text="QUERO AGORA"
                  className="min-w-[220px] w-full sm:w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedCTA;
