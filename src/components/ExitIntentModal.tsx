import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { BookmarkButton } from "@/components/ui/bookmark-button";
import { Gift, Clock, CheckCircle2, Sparkles, AlertCircle, Zap, ShieldCheck, Infinity as InfinityIcon } from "lucide-react";

interface ExitIntentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  checkoutUrl: string;
}

// Backredirect URL · R$127 downsell checkout · UPDATE quando user mandar
const BACKREDIRECT_URL = "https://pay.cakto.com.br/frbugun";

const ExitIntentModal = ({ open, onOpenChange, checkoutUrl }: ExitIntentModalProps) => {
  const handleAccept = () => {
    localStorage.setItem('produtor-milionario-exit-accepted', 'true');
    window.location.href = checkoutUrl;
  };

  const handleDecline = () => {
    onOpenChange(false);
  };

  // X close → backredirect pra downsell R$127
  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      // Mark accepted to avoid re-showing
      localStorage.setItem('produtor-milionario-exit-accepted', 'true');
      // Backredirect pra checkout R$127
      window.location.href = BACKREDIRECT_URL;
      return;
    }
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-md:max-w-[95vw] max-h-[95vh] overflow-y-auto border border-blue-500/40 bg-[#0E0F11] p-0 rounded-2xl shadow-[0_0_80px_rgba(59,130,246,0.4)]">

        {/* Top accent line */}
        <div className="h-1 w-full bg-gradient-to-r from-red-500 via-orange-500 to-blue-500"></div>

        {/* Header */}
        <div className="relative px-5 sm:px-7 pt-6 pb-5 border-b border-white/[0.06]">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-[10px] sm:text-xs text-red-300 font-mono uppercase tracking-[0.18em] font-bold">ESPERA · OFERTA EXPIRA</span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
          </div>

          <DialogTitle className="text-center text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight tracking-tight">
            Antes de fechar...
            <br />
            <span className="text-blue-400">Quero te dar um bônus</span>
          </DialogTitle>

          <DialogDescription className="text-center text-xs sm:text-sm text-white/60 mt-2">
            Você tá fechando? Sem problema. Mas leva isso aqui antes:
          </DialogDescription>
        </div>

        {/* Bonus highlight card */}
        <div className="px-5 sm:px-7 pt-5">
          <div className="relative rounded-xl bg-gradient-to-br from-blue-500/15 to-blue-600/5 border border-blue-500/40 p-4 sm:p-5 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            {/* Free ribbon */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-blue-500 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              🎁 BÔNUS EXTRA
            </div>

            <div className="flex items-center gap-3 mt-2">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 border border-blue-400/50 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-bold text-white">Pack 7 Comandos Geek OS Lite</p>
                <p className="text-[10px] sm:text-xs text-white/50 mt-0.5">Skills automatizadas · pronto pra rodar</p>
                <div className="flex items-baseline gap-2 mt-1.5">
                  <span className="text-xs text-white/40 line-through font-mono">R$ 297</span>
                  <span className="text-sm font-bold text-blue-300 font-mono">GRÁTIS hoje</span>
                </div>
              </div>
            </div>
          </div>

          {/* Price comparison · BIG impact */}
          <div className="mt-5 flex items-center justify-center gap-4 sm:gap-6 py-5 sm:py-6 border-y border-white/[0.08]">
            <div className="text-center">
              <p className="text-[10px] sm:text-xs text-white/40 uppercase font-mono tracking-[0.18em] mb-1">Antes</p>
              <p className="text-xl sm:text-2xl font-mono text-white/40 line-through font-bold">R$ 5.661</p>
            </div>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-500/20 border-2 border-blue-500/40 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <span className="text-blue-300 text-base sm:text-lg font-bold">→</span>
            </div>
            <div className="text-center">
              <p className="text-[10px] sm:text-xs text-blue-300 uppercase font-mono tracking-[0.18em] mb-1 font-bold">Hoje</p>
              <p className="text-4xl sm:text-5xl font-black text-blue-300 font-mono leading-none tracking-tighter">R$ 147</p>
            </div>
          </div>

          {/* Benefits · LARGER */}
          <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { icon: Zap, label: "1 hora", sub: "no ar" },
              { icon: ShieldCheck, label: "Garantia", sub: "tripla" },
              { icon: InfinityIcon, label: "Vitalício", sub: "+ updates" },
            ].map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl bg-blue-500/[0.06] border border-blue-500/20 hover:bg-blue-500/[0.1] transition-colors">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 border border-blue-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.35)]">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2} />
                  </div>
                  <div className="text-center">
                    <p className="text-xs sm:text-sm text-white font-bold uppercase tracking-wider leading-none">{b.label}</p>
                    <p className="text-[9px] sm:text-[10px] text-blue-300/70 font-mono mt-1">{b.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTAs */}
        <div className="px-5 sm:px-7 py-5 space-y-3">
          <BookmarkButton
            size="lg"
            onClick={handleAccept}
            text="QUERO O BÔNUS · R$147"
            sub="acesso liberado em 1 minuto"
            fullWidth
          />

          <button
            onClick={handleDecline}
            className="w-full text-center text-xs sm:text-sm text-white/40 hover:text-white/70 transition-colors py-2 underline-offset-4 hover:underline"
          >
            Não, prefiro perder essa oferta
          </button>

          <p className="flex items-center justify-center gap-1.5 text-[10px] text-orange-300/80 font-mono">
            <Clock className="w-3 h-3" />
            <span>Esta oferta vence quando você fechar essa aba</span>
          </p>
        </div>

        {/* Bottom accent line */}
        <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600"></div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentModal;
