import type React from 'react';

interface TelegramStatusSectionProps {
  telegramHealth: TelegramHealth | null;
  telegramRunning: boolean;
}

const StatusMessage: React.FC<{
  icon: string;
  message: string;
  colorClass: string;
}> = ({ icon, message, colorClass }) => (
  <div className={`flex items-center gap-2 text-xs ${colorClass}`}>
    <span className={colorClass.replace('text-', 'text-').split(' ')[0]}>
      {icon}
    </span>
    <span>{message}</span>
  </div>
);

export const TelegramStatusSection: React.FC<TelegramStatusSectionProps> = ({
  telegramHealth,
  telegramRunning,
}) => (
  <div className="bg-purple-500/10 rounded-lg p-2 border border-purple-500/20 mt-3">
    <div className="text-xs font-medium text-purple-400 mb-1">
      Telegram Status
    </div>
    <div className="space-y-1">
      {telegramHealth?.isConnected ? (
        <>
          <StatusMessage
            icon="✅"
            message="Connected to Telegram RTMP server"
            colorClass="text-purple-300"
          />
          <StatusMessage
            icon="📺"
            message={`Streaming ${telegramHealth.streamingStats.totalFramesSent.toLocaleString()} frames sent`}
            colorClass="text-purple-300"
          />
          {telegramHealth.streamingStats.connectionErrors === 0 ? (
            <StatusMessage
              icon="🟢"
              message="No connection errors detected"
              colorClass="text-green-300"
            />
          ) : (
            <StatusMessage
              icon="⚠️"
              message={`${telegramHealth.streamingStats.connectionErrors} connection error${telegramHealth.streamingStats.connectionErrors > 1 ? 's' : ''}`}
              colorClass="text-yellow-300"
            />
          )}
        </>
      ) : telegramRunning ? (
        <>
          <StatusMessage
            icon="⏳"
            message="Telegram daemon running, waiting for connection"
            colorClass="text-yellow-300"
          />
          <StatusMessage
            icon="•"
            message="Check RTMP input stream availability"
            colorClass="text-gray-400"
          />
          <StatusMessage
            icon="•"
            message="Verify Telegram stream key and URL"
            colorClass="text-gray-400"
          />
        </>
      ) : (
        <>
          <StatusMessage
            icon="❌"
            message="Telegram stream daemon is stopped"
            colorClass="text-red-300"
          />
          <StatusMessage
            icon="•"
            message="Start Telegram stream to begin broadcasting"
            colorClass="text-gray-400"
          />
          <StatusMessage
            icon="•"
            message="Ensure RTMP server is running first"
            colorClass="text-gray-400"
          />
        </>
      )}
    </div>
  </div>
);
