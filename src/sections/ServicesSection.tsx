import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { services } from "../data/services";

gsap.registerPlugin(ScrollTrigger);

export function ServicesSection() {
  const ref = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".service-item", {
        y: 50,
        opacity: 0,
        duration: 0.85,
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

  const updateNavigationState = () => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    setCanGoPrev(track.scrollLeft > 2);
    setCanGoNext(track.scrollLeft < maxScrollLeft - 2);
  };

  const navigateTrack = (direction: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const step = Math.max(track.clientWidth * 0.72, 280);
    const left = direction === "next" ? step : -step;
    track.scrollBy({ left, behavior: "smooth" });
  };

  useLayoutEffect(() => {
    updateNavigationState();

    const track = trackRef.current;
    if (!track) {
      return;
    }

    const onScroll = () => updateNavigationState();
    const onResize = () => updateNavigationState();

    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section id="services" ref={ref} className="mx-auto w-full max-w-7xl px-6 py-24">
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="font-mono text-label text-primary">Services</p>
          <p className="font-mono text-label text-text3">( {services.length.toString().padStart(2, "0")} )</p>
        </div>
        <h2 className="font-display text-section leading-tight text-text1">Services for Product-Focused Software Teams</h2>
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <p className="max-w-3xl font-body text-base leading-relaxed text-text2">
            End-to-end delivery support from architecture and backend systems to polished, responsive frontend experiences.
          </p>
          <div className="flex items-center gap-2 md:shrink-0">
            <button
              type="button"
              onClick={() => navigateTrack("prev")}
              disabled={!canGoPrev}
              className="inline-flex h-9 w-9 items-center justify-center border border-border bg-surface text-text2 transition-colors disabled:cursor-not-allowed disabled:opacity-35"
              aria-label="Previous services"
              data-cursor="interactive"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => navigateTrack("next")}
              disabled={!canGoNext}
              className="inline-flex h-9 w-9 items-center justify-center border border-border bg-surface text-text2 transition-colors disabled:cursor-not-allowed disabled:opacity-35"
              aria-label="Next services"
              data-cursor="interactive"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="grid auto-cols-[minmax(18rem,1fr)] grid-flow-col gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:auto-cols-[minmax(21rem,1fr)]"
      >
        {services.map((service) => (
          <article key={service.title} className="service-item min-h-[20rem] border border-border bg-surface p-6">
            <h3 className="font-display text-3xl leading-tight text-text1">{service.title}</h3>
            <p className="mt-4 font-body text-base leading-relaxed text-text2">{service.intro}</p>

            <ul className="mt-5 space-y-2">
              {service.deliverables.map((deliverable) => (
                <li key={deliverable} className="font-mono text-label text-text2">
                  {deliverable}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
