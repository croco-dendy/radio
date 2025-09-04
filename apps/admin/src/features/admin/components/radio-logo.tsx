import clsx from 'clsx';

export const RadioLogo: React.FC = () => (
  <div className={clsx(styles.logo)}>
    <img
      src="/radio-logo.svg"
      alt="Radio Logo"
      className="h-8 w-[200px] max-w-fit"
    />
  </div>
);

const styles = {
  logo: [
    'flex items-center justify-center text-sun',
    'transition-opacity duration-300',
  ],
} as const;
