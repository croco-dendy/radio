/** @type {import('tailwindcss').Config} */
import { mojoPreset } from '@radio/mojo-ui/tailwind';

export default {
  presets: [mojoPreset],
  content: [
    './index.html', 
    './src/**/*.{css,ts,tsx}',
    '../../packages/mojo-ui/src/**/*.{ts,tsx}'
  ],
};
