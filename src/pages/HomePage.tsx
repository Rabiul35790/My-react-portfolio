import { useEffect } from "react";
import { Marquee } from "../components/Marquee";
import { AboutSection } from "../sections/AboutSection";
import { ContactSection } from "../sections/ContactSection";
import { EducationSection } from "../sections/EducationSection";
import { HeroSection } from "../sections/HeroSection";
import { ProcessSection } from "../sections/ProcessSection";
import { WorkSection } from "../sections/WorkSection";
import { removeJsonLd, setJsonLd, setPageSeo, toAbsoluteUrl } from "../utils/seo";

export default function HomePage() {
  useEffect(() => {
    setPageSeo({
      title: "Rabiul Hasan | Full-Stack Software Developer",
      description:
        "Premium portfolio of Rabiul Hasan, a full-stack software developer focused on product-quality web applications and refined user experiences.",
      path: "/",
      image: "/images/profile.png",
      type: "website"
    });

    setJsonLd("home-person-schema", {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Rabiul Hasan",
      jobTitle: "Full-Stack Software Developer",
      url: toAbsoluteUrl("/"),
      image: toAbsoluteUrl("/images/profile.png"),
      sameAs: [
        "https://github.com/Rabiul35790/",
        "https://www.linkedin.com/in/mohammad-rabiul-hasan-173481209/"
      ]
    });

    return () => removeJsonLd("home-person-schema");
  }, []);

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
