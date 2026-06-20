import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width="36"
      height="36"
      className={cn("block shrink-0", className)}
      aria-hidden
    >
      <circle cx="50" cy="50" r="48" fill="#178A4E" />
      <path
        d="M50 26 C61 42 68 50 68 59 a18 18 0 1 1 -36 0 C32 50 39 42 50 26 Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}
