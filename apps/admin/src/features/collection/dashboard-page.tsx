import clsx from 'clsx';

export const DashboardPage = () => {
  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.content)}>
        <h1 className={clsx(styles.title)}>Параметри</h1>

        <div className={clsx(styles.statsGrid)}>
          {/* Stats Cards */}
          <div className={clsx(styles.statsCard)}>
            <h3 className={clsx(styles.statsTitle)}>Total Users</h3>
            <p className={clsx(styles.statsValue)}>1,234</p>
          </div>

          <div className={clsx(styles.statsCard)}>
            <h3 className={clsx(styles.statsTitle)}>Active Sessions</h3>
            <p className={clsx(styles.statsValue)}>89</p>
          </div>

          <div className={clsx(styles.statsCard)}>
            <h3 className={clsx(styles.statsTitle)}>System Status</h3>
            <p className={clsx(styles.statsValueOnline)}>Online</p>
          </div>
        </div>

        <div className={clsx(styles.actionsSection)}>
          <h2 className={clsx(styles.actionsTitle)}>Quick Actions</h2>
          <div className={clsx(styles.actionsGrid)}>
            <button type="button" className={clsx(styles.buttonPrimary)}>
              Manage Users
            </button>
            <button type="button" className={clsx(styles.buttonSecondary)}>
              System Settings
            </button>
            <button type="button" className={clsx(styles.buttonAccent)}>
              View Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: ['w-full h-full p-8 overflow-auto'],
  content: ['mx-auto max-w-7xl'],
  title: ['mb-8 font-display text-4xl font-bold text-sun'],
  statsGrid: ['grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'],
  statsCard: [
    'rounded-lg bg-coal-deep/90 backdrop-blur-sm border border-white/10 p-6 text-paper-fog',
    'shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-coal-deep/95',
  ],
  statsTitle: ['mb-2 text-lg font-semibold text-moss'],
  statsValue: ['text-3xl font-bold'],
  statsValueOnline: ['text-3xl font-bold text-ember'],
  actionsSection: [
    'mt-8 rounded-lg bg-coal-deep/90 backdrop-blur-sm border border-white/10 p-6',
    'shadow-xl hover:shadow-2xl transition-all duration-300',
  ],
  actionsTitle: ['mb-4 text-2xl font-semibold text-paper-fog'],
  actionsGrid: ['flex flex-wrap gap-4'],
  buttonPrimary: [
    'rounded-lg bg-moss px-4 py-2 text-paper-fog transition-all duration-300',
    'hover:bg-moss-deep hover:scale-105 active:scale-95 shadow-lg',
  ],
  buttonSecondary: [
    'rounded-lg bg-river px-4 py-2 text-paper-fog transition-all duration-300',
    'hover:bg-river-deep hover:scale-105 active:scale-95 shadow-lg',
  ],
  buttonAccent: [
    'rounded-lg bg-sun px-4 py-2 text-coal transition-all duration-300',
    'hover:bg-sun-deep hover:scale-105 active:scale-95 shadow-lg',
  ],
} as const;
