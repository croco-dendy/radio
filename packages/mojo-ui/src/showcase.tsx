import { useState } from 'react';
import type { FC } from 'react';
import { Button } from './components/button';
import { IconButton } from './components/icon-button';
import {
  PanelCard,
  StatsCard,
  StatsGrid,
  StatusIndicator,
} from './components/layout';
import { Switch } from './components/switch';
import { CheckIcon, PlusIcon } from './icons';
import './globals.css';

type Variant = 'green' | 'yellow' | 'gray' | 'red';
type Size = 'small' | 'medium' | 'large';

const variants: Variant[] = ['green', 'yellow', 'gray', 'red'];
const sizes: Size[] = ['small', 'medium', 'large'];

export const Showcase: FC = () => {
  const [switchStates, setSwitchStates] = useState<Record<string, boolean>>({
    green: false,
    yellow: false,
    gray: false,
    red: false,
  });

  const handleSwitchChange = (variant: string, checked: boolean) => {
    setSwitchStates((prev) => ({
      ...prev,
      [variant]: checked,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <div className="pt-32 pb-24 px-8 text-center">
        <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
          Mojo UI
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Retro-styled component library with 3D depth, elegant gradients, and
          glowing effects
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 pb-24">
        {/* Buttons & Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
          {/* Buttons by Size */}
          <section>
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-2">Buttons</h2>
              <p className="text-gray-500 text-sm">4 colors × 3 sizes</p>
            </div>

            <div className="space-y-8">
              {sizes.map((size) => (
                <div key={`btn-size-${size}`}>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                    {size}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {variants.map((variant) => (
                      <Button
                        key={`btn-${variant}-${size}`}
                        variant={variant}
                        size={size}
                        title={
                          variant.charAt(0).toUpperCase() + variant.slice(1)
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Switches by Size */}
          <section>
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-2">Switches</h2>
              <p className="text-gray-500 text-sm">Interactive toggles</p>
            </div>

            <div className="space-y-8">
              {sizes.map((size) => (
                <div key={`switch-size-${size}`}>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                    {size}
                  </p>
                  <div className="flex items-center gap-3">
                    {variants.map((variant) => (
                      <Switch
                        key={`switch-${variant}-${size}`}
                        variant={variant}
                        size={size}
                        checked={switchStates[`${variant}-${size}`] || false}
                        onChange={(checked) =>
                          handleSwitchChange(`${variant}-${size}`, checked)
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Icon Buttons by Size */}
          <section>
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-2">
                Icon Buttons
              </h2>
              <p className="text-gray-500 text-sm">Compact controls</p>
            </div>

            <div className="space-y-8">
              {sizes.map((size) => (
                <div key={`icon-size-${size}`}>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                    {size}
                  </p>
                  <div className="flex items-center gap-3">
                    {variants.map((variant) => (
                      <IconButton
                        key={`icon-btn-${variant}-${size}`}
                        variant={variant}
                        size={size}
                      >
                        {size === 'small' ? <CheckIcon /> : <PlusIcon />}
                      </IconButton>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Layout Components */}
        <section className="mb-24">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">
              Layout Components
            </h2>
            <p className="text-gray-500 text-sm">
              Reusable containers for building dashboards and UIs
            </p>
          </div>

          {/* Stats Cards */}
          <div className="mb-16">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
              Stats Cards
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatsCard title="Active Users" value={2543} />
              <StatsCard title="CPU Usage" value={45.2} isHighlight={false} />
              <StatsCard title="Memory" value={78.9} isHighlight />
              <StatsCard title="Uptime" value="99.9%" />
            </div>
          </div>

          {/* Status Indicators */}
          <div className="mb-16">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
              Status Indicators
            </p>
            <div className="flex flex-wrap gap-8">
              <StatusIndicator status="running" />
              <StatusIndicator status="stopped" />
              <StatusIndicator status="initializing" />
              <StatusIndicator status="error" />
            </div>
          </div>

          {/* Panel Cards */}
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
            Panel Cards
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PanelCard title="Service Status">
              <div className="space-y-6">
                <StatsGrid
                  stats={[
                    { label: 'CPU', value: 45, suffix: '%' },
                    { label: 'Memory', value: 2048, suffix: 'MB' },
                    { label: 'Requests', value: 1250 },
                    { label: 'Errors', value: 12, highlight: true },
                  ]}
                  columns={2}
                />
              </div>
              <div className="mt-6 flex gap-3 justify-center">
                <Button variant="green" size="small" title="Restart" />
                <Button variant="red" size="small" title="Stop" />
              </div>
            </PanelCard>

            <PanelCard
              title="System Info"
              footer={<StatusIndicator status="running" />}
            >
              <StatsGrid
                stats={[
                  { label: 'Uptime', value: '45 days' },
                  { label: 'Version', value: '2.1.0' },
                  { label: 'Workers', value: 8 },
                  { label: 'Status', value: 'Healthy' },
                ]}
                columns={2}
              />
            </PanelCard>
          </div>
        </section>

        {/* Footer */}
        <div className="pt-16 border-t border-slate-800 text-center">
          <p className="text-gray-500 text-sm mb-2">
            Retro-Styled Component Library
          </p>
          <p className="text-gray-600 text-xs">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
