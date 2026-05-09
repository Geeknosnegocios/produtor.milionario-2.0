import { ShieldCheck, CheckCircle, Sparkles, Lock, AlertTriangle } from "lucide-react";

const GuaranteeSection = () => {
    return (
        <section className="py-20 md:py-32 px-4 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]" />

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="flex justify-center mb-8 animate-slide-up">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card border border-blue-500/40">
                        <Lock className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-bold text-blue-300 tracking-wider">GARANTIA DE RESULTADO</span>
                        <Sparkles className="w-4 h-4 text-blue-400" />
                    </div>
                </div>

                <div className="text-center mb-10 animate-slide-up" style={{ animationDelay: '50ms' }}>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
                        🛡️ Garantia de Resultado —{" "}
                        <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                            Não de Reembolso
                        </span>
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
                        Não fazemos garantia "satisfação" pra malandro baixar conteúdo e pedir devolução.
                        Aqui é diferente: <strong className="text-blue-400">garantimos resultado pra quem executa</strong>.
                        Não devolvemos dinheiro pra quem só quer espiar.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-12 animate-slide-up" style={{ animationDelay: '100ms' }}>

                    <div className="relative group">
                        <div className="absolute -inset-[1px] bg-gradient-to-br from-blue-500/40 to-blue-600/40 rounded-2xl opacity-60" />
                        <div className="relative glass-card rounded-2xl p-6 h-full border border-blue-500/20">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center font-bold text-blue-400">
                                    1️⃣
                                </div>
                                <h3 className="text-base font-bold text-blue-400">7 Dias CDC</h3>
                            </div>
                            <h4 className="text-lg font-bold text-white mb-3">Lei do Consumidor</h4>
                            <p className="text-sm text-slate-300 leading-relaxed mb-3">
                                Direito legal Art. 49 CDC. Cancela direto no painel do aluno + responde 3 perguntas + confirma pelo celular.
                            </p>
                            <p className="text-xs text-blue-400 font-semibold">
                                ✓ Sem ligação de retenção<br />
                                ✓ Devolução em 5 dias úteis
                            </p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-[1px] bg-gradient-to-br from-emerald-500/40 to-emerald-600/40 rounded-2xl opacity-60" />
                        <div className="relative glass-card rounded-2xl p-6 h-full border border-emerald-500/20">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-bold text-emerald-400">
                                    2️⃣
                                </div>
                                <h3 className="text-base font-bold text-emerald-400">Até 30 Dias</h3>
                            </div>
                            <h4 className="text-lg font-bold text-white mb-3">Execução Comprovada</h4>
                            <p className="text-sm text-slate-300 leading-relaxed mb-3">
                                Quer mais tempo? Tem. Mas precisa provar que executou:
                            </p>
                            <ul className="text-xs text-slate-400 space-y-1 mb-3">
                                <li>✓ Print Módulo 1 (instalação)</li>
                                <li>✓ Link Módulo 4 (página)</li>
                                <li>✓ Print tentativa de venda</li>
                            </ul>
                            <p className="text-xs text-emerald-400 font-semibold">
                                Executou? Devolvemos 100%.<br />
                                Não executou? Sem reembolso. Justo.
                            </p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-[1px] bg-gradient-to-br from-yellow-500/40 to-orange-500/40 rounded-2xl opacity-60" />
                        <div className="relative glass-card rounded-2xl p-6 h-full border border-yellow-500/30">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center font-bold text-yellow-400">
                                    3️⃣
                                </div>
                                <h3 className="text-base font-bold text-yellow-400">Garantia Resultado</h3>
                            </div>
                            <h4 className="text-lg font-bold text-white mb-3">A Mais Forte</h4>
                            <p className="text-sm text-slate-300 leading-relaxed mb-3">
                                Cumpriu tudo, executou, e não vendeu? <strong className="text-yellow-300">NÃO devolvemos dinheiro.</strong> Entregamos:
                            </p>
                            <ul className="text-xs text-slate-300 space-y-1 mb-3">
                                <li>✅ Sessão 1:1 c/ Geek (R$297)</li>
                                <li>✅ Acesso vitalício a updates</li>
                                <li>✅ Vaga grátis na Mentoria</li>
                            </ul>
                            <p className="text-xs text-yellow-400 font-semibold">
                                Você sai COM produto vendendo,<br />
                                não COM dinheiro de volta.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 animate-slide-up" style={{ animationDelay: '200ms' }}>
                    <div className="relative">
                        <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500 rounded-2xl opacity-80" />
                        <div className="relative bg-gradient-to-r from-blue-600/95 to-emerald-600/95 rounded-2xl p-6 md:p-8 text-center">
                            <div className="flex items-center justify-center gap-3 mb-3">
                                <ShieldCheck className="w-6 h-6 text-white" />
                                <h3 className="text-xl md:text-2xl font-extrabold text-white">
                                    Garantia mostra confiança no método, não no aluno.
                                </h3>
                                <ShieldCheck className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-blue-100 text-sm md:text-base max-w-3xl mx-auto">
                                Quem segue o método chega ao resultado. <strong className="text-white">Risco zero pra quem executa.</strong> Sem proteção pra quem só quer espiar.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GuaranteeSection;
