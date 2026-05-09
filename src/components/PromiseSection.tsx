import { X, Check, Target } from "lucide-react";

const notItems = [
  "curso de ferramenta",
  "curso técnico sem aplicação",
  "curso para estudar e deixar salvo",
];

const isItems = [
  "sair da ideia e montar a oferta",
  "validar rápido sem complicar",
  "publicar em poucas horas",
  "repetir o processo quando quiser",
];

const PromiseSection = () => {
  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/20 border border-blue-500/20 mb-6 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
            <Target className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold mb-4 px-2">
            Aqui o foco não é estudar IA.{" "}
            <span className="gradient-text">O foco é colocar oferta no ar</span>{" "}
            e vender mais rápido.
          </h2>
        </div>

        <div className="relative animate-slide-up" style={{ animationDelay: "100ms" }}>
          <div className="absolute -inset-[1px] bg-gradient-to-br from-blue-500/30 to-emerald-500/30 rounded-3xl" />

          <div className="relative glass-card rounded-2xl md:rounded-3xl p-4 md:p-8">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <h3 className="text-base md:text-lg font-bold mb-4 md:mb-6 text-muted-foreground flex items-center gap-2">
                  <X className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
                  O Produtor Milionário não é:
                </h3>
                <div className="space-y-3">
                  {notItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 md:gap-3 p-2.5 md:p-3 rounded-lg md:rounded-xl bg-red-500/5 border border-red-500/10">
                      <div className="w-6 h-6 md:w-7 md:h-7 rounded-md md:rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                        <X className="w-3 h-3 md:w-4 md:h-4 text-red-400" />
                      </div>
                      <span className="text-sm md:text-base text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-bold mb-4 md:mb-6 text-blue-400 flex items-center gap-2">
                  <Check className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                  É um método prático para:
                </h3>
                <div className="space-y-3">
                  {isItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 md:gap-3 p-2.5 md:p-3 rounded-lg md:rounded-xl bg-blue-500/5 border border-blue-500/10 hover:border-blue-500/30 transition-colors duration-300">
                      <div className="w-6 h-6 md:w-7 md:h-7 rounded-md md:rounded-lg bg-gradient-to-br from-blue-500/30 to-blue-500/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                        <Check className="w-3 h-3 md:w-4 md:h-4 text-cyan-300" />
                      </div>
                      <span className="text-sm md:text-base font-medium text-slate-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 md:mt-12 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <p className="text-base md:text-lg lg:text-xl font-bold px-2">
            👉 Foi esse método que levou ofertas e produtos a ultrapassarem{" "}
            <span className="gradient-text">R$ 200.000 em faturamento.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PromiseSection;
