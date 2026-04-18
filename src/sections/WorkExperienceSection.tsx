import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { workExperiences } from "../data/workExperience";

gsap.registerPlugin(ScrollTrigger);

export function WorkExperienceSection() {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".experience-item", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true
        }
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={ref} className="mx-auto w-full max-w-7xl px-6 py-24">
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-mono text-label text-primary">Work Experience</p>
          <p className="font-mono text-label text-text3">( {workExperiences.length.toString().padStart(2, "0")} )</p>
        </div>
        <h2 className="font-display text-section leading-tight text-text1">Professional Journey and Engineering Impact</h2>
        <p className="mt-4 max-w-3xl font-body text-base leading-relaxed text-text2">
          A concise view of roles, product contributions, and delivery outcomes across real software projects.
        </p>
      </div>

      <div className="grid gap-4">
        {workExperiences.map((item) => (
          <article key={`${item.company}-${item.role}`} className="experience-item border border-border bg-surface p-6 md:p-7">
            <div className="flex flex-col gap-3 border-b border-border pb-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-display text-3xl leading-tight text-text1">{item.role}</h3>
                <p className="mt-1 font-mono text-sm text-primary">{item.company}</p>
              </div>
              <div className="text-left md:text-right">
                <p className="font-mono text-label text-text2">{item.period}</p>
                <p className="mt-1 font-mono text-label text-text3">{item.location}</p>
              </div>
            </div>

            <p className="mt-5 max-w-4xl font-body text-base leading-relaxed text-text2">{item.summary}</p>

            <ul className="mt-5 grid gap-2 text-sm text-text2 md:grid-cols-3">
              {item.achievements.map((achievement) => (
                <li key={achievement} className="border border-border bg-bg/60 p-3 font-body leading-relaxed">
                  {achievement}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
