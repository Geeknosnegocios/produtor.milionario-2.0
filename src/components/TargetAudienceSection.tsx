import { Check, X, Target } from "lucide-react";

const forYou = [
  "Quer lançar 1º produto digital — tem ideia mas não sabe começar",
  "Já tentou criar produto e desistiu — quer método diferente",
  "Tem dinheiro curto (R$147 cabe) — não vai gastar R$5k em agência",
  "Já usa ChatGPT mas quer subir de nível com Claude",
];

const notForYou = [
  "Quer ficar rico em 7 dias sem fazer nada",
  "Não vai dedicar 1 hora pra executar o método",
  "Procura promessa mágica — aqui é trabalho real",
  "Não acredita em IA — método é IA-first com Claude",
];

const TargetAudienceSection = () => {
  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[120px]" />

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-blue-500/40 mb-6">
            <Target className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-300">Qualificação</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold px-4">
            Pra Quem é o <span className="gradient-text">Produtor Milionário 2.0</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* For You Column */}
          <div className="relative group animate-slide-up" style={{ animationDelay: '100ms' }}>
            {/* Gradient border */}
            <div className="absolute -inset-[1px] bg-gradient-to-br from-green-500/50 to-emerald-500/50 rounded-2xl" />

            <div className="relative glass-card rounded-2xl p-6 md:p-8 h-full">
              <h3 className="text-xl font-bold mb-6 text-green-400 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                Isso é para você se:
              </h3>
              <div className="space-y-4">
                {forYou.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-xl bg-green-500/5 border border-green-500/10 hover:border-green-500/30 transition-colors duration-300"
                  >
                    <div className="w-6 h-6 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="font-medium text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Not For You Column */}
          <div className="relative group animate-slide-up" style={{ animationDelay: '200ms' }}>
            {/* Gradient border */}
            <div className="absolute -inset-[1px] bg-gradient-to-br from-red-500/30 to-orange-500/30 rounded-2xl" />

            <div className="relative glass-card rounded-2xl p-6 md:p-8 h-full">
              <h3 className="text-xl font-bold mb-6 text-red-400 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <X className="w-5 h-5" />
                </div>
                Não é para você se:
              </h3>
              <div className="space-y-4">
                {notForYou.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-xl bg-red-500/5 border border-red-500/10"
                  >
                    <div className="w-6 h-6 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-4 h-4 text-red-400" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;
