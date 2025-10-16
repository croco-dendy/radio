import clsx from 'clsx';
import { Button, IconButton, CheckIcon, Switch } from '@radio/mojo-ui';
import { useState } from 'react';

export const MojoUITestPanel = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.content)}>
        <div className={clsx(styles.section)}>
          <h3 className={clsx(styles.sectionTitle)}>Mojo UI</h3>

          <div className={clsx(styles.subsection)}>
            <h4 className={clsx(styles.subsectionTitle)}>Buttons</h4>
            <div className={clsx(styles.buttonGrid)}>
              <Button variant="green" size="large" title="Done" />
              <Button variant="yellow" size="large" title="More" />
              <Button variant="gray" size="large" title="Open" />
              <Button variant="red" size="large" title="Cancel" />
              <Button variant="red" size="large" disabled title="Disabled" />
            </div>
            <div className={clsx(styles.buttonGrid)}>
              <Button variant="green" size="medium" title="Done" />
              <Button variant="yellow" size="medium" title="More" />
              <Button variant="gray" size="medium" title="Open" />
              <Button variant="red" size="medium" title="Cancel" />
              <Button variant="red" size="medium" disabled title="Disabled" />
            </div>
            <div className={clsx(styles.buttonGrid)}>
              <IconButton variant="green" size="small">
                <CheckIcon />
              </IconButton>
              <IconButton variant="yellow" size="small">
                <CheckIcon />
              </IconButton>
              <IconButton variant="gray" size="small">
                <CheckIcon />
              </IconButton>
              <IconButton variant="red" size="small">
                <CheckIcon />
              </IconButton>
              <IconButton variant="red" size="small" disabled>
                <CheckIcon />
              </IconButton>

              <Switch
                variant="green"
                size="large"
                checked={isOn}
                onChange={setIsOn}
              />
              <Switch
                variant="yellow"
                size="large"
                checked={isOn}
                onChange={setIsOn}
              />
              <Switch
                variant="red"
                size="large"
                checked={isOn}
                onChange={setIsOn}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: [
    'w-full max-w-6xl mx-auto p-8 bg-coal-deep/20 backdrop-blur-md rounded-3xl',
    'border border-white/10 shadow-2xl',
  ],
  header: ['text-center mb-12'],
  title: ['text-4xl font-bold text-paper-fog mb-4 font-serif'],
  subtitle: ['text-lg text-paper-calm font-serif'],
  content: ['space-y-12'],
  section: ['space-y-8'],
  sectionTitle: [
    'text-2xl font-bold text-sun mb-6 font-serif',
    'border-b border-sun/30 pb-2',
  ],
  subsection: ['space-y-6'],
  subsectionTitle: ['text-xl font-semibold text-paper-fog mb-4 font-serif'],
  buttonGrid: [
    'flex flex-wrap gap-4 items-center justify-start',
    'p-4 bg-coal-deep/10 rounded-2xl border border-white/5',
  ],
} as const;
