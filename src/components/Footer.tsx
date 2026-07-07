import { MessageCircle, Sparkles, Shield, Mail, Clock, BookOpen, Youtube, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import logoEtzin from "@/assets/logo-etzin.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleWhatsApp = () => {
    window.open("https://chat.whatsapp.com/HCZgsievkKV5TchvfKF4aG", "_blank");
  };

  return (
    <footer className="pt-20 pb-32 md:pb-12 px-4 relative overflow-hidden border-t border-white/5">
      {/* Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 rounded-full blur-[150px]" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logoEtzin}
                alt="Produtor Milionário 2.0"
                className="w-11 h-11 rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                width={44}
                height={44}
              />
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

          {/* Recursos */}
          <div>
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              Recursos
            </h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <a href="https://blog.geekacademy.site" target="_blank" rel="noopener noreferrer" className="group hover:text-blue-400 transition-colors duration-300 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-blue-500/50" />
                  Blog Geek Academy
                  <ExternalLink className="w-3 h-3 text-blue-400/50 group-hover:text-blue-400 transition-colors" />
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@geeknosnegocios" target="_blank" rel="noopener noreferrer" className="group hover:text-blue-400 transition-colors duration-300 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-blue-500/50" />
                  Canal YouTube
                  <ExternalLink className="w-3 h-3 text-blue-400/50 group-hover:text-blue-400 transition-colors" />
                </a>
              </li>
              <li>
                <a href="https://geekacademy.site" target="_blank" rel="noopener noreferrer" className="group hover:text-blue-400 transition-colors duration-300 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-blue-500/50" />
                  Geek Academy
                  <ExternalLink className="w-3 h-3 text-blue-400/50 group-hover:text-blue-400 transition-colors" />
                </a>
              </li>
            </ul>
          </div>

          {/* Links Legais */}
          <div>
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" />
              Legal
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
            © {currentYear} Produtor Milionário 2.0 · LowTicket com Claude · Geek Academy. Todos os direitos reservados.
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
