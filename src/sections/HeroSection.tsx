import { motion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lines = [
  { text: "BUILDING", stroke: true },
  { text: "DIGITAL", stroke: false },
  { text: "EXPERIENCES", stroke: true }
];

export function HeroSection() {
  const ref = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!ref.current || !bgRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={ref} className="relative flex min-h-screen items-end overflow-hidden pt-28">
      <div ref={bgRef} className="hero-glow" aria-hidden />
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 pb-14">
        <div>
          {lines.map((line, idx) => (
            <motion.h1
              key={line.text}
              className={`font-display text-hero leading-none ${line.stroke ? "hero-stroke text-transparent" : "text-primary"}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {line.text.split("").map((char, i) => (
                <motion.span
                  key={`${char}-${i}`}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: idx * 0.15 + i * 0.014, duration: 0.45 }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>
          ))}
        </div>

        <p className="max-w-3xl font-body text-lg tracking-wide text-text2">
          Full-Stack Developer · UI Engineer · Creative Coder
        </p>

        <div className="mt-6 flex items-end justify-between">
          <div className="flex items-center gap-3">
            <div className="scroll-line" />
            <span className="font-mono text-label text-text2">SCROLL</span>
          </div>

          <div className="flex flex-col items-end gap-1 font-mono text-label text-text2">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" data-cursor="interactive">
              GitHub
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" data-cursor="interactive">
              LinkedIn
            </a>
            <a href="https://x.com/yourusername" target="_blank" rel="noopener noreferrer" data-cursor="interactive">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
