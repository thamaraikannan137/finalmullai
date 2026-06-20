import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
};

export function Section({
  id,
  children,
  className,
  innerClassName,
}: SectionProps) {
  return (
    <section id={id} className={cn(className)}>
      <div className={cn("section-padding", innerClassName)}>
        <Container>{children}</Container>
      </div>
    </section>
  );
}
