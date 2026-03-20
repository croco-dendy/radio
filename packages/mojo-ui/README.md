# @radio/mojo-ui

Retro styled components library for Radio project.

## Features

- **Retro Design** - 3D buttons with chunky bases and glowing effects
- **TypeScript** - Full TypeScript support with strict typing
- **Accessible** - ARIA labels and keyboard navigation
- **Customizable** - Multiple variants and sizes
- **Animated** - Smooth hover and press animations with glow effects
- **SCSS Modules** - Scoped styling with SCSS modules

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

#### Input
Text input with retro styling.

```tsx
import { Input } from '@radio/mojo-ui';

<Input placeholder="Search..." />
```

#### Switch
Toggle switches with animated state transitions.

```tsx
import { Switch } from '@radio/mojo-ui';

<Switch variant="green" size="medium" checked={isOn} onChange={setIsOn} />
```

### Layout Components

#### PageLayout
Standard page structure with gradient background and centered content.

```tsx
import { PageLayout } from '@radio/mojo-ui';

<PageLayout title="My Page">
  {/* Content here */}
</PageLayout>
```

#### Panel
Flexible container for organizing content sections.

```tsx
import { Panel } from '@radio/mojo-ui';

<Panel title="Service Status">
  {/* Content */}
</Panel>
```

#### Card
Basic card container.

```tsx
import { Card } from '@radio/mojo-ui';

<Card>{/* Content */}</Card>
```

#### Modal
Animated modal dialog with backdrop.

```tsx
import { Modal } from '@radio/mojo-ui';

<Modal isOpen={isOpen} onClose={handleClose} title="Edit Item">
  {/* Content */}
</Modal>
```

#### Popup & PopupItem
Dropdown popup menu.

```tsx
import { Popup, PopupItem } from '@radio/mojo-ui';

<Popup trigger={<Button title="Menu" />}>
  <PopupItem onClick={handleAction}>Action</PopupItem>
</Popup>
```

### Data Display

#### StatsCard
Display individual statistics with title and value.

```tsx
import { StatsCard } from '@radio/mojo-ui';

<StatsCard title="Active Users" value={2543} />
```

#### StatsGrid
Display multiple statistics in a configurable grid.

```tsx
import { StatsGrid } from '@radio/mojo-ui';

<StatsGrid
  columns={3}
  stats={[
    { label: 'CPU', value: 45, suffix: '%' },
    { label: 'Memory', value: 2048, suffix: 'MB' },
  ]}
/>
```

#### StatusIndicator
Color-coded status display with pulse animation.

```tsx
import { StatusIndicator } from '@radio/mojo-ui';

<StatusIndicator status="running" />
```

**Statuses:** `running`, `stopped`, `error`, `initializing`

#### ProgressBar
Visual progress indicator.

```tsx
import { ProgressBar } from '@radio/mojo-ui';

<ProgressBar value={75} />
```

### Navigation

#### Tabs
Standard tab navigation.

```tsx
import { Tabs } from '@radio/mojo-ui';
```

#### VinylTabs
Themed tab navigation with vinyl record styling.

```tsx
import { VinylTabs } from '@radio/mojo-ui';
```

### Icons

```tsx
import {
  CheckIcon,
  CloseIcon,
  PlusIcon,
  SearchIcon,
  MenuIcon,
  SettingsIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  SortIcon,
  FilterIcon,
} from '@radio/mojo-ui';
```

## Showcase

The package includes a development showcase for previewing all components.

```bash
# From root of the monorepo
pnpm mojo:dev
# Open http://localhost:3010
```

## Installation

This package is part of the Radio monorepo and is used as a workspace dependency.

```json
"@radio/mojo-ui": "workspace:*"
```

## Styling Requirements

Components use SCSS modules internally and require Tailwind CSS in the consuming project.

## License

MIT
