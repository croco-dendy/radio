# Radio Monorepo - Plans Overview

## Active Plans

| Plan | Status | Description |
|------|--------|-------------|
| [001-CODE_STYLE_AUDIT_PLAN.md](./001-CODE_STYLE_AUDIT_PLAN.md) | ✅ Complete | Code style audit and standardization across all apps |
| [002-MOJO_DESIGN_PLAN.md](./002-MOJO_DESIGN_PLAN.md) | ✅ Complete | Design system standardization (tokens, patterns, docs) |
| [003-MOJO_SPLIT_PLAN.md](./003-MOJO_SPLIT_PLAN.md) | 🚧 In Progress (Phases 1-5 Complete) | Prepare Mojo UI for independent NPM package |

## Completed

### Plan 001: Code Style Audit
**Completed:** Player app now aligned with admin app conventions
- ✅ Phase 1: Documentation (CODE_STYLE_GUIDE.md)
- ✅ Phase 2: File naming (kebab-case for hooks/stores)
- ✅ Phase 3: Component patterns (removed React.FC)
- ✅ Phase 4: Architecture (TanStack Query, factory patterns)
- ✅ Phase 5: TypeScript (stricter checks)

### Plan 002: Mojo Design ✅ COMPLETE
**Phase 1:** Audit & Consolidation ✅
- ✅ Audited components for design inconsistencies
- ✅ Migrated admin form components to Mojo UI
- ✅ Created Input, Select, Textarea, Checkbox components

**Phase 2:** Design Token System ✅
- ✅ Created `_tokens.scss` with semantic naming
- ✅ Documented component standards
- ✅ Swappable fonts with `!default` flag

**Phase 3:** Component Migration ✅
- ✅ Updated Panel to use design tokens
- ✅ Updated Card to use design tokens
- ✅ Updated Modal to use design tokens
- ✅ Standardized component exports in index.ts
- ✅ Organized exports by category

**Phase 4:** Additional Components ✅
- ✅ Created NavigationIsland, CircularProgress, Skeleton components
- ✅ Migrated admin app to use new components
- ✅ Removed duplicate local implementations
- ✅ All TypeScript checks passing

**Phase 5:** Documentation ✅
- ✅ Created `DESIGN_SYSTEM.md` with visual reference
- ✅ Created `COMPONENT_GUIDE.md` with usage examples

**Status:** ✅ Design system complete with 21 components, full documentation, and design tokens.

### Plan 003: Mojo Split (In Progress)
**Phase 1:** Tailwind Config Migration ✅
- ✅ All 8 sub-phases complete

**Phase 2:** Showcase Enhancement ✅
- ✅ Components gallery with 21 components
- ✅ Layout examples page
- ✅ Design tokens visual reference
- ✅ API documentation page
- ✅ Navigation and routing

**Phase 2.5:** Showcase Polish & Fixes ✅ COMPLETE
- ✅ Fix navigation selected state visibility
- ✅ Create welcome/landing page
- ✅ Components page sidebar navigation (with smooth scroll and active highlighting)
- ✅ Design tokens: lowercase "default", font examples, visible border radius
- ✅ Theme toggle UI (icons added, full implementation in future)

**Phase 3:** Additional Components ✅ COMPLETE
- ✅ Radio - Radio button group with horizontal/vertical layouts
- ✅ Slider - Range slider with analog retro feel
- ✅ Toast - Notification toast with auto-dismiss and progress bar
- ✅ Alert - Alert banner with variants and dismiss action
- ✅ Badge - Status/label badge with dot indicators and pulse animation
- ✅ Tooltip - Hover information tooltip with 4 placements
- ✅ DataTable - Table with retro styling, striped rows, and hover effects
- ✅ **28 total components** (21 existing + 7 new)

**Phase 4-5:** NPM Preparation & Repository Separation ✅
- ✅ Scoped package: `@croco-dendy/mojo-ui`
- ✅ Standalone repo: https://github.com/croco-dendy/mojo-ui
- ✅ Build outputs (ESM + CJS + CSS)
- ✅ TypeScript declarations
- ✅ Documentation complete

**Phase 6-7:** NPM Publication & Monorepo Migration ✅
- ✅ Published to NPM: @dendelion/mojo-ui@0.1.1
- ✅ Admin app migrated to use published package
- ⏳ Remove local packages/mojo-ui (deferred)

## Upcoming Plans

_(None scheduled - create new plan as needed)_

## Style Guide

The code style guide is available at [`../CODE_STYLE_GUIDE.md`](../CODE_STYLE_GUIDE.md)

### Quick Links

- **Admin App** (`apps/admin/`) - Reference codebase
- **Player App** (`apps/player/`) - ✅ Style aligned
- **Wave App** (`apps/wave/`) - Backend (Bun/Hono)
- **Mojo UI** (`packages/mojo-ui/`) - Shared components
- **Types** (`packages/types/`) - Shared TypeScript types