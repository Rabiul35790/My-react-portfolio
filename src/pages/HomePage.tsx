import { lazy, Suspense, useEffect } from "react";
import { Marquee } from "../components/Marquee";
import { AboutSection } from "../sections/AboutSection";
import { ContactSection } from "../sections/ContactSection";
import { EducationSection } from "../sections/EducationSection";
import { HeroSection } from "../sections/HeroSection";
import { ProcessSection } from "../sections/ProcessSection";
import { removeJsonLd, setJsonLd, setPageSeo, toAbsoluteUrl } from "../utils/seo";

const LazyWorkSection = lazy(async () => {
  const module = await import("../sections/WorkSection");
  return { default: module.WorkSection };
});

function WorkSectionFallback() {
  return (
    <section id="work" className="mx-auto w-full max-w-7xl px-6 py-24">
      <div className="mb-8 flex items-center justify-between">
        <p className="font-mono text-label text-primary">Selected Work</p>
        <p className="font-mono text-label text-text3">( 04 )</p>
      </div>
      <div className="h-[min(82vh,46rem)] w-full border border-border bg-surface/40" aria-hidden />
    </section>
  );
}

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
    <main className="overflow-x-hidden">
      <HeroSection />
      <Marquee />
      <Suspense fallback={<WorkSectionFallback />}>
        <LazyWorkSection />
      </Suspense>
      <AboutSection />
      <EducationSection />
      <ProcessSection />
      <ContactSection />
    </main>
  );
}
