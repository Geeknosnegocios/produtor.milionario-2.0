import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import logoEtzin from "@/assets/logo-etzin.svg";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleCTA = () => {
        window.open("https://cakto.com.br/produtor-milionario-2-0", "_blank");
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-slate-900/95 backdrop-blur-md border-b border-white/5"
                : "bg-transparent"
                }`}
        >
            <div className="container mx-auto max-w-7xl px-4">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo · ETzin alien em pixel art */}
                    <div className="flex items-center gap-3">
                        <img
                            src={logoEtzin}
                            alt="Produtor Milionário 2.0"
                            className="w-10 h-10 md:w-11 md:h-11 shadow-[0_0_20px_rgba(59,130,246,0.4)] rounded-lg"
                            width={44}
                            height={44}
                        />
                        <div className="flex flex-col leading-none">
                            <span className="text-sm md:text-base font-extrabold tracking-tight text-white">
                                Produtor Milionário <span className="text-blue-400">2.0</span>
                            </span>
                            <span className="text-[9px] md:text-[10px] font-medium tracking-[0.18em] text-blue-400 uppercase font-mono mt-0.5">
                                LowTicket com Claude
                            </span>
                        </div>
                    </div>

                    {/* Navigation - hidden on mobile */}
                    <nav className="hidden md:flex items-center gap-8">
                        <button
                            onClick={() => scrollToSection("hero")}
                            className="text-sm text-muted-foreground hover:text-white transition-colors"
                        >
                            Início
                        </button>
                        <button
                            onClick={() => scrollToSection("modules")}
                            className="text-sm text-muted-foreground hover:text-white transition-colors"
                        >
                            O Método
                        </button>
                        <button
                            onClick={() => scrollToSection("author")}
                            className="text-sm text-muted-foreground hover:text-white transition-colors"
                        >
                            Sobre
                        </button>
                    </nav>

                    {/* CTA Button */}
                    <Button
                        onClick={handleCTA}
                        variant="outline"
                        className="hidden sm:flex border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:border-blue-500 rounded-full px-6"
                    >
                        <Sparkles className="w-4 h-4 mr-2" />
                        R$147 · 1 hora
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
