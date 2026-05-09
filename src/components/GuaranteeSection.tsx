import { ShieldCheck, CheckCircle, Sparkles, Lock, Scale, FileCheck, Trophy, Phone, FileX, Calendar, Award, Crown } from "lucide-react";

const GuaranteeSection = () => {
    return (
        <section className="border-white/[0.06] border-t pt-24 pb-24 px-4 relative overflow-hidden">
            <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-[140px]" />
            <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[140px]" />

            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Header eyebrow */}
                <div className="flex justify-center mb-6 animate-slide-up">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card border border-blue-500/40">
                        <Lock className="w-4 h-4 text-blue-400" />
                        <span className="ty-eyebrow font-bold">GARANTIA DE RESULTADO</span>
                        <Sparkles className="w-4 h-4 text-blue-400" />
                    </div>
                </div>

                {/* Big headline + shield */}
                <div className="text-center mb-6 animate-slide-up" style={{ animationDelay: '50ms' }}>
                    <div className="flex items-center justify-center gap-4 mb-6">
                        {/* Animated shield seal */}
                        <div className="relative w-20 h-20 lg:w-24 lg:h-24 flex-shrink-0">
                            <div className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full animate-pulse"></div>
                            <div className="absolute inset-1 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full"></div>
                            <div className="absolute inset-2 bg-[#0a0e1a] rounded-full flex items-center justify-center">
                                <ShieldCheck className="w-10 h-10 lg:w-12 lg:h-12 text-blue-300" strokeWidth={1.5} />
                            </div>
                            {/* Outer ring text */}
                            <div className="absolute -inset-2 border-2 border-dashed border-blue-500/30 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
                        </div>
                        <h2 className="ty-h2 text-left">
                            Garantia de <span className="text-blue-400">Resultado</span>.
                            <br />
                            Não de <span className="text-white/30 line-through">reembolso</span>.
                        </h2>
                    </div>
                </div>

                {/* Manifesto */}
                <div className="max-w-3xl mx-auto text-center mb-12 animate-slide-up" style={{ animationDelay: '100ms' }}>
                    <p className="ty-lead">
                        Não fazemos garantia "satisfação" pra malandro baixar conteúdo e pedir devolução.
                        Aqui é diferente: <strong className="text-blue-400 font-medium">garantimos resultado pra quem executa</strong>.
                        Não devolvemos dinheiro pra quem só quer espiar.
                    </p>
                </div>

                {/* 3 Layered cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-slide-up" style={{ animationDelay: '200ms' }}>

                    {/* CARD 1 · CDC */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/30 to-blue-600/20 rounded-3xl blur opacity-50 group-hover:opacity-80 transition-opacity"></div>
                        <div className="relative rounded-3xl border border-blue-500/30 bg-[#0E0F11] p-6 sm:p-7 h-full flex flex-col group-hover:border-blue-500/50 transition-colors duration-500">
                            {/* Top number + icon */}
                            <div className="flex items-center justify-between mb-5">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/40 flex items-center justify-center font-mono text-2xl font-black text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                                    1
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-blue-400/70 uppercase font-mono tracking-wider">Camada</p>
                                    <p className="text-xs text-blue-300 font-mono font-bold">7 DIAS · CDC</p>
                                </div>
                            </div>

                            {/* Visual: CDC seal mockup */}
                            <div className="relative h-32 rounded-xl bg-gradient-to-br from-blue-950/40 to-[#0B0C0E] border border-blue-500/15 overflow-hidden mb-5 flex items-center justify-center">
                                <div className="text-center">
                                    <Scale className="w-10 h-10 text-blue-400 mx-auto mb-2" strokeWidth={1.5} />
                                    <p className="text-[9px] text-blue-300 font-mono uppercase tracking-wider">Art. 49 · CDC</p>
                                    <p className="text-[8px] text-white/40 font-mono mt-1">DIREITO LEGAL</p>
                                </div>
                                <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-blue-500/15 border border-blue-500/30 rounded text-[8px] text-blue-300 font-mono">LEI</div>
                            </div>

                            <h3 className="ty-h4 mb-3">Lei do Consumidor</h3>
                            <p className="text-sm text-white/60 leading-relaxed mb-5 flex-1">
                                Direito legal Art. 49 CDC. Cancela direto no painel do aluno + responde 3 perguntas + confirma pelo celular.
                            </p>

                            {/* Action chips */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-xs text-blue-300/90">
                                    <Phone className="w-3.5 h-3.5" />
                                    <span>Sem ligação de retenção</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-blue-300/90">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>Devolução em 5 dias úteis</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CARD 2 · 30 dias */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/30 to-blue-600/20 rounded-3xl blur opacity-50 group-hover:opacity-80 transition-opacity"></div>
                        <div className="relative rounded-3xl border border-blue-500/30 bg-[#0E0F11] p-6 sm:p-7 h-full flex flex-col group-hover:border-blue-500/50 transition-colors duration-500">
                            <div className="flex items-center justify-between mb-5">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/40 flex items-center justify-center font-mono text-2xl font-black text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                                    2
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-blue-400/70 uppercase font-mono tracking-wider">Camada</p>
                                    <p className="text-xs text-blue-300 font-mono font-bold">30 DIAS · EXEC</p>
                                </div>
                            </div>

                            {/* Visual: print checklist mockup */}
                            <div className="relative h-32 rounded-xl bg-gradient-to-br from-blue-950/40 to-[#0B0C0E] border border-blue-500/15 overflow-hidden mb-5 p-3">
                                <div className="bg-[#0B0C0E] border border-blue-500/20 rounded h-full p-2.5 font-mono text-[8px]">
                                    <div className="flex items-center gap-1 mb-2 pb-1 border-b border-blue-500/10">
                                        <FileCheck className="w-2.5 h-2.5 text-blue-400" />
                                        <span className="text-blue-300/80">prova-execucao.zip</span>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded border border-blue-400 bg-blue-500 flex items-center justify-center text-white text-[6px]">✓</span>
                                            <span className="text-blue-300">print-modulo-1.png</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded border border-blue-400 bg-blue-500 flex items-center justify-center text-white text-[6px]">✓</span>
                                            <span className="text-blue-300">link-pagina.txt</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded border border-blue-400 bg-blue-500 flex items-center justify-center text-white text-[6px]">✓</span>
                                            <span className="text-blue-300">print-tentativa.png</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-2">
                                            <FileX className="w-2.5 h-2.5 text-red-400/60" />
                                            <span className="text-red-400/60">sem-prints.txt</span>
                                            <span className="ml-auto text-red-400/60">→ negado</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h3 className="ty-h4 mb-3">Execução Comprovada</h3>
                            <p className="text-sm text-white/60 leading-relaxed mb-5 flex-1">
                                Quer mais tempo? Tem. Mas precisa provar que executou: 3 prints obrigatórios.
                            </p>

                            {/* Result indicators */}
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-blue-300/90">Executou e não funcionou?</span>
                                    <span className="text-blue-300 font-bold">100%</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-white/40">Não executou?</span>
                                    <span className="text-red-400/80 font-bold">0%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CARD 3 · Resultado · DESTAQUE */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-br from-blue-400/40 via-blue-500/40 to-blue-600/40 rounded-3xl blur-md opacity-70 group-hover:opacity-100 transition-opacity animate-pulse-glow"></div>
                        <div className="relative rounded-3xl border-2 border-blue-400/60 bg-[#0E0F11] p-6 sm:p-7 h-full flex flex-col group-hover:border-blue-400/80 transition-colors duration-500 shadow-[0_0_60px_rgba(59,130,246,0.3)]">
                            {/* Best ribbon */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-500 to-blue-400 text-white text-[10px] font-bold uppercase tracking-widest font-mono rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                                ⭐ A MAIS FORTE
                            </div>

                            <div className="flex items-center justify-between mb-5 mt-2">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center font-mono text-2xl font-black text-white shadow-[0_0_25px_rgba(59,130,246,0.5)]">
                                    3
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-blue-300/80 uppercase font-mono tracking-wider">Camada</p>
                                    <p className="text-xs text-blue-300 font-mono font-bold">RESULTADO · ∞</p>
                                </div>
                            </div>

                            {/* Visual: Trophy/Reward mockup */}
                            <div className="relative h-32 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-700/10 border border-blue-400/30 overflow-hidden mb-5 flex items-center justify-center">
                                <div className="absolute inset-0 bg-grid opacity-30"></div>
                                <div className="relative text-center">
                                    <div className="relative">
                                        <Trophy className="w-12 h-12 text-blue-300 mx-auto mb-1" strokeWidth={1.5} />
                                        <Crown className="w-4 h-4 text-blue-200 absolute -top-1 -right-2" />
                                    </div>
                                    <p className="text-[9px] text-blue-200 font-mono uppercase tracking-wider font-bold">Resultado Garantido</p>
                                </div>
                                <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-blue-500 rounded text-[8px] text-white font-mono font-bold animate-pulse">PRO</div>
                            </div>

                            <h3 className="ty-h4 mb-3">A Mais Forte</h3>
                            <p className="text-sm text-white/65 leading-relaxed mb-5 flex-1">
                                Cumpriu tudo, executou, e <strong className="text-white">não vendeu</strong>?
                                NÃO devolvemos dinheiro. Entregamos:
                            </p>

                            {/* Reward stack */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-500/10 border border-blue-500/30">
                                    <Award className="w-4 h-4 text-blue-300 flex-shrink-0" />
                                    <span className="text-xs text-white/80">Sessão 1:1 c/ Geek</span>
                                    <span className="ml-auto text-xs text-blue-300 font-mono font-bold">R$297</span>
                                </div>
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-500/10 border border-blue-500/30">
                                    <Sparkles className="w-4 h-4 text-blue-300 flex-shrink-0" />
                                    <span className="text-xs text-white/80">Acesso vitalício</span>
                                    <span className="ml-auto text-xs text-blue-300 font-mono font-bold">∞</span>
                                </div>
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-500/10 border border-blue-500/30">
                                    <Crown className="w-4 h-4 text-blue-300 flex-shrink-0" />
                                    <span className="text-xs text-white/80">Vaga grátis na Mentoria</span>
                                    <span className="ml-auto text-xs text-blue-300 font-mono font-bold">VIP</span>
                                </div>
                            </div>

                            <p className="text-[11px] text-blue-300/80 italic text-center mt-4 leading-relaxed">
                                Você sai COM produto vendendo,<br />
                                não COM dinheiro de volta.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom manifesto · refined */}
                <div className="relative animate-slide-up" style={{ animationDelay: '300ms' }}>
                    {/* Outer glow layers */}
                    <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/15 via-blue-400/15 to-blue-600/15 rounded-3xl blur-3xl opacity-60"></div>

                    <div className="relative rounded-3xl border border-blue-500/30 bg-[#0E0F11] overflow-hidden">
                        {/* Top accent line */}
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/60 to-transparent"></div>

                        {/* Content grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">

                            {/* Left · Manifesto quote */}
                            <div className="lg:col-span-2 relative p-8 md:p-10 lg:p-12 lg:border-r border-white/[0.06]">
                                <div className="absolute inset-0 bg-grid opacity-20"></div>

                                <div className="relative">
                                    {/* Eyebrow */}
                                    <div className="flex items-center gap-2 mb-5">
                                        <div className="w-8 h-px bg-blue-500/40"></div>
                                        <span className="text-xs text-blue-400 uppercase font-mono tracking-[0.18em] font-bold">Manifesto</span>
                                    </div>

                                    {/* Big quote */}
                                    <h3 className="text-2xl md:text-3xl lg:text-4xl text-white font-light tracking-tighter leading-[1.1] mb-5">
                                        Garantia mostra confiança no <span className="text-blue-400 font-medium">método</span>,
                                        <br className="hidden md:block" />
                                        {" "}não no <span className="text-white/30 line-through">aluno</span>.
                                    </h3>

                                    <p className="text-base md:text-lg text-white/55 leading-relaxed max-w-2xl">
                                        Quem segue o método chega ao resultado.{" "}
                                        <strong className="text-white font-medium">Risco zero pra quem executa.</strong>{" "}
                                        Sem proteção pra quem só quer espiar.
                                    </p>

                                    {/* Signature-like chip */}
                                    <div className="mt-8 inline-flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-500/[0.08] border border-blue-500/25">
                                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                                            <span className="text-white text-[10px] font-black">AG</span>
                                        </div>
                                        <div>
                                            <p className="text-xs text-white/90 font-medium leading-none">Andrey Geek</p>
                                            <p className="text-[10px] text-blue-400/80 font-mono mt-0.5">@andreywestley</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right · Trust stats */}
                            <div className="relative p-8 md:p-10 lg:p-12 bg-blue-500/[0.04]">
                                <div className="space-y-6">
                                    {/* Stat 1 */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                                            <ShieldCheck className="w-5 h-5 text-blue-300" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-2xl font-black text-white leading-none">3 camadas</p>
                                            <p className="text-xs text-blue-400/80 font-mono mt-1.5 uppercase tracking-wider">de proteção</p>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="h-px w-full bg-white/[0.06]"></div>

                                    {/* Stat 2 */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                                            <Lock className="w-5 h-5 text-blue-300" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-2xl font-black text-white leading-none">5 dias úteis</p>
                                            <p className="text-xs text-blue-400/80 font-mono mt-1.5 uppercase tracking-wider">devolução · Art. 49</p>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="h-px w-full bg-white/[0.06]"></div>

                                    {/* Stat 3 */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                                            <Trophy className="w-5 h-5 text-blue-300" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-2xl font-black text-white leading-none">R$294 valor</p>
                                            <p className="text-xs text-blue-400/80 font-mono mt-1.5 uppercase tracking-wider">na garantia 3</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom accent line */}
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/60 to-transparent"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GuaranteeSection;
