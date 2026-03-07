import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const ref = useRef<HTMLElement | null>(null);

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
        href="mailto:hello@yourdomain.dev"
        className="contact-reveal mt-8 inline-block font-mono text-2xl text-text1 underline-offset-4 hover:underline"
        data-cursor="interactive"
      >
        hello@yourdomain.dev
      </a>

      <div className="contact-reveal mt-10 flex flex-wrap items-center justify-center gap-4">
        <a href="mailto:hello@yourdomain.dev" className="btn-wipe btn-wipe-solid" data-cursor="interactive">
          Send a Message
        </a>
        <a href="#" className="btn-wipe btn-wipe-outline" data-cursor="interactive">
          Download CV
        </a>
      </div>

      <div className="contact-reveal mt-10 flex items-center justify-center gap-4 font-mono text-label text-text2">
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

      <p className="contact-reveal mt-12 font-mono text-label text-text3">(c) 2026 Your Name. All Rights Reserved.</p>
    </section>
  );
}
