import { Award, TrendingUp, Users, Zap, User } from "lucide-react";

const stats = [
  { icon: TrendingUp, value: "R$ 200k+", label: "Faturamento em 3 meses" },
  { icon: Users, value: "2.500+", label: "Alunos transformados" },
  { icon: Zap, value: "100%", label: "Produtos com IA" },
  { icon: Award, value: "5.0", label: "Avaliação média" },
];

const AuthorSection = () => {
  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px]" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative animate-slide-up flex justify-center lg:justify-start">
            <div className="relative max-w-md">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/10 to-blue-500/10 rounded-2xl blur-2xl" />

              <div className="relative p-2 rounded-xl bg-slate-900/80 border border-blue-500/30">
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={new URL('@/assets/author-geek.png', import.meta.url).href}
                    alt="Andrey Geek - Mentor"
                    className="w-full h-auto object-cover"
                  />
                </div>

                <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6">
                  <div className="relative glass-card rounded-xl px-5 py-3 border border-blue-500/30 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                    <div className="text-2xl font-extrabold text-blue-400">+200k</div>
                    <div className="text-xs text-muted-foreground">em resultados</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-blue-500/30">
              <User className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-cyan-300">Sobre o Mentor</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
              Quem é <span className="gradient-text">Andrey Geek</span>?
            </h2>

            <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Meu nome é Andrey Geek, especialista em <strong className="text-white">funis de vendas, inteligência artificial e infoprodutos</strong>.
              </p>

              <p>
                Em menos de 3 meses, consegui faturar mais de <strong className="text-blue-400">R$ 200.000</strong> criando infoprodutos com IA, mesmo começando do zero — sem equipe, sem programação e sem contratar freelancers caros.
              </p>

              <p>
                Hoje, ensino milhares de pessoas a replicarem esse mesmo método e colocarem suas ofertas no ar de forma rápida, simples e prática com inteligência artificial.
              </p>

              <p className="text-white font-semibold">
                Se eu consegui começando do zero, você também consegue. E eu vou te mostrar exatamente como.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="group glass-card border border-white/5 rounded-xl p-4 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/20 border border-blue-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorSection;
