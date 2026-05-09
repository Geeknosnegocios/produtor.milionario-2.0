import { Crown, Wrench, Sparkles, Zap, Clock, DollarSign, Target, FileX, X } from "lucide-react";

const otherCourses = [
  { icon: FileX, label: "ChatGPT básico" },
  { icon: X, label: "Prompt aleatório" },
  { icon: Clock, label: "Resultado em 60+ dias" },
  { icon: DollarSign, label: "R$1.997 a R$2.997" },
];

const produtorBenefits = [
  { icon: Sparkles, label: "Claude · IA premium dos americanos" },
  { icon: Zap, label: "7 comandos automatizados" },
  { icon: Target, label: "Produto LowTicket no ar em 1 hora" },
  { icon: Crown, label: "R$147 LowTicket vs R$1.997+ outros" },
];

const DifferenceSection = () => {
  return (
    <section className="border-white/[0.06] border-t pt-24 pb-24 px-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px]" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[140px]" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up max-w-3xl mx-auto">
          <p className="ty-eyebrow mb-4">[ DIFERENCIAL ]</p>
          <h2 className="ty-h2 mb-6">
            Outros cursos ensinam IA.<br />
            <span className="text-blue-400">Aqui você USA IA pra entregar produto.</span>
          </h2>
          <p className="ty-lead">
            Diferença entre quem coleciona ferramenta e quem coloca produto vendendo.
          </p>
        </div>

        {/* Comparison cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">

          {/* OUTROS · Faded card */}
          <div className="lg:col-span-5 relative rounded-[28px] border border-white/[0.08] bg-[#0E0F11] p-6 sm:p-8 hover:border-white/15 transition-colors duration-500 h-full flex flex-col">
            <span className="absolute -top-4 left-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-[#0E0F11] text-xs sm:text-sm text-white/50 font-mono tracking-tight">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
              CURSOS COMUNS
            </span>

            {/* Visual: faded chatgpt window */}
            <div className="relative h-44 sm:h-52 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.06] overflow-hidden p-4">
              <div className="bg-[#0B0C0E] border border-white/[0.06] rounded-xl p-4 h-full font-mono text-[10px]">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/[0.04]">
                  <div className="w-2 h-2 rounded-full bg-white/15"></div>
                  <div className="w-2 h-2 rounded-full bg-white/15"></div>
                  <div className="w-2 h-2 rounded-full bg-white/15"></div>
                  <span className="ml-2 text-white/30 text-[9px]">chatgpt-curso-generico.txt</span>
                </div>
                <div className="space-y-1.5">
                  <p className="text-white/30">Aula 47: "Como usar prompt..."</p>
                  <p className="text-white/30">Aula 48: "Mais sobre prompt..."</p>
                  <p className="text-white/30">Aula 49: "Decora isso aqui..."</p>
                  <p className="text-white/30">Aula 50: "Faz exercício X..."</p>
                  <p className="text-white/30">Aula 51: "Quem sabe um dia..."</p>
                  <p className="text-white/30 mt-2">Você: <span className="text-white/40">anota e esquece</span></p>
                  <p className="text-white/30 italic mt-1">Resultado: <span className="text-white/40 line-through">algum dia</span></p>
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="mt-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                <Wrench className="w-5 h-5 text-white/40" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl text-white/70 font-light tracking-tight">Outros cursos</h3>
                <p className="text-sm text-white/40 mt-1">Ensinam ferramentas, não resultados</p>
              </div>
            </div>

            {/* Feature list with X */}
            <div className="mt-5 space-y-2.5 flex-1">
              {otherCourses.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                    <div className="w-7 h-7 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-white/40" />
                    </div>
                    <span className="text-sm text-white/50">{item.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-white/[0.06]">
              <span className="text-xs text-white/40 font-mono">RESULTADO TÍPICO: <span className="text-white/30 line-through">talvez um dia</span></span>
            </div>
          </div>

          {/* PRODUTOR · Highlighted card */}
          <div className="lg:col-span-7 relative rounded-[28px] border border-blue-500/35 bg-[#0E0F11] p-6 sm:p-8 hover:border-blue-500/50 transition-colors duration-500 h-full flex flex-col">
            {/* Glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/15 blur-[100px] rounded-full"></div>

            <span className="absolute -top-4 left-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/40 bg-[#0E0F11] text-xs sm:text-sm text-blue-300 font-mono tracking-tight z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
              PRODUTOR MILIONÁRIO 2.0
            </span>

            {/* Visual: active claude terminal */}
            <div className="relative h-44 sm:h-52 rounded-2xl bg-gradient-to-br from-blue-950/40 to-[#0B0C0E] border border-blue-500/20 overflow-hidden p-4 z-10">
              <div className="bg-[#0B0C0E] border border-blue-500/25 rounded-xl p-4 h-full font-mono text-[10px]">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-blue-500/15">
                  <div className="w-2 h-2 rounded-full bg-red-400/40"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-400/40"></div>
                  <div className="w-2 h-2 rounded-full bg-blue-400/80"></div>
                  <span className="ml-2 text-blue-400/80 text-[9px]">claude · 7-skills.live</span>
                  <span className="ml-auto px-1.5 py-0.5 bg-blue-500/15 border border-blue-500/30 rounded text-blue-300 text-[8px]">LIVE</span>
                </div>
                <div className="space-y-1.5">
                  <p className="text-white/50">$ /pesquisar-nicho · "renda extra"</p>
                  <p className="text-blue-400">▸ 8 nichos quentes encontrados <span className="text-white/30">[30s]</span></p>
                  <p className="text-white/50">$ /AGENTE-PAGINA · gerando...</p>
                  <p className="text-blue-400">▸ HTML completo · página deployada <span className="text-white/30">[5min]</span></p>
                  <p className="text-white/50">$ /cakto-setup · funil ativo</p>
                  <p className="text-blue-400">▸ Checkout funcionando · pixel ok <span className="text-white/30">[30min]</span></p>
                  <p className="text-blue-300 mt-1.5">▸ Status: <span className="text-blue-400 font-bold">PRODUTO NO AR</span> <span className="animate-pulse">▮</span></p>
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="mt-6 flex items-start gap-4 z-10 relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/30 to-blue-600/20 border border-blue-400/40 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <Crown className="w-5 h-5 text-blue-300" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl text-white font-medium tracking-tight">Produtor Milionário 2.0</h3>
                <p className="text-sm text-blue-400 font-mono mt-1">LowTicket com Claude · método PIPE-IA</p>
              </div>
            </div>

            {/* Feature list */}
            <div className="mt-5 space-y-2.5 flex-1 z-10 relative">
              {produtorBenefits.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/[0.05] border border-blue-500/15 hover:bg-blue-500/[0.08] hover:border-blue-500/30 transition-colors">
                    <div className="w-8 h-8 rounded-md bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                      <Icon className="w-4 h-4 text-blue-300" strokeWidth={2} />
                    </div>
                    <span className="text-sm sm:text-base text-white/85">{item.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-blue-500/20 z-10 relative flex items-center justify-between">
              <span className="text-xs text-blue-400 font-mono">RESULTADO REAL</span>
              <span className="text-sm text-blue-300 font-mono">1 hora · primeira venda no mesmo dia</span>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="text-center mt-12 animate-slide-up" style={{ animationDelay: "300ms" }}>
          <p className="text-base md:text-lg text-white/50 tracking-tight">
            <span className="text-blue-400 font-medium">Método certo + ferramenta certa</span> = produto no ar antes do café esfriar.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DifferenceSection;
