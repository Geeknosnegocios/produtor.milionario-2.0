import { useEffect, useState, lazy, Suspense } from "react";
import { BookmarkButton } from "@/components/ui/bookmark-button";
import { IconBadge } from "@/components/ui/icon-badge";

const ModulesSection = lazy(() => import("@/components/ModulesSection"));
const BonusSection = lazy(() => import("@/components/BonusSection"));
const GuaranteeSection = lazy(() => import("@/components/GuaranteeSection"));
import {
  Check,
  Clock,
  Shield,
  Sparkles,
  Users,
  TrendingUp,
  Zap,
  Lock,
  AlertCircle,
  Award,
  CheckCircle2,
} from "lucide-react";
import logoEtzin from "@/assets/logo-etzin.svg";
import review1 from "@/assets/reviews/review-1.jpg";
import review2 from "@/assets/reviews/review-2.jpg";
import review3 from "@/assets/reviews/review-3.jpg";

const CHECKOUT_URL = "https://pay.cakto.com.br/REPLACE_FPM2_PRODUCT_ID";

export default function Upsell() {
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);
  useEffect(() => {
    const t = setInterval(
      () => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)),
      1000,
    );
    return () => clearInterval(t);
  }, []);
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  const [taken, setTaken] = useState(214);
  useEffect(() => {
    const t = setInterval(
      () => setTaken((v) => v + Math.floor(Math.random() * 2)),
      18000,
    );
    return () => clearInterval(t);
  }, []);

  const handleCTA = () => {
    window.location.href = CHECKOUT_URL + "?oneclick=1";
  };

  const handleSkip = () => {
    window.location.href = "/downsell";
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background ambient · igual hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/3 -right-1/4 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -left-1/4 w-[400px] h-[400px] bg-blue-600/6 rounded-full blur-[80px]" />
      </div>
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      {/* ============ HEADER STICKY · padrão da página ============ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-3">
              <img
                src={logoEtzin}
                alt="Produtor Milionário 2.0"
                className="w-10 h-10 md:w-11 md:h-11 shadow-[0_0_20px_rgba(59,130,246,0.4)] rounded-lg"
                width={44}
                height={44}
              />
              <div className="flex flex-col leading-none">
                <span className="text-sm md:text-base font-extrabold tracking-tight text-white">
                  Produtor Milionário <span className="text-blue-400">2.0</span>
                </span>
                <span className="text-[9px] md:text-[10px] font-medium tracking-[0.18em] text-blue-400 uppercase font-mono mt-0.5">
                  OFERTA EXCLUSIVA · PÓS-COMPRA
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-red-500/40">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider text-red-300 font-bold">
                EXPIRA EM {mm}:{ss}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ============ PROGRESS BAR ============ */}
      <div className="relative z-40 pt-16 md:pt-20">
        <div className="container mx-auto max-w-5xl px-4 pt-6 pb-3">
          <div className="mb-2 flex items-center justify-between text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
            <span className="text-green-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> COMPRA CONFIRMADA
            </span>
            <span className="text-blue-400">QUASE LÁ · FALTA 1 PASSO</span>
            <span className="text-muted-foreground hidden sm:inline">
              ÁREA DE MEMBROS
            </span>
          </div>
          <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
              style={{ width: "90%" }}
            />
            <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          <div className="mt-2 flex justify-between text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground">
            <span className="text-green-400">1. Compra ✓</span>
            <span className="text-green-400">2. Pagamento ✓</span>
            <span className="font-bold text-blue-400">3. Sistema (agora)</span>
            <span>4. Liberação</span>
          </div>
        </div>

        {/* Scarcity strip */}
        <div className="border-y border-red-500/30 bg-gradient-to-r from-red-500/10 via-red-500/15 to-red-500/10">
          <div className="container mx-auto max-w-5xl px-4 py-2.5 text-center">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-red-300 flex items-center justify-center gap-2 flex-wrap">
              <AlertCircle className="h-4 w-4" />
              ESTA OFERTA SAI DESTA TELA EM
              <span className="font-mono text-base sm:text-lg bg-red-500 text-white px-2 py-0.5 rounded-md shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                {mm}:{ss}
              </span>
              E NÃO VOLTA
            </p>
          </div>
        </div>
      </div>

      {/* ============ HERO ============ */}
      <section className="relative z-10 container mx-auto max-w-5xl px-4 py-10 md:py-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full glass-card border border-blue-500/40 animate-slide-up mb-6">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
          <span className="text-[10px] sm:text-sm font-semibold uppercase tracking-wider sm:tracking-normal sm:normal-case bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
            Oferta exclusiva 1-click · só pra quem acabou de comprar
          </span>
        </div>

        <h1
          className="text-[24px] leading-[1.15] sm:text-[36px] md:text-[52px] lg:text-[64px] font-black tracking-tight text-white uppercase animate-slide-up"
          style={{ animationDelay: "100ms" }}
        >
          VOCÊ COMPROU AS <span className="gradient-text">FERRAMENTAS</span>.
          <br className="hidden sm:block" /> AGORA PEGA O{" "}
          <span className="text-blue-300">MÉTODO</span>.
        </h1>

        <p
          className="mt-6 text-sm sm:text-lg md:text-xl text-white/55 leading-relaxed max-w-3xl mx-auto animate-slide-up"
          style={{ animationDelay: "200ms" }}
        >
          Sem método, ferramenta não vende.{" "}
          <span className="text-white font-medium">
            Adiciona Produtor Milionário 2.0 ao seu pedido agora
          </span>{" "}
          e monta seu primeiro low-ticket com Claude em 7 dias.
        </p>

        {/* PRICE BOX */}
        <div
          className="mt-8 inline-flex flex-col items-center gap-3 glass-card border border-blue-500/30 rounded-2xl px-6 py-6 sm:px-10 sm:py-8 animate-slide-up neon-glow"
          style={{ animationDelay: "300ms" }}
        >
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="text-xl sm:text-2xl text-white/40 line-through decoration-red-500 decoration-2">
              DE R$ 1.997
            </span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-green-400 bg-green-500/15 border border-green-500/40 px-2 py-1 rounded-md">
              -90% só nesta tela
            </span>
          </div>
          <div className="flex items-baseline gap-2 flex-wrap justify-center">
            <span className="text-base sm:text-lg text-white/60">por</span>
            <span className="text-5xl sm:text-6xl md:text-7xl font-black gradient-text leading-none">
              12x R$ 16,50
            </span>
          </div>
          <p className="text-xs sm:text-sm text-white/55">
            ou R$ 197 à vista · sem juros · garantia 7 dias incondicional
          </p>
        </div>

        {/* CTA BOOKMARK */}
        <div
          className="mt-8 px-2 sm:px-4 w-full max-w-md mx-auto md:max-w-fit md:w-auto animate-slide-up flex justify-center"
          style={{ animationDelay: "400ms" }}
        >
          <BookmarkButton
            size="xl"
            onClick={handleCTA}
            text={
              <>
                <span className="sm:hidden">SIM, QUERO · 12x R$ 16,50</span>
                <span className="hidden sm:inline">
                  SIM, QUERO A FORMAÇÃO POR 12x R$ 16,50
                </span>
              </>
            }
            sub="1-click · sem reentrar dados"
            fullWidth
            className="w-full sm:w-auto"
          />
        </div>

        {/* Social proof live */}
        <div
          className="mt-6 inline-flex items-center gap-3 glass-card border border-white/10 rounded-full px-4 py-2 animate-slide-up"
          style={{ animationDelay: "500ms" }}
        >
          <div className="flex -space-x-2">
            <img
              src={review1}
              alt="Aluno"
              className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 border-background object-cover"
            />
            <img
              src={review2}
              alt="Aluna"
              loading="lazy"
              className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 border-background object-cover"
            />
            <img
              src={review3}
              alt="Aluna"
              loading="lazy"
              className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 border-background object-cover"
            />
          </div>
          <div className="flex items-center gap-1.5 text-xs sm:text-sm">
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
            <span className="font-medium text-white">
              <strong className="text-blue-300">{taken}</strong> clientes aceitaram esta semana
            </span>
          </div>
        </div>
      </section>

      {/* ============ OFERTA COMPLETA DO PRODUTOR ============ */}
      <section className="relative z-10">
        <div className="container mx-auto max-w-6xl px-4 pt-16 pb-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-blue-500/40 mb-4">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-blue-300 font-mono">
              VEJA TUDO QUE ENTRA NO SEU PEDIDO
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-white uppercase max-w-4xl mx-auto">
            Oferta Completa do <span className="gradient-text">Produtor Milionário 2.0</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/55 max-w-2xl mx-auto">
            3 partes · 28 módulos · 70+ aulas · 8 bônus · garantia de resultado
          </p>
        </div>

        <Suspense fallback={<div className="min-h-[400px]" />}>
          <ModulesSection />
          <BonusSection />
          <GuaranteeSection />
        </Suspense>
      </section>

      {/* ============ GATILHOS GRID ============ */}
      <section className="relative z-10 container mx-auto max-w-6xl px-4 py-12 md:py-16">
        <p className="text-[11px] uppercase tracking-[0.18em] text-blue-400 font-mono text-center mb-3">
          POR QUE PEGAR AGORA
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white text-center mb-10 tracking-tight">
          6 razões que <span className="gradient-text">você vai bater a cabeça</span> se sair sem pegar
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: Award,
              title: "8 módulos · 60+ aulas",
              desc: "Método low-ticket end-to-end: nicho → produto → tráfego → venda → escala. Tudo gravado, atualizado em 2026.",
            },
            {
              icon: TrendingUp,
              title: "Mesmo método do Andrey",
              desc: "R$ 300k+ em low-ticket faturados em 2026 com Claude. Mesma esteira você vai instalar nas próximas 72h.",
            },
            {
              icon: Sparkles,
              title: "Você já é cliente",
              desc: "Reservamos esta oferta com 90% off só pra quem acabou de comprar. Não volta no site público.",
            },
            {
              icon: Lock,
              title: "Acesso vitalício",
              desc: "Próxima vez R$ 1.997 OU fora de venda. Sair sem pegar = perde a janela.",
              danger: true,
            },
            {
              icon: Shield,
              title: "Garantia 7 dias",
              desc: "Testa 7 dias. Não gostou? Email pro suporte, devolvemos 100%. Sem letra miúda.",
              safe: true,
            },
            {
              icon: Clock,
              title: "Sistema em 7 dias",
              desc: "Aulas curtas (15-25min). Sai do módulo 1 com nicho validado. Semana 1 com produto pronto.",
            },
          ].map((g, i) => (
            <div
              key={i}
              className={`glass-card rounded-xl p-5 sm:p-6 ring-1 hover:bg-white/10 transition ${
                g.danger
                  ? "ring-red-500/30 bg-red-500/5"
                  : g.safe
                    ? "ring-green-500/30 bg-green-500/5"
                    : "ring-white/10 bg-white/5"
              }`}
            >
              <IconBadge
                Icon={g.icon}
                size="lg"
                variant={g.danger ? "soft" : g.safe ? "soft" : "solid"}
                className={
                  g.danger
                    ? "!bg-red-500/15 !text-red-300 !border-red-500/30"
                    : g.safe
                      ? "!bg-green-500/15 !text-green-300 !border-green-500/30"
                      : ""
                }
              />
              <h3 className="mt-4 font-bold text-base sm:text-lg text-white">
                {g.title}
              </h3>
              <p className="mt-2 text-sm text-white/55 leading-relaxed">
                {g.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ STACK DE VALOR ============ */}
      <section className="relative z-10 container mx-auto max-w-4xl px-4 py-12">
        <div className="glass-card border border-blue-500/30 rounded-3xl p-6 sm:p-10 neon-glow">
          <p className="text-[11px] uppercase tracking-[0.18em] text-blue-400 font-mono text-center mb-2">
            O QUE ENTRA NO SEU PEDIDO AGORA
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-8 tracking-tight">
            Valor total <span className="gradient-text">R$ 2.032</span>
          </h2>

          <ul className="space-y-3 max-w-2xl mx-auto">
            {[
              { v: "R$ 997", t: "FPM 2.0 — 8 módulos · 60+ aulas" },
              { v: "R$ 397", t: "Sistema Claude AI integrado (skills + comandos)" },
              { v: "R$ 297", t: "Acesso Comunidade Geek Academy (aliados)" },
              { v: "R$ 197", t: "Mentorias mensais ao vivo (12 meses)" },
              { v: "R$ 97", t: "Templates de funil prontos pra clonar" },
              { v: "R$ 47", t: "Garantia 7 dias incondicional" },
            ].map((row, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition"
              >
                <span className="flex items-start gap-3 flex-1">
                  <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-white/85">
                    {row.t}
                  </span>
                </span>
                <span className="text-xs sm:text-sm font-mono text-white/30 line-through whitespace-nowrap">
                  {row.v}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl bg-gradient-to-br from-blue-500/15 to-blue-600/10 border border-blue-500/40 p-5">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/55 font-mono">
                Valor real
              </p>
              <p className="text-xl sm:text-2xl font-bold text-white/40 line-through decoration-red-500">
                R$ 2.032
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-green-400 font-bold font-mono">
                Hoje, 1-click
              </p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-black gradient-text leading-none mt-1">
                12x R$ 16,50
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DEPOIMENTO ============ */}
      <section className="relative z-10 container mx-auto max-w-3xl px-4 py-8">
        <div className="glass-card border border-white/10 rounded-2xl p-6 ring-1 ring-blue-500/20">
          <div className="flex items-start gap-4">
            <img
              src={review2}
              alt="Marcos R."
              className="w-14 h-14 rounded-full border-2 border-blue-500/40 object-cover flex-shrink-0"
            />
            <div>
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.5)]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm sm:text-base italic text-white/75 mb-2 leading-relaxed">
                "Comprei Rateaki + FPM 2.0 no mesmo checkout. Em 9 dias subi
                meu primeiro lowticket. R$ 4.700 no primeiro mês. Sem FPM eu
                ia ficar 6 meses tentando."
              </p>
              <p className="text-xs font-bold text-blue-300">
                Marcos R. · aluno · maio/2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className="relative z-10 container mx-auto max-w-3xl px-4 py-12 text-center">
        <div className="flex justify-center mb-6">
          <BookmarkButton
            size="xl"
            onClick={handleCTA}
            text="SIM, ADICIONAR AGORA · 12x R$ 16,50"
            sub="garantia 7 dias · acesso em 1 minuto"
            fullWidth
            className="w-full sm:w-auto"
          />
        </div>

        <button
          onClick={handleSkip}
          className="text-xs text-muted-foreground hover:text-white underline underline-offset-2 transition-colors"
        >
          Não, obrigado · continuar sem o método
        </button>

        <div className="mt-10 flex items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground font-mono">
          <Shield className="w-3 h-3 text-blue-400" />
          <span>SSL · cartão criptografado · 7 dias garantia</span>
        </div>
      </section>
    </div>
  );
}
