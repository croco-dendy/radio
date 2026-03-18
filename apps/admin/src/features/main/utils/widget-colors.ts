export type WidgetColorOption = {
  name: string;
  value: string; // hex color
};

// Predefined color options based on Tailwind theme (see apps/admin/tailwind.config.js)
export const WIDGET_COLOR_OPTIONS: WidgetColorOption[] = [
  // Sun
  { name: 'Sun', value: '#ff9f1c' },
  { name: 'Sun Calm', value: '#ffc857' },
  { name: 'Sun Deep', value: '#ff6f00' },
  { name: 'Sun Relic', value: '#d45500' },

  // Ember
  { name: 'Ember', value: '#e4572e' },
  { name: 'Ember Calm', value: '#ff926b' },
  { name: 'Ember Deep', value: '#bc4b26' },
  { name: 'Ember Relic', value: '#803e2d' },

  // River
  { name: 'River', value: '#4b9ac3' },
  { name: 'River Calm', value: '#8ac5e6' },
  { name: 'River Deep', value: '#2f6d91' },

  // Paper Accent
  { name: 'Paper Accent', value: '#F49517' },
];
