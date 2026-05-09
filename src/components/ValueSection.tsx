import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Gift, Sparkles, AlertCircle } from "lucide-react";

const valueItems = [
  { item: "Curso Era IA — 6 módulos novos", value: 1997 },
  { item: "Curso Fundamentos — 6 módulos legado", value: 497 },
  { item: "16 Módulos Avançado", value: 497 },
  { item: "7 Bônus Exclusivos", value: 1779 },
  { item: "Acesso Vitalício + Atualizações", value: 497 },
  { item: "Comunidade Geek Produtores 30d", value: 97 },
];

const ValueSection = () => {
  const total = valueItems.reduce((acc, item) => acc + item.value, 0);
  const offerPrice = 147;
  const discount = Math.round(((total - offerPrice) / total) * 100);

  const handleCTA = () => {
    window.open("https://cakto.com.br/produtor-milionario-2-0", "_blank");
  };

  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px]" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-blue-500/30 mb-6">
            <Gift className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-cyan-300">Oferta Completa</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
            Tudo Que Você Recebe{" "}
            <span className="gradient-text">Hoje</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            👉 Produto LowTicket no ar em 1 hora com Claude. Garantia de Resultado.
          </p>
        </div>

        <div className="mb-10 animate-slide-up" style={{ animationDelay: "50ms" }}>
          <div className="relative">
            <div className="absolute -inset-[1px] bg-gradient-to-br from-yellow-500/40 to-orange-500/40 rounded-2xl" />
            <div className="relative glass-card rounded-2xl p-5 md:p-6 border border-yellow-500/20">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-yellow-400 mb-2">🔥 Por que R$147 e não R$1.997?</h3>
                  <p className="text-sm md:text-base text-slate-300 mb-3 leading-relaxed">
                    Preferimos 100 alunos executando do que 10 olhando.
                    Esse preço vale só pra <strong className="text-yellow-300">turma piloto 2026</strong>.
                  </p>
                  <ul className="space-y-1.5 text-sm text-slate-300">
                    <li>📌 A partir da turma 2 → <strong className="text-white">R$497</strong></li>
                    <li>📌 Turma 3 em diante → <strong className="text-white">R$997</strong></li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-yellow-500/20 space-y-2 text-sm">
                    <p className="text-red-400">🔴 Turma piloto · 50 vagas · <strong>17 já preenchidas</strong></p>
                    <p className="text-orange-400">⏱️ Preço R$147 vence dia <strong>31 de maio</strong></p>
                    <p className="text-emerald-400">🔒 Próxima turma: R$497 (turma piloto 0% off)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative animate-slide-up" style={{ animationDelay: "100ms" }}>
          <div className="absolute -inset-[1px] bg-gradient-to-br from-blue-500/50 via-blue-500/50 to-emerald-500/50 rounded-3xl" />

          <div className="relative glass-card rounded-2xl md:rounded-3xl p-4 md:p-8">
            <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
              {valueItems.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between p-3 md:p-4 rounded-lg md:rounded-xl bg-white/[0.02] border border-white/5 hover:border-blue-500/20 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-md md:rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/20 border border-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Check className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                    </div>
                    <span className="text-xs md:text-base font-medium text-slate-200 truncate">{item.item}</span>
                  </div>
                  <span className="text-blue-400 font-bold text-xs md:text-base whitespace-nowrap ml-2">
                    R$ {item.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 md:pt-6 mb-6 md:mb-8">
              <div className="flex items-center justify-between">
                <span className="text-base md:text-xl font-bold text-white">Valor Total:</span>
                <span className="text-xl md:text-2xl font-bold text-muted-foreground line-through">
                  R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="relative mb-6 md:mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-blue-500/10 to-emerald-500/10 rounded-xl md:rounded-2xl blur-xl" />

              <div className="relative bg-gradient-to-r from-blue-500/10 via-blue-500/10 to-emerald-500/10 border border-blue-500/20 rounded-xl md:rounded-2xl p-5 md:p-8 text-center">
                <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">Oferta Especial de Lançamento</p>
                <div className="flex items-center justify-center gap-4 mb-3 md:mb-4">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold gradient-text">
                    R$ {offerPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 md:gap-2 px-4 md:px-5 py-1.5 md:py-2 bg-gradient-to-r from-emerald-500 to-pink-500 text-white rounded-full font-bold text-sm md:text-base shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                  {discount}% OFF
                </div>
                <p className="text-xs md:text-sm text-muted-foreground mt-3 md:mt-4">
                  ou 12x de R$ 14,87 no cartão sem juros
                </p>
              </div>
            </div>

            <Button
              variant="hero"
              size="xl"
              onClick={handleCTA}
              className="w-full group text-base md:text-lg py-5 md:py-6"
            >
              <span>SIM, QUERO ACESSO HOJE — R$147</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm">
              {["Acesso imediato", "Garantia de Resultado", "Acesso vitalício"].map((text, index) => (
                <div key={index} className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-400" />
                  </div>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
