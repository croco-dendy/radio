import { classes } from '@/styles';
import type { PropsWithChildren } from 'react';
import clsx from 'clsx';

type Container = {
  full?: boolean;
  fog?: boolean;
  scrollable?: boolean;
};

export const Container = ({
  children,
  scrollable,
  full,
  fog,
}: PropsWithChildren<Container>) => {
  const isDefault = !fog && !full;

  return (
    <div className={classes.container}>
      <div
        className={clsx(
          fog && classes.fogPanel,
          full && classes.fullPaperPanel,
          isDefault && classes.paperPanel,
        )}
      >
        <div className={clsx(scrollable && classes.scrollablePage)}>
          {children}
        </div>
      </div>
    </div>
  );
};
