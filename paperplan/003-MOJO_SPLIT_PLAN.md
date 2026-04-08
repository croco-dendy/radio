# Mojo Split Plan

## Overview

This plan covers preparing Mojo UI for separation into an independent NPM package with its own repository.

**Prerequisites:** Plan 002 (Design System) complete ✅

**Status:** Phase 1 - In Progress (Decomposed into sub-phases)

---

## Goal

Create `mojo-ui` as an independent NPM package with:
- All style configuration (Tailwind) reusable from the library
- Nature-themed color names (moss, ember, sun, coal, etc.)
- Clean, minimal showcase and documentation
- No styled components - only reusable styles/config

---

## Phase 1: Tailwind Config Migration 🚧 IN PROGRESS

**Objective:** Move all Tailwind configuration and shared styles from admin to Mojo UI for reusability.

**Key Decisions:**
- ✅ **Fonts:** All font files stay in Mojo UI only (already there: `packages/mojo-ui/public/fonts/`)
- ✅ **Glassmorphism:** Move to Mojo UI as reusable patterns
- ✅ **Vinyl buttons:** Stay in admin (app-specific aesthetic)
- ✅ **Legacy styles:** Delete `classes.ts` (uses old color naming)

---

### Phase 1.1: Mojo UI Tailwind Config Foundation

**Scope:** Create the core Tailwind configuration in Mojo UI with all nature colors, fonts, and plugins.

**Tasks:**
- [ ] Update `packages/mojo-ui/tailwind.config.js` with:
  - Nature colors: moss, bark, coal, clay, river, paper, sun, ember (all fog/calm/DEFAULT/deep/relic/accent variants)
  - Font families: display (Tiny5), sans (KyivType Sans), serif (KyivType Serif), mono (JetBrains Mono)
  - textShadow config
  - backgroundImage config (gradient-radial)
  - Plugins: tailwindcss-textshadow, tailwind-scrollbar
- [ ] Add plugin dependencies to `packages/mojo-ui/package.json`

**Definition of Done:**
- [ ] Tailwind config contains all nature colors with proper variants
- [ ] Font families configured correctly
- [ ] Plugins added to devDependencies
- [ ] `bun install` works in Mojo UI without errors

---

### Phase 1.2: Mojo UI Preset Export

**Scope:** Export the Tailwind config as a reusable preset and update package exports.

**Tasks:**
- [ ] Create preset export at `packages/mojo-ui/tailwind.ts` (or export from existing config)
- [ ] Update `packages/mojo-ui/package.json` exports to include:
  - `"./tailwind": { "import": "./dist/tailwind.config.mjs" }`
- [ ] Ensure TypeScript recognizes the export

**Definition of Done:**
- [ ] Can import `{ mojoPreset }` from `@radio/mojo-ui/tailwind`
- [ ] Package exports properly configured
- [ ] No TypeScript errors on import

---

### Phase 1.3: Mojo UI Shared Styles

**Scope:** Create shared styles utility module for glassmorphism and layout patterns.

**Tasks:**
- [ ] Create `packages/mojo-ui/src/styles/index.ts`
- [ ] Move glassmorphism styles from admin (`shared-styles.ts`):
  - `statsCard` - Stats card with glassmorphism
  - `serviceSection` - Service control section
  - `actionsSection` - Actions section
  - `recentSection` - Recent items section
  - `recentItem` - Individual recent item
- [ ] Move layout utilities:
  - `container` - Full container with padding
  - `content` - Centered content wrapper
  - `title` - Page title styling
- [ ] Move grid layouts:
  - `statsGrid` - Stats grid responsive layout
  - `serviceGrid` - Service grid layout
  - `actionsGrid` - Actions grid layout
  - `recentList` - Recent items list

**Definition of Done:**
- [ ] All non-vinyl styles migrated from `shared-styles.ts`
- [ ] Properly typed with `as const`
- [ ] Exported from module

---

### Phase 1.4: Mojo UI Global Styles Enhancement

**Scope:** Add autofill CSS overrides to Mojo UI globals.

**Tasks:**
- [ ] Add dark theme autofill styles to `packages/mojo-ui/src/globals.scss`
- [ ] Ensure autofill overrides match dark theme colors

**Definition of Done:**
- [ ] Autofill styles from `apps/admin/src/styles/autofill.css` copied to globals.scss
- [ ] Dark theme preserved
- [ ] No visual regressions in inputs

---

### Phase 1.5: Admin Config Migration

**Scope:** Update admin app to extend Mojo UI Tailwind preset.

**Tasks:**
- [ ] Update `apps/admin/tailwind.config.js` to:
  - Import `mojoPreset` from `@radio/mojo-ui/tailwind`
  - Use `presets: [mojoPreset]`
  - Remove duplicate color/font definitions
  - Keep only app-specific content paths
- [ ] Remove font-face declarations from `apps/admin/src/styles/tailwind.css`

**Definition of Done:**
- [ ] Admin imports and extends Mojo UI preset
- [ ] No duplicate color/font definitions in admin config
- [ ] Build passes
- [ ] Fonts still load correctly

---

### Phase 1.6: Admin Styles Migration

**Scope:** Update admin imports and remove migrated style files.

**Tasks:**
- [ ] Update all imports in admin from local `shared-styles.ts` to `@radio/mojo-ui/styles`
- [ ] Delete `apps/admin/src/styles/shared-styles.ts` (glassmorphism migrated)
- [ ] Delete `apps/admin/src/styles/classes.ts` (legacy, unused)
- [ ] Delete `apps/admin/src/styles/autofill.css` (moved to Mojo)
- [ ] Keep vinyl buttons in admin (app-specific)

**Definition of Done:**
- [ ] All glassmorphism/layout imports use `@radio/mojo-ui/styles`
- [ ] No broken imports
- [ ] Vinyl buttons still work (stayed in admin)
- [ ] Admin builds successfully

---

### Phase 1.7: Admin Fonts Cleanup

**Scope:** Remove font files from admin (now only in Mojo UI).

**Tasks:**
- [ ] Delete `apps/admin/public/fonts/` directory entirely
- [ ] Verify fonts are served from Mojo UI

**Definition of Done:**
- [ ] Admin public/fonts directory removed
- [ ] Fonts still load correctly in admin (from Mojo UI)
- [ ] No 404 errors for font files

---

### Phase 1.8: Verification & Documentation

**Scope:** Final verification and plan update.

**Tasks:**
- [ ] Run type checks: `bun run check-types` in both packages
- [ ] Run builds: `bun run build` in both packages
- [ ] Update Plan 003 to mark Phase 1 as complete
- [ ] Document any issues or follow-ups

**Definition of Done:**
- [ ] All type checks pass
- [ ] All builds pass
- [ ] Plan 003 updated with Phase 1 completion status
- [ ] No console errors in dev mode

---

## Phase 1 Summary

| Sub-phase | Focus | Key Deliverable |
|-----------|-------|-----------------|
| 1.1 | Mojo Tailwind Config | Full config with nature colors |
| 1.2 | Preset Export | Reusable `mojoPreset` export |
| 1.3 | Shared Styles | Glassmorphism & layout utilities |
| 1.4 | Global Styles | Autofill CSS in Mojo |
| 1.5 | Admin Config | Uses Mojo preset |
| 1.6 | Admin Styles | Imports from Mojo |
| 1.7 | Fonts Cleanup | Admin fonts removed |
| 1.8 | Verification | All checks pass |

---

## Phase 2: Showcase Enhancement ⏳ PENDING

**Objective:** Update existing showcase to be minimal, clean, and comprehensive.

### Tasks

#### 2.1 Restructure Showcase
- [ ] Create showcase directory structure:
  ```
  src/showcase/
  ├── index.tsx           # Main entry
  ├── pages/
  │   ├── components.tsx  # All components gallery
  │   ├── layout.tsx      # Layout examples
  │   ├── tokens.tsx      # Design tokens display
  │   └── docs.tsx        # Component documentation
  └── components/
      ├── nav.tsx         # Showcase navigation
      ├── prop-table.tsx  # Props documentation
      └── code-block.tsx  # Code examples
  ```

#### 2.2 Components Gallery Page
- [ ] Display all 21+ components
- [ ] Group by category (Form, Layout, Navigation, Feedback)
- [ ] Interactive props panel for each
- [ ] Copy code button
- [ ] Clean, minimal design

#### 2.3 Layout Test Page
- [ ] Real-world layout examples:
  - Dashboard with stats
  - Form with validation
  - Navigation with content
  - Card grid
- [ ] Show how components work together
- [ ] Responsive examples

#### 2.4 Design Tokens Page
- [ ] Display all nature colors with swatches
- [ ] Show color usage (moss for success, ember for warning, etc.)
- [ ] Typography scale
- [ ] Spacing scale
- [ ] Border radius examples
- [ ] Shadow elevations

#### 2.5 Documentation Page
- [ ] List all components
- [ ] Brief description for each
- [ ] Props table (name, type, default, description)
- [ ] Link to usage examples
- [ ] Minimal, clean presentation

### Design Requirements
- **Minimal:** No unnecessary decorations
- **Clean:** Clear typography, good whitespace
- **Functional:** Easy to navigate, find components
- **Dark theme:** Match Mojo UI aesthetic

### Definition of Done
- All 21 components showcased
- Layout test page with real examples
- Design tokens visualized
- Documentation page complete
- Clean, minimal design throughout

---

## Phase 3: Additional Components ⏳ PENDING

**Objective:** Add more components before NPM publish.

### Form
- [ ] Radio - Radio button group
- [ ] Slider - Range slider with analog feel

### Feedback
- [ ] Toast - Notification toast
- [ ] Alert - Alert banner
- [ ] Badge - Status/label badge

### Data Display
- [ ] Tooltip - Hover information
- [ ] DataTable - Table with retro styling

---

## Phase 4: NPM Package Preparation ⏳ PENDING

**Objective:** Prepare for NPM publication.

### Tasks
- [ ] Rename to `mojo-ui`
- [ ] Export Tailwind config in package
- [ ] Configure build outputs (CJS, ESM)
- [ ] TypeScript declarations
- [ ] README with install + Tailwind setup guide
- [ ] CHANGELOG.md
- [ ] LICENSE

---

## Phase 5: Repository Separation ⏳ PENDING

**Objective:** Create standalone repository.

### Tasks
- [ ] Create `mojo-ui` GitHub repo
- [ ] Move package to new repo
- [ ] Set up CI/CD
- [ ] Set up showcase deployment

---

## Phase 6: Monorepo Migration ⏳ PENDING

**Objective:** Update radio monorepo to use published package.

### Tasks
- [ ] Install `mojo-ui` from NPM in admin
- [ ] Extend Mojo Tailwind config
- [ ] Remove local `packages/mojo-ui`
- [ ] Update imports
- [ ] Verify everything works

---

## Key Decisions

### Colors: Nature Names ✅
Keep: moss, bark, coal, clay, river, paper, sun, ember

### Approach: Config Export ✅
Export Tailwind config/preset, not styled components

### Showcase: Minimal & Clean ✅
Simple, functional, dark theme

### Fonts: Mojo UI Only ✅
All font files and font-face declarations live in Mojo UI only

### Glassmorphism: Mojo UI ✅
Reusable glassmorphism patterns are part of the design system

### Vinyl Buttons: Admin Only ✅
Record player aesthetic buttons stay app-specific

---

## Next Steps

**Ready to start Phase 1.1:** Create Mojo UI Tailwind Config Foundation

**Execute one sub-phase at a time as requested.**
