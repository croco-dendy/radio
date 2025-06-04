import type { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import clsx from 'clsx';
import Footer from './footer';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <ErrorBoundary fallbackRender={() => null}>
      <div className={clsx(styles.wrapper)}>
        <img
          src="/placeholder.png"
          alt="Очікуємо трансляцію"
          className={clsx(styles.background)}
        />
        <main className={clsx(styles.main)}>{children}</main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default Layout;

const styles = {
  wrapper: [
    'flex flex-col h-screen overflow-hidden text-white bg-neutral-950 bg-cover bg-center',
  ],
  background: ['absolute w-full h-full object-cover mb-4 z-0'],
  main: ['flex-grow flex overflow-hidden z-10'],
};
