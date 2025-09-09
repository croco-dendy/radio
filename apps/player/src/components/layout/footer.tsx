import clsx from 'clsx';

const Footer = () => {
  return (
    <footer className={clsx(styles.footer)}>
      <div className={clsx(styles.inner)}>
        <p className={clsx(styles.text)}>
          © {new Date().getFullYear()} Вінілове Радіо — Музична скарбниця
          Нептуна
        </p>
      </div>
    </footer>
  );
};

const styles = {
  footer: [
    'text-xs md:text-sm text-white/40 font-sans bg-coal-relic/80 backdrop-blur-md p-4',
  ],
  inner: ['flex flex-row items-center justify-center gap-4'],
  text: ['text-sm font-display font-thin text-center'],
};

export default Footer;
