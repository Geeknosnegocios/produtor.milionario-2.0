import { Check, X, Target, Rocket, RefreshCw, Wallet, Bot, Sparkles, AlertTriangle, Hourglass, MoonStar } from "lucide-react";

const forYou = [
  {
    icon: Rocket,
    title: "Quer lançar 1º produto digital",
    description: "Tem ideia mas não sabe por onde começar. Quer método validado pra parar de quebrar a cabeça."
  },
  {
    icon: RefreshCw,
    title: "Já tentou e desistiu",
    description: "Página em branco há 6 meses. Curso parado. Quer reset completo com método diferente."
  },
  {
    icon: Wallet,
    title: "Tem orçamento curto",
    description: "R$247 cabe. Não vai gastar R$5k em agência. Precisa de retorno antes de escalar investimento."
  },
  {
    icon: Bot,
    title: "Quer subir de nível",
    description: "Já usa ChatGPT no básico. Quer aprender Claude (IA premium) e transformar em receita real."
  },
];

const notForYou = [
  {
    icon: Sparkles,
    title: "Quer rico em 7 dias sem fazer nada",
    description: "Aqui é trabalho real. Não é promessa mágica nem botão dourado. Você executa o método."
  },
  {
    icon: Hourglass,
    title: "Não dedica 1 hora",
    description: "Método entrega produto em 1 hora SE você executar. Quem não executa não tem reembolso."
  },
  {
    icon: AlertTriangle,
    title: "Procura promessa fácil",
    description: "Não vendemos sonho. Vendemos sistema. Resultado depende da sua aplicação real."
  },
  {
    icon: MoonStar,
    title: "Não acredita em IA",
    description: "Método é IA-first com Claude. Se você acha IA é moda passageira, não é pra você."
  },
];

const TargetAudienceSection = () => {
  return (
    <section className="border-white/[0.06] border-t pt-24 pb-24 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-red-500/4 rounded-full blur-[140px]" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up max-w-3xl mx-auto">
          <p className="ty-eyebrow mb-4">
            <Target className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />
            Qualificação
          </p>
          <h2 className="ty-h2 mb-6">
            Pra Quem é o <span className="text-blue-400">Produtor Milionário 2.0</span>
          </h2>
          <p className="ty-lead">
            Filtro honesto. Antes de R$247 sair da sua conta, lê os dois lados.
          </p>
        </div>

        {/* Two big cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">

          {/* IS for you */}
          <div className="relative rounded-[28px] border border-blue-500/30 bg-[#0E0F11] p-6 sm:p-8 hover:border-blue-500/50 transition-colors duration-500 h-full flex flex-col group">
            {/* Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/15 blur-[100px] rounded-full"></div>

            <span className="absolute -top-4 left-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/40 bg-[#0E0F11] text-xs sm:text-sm text-blue-300 font-mono tracking-tight z-10">
              <Check className="w-3.5 h-3.5" />
              É PRA VOCÊ SE
            </span>

            {/* Persona avatars · visual */}
            <div className="relative h-32 rounded-2xl bg-gradient-to-br from-blue-950/40 to-[#0B0C0E] border border-blue-500/15 overflow-hidden flex items-center justify-center mb-6 z-10 px-3">
              <div className="flex items-center gap-1 sm:gap-2 max-w-full">
                {['M', 'A', 'P', 'R', 'C'].map((letter, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 sm:w-12 sm:h-12 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 border-2 border-[#0E0F11] flex items-center justify-center text-white font-bold text-xs sm:text-base shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                    style={{ marginLeft: i > 0 ? '-8px' : '0', zIndex: 5 - i }}
                  >
                    {letter}
                  </div>
                ))}
                <div className="ml-2 sm:ml-4 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 flex-shrink-0">
                  <span className="text-[10px] sm:text-xs text-blue-300 font-mono whitespace-nowrap">+1k alunos</span>
                </div>
              </div>
            </div>

            <h3 className="ty-h4 mb-1 z-10 relative">Persona Ideal</h3>
            <p className="text-sm text-blue-400 font-mono mb-5 z-10 relative">
              Quem cabe no método PIPE-IA
            </p>

            <div className="space-y-3 flex-1 z-10 relative">
              {forYou.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-xl bg-blue-500/[0.05] border border-blue-500/15 hover:bg-blue-500/[0.08] hover:border-blue-500/30 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                      <Icon className="w-4 h-4 text-blue-300" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm sm:text-base font-semibold text-white mb-0.5">{item.title}</p>
                      <p className="text-xs sm:text-sm text-white/55 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-blue-500/20 flex items-center justify-between z-10 relative">
              <span className="text-xs text-blue-400 font-mono">VOCÊ SE ENCAIXA</span>
              <span className="text-sm text-blue-300 font-mono">→ R$247 vale cada centavo</span>
            </div>
          </div>

          {/* IS NOT for you */}
          <div className="relative rounded-[28px] border border-red-500/20 bg-[#0E0F11] p-6 sm:p-8 hover:border-red-500/40 transition-colors duration-500 h-full flex flex-col group">
            <span className="absolute -top-4 left-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/40 bg-[#0E0F11] text-xs sm:text-sm text-red-300 font-mono tracking-tight">
              <X className="w-3.5 h-3.5" />
              NÃO É PRA VOCÊ SE
            </span>

            {/* Visual: blocked indicators */}
            <div className="relative h-32 rounded-2xl bg-gradient-to-br from-red-950/30 to-[#0B0C0E] border border-red-500/15 overflow-hidden flex items-center justify-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full border-2 border-red-500/40 bg-red-500/10 flex items-center justify-center">
                  <X className="w-7 h-7 text-red-400" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="h-1.5 w-32 bg-red-500/30 rounded-full overflow-hidden">
                    <div className="h-full w-1/4 bg-red-500/60"></div>
                  </div>
                  <div className="h-1.5 w-24 bg-red-500/20 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-red-500/50"></div>
                  </div>
                  <span className="text-[10px] text-red-400/80 font-mono mt-1">match: 0%</span>
                </div>
              </div>
            </div>

            <h3 className="ty-h4 mb-1">Não é compatível</h3>
            <p className="text-sm text-red-400 font-mono mb-5">
              Filtro pra evitar reembolso desnecessário
            </p>

            <div className="space-y-3 flex-1">
              {notForYou.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-xl bg-red-500/[0.04] border border-red-500/10 hover:bg-red-500/[0.06] hover:border-red-500/25 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-red-500/15 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-red-400" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm sm:text-base font-semibold text-white/85 mb-0.5">{item.title}</p>
                      <p className="text-xs sm:text-sm text-white/45 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-red-500/15 flex items-center justify-between">
              <span className="text-xs text-red-400/80 font-mono">VOCÊ NÃO SE ENCAIXA</span>
              <span className="text-sm text-red-300/80 font-mono">→ não compre</span>
            </div>
          </div>
        </div>

        {/* Honesty footer */}
        <div className="text-center mt-12 animate-slide-up" style={{ animationDelay: "300ms" }}>
          <p className="text-base md:text-lg text-white/50 tracking-tight max-w-2xl mx-auto">
            Filtramos pra você. <span className="text-blue-400 font-medium">Aluno errado quebra estatística</span> e atrapalha quem realmente quer aprender.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;
