import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const FixedCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCTA = () => {
    window.open("https://cakto.com.br/produtor-milionario-2-0", "_blank");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-2 sm:p-4 safe-bottom">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-transparent backdrop-blur-sm" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="relative">
          <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500 via-blue-500 to-emerald-500 rounded-xl opacity-60" />

          <div className="relative glass-card rounded-xl p-3 md:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="hidden sm:flex w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-emerald-500/20 items-center justify-center">
                <Sparkles className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="font-bold text-base md:text-lg text-white">🔥 Produto LowTicket no ar em 1 hora</div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  De <span className="line-through">R$ 5.364</span> por{" "}
                  <span className="text-blue-400 font-bold">R$ 147</span> · 12x R$14,87
                </div>
              </div>
            </div>

            <Button
              variant="neon"
              size="lg"
              onClick={handleCTA}
              className="gap-2 w-full sm:w-auto text-sm md:text-base"
            >
              <span>QUERO HOJE</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedCTA;
