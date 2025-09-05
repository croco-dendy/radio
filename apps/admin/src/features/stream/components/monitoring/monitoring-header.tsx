import type React from 'react';
import type { TelegramHealth } from '@/services/streaming/types';

interface MonitoringHeaderProps {
  telegramHealth: TelegramHealth | null;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

export const MonitoringHeader: React.FC<MonitoringHeaderProps> = ({
  telegramHealth,
  isLoading,
  error,
  onRetry,
}) => {
  const isHealthy =
    telegramHealth?.isConnected &&
    telegramHealth?.streamingStats.connectionErrors === 0;

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-medium text-white">Stream Monitoring</h3>
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              isHealthy
                ? 'bg-green-400 animate-pulse'
                : telegramHealth
                  ? 'bg-yellow-400'
                  : 'bg-gray-400'
            }`}
          />
          <span className="text-xs text-gray-400">
            Updated {isLoading ? 'now' : '5s ago'}
          </span>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded">
          <div className="text-red-400 text-sm">❌ {error}</div>
          <button
            type="button"
            onClick={onRetry}
            className="mt-2 text-xs text-red-300 hover:text-red-200 underline"
          >
            Retry
          </button>
        </div>
      )}
    </>
  );
};
