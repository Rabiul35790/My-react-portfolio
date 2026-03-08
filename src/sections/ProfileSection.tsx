import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ProfileSection() {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".profile-reveal", {
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
    <section id="profile" ref={ref} className="mx-auto w-full max-w-7xl px-6 py-24">
      <div className="grid items-center gap-8 border border-border bg-surface p-6 md:grid-cols-2 md:p-8">
        <div className="profile-reveal">
          <p className="font-mono text-label text-primary">Profile</p>
          <h2 className="mt-4 font-display text-section leading-none text-text1">A Face Behind The Work</h2>
          <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-text2">
            Replace this image with your own portrait at <span className="text-text1">public/images/profile.jpg</span>. Keep a clean, high-resolution image for the best visual quality.
          </p>
        </div>

        <div className="profile-reveal profile-frame">
          <img
            src="/src/images/profile.png"
            alt="Profile portrait"
            className="profile-image"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
