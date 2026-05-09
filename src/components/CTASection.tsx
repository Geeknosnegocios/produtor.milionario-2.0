import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Infinity as InfinityIcon, Sparkles, CreditCard } from "lucide-react";

const CTASection = () => {
  const handleCTA = () => {
    window.open("https://cakto.com.br/produtor-milionario-2-0", "_blank");
  };

  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/8 rounded-full blur-[120px]" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-blue-500/20 to-emerald-500/20 rounded-[2rem] blur-2xl" />
          <div className="absolute -inset-[2px] bg-gradient-to-r from-blue-500 via-blue-500 to-emerald-500 rounded-3xl" />

          <div className="relative glass-card rounded-2xl md:rounded-3xl p-5 md:p-10 lg:p-14 text-center">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-emerald-500/10 to-transparent rounded-br-3xl" />

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/40 mb-8 animate-slide-up">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-blue-300">Hora de lançar</span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-6 md:mb-8 px-2 animate-slide-up" style={{ animationDelay: "100ms" }}>
              Você Tá a 1 Hora do Seu Primeiro{" "}
              <span className="gradient-text">Produto LowTicket No Ar</span>
            </h2>

            <div className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: "150ms" }}>
              <p>Próximo botão = Cakto. 1 minuto = login. <strong className="text-blue-400">1 hora = produto no ar.</strong> 7 dias = primeira venda.</p>
              <p className="mt-2">R$147 separa você desse caminho. Claude faz o resto.</p>
            </div>

            <div className="flex flex-col items-center gap-2 md:gap-3 mb-8 md:mb-10 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold">
                <span className="gradient-text">R$ 147</span>
              </div>
              <div className="text-sm md:text-base text-muted-foreground">
                ou 12x de <span className="text-blue-400 font-bold">R$ 14,87</span> sem juros
              </div>
            </div>

            <div className="mb-8 md:mb-10 animate-slide-up" style={{ animationDelay: "300ms" }}>
              <Button
                variant="hero"
                size="xl"
                onClick={handleCTA}
                className="w-full max-w-lg mx-auto group text-sm md:text-base py-5 md:py-6"
              >
                <span>QUERO MEU PRODUTO VENDENDO EM 1 HORA</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "400ms" }}>
              {[
                { icon: Zap, title: "Acesso Imediato", subtitle: "Login em 1 minuto" },
                { icon: Shield, title: "Garantia Resultado", subtitle: "Não de reembolso" },
                { icon: InfinityIcon, title: "Acesso Vitalício", subtitle: "Sem renovação" },
                { icon: CreditCard, title: "12x R$14,87", subtitle: "Sem juros" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center gap-2 md:gap-3 p-3 md:p-4 rounded-lg md:rounded-xl bg-white/[0.03] border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.05] transition-all duration-300"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/20 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                  </div>
                  <div className="text-center md:text-left">
                    <div className="text-xs md:text-sm font-semibold text-white">{feature.title}</div>
                    <div className="text-[10px] md:text-xs text-muted-foreground">{feature.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 md:mt-10 md:pt-8 border-t border-white/5 animate-slide-up" style={{ animationDelay: "500ms" }}>
              <p className="text-xs md:text-sm text-muted-foreground flex items-center justify-center gap-2">
                <Shield className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                <span className="text-center">🔒 Pagamento 100% seguro · Cakto · 30 dias garantia tripla</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
