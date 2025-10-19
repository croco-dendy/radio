import { useState } from 'react';
import type { FC } from 'react';
import { Button } from './components/button';
import { Card } from './components/card';
import { Panel } from './components/panel';
import { IconButton } from './components/icon-button';
import { Input } from './components/input';
import { StatsGrid } from './components/layout';
import { ProgressBar } from './components/progress-bar';
import { StatsCard } from './components/stats-card';
import { StatusIndicator } from './components/status-indicator';
import { Switch } from './components/switch';
import { Tabs } from './components/tabs';
import { CheckIcon, PlusIcon } from './icons';

type Variant = 'green' | 'yellow' | 'gray' | 'red';
type Size = 'small' | 'medium' | 'large';

const variants: Variant[] = ['green', 'yellow', 'gray', 'red'];
const sizes: Size[] = ['medium'];

export const Showcase: FC = () => {
  const [switchStates, setSwitchStates] = useState<Record<string, boolean>>({
    green: false,
    yellow: false,
    gray: false,
    red: false,
  });

  const [inputValues, setInputValues] = useState<Record<string, string>>({
    small: '',
    medium: '',
    large: '',
  });

  const handleSwitchChange = (variant: string, checked: boolean) => {
    setSwitchStates((prev) => ({
      ...prev,
      [variant]: checked,
    }));
  };

  const handleInputChange = (size: string, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [size]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#181818]">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-24">
        {/* Retro Control Panel */}
        <section className="mb-32">
          <Panel
            title="Component Library"
            subtitle="Interactive showcase of UI components"
            maxColumns={3}
            sections={[
              {
                title: 'Buttons',
                content: (
                  <div className="space-y-6">
                    {sizes.map((size) => (
                      <div key={`btn-size-${size}`}>
                        <div className="flex flex-wrap gap-2">
                          {variants.map((variant) => (
                            <Button
                              key={`btn-${variant}-${size}`}
                              variant={variant}
                              size={size}
                              title={
                                variant.charAt(0).toUpperCase() +
                                variant.slice(1)
                              }
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                title: 'Switches',
                content: (
                  <div className="space-y-6">
                    {sizes.map((size) => (
                      <div key={`switch-size-${size}`}>
                        <div className="flex items-center flex-wrap gap-3">
                          {variants.map((variant) => (
                            <Switch
                              key={`switch-${variant}-${size}`}
                              variant={variant}
                              size={size}
                              checked={
                                switchStates[`${variant}-${size}`] || false
                              }
                              onChange={(checked) =>
                                handleSwitchChange(
                                  `${variant}-${size}`,
                                  checked,
                                )
                              }
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                title: 'Icon Buttons',
                content: (
                  <div className="space-y-6">
                    {sizes.map((size) => (
                      <div key={`icon-size-${size}`}>
                        <div className="flex items-center flex-wrap gap-3">
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
                ),
              },
              {
                title: 'Inputs',
                content: (
                  <div className="space-y-6">
                    {sizes.map((size) => (
                      <div key={`input-size-${size}`}>
                        <div className="space-y-3">
                          <Input
                            size={size}
                            placeholder={`Enter ${size} text...`}
                            value={inputValues[size] || ''}
                            onChange={(e) =>
                              handleInputChange(size, e.target.value)
                            }
                          />
                          <Input
                            size={size}
                            label="With Label"
                            placeholder="Type here..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                title: 'Tabs',
                content: (
                  <div className="space-y-6">
                    <div>
                      <Tabs
                        variant="green"
                        tabs={[
                          {
                            id: 'tab1',
                            label: 'First',
                            content: (
                              <div className="text-white">
                                <h3 className="text-base font-semibold mb-2">
                                  First Tab
                                </h3>
                                <p className="text-sm text-gray-300">
                                  Example content for the first tab
                                </p>
                              </div>
                            ),
                          },
                          {
                            id: 'tab2',
                            label: 'Second',
                            content: (
                              <div className="text-white">
                                <h3 className="text-base font-semibold mb-2">
                                  Second Tab
                                </h3>
                                <p className="text-sm text-gray-300">
                                  Example content for the second tab
                                </p>
                              </div>
                            ),
                          },
                          {
                            id: 'tab3',
                            label: 'Third',
                            content: (
                              <div className="text-white">
                                <h3 className="text-base font-semibold mb-2">
                                  Third Tab
                                </h3>
                                <p className="text-sm text-gray-300">
                                  Example content for the third tab
                                </p>
                              </div>
                            ),
                          },
                        ]}
                      />
                    </div>
                  </div>
                ),
              },
              {
                title: 'Progress Bars',
                content: (
                  <div className="space-y-6">
                    <div className="mt-6">
                      <div className="space-y-3">
                        <ProgressBar
                          variant="green"
                          size="medium"
                          value={85}
                          label="10 lamps"
                          lampCount={10}
                        />
                        <ProgressBar
                          variant="yellow"
                          size="medium"
                          value={85}
                          label="20 lamps"
                          lampCount={20}
                        />
                        <ProgressBar
                          variant="red"
                          size="medium"
                          value={85}
                          label="5 lamps"
                          lampCount={5}
                        />
                        <ProgressBar
                          variant="gray"
                          size="medium"
                          value={100}
                          label="15 lamps"
                          lampCount={15}
                        />
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </section>

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

          {/* Cards */}
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
            Cards
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card
              title="Service Status"
              actions={
                <>
                  <Button variant="green" title="Restart" />
                  <Button variant="red" title="Stop" />
                </>
              }
            >
              <StatsGrid
                stats={[
                  { label: 'CPU', value: 45, suffix: '%' },
                  { label: 'Memory', value: 2048, suffix: 'MB' },
                  { label: 'Requests', value: 1250 },
                  { label: 'Errors', value: 12, highlight: true },
                ]}
                columns={2}
              />
            </Card>

            <Card
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
            </Card>
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
