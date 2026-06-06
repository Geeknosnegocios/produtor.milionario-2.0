import { useEffect, useState } from "react";
import { Check, Bell, CalendarDays, MessageCircle, AlertTriangle } from "lucide-react";

// ===== CONFIG (preencher) =====
const GRUPO_URL = "GRUPO_URL"; // link do grupo WhatsApp: https://chat.whatsapp.com/XXXX

const Obrigado = () => {
  const [nome, setNome] = useState("");
  useEffect(() => {
    try { const n = localStorage.getItem("fpm2_nome"); if (n) setNome(n.split(" ")[0]); } catch { /* noop */ }
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-10 sm:py-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-green-500/12 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg mx-auto text-center">
        {/* check */}
        <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.5)] animate-scale-in">
          <Check className="w-10 h-10 text-white" strokeWidth={3} />
        </div>

        <p className="mt-5 text-xs font-mono uppercase tracking-widest text-green-400 font-bold animate-slide-up">Vaga confirmada</p>
        <h1 className="mt-2 text-2xl sm:text-4xl font-black tracking-tight text-white animate-slide-up" style={{ animationDelay: "100ms" }}>
          {nome ? `${nome}, falta ` : "Falta "}<span className="text-green-400">1 passo</span>
        </h1>
        <p className="mt-3 text-sm sm:text-lg text-white/55 animate-slide-up max-w-md mx-auto" style={{ animationDelay: "200ms" }}>
          Sua vaga tá reservada. Agora <span className="text-white font-medium">entre no grupo</span> — é lá que o link da aula ao vivo vai cair.
        </p>

        {/* WhatsApp CTA */}
        <a
          href={GRUPO_URL} target="_blank" rel="noopener noreferrer"
          className="mt-7 w-full flex items-center justify-center gap-3 bg-gradient-to-br from-[#25d366] to-[#1da851] text-[#04240f] font-black text-base sm:text-xl rounded-2xl py-5 shadow-[0_14px_44px_rgba(37,211,102,0.45)] animate-pulse-glow animate-slide-up"
          style={{ animationDelay: "300ms" }}
        >
          <MessageCircle className="w-6 h-6 fill-[#04240f]" /> Entrar no grupo agora
        </a>
        <p className="text-xs text-white/40 mt-2 mb-7">Toque no botão acima · grupo oficial da aula</p>

        {/* date */}
        <div className="glass-card rounded-2xl px-5 py-4 flex items-center justify-center gap-4 mb-6 animate-slide-up" style={{ animationDelay: "400ms" }}>
          <CalendarDays className="w-8 h-8 text-blue-400 flex-shrink-0" />
          <div className="text-left">
            <div className="font-bold text-white">Próxima aula ao vivo</div>
            <div className="font-mono text-sm text-blue-400 font-bold">QUARTA · 20H · na Geek Academy</div>
          </div>
        </div>

        {/* steps */}
        <div className="flex flex-col gap-3 text-left mb-6 animate-slide-up" style={{ animationDelay: "500ms" }}>
          {[
            { n: 1, t: "Entre no grupo", s: "É onde o link da aula vai cair", icon: <MessageCircle className="w-4 h-4" /> },
            { n: 2, t: "Ative a notificação do grupo", s: "Pra não perder o aviso de 'começando agora'", icon: <Bell className="w-4 h-4" /> },
            { n: 3, t: "Quarta, 20h, esteja online", s: "Vou criar um produto do zero, ao vivo", icon: <CalendarDays className="w-4 h-4" /> },
          ].map((st) => (
            <div key={st.n} className="flex items-center gap-3.5 glass-card rounded-xl px-4 py-3.5">
              <span className="w-9 h-9 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-300 font-mono font-bold flex items-center justify-center flex-shrink-0">{st.n}</span>
              <div>
                <div className="text-sm font-semibold text-white flex items-center gap-2">{st.icon}{st.t}</div>
                <div className="text-xs text-white/50 mt-0.5">{st.s}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-2 text-left text-sm text-white/60 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 animate-slide-up" style={{ animationDelay: "600ms" }}>
          <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
          <span><span className="text-white font-semibold">Importante:</span> as vagas da aula são limitadas e os bônus só liberam pra quem está ao vivo. Entra no grupo agora pra não ficar de fora.</span>
        </div>

        <p className="mt-7 text-xs text-white/30">Geek Academy · Produtor Milionário 2.0</p>
      </div>
    </div>
  );
};

export default Obrigado;
