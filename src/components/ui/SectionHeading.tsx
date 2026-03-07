import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Badge } from "./Badge";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  headingClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  headingClassName,
}: SectionHeadingProps) {
  const alignedClasses: Record<NonNullable<SectionHeadingProps["align"]>, string> = {
    left: "items-start text-left",
    center: "items-center text-center",
  };

  return (
    <header className={cn("flex flex-col gap-4", alignedClasses[align], className)}>
      {eyebrow ? <Badge tone="accent">{eyebrow}</Badge> : null}
      <h2
        className={cn(
          "max-w-3xl text-balance font-semibold tracking-tight",
          "text-3xl leading-tight text-text-primary sm:text-4xl md:text-5xl",
          headingClassName,
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-balance text-base leading-relaxed text-text-secondary sm:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}

type SectionHeadingActionsProps = {
  children: ReactNode;
  className?: string;
};

export function SectionHeadingActions({ children, className }: SectionHeadingActionsProps) {
  return (
    <div className={cn("mt-2 flex flex-wrap items-center gap-3", className)}>{children}</div>
  );
}
