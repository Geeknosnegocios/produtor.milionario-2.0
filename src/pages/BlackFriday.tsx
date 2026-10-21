import { useEffect } from "react";
import { BookOpen, Crosshair, Sprout, MessageCircle, Check, ShieldCheck } from "lucide-react";
import { BookmarkButton } from "@/components/ui/bookmark-button";
import { trackInitiateCheckout, trackViewContent } from "@/lib/tracking";

// ===== CONFIG (preencher) =====
// Link do checkout da Edição Black Friday.
// DEFAULT: mesmo link do produto atual (opção perpetuo R$247).
// Se a edição ganhar oferta própria na Cakto, trocar aqui (1 lugar só).
const BF_CHECKOUT_URL = "https://pay.geekacademy.site/c/produtor-milion-rio-2-0-up?o=perpetuo-fpm2-0";

const goCheckout = (origem: string) => {
  trackInitiateCheckout({ value: 247, source: origem });
  window.open(BF_CHECKOUT_URL, "_blank", "noopener,noreferrer");
};

// Composição da Edição Black Friday (plano 15/10/2026):
// FPM 2.0 (método) + Infinity Pixel + Infinity Farm + 3 meses de GeekZap.
const itensEdicao = [
  { Icon: BookOpen, t: "Produtor Milionário 2.0", tag: "MÉTODO", d: "A formação completa: criar o produto, o funil e a página com IA e colocar pra vender." },
  { Icon: Crosshair, t: "Infinity Pixel", tag: "TRACKING", d: "Pixel próprio com Conversions API — o anúncio sabe quem está no funil." },
  { Icon: Sprout, t: "Infinity Farm", tag: "DISTRIBUIÇÃO", d: "Recursos pra operar o tráfego e a criação de campanha no dia a dia." },
  { Icon: MessageCircle, t: "GeekZap", tag: "3 MESES", d: "Execução no WhatsApp inclusa por 3 meses pra acompanhar contatos." },
];

const etapas = [
  { n: "1", t: "Criar", d: "FPM 2.0 leva do nicho ao produto e à página de vendas." },
  { n: "2", t: "Colocar no ar", d: "Pixel e Farm cobrem tracking, anúncio e distribuição." },
  { n: "3", t: "Acompanhar contatos", d: "GeekZap segura a conversa no WhatsApp por 3 meses." },
];

const BlackFriday = () => {
  useEffect(() => {
    trackViewContent("Produtor Milionário 2.0 — Edição Black Friday");
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#020617]">
      {/* glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 -right-1/4 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 -left-1/4 w-[400px] h-[400px] bg-purple-600/8 rounded-full blur-[90px]" />
      </div>

      <div className="relative z-10">
        {/* ===== BARRA TOPO ===== */}
        <div className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 py-2 text-center">
          <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-white">
            Black Friday · Edição 2026 · Pacote Completo
          </span>
        </div>

        {/* ===== HERO ===== */}
        <section className="px-4 pt-12 pb-14 sm:pt-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-orange-500/40 animate-slide-up">
              <span className="text-[11px] sm:text-sm font-semibold uppercase tracking-wider text-orange-300">Edição Black Friday</span>
            </div>

            <h1 className="mt-6 text-[30px] leading-[1.05] sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase animate-slide-up" style={{ animationDelay: "100ms" }}>
              Tudo da operação<br />
              <span className="bg-gradient-to-br from-orange-300 via-orange-400 to-red-500 bg-clip-text text-transparent">em um só pacote.</span>
            </h1>
            <p className="mt-4 text-base sm:text-xl text-white/60 leading-relaxed animate-slide-up max-w-lg mx-auto" style={{ animationDelay: "200ms" }}>
              A formação <span className="text-white font-semibold">+</span> a ferramenta de tracking <span className="text-white font-semibold">+</span> recursos de distribuição <span className="text-white font-semibold">+</span> 3 meses de GeekZap.
              <br />
              <span className="text-white font-semibold">O pacote completo, um só preço: R$247.</span>
            </p>

            {/* CTA hero */}
            <div className="mt-8 animate-slide-up" style={{ animationDelay: "300ms" }}>
              <BookmarkButton
                size="xl"
                wrap
                onClick={() => goCheckout("bf-hero")}
                text="QUERO A EDIÇÃO BLACK FRIDAY"
                className="min-w-[260px]"
              />
              <p className="text-center text-xs text-white/45 mt-3">R$247 à vista · ou 12x de R$20,59 sem juros</p>
            </div>
          </div>
        </section>

        {/* ===== O QUE ENTRA NA EDIÇÃO ===== */}
        <section className="px-4 py-16 border-t border-white/[0.06]">
          <div className="max-w-4xl mx-auto">
            <p className="ty-eyebrow text-center">O que entra na edição</p>
            <h2 className="ty-h2 text-center mt-3 mb-10 px-2">Quatro peças, <span className="text-orange-400">uma operação</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {itensEdicao.map((c) => (
                <div key={c.t} className="glass-card rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(249,115,22,0.15)]">
                      <c.Icon className="w-6 h-6 text-orange-400" strokeWidth={1.75} />
                    </div>
                    <span className="px-2 py-0.5 rounded bg-orange-500/15 border border-orange-500/30 text-orange-300 font-mono text-[9px] uppercase tracking-wider font-bold">{c.tag}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{c.t}</h3>
                  <p className="text-sm text-white/60 mt-1 leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== AS 3 ETAPAS ===== */}
        <section className="px-4 py-16 border-t border-white/[0.06]">
          <div className="max-w-3xl mx-auto">
            <p className="ty-eyebrow text-center">Na prática</p>
            <h2 className="ty-h2 text-center mt-3 mb-10 px-2">A edição cobre <span className="text-blue-400">o caminho inteiro</span></h2>
            <div className="flex flex-col gap-3 max-w-xl mx-auto">
              {etapas.map((e) => (
                <div key={e.n} className="flex items-center gap-4 glass-card rounded-xl px-4 py-3.5">
                  <span className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/40 flex items-center justify-center font-mono text-base font-black text-blue-300 flex-shrink-0">{e.n}</span>
                  <div>
                    <p className="text-white font-bold text-sm sm:text-base leading-tight">{e.t}</p>
                    <p className="text-sm text-white/60 mt-0.5">{e.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA FINAL ===== */}
        <section className="px-4 py-16 border-t border-white/[0.06]">
          <div className="max-w-2xl mx-auto text-center">
            <div className="glass-card rounded-3xl p-8 sm:p-12 border border-orange-500/30">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 mb-5">
                <ShieldCheck className="w-4 h-4 text-orange-400" /><span className="text-xs font-mono uppercase tracking-wide text-orange-300">Checkout seguro · Cakto</span>
              </div>
              <p className="text-xs text-orange-400/90 uppercase font-mono tracking-[0.2em] mb-1">Tudo incluso na edição · por</p>
              <div className="flex items-baseline justify-center gap-1 mb-1">
                <span className="text-3xl sm:text-4xl text-orange-300 font-light">R$</span>
                <span className="text-7xl sm:text-8xl font-black bg-gradient-to-br from-orange-300 via-orange-400 to-red-500 bg-clip-text text-transparent leading-none tracking-tighter">247</span>
              </div>
              <p className="text-sm text-white/50 mb-7">ou <strong className="text-orange-300 font-mono">12x R$20,59</strong> sem juros</p>
              <BookmarkButton
                size="xl"
                wrap
                onClick={() => goCheckout("bf-cta-final")}
                text="QUERO A EDIÇÃO BLACK FRIDAY"
                className="min-w-[260px]"
              />
              <p className="flex items-center justify-center gap-2 text-xs text-white/45 mt-4 flex-wrap">
                <span><Check className="w-3 h-3 inline -mt-0.5 text-green-400" /> método + Pixel + Farm</span>
                <span>·</span>
                <span><Check className="w-3 h-3 inline -mt-0.5 text-green-400" /> 3 meses de GeekZap</span>
              </p>
            </div>
            <p className="mt-8 text-xs text-white/30">
              Geek Academy · Produtor Milionário 2.0 —{" "}
              <a href="/" className="underline underline-offset-4 hover:text-white/60 transition-colors">ver a página de vendas completa</a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlackFriday;
