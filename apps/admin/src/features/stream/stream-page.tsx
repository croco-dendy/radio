import type React from 'react';
import clsx from 'clsx';
import {
  RtmpServiceCard,
  TelegramServiceCard,
  StreamMonitoring,
  ErrorCard,
} from './components';
import { useStreamingStatus, useTelegramStream, useRtmpServer } from './hooks';

export const StreamPage: React.FC = () => {
  const streamingStatus = useStreamingStatus();
  const telegramStream = useTelegramStream();
  const rtmpServer = useRtmpServer();

  const isLoading =
    streamingStatus.isLoading ||
    telegramStream.isLoading ||
    rtmpServer.isLoading;

  const error =
    streamingStatus.error || telegramStream.error || rtmpServer.error;

  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.content)}>
        <h1 className={clsx(styles.title)}>Stream Control</h1>

        <div className={clsx(styles.grid)}>
          <RtmpServiceCard
            title="RTMP Server"
            status={rtmpServer.rtmpServerStatus}
            isLoading={isLoading}
            onStart={rtmpServer.startRtmpServer}
            onStop={rtmpServer.stopRtmpServer}
            onRestart={rtmpServer.restartRtmpServer}
            showRestart
            isStarting={rtmpServer.isStarting}
            isStopping={rtmpServer.isStopping}
            isRestarting={rtmpServer.isRestarting}
            rtmpStats={rtmpServer.rtmpStats}
          />

          <TelegramServiceCard
            status={telegramStream.telegramStreamStatus}
            isLoading={isLoading}
            onStart={telegramStream.startTelegramStream}
            onStop={telegramStream.stopTelegramStream}
            onRestart={telegramStream.restartTelegramStream}
            isStarting={telegramStream.isStarting}
            isStopping={telegramStream.isStopping}
            isRestarting={telegramStream.isRestarting}
          />
        </div>

        <StreamMonitoring
          telegramRunning={
            telegramStream.telegramStreamStatus?.isRunning || false
          }
          rtmpRunning={rtmpServer.rtmpServerStatus?.isRunning || false}
          streamHealth={
            telegramStream.telegramStreamStatus?.pm2Status?.daemonStatus
              ?.streamHealth
          }
        />

        <ErrorCard error={error} />
      </div>
    </div>
  );
};

const styles = {
  container: ['w-full h-full p-3 overflow-auto pb-24'],
  content: ['max-w-6xl mx-auto space-y-3'],
  title: ['text-xl font-bold text-white mb-4'],
  grid: ['grid grid-cols-1 lg:grid-cols-2 gap-3'],
} as const;
