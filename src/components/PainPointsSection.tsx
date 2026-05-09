import { X, Check, AlertTriangle, Zap } from "lucide-react";

const painPoints = [
  "Quer começar mas não sabe que produto vender",
  "Trava na página em branco — copy, design, tráfego",
  "Cota agência R$5k, copywriter R$1.5k, designer R$800",
  "2 anos juntando curso, R$8k investidos, zero produto no ar",
];

const solutions = [
  "Tem ideia validada com Meta Ads em 30s",
  "Página criada em 25 min com Claude — sem dev",
  "Funil completo Cakto + deploy em 30 min",
  "Primeiro criativo + tráfego em 15 min",
];

const PainPointsSection = () => {
  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-10 md:mb-16 animate-slide-up">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 px-2">
            Você tem ideia há meses.{" "}
            <span className="gradient-text">Outros já estão com produto no ar.</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mt-2 px-2">
            👉 O jogo mudou. Agora vence quem lança primeiro — não quem estuda mais.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="relative group animate-slide-up" style={{ animationDelay: "100ms" }}>
            <div className="absolute -inset-[1px] bg-gradient-to-br from-red-500/50 to-orange-500/50 rounded-xl md:rounded-2xl opacity-60" />

            <div className="relative glass-card rounded-xl md:rounded-2xl p-4 md:p-6 h-full">
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-red-400">
                  Você (sem método com Claude):
                </h3>
              </div>

              <div className="space-y-3">
                {painPoints.map((text, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 md:gap-3 p-3 rounded-lg md:rounded-xl bg-red-500/5 border border-red-500/10 transition-all duration-300 hover:bg-red-500/10 hover:border-red-500/20"
                  >
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-md md:rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <X className="w-3 h-3 md:w-4 md:h-4 text-red-400" />
                    </div>
                    <span className="text-xs md:text-sm text-slate-300">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative group animate-slide-up" style={{ animationDelay: "200ms" }}>
            <div className="absolute -inset-[1px] bg-gradient-to-br from-blue-500/50 to-blue-500/50 rounded-xl md:rounded-2xl opacity-60" />

            <div className="relative glass-card rounded-xl md:rounded-2xl p-4 md:p-6 h-full">
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  <Zap className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-blue-400">
                  Você (com Claude + 7 skills):
                </h3>
              </div>

              <div className="space-y-3">
                {solutions.map((text, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 md:gap-3 p-3 rounded-lg md:rounded-xl bg-blue-500/5 border border-blue-500/10 transition-all duration-300 hover:bg-blue-500/10 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                  >
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-md md:rounded-lg bg-gradient-to-br from-blue-500/30 to-blue-500/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                      <Check className="w-3 h-3 md:w-4 md:h-4 text-cyan-300" />
                    </div>
                    <span className="text-xs md:text-sm text-slate-200 font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 md:mt-12 animate-slide-up" style={{ animationDelay: "300ms" }}>
          <p className="text-lg md:text-xl font-bold">
            <span className="gradient-text">👉 Tá na hora de parar de assistir e começar a lançar.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;
