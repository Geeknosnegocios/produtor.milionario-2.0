import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Gift, MessageCircle, Clock, Sparkles, X } from "lucide-react";

interface GiftExitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupUrl: string;
  videoUrl: string;
}

// Link do vídeo presente (YouTube)
const VIDEO_URL = "https://www.youtube.com/watch?v=KixSgwClqh4";

// Converte watch?v= em embed/
const videoEmbed = VIDEO_URL.replace("watch?v=", "embed/");

const GiftExitModal = ({ open, onOpenChange, groupUrl, videoUrl }: GiftExitModalProps) => {
  const finalEmbed = videoEmbed;
  const finalGroup = groupUrl || "https://chat.whatsapp.com/HfH9gOADKZvJwwqkAp4SxI";

  const handleClaim = () => {
    try {
      // Tracking opcional via lib/tracking se disponível
      import("@/lib/tracking").then((mod) => {
        try { mod.trackInitiateCheckout?.({ value: 0, source: "gift-exit-modal" }); } catch { /* noop */ }
      }).catch(() => { /* noop */ });
    } catch { /* noop */ }
    // Abre o grupo em nova aba
    window.open(finalGroup, "_blank", "noopener,noreferrer");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-md:max-w-[95vw] max-h-[95vh] overflow-y-auto border border-green-500/40 bg-[#0E0F11] p-0 rounded-2xl shadow-[0_0_80px_rgba(34,197,94,0.4)]">
        {/* Top accent line */}
        <div className="h-1 w-full bg-gradient-to-r from-green-500 via-emerald-400 to-green-600" />

        {/* Header */}
        <div className="relative px-5 sm:px-7 pt-7 pb-5 text-center">
          {/* Pulsing dot */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] sm:text-xs text-green-300 font-mono uppercase tracking-[0.18em] font-bold">
              ESPERA · PRESENTE PRA VOCÊ
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          </div>

          {/* Gift icon */}
          <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.5)] mb-4">
            <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={2.5} />
          </div>

          <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-[1.05] tracking-tight">
            Vai embora <span className="text-green-400">sem o presente</span>?
          </DialogTitle>

          <DialogDescription className="text-sm sm:text-base text-white/70 mt-3 max-w-sm mx-auto leading-relaxed">
            Deixei um <strong className="text-white">presente exclusivo</strong> no grupo VIP do WhatsApp.
            <br />
            <span className="text-green-300 font-bold">É GRÁTIS. Leva antes de sair.</span>
          </DialogDescription>
        </div>

        {/* Video card */}
        <div className="px-5 sm:px-7">
          <div className="relative rounded-xl overflow-hidden border border-green-500/40 bg-black shadow-[0_0_30px_rgba(34,197,94,0.25)]">
            <div className="aspect-video">
              <iframe
                src={finalEmbed}
                title="Presente exclusivo"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
          <p className="mt-2 text-center text-[11px] sm:text-xs text-white/50">
            <Sparkles className="w-3 h-3 inline -mt-0.5 mr-1 text-green-400" />
            Conteúdo que não está em lugar nenhum
          </p>
        </div>

        {/* CTA */}
        <div className="px-5 sm:px-7 py-5 space-y-3">
          <button
            onClick={handleClaim}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-black text-base sm:text-lg uppercase tracking-wide shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_50px_rgba(34,197,94,0.6)] transition-all active:scale-[0.98]"
          >
            <MessageCircle className="w-5 h-5" />
            QUERO O PRESENTE NO GRUPO
          </button>

          <button
            onClick={() => onOpenChange(false)}
            className="w-full text-center text-xs sm:text-sm text-white/40 hover:text-white/70 transition-colors py-2 underline-offset-4 hover:underline"
          >
            Não, prefiro sair sem o presente
          </button>

          <p className="flex items-center justify-center gap-1.5 text-[10px] text-orange-300/80 font-mono">
            <Clock className="w-3 h-3" />
            <span>Esse convite sai do ar quando você fechar essa aba</span>
          </p>
        </div>

        {/* Bottom accent line */}
        <div className="h-1 w-full bg-gradient-to-r from-green-600 via-emerald-500 to-green-500" />
      </DialogContent>
    </Dialog>
  );
};

export default GiftExitModal;