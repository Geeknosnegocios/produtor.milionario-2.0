import { Check, TrendingUp, Rocket, Code, Target } from "lucide-react";

const proofItems = [
  {
    icon: TrendingUp,
    text: "+R$ 200.000 em produtos LowTicket criados com Claude",
  },
  {
    icon: Rocket,
    text: "+1.000 alunos lançaram primeiro produto digital",
  },
  {
    icon: Code,
    text: "Página, copy e funil prontos em 1 hora — não meses",
  },
  {
    icon: Target,
    text: "Validação rápida com Meta Ads Library antes de investir",
  },
];

const ProofSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="animate-slide-up">
          <div className="relative">
            <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500 via-blue-600 to-emerald-500 rounded-3xl opacity-60 blur-sm animate-pulse-neon" />
            <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500 via-blue-600 to-emerald-500 rounded-3xl" />

            <div className="relative glass-card rounded-2xl md:rounded-3xl p-4 md:p-8">
              <div className="absolute top-0 left-0 w-16 md:w-24 h-16 md:h-24 bg-gradient-to-br from-blue-500/10 to-transparent rounded-tl-2xl md:rounded-tl-3xl" />
              <div className="absolute bottom-0 right-0 w-16 md:w-24 h-16 md:h-24 bg-gradient-to-tl from-emerald-500/10 to-transparent rounded-br-2xl md:rounded-br-3xl" />

              <div className="grid sm:grid-cols-2 gap-3 md:gap-5">
                {proofItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="group relative flex items-start gap-3 p-3 md:p-4 rounded-xl bg-white/[0.02] border border-white/5 transition-all duration-300 hover:bg-white/[0.05] hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:-translate-y-1"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/20 border border-blue-500/20 flex items-center justify-center group-hover:border-blue-500/40 transition-all duration-300">
                          <Icon className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-1 pt-0.5">
                        <span className="text-sm md:text-base font-medium text-slate-200 group-hover:text-white transition-colors duration-300">
                          {item.text}
                        </span>
                      </div>

                      <div className="absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-[0_0_10px_rgba(34,197,94,0.5)] opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100">
                        <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center pt-6 mt-6 md:pt-8 md:mt-8 border-t border-white/5">
                <p className="text-lg md:text-xl lg:text-2xl font-bold">
                  <span className="text-muted-foreground">Isso não é teoria.</span>{" "}
                  <span className="gradient-text">É oferta pronta para vender.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProofSection;
