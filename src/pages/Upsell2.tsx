import { useEffect, useState } from "react";
import { BookmarkButton } from "@/components/ui/bookmark-button";
import { IconBadge } from "@/components/ui/icon-badge";
import {
  Check,
  Crown,
  Shield,
  Users,
  MessageSquare,
  Calendar,
  Eye,
  Lock,
  AlertCircle,
  Zap,
  Trophy,
  CheckCircle2,
} from "lucide-react";
import logoEtzin from "@/assets/logo-etzin.svg";
import review1 from "@/assets/reviews/review-1.jpg";
import review2 from "@/assets/reviews/review-2.jpg";
import review3 from "@/assets/reviews/review-3.jpg";

const CHECKOUT_URL = "https://go.perfectpay.com.br/PPU38CQCED8";
const TOTAL_VAGAS = 30;
const VAGAS_OCUPADAS = 23;
const VAGAS_RESTANTES = TOTAL_VAGAS - VAGAS_OCUPADAS;

export default function Upsell2() {
  const [secondsLeft, setSecondsLeft] = useState(10 * 60);
  useEffect(() => {
    const t = setInterval(
      () => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)),
      1000,
    );
    return () => clearInterval(t);
  }, []);
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  const handleCTA = () => {
    window.location.href = CHECKOUT_URL;
  };

  const handleSkip = () => {
    window.location.href = "/downsell-2";
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background ambient · com toque amber pra distinguir tier VIP */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-500/8 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/3 -right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -left-1/4 w-[400px] h-[400px] bg-blue-600/6 rounded-full blur-[80px]" />
      </div>
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      {/* ============ HEADER STICKY ============ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-amber-500/20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-3">
              <img
                src={logoEtzin}
                alt="Mentoria VIP"
                className="w-10 h-10 md:w-11 md:h-11 shadow-[0_0_20px_rgba(251,191,36,0.4)] rounded-lg"
                width={44}
                height={44}
              />
              <div className="flex flex-col leading-none">
                <span className="text-sm md:text-base font-extrabold tracking-tight text-white">
                  Mentoria <span className="text-amber-400">VIP</span>
                </span>
                <span className="text-[9px] md:text-[10px] font-medium tracking-[0.18em] text-amber-400 uppercase font-mono mt-0.5">
                  CONVITE · GRUPO FECHADO · 30 ALIADOS
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-amber-500/40">
              <Crown className="w-3 h-3 text-amber-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                {VAGAS_RESTANTES}/{TOTAL_VAGAS} VAGAS
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ============ PROGRESS BAR 98% ============ */}
      <div className="relative z-40 pt-16 md:pt-20">
        <div className="container mx-auto max-w-5xl px-4 pt-6 pb-3">
          <div className="mb-2 flex items-center justify-between text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
            <span className="text-green-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> FPM 2.0 ADICIONADO
            </span>
            <span className="text-amber-400">ÚLTIMO PASSO · NÍVEL VIP</span>
            <span className="text-muted-foreground hidden sm:inline">
              LIBERAÇÃO
            </span>
          </div>
          <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.5)]"
              style={{ width: "98%" }}
            />
            <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          <div className="mt-2 flex justify-between text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground">
            <span className="text-green-400">1. Compra ✓</span>
            <span className="text-green-400">2. FPM ✓</span>
            <span className="font-bold text-amber-400">3. VIP (último)</span>
            <span>4. Acesso</span>
          </div>
        </div>

        {/* Scarcity strip amber */}
        <div className="border-y border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-amber-500/15 to-amber-500/10">
          <div className="container mx-auto max-w-5xl px-4 py-2.5 text-center">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-300 flex items-center justify-center gap-2 flex-wrap">
              <Crown className="h-4 w-4" />
              APENAS {VAGAS_RESTANTES}/{TOTAL_VAGAS} VAGAS · TEMPO
              <span className="font-mono text-base sm:text-lg bg-amber-500 text-slate-900 px-2 py-0.5 rounded-md shadow-[0_0_15px_rgba(251,191,36,0.5)]">
                {mm}:{ss}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* ============ HERO ============ */}
      <section className="relative z-10 container mx-auto max-w-5xl px-4 py-10 md:py-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full glass-card border border-amber-500/50 animate-slide-up mb-6">
          <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
          <span className="text-[10px] sm:text-sm font-semibold uppercase tracking-wider sm:tracking-normal sm:normal-case bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
            CONVITE VIP · GRUPO FECHADO · 30 ALIADOS NO MÁXIMO
          </span>
        </div>

        <h1
          className="text-[24px] leading-[1.15] sm:text-[36px] md:text-[52px] lg:text-[64px] font-black tracking-tight text-white uppercase animate-slide-up"
          style={{ animationDelay: "100ms" }}
        >
          VOCÊ TEM FERRAMENTAS + MÉTODO.
          <br className="hidden sm:block" /> AGORA PEGA{" "}
          <span className="text-amber-400 drop-shadow-[0_0_30px_rgba(251,191,36,0.5)]">
            VELOCIDADE
          </span>
          .
        </h1>

        <p
          className="mt-6 text-sm sm:text-lg md:text-xl text-white/55 leading-relaxed max-w-3xl mx-auto animate-slide-up"
          style={{ animationDelay: "200ms" }}
        >
          Diferença entre quem implementa em{" "}
          <strong className="text-white">90 dias</strong> e quem trava por 12 meses
          tem nome:
          <span className="block mt-2 text-white font-medium">
            acompanhamento direto + grupo de aliados fazendo igual.
          </span>
        </p>

        {/* VAGAS GRID 30 DOTS */}
        <div
          className="mt-8 max-w-md mx-auto glass-card border border-amber-500/30 rounded-2xl p-5 animate-slide-up"
          style={{ animationDelay: "300ms" }}
        >
          <p className="text-[10px] uppercase tracking-[0.18em] text-amber-400 font-mono font-bold mb-3">
            VAGAS EM TEMPO REAL
          </p>
          <div className="grid grid-cols-10 gap-1.5">
            {Array.from({ length: TOTAL_VAGAS }).map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-sm ${
                  i < VAGAS_OCUPADAS
                    ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.7)]"
                    : "bg-white/10 ring-1 ring-amber-500/30"
                }`}
              />
            ))}
          </div>
          <p className="mt-3 text-sm">
            <span className="text-amber-400 font-bold">{VAGAS_OCUPADAS}</span>
            <span className="text-white/55"> ocupadas · </span>
            <span className="text-white font-bold">{VAGAS_RESTANTES}</span>
            <span className="text-white/55"> restantes</span>
          </p>
        </div>

        {/* PRICE BOX */}
        <div
          className="mt-8 inline-flex flex-col items-center gap-3 glass-card border border-amber-500/40 rounded-2xl px-6 py-6 sm:px-10 sm:py-8 animate-slide-up shadow-[0_0_60px_rgba(251,191,36,0.2)]"
          style={{ animationDelay: "400ms" }}
        >
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="text-xl sm:text-2xl text-white/40 line-through decoration-red-500 decoration-2">
              DE R$ 5.997
            </span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-green-400 bg-green-500/15 border border-green-500/40 px-2 py-1 rounded-md">
              -78% só pra quem pegou FPM agora
            </span>
          </div>
          <div className="flex items-baseline gap-2 flex-wrap justify-center">
            <span className="text-base sm:text-lg text-white/60">12 meses por</span>
            <span className="text-5xl sm:text-6xl md:text-7xl font-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent leading-none">
              12x R$ 108,08
            </span>
          </div>
          <p className="text-xs sm:text-sm text-white/55">
            ou R$ 1.297 à vista · garantia 7 dias incondicional
          </p>
        </div>

        {/* CTA */}
        <div
          className="mt-8 px-2 sm:px-4 w-full max-w-md mx-auto md:max-w-fit md:w-auto animate-slide-up flex justify-center"
          style={{ animationDelay: "500ms" }}
        >
          <BookmarkButton
            size="xl"
            onClick={handleCTA}
            text={
              <>
                <span className="sm:hidden">QUERO VAGA VIP · 12x R$ 108,08</span>
                <span className="hidden sm:inline">
                  QUERO MINHA VAGA VIP · 12x R$ 108,08
                </span>
              </>
            }
            sub="1-click · vaga reservada por 10min"
            fullWidth
            className="w-full sm:w-auto !border-amber-400/40 hover:!border-amber-400/80 !shadow-[0_0_30px_rgba(251,191,36,0.25)] hover:!shadow-[0_0_60px_rgba(251,191,36,0.5)]"
          />
        </div>
      </section>

      {/* ============ O QUE INCLUI ============ */}
      <section className="relative z-10 container mx-auto max-w-6xl px-4 py-12 md:py-16">
        <p className="text-[11px] uppercase tracking-[0.18em] text-amber-400 font-mono text-center mb-3">
          O QUE ESTÁ INCLUÍDO
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white text-center mb-10 tracking-tight">
          12 meses de{" "}
          <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
            acesso VIP
          </span>{" "}
          direto com Andrey
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: Calendar,
              title: "1 call 1-on-1 30min/mês",
              desc: "Acesso direto com Andrey. Você agenda quando quiser. 12 calls ao longo do ano.",
            },
            {
              icon: Users,
              title: "4 calls em grupo/mês",
              desc: "Lives 1h30 com Q&A, hot seats, revisão coletiva. Toda quinta-feira 20h BRT.",
            },
            {
              icon: MessageSquare,
              title: "WhatsApp VIP (máx 30)",
              desc: "Não é Telegram lotado. 30 aliados no máximo. Vê quem fatura quanto, quem testa o quê.",
            },
            {
              icon: Eye,
              title: "Revisão de funil 1x/semana",
              desc: "Manda landing, criativo, copy ou funil. Devolvo revisão gravada em vídeo curto. 52 revisões/ano.",
            },
            {
              icon: Trophy,
              title: "Acesso vitalício esteira Geek",
              desc: "Rateaki + 5 bumps + FPM 2.0 + lançamentos futuros. Sem mensalidade extra.",
            },
            {
              icon: Crown,
              title: "Comunidade squad VIP",
              desc: "Squad separado dos alunos comuns. Conquistas, missions, encontros mensais presenciais (SP).",
            },
          ].map((g, i) => (
            <div
              key={i}
              className="glass-card rounded-xl p-5 sm:p-6 ring-1 ring-amber-500/20 bg-white/5 hover:bg-white/10 transition"
            >
              <IconBadge
                Icon={g.icon}
                size="lg"
                variant="soft"
                className="!bg-amber-500/15 !text-amber-300 !border-amber-500/30 !shadow-[0_0_15px_rgba(251,191,36,0.15)]"
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

      {/* ============ 3 GATILHOS BAR ============ */}
      <section className="relative z-10 container mx-auto max-w-5xl px-4 py-8">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="glass-card rounded-xl p-5 ring-1 ring-red-500/30 bg-red-500/5">
            <IconBadge
              Icon={Lock}
              size="md"
              variant="soft"
              className="!bg-red-500/15 !text-red-300 !border-red-500/30"
            />
            <h4 className="font-bold text-sm mt-3 mb-1 text-white">
              JANELA ÚNICA
            </h4>
            <p className="text-xs text-white/55">
              Vagas abrem 1x/ano. Próxima turma só em 2027 — e por R$ 5.997.
            </p>
          </div>
          <div className="glass-card rounded-xl p-5 ring-1 ring-green-500/30 bg-green-500/5">
            <IconBadge
              Icon={Shield}
              size="md"
              variant="soft"
              className="!bg-green-500/15 !text-green-300 !border-green-500/30"
            />
            <h4 className="font-bold text-sm mt-3 mb-1 text-white">
              GARANTIA 7 DIAS
            </h4>
            <p className="text-xs text-white/55">
              Entrou e não rolou? Devolvemos 100% sem perguntas. Risco zero.
            </p>
          </div>
          <div className="glass-card rounded-xl p-5 ring-1 ring-amber-500/30 bg-amber-500/5">
            <IconBadge
              Icon={Zap}
              size="md"
              variant="soft"
              className="!bg-amber-500/15 !text-amber-300 !border-amber-500/30"
            />
            <h4 className="font-bold text-sm mt-3 mb-1 text-white">
              VELOCIDADE
            </h4>
            <p className="text-xs text-white/55">
              Aliado avg sai dos primeiros R$ 10k em 90 dias. Sem mentoria → 12 meses.
            </p>
          </div>
        </div>
      </section>

      {/* ============ STACK DE VALOR ============ */}
      <section className="relative z-10 container mx-auto max-w-4xl px-4 py-12">
        <div className="glass-card border border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-[0_0_60px_rgba(251,191,36,0.15)]">
          <p className="text-[11px] uppercase tracking-[0.18em] text-amber-400 font-mono text-center mb-2">
            VALOR REAL DO QUE VOCÊ RECEBE
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-8 tracking-tight">
            Valor total{" "}
            <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              R$ 10.118
            </span>
          </h2>

          <ul className="space-y-3 max-w-2xl mx-auto">
            {[
              { v: "R$ 3.600", t: "12 calls 1-on-1 com Andrey (R$ 300 cada)" },
              { v: "R$ 1.800", t: "48 calls em grupo (R$ 37,50 cada)" },
              { v: "R$ 997", t: "Acesso ao grupo VIP 12 meses" },
              { v: "R$ 2.080", t: "52 revisões de funil (R$ 40 cada)" },
              { v: "R$ 1.297", t: "Acesso vitalício esteira Geek" },
              { v: "R$ 297", t: "Comunidade Geek Academy squad VIP" },
              { v: "R$ 47", t: "Garantia 7 dias incondicional" },
            ].map((row, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/5 ring-1 ring-amber-500/20 hover:bg-white/10 transition"
              >
                <span className="flex items-start gap-3 flex-1">
                  <Check className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
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

          <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl bg-gradient-to-br from-amber-500/15 to-amber-600/10 border border-amber-500/50 p-5">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/55 font-mono">
                Valor real
              </p>
              <p className="text-xl sm:text-2xl font-bold text-white/40 line-through decoration-red-500">
                R$ 10.118
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-amber-400 font-bold font-mono">
                Sua vaga VIP, 1-click
              </p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent leading-none mt-1">
                12x R$ 108,08
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DEPOIMENTO ============ */}
      <section className="relative z-10 container mx-auto max-w-3xl px-4 py-8">
        <div className="glass-card border border-amber-500/30 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <img
              src={review3}
              alt="Júlia S."
              className="w-14 h-14 rounded-full border-2 border-amber-500/40 object-cover flex-shrink-0"
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
                "Fiz a Mentoria VIP em 2025. Em 4 meses sai de R$ 0 pra R$ 28k/mês.
                A call semanal de revisão é o que mais mudou — Andrey enxerga
                buracos que eu nem via."
              </p>
              <p className="text-xs font-bold text-amber-300">
                Júlia S. · aliada VIP 2025 · faturamento atual R$ 41k/mês
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className="relative z-10 container mx-auto max-w-3xl px-4 py-12 text-center">
        <div className="flex justify-center mb-4">
          <BookmarkButton
            size="xl"
            onClick={handleCTA}
            text="RESERVAR VAGA VIP · 12x R$ 108,08"
            sub="garantia 7 dias · acesso em 1 minuto"
            fullWidth
            className="w-full sm:w-auto !border-amber-400/40 hover:!border-amber-400/80 !shadow-[0_0_30px_rgba(251,191,36,0.25)] hover:!shadow-[0_0_60px_rgba(251,191,36,0.5)]"
          />
        </div>

        <div className="mt-2 flex items-center justify-center gap-2 text-xs text-amber-300">
          <AlertCircle className="h-3 w-3" />
          <span>
            Só {VAGAS_RESTANTES} vagas restantes · Decisão expira em {mm}:{ss}
          </span>
        </div>

        <button
          onClick={handleSkip}
          className="mt-6 text-xs text-muted-foreground hover:text-white underline underline-offset-2 transition-colors"
        >
          Não, obrigado · finalizar sem mentoria
        </button>

        <div className="mt-10 flex items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground font-mono">
          <Shield className="w-3 h-3 text-amber-400" />
          <span>SSL · cartão criptografado · 7 dias garantia incondicional</span>
        </div>
      </section>
    </div>
  );
}
