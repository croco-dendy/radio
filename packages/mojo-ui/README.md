# @radio/mojo-ui

Retro styled components library for Radio project.

## Features

- 🎨 **Retro Design** - Beautiful 3D buttons with chunky bases and glowing effects
- 🎯 **TypeScript** - Full TypeScript support with strict typing
- 🎭 **Accessible** - ARIA labels and keyboard navigation
- 🎪 **Customizable** - Multiple variants and sizes
- 🎬 **Animated** - Smooth hover and press animations with glow effects
- 📐 **Layout Components** - Reusable containers and panels

## Components

### Input Components

#### Button
Retro-styled buttons with thick 3D bases and radial gradients.

```tsx
import { Button } from '@radio/mojo-ui';

<Button variant="green" size="medium" title="Click me" />
```

**Variants:** `green`, `yellow`, `gray`, `red`
**Sizes:** `small`, `medium`, `large`

#### IconButton
Round icon buttons with the same retro styling.

```tsx
import { IconButton, CheckIcon } from '@radio/mojo-ui';

<IconButton variant="green" size="medium">
  <CheckIcon />
</IconButton>
```

#### Switch
Toggle switches with animated state transitions and state-based coloring.

```tsx
import { Switch } from '@radio/mojo-ui';

<Switch 
  variant="green"
  size="medium"
  checked={isOn}
  onChange={setIsOn}
/>
```

Features:
- Color activates only in ON position
- Gray/disabled state when OFF
- Smooth animations and hover glow
- O/I labels with center divider
- All 4 variants with color-coded states

### Layout Components

#### PageLayout
Standard page structure with gradient background and centered content.

```tsx
import { PageLayout } from '@radio/mojo-ui';

<PageLayout title="My Page">
  {/* Content here */}
</PageLayout>
```

#### PanelCard
Flexible container for organizing content sections.

```tsx
import { PanelCard } from '@radio/mojo-ui';

<PanelCard title="Service Status" footer={<StatusIndicator />}>
  {/* Content */}
</PanelCard>
```

#### StatsCard
Display individual statistics with title and value.

```tsx
import { StatsCard } from '@radio/mojo-ui';

<StatsCard title="Active Users" value={2543} />
```

#### StatusIndicator
Color-coded status display with pulse animation.

```tsx
import { StatusIndicator } from '@radio/mojo-ui';

<StatusIndicator status="running" />
```

**Statuses:** `running`, `stopped`, `error`, `initializing`

#### StatsGrid
Display multiple statistics in a configurable grid.

```tsx
import { StatsGrid } from '@radio/mojo-ui';

<StatsGrid 
  columns={3}
  stats={[
    { label: 'CPU', value: 45, suffix: '%' },
    { label: 'Memory', value: 2048, suffix: 'MB' },
    { label: 'Uptime', value: '45 days' },
  ]}
/>
```

### Icons

Pre-built SVG icons available:

```tsx
import { CheckIcon, PlusIcon, SearchIcon, MenuIcon, SettingsIcon, CloseIcon } from '@radio/mojo-ui';
```

## Showcase / Demo Website

The showcase is a **temporary development website** included in this package for previewing all components during development.

> **⚠️ Future Migration:** This showcase will be moved to a **separate repository** when the mojo-ui library is eventually extracted as a standalone package. For now, it's included here for convenience.

### Running the Showcase

```bash
# From root of the monorepo
pnpm mojo:dev
# Open http://localhost:3010
```

Or directly:
```bash
cd packages/mojo-ui
pnpm dev
# Open http://localhost:3010
```

Features:
- Interactive component preview
- All variants and sizes displayed
- Live state management for switches
- Layout component examples
- Design system reference

**Build Note:** The showcase (`src/main.tsx` and `index.html`) is excluded from the library bundle. Only components exported from `src/index.ts` are included in the built package.

## Installation

This package is part of the Radio monorepo and should be installed as a workspace dependency.

```bash
pnpm add @radio/mojo-ui
```

## Usage in Projects

```tsx
import { Button, Switch, PageLayout, StatsCard } from '@radio/mojo-ui';

export const MyPage = () => (
  <PageLayout title="Dashboard">
    <div className="grid grid-cols-4 gap-4">
      <StatsCard title="Users" value={150} />
      <StatsCard title="Active" value={89} />
    </div>
    
    <Button 
      variant="green" 
      size="medium" 
      title="Start" 
      onClick={() => alert('Started!')} 
    />
  </PageLayout>
);
```

## Styling Requirements

The components require Tailwind CSS. Make sure your project has tailwind configured.

## License

MIT

