import { paperWarm } from '@/styles/classes';
import { Link } from '@tanstack/react-router';
import clsx from 'clsx';

const links = [
  { to: '/', label: 'Головна', emoji: '🏠' },
  { to: '/motds', label: 'Мудрощі', emoji: '🧠' },
  { to: '/rcon', label: 'РКОН', emoji: '📡' },
  { to: '/colors', label: 'Дев', emoji: '🛠️' },
];

const TabsNavigation = () => {
  return (
    <div className={clsx(styles.container, paperWarm)}>
      {links.map((link) => (
        <Link key={link.to} to={link.to} className={clsx(styles.link)}>
          <span className={clsx(styles.emoji)}>{link.emoji}</span>
          <span className={clsx(styles.label)}>{link.label}</span>
        </Link>
      ))}
    </div>
  );
};

const styles = {
  container: [
    'fixed bottom-[70px] left-1/2 -translate-x-1/2 px-4 py-2 rounded-full',
    'shadow-xl flex gap-4 z-50',
  ],
  link: [
    'flex items-center justify-center border border-transparent',
    'px-3 py-1 text-sm transition rounded-full',
    'text-white/80 hover:text-white font-display',
    '[&.active]:bg-black/30 [&.active]:border-black/30 text-white text-shadow-strong',
  ],
  emoji: 'block md:hidden text-lg',
  label: 'hidden md:inline text-lg',
};

export default TabsNavigation;
