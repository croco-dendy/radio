import {
  useMonitoringData,
  useStartTelegramStream,
  useStopTelegramStream,
  useRestartTelegramStream,
  useStartRtmpServer,
  useStopRtmpServer,
  useRestartRtmpServer,
  useTelegramConfig,
} from '@/services/api';

const MonitoringExample = () => {
  const {
    data: monitoring,
    isLoading: monitoringLoading,
    error: monitoringError,
  } = useMonitoringData(); // Single request for all monitoring data
  const { data: telegramConfig } = useTelegramConfig();

  // Extract what we need from the monitoring data
  const telegramStats = monitoring?.services.telegram;
  const rtmpStats = monitoring?.services.rtmp;

  const startTelegram = useStartTelegramStream();
  const stopTelegram = useStopTelegramStream();
  const restartTelegram = useRestartTelegramStream();
  const startRtmp = useStartRtmpServer();
  const stopRtmp = useStopRtmpServer();
  const restartRtmp = useRestartRtmpServer();

  const handleStartTelegram = () => {
    startTelegram.mutate();
  };

  const handleStopTelegram = () => {
    stopTelegram.mutate();
  };

  const handleRestartTelegram = () => {
    restartTelegram.mutate();
  };

  const handleStartRtmp = () => {
    startRtmp.mutate();
  };

  const handleStopRtmp = () => {
    stopRtmp.mutate();
  };

  const handleRestartRtmp = () => {
    restartRtmp.mutate();
  };

  if (monitoringLoading) {
    return <div>Loading monitoring data...</div>;
  }

  if (monitoringError) {
    return <div>Error loading monitoring data: {monitoringError.message}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">System Monitoring</h2>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Telegram Service</h3>
          <p>Status: {telegramStats?.isRunning ? 'Running' : 'Stopped'}</p>
          <p>FFmpeg: {telegramStats?.ffmpegRunning ? 'Running' : 'Stopped'}</p>
          {telegramStats?.pm2Status && (
            <div className="mt-2">
              <p>CPU: {telegramStats.pm2Status.cpu}%</p>
              <p>
                Memory:{' '}
                {(telegramStats.pm2Status.memory / 1024 / 1024).toFixed(1)} MB
              </p>
            </div>
          )}

          <div className="mt-4 space-x-2">
            <button
              onClick={handleStartTelegram}
              disabled={startTelegram.isPending || telegramStats?.isRunning}
              className="px-3 py-1 bg-green-500 text-white rounded disabled:opacity-50"
            >
              Start
            </button>
            <button
              onClick={handleStopTelegram}
              disabled={stopTelegram.isPending || !telegramStats?.isRunning}
              className="px-3 py-1 bg-red-500 text-white rounded disabled:opacity-50"
            >
              Stop
            </button>
            <button
              onClick={handleRestartTelegram}
              disabled={restartTelegram.isPending}
              className="px-3 py-1 bg-yellow-500 text-white rounded disabled:opacity-50"
            >
              Restart
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">RTMP Server</h3>
          <p>Status: {rtmpStats?.isRunning ? 'Running' : 'Stopped'}</p>
          <p>Container: {rtmpStats?.containerName}</p>
          {rtmpStats?.stats?.container && (
            <div className="mt-2">
              <p>CPU: {rtmpStats.stats.container.cpuPercent}%</p>
              <p>Memory: {rtmpStats.stats.container.memoryPercent}%</p>
            </div>
          )}

          <div className="mt-4 space-x-2">
            <button
              onClick={handleStartRtmp}
              disabled={startRtmp.isPending || rtmpStats?.isRunning}
              className="px-3 py-1 bg-green-500 text-white rounded disabled:opacity-50"
            >
              Start
            </button>
            <button
              onClick={handleStopRtmp}
              disabled={stopRtmp.isPending || !rtmpStats?.isRunning}
              className="px-3 py-1 bg-red-500 text-white rounded disabled:opacity-50"
            >
              Stop
            </button>
            <button
              onClick={handleRestartRtmp}
              disabled={restartRtmp.isPending}
              className="px-3 py-1 bg-yellow-500 text-white rounded disabled:opacity-50"
            >
              Restart
            </button>
          </div>
        </div>
      </div>

      {/* Telegram Config */}
      {telegramConfig && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Telegram Configuration</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>
                <strong>RTMP URL:</strong> {telegramConfig.rtmpUrl}
              </p>
              <p>
                <strong>Input URL:</strong> {telegramConfig.inputUrl}
              </p>
            </div>
            <div>
              <p>
                <strong>Quality:</strong> {telegramConfig.quality}
              </p>
              <p>
                <strong>Audio Bitrate:</strong> {telegramConfig.audioBitrate}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonitoringExample;
