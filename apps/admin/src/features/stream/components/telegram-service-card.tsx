import type React from 'react';
import type { TelegramStreamStatus } from '@/services/streaming/types';
import { ServiceCardTemplate } from './cards/service-card';

interface TelegramServiceCardProps {
  status: TelegramStreamStatus | undefined;
  isLoading: boolean;
  onStart: () => void;
  onStop: () => void;
  onRestart?: () => void;
  isStarting?: boolean;
  isStopping?: boolean;
  isRestarting?: boolean;
}

export const TelegramServiceCard: React.FC<TelegramServiceCardProps> = ({
  status,
  isLoading,
  onStart,
  onStop,
  onRestart,
  isStarting = false,
  isStopping = false,
  isRestarting = false,
}) => {
  const streamHealth = status?.pm2Status?.daemonStatus?.streamHealth;

  const getCustomMessage = (): string => {
    if (!status) return 'Telegram stream status unknown';
    if (!status.isRunning) return 'Telegram stream daemon is stopped';
    if (status.message) return status.message;
    return 'Telegram stream is running';
  };

  const handleRestart = async () => {
    if (onRestart) {
      await onRestart();
    } else {
      // Fallback: stop then start
      await onStop();
      setTimeout(() => onStart(), 1000);
    }
  };

  return (
    <ServiceCardTemplate
      title="Telegram Stream"
      status={status}
      isLoading={isLoading}
      onStart={onStart}
      onStop={onStop}
      onRestart={handleRestart}
      isStarting={isStarting}
      isStopping={isStopping}
      isRestarting={isRestarting}
      healthData={streamHealth}
      statusMessage={getCustomMessage()}
      showRestart={true}
    />
  );
};
