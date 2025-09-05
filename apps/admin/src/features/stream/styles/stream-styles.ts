export const streamStyles = {
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
