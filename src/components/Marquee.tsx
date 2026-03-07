import { memo } from "react";

const line = "REACT ◆ TYPESCRIPT ◆ NODE ◆ GSAP ◆ DESIGN ◆ MOTION ◆ TAILWIND ◆ POSTGRESQL ◆ AWS ◆ FIGMA ◆ NEXT.JS ◆ ";

function MarqueeBase() {
  return (
    <section className="border-y border-border py-4" aria-label="Technology ticker">
      <div className="ticker-track font-mono text-sm uppercase tracking-wide text-text2">
        <span>{line}</span>
        <span>{line}</span>
      </div>
    </section>
  );
}

export const Marquee = memo(MarqueeBase);
