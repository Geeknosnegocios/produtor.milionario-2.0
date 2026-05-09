import { Button } from "@/components/ui/button";
import { MessageCircle, Headphones } from "lucide-react";
import review1 from "@/assets/reviews/review-1.jpg";
import review2 from "@/assets/reviews/review-2.jpg";
import review3 from "@/assets/reviews/review-3.jpg";

const ContactSection = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/5512991036786?text=Ainda%20tenho%20D%C3%BAvidas%20do%20Forma%C3%A7%C3%A3o%20Produtor%20Milion%C3%A1rio%20....", "_blank");
  };

  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-green-500/5 rounded-full blur-[150px]" />

      <div className="container mx-auto max-w-3xl relative z-10">
        <div className="text-center space-y-8 animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-green-500/30">
            <Headphones className="w-4 h-4 text-green-400" />
            <span className="text-sm font-semibold text-green-300">Suporte</span>
          </div>

          {/* Avatar Stack */}
          <div className="flex justify-center">
            <div className="flex -space-x-3 md:-space-x-4">
              {[review1, review2, review3].map((img, index) => (
                <div key={index} className="relative">
                  <div className="absolute -inset-[2px] bg-gradient-to-br from-green-500 to-blue-500 rounded-full" />
                  <img
                    src={img}
                    alt={`Membro da equipe ${index + 1}`}
                    className="relative w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-background object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold px-4">
            Ainda tem <span className="gradient-text">dúvidas</span>?
          </h2>

          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto px-4">
            Não achou a resposta para sua dúvida sobre criar infoprodutos com IA? Fale com a gente.
          </p>

          {/* WhatsApp Button */}
          <div className="px-4 w-full max-w-sm mx-auto">
            <Button
              onClick={handleWhatsApp}
              className="relative overflow-hidden bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#25D366] text-white px-8 py-6 text-lg rounded-full font-bold transform hover:scale-105 transition-all duration-300 w-full shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:shadow-[0_0_40px_rgba(37,211,102,0.6)]"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Entrar em contato
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
