import { useEffect, useState, lazy, Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import Header from "@/components/Header";
import ProofSection from "@/components/ProofSection";
import Footer from "@/components/Footer";
import FixedCTA from "@/components/FixedCTA";
import { useExitIntent } from "@/hooks/useExitIntent";

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
const ExitIntentModal = lazy(() => import("@/components/ExitIntentModal"));

const Index = () => {
  const [showExitModal, setShowExitModal] = useState(false);
  const [splineReady, setSplineReady] = useState(false);

  useExitIntent(() => setShowExitModal(true), {
    cooldownMinutes: 5,
    storageKey: 'produtor-milionario-exit-intent',
    enableScrollTrigger: true,
    enableIdleTrigger: true,
  });

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
        <ExitIntentModal
          open={showExitModal}
          onOpenChange={setShowExitModal}
          checkoutUrl="https://cakto.com.br/produtor-milionario-2-0"
        />
      </Suspense>
      <Footer />
      <FixedCTA />
    </div>
  );
};

export default Index;
