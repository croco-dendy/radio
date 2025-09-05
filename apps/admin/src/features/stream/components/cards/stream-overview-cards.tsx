import type React from 'react';
import type {
  RtmpStats,
  WebsiteStats,
  TelegramHealth,
  StreamHealth,
} from '@/services/streaming/types';

interface StreamOverviewCardsProps {
  rtmpRunning: boolean;
  telegramRunning: boolean;
  rtmpStats: RtmpStats | null;
  websiteStats: WebsiteStats | null;
  telegramHealth: TelegramHealth | null;
  streamHealth?: StreamHealth;
}

const LiveStreamCard: React.FC<{
  rtmpRunning: boolean;
  rtmpStats: RtmpStats | null;
}> = ({ rtmpRunning, rtmpStats }) => (
  <div
    className={`bg-gradient-to-br rounded-lg p-3 border ${
      rtmpRunning && rtmpStats?.isRunning
        ? 'from-green-500/10 to-green-600/5 border-green-500/20'
        : 'from-gray-500/10 to-gray-600/5 border-gray-500/20'
    }`}
  >
    <div className="flex items-center gap-2 mb-2">
      <div
        className={`w-3 h-3 rounded-full ${
          rtmpRunning && rtmpStats?.isRunning
            ? 'bg-green-400 animate-pulse'
            : 'bg-gray-400'
        }`}
      />
      <span
        className={`font-medium text-sm ${
          rtmpRunning && rtmpStats?.isRunning
            ? 'text-green-400'
            : 'text-gray-400'
        }`}
      >
        LIVE STREAM
      </span>
    </div>
    <div className="text-2xl font-bold text-white mb-1">
      {rtmpStats?.activePublishers || 0}
    </div>
    <div className="text-xs text-gray-400">Active Publishers</div>
    <div
      className={`text-xs mt-1 ${
        rtmpRunning && rtmpStats?.isRunning ? 'text-green-300' : 'text-gray-500'
      }`}
    >
      {rtmpStats?.isRunning
        ? `Uptime: ${rtmpStats.uptime}`
        : 'RTMP Server Offline'}
    </div>
  </div>
);

const WebsiteCard: React.FC<{
  rtmpRunning: boolean;
  rtmpStats: RtmpStats | null;
  websiteStats: WebsiteStats | null;
}> = ({ rtmpRunning, rtmpStats, websiteStats }) => (
  <div
    className={`bg-gradient-to-br rounded-lg p-3 border ${
      rtmpRunning && rtmpStats?.isRunning
        ? 'from-blue-500/10 to-blue-600/5 border-blue-500/20'
        : 'from-gray-500/10 to-gray-600/5 border-gray-500/20'
    }`}
  >
    <div className="flex items-center gap-2 mb-2">
      <span
        className={
          rtmpRunning && rtmpStats?.isRunning
            ? 'text-blue-400'
            : 'text-gray-400'
        }
      >
        🌐
      </span>
      <span
        className={`font-medium text-sm ${
          rtmpRunning && rtmpStats?.isRunning
            ? 'text-blue-400'
            : 'text-gray-400'
        }`}
      >
        WEBSITE
      </span>
    </div>
    <div className="text-2xl font-bold text-white mb-1">
      {websiteStats?.activeViewers || 0}
    </div>
    <div className="text-xs text-gray-400">Active Viewers</div>
    <div
      className={`text-xs mt-1 ${
        rtmpRunning && rtmpStats?.isRunning ? 'text-blue-300' : 'text-gray-500'
      }`}
    >
      {websiteStats?.bandwidth || '0 kbps'}
    </div>
  </div>
);

const TelegramCard: React.FC<{
  telegramRunning: boolean;
  telegramHealth: TelegramHealth | null;
  streamHealth?: StreamHealth;
}> = ({ telegramRunning, telegramHealth, streamHealth }) => (
  <div
    className={`bg-gradient-to-br rounded-lg p-3 border ${
      telegramHealth?.isConnected
        ? 'from-purple-500/10 to-purple-600/5 border-purple-500/20'
        : telegramRunning
          ? 'from-yellow-500/10 to-yellow-600/5 border-yellow-500/20'
          : 'from-gray-500/10 to-gray-600/5 border-gray-500/20'
    }`}
  >
    <div className="flex items-center gap-2 mb-2">
      <span
        className={
          telegramHealth?.isConnected
            ? 'text-purple-400'
            : telegramRunning
              ? 'text-yellow-400'
              : 'text-gray-400'
        }
      >
        📺
      </span>
      <span
        className={`font-medium text-sm ${
          telegramHealth?.isConnected
            ? 'text-purple-400'
            : telegramRunning
              ? 'text-yellow-400'
              : 'text-gray-400'
        }`}
      >
        TELEGRAM
      </span>
    </div>
    <div className="text-2xl font-bold text-white mb-1">
      {telegramHealth?.streamingStats.totalFramesSent.toLocaleString() ||
        streamHealth?.totalFramesSent.toLocaleString() ||
        '0'}
    </div>
    <div className="text-xs text-gray-400">Frames Sent</div>
    <div
      className={`text-xs mt-1 ${
        telegramHealth?.isConnected
          ? 'text-purple-300'
          : telegramRunning
            ? 'text-yellow-300'
            : 'text-gray-500'
      }`}
    >
      {telegramHealth?.isConnected
        ? 'Connected'
        : telegramRunning
          ? 'Waiting for stream'
          : 'Telegram Stream Stopped'}
    </div>
  </div>
);

export const StreamOverviewCards: React.FC<StreamOverviewCardsProps> = ({
  rtmpRunning,
  telegramRunning,
  rtmpStats,
  websiteStats,
  telegramHealth,
  streamHealth,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
    <LiveStreamCard rtmpRunning={rtmpRunning} rtmpStats={rtmpStats} />
    <WebsiteCard
      rtmpRunning={rtmpRunning}
      rtmpStats={rtmpStats}
      websiteStats={websiteStats}
    />
    <TelegramCard
      telegramRunning={telegramRunning}
      telegramHealth={telegramHealth}
      streamHealth={streamHealth}
    />
  </div>
);
