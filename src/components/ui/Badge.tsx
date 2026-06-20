import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full bg-brand-soft px-4 py-1.5",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-brand" />
      <span className="font-display text-[11.5px] font-medium uppercase tracking-[0.16em] text-brand-dark">
        {children}
      </span>
    </span>
  );
}
