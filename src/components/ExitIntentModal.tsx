import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Gift, Clock, CheckCircle2, Sparkles } from "lucide-react";

interface ExitIntentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  checkoutUrl: string;
}

const ExitIntentModal = ({ open, onOpenChange, checkoutUrl }: ExitIntentModalProps) => {
  const handleAccept = () => {
    localStorage.setItem('produtor-milionario-exit-accepted', 'true');
    window.location.href = checkoutUrl;
  };

  const handleDecline = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-md:max-w-[95vw] max-h-[90vh] overflow-y-auto border-primary/20 bg-card p-0">
        <div className="bg-gradient-to-r from-primary to-secondary p-4 md:p-6 text-center">
          <Sparkles className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 md:mb-3 text-white animate-pulse" />
          <DialogTitle className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">
            ✋ Espera 1 minuto antes de fechar
          </DialogTitle>
          <DialogDescription className="text-white/90 text-sm md:text-base">
            Eu posso te dar uma vantagem antes de você sair...
          </DialogDescription>
        </div>

        <div className="p-4 md:p-6 space-y-4 md:space-y-5">
          {/* Oferta Destacada */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center neon-glow">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-3 py-1 rounded-full text-xs md:text-sm font-semibold mb-2">
              <Gift className="w-3 h-3 md:w-4 md:h-4" />
              BÔNUS EXTRA EXCLUSIVO
            </div>
            <p className="text-base md:text-lg text-foreground mb-2">
              Pack <span className="font-bold text-primary">7 Comandos Geek OS Lite</span>
            </p>
            <p className="text-xs md:text-sm text-muted-foreground mb-3">
              (Valor R$297) — INCLUSO se decidir agora
            </p>
            <div className="flex items-center justify-center gap-3 mt-3">
              <span className="text-muted-foreground line-through text-base md:text-lg">R$ 5.364</span>
              <span className="text-2xl md:text-3xl font-bold text-primary">R$ 147</span>
            </div>
          </div>

          {/* Benefícios */}
          <div className="space-y-2 md:space-y-3">
            <div className="flex items-start gap-2 md:gap-3">
              <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm md:text-base text-foreground">
                <span className="font-semibold">28 Módulos · 70+ Aulas</span> com Claude
              </p>
            </div>
            <div className="flex items-start gap-2 md:gap-3">
              <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm md:text-base text-foreground">
                <span className="font-semibold">7 Bônus + Pack Skills</span> Geek OS Lite
              </p>
            </div>
            <div className="flex items-start gap-2 md:gap-3">
              <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm md:text-base text-foreground">
                <span className="font-semibold">Garantia Tripla</span> + Acesso Vitalício
              </p>
            </div>
          </div>

          {/* Urgência */}
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs md:text-sm">
            <Clock className="w-3 h-3 md:w-4 md:h-4" />
            <span>Esta oferta vence quando você fechar essa aba.</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-2 md:gap-3 pt-2">
            <Button
              variant="cta"
              size="lg"
              onClick={handleAccept}
              className="w-full text-sm md:text-base"
            >
              🎯 QUERO O BÔNUS + CURSO POR R$147
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDecline}
              className="w-full hover:text-primary text-xs md:text-sm"
            >
              Não, obrigado
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentModal;
