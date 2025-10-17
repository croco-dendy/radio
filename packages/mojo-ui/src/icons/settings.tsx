import type React from 'react';

export const SettingsIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-label="Settings"
  >
    <title>Settings</title>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m0 5.08l-4.24 4.24M1 12h6m6 0h6m-5.78-7.78l4.24-4.24m0 13.56l-4.24 4.24" />
  </svg>
);
