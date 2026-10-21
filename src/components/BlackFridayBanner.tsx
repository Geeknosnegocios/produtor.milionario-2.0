import { Sparkles, ArrowRight } from "lucide-react";

// Banner da Edição Black Friday · linka pra /blackfriday (não abre checkout direto)
const BlackFridayBanner = () => (
  <section className="px-4 pb-14">
    <div className="max-w-5xl mx-auto">
      <a
        href="/blackfriday"
        className="group relative block overflow-hidden rounded-3xl border border-orange-500/40 bg-gradient-to-r from-[#1a0f05] via-[#241205] to-[#1a0f05] p-6 sm:p-8 shadow-[0_0_60px_rgba(249,115,22,0.18)] hover:border-orange-400/60 transition-colors"
      >
        <div className="absolute -top-20 left-1/3 w-[400px] h-[200px] bg-orange-500/15 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row items-center gap-5 sm:gap-8 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start flex-1 min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/40 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-[10px] sm:text-xs text-orange-300 font-mono uppercase tracking-widest font-bold">Edição Black Friday · 2026</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              Pacote completo:{" "}
              <span className="bg-gradient-to-br from-orange-300 via-orange-400 to-red-500 bg-clip-text text-transparent">formação + Pixel + Farm + GeekZap</span>
            </h3>
            <p className="text-sm text-white/55 mt-2">
              Um pacote, um preço consistente: R$247 à vista ou 12x de R$20,59.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white font-black text-sm uppercase tracking-wide shadow-[0_10px_30px_rgba(249,115,22,0.4)] group-hover:brightness-110 transition">
              Ver a edição
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </a>
    </div>
  </section>
);

export default BlackFridayBanner;
