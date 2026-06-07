import { useEffect, useState } from "react";
import { Sparkles, Play, Volume2, Users, Check, MessageCircle, Search, Lightbulb, FileText, Megaphone, Clock, ShieldCheck, Zap, AlertTriangle, Flame, Gift, EyeOff } from "lucide-react";
import { trackLead, trackViewContent } from "@/lib/tracking";

// ===== CONFIG (preencher) =====
const MICROVSL_VIDEO_ID = "MICROVSL_VIDEO_ID"; // id YouTube do vídeo-convite
const GRUPO_URL = "GRUPO_URL"; // link grupo WhatsApp: https://chat.whatsapp.com/XXXX

const goGroup = (origem: string) => {
  try { trackLead(origem, 0); } catch { /* noop */ }
  window.location.href = GRUPO_URL;
};

const Ribbon = () => (
  <div className="w-full overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 py-2 border-y border-blue-400/40">
    <div className="flex whitespace-nowrap animate-[marquee_22s_linear_infinite]">
      {Array.from({ length: 2 }).map((_, b) => (
        <div key={b} className="flex shrink-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="mx-6 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-white/95 flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> Produtor Milionário 2.0 · Aula ao vivo grátis
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

const CTAGroup = ({ origem, sub = true }: { origem: string; sub?: boolean }) => (
  <div className="w-full max-w-md mx-auto">
    <button
      onClick={() => goGroup(origem)}
      className="w-full flex items-center justify-center gap-3 bg-gradient-to-br from-[#25d366] to-[#1da851] text-[#04240f] font-black text-base sm:text-xl rounded-2xl py-5 px-6 shadow-[0_14px_44px_rgba(37,211,102,0.45)] animate-pulse-glow hover:brightness-105 active:scale-[0.99] transition uppercase tracking-wide"
    >
      <MessageCircle className="w-6 h-6 fill-[#04240f]" /> Entrar no grupo da aula
    </button>
    {sub && <p className="text-center text-xs text-white/45 mt-2.5">Grátis · vagas limitadas · o link da aula cai no grupo</p>}
  </div>
);

const Captura = () => {
  const [playing, setPlaying] = useState(false);

  useEffect(() => { trackViewContent(); }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* glows + grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-500/12 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 -right-1/4 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 -left-1/4 w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-[90px]" />
      </div>
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="relative z-10">
        <Ribbon />

        {/* ===== HERO ===== */}
        <section className="px-4 pt-10 pb-14 sm:pt-14">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-blue-500/40 animate-slide-up">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[11px] sm:text-sm font-semibold uppercase tracking-wider text-blue-300">Aula ao vivo grátis · Quarta 20h</span>
            </div>

            <h1 className="mt-6 text-[30px] leading-[1.05] sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase animate-slide-up" style={{ animationDelay: "100ms" }}>
              Produto Lowticket <span className="gradient-text">No Ar em 1 Hora.</span>
            </h1>
            <p className="mt-4 text-base sm:text-xl text-white/60 leading-relaxed animate-slide-up max-w-lg mx-auto" style={{ animationDelay: "200ms" }}>
              O novo formato pra criar e vender produtos de <span className="text-white font-semibold">R$10 a R$97</span> usando Claude. Sem copy paga. Sem programador.
            </p>

            {/* microVSL · logo abaixo da subheadline */}
            <div className="relative mt-7 max-w-xl mx-auto animate-slide-up" style={{ animationDelay: "250ms" }}>
              <div className="absolute -inset-3 bg-gradient-to-r from-blue-500/25 via-blue-500/15 to-blue-500/25 rounded-3xl blur-2xl" />
              <div className="relative glass-card rounded-2xl overflow-hidden border border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.22)]">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" /><span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" /><span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-red-500/15 border border-red-500/40 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /><span className="text-[10px] text-red-300 font-mono uppercase tracking-wider font-bold">Convite</span>
                  </div>
                </div>
                <div className="relative w-full aspect-video bg-black">
                  {playing ? (
                    <iframe src={`https://www.youtube.com/embed/${MICROVSL_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`} title="Convite" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full" />
                  ) : (
                    <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 w-full h-full cursor-pointer">
                      <img src={`https://img.youtube.com/vi/${MICROVSL_VIDEO_ID}/maxresdefault.jpg`} alt="Capa do convite" className="absolute inset-0 w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).src = `https://img.youtube.com/vi/${MICROVSL_VIDEO_ID}/hqdefault.jpg`; }} />
                      <div className="absolute inset-0 bg-black/70 group-hover:bg-black/55 transition" />
                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-2xl bg-blue-500/30 animate-ping" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 shadow-[0_0_60px_rgba(59,130,246,0.8)] border-2 border-blue-400/80 group-hover:scale-110 transition">
                        <Play className="w-9 h-9 sm:w-11 sm:h-11 text-white fill-white mt-5 ml-1" />
                        <span className="text-[11px] sm:text-xs font-black uppercase tracking-wide text-white">Assistir</span>
                        <span className="flex items-center gap-1 text-[9px] text-white/90"><Volume2 className="w-3 h-3" /> 1 MIN · COM SOM</span>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* bullets estilo referência */}
            <div className="mt-7 flex flex-col gap-3 max-w-md mx-auto text-left animate-slide-up" style={{ animationDelay: "300ms" }}>
              {[
                "Processo de criação em 1 hora (não em meses)",
                "Sem saber programar nem escrever copy",
                "Primeira venda no mesmo dia, com Claude",
              ].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-green-500/15 border border-green-500/40 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-green-400" strokeWidth={3} />
                  </span>
                  <span className="text-sm sm:text-base text-white/85 font-medium">{t}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 animate-slide-up" style={{ animationDelay: "400ms" }}>
              <CTAGroup origem="hero" />
              <div className="mt-3 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-red-300 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-1.5">
                <Flame className="w-3.5 h-3.5 text-red-400" /> Vagas limitadas · o grupo enche rápido
              </div>
            </div>

            {/* proof inline */}
            <div className="flex items-center justify-center gap-5 mt-7 flex-wrap animate-slide-up" style={{ animationDelay: "500ms" }}>
              <div className="flex items-center gap-2 text-sm text-white/55 font-semibold"><Users className="w-4 h-4 text-blue-400" /> +1.000 alunos</div>
              <div className="flex items-center gap-1 text-sm text-white/55 font-semibold"><span className="text-yellow-400">★★★★★</span> 5.0</div>
              <div className="flex items-center gap-2 text-sm text-white/55 font-semibold"><Sparkles className="w-4 h-4 text-blue-400" /> feito com Claude</div>
            </div>
          </div>
        </section>

        {/* ===== O QUE VOCÊ VAI VER ===== */}
        <section className="px-4 py-16 border-t border-white/[0.06]">
          <div className="max-w-4xl mx-auto">
            <p className="ty-eyebrow text-center">Na aula ao vivo</p>
            <h2 className="ty-h2 text-center mt-3 mb-10 px-2">O que você vai <span className="text-blue-400">ver acontecer</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { Icon: Search, t: "Achar o nicho que paga", d: "Claude varre a Meta Ads Library e mostra o que está vendendo agora." },
                { Icon: Lightbulb, t: "Criar o produto do zero", d: "Você descreve a dor. Sai produto + funil + persona + copy." },
                { Icon: FileText, t: "Página de vendas pronta", d: "HTML completo, mobile-first, otimizado pra converter." },
                { Icon: Megaphone, t: "Anúncios pra escalar", d: "17 criativos prontos pra colar na campanha." },
              ].map((c) => (
                <div key={c.t} className="glass-card rounded-2xl p-6 flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                    <c.Icon className="w-6 h-6 text-blue-400" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{c.t}</h3>
                    <p className="text-sm text-white/60 mt-1 leading-relaxed">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 inline-flex items-center gap-3 px-5 py-3 rounded-full bg-blue-500/10 border border-blue-500/30 mx-auto w-fit left-0 right-0 relative">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white/70"><span className="line-through text-white/30 font-mono">60 dias</span> <span className="text-blue-400">→</span> <span className="text-blue-300 font-mono font-semibold">1 hora, ao vivo</span></span>
            </div>
          </div>
        </section>

        {/* ===== PRA QUEM É ===== */}
        <section className="px-4 py-16 border-t border-white/[0.06]">
          <div className="max-w-3xl mx-auto text-center">
            <p className="ty-eyebrow">Essa aula é pra você se</p>
            <h2 className="ty-h2 mt-3 mb-9">Quer <span className="text-blue-400">começar a vender</span> no digital</h2>
            <div className="flex flex-col gap-3 max-w-xl mx-auto text-left">
              {[
                "Nunca lançou um produto e não sabe por onde começar",
                "Já tentou com ChatGPT mas não saiu do lugar",
                "Não tem tempo, equipe ou dinheiro pra agência",
                "Quer uma renda extra real no digital, sem enrolação",
              ].map((t) => (
                <div key={t} className="flex items-center gap-3 glass-card rounded-xl px-4 py-3.5">
                  <span className="w-6 h-6 rounded-md bg-blue-500/15 border border-blue-500/40 flex items-center justify-center flex-shrink-0"><Check className="w-3.5 h-3.5 text-blue-400" strokeWidth={3} /></span>
                  <span className="text-sm sm:text-base text-white/85 font-medium">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== POR QUE ENTRAR AGORA (gatilhos) ===== */}
        <section className="px-4 py-16 border-t border-white/[0.06]">
          <div className="max-w-4xl mx-auto">
            <p className="ty-eyebrow text-center">Por que entrar agora</p>
            <h2 className="ty-h2 text-center mt-3 mb-10 px-2">Quem espera, <span className="text-red-400">fica de fora</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { Icon: EyeOff, t: "Não tem reprise", d: "A aula é ao vivo. Quem não está, perde. Não fica gravado." },
                { Icon: Gift, t: "Bônus só ao vivo", d: "Os bônus liberam só pra quem participa em tempo real." },
                { Icon: Flame, t: "Vagas limitadas", d: "O grupo tem limite e enche rápido. Garante o seu agora." },
              ].map((c) => (
                <div key={c.t} className="glass-card rounded-2xl p-6 text-center border border-red-500/20">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-4">
                    <c.Icon className="w-6 h-6 text-red-400" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{c.t}</h3>
                  <p className="text-sm text-white/60 mt-1.5 leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA FINAL ===== */}
        <section className="px-4 py-16 border-t border-white/[0.06]">
          <div className="max-w-2xl mx-auto text-center">
            <div className="glass-card rounded-3xl p-8 sm:p-12 border border-blue-500/30">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 mb-5">
                <ShieldCheck className="w-4 h-4 text-blue-400" /><span className="text-xs font-mono uppercase tracking-wide text-blue-300">100% grátis e ao vivo</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">Garanta sua vaga<br /><span className="gradient-text">na próxima quarta, 20h.</span></h2>
              <p className="text-white/55 mb-7 max-w-md mx-auto">Entra no grupo agora. É lá que o link da aula e os avisos vão cair.</p>
              <CTAGroup origem="cta-final" />
              <div className="flex items-start gap-2.5 text-left text-sm text-red-200 bg-red-500/10 border border-red-500/40 rounded-xl px-4 py-3.5 mt-6">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <span><span className="text-red-300 font-bold">⚠ Importante:</span> as vagas são limitadas e os bônus só liberam <span className="text-white font-semibold">pra quem está ao vivo</span>. Não tem reprise.</span>
              </div>
            </div>
            <p className="mt-8 text-xs text-white/30">Geek Academy · Produtor Milionário 2.0 · seus dados estão seguros</p>
          </div>
        </section>
      </div>

      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
};

export default Captura;
