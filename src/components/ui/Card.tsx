import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  elevated?: boolean;
};

export function Card({ className, elevated = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-white/10 bg-[var(--surface-overlay)] p-6",
        "backdrop-blur-md transition-all duration-[var(--motion-base)] ease-[var(--ease-premium)]",
        elevated ? "shadow-[var(--shadow-elevated)]" : "shadow-[var(--shadow-soft)]",
        className,
      )}
      {...props}
    />
  );
}
