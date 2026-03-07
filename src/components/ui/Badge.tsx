import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "default" | "accent" | "muted";
};

const toneClasses = {
  default: "border-white/12 bg-white/[0.04] text-text-secondary",
  accent: "border-accent-primary/25 bg-accent-primary/12 text-accent-primary",
  muted: "border-white/10 bg-bg-secondary/80 text-text-muted",
};

export function Badge({ className, tone = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}
