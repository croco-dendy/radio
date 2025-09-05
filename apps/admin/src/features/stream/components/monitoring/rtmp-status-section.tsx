import type React from 'react';

interface RtmpStatusSectionProps {
  rtmpStats: RtmpStats | null;
  websiteStats: WebsiteStats | null;
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

export const RtmpStatusSection: React.FC<RtmpStatusSectionProps> = ({
  rtmpStats,
  websiteStats,
}) => (
  <div className="bg-green-500/10 rounded-lg p-2 border border-green-500/20 mt-3">
    <div className="text-xs font-medium text-green-400 mb-1">RTMP Status</div>
    <div className="space-y-1">
      {rtmpStats?.isRunning ? (
        <>
          <StatusMessage
            icon="✅"
            message="RTMP server is running and accepting connections"
            colorClass="text-green-300"
          />
          {rtmpStats.activePublishers > 0 ? (
            <StatusMessage
              icon="📡"
              message={`${rtmpStats.activePublishers} active publisher${rtmpStats.activePublishers > 1 ? 's' : ''} connected`}
              colorClass="text-green-300"
            />
          ) : (
            <StatusMessage
              icon="⏳"
              message="Waiting for publishers to connect"
              colorClass="text-yellow-300"
            />
          )}
          {websiteStats && websiteStats.activeViewers > 0 && (
            <StatusMessage
              icon="👥"
              message={`${websiteStats.activeViewers} viewer${websiteStats.activeViewers > 1 ? 's' : ''} watching via HLS`}
              colorClass="text-blue-300"
            />
          )}
        </>
      ) : (
        <>
          <StatusMessage
            icon="❌"
            message="RTMP server is offline"
            colorClass="text-red-300"
          />
          <StatusMessage
            icon="•"
            message="Start RTMP server to begin streaming"
            colorClass="text-gray-400"
          />
          <StatusMessage
            icon="•"
            message="Check Docker container status"
            colorClass="text-gray-400"
          />
        </>
      )}
    </div>
  </div>
);
