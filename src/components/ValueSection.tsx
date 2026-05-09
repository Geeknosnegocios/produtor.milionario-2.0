import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BookmarkButton } from "@/components/ui/bookmark-button";
import { Check, ArrowRight, Gift, Sparkles, AlertCircle, Users, Clock, Lock, TrendingUp, Flame, CreditCard, BookOpen, Layers, Boxes, Infinity as InfinityIcon, MessageCircle, Zap } from "lucide-react";

const valueItems = [
  {
    item: "Curso Era IA",
    sub: "6 módulos novos · 24 aulas · método PIPE-IA",
    icon: Sparkles,
    badge: "ESTRELA",
    value: 1997
  },
  {
    item: "Curso Fundamentos",
    sub: "6 módulos legado · 30 aulas · base sólida",
    icon: BookOpen,
    badge: "BASE",
    value: 497
  },
  {
    item: "16 Módulos Avançado",
    sub: "Elementor · CapCut · Quiz · Tracking · Plugins",
    icon: Layers,
    badge: "BÔNUS",
    value: 497
  },
  {
    item: "8 Bônus Exclusivos",
    sub: "Quiz · Templates · Comunidade · Geek SAAS",
    icon: Gift,
    badge: "PREMIUM",
    value: 3776
  },
  {
    item: "Acesso Vitalício",
    sub: "Curso pra sempre · todas atualizações futuras inclusas",
    icon: InfinityIcon,
    badge: "FOREVER",
    value: 497
  },
  {
    item: "Comunidade Geek Produtores",
    sub: "30 dias VIP · suporte direto · feedback de produto",
    icon: MessageCircle,
    badge: "30 DIAS",
    value: 97
  },
];

const monthsPt = ['jan', 'fev', 'mar', 'abr', 'maio', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

// Evergreen deadline · always jumps to next end-of-month if <5 days away
const getEvergreenDeadline = () => {
  const now = new Date();
  const eom = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const daysLeft = Math.ceil((eom.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const target = daysLeft < 5
    ? new Date(now.getFullYear(), now.getMonth() + 2, 0)
    : eom;
  return `${target.getDate()} ${monthsPt[target.getMonth()]}`;
};

// Live viewers · randomized 70-130 with ±5 jitter every 8s
const getLiveViewers = () => 70 + Math.floor(Math.random() * 60);

const ValueSection = () => {
  const [deadline, setDeadline] = useState(getEvergreenDeadline());
  const [viewers, setViewers] = useState(getLiveViewers());

  useEffect(() => {
    // Update deadline at midnight (catches month-end rollover)
    const tick = setInterval(() => setDeadline(getEvergreenDeadline()), 60 * 1000);
    // Live viewers fluctuation
    const viewersTick = setInterval(() => {
      setViewers((v) => Math.max(60, Math.min(140, v + (Math.random() > 0.5 ? 1 : -1) * (1 + Math.floor(Math.random() * 5)))));
    }, 8000);
    return () => {
      clearInterval(tick);
      clearInterval(viewersTick);
    };
  }, []);

  const total = valueItems.reduce((acc, item) => acc + item.value, 0);
  const offerPrice = 147;
  const discount = Math.round(((total - offerPrice) / total) * 100);

  const handleCTA = () => {
    import("@/lib/tracking").then(({ trackInitiateCheckout }) => trackInitiateCheckout({ value: 147, source: 'value-section' }));
    window.open("https://pay.cakto.com.br/y2pgfgv_879248", "_blank");
  };

  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <p className="ty-eyebrow mb-4">
            <Gift className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />
            Oferta Completa
          </p>
          <h2 className="ty-h2 mb-6">
            Tudo Que Você Recebe{" "}
            <span className="text-blue-400">Hoje</span>
          </h2>
          <p className="ty-lead max-w-2xl mx-auto">
            Produto LowTicket no ar em 1 hora com Claude. Garantia de Resultado.
          </p>
        </div>

        {/* REASON WHY · Featured manifesto block */}
        <div className="mb-12 animate-slide-up" style={{ animationDelay: "50ms" }}>
          <div className="relative">
            {/* Outer glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-yellow-500/20 rounded-3xl blur-2xl"></div>

            <div className="relative bg-[#0E0F11] border border-orange-500/30 rounded-3xl overflow-hidden">

              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500"></div>

              {/* Content */}
              <div className="p-6 sm:p-10 lg:p-12">

                {/* Eyebrow */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-px flex-1 max-w-[60px] bg-orange-500/40"></div>
                  <Flame className="w-5 h-5 text-orange-400 animate-pulse" />
                  <span className="text-xs sm:text-sm text-orange-400 uppercase font-mono tracking-[0.18em] font-bold">
                    Filtro Honesto
                  </span>
                  <Flame className="w-5 h-5 text-orange-400 animate-pulse" />
                  <div className="h-px flex-1 max-w-[60px] bg-orange-500/40"></div>
                </div>

                {/* Main question */}
                <h3 className="text-3xl sm:text-4xl lg:text-5xl text-white font-light tracking-tighter text-center mb-4 leading-[1.05]">
                  Por que <span className="text-orange-400 font-medium">R$147</span> e não <span className="line-through text-white/30">R$1.997</span>?
                </h3>

                {/* Manifesto */}
                <p className="text-base sm:text-lg lg:text-xl text-white/70 text-center max-w-2xl mx-auto leading-relaxed mb-10">
                  Preferimos <strong className="text-white">100 alunos executando</strong> do que <strong className="text-white">10 olhando</strong>.
                  Esse preço vale só pra <span className="text-orange-300 font-semibold">turma piloto 2026</span>.
                </p>

                {/* Price progression · 3 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {/* HOJE · current */}
                  <div className="relative rounded-2xl bg-gradient-to-br from-blue-500/15 to-blue-600/10 border-2 border-blue-500/50 p-5 shadow-[0_0_30px_rgba(59,130,246,0.25)]">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
                      VOCÊ ESTÁ AQUI
                    </div>
                    <p className="text-xs text-blue-300 uppercase font-mono tracking-wider mb-2 text-center">Hoje · turma piloto</p>
                    <p className="text-4xl lg:text-5xl font-black text-white text-center">
                      R$<span className="text-blue-300">147</span>
                    </p>
                    <p className="text-[10px] text-blue-400/70 text-center mt-2 font-mono">12x de R$14,87</p>
                  </div>

                  {/* TURMA 2 */}
                  <div className="relative rounded-2xl bg-white/[0.02] border border-white/10 p-5">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/10 text-white/60 text-[10px] font-bold uppercase tracking-wider">
                      Próxima
                    </div>
                    <p className="text-xs text-white/40 uppercase font-mono tracking-wider mb-2 text-center">Turma 2</p>
                    <p className="text-4xl lg:text-5xl font-black text-white/40 text-center line-through">
                      R$497
                    </p>
                    <p className="text-[10px] text-white/30 text-center mt-2 font-mono">+R$350</p>
                  </div>

                  {/* TURMA 3+ */}
                  <div className="relative rounded-2xl bg-white/[0.02] border border-white/10 p-5">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/10 text-white/60 text-[10px] font-bold uppercase tracking-wider">
                      Cheio
                    </div>
                    <p className="text-xs text-white/40 uppercase font-mono tracking-wider mb-2 text-center">Turma 3+</p>
                    <p className="text-4xl lg:text-5xl font-black text-white/40 text-center line-through">
                      R$997
                    </p>
                    <p className="text-[10px] text-white/30 text-center mt-2 font-mono">+R$850</p>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-sm sm:text-base text-white/60 text-center max-w-2xl mx-auto mb-8 italic">
                  "Você não tá comprando barato. Tá comprando antes do mercado descobrir."
                </p>

                {/* Urgency stats · 3 cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {/* Vagas */}
                  <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-red-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-red-400/80 uppercase font-mono tracking-wider mb-0.5">Vagas Restantes</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-black text-white">33</span>
                          <span className="text-xs text-red-300">/ 50</span>
                        </div>
                        {/* Progress bar */}
                        <div className="mt-1.5 h-1 w-full bg-red-500/15 rounded-full overflow-hidden">
                          <div className="h-full w-[34%] bg-gradient-to-r from-red-500 to-orange-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tempo · evergreen */}
                  <div className="rounded-xl bg-orange-500/10 border border-orange-500/30 p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-orange-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] text-orange-400/80 uppercase font-mono tracking-wider mb-0.5">Preço Vence</p>
                        <p className="text-base font-black text-white">{deadline}</p>
                        <p className="text-[10px] text-orange-300 font-mono mt-0.5">23h59 · sem prorrogação</p>
                      </div>
                    </div>
                  </div>

                  {/* Próxima turma */}
                  <div className="rounded-xl bg-blue-500/10 border border-blue-500/30 p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0">
                        <Lock className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] text-blue-400/80 uppercase font-mono tracking-wider mb-0.5">Próxima Turma</p>
                        <p className="text-base font-black text-white">R$497</p>
                        <p className="text-[10px] text-blue-300 font-mono mt-0.5">+238% vs hoje</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative animate-slide-up" style={{ animationDelay: "100ms" }}>
          <div className="absolute -inset-[1px] bg-gradient-to-br from-blue-500/50 via-blue-500/50 to-blue-500/50 rounded-3xl" />

          <div className="relative glass-card rounded-2xl md:rounded-3xl p-4 md:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
              <div>
                <p className="text-[10px] sm:text-xs text-blue-400 uppercase font-mono tracking-[0.18em] font-bold">Stack Completo</p>
                <p className="text-base sm:text-lg text-white font-medium mt-0.5">{valueItems.length} entregas inclusas</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] sm:text-xs text-white/40 uppercase font-mono tracking-wider">Soma</p>
                <p className="text-xl sm:text-2xl text-white/80 line-through font-mono font-bold">R$ {total.toLocaleString("pt-BR")}</p>
              </div>
            </div>

            {/* Visual stack rows */}
            <div className="space-y-2.5 mb-6 md:mb-8">
              {valueItems.map((item, index) => {
                const Icon = item.icon;
                const percentOfTotal = (item.value / total) * 100;
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/30 hover:bg-blue-500/[0.04] transition-all duration-300"
                  >
                    {/* Background bar showing % of total */}
                    <div
                      className="absolute inset-y-0 left-0 bg-blue-500/[0.04] group-hover:bg-blue-500/[0.08] transition-colors duration-500"
                      style={{ width: `${percentOfTotal}%` }}
                    ></div>

                    <div className="relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
                      {/* Number + Icon */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[10px] text-blue-400/60 font-mono w-5 text-right">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 flex items-center justify-center group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" strokeWidth={1.75} />
                        </div>
                      </div>

                      {/* Title + sub */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm sm:text-base font-semibold text-white truncate">{item.item}</span>
                          <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-blue-500/15 border border-blue-500/30 text-blue-300 rounded uppercase tracking-wider flex-shrink-0">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-white/45 truncate">{item.sub}</p>
                      </div>

                      {/* Price + check */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="text-right">
                          <p className="text-sm sm:text-base font-mono font-bold text-blue-300 whitespace-nowrap">
                            R$ {item.value.toLocaleString("pt-BR")}
                          </p>
                          <p className="text-[9px] text-blue-400/60 font-mono uppercase tracking-wider">incluso</p>
                        </div>
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center group-hover:bg-blue-500 group-hover:border-blue-400 transition-colors duration-300">
                          <Check className="w-3 h-3 text-blue-300 group-hover:text-white transition-colors duration-300" strokeWidth={3} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total bar with visual savings */}
            <div className="mb-6 md:mb-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/30 p-4 sm:p-5 overflow-hidden relative">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[10px] sm:text-xs text-blue-400 uppercase font-mono tracking-[0.18em] font-bold">Valor Real Total</p>
                  <p className="text-2xl sm:text-3xl font-black text-white/80 line-through tracking-tighter">R$ {total.toLocaleString("pt-BR")}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] sm:text-xs text-blue-400 uppercase font-mono tracking-[0.18em] font-bold">Economia</p>
                  <p className="text-2xl sm:text-3xl font-black text-blue-300 tracking-tighter">R$ {(total - offerPrice).toLocaleString("pt-BR")}</p>
                </div>
              </div>
              {/* Progress bar */}
              <div className="h-2 w-full bg-white/[0.04] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.5)] rounded-full"
                  style={{ width: `${100 - (offerPrice / total) * 100}%` }}
                ></div>
              </div>
              <p className="text-[10px] sm:text-xs text-blue-300 font-mono mt-2 text-center">
                {discount}% OFF · você paga só {((offerPrice / total) * 100).toFixed(1)}% do valor real
              </p>
            </div>

            {/* PRICE BLOCK · IMPACT MAX */}
            <div className="relative mb-6 md:mb-8">
              {/* Outer glow */}
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/30 via-blue-400/30 to-blue-600/30 rounded-3xl blur-3xl opacity-70"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-blue-400 rounded-3xl blur-md opacity-40"></div>

              <div className="relative bg-gradient-to-br from-[#0a0e1a] via-[#0E0F11] to-[#0a0e1a] border-2 border-blue-500/40 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(59,130,246,0.3)]">

                {/* Top urgency bar */}
                <div className="bg-gradient-to-r from-red-500/15 via-orange-500/15 to-red-500/15 border-b border-orange-500/20 px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="text-xs text-red-300 font-mono uppercase tracking-wider font-bold">AO VIVO</span>
                    <span className="text-xs text-white/70">· {viewers} pessoas vendo essa página agora</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-orange-400" />
                    <span className="text-xs text-orange-300 font-mono">expira {deadline} · 23h59</span>
                  </div>
                </div>

                <div className="p-6 md:p-10">
                  {/* Eyebrow */}
                  <p className="text-center mb-2">
                    <span className="text-xs sm:text-sm text-blue-400 uppercase font-mono tracking-[0.18em] font-bold">
                      → Oferta Especial · Turma Piloto 2026
                    </span>
                  </p>

                  {/* Comparison anchors */}
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="text-center">
                      <p className="text-[10px] text-white/40 uppercase font-mono tracking-wider">de</p>
                      <p className="text-xl sm:text-2xl text-white/40 line-through font-bold">R$ {total.toLocaleString("pt-BR")}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-400" />
                    <div className="text-center">
                      <p className="text-[10px] text-blue-400 uppercase font-mono tracking-wider">por apenas</p>
                    </div>
                  </div>

                  {/* MASSIVE PRICE */}
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center gap-2 mb-1">
                      <span className="text-3xl sm:text-4xl text-blue-300 font-light">R$</span>
                      <span className="text-7xl sm:text-8xl lg:text-9xl font-black bg-gradient-to-br from-blue-300 via-blue-400 to-blue-600 bg-clip-text text-transparent leading-none tracking-tighter">
                        {offerPrice}
                      </span>
                      <span className="text-2xl sm:text-3xl text-blue-300/70 font-light">,00</span>
                    </div>

                    {/* Savings highlight */}
                    <div className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-blue-500 text-white rounded-full font-bold text-sm md:text-base shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                      <Sparkles className="w-4 h-4" />
                      VOCÊ ECONOMIZA R$ {(total - offerPrice).toLocaleString("pt-BR")}
                      <span className="text-blue-100">· {discount}% OFF</span>
                    </div>
                  </div>

                  {/* Anchor comparisons · 3 columns */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 max-w-2xl mx-auto">
                    <div className="rounded-lg bg-white/[0.02] border border-white/[0.06] p-3 text-center">
                      <p className="text-[10px] text-white/40 uppercase font-mono tracking-wider mb-1">1 jantar fora</p>
                      <p className="text-sm font-bold text-white/60 line-through">R$ 150</p>
                    </div>
                    <div className="rounded-lg bg-white/[0.02] border border-white/[0.06] p-3 text-center">
                      <p className="text-[10px] text-white/40 uppercase font-mono tracking-wider mb-1">1 sessão psicólogo</p>
                      <p className="text-sm font-bold text-white/60 line-through">R$ 200</p>
                    </div>
                    <div className="rounded-lg bg-blue-500/10 border border-blue-500/40 p-3 text-center">
                      <p className="text-[10px] text-blue-300 uppercase font-mono tracking-wider mb-1">Era IA</p>
                      <p className="text-sm font-bold text-blue-300">R$ 147</p>
                    </div>
                  </div>

                  {/* Per-day breakdown */}
                  <div className="text-center mb-6 py-3 px-4 rounded-xl bg-blue-500/[0.05] border border-blue-500/15 max-w-md mx-auto">
                    <p className="text-xs sm:text-sm text-white/60">
                      <span className="text-blue-300 font-bold">R$ 0,40/dia</span> se você usar o curso por 1 ano
                      <br />
                      <span className="text-white/40 text-xs">(menos que metade de 1 cafezinho)</span>
                    </p>
                  </div>

                  {/* Payment methods */}
                  <div className="flex items-center justify-center gap-3 flex-wrap mb-6">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/[0.08]">
                      <span className="text-blue-300 font-bold text-xs">PIX</span>
                      <span className="text-white/50 text-xs">à vista</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/[0.08]">
                      <CreditCard className="w-3.5 h-3.5 text-blue-300" />
                      <span className="text-white/70 text-xs">12x R$ 14,87</span>
                      <span className="text-blue-300 text-[10px] font-mono">SEM JUROS</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/[0.08]">
                      <span className="text-white/70 text-xs">Boleto</span>
                    </div>
                  </div>

                  {/* CTA · Bookmark style */}
                  <div className="flex justify-center">
                    <BookmarkButton
                      size="xl"
                      onClick={handleCTA}
                      text={
                        <>
                          <span className="sm:hidden">QUERO ACESSO · R$147</span>
                          <span className="hidden sm:inline">SIM, QUERO ACESSO HOJE · R$147</span>
                        </>
                      }
                      sub="acesso liberado em 1 minuto"
                      className="animate-pulse-glow"
                    />
                  </div>

                  {/* Trust line · scrollable mobile */}
                  <div className="overflow-x-auto mt-4">
                    <p className="text-center text-[10px] sm:text-xs text-white/40 mt-1 font-mono whitespace-nowrap">
                      🔒 Pagamento 100% seguro · Cakto · SSL 256-bit · Dados criptografados
                    </p>
                  </div>
                </div>
              </div>
            </div>

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
