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
    cooldownMinutes: 60,
    storageKey: 'produtor-milionario-exit-intent'
  });

  return (
    <div className="min-h-screen bg-background">
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
