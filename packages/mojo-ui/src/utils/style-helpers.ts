export type Size = 'small' | 'medium' | 'large';
export type Variant = 'green' | 'yellow' | 'gray' | 'red';

export const getSizeTextClass = (size: Size): string => {
  switch (size) {
    case 'small':
      return 'text-sm';
    case 'medium':
      return 'text-base';
    case 'large':
      return 'text-lg';
  }
};

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};





