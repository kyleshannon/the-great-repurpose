import type { SVGProps } from "react";

const baseProps: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 48 48",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": "true",
};

export function IconImagination(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="24" cy="24" r="6" fill="currentColor" />
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 24 + Math.cos(angle) * 11;
        const y1 = 24 + Math.sin(angle) * 11;
        const x2 = 24 + Math.cos(angle) * 18;
        const y2 = 24 + Math.sin(angle) * 18;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

export function IconPossibility(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <path
        d="M14 24c-5.5 0-10-4.5-10-10S8.5 4 14 4c4.5 0 8.5 3 10 7 1.5-4 5.5-7 10-7 5.5 0 10 4.5 10 10s-4.5 10-10 10c-4.5 0-8.5-3-10-7-1.5 4-5.5 7-10 7Z"
        fill="currentColor"
      />
      <path
        d="M14 44c-5.5 0-10-4.5-10-10s4.5-10 10-10c4.5 0 8.5 3 10 7 1.5-4 5.5-7 10-7 5.5 0 10 4.5 10 10s-4.5 10-10 10c-4.5 0-8.5-3-10-7-1.5 4-5.5 7-10 7Z"
        fill="currentColor"
        opacity="0.5"
      />
    </svg>
  );
}

export function IconCreativity(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="6" y="6" width="36" height="36" rx="8" stroke="currentColor" strokeWidth="4" />
      <circle cx="24" cy="24" r="9" fill="currentColor" />
    </svg>
  );
}

export function IconDiscovery(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="4" />
      <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="4" />
      <circle cx="24" cy="24" r="4" fill="currentColor" />
    </svg>
  );
}

export function IconHumanGuts(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <path
        d="M24 42s-18-9.5-18-23c0-5 4-9 9-9 3.5 0 6.5 2 8.5 5 2-3 5-5 8.5-5 5 0 9 4 9 9 0 13.5-17 23-17 23Z"
        fill="currentColor"
      />
    </svg>
  );
}

export const stageIcons = [
  { Icon: IconImagination, label: "Imagination" },
  { Icon: IconPossibility, label: "Possibility" },
  { Icon: IconCreativity, label: "Creativity" },
  { Icon: IconDiscovery, label: "Discovery" },
  { Icon: IconHumanGuts, label: "Human Guts" },
] as const;
