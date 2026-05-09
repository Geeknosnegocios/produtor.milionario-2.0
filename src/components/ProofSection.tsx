import { TrendingUp, Users, Zap } from "lucide-react";

const ProofSection = () => {
  return (
    <section className="border-white/[0.06] border-t pt-24 pb-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 animate-slide-up">
          <h2 className="ty-h2 mb-6">
            Não é teoria. <span className="text-blue-400">É produto vendendo.</span>
          </h2>
          <p className="ty-lead">
            Números reais de quem já executou o método. R$200k em 2 meses · +1.000 alunos · 1 hora pra colocar produto no ar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1 · Faturamento — Bloomberg-style line chart */}
          <div className="group relative rounded-2xl bg-[#0E0F11] border border-white/[0.08] overflow-hidden hover:border-blue-500/30 transition-colors duration-500 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[80px] rounded-full group-hover:bg-blue-500/20 transition-all duration-500"></div>

            <div className="p-8 relative z-10">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 text-blue-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">R$200k em 2 meses</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-8">
                Faturamento real de produtos LowTicket criados com Claude. Sem agência. Sem copy paga. Sem programador.
              </p>

              {/* Visual: animated area chart */}
              <div className="relative h-48 rounded-xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.06] overflow-hidden group-hover:border-white/10 transition-colors">
                {/* Header bar */}
                <div className="absolute top-0 left-0 right-0 px-3 py-2 flex items-center justify-between border-b border-white/[0.04] bg-black/30 z-20">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                    <span className="text-[9px] text-white/40 font-mono uppercase tracking-wider">FATURAMENTO · 8 SEMANAS</span>
                  </div>
                  <span className="text-[9px] text-blue-400 font-mono">+9.900%</span>
                </div>

                {/* Y-axis grid labels */}
                <div className="absolute inset-y-0 left-0 right-0 top-7 bottom-6 pointer-events-none">
                  {['200k', '150k', '100k', '50k'].map((label, i) => (
                    <div
                      key={label}
                      className="absolute left-2 text-[8px] text-white/25 font-mono"
                      style={{ top: `${i * 25}%` }}
                    >
                      {label}
                    </div>
                  ))}
                </div>

                {/* Chart SVG */}
                <svg
                  viewBox="0 0 400 130"
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="none"
                  style={{ paddingTop: '28px', paddingBottom: '24px', paddingLeft: '32px', paddingRight: '12px' }}
                >
                  <defs>
                    <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="lineStroke" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#60A5FA" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Horizontal grid lines */}
                  {[0, 32.5, 65, 97.5].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="400"
                      y2={y}
                      stroke="rgba(255,255,255,0.04)"
                      strokeDasharray="2 4"
                    />
                  ))}

                  {/* Area fill */}
                  <path
                    d="M 0 125 L 0 122 C 30 120, 50 116, 60 110 S 100 95, 120 85 S 180 60, 200 50 S 280 25, 320 18 L 400 8 L 400 130 L 0 130 Z"
                    fill="url(#areaFill)"
                  />

                  {/* Line */}
                  <path
                    d="M 0 122 C 30 120, 50 116, 60 110 S 100 95, 120 85 S 180 60, 200 50 S 280 25, 320 18 L 400 8"
                    stroke="url(#lineStroke)"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#glow)"
                    style={{
                      strokeDasharray: '600',
                      strokeDashoffset: '600',
                      animation: 'drawLine 2s ease-out 0.3s forwards'
                    }}
                  />

                  {/* Data points */}
                  {[
                    { x: 0, y: 122 },
                    { x: 60, y: 110 },
                    { x: 120, y: 85 },
                    { x: 200, y: 50 },
                    { x: 320, y: 18 },
                    { x: 400, y: 8 }
                  ].map((p, i) => (
                    <circle
                      key={i}
                      cx={p.x}
                      cy={p.y}
                      r="2.5"
                      fill="#3B82F6"
                      style={{
                        opacity: 0,
                        animation: `fadeInDot 0.3s ease-out ${0.5 + i * 0.25}s forwards`
                      }}
                    />
                  ))}

                  {/* Final pulsing dot */}
                  <circle
                    cx="395"
                    cy="8"
                    r="5"
                    fill="#60A5FA"
                    filter="url(#glow)"
                    style={{
                      opacity: 0,
                      animation: 'fadeInDot 0.4s ease-out 2.3s forwards, pulseDot 2s ease-in-out 2.7s infinite'
                    }}
                  />
                </svg>

                {/* Final value tooltip */}
                <div className="absolute top-10 right-3 z-10">
                  <div className="px-2.5 py-1.5 rounded-md bg-blue-500/15 border border-blue-500/40 backdrop-blur-sm">
                    <div className="text-[8px] text-blue-300/80 font-mono uppercase tracking-wider">final</div>
                    <div className="text-xs text-blue-200 font-mono font-semibold">R$ 200.347</div>
                  </div>
                </div>

                {/* Footer: timeline */}
                <div className="absolute bottom-0 left-0 right-0 px-3 py-1.5 flex items-center justify-between border-t border-white/[0.04] bg-black/30">
                  <span className="text-[8px] text-white/30 font-mono">SEM 1</span>
                  <span className="text-[8px] text-white/30 font-mono">SEM 4</span>
                  <span className="text-[8px] text-blue-400/70 font-mono">SEM 8</span>
                </div>
              </div>

              <style>{`
                @keyframes drawLine {
                  to { stroke-dashoffset: 0; }
                }
                @keyframes fadeInDot {
                  to { opacity: 1; }
                }
                @keyframes pulseDot {
                  0%, 100% { r: 5; opacity: 1; }
                  50% { r: 7; opacity: 0.7; }
                }
              `}</style>
            </div>
          </div>

          {/* Card 2 · Alunos */}
          <div className="group relative rounded-2xl bg-[#0E0F11] border border-white/[0.08] overflow-hidden hover:border-blue-500/30 transition-colors duration-500 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-400/10 blur-[80px] rounded-full group-hover:bg-blue-400/20 transition-all duration-500"></div>

            <div className="p-8 relative z-10">
              <div className="w-10 h-10 rounded-lg bg-blue-400/10 border border-blue-400/20 flex items-center justify-center mb-6 text-blue-300">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">+1.000 alunos ativos</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-8">
                Pessoas reais que lançaram primeiro produto digital seguindo o método. Comunidade VIP ativa todo dia.
              </p>

              {/* Visual: avatar cluster + stats */}
              <div className="relative h-48 rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden group-hover:border-white/10 transition-colors flex flex-col items-center justify-center gap-4">
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 border-2 border-[#0E0F11] flex items-center justify-center text-[10px] text-white font-bold"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-[11px] text-blue-200 font-mono">847 ONLINE AGORA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 · Velocidade */}
          <div className="group relative rounded-2xl bg-[#0E0F11] border border-white/[0.08] overflow-hidden hover:border-blue-500/30 transition-colors duration-500 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 blur-[80px] rounded-full group-hover:bg-blue-600/20 transition-all duration-500"></div>

            <div className="p-8 relative z-10">
              <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center mb-6 text-blue-400">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">1 hora pra lançar</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-8">
                Página, copy, funil e checkout no ar em 60 minutos. Outros cursos prometem 60 dias. Aqui é 60 minutos.
              </p>

              {/* Visual: time comparison */}
              <div className="relative h-48 rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden group-hover:border-white/10 transition-colors flex items-center justify-center p-6">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="8"
                      strokeDasharray="251.2"
                      strokeDashoffset="0"
                      className="drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-white tracking-tight">1h</span>
                    <span className="text-[10px] text-blue-400 uppercase tracking-wider font-medium">vs 60 dias</span>
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex justify-between text-[10px] font-mono">
                  <span className="text-white/40">OUTROS: 60 DIAS</span>
                  <span className="text-blue-400">CLAUDE: 1 HORA</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProofSection;
