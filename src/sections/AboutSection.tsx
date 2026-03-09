import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const bioText = "I build digital products that focus on solving problem & feel as good as they look.";

export function AboutSection() {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".about-word", {
        opacity: 0.12,
        y: 18,
        duration: 0.55,
        ease: "power3.out",
        stagger: 0.03,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true
        }
      });

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
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref} className="mx-auto grid w-full max-w-7xl grid-cols-12 gap-8 px-6 py-24">
      <div className="about-reveal col-span-12 lg:col-span-7">
        <h2 className="font-display text-section leading-tight text-text1">
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
          {[{ n: "2+", l: "Years Experience" }, { n: "5+", l: "Projects Shipped" }, { n: "4", l: "Clients Served" }].map((item) => (
            <div key={item.l} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
              <p className="font-display text-5xl text-primary">{item.n}</p>
              <p className="mt-1 font-mono text-label text-text2">{item.l}</p>
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
