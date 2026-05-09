import { Rocket, Hourglass } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MetricBar } from "@/components/ui/metric-bar";

const PerformanceComparison = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">O Salto de Performance</h2>
          <p className="text-sm md:text-base text-muted-foreground mt-2">
            Por que continuar no modelo antigo quando você pode criar mais rápido?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Tradicional */}
          <Card className="rounded-xl md:rounded-2xl bg-card/70 backdrop-blur-md border border-destructive/30 p-4 md:p-6">
            <div className="flex flex-col gap-3 mb-4 md:mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-destructive/15 flex items-center justify-center">
                    <Hourglass className="w-5 h-5 md:w-6 md:h-6 text-destructive" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold">Modo tradicional</h3>
                </div>
                <Badge className="bg-destructive/15 text-destructive border-destructive/30 text-[10px] md:text-xs">Tradicional</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Lento, caro e rígido. Dependente de grandes equipes.</p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <MetricBar label="Custo" valueLabel="$$$$$" valuePercent={90} tone="danger" />
              <MetricBar label="Tempo" valueLabel="6 – 12 Meses" valuePercent={85} tone="primary" />
            </div>
          </Card>

          {/* Criação com IA */}
          <Card className="rounded-xl md:rounded-2xl bg-card/70 backdrop-blur-md border border-primary/30 p-4 md:p-6 card-glow">
            <div className="flex flex-col gap-3 mb-4 md:mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary/15 flex items-center justify-center">
                    <Rocket className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold">Criação com IA</h3>
                </div>
                <Badge className="bg-primary/15 text-primary border-primary/30 text-[10px] md:text-xs whitespace-nowrap">60-90% OFF</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Entrega relâmpago e investimento inteligente.</p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <MetricBar label="Custo" valueLabel="$" valuePercent={20} tone="success" />
              <MetricBar label="Tempo" valueLabel="2 Semanas – 2 Meses" valuePercent={25} tone="primary" />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PerformanceComparison;

