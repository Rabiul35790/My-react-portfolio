import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const bioText = "I build digital products that focus on solving problem & feel as good as they look.";
const stats = [
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 7, suffix: "+", label: "Projects Shipped" },
  { value: 5, suffix: "", label: "Clients Served" }
];

export function AboutSection() {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const heading = ref.current?.querySelector<HTMLElement>(".about-heading");
      const words = gsap.utils.toArray<HTMLElement>(".about-word", ref.current);

      if (heading && words.length) {
        gsap.set(words, { opacity: 0.2 });

        const revealDistance = Math.max(900, words.length * 70);

        gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top top+=96",
            end: `+=${revealDistance}`,
            scrub: true,
            pin: true,
            pinSpacing: true,
            pinType: "fixed",
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        }).to(words, {
          opacity: 1,
          ease: "none",
          stagger: 0.22
        });
      }

      gsap.from(".about-reveal", {
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

      const statValues = gsap.utils.toArray<HTMLElement>("[data-stat-value]", ref.current);
      if (statValues.length) {
        const counterState = statValues.map(() => ({ value: 0 }));

        gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top 72%",
            once: true
          }
        }).to(counterState, {
          value: (index: number) => Number(statValues[index].dataset.statValue ?? 0),
          duration: 3.4,
          ease: "power3.out",
          stagger: 0.4,
          onUpdate() {
            counterState.forEach((state, index) => {
              const node = statValues[index];
              const suffix = node.dataset.statSuffix ?? "";
              node.textContent = `${Math.round(state.value)}${suffix}`;
            });
          }
        });
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref} className="mx-auto grid w-full max-w-7xl grid-cols-12 gap-8 px-6 py-24">
      <div className="about-reveal col-span-12 lg:col-span-7">
        <h2 className="about-heading font-display text-section leading-tight text-text1">
          {bioText.split(" ").map((word, index) => (
            <span key={`${word}-${index}`} className="about-word mr-3 inline-block">
              {word}
            </span>
          ))}
        </h2>
        <p className="about-reveal mt-8 max-w-2xl font-body text-base leading-relaxed text-text2">
          I enjoy turning ideas into real digital products. From backend logic to user interfaces, I focus on building applications that are reliable, scalable, and simple to use.
        </p>

        <p className="about-reveal mt-4 max-w-2xl font-body text-base leading-relaxed text-text2">
          My work combines problem-solving, clean engineering practices, and thoughtful design. The goal is always the same - ship software that works well, feels smooth, and delivers real value to users.
        </p>
      </div>

      <div className="about-reveal col-span-12 lg:col-span-5">
        <div className="profile-frame mb-5">
          <img
            src="/images/profile.png"
            alt="Profile"
            className="profile-image"
            loading="lazy"
          />
        </div>

        <div className="space-y-5 border border-border bg-surface p-6">
          {stats.map((item) => (
            <div key={item.label} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
              <p
                className="font-display text-5xl text-primary"
                data-stat-value={item.value}
                data-stat-suffix={item.suffix}
              >
                0{item.suffix}
              </p>
              <p className="mt-1 font-mono text-label text-text2">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="about-reveal col-span-12 mt-8 flex flex-wrap gap-0 border-y border-border py-5 font-mono text-label text-text2">
        {["Laravel", "React", "Typescript", "Filament", "Tailwind", "RESTful API", "Figma Plugin", "MySql"].map(
          (tool, index) => (
            <span key={tool} className="inline-flex items-center pr-4">
              {index > 0 && <span className="mr-4 h-4 w-px bg-border" aria-hidden />}
              {tool}
            </span>
          )
        )}
      </div>
    </section>
  );
}
