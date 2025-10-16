export const baseLayerClasses = {
  baseLayer: 'base-layer',
  lampBase: 'lamp-base',
  lampSurface: 'lamp-surface',
};

export const glowEffectClasses = {
  frostedInner: 'frosted-inner',
  glowDisabled: 'glow-disabled',
  glowGreen: 'glow-green',
  glowYellow: 'glow-yellow',
  glowGray: 'glow-gray',
  glowRed: 'glow-red',
};

export const gradientClasses = {
  green: 'gradient-green',
  yellow: 'gradient-yellow',
  gray: 'gradient-gray',
  red: 'gradient-red',
  disabled: 'gradient-disabled',
};

export const allSharedClasses = {
  ...baseLayerClasses,
  ...glowEffectClasses,
  ...gradientClasses,
};
