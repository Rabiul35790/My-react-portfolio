import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const panels = [
  { step: "01", title: "Discover", text: "Audit constraints, audience, and business context before touching UI." },
  { step: "02", title: "Design", text: "Craft visual hierarchy and interaction rhythm with clear product intention." },
  { step: "03", title: "Develop", text: "Ship maintainable code and motion with measurable performance targets." }
];

export function ProcessSection() {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".process-panel", {
        x: 80,
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
    <section ref={ref} className="mx-auto w-full max-w-7xl px-6 py-24">
      <p className="font-mono text-label text-primary">Approach</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {panels.map((panel) => (
          <article key={panel.title} className="process-panel relative overflow-hidden border border-border bg-surface p-6">
            <p className="absolute right-4 top-2 font-display text-7xl text-text3">{panel.step}</p>
            <h3 className="relative z-10 font-display text-4xl text-text1">{panel.title}</h3>
            <p className="relative z-10 mt-3 max-w-sm font-body text-base leading-relaxed text-text2">{panel.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
