import { cn } from "@/lib/cn";

type StatGridProps = {
  items: Array<{ value: string; label: string }>;
  columns?: 2 | 3 | 4;
  className?: string;
  dark?: boolean;
};

export function StatGrid({
  items,
  columns = 4,
  className,
  dark,
}: StatGridProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-3",
    4: "grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-0", gridCols[columns], className)}>
      {items.map((item) => (
        <div
          key={`${item.value}-${item.label}`}
          className={cn(
            "border-l border-border-soft px-4 py-4 first:border-l-0 sm:px-6 sm:py-[18px]",
            dark && "border-white/10",
          )}
        >
          <div
            className={cn(
              "type-stat",
              dark ? "text-white" : "text-text",
            )}
          >
            {item.value}
          </div>
          <div
            className={cn(
              "type-body-sm mt-2",
              dark ? "text-white/70" : "text-text-soft",
            )}
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
