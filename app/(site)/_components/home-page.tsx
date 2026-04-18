import { BottleneckSection } from "@/app/(site)/_components/bottleneck-section";
import { BrandStrategySection } from "@/app/(site)/_components/brand-strategy-section";
import { ClientsLogoSection } from "@/app/(site)/_components/clients-logo-section";
import { ContactSection } from "@/app/(site)/_components/contact-section";
import { FeaturesSection } from "@/app/(site)/_components/features-section";
import { HomeFaqSection } from "@/app/(site)/_components/home-faq-section";
import { HeroSection } from "@/app/(site)/_components/hero-section";
import { OutcomesSection } from "@/app/(site)/_components/outcomes-section";
import { PostsSection } from "@/app/(site)/_components/posts-section";
import { ProofSignalsSection } from "@/app/(site)/_components/proof-signals-section";
import { JsonLd } from "@/components/shared/json-ld";
import { homeFaqSectionContent } from "@/lib/content";
import { createFaqSchema } from "@/lib/seo";
import { ServicesSection } from "@/app/(site)/_components/services-section";

export function HomePage() {
  return (
    <div className="overflow-hidden pb-16">
      <JsonLd data={createFaqSchema(homeFaqSectionContent.items)} />
      <HeroSection />
      <ClientsLogoSection />
      <FeaturesSection />
      <BottleneckSection />
      <ServicesSection />
      <BrandStrategySection />
      {/* <ProofSignalsSection /> */}
      <OutcomesSection />
      <PostsSection />
      <HomeFaqSection />
      <ContactSection />
    </div>
  );
}
