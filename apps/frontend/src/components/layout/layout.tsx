import type { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import clsx from 'clsx';
import Footer from './footer';

interface LayoutProps extends PropsWithChildren {
  backgroundImage?: string;
  backgroundAlt?: string;
}

const Layout = ({
  children,
  backgroundImage = '/placeholder.png',
  backgroundAlt = 'Очікуємо трансляцію',
}: LayoutProps) => {
  return (
    <ErrorBoundary fallbackRender={() => null}>
      <div className={clsx(styles.wrapper)}>
        <img
          src={backgroundImage}
          alt={backgroundAlt}
          className={clsx(styles.background)}
        />
        <main className={clsx(styles.main)}>{children}</main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

const styles = {
  wrapper: [
    'flex flex-col h-screen overflow-hidden text-white bg-neutral-950 bg-cover bg-center',
    'p-0',
  ],
  background: ['absolute w-full h-full object-cover mb-4 z-0'],
  main: ['flex h-full overflow-hidden z-10'],
} as const;

export default Layout;
