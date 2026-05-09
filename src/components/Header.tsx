import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";

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
        window.open("https://lastlink.com/p/CD127FC86/checkout-payment/", "_blank");
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
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        {/* Icon */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg blur-md opacity-50" />
                            <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                                <span className="text-white font-black text-lg md:text-xl">P</span>
                            </div>
                        </div>

                        {/* Text */}
                        <div className="flex flex-col leading-none">
                            <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                                Criação
                            </span>
                            <span className="text-base md:text-lg font-black tracking-tight">
                                <span className="text-white">INFOPRODUTOS</span>
                                <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent"> COM IA</span>
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
                        Quero Criar
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
