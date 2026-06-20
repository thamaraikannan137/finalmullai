import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  href?: string;
  children: ReactNode;
  className?: string;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-white hover:bg-brand-dark border border-transparent",
  secondary:
    "bg-white text-text border border-[#dce2dd] hover:border-brand hover:bg-[#f6f8f5]",
  ghost:
    "bg-brand-muted text-text border border-border hover:bg-[#e4efe0]",
};

export function Button({
  variant = "primary",
  href,
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-[11px] px-7 py-3.5 text-sm font-semibold transition-colors duration-200",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
