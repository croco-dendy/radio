# Plan 001: Code Style Audit & Standardization

## Goal

Audit all files in the monorepo, document code style patterns, fix inconsistencies, and create a style guide based on the admin app (latest codebase).

**Status: PENDING**

---

## Current State

### Monorepo Structure

```
radio/
├── apps/
│   ├── admin/     ← Latest codebase (reference)
│   ├── player/    ← Needs style alignment
│   └── wave/      ← Backend (Bun/Hono)
├── packages/
│   ├── mojo-ui/   ← Shared UI components
│   └── types/     ← Shared TypeScript types
└── paperplan/     ← Planning documents
```

### Apps Overview

| App | Tech Stack | Style Maturity |
|-----|-----------|---------------|
| admin | React + Vite + TanStack Query | Latest/Reference |
| player | React + Vite + Manual State | Outdated patterns |
| wave | Bun + Hono | Backend |

### Lint Status
- Biome linter configured
- All apps pass lint with no errors
- Style conventions exist but not enforced consistently

---

## Key Findings: Style Inconsistencies

### 1. File Naming Conventions

| Convention | Admin | Player | Recommendation |
|------------|-------|--------|----------------|
| Hook files | `use-name.ts` | `useName.ts` | `use-name.ts` |
| Store files | `name-store.ts` | `nameStore.ts` | `name-store.ts` |
| Component files | `kebab-case.tsx` | `kebab-case.tsx` | `kebab-case.tsx` ✅ |

**Files to rename in player:**
- `src/stores/userColorsStore.ts` → `user-colors-store.ts`
- `src/features/radio/hooks/useChat.ts` → `use-chat.ts`
- `src/features/radio/hooks/useStream.ts` → `use-stream.ts`
- `src/features/radio/hooks/useSound.ts` → `use-sound.ts`
- `src/features/radio/hooks/useUser.ts` → `use-user.ts`
- `src/features/radio/hooks/useUserList.ts` → `use-user-list.ts`
- `src/features/radio/hooks/useUserColorsSync.ts` → `use-user-colors-sync.ts`
- `src/features/radio/hooks/useDetailedSound.ts` → `use-detailed-sound.ts`

### 2. Component Type Annotation

**Admin (non-FC):**
```tsx
export const ComponentName = () => {
  // No React.FC
};
```

**Player (uses FC):**
```tsx
export const RadioLayout: React.FC = () => {
  // Uses React.FC
};
```

**Recommendation:** Remove `React.FC` everywhere. Use inline return types or explicit props interfaces.

### 3. Styling Patterns

**Admin (clsx):**
```tsx
import clsx from 'clsx';

export const Component = () => {
  return (
    <div className={clsx(styles.container)}>
      // ...
    </div>
  );
};

const styles = {
  container: ['w-full h-screen', 'flex flex-col'],
} as const;
```

**Player (clsx but some inconsistency):**
```tsx
import clsx from 'clsx';

export const Component = () => {
  return (
    <div className={clsx(styles.layout)}>
      // ...
    </div>
  );
};

const styles = {
  layout: ['flex flex-col', 'md:flex-row'],
} as const;
```

**Status:** Both use `clsx` + `styles` object pattern. This is consistent.

### 4. Data Fetching Patterns

**Admin (TanStack Query):**
```tsx
// Query key factory pattern
export const albumKeys = {
  all: ['albums'] as const,
  lists: () => [...albumKeys.all, 'list'] as const,
  detail: (id: number) => [...albumKeys.all, 'detail', id] as const,
};

// React Query hook
export const useAlbum = (id: number) => {
  return useQuery({
    queryKey: albumKeys.detail(id),
    queryFn: () => albumApi.getAlbumById(id),
    enabled: !!id,
  });
};
```

**Player (Manual useEffect):**
```tsx
export const useStream = () => {
  const [state, setState] = useState();
  
  useEffect(() => {
    // Manual fetch logic
  }, []);
  
  return { state };
};
```

**Recommendation:** Migrate player to TanStack Query pattern.

### 5. API Client Patterns

**Admin (Factory function):**
```tsx
const createHttpClient = (baseURL: string): AxiosInstance => {
  const client = axios.create({...});
  // interceptors
  return client;
};

export const waveApiClient = createHttpClient(apiUrl);
```

**Player (Direct creation):**
```tsx
export const radioApiClient = axios.create({
  baseURL: apiUrl,
  // ...
});
```

**Recommendation:** Use factory pattern consistently.

### 6. Barrel Exports (Index Files)

**Admin:**
```ts
// Deep re-exports
export * from './content';
export * from './modals';
```

**Player:**
```ts
// Mixed exports
export { RadioLayout } from './radio-layout';
export * from './components';
export type { User, UserWithStatus } from './useUserList';
```

**Recommendation:** Standardize to `export * from './module'` pattern with explicit type exports where needed.

### 7. Import Organization

Both apps use Biome's `organizeImports` which handles this automatically. No action needed.

### 8. Environment Variables

**Admin:**
```tsx
function getDefaultApiUrl(): string {
  if (typeof window !== 'undefined') {
    const { protocol, hostname } = window.location;
    return `${protocol}//${hostname}:6870`;
  }
  return 'http://localhost:6870';
}

export const apiUrl = import.meta.env.VITE_API_URL || getDefaultApiUrl();
```

**Player:**
```tsx
export const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:6870';
```

**Recommendation:** Use the more robust `getDefaultApiUrl()` pattern.

### 9. TypeScript Configuration

**Admin (stricter):**
```json
{
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noFallthroughCasesInSwitch": true
}
```

**Player (missing these):**
```json
{
  "skipLibCheck": true
  // Missing strict checks
}
```

**Recommendation:** Align player's tsconfig with admin's stricter settings.

### 10. Zustand Store Patterns

**Admin:**
```tsx
type AuthState = {
  user: User | null;
  token: string | null;
};

type AuthActions = {
  login: (token: string, user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      // state and actions
    }),
    { name: 'auth-storage', partialize: (state) => ({...}) },
  ),
);
```

**Player:**
```tsx
interface UserColorsState {
  myColor: string | null;
}

interface UserColorsStore extends UserColorsState {
  setMyColor: (color: string | null) => void;
}

export const useUserColorsStore = create<UserColorsStore>()(
  persist(
    (set, get) => ({
      // state and actions
    }),
    { name: 'user-colors', partialize: (state) => ({...}) },
  ),
);
```

**Recommendation:** Use `type` over `interface` for state/actions. Keep consistent naming patterns.

---

## Target State

### Code Style Guide Creation

Create `CODE_STYLE_GUIDE.md` in the monorepo root documenting:

1. File naming conventions
2. Component structure patterns
3. Import/export patterns
4. Hook patterns
5. Store patterns
6. API client patterns
7. Styling patterns
8. TypeScript configuration
9. React Query patterns

### Files to Update

#### Player App Phase 1: File Renaming

| Current | Target |
|---------|--------|
| `stores/userColorsStore.ts` | `stores/user-colors-store.ts` |
| `hooks/useChat.ts` | `hooks/use-chat.ts` |
| `hooks/useStream.ts` | `hooks/use-stream.ts` |
| `hooks/useSound.ts` | `hooks/use-sound.ts` |
| `hooks/useUser.ts` | `hooks/use-user.ts` |
| `hooks/useUserList.ts` | `hooks/use-user-list.ts` |
| `hooks/useUserColorsSync.ts` | `hooks/use-user-colors-sync.ts` |
| `hooks/useDetailedSound.ts` | `hooks/use-detailed-sound.ts` |

#### Player App Phase 2: Component Updates

- Remove `React.FC` type annotations
- Update imports after file renames
- Align barrel exports with admin pattern

#### Player App Phase 3: Architecture Updates

- Add TanStack Query for data fetching
- Implement query key factories
- Update API client to use factory pattern
- Update environment variable handling

#### Player App Phase 4: TypeScript Alignment

- Update player's `tsconfig.json` with stricter checks
- Fix any new type errors

---

## Implementation Phases

### Phase 1: Documentation

**Objective:** Create the code style guide

**Tasks:**

**Task 1.1: Create CODE_STYLE_GUIDE.md**

Create comprehensive style guide with all conventions documented.

**Estimated Effort:** 2 hours

### Phase 2: Player App - File Naming

**Objective:** Rename files to match conventions

**Tasks:**

**Task 2.1: Rename hook files**
- Rename `useChat.ts` → `use-chat.ts`
- Rename `useStream.ts` → `use-stream.ts`
- Rename `useSound.ts` → `use-sound.ts`
- Rename `useUser.ts` → `use-user.ts`
- Rename `useUserList.ts` → `use-user-list.ts`
- Rename `useUserColorsSync.ts` → `use-user-colors-sync.ts`
- Rename `useDetailedSound.ts` → `use-detailed-sound.ts`
- Update all imports

**Task 2.2: Rename store files**
- Rename `userColorsStore.ts` → `user-colors-store.ts`
- Update all imports

**Task 2.3: Update barrel exports**
- Update all `index.ts` files to use correct imports

**Estimated Effort:** 1 hour

### Phase 3: Player App - Component Patterns

**Objective:** Align component type annotations

**Tasks:**

**Task 3.1: Remove React.FC annotations**

Update components to use implicit return types instead of `React.FC`.

Files to update:
- `apps/player/src/features/radio/radio-layout.tsx`
- `apps/player/src/components/ui/button.tsx`
- Any other components using `React.FC`

**Estimated Effort:** 30 minutes

### Phase 4: Player App - Architecture Updates

**Objective:** Modernize data fetching and API patterns

**Tasks:**

**Task 4.1: Setup TanStack Query**
- Add React Query provider if not present
- Create query client configuration

**Task 4.2: Create query key factories**
- Create `apps/player/src/services/api/keys/` directory
- Implement query key factories for each domain

**Task 4.3: Convert existing hooks to TanStack Query**
- Convert `useStreamInfo.ts`
- Convert `useStreamStatus.ts`
- Convert `useAudioFiles.ts`

**Task 4.4: Update API client**
- Refactor to use factory pattern like admin

**Task 4.5: Update environment file**
- Add `getDefaultApiUrl()` pattern

**Estimated Effort:** 4 hours

### Phase 5: TypeScript Configuration

**Objective:** Align TypeScript strictness

**Tasks:**

**Task 5.1: Update player tsconfig.json**
- Add `noUnusedLocals: true`
- Add `noUnusedParameters: true`
- Add `noFallthroughCasesInSwitch: true`

**Task 5.2: Fix resulting type errors**
- Run type check
- Fix any new errors

**Estimated Effort:** 1 hour

### Phase 6: Wave Backend Review

**Objective:** Ensure wave app follows conventions

**Tasks:**

**Task 6.1: Review wave file naming**
- Check handler files
- Check route files
- Check middleware files

**Task 6.2: Document backend-specific conventions**
- Add backend section to style guide

**Estimated Effort:** 1 hour

### Phase 7: Packages Review

**Objective:** Review shared packages

**Tasks:**

**Task 7.1: Review mojo-ui package**
- Ensure components follow style guide
- Check barrel exports

**Task 7.2: Review types package**
- Ensure types are well-organized
- Add missing JSDoc comments

**Estimated Effort:** 1 hour

---

## Files Summary

### New Files

| File | Purpose |
|------|---------|
| `CODE_STYLE_GUIDE.md` | Code style guide for all apps |
| `apps/player/src/services/api/keys/` | Query key factories |

### Modified Files

| File | Changes |
|------|---------|
| `apps/player/src/stores/user-colors-store.ts` | Rename from `userColorsStore.ts` |
| `apps/player/src/features/radio/hooks/*.ts` | Rename to kebab-case |
| `apps/player/tsconfig.json` | Add strict checks |
| `apps/player/src/features/radio/radio-layout.tsx` | Remove `React.FC` |
| `apps/player/src/services/env.ts` | Add `getDefaultApiUrl()` |

---

## Estimated Effort

| Phase | Complexity | Estimate |
|-------|------------|----------|
| 1. Documentation | Low | 2 hours |
| 2. File Naming | Low | 1 hour |
| 3. Component Patterns | Low | 30 minutes |
| 4. Architecture | Medium | 4 hours |
| 5. TypeScript | Low | 1 hour |
| 6. Wave Review | Low | 1 hour |
| 7. Packages Review | Low | 1 hour |

**Total: ~10.5 hours**

---

## Progress Summary

| Date | Phase | Status | Notes |
|------|-------|--------|-------|
| 2026-04-08 | Phase 1 | ✅ Complete | CODE_STYLE_GUIDE.md already existed |
| 2026-04-08 | Phase 2 | ✅ Complete | 8 hook files + 1 store file renamed to kebab-case |
| 2026-04-08 | Phase 3 | ✅ Complete | Removed React.FC from 7 components |
| 2026-04-08 | Phase 4 | ✅ Complete | Query key factories, factory pattern API client |
| 2026-04-08 | Phase 5 | ✅ Complete | Added noUnusedLocals, noUnusedParameters, noFallthroughCasesInSwitch |
| - | Phase 6 | ⏸️ Skipped | Wave backend review deferred |
| - | Phase 7 | ⏸️ Skipped | Packages review deferred |

---

## Notes

- Admin app is the reference codebase for all style decisions
- Phase 4 (Architecture) can be deferred if time constraints exist
- Phase 6 and 7 can run in parallel with Phase 1-3
- Consider creating a shared ESLint/Biome config in root for stricter enforcement