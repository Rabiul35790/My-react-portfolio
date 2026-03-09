import { memo } from "react";

const baseItems = ["REACT", "TYPESCRIPT", "PREACT", "TAILWIND", "LARAVEL", "RESTFUL API", "FILAMENT", "MYSQL", "BLADE", "OAUTH", "NEXT.JS"];
const loopItems = [...baseItems, ...baseItems, ...baseItems];

function MarqueeBase() {
  const renderSegment = (key: string) => (
    <div className="ticker-segment" aria-hidden="true" key={key}>
      {loopItems.map((item, index) => (
        <span className="ticker-item" key={`${item}-${index}`}>
          {item}
          <span className="mx-3 text-primary/70">◆</span>
        </span>
      ))}
    </div>
  );

  return (
    <section className="overflow-hidden border-y border-border py-4" aria-label="Technology ticker">
      <div className="ticker-track font-mono text-sm uppercase tracking-wide text-text2">
        {renderSegment("segment-a")}
        {renderSegment("segment-b")}
      </div>
    </section>
  );
}

export const Marquee = memo(MarqueeBase);
