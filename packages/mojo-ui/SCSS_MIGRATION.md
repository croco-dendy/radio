# SCSS Modules Migration Guide

## Overview

We've migrated from mixed CSS + Tailwind to SCSS Modules for better maintainability and type safety.

## Architecture

### File Structure

```
src/
├── styles/                    # Shared SCSS utilities
│   ├── _variables.scss       # Design tokens (sizes, colors, etc.)
│   ├── _mixins.scss          # Reusable style patterns
│   ├── _functions.scss       # SCSS functions for computed values
│   └── index.scss            # Main export
└── components/
    └── [component]/
        ├── [component].tsx
        └── [component].module.scss
```

### Design Principles

**✅ Use SCSS for:**
- Component-specific styles
- Design system tokens (colors, shadows, gradients)
- Complex visual effects
- Reusable mixins and functions

**✅ Use Tailwind for:**
- Layout (flex, grid)
- Spacing (margin, padding)
- Typography utilities (text-sm, font-bold)
- Quick utilities (rounded, w-full)

**❌ Don't mix:**
- Avoid duplicating concerns between SCSS and Tailwind
- Don't use Tailwind for design system colors/shadows
- Don't create SCSS utilities for simple spacing

## Shared SCSS Utilities

### Variables

All design tokens are centralized in `_variables.scss`:

- `$sizes` - Component size variants (small, medium, large)
- `$variants` - Color variants (green, yellow, gray, red)
- `$base-layer-gradient` - Steel base layer
- `$lamp-base-color` - Dark background
- Shadow patterns, transitions, etc.

### Mixins

Reusable style patterns in `_mixins.scss`:

```scss
@use '../../styles' as *;

.myComponent {
  @include base-layer;           // Steel base
  @include lamp-base(4.5px);     // Dark layer with inset
  @include lamp-surface(4.5px);  // Lamp surface with inset
  @include apply-variant(green); // Apply green gradient
  @include apply-glow(green);    // Apply green glow effect
  @include frosted-inner;        // Frosted inner shadow
}
```

### Functions

Get computed values:

```scss
.myComponent {
  inset: get-size-inset(medium);        // 4.5px
  height: get-size-height(medium);      // 48px
  padding: get-size-padding(medium);    // 0 20px
}
```

## Migration Steps

### Step 1: Create SCSS Module

Create `[component].module.scss` next to your component:

```scss
@use '../../styles' as *;

.container {
  // Your styles
}

.button {
  @include base-layer;
  
  &.small {
    height: get-size-height(small);
  }
  
  &.medium {
    height: get-size-height(medium);
  }
}
```

### Step 2: Update Component

```tsx
import styles from './component.module.scss';

export const Component = () => {
  return (
    <div className={styles.container}>
      <button className={clsx(styles.button, styles.medium)}>
        Click me
      </button>
    </div>
  );
};
```

### Step 3: Remove Old CSS

Delete the old `.css` file after migration is complete.

## Examples

### Before (Old CSS)

**button.css:**
```css
.button-small {
  height: 36px;
}

.button-medium {
  height: 48px;
}

.button-green-gradient {
  background: radial-gradient(...);
}
```

**button.tsx:**
```tsx
<button className={clsx('button-small', 'button-green-gradient')}>
```

### After (SCSS Modules)

**button.module.scss:**
```scss
@use '../../styles' as *;

.button {
  &.small { height: get-size-height(small); }
  &.medium { height: get-size-height(medium); }
  &.large { height: get-size-height(large); }
  
  &.green { @include apply-variant(green); }
  &.yellow { @include apply-variant(yellow); }
}
```

**button.tsx:**
```tsx
import styles from './button.module.scss';

<button className={clsx(styles.button, styles.small, styles.green)}>
```

## Benefits

1. **Type Safety** - IDE autocomplete for CSS classes
2. **Scoped Styles** - No global namespace pollution
3. **DRY Code** - Reusable mixins and functions
4. **Maintainability** - Single source of truth for design tokens
5. **Performance** - Tree-shaking and optimization
6. **Consistency** - Enforced design system usage

## Common Patterns

### Size Variants

```scss
.component {
  &.small { @include size-variant(small); }
  &.medium { @include size-variant(medium); }
  &.large { @include size-variant(large); }
}
```

### Color Variants

```scss
.surface {
  &.green { @include apply-variant(green); @include apply-glow(green); }
  &.yellow { @include apply-variant(yellow); @include apply-glow(yellow); }
  &.red { @include apply-variant(red); @include apply-glow(red); }
}
```

### Layered Components (Button, Switch, etc.)

```scss
.wrapper {
  position: relative;
  // Use Tailwind for layout
}

.baseLayer {
  @include base-layer;
}

.lampBase {
  @include lamp-base(4.5px);
}

.surface {
  @include lamp-surface(4.5px);
  @include apply-variant(green);
  @include apply-glow(green);
}
```

## Adding New Variants

### New Color Variant

Add to `_variables.scss`:

```scss
$variants: (
  // ... existing
  blue: (
    gradient: radial-gradient(circle at 50% 50%, #4050ff 7%, #6c8cce 74%),
    glow: rgba(64, 80, 255, 0.4),
    glow-strong: rgba(64, 80, 255, 0.6),
  ),
);
```

Use in components:

```scss
.surface {
  &.blue {
    @include apply-variant(blue);
    @include apply-glow(blue);
  }
}
```

### New Size

Add to `_variables.scss`:

```scss
$sizes: (
  // ... existing
  xlarge: (
    height: 64px,
    inset: 6.5px,
    padding: 0 28px,
    text: 'text-xl',
    border-radius: 28px,
  ),
);
```

## Troubleshooting

### TypeScript Errors

Make sure `src/types/scss-modules.d.ts` exists and is included in your tsconfig.

### Styles Not Applying

1. Check import path: `import styles from './component.module.scss'`
2. Ensure file ends with `.module.scss`
3. Verify `@use '../../styles' as *;` is correct

### Build Errors

Run `pnpm install` to ensure `sass` is installed.

## Next Steps

1. ✅ Input component migrated (reference implementation)
2. 🔄 Migrate remaining components one by one
3. 🗑️ Remove old CSS files after migration
4. 🎨 Consider adding new variants/sizes using the new system

---

**Questions?** Refer to the input component as the reference implementation.






