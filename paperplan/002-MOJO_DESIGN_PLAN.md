# Mojo Design Plan

## Overview

This plan covers the design system standardization for Mojo UI - creating consistent tokens, patterns, and documentation.

**Status:** Phase 1 & 2 Complete, Phase 3 In Progress

---

## Phase 1: Audit & Consolidation ✅ COMPLETE

**Objective:** Audit current design inconsistencies and consolidate components.

### Completed
- ✅ Audited all components for design inconsistencies
- ✅ Cataloged color, typography, spacing variations
- ✅ Migrated admin form components to Mojo UI
- ✅ Updated admin app imports
- ✅ Player UI components kept local (deferred)

### Key Decisions
- **Form Components:** Created Input, Select, Textarea, Checkbox in Mojo UI
- **Player UI:** Keep local for now (different styling needs)
- **Notifications:** Keep in admin app for now (Phase 3)

---

## Phase 2: Design Token System ✅ COMPLETE

**Objective:** Create comprehensive design tokens as single source of truth.

### Completed

#### Design Tokens File (`_tokens.scss`)
Created semantic token system:

**Colors:**
```scss
$color-bg-base: #1e1e1e;
$color-bg-surface: #2a2a2a;
$color-bg-elevated: #3a3a3a;
$color-text-primary: #ffffff;
$color-text-secondary: #a0a0a0;
$color-accent-success: #47f57d;
$color-accent-warning: #ffbd30;
$color-accent-error: #ff5050;
```

**Typography (Swappable):**
```scss
$font-family-primary: 'KyivType Serif', Georgia, serif !default;
$font-family-secondary: 'KyivType Sans', system-ui, sans-serif !default;
$font-family-display: 'Tiny5', sans-serif !default;
```

**Spacing (8px grid):**
```scss
$space-1: 0.25rem;  // 4px
$space-2: 0.5rem;   // 8px
$space-4: 1rem;     // 16px
$space-6: 1.5rem;   // 24px
```

**Border Radius:**
```scss
$radius-sm: 8px;
$radius-md: 12px;
$radius-lg: 16px;
$radius-xl: 24px;
$radius-full: 9999px;
```

#### Component Standards
Created `COMPONENT_STANDARDS.md` with:
- Directory structure conventions
- Naming standards (files, classes, props)
- Code patterns
- Token usage examples

---

## Phase 3: Component Migration ✅ COMPLETE

**Objective:** Migrate all components to use new design tokens.

### Completed Tasks

- [x] **Updated components to use tokens**
  - [x] Panel - migrated to use $color-bg-base, $radius-md, $space-* tokens
  - [x] Card - migrated to use $gradient-input, $font-family-display tokens
  - [x] Modal - migrated to use $z-modal, $radius-xl, $shadow-xl tokens
  - [x] Button - already using tokens (verified)
  - [x] Input - already using tokens (verified)
  - [x] Select - already using tokens (verified)
  - [x] Textarea - already using tokens (verified)
  - [x] Checkbox - already using tokens (verified)

- [x] **Standardized component exports**
  - [x] All components use index.ts export pattern
  - [x] Props interfaces exported where applicable
  - [x] Main index.ts organized by category
  - [x] TypeScript checks passing

### Migration Summary

**Components Updated:**
| Component | Changes |
|-----------|---------|
| Panel | Replaced hardcoded px values with $space-* tokens |
| Panel | Replaced #1e1e1e with $color-bg-base |
| Panel | Replaced color values with $color-text-* tokens |
| Card | Updated to use $gradient-input, $font-family-display |
| Card | Standardized spacing with $space-* tokens |
| Modal | Added @use '../../styles' import |
| Modal | Updated to use $z-modal, $radius-xl, $shadow-xl |

**Tokens Now Used:**
- $color-bg-base, $color-bg-surface, $color-bg-input
- $color-text-primary, $color-text-secondary
- $color-border-subtle, $color-border-default, $color-border-strong
- $space-1 through $space-8
- $radius-sm, $radius-md, $radius-lg, $radius-xl
- $font-size-*, $font-weight-*
- $shadow-sm, $shadow-md, $shadow-lg, $shadow-xl
- $z-modal

### Definition of Done ✅
- ✅ All major components use design tokens exclusively
- ✅ No hardcoded values in Panel, Card, Modal styles
- ✅ All components follow naming conventions
- ✅ TypeScript checks passing
- ✅ Main index.ts organized by category

---

## Phase 4: Additional Components ✅ COMPLETE

**Objective:** Migrate reusable UI components from admin app to Mojo UI.

### Completed Tasks

#### Components Created in Mojo UI
- [x] **NavigationIsland** - Floating navigation bar
  - Glass morphism design
  - Configurable nav items with custom Link component support
  - Logo and actions slots
  - Uses design tokens exclusively

- [x] **CircularProgress** - Progress indicator
  - SVG-based with gradient
  - Configurable size, stroke, color
  - Glow effect
  - Smooth animations

- [x] **Skeleton** - Loading placeholders
  - Text, rectangular, circular variants
  - Pulse animation
  - Multi-line text skeleton (SkeletonText)
  - Configurable dimensions

#### Admin App Updated
- [x] **BottomNavigation** - Now uses `NavigationIsland` from Mojo UI
  - Updated to pass TanStack Router's `Link` component
  - Removed local styling (moved to Mojo UI)

- [x] **RecordWidget** - Now imports `CircularProgress` from Mojo UI
  - Removed local `circular-progress.tsx` file

- [x] **TypeScript** - All checks passing
  - Admin app: ✅ No errors
  - Mojo UI: ✅ No errors

### Audit Document
See: `002-MOJO_UI_ADMIN_COMPONENTS_AUDIT.md` for detailed analysis

---

## Phase 5: Design Documentation ✅ COMPLETE

**Objective:** Create visual documentation of the design system.

### Completed Tasks

- [x] **Created comprehensive design system documentation**
  - [x] `DESIGN_SYSTEM.md` - Visual reference guide
  - [x] Color palette with usage guidelines
  - [x] Typography scale showcase
  - [x] Spacing system (8px grid)
  - [x] Border radius scale
  - [x] Shadow/elevation levels
  - [x] Z-index scale

- [x] **Created component usage guide**
  - [x] `COMPONENT_GUIDE.md` - Practical examples
  - [x] Form components (Input, Select, Textarea, Checkbox, Switch)
  - [x] Layout components (Card, Panel, PageLayout)
  - [x] Navigation components (NavigationIsland, Tabs, VinylTabs)
  - [x] Feedback components (Modal, Popup, CircularProgress, Skeleton, ProgressBar, StatusIndicator)
  - [x] Advanced patterns (Form layout, Dashboard, Loading states)
  - [x] Best practices and common pitfalls

### Documentation Files Created

| File | Purpose | Content |
|------|---------|---------|
| `DESIGN_SYSTEM.md` | Visual reference | Color palette, typography, spacing, shadows, z-index, best practices |
| `COMPONENT_GUIDE.md` | Usage examples | Component patterns, code examples, advanced usage |
| `COMPONENT_STANDARDS.md` | Development standards | File structure, naming conventions, code patterns |

### Documentation Highlights

**Design System Covers:**
- ✅ Semantic color tokens with visual hierarchy
- ✅ Typography scale with font families
- ✅ 8px spacing grid system
- ✅ Border radius scale
- ✅ Shadow elevation levels
- ✅ Z-index stacking order
- ✅ Best practices and Do's/Don'ts

**Component Guide Covers:**
- ✅ 21 components with practical examples
- ✅ Form handling patterns
- ✅ Layout composition
- ✅ Navigation integration
- ✅ Loading states
- ✅ Responsive patterns

---

## Token Reference

### Quick Reference Card

| Category | Token Example | Value |
|----------|---------------|-------|
| **Background** | `$color-bg-surface` | #2a2a2a |
| **Text** | `$color-text-primary` | #ffffff |
| **Accent** | `$color-accent-success` | #47f57d |
| **Font Primary** | `$font-family-primary` | 'KyivType Serif' |
| **Font Display** | `$font-family-display` | 'Tiny5' |
| **Spacing Small** | `$space-2` | 8px |
| **Spacing Medium** | `$space-4` | 16px |
| **Radius Medium** | `$radius-md` | 12px |
| **Radius Full** | `$radius-full` | 9999px |

### Usage

```scss
@use '../../styles' as *;

.myComponent {
  // ✅ Good - use tokens
  background: $color-bg-surface;
  color: $color-text-primary;
  padding: $space-4;
  border-radius: $radius-md;
  font-family: $font-family-display;
  
  // ❌ Bad - hardcoded values
  background: #2a2a2a;
  color: #ffffff;
  padding: 16px;
}
```

---

## Files

| File | Purpose |
|------|---------|
| `src/styles/_tokens.scss` | Design tokens (single source of truth) |
| `COMPONENT_STANDARDS.md` | Component development standards |
| `002-MOJO_DESIGN_PLAN.md` | This plan file |

---

## Notes

- All new components must use design tokens
- Existing components should be migrated gradually
- Fonts are easily swappable via `!default` flag
- Maintain retro-future aesthetic consistently
