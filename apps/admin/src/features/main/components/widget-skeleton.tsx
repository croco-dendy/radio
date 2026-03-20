import clsx from 'clsx';
import { SpindleHole } from './spindle-hole';

type WidgetSkeletonProps = {
  radius?: number;
};

export const WidgetSkeleton = ({ radius = 112 }: WidgetSkeletonProps) => {
  const size = radius * 2;
  const spindleSize = Math.max(18, radius * 0.18);

  return (
    <div
      className={clsx(
        'relative',
        'text-center bg-coal-deep/30 backdrop-blur-md rounded-full',
        'border border-white/20 p-8',
        'shadow-2xl animate-pulse',
        'flex flex-col items-center justify-center',
      )}
      style={{ width: size, height: size }}
    >
      <SpindleHole size={spindleSize} />
      <div className="space-y-4 relative z-10">
        <div className="h-4 bg-white/10 rounded-full w-3/4 mx-auto" />
        <div className="h-3 bg-white/10 rounded-full w-1/2 mx-auto" />
        <div className="h-3 bg-white/10 rounded-full w-2/3 mx-auto" />
      </div>
    </div>
  );
};
