import { MessageCircle, Sparkles, Shield, Mail, Clock } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleWhatsApp = () => {
    window.open("https://chat.whatsapp.com/KfRAnNXf08wIFwTuLoCi1w", "_blank");
  };

  return (
    <footer className="pt-20 pb-32 md:pb-12 px-4 relative overflow-hidden border-t border-white/5">
      {/* Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 rounded-full blur-[150px]" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-blue-400" />
              <h3 className="text-2xl font-extrabold gradient-text">
                Produtor Milionário 2.0
              </h3>
            </div>
            <p className="text-sm text-blue-400 mb-2">LowTicket com Claude</p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Da ideia ao produto LowTicket vendendo em 1 hora com Claude.
            </p>
            <Button onClick={handleWhatsApp} variant="glass" className="gap-2">
              <MessageCircle className="w-4 h-4" />
              Grupo VIP WhatsApp
            </Button>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" />
              Links Importantes
            </h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-blue-500/50" />
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-blue-500/50" />
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-blue-500/50" />
                  Política de Reembolso
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" />
              Suporte
            </h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground/50" />
                contato@geekacademy.site
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground/50" />
                Segunda a Sexta, 9h às 18h
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400/50" />
                Garantia de Resultado (Tripla)
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 text-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Produtor Milionário 2.0 — LowTicket com Claude · Geek Academy. Todos os direitos reservados.
          </p>
          <p className="mt-3 text-xs text-muted-foreground/70 max-w-3xl mx-auto">
            Os resultados apresentados são individuais e podem variar conforme dedicação, execução do método e contexto pessoal.
            Não há promessa de renda garantida. Todo resultado depende da sua aplicação.
            Este site não é afiliado, endossado ou administrado por Anthropic (Claude), OpenAI (ChatGPT), Meta ou Cakto.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
