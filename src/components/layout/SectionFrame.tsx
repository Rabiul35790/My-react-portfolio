import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

type SectionFrameProps = {
  children: ReactNode;
  className?: string;
};

export function SectionFrame({ children, className }: SectionFrameProps) {
  return (
    <div className={cn("section-divider relative pt-12 sm:pt-14", className)}>
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent sm:inset-x-10" />
      <div className="rounded-[var(--radius-xl)] border border-white/7 bg-surface/35 p-6 backdrop-blur-sm sm:p-8">
        {children}
      </div>
    </div>
  );
}
