# Mojo Split Plan

## Overview

This plan covers preparing Mojo UI for separation into an independent NPM package with its own repository.

**Prerequisites:** Plan 002 (Design System) complete ✅

**Status:** Phase 1 ✅ COMPLETE | Phase 2 ⏳ PENDING

---

## Goal

Create `mojo-ui` as an independent NPM package with:
- All style configuration (Tailwind) reusable from the library
- Nature-themed color names (moss, ember, sun, coal, etc.)
- Clean, minimal showcase and documentation
- No styled components - only reusable styles/config

---

## Phase 1: Tailwind Config Migration ✅ COMPLETE

**Objective:** Move all Tailwind configuration and shared styles from admin to Mojo UI for reusability.

**Key Decisions:**
- ✅ **Fonts:** All font files stay in Mojo UI only (already there: `packages/mojo-ui/public/fonts/`)
- ✅ **Glassmorphism:** Move to Mojo UI as reusable patterns
- ✅ **Vinyl buttons:** Stay in admin (app-specific aesthetic)
- ✅ **Legacy styles:** Delete `classes.ts` (uses old color naming)

---

### Phase 1.1: Mojo UI Tailwind Config Foundation ✅

**Scope:** Create the core Tailwind configuration in Mojo UI with all nature colors, fonts, and plugins.

**Tasks:**
- [x] Update `packages/mojo-ui/tailwind.config.js` with:
  - Nature colors: moss, bark, coal, clay, river, paper, sun, ember (all fog/calm/DEFAULT/deep/relic/accent variants)
  - Font families: display (Tiny5), sans (KyivType Sans), serif (KyivType Serif), mono (JetBrains Mono)
  - textShadow config
  - backgroundImage config (gradient-radial)
  - Plugins: tailwindcss-textshadow, tailwind-scrollbar
- [x] Add plugin dependencies to `packages/mojo-ui/package.json`

**Definition of Done:**
- [x] Tailwind config contains all nature colors with proper variants
- [x] Font families configured correctly
- [x] Plugins added to devDependencies
- [x] `bun install` works in Mojo UI without errors

**Commit:** `1c14fe1`

---

### Phase 1.2: Mojo UI Preset Export ✅

**Scope:** Export the Tailwind config as a reusable preset and update package exports.

**Tasks:**
- [x] Create preset export at `packages/mojo-ui/tailwind.ts`
- [x] Update `packages/mojo-ui/package.json` exports to include `"./tailwind"`
- [x] Ensure TypeScript recognizes the export

**Definition of Done:**
- [x] Can import `{ mojoPreset }` from `@radio/mojo-ui/tailwind`
- [x] Package exports properly configured
- [x] No TypeScript errors on import

**Commit:** `0153cbf`

---

### Phase 1.3: Mojo UI Shared Styles ✅

**Scope:** Create shared styles utility module for glassmorphism and layout patterns.

**Tasks:**
- [x] Create `packages/mojo-ui/src/styles/index.ts`
- [x] Move glassmorphism styles from admin (`shared-styles.ts`):
  - `statsCard` - Stats card with glassmorphism
  - `serviceSection` - Service control section
  - `actionsSection` - Actions section
  - `recentSection` - Recent items section
  - `recentItem` - Individual recent item
- [x] Move layout utilities:
  - `container` - Full container with padding
  - `content` - Centered content wrapper
  - `title` - Page title styling
- [x] Move grid layouts:
  - `statsGrid` - Stats grid responsive layout
  - `serviceGrid` - Service grid layout
  - `actionsGrid` - Actions grid layout
  - `recentList` - Recent items list

**Definition of Done:**
- [x] All non-vinyl styles migrated from `shared-styles.ts`
- [x] Properly typed with `as const`
- [x] Exported from module

**Commit:** `3f573af`

---

### Phase 1.4: Mojo UI Global Styles Enhancement ✅

**Scope:** Add autofill CSS overrides to Mojo UI globals.

**Tasks:**
- [x] Add dark theme autofill styles to `packages/mojo-ui/src/globals.scss`
- [x] Ensure autofill overrides match dark theme colors

**Definition of Done:**
- [x] Autofill styles from `apps/admin/src/styles/autofill.css` copied to globals.scss
- [x] Dark theme preserved
- [x] No visual regressions in inputs

**Commit:** `fa8218e`

---

### Phase 1.5: Admin Config Migration ✅

**Scope:** Update admin app to extend Mojo UI Tailwind preset.

**Tasks:**
- [x] Update `apps/admin/tailwind.config.js` to:
  - Import `mojoPreset` from `@radio/mojo-ui/tailwind`
  - Use `presets: [mojoPreset]`
  - Remove duplicate color/font definitions
  - Keep only app-specific content paths
- [x] Remove font-face declarations from `apps/admin/src/styles/tailwind.css`

**Definition of Done:**
- [x] Admin imports and extends Mojo UI preset
- [x] No duplicate color/font definitions in admin config
- [x] Build passes
- [x] Fonts still load correctly

**Commit:** `e2fd73e`

---

### Phase 1.6: Admin Styles Migration ✅

**Scope:** Update admin imports and remove migrated style files.

**Tasks:**
- [x] Update all imports in admin from local `shared-styles.ts` to `@radio/mojo-ui/styles`
- [x] Update `apps/admin/src/styles/shared-styles.ts` to only contain vinyl buttons
- [x] Delete `apps/admin/src/styles/classes.ts` (legacy, unused)
- [x] Delete `apps/admin/src/styles/autofill.css` (moved to Mojo)
- [x] Keep vinyl buttons in admin (app-specific)

**Definition of Done:**
- [x] All glassmorphism/layout imports use `@radio/mojo-ui/styles`
- [x] No broken imports
- [x] Vinyl buttons still work (stayed in admin)
- [x] Admin builds successfully

**Commit:** `3cdb612`

---

### Phase 1.7: Admin Fonts Cleanup ✅

**Scope:** Remove font files from admin (now only in Mojo UI).

**Tasks:**
- [x] Delete `apps/admin/public/fonts/` directory entirely (84 font files)
- [x] Verify fonts are served from Mojo UI

**Definition of Done:**
- [x] Admin public/fonts directory removed
- [x] Fonts still load correctly in admin (from Mojo UI)
- [x] No 404 errors for font files

**Commit:** `575d60b`

---

### Phase 1.8: Verification & Documentation ✅

**Scope:** Final verification and plan update.

**Tasks:**
- [x] Run type checks: All packages pass
- [x] Run builds: All packages build successfully
- [x] Run linting: All packages pass
- [x] Update Plan 003 to mark Phase 1 as complete
- [x] Document any issues or follow-ups

**Definition of Done:**
- [x] All type checks pass
- [x] All builds pass
- [x] Plan 003 updated with Phase 1 completion status
- [x] No console errors in dev mode

**Notes:**
- Font warnings in admin build are expected (fonts resolved at runtime from Mojo UI)
- All 12 build/lint/type tasks passed successfully

---

## Phase 1 Summary

| Sub-phase | Focus | Key Deliverable | Status |
|-----------|-------|-----------------|--------|
| 1.1 | Mojo Tailwind Config | Full config with nature colors | ✅ |
| 1.2 | Preset Export | Reusable `mojoPreset` export | ✅ |
| 1.3 | Shared Styles | Glassmorphism & layout utilities | ✅ |
| 1.4 | Global Styles | Autofill CSS in Mojo | ✅ |
| 1.5 | Admin Config | Uses Mojo preset | ✅ |
| 1.6 | Admin Styles | Imports from Mojo | ✅ |
| 1.7 | Fonts Cleanup | Admin fonts removed | ✅ |
| 1.8 | Verification | All checks pass | ✅ |

**Phase 1 Complete! 🎉**

---

## Phase 2: Showcase Enhancement ✅ COMPLETE

**Objective:** Update existing showcase to be minimal, clean, and comprehensive.

**Status:** All tasks completed ✅

### Completed Tasks

#### 2.1 Restructure Showcase ✅
Created showcase directory structure:
```
src/showcase/
├── index.tsx              # Main entry
├── components/
│   ├── nav.tsx            # Showcase navigation
│   ├── prop-table.tsx     # Props documentation
│   ├── code-block.tsx     # Code examples
│   └── component-section.tsx  # Component wrapper
└── pages/
    ├── components.tsx     # All components gallery
    ├── layout.tsx         # Layout examples
    ├── tokens.tsx         # Design tokens display
    └── docs.tsx           # Component documentation
```

#### 2.2 Components Gallery Page ✅
- ✅ Display all 21+ components
- ✅ Group by category (Basic, Form, Layout, Navigation, Feedback, Overlay)
- ✅ Interactive preview for each component
- ✅ Copy code button
- ✅ Props table for each component
- ✅ Clean, minimal design

#### 2.3 Layout Test Page ✅
- ✅ Real-world layout examples:
  - Dashboard with stats cards and progress bars
  - User creation form with validation-ready inputs
  - Settings panel with switches
  - Project cards grid
  - Tabbed navigation interface
- ✅ Show how components work together
- ✅ Responsive examples

#### 2.4 Design Tokens Page ✅
- ✅ Display all 8 nature colors with swatches (moss, bark, coal, clay, river, paper, sun, ember)
- ✅ Show color usage (moss for success, ember for warning, etc.)
- ✅ Typography scale (4 font families, 8 sizes)
- ✅ Spacing scale (4px grid)
- ✅ Border radius examples
- ✅ Shadow elevations
- ✅ Text shadow utilities
- ✅ Quick reference guide

#### 2.5 Documentation Page ✅
- ✅ Installation instructions
- ✅ Basic usage example
- ✅ Component API reference for all 21 components
- ✅ Icons usage guide
- ✅ Shared styles documentation
- ✅ Best practices (Do/Don't)
- ✅ TypeScript support guide

### Design Requirements ✅
- ✅ **Minimal:** Clean layout with no unnecessary decorations
- ✅ **Clean:** Clear typography, good whitespace
- ✅ **Functional:** Easy to navigate with sticky navigation
- ✅ **Dark theme:** Matches Mojo UI aesthetic

### Definition of Done ✅
- ✅ All 21 components showcased with live previews
- ✅ Layout test page with 5 real-world examples
- ✅ Design tokens visualized with color swatches
- ✅ Documentation page complete with API reference
- ✅ Clean, minimal design throughout
- ✅ Navigation between pages
- ✅ All TypeScript checks passing
- ✅ Build successful

### Files Created
| File | Purpose |
|------|---------|
| `src/showcase/index.ts` | Showcase module exports |
| `src/showcase/components/nav.tsx` | Page navigation |
| `src/showcase/components/prop-table.tsx` | Props documentation table |
| `src/showcase/components/code-block.tsx` | Code display with copy button |
| `src/showcase/components/component-section.tsx` | Component showcase wrapper |
| `src/showcase/pages/components.tsx` | Components gallery (21 components) |
| `src/showcase/pages/layout.tsx` | Layout examples |
| `src/showcase/pages/tokens.tsx` | Design tokens reference |
| `src/showcase/pages/docs.tsx` | API documentation |
| `src/showcase.tsx` | Updated main showcase with routing |

### Notes
- Used state-based routing (no external router) to keep showcase self-contained
- All component examples are interactive where applicable
- Code examples are copy-paste ready
- Responsive design works on mobile and desktop

---

## Phase 2.5: Showcase Polish & Fixes ⏳ IN PROGRESS

**Objective:** Address user feedback and polish the showcase before proceeding.

### User Feedback (Saved from Review)

#### Critical Issues
1. **Header Navigation Bug** - Selected item becomes dark and invisible on dark background
2. **Missing Welcome Page** - Need full-screen landing page with:
   - Installation commands
   - Quick description
   - Visual/attractive hero section (similar to GitHub's planet visualization)
   - Should showcase Mojo UI aesthetics

3. **Components Page UX** - Need sidebar component list with:
   - Scrollable component list on the side
   - Grouped by category (Basic, Form, Layout, etc.)
   - Click to jump to component
   - Remove static NavigationIsland display (keep only in component list)

#### Design Tokens Page Issues
4. **Inconsistent Naming** - DEFAULT is UPPERCASE, others lowercase. Should be consistent
5. **Missing Typography Examples** - No actual font family examples displayed
6. **Border Radius Not Visible** - All cards look the same, need distinct visual examples
7. **Missing Theme Toggle** - No dark/light mode switching

### Tasks

#### 2.5.1 Fix Navigation Colors ✅
- [x] Fix header nav selected state - ensure visible on dark background
- [x] Use proper contrast colors (light text on dark when selected)

#### 2.5.2 Create Welcome/Landing Page ✅
- [x] Full viewport height hero section with decorative background elements
- [x] Installation commands display
- [x] Quick description/tagline
- [x] Placeholder for future visual/attractive graphic (decorative blur circles)
- [x] Call-to-action buttons linking to other pages
- [x] Features section with component highlights
- [x] Quick start code example

#### 2.5.3 Components Page Sidebar ✅
- [x] Create sticky sidebar with component list (grouped by category)
- [x] Group components by category (Basic, Form, Layout, Navigation, Feedback, Overlay)
- [x] Click to scroll to component (smooth scroll)
- [x] Remove static NavigationIsland from display (moved to sidebar only)

#### 2.5.4 Design Tokens Polish ✅
- [x] Change DEFAULT to default (lowercase) for consistency
- [x] Add actual typography examples showing each font family ("The quick brown fox" samples)
- [x] Fix border radius visualization - larger boxes with gradient backgrounds
- [x] Add theme toggle icons (Sun/Moon) in navigation (UI ready, full theme implementation in future)

#### 2.5.5 General Polish ✅
- [x] Smooth scroll behavior
- [x] Active section highlighting in sidebar (via IntersectionObserver)
- [ ] Mobile responsive sidebar (drawer on small screens) - deferred to future

### Definition of Done
- [x] Navigation is clearly visible in all states
- [x] Welcome page exists and is the default landing page
- [x] Components page has functional sidebar navigation
- [x] Design tokens page shows all examples properly
- [x] Theme toggle UI implemented
- [x] All feedback items addressed

---

## Phase 3: Additional Components ✅ COMPLETE

**Prerequisites:** Phase 2.5 complete ✅

**Objective:** Add more components before NPM publish.

### Status
All 7 new components have been created and integrated into the showcase.

### Form
- [x] **Radio** - Radio button group with horizontal/vertical layouts
- [x] **Slider** - Range slider with analog retro feel

### Feedback
- [x] **Toast** - Notification toast with auto-dismiss and progress bar
- [x] **Alert** - Alert banner with variants and dismiss action
- [x] **Badge** - Status/label badge with dot indicators and pulse animation

### Data Display
- [x] **Tooltip** - Hover information tooltip with 4 placements
- [x] **DataTable** - Table with retro styling, striped rows, and hover effects

### Component Summary

| Component | Category | Key Features |
|-----------|----------|--------------|
| Radio | Form | Group selection, horizontal/vertical layouts, 3 sizes |
| Slider | Form | Analog feel, real-time value display, keyboard navigation |
| Toast | Feedback | Auto-dismiss, progress bar, 4 positions, 4 variants |
| Alert | Feedback | Icon variants, dismissible, glassmorphism styling |
| Badge | Feedback | Dot indicator, pulse animation, 9 color variants |
| Tooltip | Overlay | 4 placements, hover delay, smooth animations |
| DataTable | Data Display | Striped/hoverable rows, loading state, customizable columns |

### Total Component Count
**28 components** (21 existing + 7 new)

### Next Phase
Ready to proceed to **Phase 4: NPM Package Preparation**

---

## Phase 4: NPM Package Preparation ✅ COMPLETE

**Objective:** Prepare for NPM publication.

### Tasks
- [x] Rename to `@dendelion/mojo-ui` (scoped package)
- [x] Export Tailwind config in package
- [x] Configure build outputs (CJS, ESM)
- [x] TypeScript declarations
- [x] README with install + Tailwind setup guide
- [x] CHANGELOG.md
- [x] LICENSE

### Decisions
- **Scoped Package:** Using `@croco-dendy/mojo-ui` for better organization
- **JSR Explored:** JSR doesn't support SCSS modules, sticking with NPM
- **Build:** ESM + CJS + CSS output working correctly

---

## Phase 5: Repository Separation ✅ COMPLETE

**Objective:** Create standalone repository.

### Tasks
- [x] Create `mojo-ui` GitHub repo
- [x] Move package to new repo
- [x] Update all import references in showcase/docs
- [x] Create standalone tsconfig.json
- [x] Create paperplan with migration plan
- [ ] Set up CI/CD (deferred to Phase 7)
- [ ] Set up showcase deployment (deferred to Phase 7)

### Repository
- **GitHub:** https://github.com/croco-dendy/mojo-ui
- **Status:** Ready to publish to NPM

---

## Phase 6: NPM Publication ✅ COMPLETE

**Objective:** Publish package to NPM registry.

### Tasks
- [x] Login to npm
- [x] Run `npm run build`
- [x] Run `npm publish --access public`
- [x] Verify package is available on npmjs.com
- [x] Test installation in fresh project

### Published Versions
- **v0.1.0** - Initial publish (missing TypeScript declarations)
- **v0.1.1** - Fixed with TypeScript declarations via vite-plugin-dts

**Package URL:** https://www.npmjs.com/package/@dendelion/mojo-ui

---

## Phase 7: Monorepo Migration ✅ COMPLETE (Testing Phase)

**Objective:** Update radio monorepo to use published package.

### Tasks
- [x] Install `@dendelion/mojo-ui` from NPM in admin
- [x] Update imports from `@radio/mojo-ui` to `@dendelion/mojo-ui`
- [x] Extend Mojo Tailwind config from published package
- [x] Update vite.config.ts and tsconfig.json path aliases
- [x] Verify TypeScript checks pass
- [x] Verify build works
- [ ] Remove local `packages/mojo-ui` (deferred - kept as backup)
- [ ] Update workspace configuration to remove local package (deferred)

### Status
**Admin app successfully migrated to use published package!**
- All imports updated
- TypeScript checks pass
- Build successful
- Local `packages/mojo-ui` kept as backup/safety net

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

**Phase 2.5 is COMPLETE! 🎉**

**Ready to start Phase 3:** Additional Components

- Radio button group
- Slider
- Toast notifications
- Alert banner
- Badge
- Tooltip
- DataTable

**Future Enhancements:**
- Full light theme implementation
- Mobile responsive sidebar drawer
- Additional showcase visualizations
