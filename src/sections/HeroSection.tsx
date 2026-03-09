import { motion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin } from "lucide-react";

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
      <div ref={bgRef} className="hero-glow pointer-events-none" aria-hidden />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 px-6 pb-14">
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
        </div>        <p className="max-w-3xl font-body text-lg tracking-wide text-text2">Full-Stack Software Developer | Problem Solver | Computer Science Graduate</p>

        <div className="mt-6 flex items-end justify-between">
          <div className="flex items-center gap-3">
            <div className="scroll-line" />
            <span className="font-mono text-label text-text2">SCROLL</span>
          </div>

          <div className="flex flex-col items-end gap-4 font-mono text-label text-text2">
            <a
              className="flex gap-1"
              href="https://github.com/Rabiul35790/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="interactive"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              className="flex gap-1"
              href="https://www.linkedin.com/in/mohammad-rabiul-hasan-173481209/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="interactive"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            {/* <a href="https://x.com/yourusername" target="_blank" rel="noopener noreferrer" data-cursor="interactive">
              Twitter
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
}

