import type { FC, useState } from 'react';
import { Button } from './components/button';
import { IconButton } from './components/icon-button';
import { Switch } from './components/switch';
import {
  PageLayout,
  PanelCard,
  StatsCard,
  StatusIndicator,
  StatsGrid,
} from './components/layout';
import { CheckIcon, ChevronRightIcon } from './icons';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-white mb-2">Mojo UI Showcase</h1>
          <p className="text-gray-400 text-lg">All components with variants and states</p>
        </div>

        {/* Buttons Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-8">Buttons</h2>

          {/* By Variant */}
          <div className="space-y-8">
            {variants.map((variant) => (
              <div key={variant}>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                  {variant} Variant
                </h3>
                <div className="flex flex-wrap gap-6 p-6 bg-slate-800/50 rounded-lg border border-slate-700">
                  {sizes.map((size) => (
                    <Button
                      key={`btn-${variant}-${size}`}
                      variant={variant}
                      size={size}
                      title={size.charAt(0).toUpperCase() + size.slice(1)}
                    />
                  ))}
                  <Button
                    variant={variant}
                    size="medium"
                    title="Disabled"
                    disabled
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Icon Buttons Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-8">Icon Buttons</h2>

          <div className="space-y-8">
            {variants.map((variant) => (
              <div key={`icon-${variant}`}>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                  {variant} Variant
                </h3>
                <div className="flex flex-wrap gap-6 p-6 bg-slate-800/50 rounded-lg border border-slate-700">
                  {sizes.map((size) => (
                    <IconButton
                      key={`icon-btn-${variant}-${size}`}
                      variant={variant}
                      size={size}
                    >
                      <CheckIcon />
                    </IconButton>
                  ))}
                  <IconButton
                    variant={variant}
                    size="medium"
                    disabled
                  >
                    <ChevronRightIcon />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Switches Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-8">Switches</h2>

          <div className="space-y-8">
            {variants.map((variant) => (
              <div key={`switch-${variant}`}>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                  {variant} Variant
                </h3>
                <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-12">
                    {sizes.map((size) => (
                      <div
                        key={`switch-${variant}-${size}`}
                        className="flex flex-col items-center gap-3"
                      >
                        <Switch
                          variant={variant}
                          size={size}
                          checked={switchStates[`${variant}-${size}`] || false}
                          onChange={(checked) =>
                            handleSwitchChange(`${variant}-${size}`, checked)
                          }
                        />
                        <span className="text-xs text-gray-400 capitalize">{size}</span>
                      </div>
                    ))}
                    <div className="flex flex-col items-center gap-3">
                      <Switch
                        variant={variant}
                        size="medium"
                        disabled
                        checked={false}
                      />
                      <span className="text-xs text-gray-400">Disabled</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Layout Components Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-8">Layout Components</h2>

          {/* Stats Cards */}
          <div className="mb-12">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
              Stats Cards
            </h3>
            <div className="grid grid-cols-4 gap-4">
              <StatsCard title="Active Users" value={2543} />
              <StatsCard title="CPU Usage" value={45.2} isHighlight={false} />
              <StatsCard title="Memory" value={78.9} isHighlight />
              <StatsCard title="Uptime" value="99.9%" />
            </div>
          </div>

          {/* Status Indicators */}
          <div className="mb-12">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
              Status Indicators
            </h3>
            <div className="flex flex-wrap gap-12 p-6 bg-slate-800/50 rounded-lg border border-slate-700">
              <StatusIndicator status="running" />
              <StatusIndicator status="stopped" />
              <StatusIndicator status="initializing" />
              <StatusIndicator status="error" />
            </div>
          </div>

          {/* Panel Cards */}
          <div className="mb-12">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
              Panel Cards
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <PanelCard title="Service Status">
                <div className="space-y-4">
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
                <div className="mt-4 flex gap-2 justify-center">
                  <Button variant="green" size="small" title="Restart" />
                  <Button variant="red" size="small" title="Stop" />
                </div>
              </PanelCard>

              <PanelCard title="System Info" footer={<StatusIndicator status="running" />}>
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
          </div>
        </section>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-500 text-sm">
          <p>Mojo UI Component Library</p>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
