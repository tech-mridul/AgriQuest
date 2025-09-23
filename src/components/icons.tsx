import type { SVGProps } from "react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M11 20A7 7 0 0 1 4 13" />
      <path d="M11 20A7 7 0 0 0 18 13" />
      <path d="M11 20V4" />
      <path d="M4 13C4 13 4 11 7 11" />
      <path d="M18 13C18 13 18 11 15 11" />
    </svg>
  ),
};
