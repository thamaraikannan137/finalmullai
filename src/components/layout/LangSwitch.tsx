"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type LangSwitchProps = {
  className?: string;
};

export function LangSwitch({ className }: LangSwitchProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const nextLocale = locale === "ta" ? "en" : "ta";
  const label = locale === "ta" ? "English" : "தமிழ்";

  return (
    <button
      type="button"
      className={cn(
        "inline-flex rounded-lg border border-border bg-white px-3 py-2 text-xs font-semibold text-text-muted transition-colors hover:border-brand hover:text-brand",
        className,
      )}
      onClick={() => router.replace(pathname, { locale: nextLocale })}
    >
      {label}
    </button>
  );
}
