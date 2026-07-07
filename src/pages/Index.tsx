import { useEffect, useRef, useState, lazy, Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import Header from "@/components/Header";
import ProofSection from "@/components/ProofSection";
import Footer from "@/components/Footer";
import FixedCTA from "@/components/FixedCTA";
import ExitIntentModal from "@/components/ExitIntentModal";
import { trackViewContent } from "@/lib/tracking";

const ModulesSection = lazy(() => import("@/components/ModulesSection"));
const PainPointsSection = lazy(() => import("@/components/PainPointsSection"));
const VibeCodingSection = lazy(() => import("@/components/VibeCodingSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const DifferenceSection = lazy(() => import("@/components/DifferenceSection"));
const TargetAudienceSection = lazy(() => import("@/components/TargetAudienceSection"));
const BonusSection = lazy(() => import("@/components/BonusSection"));
const ValueSection = lazy(() => import("@/components/ValueSection"));
const GuaranteeSection = lazy(() => import("@/components/GuaranteeSection"));
const AuthorSection = lazy(() => import("@/components/AuthorSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const CTASection = lazy(() => import("@/components/CTASection"));

const CHECKOUT_URL = "https://pay.geekacademy.site/c/produtor-milion-rio-2-0-up?o=perpetuo-fpm2-0";

const Index = () => {
  const [splineReady, setSplineReady] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const exitFiredRef = useRef(false);

  useEffect(() => {
    trackViewContent();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const fire = () => setSplineReady(true);
    if ('requestIdleCallback' in window) {
      const handle = (window as any).requestIdleCallback(fire, { timeout: 2500 });
      return () => (window as any).cancelIdleCallback?.(handle);
    }
    const t = setTimeout(fire, 1500);
    return () => clearTimeout(t);
  }, []);

  // Exit-intent: dispara o popup quando o mouse sai pelo topo (após 4s na página)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try { if (localStorage.getItem('produtor-milionario-exit-accepted') === 'true') return; } catch { /* noop */ }
    const start = Date.now();
    const handle = (e: MouseEvent) => {
      if (exitFiredRef.current) return;
      if (exitOpen) return;
      const to = e.relatedTarget as Node | null;
      if (to !== null) return;
      if (e.clientY > 0) return;
      if (Date.now() - start < 4000) return;
      exitFiredRef.current = true;
      setExitOpen(true);
    };
    document.addEventListener('mouseout', handle);
    return () => document.removeEventListener('mouseout', handle);
  }, [exitOpen]);

  return (
    <div className="min-h-screen relative isolate">
      {/* Spline animated background · global */}
      <div className="spline-container fixed inset-0 w-full h-full pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
        {splineReady && (
          <iframe
            src="https://my.spline.design/animatedbackgroundgradientforweb-jvJDeBWjMvShkjPKxPRUswLq"
            frameBorder="0"
            width="100%"
            height="100%"
            id="aura-spline"
            className="w-full h-full"
            loading="lazy"
            title="Animated background"
          />
        )}
        {/* Dark overlay pra preservar contraste do conteúdo */}
        <div className="absolute inset-0 bg-[#020617]/75 pointer-events-none"></div>
      </div>

      <Header />
      <HeroSection />
      <ProofSection />
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <ModulesSection />
        <PainPointsSection />
        <VibeCodingSection />
        <TestimonialsSection />
        <DifferenceSection />
        <TargetAudienceSection />
        <BonusSection />
        <ValueSection />
        <GuaranteeSection />
        <AuthorSection />
        <FAQSection />
        <ContactSection />
        <CTASection />
      </Suspense>
      <Footer />
      <FixedCTA />

      {/* Exit-intent popup · fechar no X redireciona pro checkout de saída */}
      <ExitIntentModal
        open={exitOpen}
        onOpenChange={setExitOpen}
        checkoutUrl={CHECKOUT_URL}
      />
    </div>
  );
};

export default Index;
