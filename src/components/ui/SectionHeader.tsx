import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  dark?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  dark,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-8 md:mb-10", className)}>
      <span
        className={cn(
          "type-label block",
          dark ? "text-brand-light" : "text-brand",
        )}
      >
        {eyebrow}
      </span>
      <h2
        className={cn(
          "type-h2 mt-3.5",
          dark ? "text-white" : "text-text",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("type-body mt-4 max-w-2xl", dark && "text-white/75")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
