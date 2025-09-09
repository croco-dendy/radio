import type React from 'react';
import { Link } from '@tanstack/react-router';
import clsx from 'clsx';
import { RadioLogo, NowPlaying } from './';

interface BottomNavigationProps {
  currentRoute: string;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentRoute,
}) => {
  const navItems = [
    { path: '/', label: 'Головна' },
    { path: '/collection', label: 'Колекція' },
    { path: '/users', label: 'Меломани' },
    { path: '/stream-control', label: 'Стрім' },
  ];

  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.navWrapper)}>
        <nav className={clsx(styles.nav)}>
          <div className={clsx(styles.leftSection)}>
            <RadioLogo />
            <NowPlaying />
          </div>

          <div className={clsx(styles.centerSection)}>
            {navItems.map((item) => {
              const isActive = currentRoute === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={clsx(
                    styles.navLink,
                    isActive ? styles.navLinkActive : styles.navLinkInactive,
                  )}
                >
                  <span className={clsx(styles.navLabel)}>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
};

const styles = {
  container: ['fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50'],
  navWrapper: [
    'bg-coal-deep/90 backdrop-blur-xl border border-white/20 rounded-full px-4 py-3',
    'shadow-2xl hover:shadow-3xl transition-all duration-300',
    'min-w-fit',
  ],
  nav: ['flex items-center justify-between'],
  leftSection: ['flex items-center space-x-4 mr-4'],
  centerSection: ['flex items-center space-x-4'],
  navLink: [
    'flex flex-col items-center transition-all duration-300',
    'px-4 py-2 border border-ember/0 rounded-full',
  ],
  navLinkActive: [
    'bg-gradient-to-b from-ember/25 to-ember/15 text-ember backdrop-blur-sm',
    'shadow-xl border border-ember/40',
  ],
  navLinkInactive: [
    'text-paper-calm hover:text-paper-fog border-ember/0',
    'hover:bg-white/5',
  ],
  navLabel: ['font-display font-medium'],
} as const;
