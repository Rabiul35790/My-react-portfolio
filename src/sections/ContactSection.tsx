import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const ref = useRef<HTMLElement | null>(null);
  const currentYear = new Date().getFullYear();

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
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
    <section id="contact" ref={ref} className="mx-auto w-full max-w-7xl px-6 py-28 text-center">
      <h2 className="contact-reveal font-display text-section leading-none text-text1">LET'S WORK</h2>
      <h2 className="contact-reveal hero-stroke mt-1 font-display text-section leading-none text-transparent">TOGETHER</h2>

      <a
        href="mailto:rabiul35790@gmail.com"
        className="contact-reveal mt-8 inline-block font-mono text-2xl text-text1 underline-offset-4 hover:underline"
        data-cursor="interactive"
      >
        rabiul35790@gmail.com
      </a>

      <div className="contact-reveal mt-10 flex flex-wrap items-center justify-center gap-4">
        <a href="mailto:rabiul35790@gmail.com" className="btn-wipe btn-wipe-solid" data-cursor="interactive">
        <span>
           Send a Message
        </span>
         
        </a>
        <a
          href="/resume/resume.pdf"
          download="Rabiul-Hasan-Resume.pdf"
          className="btn-wipe btn-wipe-outline"
          data-cursor="interactive"
        >
          <span>
            Download CV
          </span>
        </a>
      </div>

      <div className="contact-reveal mt-10 flex items-center justify-center gap-5 font-mono text-label text-text2">
        <a className="flex gap-1" href="http://github.com/Rabiul35790/" target="_blank" rel="noopener noreferrer" data-cursor="interactive">
        <Github className="w-4 h-4" />
          GitHub
        </a>
        <a className="flex gap-1" href="https://www.linkedin.com/in/mohammad-rabiul-hasan-173481209/" target="_blank" rel="noopener noreferrer" data-cursor="interactive">
        <Linkedin className="w-4 h-4" />
          LinkedIn
        </a>
        {/* <a href="https://x.com/yourusername" target="_blank" rel="noopener noreferrer" data-cursor="interactive">
          Twitter
        </a> */}
      </div>

      <p className="contact-reveal mt-12 font-mono text-label text-text3">
        <span className="text-base align-middle">{"\u00A9"}</span> {currentYear} Rabiul Hasan. All Rights Reserved.
      </p>
    </section>
  );
}
