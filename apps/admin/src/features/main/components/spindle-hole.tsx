import clsx from 'clsx';

type SpindleHoleProps = {
  size?: number;
  className?: string;
};

export const SpindleHole = ({ size = 24, className }: SpindleHoleProps) => {
  return (
    <div
      className={clsx(
        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
        className,
      )}
      style={{ width: size, height: size }}
    >
      {/* Outer ring */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
        style={{ width: size, height: size }}
      />
      {/* Inner circle */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-coal-deep/60"
        style={{ width: size * 0.6, height: size * 0.6 }}
      />
      {/* Center dot */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-coal-relic/40"
        style={{ width: size * 0.3, height: size * 0.3 }}
      />
    </div>
  );
};
