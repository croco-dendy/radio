import clsx from 'clsx';

export const UsersPage = () => {
  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.content)}>
        <h1 className={clsx(styles.title)}>User Management</h1>

        <div className={clsx(styles.statsGrid)}>
          {/* User Activity Stats */}
          <div className={clsx(styles.statsCard)}>
            <h3 className={clsx(styles.statsTitle)}>Active Listeners</h3>
            <p className={clsx(styles.statsValue)}>156</p>
          </div>

          <div className={clsx(styles.statsCard)}>
            <h3 className={clsx(styles.statsTitle)}>Total Users</h3>
            <p className={clsx(styles.statsValue)}>2,847</p>
          </div>

          <div className={clsx(styles.statsCard)}>
            <h3 className={clsx(styles.statsTitle)}>New This Week</h3>
            <p className={clsx(styles.statsValueOnline)}>23</p>
          </div>
        </div>

        <div className={clsx(styles.actionsSection)}>
          <h2 className={clsx(styles.actionsTitle)}>User Actions</h2>
          <div className={clsx(styles.actionsGrid)}>
            <button type="button" className={clsx(styles.buttonPrimary)}>
              View All Users
            </button>
            <button type="button" className={clsx(styles.buttonSecondary)}>
              User Analytics
            </button>
            <button type="button" className={clsx(styles.buttonAccent)}>
              Manage Permissions
            </button>
          </div>
        </div>

        <div className={clsx(styles.recentSection)}>
          <h2 className={clsx(styles.actionsTitle)}>Recent User Activity</h2>
          <div className={clsx(styles.recentList)}>
            <div className={clsx(styles.recentItem)}>
              <span className={clsx(styles.recentTitle)}>
                User "JazzLover" joined playlist
              </span>
              <span className={clsx(styles.recentMeta)}>2 minutes ago</span>
            </div>
            <div className={clsx(styles.recentItem)}>
              <span className={clsx(styles.recentTitle)}>
                User "RockFan" requested song
              </span>
              <span className={clsx(styles.recentMeta)}>15 minutes ago</span>
            </div>
            <div className={clsx(styles.recentItem)}>
              <span className={clsx(styles.recentTitle)}>
                User "ElectronicBeats" created account
              </span>
              <span className={clsx(styles.recentMeta)}>1 hour ago</span>
            </div>
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
  recentSection: [
    'mt-8 rounded-lg bg-coal-deep/90 backdrop-blur-sm border border-white/10 p-6',
    'shadow-xl hover:shadow-2xl transition-all duration-300',
  ],
  recentList: ['space-y-3'],
  recentItem: [
    'flex justify-between items-center p-3 rounded-lg bg-coal/50',
    'hover:bg-coal/70 transition-colors duration-200',
  ],
  recentTitle: ['font-medium text-paper-fog'],
  recentMeta: ['text-sm text-paper-calm'],
} as const;
