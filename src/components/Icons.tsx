import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

/** Shared wrapper for 24x24 line icons. Decorative by default. */
function LineIcon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M15 18l-6-6 6-6" />
    </LineIcon>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M9 18l6-6-6-6" />
    </LineIcon>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <LineIcon strokeWidth="2.5" {...props}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </LineIcon>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6L12 3z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </LineIcon>
  );
}

export function EntranceIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M3 21h18" />
      <path d="M5 21V4h9v17" />
      <path d="M14 7h5v14" />
      <path d="M11 12.5v.5" />
    </LineIcon>
  );
}

export function ExpertiseIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M9 13.5L7.5 21l4.5-2.5 4.5 2.5-1.5-7.5" />
      <path d="M10 9l1.5 1.5L14.5 7.5" />
    </LineIcon>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M5 4h3.5l1.5 4.5-2.25 1.5a11 11 0 006.25 6.25L15.5 14l4.5 1.5V19a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
    </LineIcon>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M3.5 6l8.5 7 8.5-7" />
    </LineIcon>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </LineIcon>
  );
}

/** Solid five-point star used as a decorative mark. */
export function StarShape(props: IconProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false" {...props}>
      <polygon
        fill="currentColor"
        points="50,2 61.8,35.5 97.6,35.5 68.9,56.9 79.4,91 50,70.5 20.6,91 31.1,56.9 2.4,35.5 38.2,35.5"
      />
    </svg>
  );
}
