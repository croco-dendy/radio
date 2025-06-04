const Footer = () => {
  return (
    <footer className="text-xs text-white/40 font-sans bg-coal-relic/80 backdrop-blur-md p-4">
      <div className="flex flex-row items-center justify-center gap-4">
        <p className="text-sm font-display font-thin text-center">
          © {new Date().getFullYear()} Вінілове Радіо — Музична скарбниця
          Нептуна
        </p>
      </div>
    </footer>
  );
};

export default Footer;
