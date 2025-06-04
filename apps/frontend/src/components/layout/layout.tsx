import type { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Footer from './footer';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <ErrorBoundary fallbackRender={() => null}>
      <div className="flex flex-col h-screen overflow-hidden text-white bg-neutral-950 bg-cover bg-center">
        <img
          src="/public/placeholder.png"
          alt="Очікуємо трансляцію"
          className="absolute w-full h-full object-cover mb-4 z-0"
        />
        <main className="flex-grow flex overflow-hidden z-10">{children}</main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default Layout;
