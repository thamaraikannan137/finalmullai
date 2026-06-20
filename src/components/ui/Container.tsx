import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("container-site", className)}>{children}</div>
  );
}
