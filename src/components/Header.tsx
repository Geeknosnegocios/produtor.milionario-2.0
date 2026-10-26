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
        import("@/lib/tracking").then(({ trackInitiateCheckout }) => trackInitiateCheckout({ value: 247, source: 'header' }));
        window.open("https://pay.geekacademy.site/c/produtor-milion-rio-2-0-up?o=perpetuo-fpm2-0", "_blank");
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
                    <img
                        src="/brand/fpm2/fpm-horizontal-escuro.svg"
                        alt="FPM 2.0 — Produtor Milionário"
                        className="block w-[220px] md:w-[250px] h-auto shrink-0"
                        width={1510}
                        height={350}
                    />

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
                        R$247 · 1 hora
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
