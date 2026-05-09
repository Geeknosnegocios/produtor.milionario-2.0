import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import Header from "@/components/Header";
import ProofSection from "@/components/ProofSection";
import PainPointsSection from "@/components/PainPointsSection";
import VibeCodingSection from "@/components/VibeCodingSection";
import ModulesSection from "@/components/ModulesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import DifferenceSection from "@/components/DifferenceSection";
import TargetAudienceSection from "@/components/TargetAudienceSection";
import BonusSection from "@/components/BonusSection";
import ValueSection from "@/components/ValueSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import AuthorSection from "@/components/AuthorSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FixedCTA from "@/components/FixedCTA";
import ExitIntentModal from "@/components/ExitIntentModal";
import { useExitIntent } from "@/hooks/useExitIntent";

const Index = () => {
  const [showExitModal, setShowExitModal] = useState(false);

  useExitIntent(() => setShowExitModal(true), {
    cooldownMinutes: 5,
    storageKey: 'produtor-milionario-exit-intent',
    enableScrollTrigger: true,
    enableIdleTrigger: true,
  });

  return (
    <div className="min-h-screen relative isolate">
      {/* Spline animated background · global */}
      <div className="spline-container fixed inset-0 w-full h-full pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
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
        {/* Dark overlay pra preservar contraste do conteúdo */}
        <div className="absolute inset-0 bg-[#020617]/75 pointer-events-none"></div>
      </div>

      <Header />
      <HeroSection />
      <ProofSection />
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
      <Footer />
      <FixedCTA />
      <ExitIntentModal
        open={showExitModal}
        onOpenChange={setShowExitModal}
        checkoutUrl="https://cakto.com.br/produtor-milionario-2-0"
      />
    </div>
  );
};

export default Index;
