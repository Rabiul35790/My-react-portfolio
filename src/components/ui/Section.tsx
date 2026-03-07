import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Container } from "./Container";

type SectionProps<T extends ElementType = "section"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className" | "id">;

export function Section<T extends ElementType = "section">({
  as,
  children,
  className,
  containerClassName,
  id,
  ...props
}: SectionProps<T>) {
  const Component = as ?? "section";

  return (
    <Component
      id={id}
      className={cn("py-[var(--section-space)]", className)}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </Component>
  );
}
