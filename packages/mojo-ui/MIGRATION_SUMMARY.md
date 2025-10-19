# Migration Summary

## ✅ Completed Migrations

1. **Input** - Fully migrated to SCSS modules
2. **Button** - Fully migrated to SCSS modules  
3. **Icon Button** - Fully migrated to SCSS modules

## 🔄 Components Still Using Old CSS

The following components still use the old CSS approach and should be migrated one-by-one:

- **Progress Bar** (`progress-bar.css`) - Complex with retro lights animation
- **Switch** (`switch.css`) - Complex with toggle states and animations
- **Tabs** (`tabs.css`) - Complex with moving lamp indicator

## How to Migrate Remaining Components

For each component:

1. Create `[component].module.scss` using shared SCSS utilities
2. Update TypeScript component to import and use the module
3. Test all variants and sizes  
4. Delete old `.css` file
5. Run `pnpm run check-types && pnpm run lint:fix`

## Reference Implementation

See **Input**, **Button**, or **Icon Button** components as examples of fully migrated components using:
- Shared SCSS mixins (`@include base-layer`, `@include apply-variant`, etc.)
- Shared SCSS functions (`get-size-height`, `get-size-inset`, etc.)
- Type-safe imports with `styles from './component.module.scss'`

## Shared Utilities Location

All shared SCSS is in `/src/styles/`:
- `_variables.scss` - Design tokens
- `_mixins.scss` - Reusable patterns  
- `_functions.scss` - Computed values

The remaining old shared CSS files will be deleted once all components are migrated.






