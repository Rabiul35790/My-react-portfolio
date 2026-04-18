import { useEffect } from "react";
import { Marquee } from "../components/Marquee";
import { AboutSection } from "../sections/AboutSection";
import { BlogSection } from "../sections/BlogSection";
import { ContactSection } from "../sections/ContactSection";
import { EducationSection } from "../sections/EducationSection";
import { HeroSection } from "../sections/HeroSection";
import { ProcessSection } from "../sections/ProcessSection";
import { ServicesSection } from "../sections/ServicesSection";
import { WorkSection } from "../sections/WorkSection";
import { WorkExperienceSection } from "../sections/WorkExperienceSection";
import { blogPosts } from "../data/blogPosts";
import { services } from "../data/services";
import { workExperiences } from "../data/workExperience";
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

    setJsonLd("home-services-schema", {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Software Development Services",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: service.title,
          description: service.intro,
          provider: {
            "@type": "Person",
            name: "Rabiul Hasan"
          }
        }
      }))
    });

    setJsonLd("home-work-experience-schema", {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Work Experience",
      itemListElement: workExperiences.map((experience, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Role",
          roleName: experience.role,
          startDate: experience.period.split(" - ")[0],
          worksFor: {
            "@type": "Organization",
            name: experience.company
          }
        }
      }))
    });

    setJsonLd("home-blog-schema", {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Rabiul Hasan Blog",
      url: toAbsoluteUrl("/#blog"),
      blogPost: blogPosts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        datePublished: post.publishedAt,
        description: post.excerpt,
        author: {
          "@type": "Person",
          name: "Rabiul Hasan"
        },
        mainEntityOfPage: toAbsoluteUrl(`/blog/${post.slug}`)
      }))
    });

    return () => {
      removeJsonLd("home-person-schema");
      removeJsonLd("home-services-schema");
      removeJsonLd("home-work-experience-schema");
      removeJsonLd("home-blog-schema");
    };
  }, []);

  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <Marquee />
      <WorkSection />
      <WorkExperienceSection />
      <ServicesSection />
      <AboutSection />
      <EducationSection />
      <ProcessSection />
      <BlogSection />
      <ContactSection />
    </main>
  );
}
