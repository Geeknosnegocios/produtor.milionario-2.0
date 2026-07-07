import { X, Check, ArrowRight, AlertTriangle, Zap, Clock, Banknote, Target, Sparkles } from "lucide-react";

const painPoints = [
  { icon: Target, text: "Quer começar mas não sabe que produto vender" },
  { icon: AlertTriangle, text: "Trava na página em branco · copy, design, tráfego" },
  { icon: Banknote, text: "Cota agência R$5k, copywriter R$1.5k, designer R$800" },
  { icon: Clock, text: "2 anos juntando curso, R$8k investidos, zero produto no ar" },
];

const solutions = [
  { icon: Target, text: "Tem ideia validada com Meta Ads em 30s" },
  { icon: Sparkles, text: "Página criada em 25 min com Claude · sem dev" },
  { icon: Zap, text: "Funil completo Cakto + deploy em 30 min" },
  { icon: Banknote, text: "Primeiro criativo + tráfego em 15 min" },
];

const PainPointsSection = () => {
  return (
    <section className="border-white/[0.06] border-t pt-24 pb-24 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-[140px]" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-12 animate-slide-up">
          <h2 className="ty-h2">
            Você tem ideia há meses.<br />
            <span className="text-blue-400">Outros já estão com produto no ar.</span>
          </h2>
          <span aria-hidden="true" className="hidden md:block w-px bg-white/10 h-16 ml-auto"></span>
          <p className="ty-lead md:max-w-[220px]">
            O jogo mudou. Vence quem lança primeiro, não quem estuda mais.
          </p>
        </div>
        <div className="h-px bg-white/[0.06] mb-12"></div>

        {/* Two-card comparison · side-by-side always */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-2 sm:gap-6 lg:gap-8 items-stretch">

          {/* ANTES · Pain card */}
          <div className="lg:col-span-5 relative rounded-2xl sm:rounded-[28px] border border-red-500/20 bg-[#0E0F11] p-3 sm:p-6 lg:p-8 hover:border-red-500/40 transition-colors duration-500 h-full flex flex-col group">
            <span className="absolute -top-3 sm:-top-4 left-3 sm:left-6 inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-1.5 rounded-full border border-red-500/40 bg-[#0E0F11] text-[9px] sm:text-sm text-red-300 font-mono tracking-tight">
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              <span className="hidden sm:inline">ANTES · </span>SEM CLAUDE
            </span>

            {/* Visual: terminal error mockup */}
            <div className="relative h-28 sm:h-44 lg:h-52 rounded-lg sm:rounded-2xl bg-gradient-to-br from-red-950/30 to-[#0B0C0E] border border-red-500/10 overflow-hidden p-1.5 sm:p-4 mt-2 sm:mt-0">
              <div className="bg-[#0B0C0E] border border-red-500/15 rounded sm:rounded-xl p-1.5 sm:p-4 h-full font-mono text-[7px] sm:text-[10px] overflow-hidden">
                <div className="flex items-center gap-1 sm:gap-2 mb-1.5 sm:mb-3 pb-1 sm:pb-2 border-b border-red-500/10">
                  <div className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-red-400/80"></div>
                  <div className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-yellow-400/40"></div>
                  <div className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-white/10"></div>
                  <span className="ml-1 sm:ml-2 text-red-400/80 text-[6px] sm:text-[9px] truncate">sem-metodo.sh</span>
                </div>
                <div className="space-y-0.5 sm:space-y-1.5">
                  <p className="text-white/40 truncate">$ tentando_criar_produto</p>
                  <p className="text-red-400 truncate">[ERROR] página em branco</p>
                  <p className="text-red-400 truncate">[ERROR] agência: R$5.000</p>
                  <p className="text-red-400 truncate hidden sm:block">[ERROR] copywriter: R$1.500</p>
                  <p className="text-red-400 truncate hidden sm:block">[ERROR] designer: R$800</p>
                  <p className="text-red-400 truncate hidden sm:block">[ERROR] zero clientes</p>
                  <p className="text-white/40 mt-1 sm:mt-2 truncate">saldo: <span className="text-red-400">-R$8k</span></p>
                </div>
              </div>
            </div>

            {/* Title + bullets */}
            <h3 className="mt-3 sm:mt-6 text-base sm:text-2xl lg:text-3xl text-white tracking-tighter font-medium">
              Modo difícil
            </h3>
            <p className="mt-1 sm:mt-2 text-[9px] sm:text-xs text-red-400/80 font-mono">SEM método com Claude</p>

            <div className="mt-3 sm:mt-5 space-y-1.5 sm:space-y-2.5 flex-1">
              {painPoints.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-2 sm:gap-3 p-1.5 sm:p-2.5 rounded sm:rounded-lg bg-red-500/[0.04] border border-red-500/10">
                    <div className="w-5 h-5 sm:w-7 sm:h-7 rounded sm:rounded-md bg-red-500/15 border border-red-500/25 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-red-400" strokeWidth={2} />
                    </div>
                    <span className="text-[10px] sm:text-sm text-white/70 leading-snug sm:leading-relaxed">{item.text}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 sm:mt-5 pt-2 sm:pt-4 border-t border-red-500/10 flex items-center justify-between gap-2">
              <span className="text-[9px] sm:text-xs text-red-400/80 font-mono">RESULTADO</span>
              <span className="text-[9px] sm:text-sm text-red-300 font-mono truncate">60d · R$8k · 0 vendas</span>
            </div>
          </div>

          {/* Center · transformation arrow */}
          <div className="lg:col-span-2 hidden lg:flex items-center justify-center">
            <div className="relative flex flex-col items-center gap-3">
              <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full"></div>
              <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 border-2 border-blue-400/40 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                <ArrowRight className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div className="relative text-[10px] text-blue-300 font-mono uppercase tracking-widest">Claude</div>
            </div>
          </div>

          {/* DEPOIS · Solution card */}
          <div className="lg:col-span-5 relative rounded-2xl sm:rounded-[28px] border border-blue-500/30 bg-[#0E0F11] p-3 sm:p-6 lg:p-8 hover:border-blue-500/50 transition-colors duration-500 h-full flex flex-col group">
            <span className="absolute -top-3 sm:-top-4 left-3 sm:left-6 inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-1.5 rounded-full border border-blue-500/40 bg-[#0E0F11] text-[9px] sm:text-sm text-blue-300 font-mono tracking-tight">
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
              <span className="hidden sm:inline">DEPOIS · </span>COM CLAUDE
            </span>

            {/* Visual: terminal success mockup */}
            <div className="relative h-28 sm:h-44 lg:h-52 rounded-lg sm:rounded-2xl bg-gradient-to-br from-blue-950/40 to-[#0B0C0E] border border-blue-500/15 overflow-hidden p-1.5 sm:p-4 mt-2 sm:mt-0">
              <div className="bg-[#0B0C0E] border border-blue-500/20 rounded sm:rounded-xl p-1.5 sm:p-4 h-full font-mono text-[7px] sm:text-[10px] overflow-hidden">
                <div className="flex items-center gap-1 sm:gap-2 mb-1.5 sm:mb-3 pb-1 sm:pb-2 border-b border-blue-500/10">
                  <div className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-red-400/40"></div>
                  <div className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-yellow-400/40"></div>
                  <div className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-blue-400/80"></div>
                  <span className="ml-1 sm:ml-2 text-blue-400/80 text-[6px] sm:text-[9px] truncate">claude-pipe-ia.sh</span>
                </div>
                <div className="space-y-0.5 sm:space-y-1.5">
                  <p className="text-white/40 truncate">$ /pesquisar-nicho</p>
                  <p className="text-blue-400 truncate">[OK] nicho · 30s</p>
                  <p className="text-white/40 truncate hidden sm:block">$ /criar-lowticket</p>
                  <p className="text-blue-400 truncate hidden sm:block">[OK] produto · 2min</p>
                  <p className="text-white/40 truncate">$ /AGENTE-PAGINA</p>
                  <p className="text-blue-400 truncate">[OK] página · 5min</p>
                  <p className="text-white/40 truncate hidden sm:block">$ /cakto-setup</p>
                  <p className="text-blue-400 truncate hidden sm:block">[OK] funil · 30min</p>
                  <p className="text-blue-300 mt-1 sm:mt-2 truncate">saldo: <span className="text-blue-400 font-bold">+R$200k</span></p>
                </div>
              </div>
            </div>

            {/* Title + bullets */}
            <h3 className="mt-3 sm:mt-6 text-base sm:text-2xl lg:text-3xl text-white tracking-tighter font-medium">
              Modo Claude
            </h3>
            <p className="mt-1 sm:mt-2 text-[9px] sm:text-xs text-blue-400 font-mono">COM 7 skills + IA premium</p>

            <div className="mt-3 sm:mt-5 space-y-1.5 sm:space-y-2.5 flex-1">
              {solutions.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-2 sm:gap-3 p-1.5 sm:p-2.5 rounded sm:rounded-lg bg-blue-500/[0.05] border border-blue-500/15 hover:bg-blue-500/[0.08] hover:border-blue-500/30 transition-colors">
                    <div className="w-5 h-5 sm:w-7 sm:h-7 rounded sm:rounded-md bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                      <Check className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-blue-300" strokeWidth={2.5} />
                    </div>
                    <span className="text-[10px] sm:text-sm text-white/85 leading-snug sm:leading-relaxed">{item.text}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 sm:mt-5 pt-2 sm:pt-4 border-t border-blue-500/15 flex items-center justify-between gap-2">
              <span className="text-[9px] sm:text-xs text-blue-400 font-mono">RESULTADO</span>
              <span className="text-[9px] sm:text-sm text-blue-300 font-mono truncate">1h · R$247 · venda</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA line */}
        <div className="text-center mt-12 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <p className="text-base md:text-lg text-white/50 tracking-tight">
            Tá na hora de parar de assistir{" "}
            <span className="text-blue-400 font-medium">e começar a lançar.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;
