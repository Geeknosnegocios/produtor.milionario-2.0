import { useEffect, useRef, useState } from "react";
import { Award, TrendingUp, Users, Zap, User, Sparkles, Trophy } from "lucide-react";
import authorGeek from "@/assets/author-geek.png";

const features = [
  {
    icon: TrendingUp,
    title: "+R$ 200k em 2 meses",
    sub: "Faturamento real com infoprodutos IA",
  },
  {
    icon: Users,
    title: "+2.500 alunos transformados",
    sub: "Quem aplicou o método e colocou produto no ar",
  },
  {
    icon: Zap,
    title: "100% IA-first",
    sub: "Sem agência, sem programação, sem freelancer caro",
  },
];

const AuthorSection = () => {
  const stackRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const stack = stackRef.current;
    const l1 = layer1Ref.current;
    const l2 = layer2Ref.current;
    const l3 = layer3Ref.current;
    if (!container || !stack || !l1 || !l2 || !l3) return;

    let rect = stack.getBoundingClientRect();
    const state = { mx: 0, my: 0, tx: 0, ty: 0, l1x: 0, l1y: 0, l2x: 0, l2y: 0, l3x: 0, l3y: 0 };
    let raf = 0;
    let isExpanded = false;

    const update = () => rect = stack.getBoundingClientRect();

    const animate = () => {
      state.tx += (state.mx - state.tx) * 0.08;
      state.ty += (state.my - state.ty) * 0.08;
      state.l1x += (state.tx - state.l1x) * 0.12;
      state.l1y += (state.ty - state.l1y) * 0.12;
      state.l2x += (state.tx * 0.65 - state.l2x) * 0.08;
      state.l2y += (state.ty * 0.65 - state.l2y) * 0.08;
      state.l3x += (state.tx * 0.38 - state.l3x) * 0.06;
      state.l3y += (state.ty * 0.38 - state.l3y) * 0.06;

      if (!isExpanded) {
        stack.style.transform = `rotateX(${-state.tx}deg) rotateY(${state.ty}deg)`;
        l1.style.transform = `translate3d(0,0,0) rotateZ(-4.6deg) rotateX(${state.l1x * 0.22}deg) rotateY(${state.l1y * 0.22}deg)`;
        l2.style.transform = `translate3d(-8px,74px,-92px) rotateZ(-5deg) scale(0.98) rotateX(${state.l2x * 0.18}deg) rotateY(${state.l2y * 0.18}deg)`;
        l3.style.transform = `translate3d(-12px,128px,-180px) rotateZ(-3deg) scale(0.96) rotateX(${state.l3x * 0.14}deg) rotateY(${state.l3y * 0.14}deg)`;
      } else {
        stack.style.transform = `rotateX(${-state.tx * 0.32}deg) rotateY(${state.ty * 0.32}deg)`;
      }

      raf = requestAnimationFrame(animate);
    };

    const onMove = (e: MouseEvent) => {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = (x / rect.width - 0.5) * 2;
      const py = (y / rect.height - 0.5) * 2;
      state.my = px * 8.5;
      state.mx = py * 7.5;
    };

    const onLeave = () => {
      state.mx = 0;
      state.my = 0;
    };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", update);
    update();
    animate();

    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    if (expanded) stack.classList.add("is-expanded");
    else stack.classList.remove("is-expanded");
  }, [expanded]);

  return (
    <section className="author-depth-section border-white/[0.06] border-t pt-24 pb-24 px-4 relative overflow-hidden">
      <style>{`
        .author-depth-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
          background-size: 80px 80px;
          opacity: 0.12;
          pointer-events: none;
        }
        .author-stack {
          position: relative;
          width: 100%;
          max-width: 480px;
          height: 600px;
          transform-style: preserve-3d;
          transition: transform 0.18s linear;
          will-change: transform;
        }
        .author-layer {
          position: absolute;
          inset: 0;
          border-radius: 28px;
          transform-style: preserve-3d;
          overflow: hidden;
          background:
            radial-gradient(circle at 22% 16%, rgba(255,255,255,0.07), transparent 22%),
            radial-gradient(circle at 62% 45%, rgba(59,130,246,0.08), transparent 36%),
            linear-gradient(180deg, rgba(255,255,255,0.038), rgba(255,255,255,0.012)),
            linear-gradient(135deg, rgba(24,26,36,0.94) 0%, rgba(8,10,16,0.98) 100%);
          border: 1px solid rgba(59,130,246,0.18);
          backdrop-filter: blur(16px);
          box-shadow:
            0 40px 100px rgba(0,0,0,0.45),
            inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .author-layer-3 { opacity: 0.18; transform: translate3d(-12px,128px,-180px) rotateZ(-3deg) scale(0.96); }
        .author-layer-2 { opacity: 0.3; transform: translate3d(-8px,74px,-92px) rotateZ(-5deg) scale(0.98); }
        .author-layer-1 { z-index: 3; transform: translate3d(0,0,0) rotateZ(-4.6deg); display: flex; flex-direction: column; }
        .author-stack.is-expanded .author-layer-1 {
          transform: translate3d(0,-14px,24px) rotateZ(-4.6deg) !important;
          box-shadow: 0 44px 120px rgba(0,0,0,0.62), 0 0 42px rgba(59,130,246,0.12);
        }
        .author-stack.is-expanded .author-layer-2 {
          transform: translate3d(-14px,112px,-104px) rotateX(7deg) rotateZ(-7deg) scale(0.98) !important;
          opacity: 0.4;
        }
        .author-stack.is-expanded .author-layer-3 {
          transform: translate3d(-24px,188px,-210px) rotateX(12deg) rotateZ(-8deg) scale(0.95) !important;
          opacity: 0.22;
        }
        .author-stack.is-expanded .author-details { opacity: 1; transform: translateY(0); transition-delay: 0.16s; }
      `}</style>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left · Info */}
          <div className="space-y-8 animate-slide-up">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.65),0_0_28px_rgba(59,130,246,0.3)]"></span>
              <span className="text-xs sm:text-sm text-blue-400 uppercase font-mono tracking-[0.2em] font-semibold">
                Sobre o Mentor
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tighter leading-[0.98] text-white">
              Quem é <span className="text-blue-400">Andrey Geek</span>?
            </h2>

            <div className="space-y-4 text-base lg:text-lg text-white/55 leading-relaxed">
              <p>
                Meu nome é Andrey Geek, especialista em{" "}
                <strong className="text-white font-medium">funis de vendas, inteligência artificial e infoprodutos</strong>.
              </p>
              <p>
                Em menos de 2 meses, faturei <strong className="text-blue-400">R$ 200.000</strong> criando infoprodutos com IA, começando do zero. Sem equipe, sem programação, sem freelancer caro.
              </p>
              <p>
                Hoje ensino milhares a replicarem esse método e colocarem produtos no ar de forma rápida, simples e prática com IA.
              </p>
              <p className="text-white text-lg font-medium pt-2">
                Se eu consegui começando do zero, você também consegue.
              </p>
            </div>

            {/* Feature list */}
            <ul className="space-y-5 pt-4">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-blue-400 bg-gradient-to-b from-white/[0.05] to-white/[0.015] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_0_0_1px_rgba(59,130,246,0.04),0_14px_34px_rgba(0,0,0,0.28)] flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-base lg:text-lg text-white/95 font-medium leading-tight">{f.title}</p>
                      <p className="text-xs lg:text-sm text-white/45 mt-0.5">{f.sub}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right · 3D depth stack */}
          <div className="relative flex items-center justify-center min-h-[640px]" style={{ perspective: "1800px" }}>
            <div
              ref={containerRef}
              className="relative w-full max-w-[480px] cursor-pointer"
              onClick={() => setExpanded((v) => !v)}
            >
              <div ref={stackRef} className="author-stack mx-auto">
                {/* Layer 3 · back ghost */}
                <div ref={layer3Ref} className="author-layer author-layer-3"></div>

                {/* Layer 2 · mid ghost */}
                <div ref={layer2Ref} className="author-layer author-layer-2"></div>

                {/* Layer 1 · main card */}
                <div ref={layer1Ref} className="author-layer author-layer-1">
                  {/* Inner outline */}
                  <div className="absolute inset-[18px] rounded-[24px] border border-dashed border-white/[0.07] pointer-events-none"></div>

                  {/* Top header */}
                  <div className="flex items-center justify-between px-7 pt-7 relative z-10">
                    <span className="text-blue-400 uppercase tracking-[0.25em] text-xs font-semibold font-mono">
                      ANDREY · 04
                    </span>
                    <div className="w-12 h-12 rounded-full grid place-items-center text-blue-300 bg-gradient-to-b from-blue-400/10 to-blue-500/5 border border-blue-400/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_0_26px_rgba(59,130,246,0.1)]">
                      <Trophy className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Photo · main visual */}
                  <div className="relative flex-1 mx-7 mt-6 mb-6 rounded-2xl overflow-hidden border border-white/[0.08]">
                    <img
                      src={authorGeek}
                      alt="Andrey Geek"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-transparent to-transparent pointer-events-none"></div>

                    {/* Floating result badge */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
                      <div className="px-3 py-1.5 rounded-md bg-blue-500/20 backdrop-blur-md border border-blue-400/30">
                        <span className="text-[10px] text-blue-300 font-mono uppercase tracking-wider font-bold">+R$200k em 2 meses</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0a0e1a]/70 backdrop-blur-md border border-white/[0.08]">
                        <Sparkles className="w-3 h-3 text-blue-400" />
                        <span className="text-[10px] text-white/80 font-mono">VERIFICADO</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom progress bar */}
                  <div className="px-7 pb-7">
                    <div className="relative h-[3px] rounded-full bg-gradient-to-r from-white/10 to-white/[0.04] overflow-hidden">
                      <div
                        className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 shadow-[0_0_14px_rgba(59,130,246,0.8),0_0_34px_rgba(59,130,246,0.38)]"
                        style={{ width: "62%", animation: "platformDepthBar 3.4s ease-in-out infinite alternate" }}
                      ></div>
                    </div>
                  </div>

                  {/* Hidden details · revealed on expand */}
                  <div className="author-details absolute left-7 right-7 bottom-7 grid gap-2 opacity-0" style={{ transform: "translateY(20px)", transition: "0.45s cubic-bezier(0.22,1,0.36,1)" }}>
                    <div className="flex justify-between gap-3 pt-3 border-t border-white/[0.06] text-[11px] text-white/45 uppercase tracking-[0.08em]">
                      <span>Anos no digital</span>
                      <strong className="text-white/90 font-medium tracking-normal">8 anos</strong>
                    </div>
                    <div className="flex justify-between gap-3 pt-3 border-t border-white/[0.06] text-[11px] text-white/45 uppercase tracking-[0.08em]">
                      <span>Alunos formados</span>
                      <strong className="text-blue-300 font-medium tracking-normal">2.547</strong>
                    </div>
                    <div className="flex justify-between gap-3 pt-3 border-t border-white/[0.06] text-[11px] text-white/45 uppercase tracking-[0.08em]">
                      <span>Avaliação</span>
                      <strong className="text-white/90 font-medium tracking-normal">5.0 ★</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Click hint */}
              <p className="text-center mt-8 text-xs text-white/30 font-mono uppercase tracking-wider">
                {expanded ? "↑ clique pra fechar" : "↓ clique pra ver detalhes"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes platformDepthBar {
          0% { width: 52%; }
          100% { width: 67%; }
        }
      `}</style>
    </section>
  );
};

export default AuthorSection;
