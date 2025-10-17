import type React from 'react';

export const CheckIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-label="Check"
  >
    <title>Check</title>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
