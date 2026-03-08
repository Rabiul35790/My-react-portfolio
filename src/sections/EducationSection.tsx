import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { education } from "../data/education";

gsap.registerPlugin(ScrollTrigger);

export function EducationSection() {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".education-item", {
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
    <section id="education" ref={ref} className="mx-auto w-full max-w-7xl px-6 py-24">
      <div className="mb-8 flex items-center justify-between">
        <p className="font-mono text-label text-primary">Education</p>
        <p className="font-mono text-label text-text3">( {education.length.toString().padStart(2, "0")} )</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {education.map((item) => (
          <article key={`${item.degree}-${item.institute}`} className="education-item border border-border bg-surface p-6">
            <p className="font-mono text-label text-text2">{item.period}</p>
            <h3 className="mt-3 font-display text-3xl leading-tight text-text1">{item.degree}</h3>
            <p className="mt-2 font-mono text-sm text-primary">{item.institute}</p>
            <p className="mt-4 font-body text-base leading-relaxed text-text2">{item.focus}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
