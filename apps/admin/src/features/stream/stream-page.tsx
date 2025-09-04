import type React from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import { useStream } from './hooks/useStream';

export const StreamPage: React.FC = () => {
  const {
    status,
    mode,
    tracks,
    nowPlaying,
    telegramStreamStatus,
    rtmpServerStatus,
    isLoading,
    error,
    setMode,
    startStream,
    stopStream,
    skipTrack,
    addTrack,
    deleteTrack,
    startTelegramStream,
    stopTelegramStream,
    startRtmpServer,
    stopRtmpServer,
    restartRtmpServer,
  } = useStream();

  const [showAddTrack, setShowAddTrack] = useState(false);
  const [newTrack, setNewTrack] = useState({ url: '', title: '', duration: 0 });

  const handleAddTrack = async () => {
    if (newTrack.url && newTrack.title) {
      await addTrack(newTrack);
      setNewTrack({ url: '', title: '', duration: 0 });
      setShowAddTrack(false);
    }
  };

  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.content)}>
        <h1 className={clsx(styles.title)}>Stream Control</h1>

        {/* Status Card */}
        <div className={clsx(styles.statusCard)}>
          <div className={clsx(styles.statusHeader)}>
            <h2 className={clsx(styles.statusTitle)}>Stream Status</h2>
            <div
              className={clsx(
                styles.statusIndicator,
                status?.isActive ? styles.statusActive : styles.statusInactive,
              )}
            >
              {status?.isActive ? 'LIVE' : 'OFFLINE'}
            </div>
          </div>

          <div className={clsx(styles.statusInfo)}>
            <div className={clsx(styles.statusItem)}>
              <span className={clsx(styles.statusLabel)}>Mode:</span>
              <span className={clsx(styles.statusValue)}>{mode}</span>
            </div>
            <div className={clsx(styles.statusItem)}>
              <span className={clsx(styles.statusLabel)}>Listeners:</span>
              <span className={clsx(styles.statusValue)}>
                {status?.listeners || 0}
              </span>
            </div>
            {status?.uptime && (
              <div className={clsx(styles.statusItem)}>
                <span className={clsx(styles.statusLabel)}>Uptime:</span>
                <span className={clsx(styles.statusValue)}>
                  {Math.floor(status.uptime / 1000 / 60)}m{' '}
                  {Math.floor((status.uptime / 1000) % 60)}s
                </span>
              </div>
            )}
            {status?.rtmpStatus && (
              <div className={clsx(styles.statusItem)}>
                <span className={clsx(styles.statusLabel)}>RTMP Server:</span>
                <span
                  className={clsx(
                    styles.statusValue,
                    status.rtmpStatus.isRunning
                      ? 'text-ember'
                      : 'text-paper-calm',
                  )}
                >
                  {status.rtmpStatus.isRunning ? 'Running' : 'Offline'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Mode Selection */}
        <div className={clsx(styles.modeCard)}>
          <h2 className={clsx(styles.cardTitle)}>Stream Mode</h2>
          <div className={clsx(styles.modeButtons)}>
            <button
              type="button"
              onClick={() => setMode('live')}
              className={clsx(
                styles.modeButton,
                mode === 'live'
                  ? styles.modeButtonActive
                  : styles.modeButtonInactive,
              )}
            >
              <div className={clsx(styles.modeIcon)}>🔴</div>
              <div className={clsx(styles.modeInfo)}>
                <div className={clsx(styles.modeName)}>Live</div>
                <div className={clsx(styles.modeDescription)}>
                  OBS streaming to RTMP
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setMode('radio')}
              className={clsx(
                styles.modeButton,
                mode === 'radio'
                  ? styles.modeButtonActive
                  : styles.modeButtonInactive,
              )}
            >
              <div className={clsx(styles.modeIcon)}>📻</div>
              <div className={clsx(styles.modeInfo)}>
                <div className={clsx(styles.modeName)}>Radio</div>
                <div className={clsx(styles.modeDescription)}>
                  Playlist streaming
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Control Buttons */}
        <div className={clsx(styles.controlCard)}>
          <h2 className={clsx(styles.cardTitle)}>Stream Controls</h2>
          <div className={clsx(styles.controlButtons)}>
            <button
              type="button"
              onClick={startStream}
              disabled={status?.isActive || isLoading}
              className={clsx(styles.controlButton, styles.controlButtonStart)}
            >
              ▶️ Start Stream
            </button>

            <button
              type="button"
              onClick={stopStream}
              disabled={!status?.isActive || isLoading}
              className={clsx(styles.controlButton, styles.controlButtonStop)}
            >
              ⏹️ Stop Stream
            </button>

            {mode === 'radio' && (
              <button
                type="button"
                onClick={skipTrack}
                disabled={!status?.isActive || isLoading}
                className={clsx(styles.controlButton, styles.controlButtonSkip)}
              >
                ⏭️ Skip Track
              </button>
            )}
          </div>
        </div>

        {/* RTMP Server Management */}
        <div className={clsx(styles.serviceCard)}>
          <h2 className={clsx(styles.cardTitle)}>RTMP Server</h2>
          <div className={clsx(styles.telegramSection)}>
            <div className={clsx(styles.telegramStatus)}>
              <div className={clsx(styles.telegramHeader)}>
                <h3 className={clsx(styles.serviceName)}>Status</h3>
                <div
                  className={clsx(
                    styles.serviceStatus,
                    rtmpServerStatus?.isRunning
                      ? styles.serviceRunning
                      : styles.serviceStopped,
                  )}
                >
                  {rtmpServerStatus?.isRunning ? 'Running' : 'Stopped'}
                </div>
              </div>
              {rtmpServerStatus?.status && (
                <div className={clsx(styles.serviceDetails)}>
                  {rtmpServerStatus.status}
                </div>
              )}
              {rtmpServerStatus?.error && (
                <div className={clsx(styles.serviceDetails, 'text-red-500')}>
                  Error: {rtmpServerStatus.error}
                </div>
              )}
            </div>

            <div className={clsx(styles.telegramControls)}>
              <button
                type="button"
                onClick={startRtmpServer}
                className={clsx(styles.telegramButton, styles.telegramStart)}
                disabled={rtmpServerStatus?.isRunning || isLoading}
              >
                ▶️ Start RTMP Server
              </button>
              <button
                type="button"
                onClick={stopRtmpServer}
                className={clsx(styles.telegramButton, styles.telegramStop)}
                disabled={!rtmpServerStatus?.isRunning || isLoading}
              >
                ⏹️ Stop RTMP Server
              </button>
              <button
                type="button"
                onClick={restartRtmpServer}
                className={clsx(styles.telegramButton, styles.telegramStart)}
                disabled={isLoading}
              >
                🔄 Restart RTMP Server
              </button>
            </div>
          </div>
        </div>

        {/* Telegram Stream Management */}
        <div className={clsx(styles.serviceCard)}>
          <h2 className={clsx(styles.cardTitle)}>Telegram Stream</h2>
          <div className={clsx(styles.telegramSection)}>
            <div className={clsx(styles.telegramStatus)}>
              <div className={clsx(styles.telegramHeader)}>
                <h3 className={clsx(styles.serviceName)}>Status</h3>
                <div
                  className={clsx(
                    styles.serviceStatus,
                    telegramStreamStatus?.isRunning
                      ? styles.serviceRunning
                      : styles.serviceStopped,
                  )}
                >
                  {telegramStreamStatus?.isRunning ? 'Running' : 'Stopped'}
                </div>
              </div>
              {telegramStreamStatus?.message && (
                <div className={clsx(styles.serviceDetails)}>
                  {telegramStreamStatus.message}
                </div>
              )}
            </div>

            <div className={clsx(styles.telegramControls)}>
              <button
                type="button"
                onClick={startTelegramStream}
                className={clsx(styles.telegramButton, styles.telegramStart)}
                disabled={telegramStreamStatus?.isRunning || isLoading}
              >
                ▶️ Start Telegram Stream
              </button>
              <button
                type="button"
                onClick={stopTelegramStream}
                className={clsx(styles.telegramButton, styles.telegramStop)}
                disabled={!telegramStreamStatus?.isRunning || isLoading}
              >
                ⏹️ Stop Telegram Stream
              </button>
            </div>
          </div>
        </div>

        {/* Now Playing */}
        {nowPlaying?.track && (
          <div className={clsx(styles.nowPlayingCard)}>
            <h2 className={clsx(styles.cardTitle)}>Now Playing</h2>
            <div className={clsx(styles.nowPlayingInfo)}>
              <div className={clsx(styles.trackTitle)}>
                {nowPlaying.track.title}
              </div>
              <div className={clsx(styles.trackUrl)}>
                {nowPlaying.track.url}
              </div>
              {nowPlaying.duration > 0 && (
                <div className={clsx(styles.trackProgress)}>
                  <div className={clsx(styles.progressBar)}>
                    <div
                      className={clsx(styles.progressFill)}
                      style={{
                        width: `${(nowPlaying.position / nowPlaying.duration) * 100}%`,
                      }}
                    />
                  </div>
                  <div className={clsx(styles.progressTime)}>
                    {Math.floor(nowPlaying.position / 60)}:
                    {(Math.floor(nowPlaying.position) % 60)
                      .toString()
                      .padStart(2, '0')}{' '}
                    /{Math.floor(nowPlaying.duration / 60)}:
                    {(Math.floor(nowPlaying.duration) % 60)
                      .toString()
                      .padStart(2, '0')}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Audio Tracks */}
        <div className={clsx(styles.tracksCard)}>
          <div className={clsx(styles.tracksHeader)}>
            <h2 className={clsx(styles.cardTitle)}>Audio Tracks</h2>
            <button
              type="button"
              onClick={() => setShowAddTrack(!showAddTrack)}
              className={clsx(styles.addButton)}
            >
              ➕ Add Track
            </button>
          </div>

          {showAddTrack && (
            <div className={clsx(styles.addTrackForm)}>
              <input
                type="text"
                placeholder="Track URL"
                value={newTrack.url}
                onChange={(e) =>
                  setNewTrack({ ...newTrack, url: e.target.value })
                }
                className={clsx(styles.input)}
              />
              <input
                type="text"
                placeholder="Track Title"
                value={newTrack.title}
                onChange={(e) =>
                  setNewTrack({ ...newTrack, title: e.target.value })
                }
                className={clsx(styles.input)}
              />
              <input
                type="number"
                placeholder="Duration (seconds)"
                value={newTrack.duration || ''}
                onChange={(e) =>
                  setNewTrack({
                    ...newTrack,
                    duration: Number.parseInt(e.target.value) || 0,
                  })
                }
                className={clsx(styles.input)}
              />
              <div className={clsx(styles.formButtons)}>
                <button
                  type="button"
                  onClick={handleAddTrack}
                  className={clsx(styles.saveButton)}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddTrack(false)}
                  className={clsx(styles.cancelButton)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className={clsx(styles.tracksList)}>
            {tracks.map((track) => (
              <div key={track.id} className={clsx(styles.trackItem)}>
                <div className={clsx(styles.trackInfo)}>
                  <div className={clsx(styles.trackTitle)}>{track.title}</div>
                  <div className={clsx(styles.trackUrl)}>{track.url}</div>
                  {track.duration && (
                    <div className={clsx(styles.trackDuration)}>
                      {Math.floor(track.duration / 60)}:
                      {(track.duration % 60).toString().padStart(2, '0')}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => deleteTrack(track.id)}
                  className={clsx(styles.deleteButton)}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className={clsx(styles.errorCard)}>
            <h3 className={clsx(styles.errorTitle)}>Error</h3>
            <p className={clsx(styles.errorMessage)}>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: ['w-full h-full p-8 overflow-auto'],
  content: ['max-w-4xl mx-auto space-y-6'],
  title: ['text-3xl font-bold text-sun mb-8'],

  // Status Card
  statusCard: [
    'bg-coal-deep/50 backdrop-blur-md rounded-xl p-6 border border-white/20',
  ],
  statusHeader: ['flex items-center justify-between mb-4'],
  statusTitle: ['text-xl font-semibold text-paper-fog'],
  statusIndicator: ['px-3 py-1 rounded-full text-sm font-bold'],
  statusActive: ['bg-ember/20 text-ember border border-ember/40'],
  statusInactive: [
    'bg-paper-calm/20 text-paper-calm border border-paper-calm/40',
  ],
  statusInfo: ['space-y-2'],
  statusItem: ['flex justify-between'],
  statusLabel: ['text-paper-calm'],
  statusValue: ['text-paper-fog font-medium'],

  // Mode Card
  modeCard: [
    'bg-coal-deep/50 backdrop-blur-md rounded-xl p-6 border border-white/20',
  ],
  cardTitle: ['text-xl font-semibold text-paper-fog mb-4'],
  modeButtons: ['grid grid-cols-1 md:grid-cols-2 gap-4'],
  modeButton: [
    'flex items-center p-4 rounded-lg border transition-all duration-300',
  ],
  modeButtonActive: ['bg-ember/20 border-ember/40 text-ember'],
  modeButtonInactive: [
    'bg-white/5 border-white/20 text-paper-calm hover:bg-white/10',
  ],
  modeIcon: ['text-2xl mr-4'],
  modeInfo: ['flex-1'],
  modeName: ['font-semibold text-lg'],
  modeDescription: ['text-sm opacity-75'],

  // Control Card
  controlCard: [
    'bg-coal-deep/50 backdrop-blur-md rounded-xl p-6 border border-white/20',
  ],
  controlButtons: ['flex flex-wrap gap-4'],
  controlButton: [
    'px-6 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  controlButtonStart: [
    'bg-ember/20 text-ember border border-ember/40 hover:bg-ember/30',
  ],
  controlButtonStop: [
    'bg-paper-calm/20 text-paper-calm border border-paper-calm/40 hover:bg-paper-calm/30',
  ],
  controlButtonSkip: [
    'bg-sun/20 text-sun border border-sun/40 hover:bg-sun/30',
  ],

  // Service Status Card
  serviceCard: [
    'bg-coal-deep/50 backdrop-blur-md rounded-xl p-6 border border-white/20',
  ],
  telegramSection: ['space-y-4'],
  telegramStatus: ['p-4 bg-white/5 rounded-lg border border-white/10'],
  telegramHeader: ['flex items-center justify-between mb-2'],
  telegramControls: ['flex gap-4'],
  telegramButton: [
    'px-4 py-2 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  telegramStart: [
    'bg-ember/20 text-ember border border-ember/40 hover:bg-ember/30',
  ],
  telegramStop: [
    'bg-paper-calm/20 text-paper-calm border border-paper-calm/40 hover:bg-paper-calm/30',
  ],
  serviceName: ['text-lg font-semibold text-paper-fog'],
  serviceStatus: ['px-2 py-1 rounded-full text-sm font-bold'],
  serviceRunning: ['bg-ember/20 text-ember border border-ember/40'],
  serviceStopped: [
    'bg-paper-calm/20 text-paper-calm border border-paper-calm/40',
  ],
  serviceDetails: ['text-sm text-paper-calm'],

  // Now Playing Card
  nowPlayingCard: [
    'bg-coal-deep/50 backdrop-blur-md rounded-xl p-6 border border-white/20',
  ],
  nowPlayingInfo: ['space-y-3'],
  trackTitle: ['text-lg font-semibold text-paper-fog'],
  trackUrl: ['text-sm text-paper-calm break-all'],
  trackProgress: ['space-y-2'],
  progressBar: ['w-full h-2 bg-white/10 rounded-full overflow-hidden'],
  progressFill: ['h-full bg-ember/60 transition-all duration-300'],
  progressTime: ['text-sm text-paper-calm text-center'],

  // Tracks Card
  tracksCard: [
    'bg-coal-deep/50 backdrop-blur-md rounded-xl p-6 border border-white/20',
  ],
  tracksHeader: ['flex items-center justify-between mb-4'],
  addButton: [
    'px-4 py-2 bg-ember/20 text-ember border border-ember/40 rounded-lg hover:bg-ember/30 transition-all duration-300',
  ],
  addTrackForm: [
    'space-y-4 p-4 bg-white/5 rounded-lg border border-white/10 mb-4',
  ],
  input: [
    'w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-paper-fog placeholder-paper-calm focus:outline-none focus:border-ember/40',
  ],
  formButtons: ['flex gap-2'],
  saveButton: [
    'px-4 py-2 bg-ember/20 text-ember border border-ember/40 rounded-lg hover:bg-ember/30 transition-all duration-300',
  ],
  cancelButton: [
    'px-4 py-2 bg-paper-calm/20 text-paper-calm border border-paper-calm/40 rounded-lg hover:bg-paper-calm/30 transition-all duration-300',
  ],
  tracksList: ['space-y-3'],
  trackItem: [
    'flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10',
  ],
  trackInfo: ['flex-1'],
  trackDuration: ['text-sm text-paper-calm'],
  deleteButton: [
    'p-2 text-paper-calm hover:text-ember transition-colors duration-300',
  ],

  // Error Card
  errorCard: ['bg-ember/10 border border-ember/40 rounded-xl p-4'],
  errorTitle: ['text-ember font-semibold mb-2'],
  errorMessage: ['text-ember/80'],
} as const;
