import type React from 'react';
import { StreamHealthCard } from './stream-health-card';

interface BaseStatus {
  isRunning: boolean;
  success?: boolean;
  error?: string;
  message?: string;
  status?: string;
}

interface ServiceCardTemplateProps {
  title: string;
  status: BaseStatus | undefined;
  isLoading: boolean;
  onStart: () => void;
  onStop: () => void;
  onRestart?: () => void;
  showRestart?: boolean;
  isStarting?: boolean;
  isStopping?: boolean;
  isRestarting?: boolean;
  healthData?: StreamHealth;
  statusMessage?: string;
}

const getStatusMessage = (
  status: BaseStatus | undefined,
  customMessage?: string,
): string => {
  if (customMessage) return customMessage;
  if (!status) return 'Service status unknown';
  if (!status.isRunning) return 'Service is stopped';
  if (status.message) return status.message;
  if (status.status) return status.status;
  return 'Service is running';
};

export const ServiceCardTemplate: React.FC<ServiceCardTemplateProps> = ({
  title,
  status,
  isLoading,
  onStart,
  onStop,
  onRestart,
  showRestart = false,
  isStarting = false,
  isStopping = false,
  isRestarting = false,
  healthData,
  statusMessage,
}) => {
  const hasHealthData = healthData !== undefined;
  const displayMessage = getStatusMessage(status, statusMessage);

  return (
    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <div className="flex items-center gap-2">
          {hasHealthData && healthData.isConnected && status?.isRunning && (
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          )}
          <span
            className={`px-2 py-1 rounded text-sm font-medium ${
              status?.isRunning
                ? 'bg-green-500/20 text-green-400'
                : 'bg-gray-500/20 text-gray-400'
            }`}
          >
            {status?.isRunning ? 'Running' : 'Stopped'}
          </span>
        </div>
      </div>

      <div className="mb-3 text-sm text-gray-400">
        {status?.error && (
          <div className="text-red-400">Error: {status.error}</div>
        )}
        {!status?.error && <div>{displayMessage}</div>}
      </div>

      {hasHealthData && (
        <StreamHealthCard
          health={healthData}
          isVisible={true}
          title="Stream Health"
        />
      )}

      <div className="flex gap-2 flex-wrap">
        <button
          type="button"
          onClick={onStart}
          className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/40 rounded hover:bg-green-500/30 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          disabled={status?.isRunning || isLoading || isStarting}
        >
          {isStarting && (
            <div className="w-3 h-3 border border-green-400/30 border-t-green-400 rounded-full animate-spin" />
          )}
          {isStarting ? 'Starting...' : 'Start'}
        </button>
        <button
          type="button"
          onClick={onStop}
          className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/40 rounded hover:bg-red-500/30 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          disabled={!status?.isRunning || isLoading || isStopping}
        >
          {isStopping && (
            <div className="w-3 h-3 border border-red-400/30 border-t-red-400 rounded-full animate-spin" />
          )}
          {isStopping ? 'Stopping...' : 'Stop'}
        </button>
        {showRestart && onRestart && (
          <button
            type="button"
            onClick={onRestart}
            className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/40 rounded hover:bg-blue-500/30 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            disabled={isLoading || isRestarting}
          >
            {isRestarting && (
              <div className="w-3 h-3 border border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
            )}
            {isRestarting ? 'Restarting...' : 'Restart'}
          </button>
        )}
      </div>
    </div>
  );
};
