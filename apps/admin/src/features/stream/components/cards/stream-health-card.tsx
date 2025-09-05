import type React from 'react';
import type { StreamHealth } from '@/services/streaming/types';

interface StreamHealthCardProps {
  health: StreamHealth;
  isVisible: boolean;
  title?: string;
}

const formatDuration = (timestamp: string | null): string => {
  if (!timestamp) return 'Never';

  const now = new Date();
  const time = new Date(timestamp);
  const diffMs = now.getTime() - time.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ${diffMins % 60}m ago`;
  return time.toLocaleDateString();
};

export const StreamHealthCard: React.FC<StreamHealthCardProps> = ({
  health,
  isVisible,
  title = 'Stream Health',
}) => {
  if (!isVisible) return null;

  return (
    <div className="mb-4 p-3 bg-white/5 rounded border border-white/5">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-white">{title}</h4>
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            health.isConnected
              ? 'bg-green-500/20 text-green-400'
              : 'bg-yellow-500/20 text-yellow-400'
          }`}
        >
          {health.isConnected ? '🟢 Connected' : '🟡 Connecting'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <div className="text-gray-400 mb-1">Frames Sent</div>
          <div className="text-white font-mono">
            {health.totalFramesSent.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-gray-400 mb-1">Bitrate</div>
          <div className="text-white font-mono">
            {Number(health.currentBitrate) > 0
              ? `${health.currentBitrate}kbps`
              : '0kbps'}
          </div>
        </div>
        <div>
          <div className="text-gray-400 mb-1">Connection Errors</div>
          <div
            className={`font-mono ${health.connectionErrors > 0 ? 'text-red-400' : 'text-green-400'}`}
          >
            {health.connectionErrors}
          </div>
        </div>
        <div>
          <div className="text-gray-400 mb-1">Last Connected</div>
          <div className="text-white text-xs">
            {formatDuration(health.lastConnectionTime)}
          </div>
        </div>
      </div>

      {health.connectionErrors > 0 && (
        <div className="mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded">
          <div className="text-red-400 text-xs">
            ⚠️ Connection issues detected. Check network and stream key.
          </div>
        </div>
      )}
    </div>
  );
};
