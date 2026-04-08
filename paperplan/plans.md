# Radio Monorepo - Plans Overview

## Active Plans

| Plan | Status | Description |
|------|--------|-------------|
| [001-CODE_STYLE_AUDIT_PLAN.md](./001-CODE_STYLE_AUDIT_PLAN.md) | ✅ Complete | Code style audit and standardization across all apps |
| [002-MOJO_DESIGN_PLAN.md](./002-MOJO_DESIGN_PLAN.md) | ✅ Complete | Design system standardization (tokens, patterns, docs) |
| [003-MOJO_SPLIT_PLAN.md](./003-MOJO_SPLIT_PLAN.md) | 🚧 In Progress | Prepare Mojo UI for independent NPM package |

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
**Phase 1-2:** Foundation ✅
- ✅ Component inventory
- ✅ Design system ready

**Phase 3-7:** NPM Preparation ⏳
- ⏳ Complete remaining components
- ⏳ Create showcase website
- ⏳ NPM package setup
- ⏳ Repository separation

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