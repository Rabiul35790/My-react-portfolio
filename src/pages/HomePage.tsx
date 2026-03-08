import { Marquee } from "../components/Marquee";
import { AboutSection } from "../sections/AboutSection";
import { ContactSection } from "../sections/ContactSection";
import { EducationSection } from "../sections/EducationSection";
import { HeroSection } from "../sections/HeroSection";
import { ProcessSection } from "../sections/ProcessSection";
import { WorkSection } from "../sections/WorkSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Marquee />
      <WorkSection />
      <AboutSection />
      <EducationSection />
      <ProcessSection />
      <ContactSection />
    </>
  );
}
