# SCSS Quick Reference

## Import Shared Utilities

```scss
@use '../../styles' as *;
```

## Common Mixins

```scss
@include base-layer;              // Steel base layer (full)
@include lamp-base(4.5px);        // Dark layer with inset
@include lamp-surface(4.5px);     // Lamp surface with inset
@include apply-variant(green);    // Apply color gradient
@include apply-glow(green);       // Apply glow effect with hover
@include frosted-inner;           // Frosted inner shadow
@include input-field;             // Input background style
@include input-content;           // Input text field positioning
@include absolute-fill;           // position: absolute; inset: 0;
```

## Functions

```scss
get-size-inset(small)      // 3.5px
get-size-inset(medium)     // 4.5px
get-size-inset(large)      // 5.8px

get-size-height(small)     // 36px
get-size-height(medium)    // 48px
get-size-height(large)     // 56px

get-size-padding(small)    // 0 20px
get-size-padding(medium)   // 0 20px
get-size-padding(large)    // 0 24px
```

## Variables

```scss
// Border radius
$border-radius-full    // 9999px
$border-radius-xl      // 24px

// Transitions
$transition-smooth     // all 200ms ease-out

// Gradients
$base-layer-gradient
$lamp-base-color
$input-field-gradient

// Shadows
$shadow-base
$shadow-lamp-base
$shadow-frosted-inner
$input-shadow-inset

// Borders
$input-border
```

## Variants

Available: `green`, `yellow`, `gray`, `red`, `disabled`

## Sizes

Available: `small`, `medium`, `large`

## Component Template

```scss
@use '../../styles' as *;

.wrapper {
  position: relative;
  
  &.small { height: get-size-height(small); }
  &.medium { height: get-size-height(medium); }
  &.large { height: get-size-height(large); }
}

.baseLayer {
  @include base-layer;
}

.lampBase {
  @include lamp-base(4.5px);
}

.surface {
  @include lamp-surface(4.5px);
  
  &.green { @include apply-variant(green); @include apply-glow(green); }
  &.yellow { @include apply-variant(yellow); @include apply-glow(yellow); }
  &.red { @include apply-variant(red); @include apply-glow(red); }
}
```

## Component TypeScript

```tsx
import clsx from 'clsx';
import styles from './component.module.scss';

type Size = 'small' | 'medium' | 'large';
type Variant = 'green' | 'yellow' | 'gray' | 'red';

interface Props {
  size?: Size;
  variant: Variant;
}

export const Component = ({ size = 'medium', variant }: Props) => {
  return (
    <div className={clsx(styles.wrapper, styles[size])}>
      <div className={styles.baseLayer} />
      <div className={clsx(styles.surface, styles[variant])} />
    </div>
  );
};
```






