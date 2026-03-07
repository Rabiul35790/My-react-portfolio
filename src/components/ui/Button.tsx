import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type SharedProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
};

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] border " +
  "font-medium transition-all duration-[var(--motion-fast)] ease-[var(--ease-premium)] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary";

const sizeClasses = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm sm:text-base",
  lg: "h-12 px-6 text-base",
};

const variantClasses = {
  primary:
    "border-accent-primary/30 bg-accent-primary/12 text-text-primary " +
    "shadow-[0_0_0_1px_rgba(139,92,246,0.14)] hover:border-accent-primary/50 hover:bg-accent-primary/18",
  ghost:
    "border-white/12 bg-surface/75 text-text-secondary backdrop-blur-sm " +
    "hover:border-white/20 hover:bg-surface-elevated/80 hover:text-text-primary",
};

export function Button(props: ButtonProps) {
  const {
    children,
    className,
    variant = "primary",
    size = "md",
    ...elementProps
  } = props;
  const classes = cn(baseClasses, sizeClasses[size], variantClasses[variant], className);

  if ("href" in elementProps && typeof elementProps.href === "string") {
    const { href, ...anchorProps } = elementProps;

    return (
      <a href={href} className={classes} data-cursor="interactive" {...anchorProps}>
        {children}
      </a>
    );
  }

  const { type, ...buttonProps } = elementProps;

  const buttonType: ButtonHTMLAttributes<HTMLButtonElement>["type"] =
    type === "submit" || type === "reset" ? type : "button";

  return (
    <button type={buttonType} className={classes} data-cursor="interactive" {...buttonProps}>
      {children}
    </button>
  );
}
