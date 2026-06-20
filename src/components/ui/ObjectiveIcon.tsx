export type ObjectiveIconName = "water" | "dam" | "livelihood";

type ObjectiveIconProps = {
  name: ObjectiveIconName;
  className?: string;
};

const strokeProps = {
  fill: "none",
  stroke: "#178A4E",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ObjectiveIcon({ name, className }: ObjectiveIconProps) {
  if (name === "water") {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        aria-hidden
        className={className}
      >
        <path
          {...strokeProps}
          d="M12 3.5c-2.8 4.2-5 7.4-5 10.2a5 5 0 1 0 10 0c0-2.8-2.2-6-5-10.2z"
        />
        <path
          {...strokeProps}
          d="M4 20.5c1.4 1 3.1 1.5 5 1.5s3.6-.5 5-1.5"
        />
      </svg>
    );
  }

  if (name === "dam") {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        aria-hidden
        className={className}
      >
        <path
          {...strokeProps}
          d="M4 20h16M6 20V11l6-4 6 4v9"
        />
        <path
          {...strokeProps}
          d="M9 20v-5h6v5M12 7v3"
        />
        <path
          {...strokeProps}
          d="M3 20c2-1.5 4.5-2 9-2s7 .5 9 2"
        />
      </svg>
    );
  }

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
    >
      <path {...strokeProps} d="M12 21V9" />
      <path {...strokeProps} d="M12 9c-2.5-2-4-3.5-4-6" />
      <path {...strokeProps} d="M12 9c2.5-2 4-3.5 4-6" />
      <path {...strokeProps} d="M12 13c-2-1.5-3-3-3-4.5" />
      <path {...strokeProps} d="M12 13c2-1.5 3-3 3-4.5" />
      <path {...strokeProps} d="M12 17c-1.5-1-2.5-2-2.5-3" />
      <path {...strokeProps} d="M12 17c1.5-1 2.5-2 2.5-3" />
    </svg>
  );
}
