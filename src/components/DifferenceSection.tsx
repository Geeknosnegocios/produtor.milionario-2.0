import { Check, Wrench, Crown } from "lucide-react";

const otherCoursesTags = ["ChatGPT básico", "Prompt aleatório", "Curso teórico", "60+ dias resultado"];

const produtorBenefits = [
    "Usa Claude — IA premium dos americanos",
    "7 comandos automatizados",
    "Produto LowTicket no ar em 1 hora",
    "Foca em produto vendendo (não teoria)",
    "R$147 LowTicket vs R$1.997-2.997 outros",
];

const DifferenceSection = () => {
    return (
        <section className="py-20 md:py-32 px-4 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px]" />

            <div className="container mx-auto max-w-5xl relative z-10">
                {/* Title */}
                <div className="text-center mb-12 animate-slide-up">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold px-4">
                        Outros cursos ensinam IA.{" "}
                        <span className="gradient-text">Aqui você USA IA pra entregar produto.</span>
                    </h2>
                </div>

                {/* Comparison cards */}
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
                    {/* Other courses card */}
                    <div className="relative">
                        <div className="absolute -inset-[1px] bg-gradient-to-br from-slate-600/30 to-slate-700/30 rounded-2xl" />

                        <div className="relative glass-card rounded-2xl p-6 md:p-8 h-full">
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-slate-700/50 border border-slate-600/30 flex items-center justify-center">
                                    <Wrench className="w-6 h-6 text-slate-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg md:text-xl font-bold text-white">Outros cursos</h3>
                                <p className="text-sm text-muted-foreground">Ensinam ChatGPT básico</p>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {otherCoursesTags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-sm text-muted-foreground"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Bottom text */}
                            <p className="text-muted-foreground">
                                Você anota e esquece. Resultado em 60+ dias.
                            </p>
                        </div>
                    </div>

                    {/* Produtor Milionário card */}
                    <div className="relative">
                        <div className="absolute -inset-[1px] bg-gradient-to-br from-blue-500/50 to-emerald-500/50 rounded-2xl" />

                        <div className="relative glass-card rounded-2xl p-6 md:p-8 h-full">
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20 border border-blue-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                                    <Crown className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg md:text-xl font-bold text-blue-400">Produtor Milionário 2.0</h3>
                                    <p className="text-sm text-muted-foreground">LowTicket com Claude</p>
                                </div>
                            </div>

                            {/* Benefits list */}
                            <div className="space-y-3">
                                {produtorBenefits.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-4 h-4 text-blue-400" />
                                        </div>
                                        <span className="text-white font-medium">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom text */}
                <div className="text-center mt-12 animate-slide-up" style={{ animationDelay: '200ms' }}>
                    <p className="text-xl md:text-2xl font-bold">
                        👉 O método certo + ferramenta certa = <span className="gradient-text">produto no ar antes do café esfriar.</span>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default DifferenceSection;
