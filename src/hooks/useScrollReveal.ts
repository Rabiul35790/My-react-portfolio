import { type RefObject, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Options = {
  trigger?: string;
  y?: number;
  stagger?: number;
};

export function useScrollReveal<T extends HTMLElement>(ref: RefObject<T>, options?: Options) {
  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(options?.trigger ?? ".reveal", {
        y: options?.y ?? 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: options?.stagger ?? 0.12,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true
        }
      });
    }, ref);

    return () => {
      ctx.revert();
    };
  }, [ref, options?.stagger, options?.trigger, options?.y]);
}
