import { BottleneckSection } from "@/app/(site)/_components/bottleneck-section";
import { ClientsLogoSection } from "@/app/(site)/_components/clients-logo-section";
import { ContactSection } from "@/app/(site)/_components/contact-section";
import { CtaSection } from "@/app/(site)/_components/cta-section";
import { FeaturesSection } from "@/app/(site)/_components/features-section";
import { HeroSection } from "@/app/(site)/_components/hero-section";
import { OutcomesSection } from "@/app/(site)/_components/outcomes-section";
import { PostsSection } from "@/app/(site)/_components/posts-section";
import { ServicesSection } from "@/app/(site)/_components/services-section";

export function HomePage() {
  return (
    <div className="overflow-hidden pb-16">
      <HeroSection />
      <ClientsLogoSection />
      <FeaturesSection />
      <BottleneckSection />
      <ServicesSection />
      <OutcomesSection />
      <PostsSection />
      <CtaSection />
      <ContactSection />
    </div>
  );
}
