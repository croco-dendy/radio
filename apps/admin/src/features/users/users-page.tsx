import clsx from 'clsx';
import {
  PageLayout,
  StatsCard,
  ActionButton,
  RecentActivityItem,
} from '@/components/shared';
import { sharedStyles } from '@/styles/shared-styles';

export const UsersPage = () => {
  return (
    <PageLayout title="User Management">
      <div className={clsx(sharedStyles.statsGrid)}>
        <StatsCard title="Active Listeners" value="156" isOnline />
        <StatsCard title="Total Users" value="2,847" />
        <StatsCard title="New This Week" value="23" isOnline />
      </div>

      <div className={clsx(sharedStyles.actionsSection)}>
        <h2 className={clsx(sharedStyles.actionsTitle)}>User Actions</h2>
        <div className={clsx(sharedStyles.actionsGrid)}>
          <ActionButton variant="primary">View All Users</ActionButton>
          <ActionButton variant="secondary">User Analytics</ActionButton>
          <ActionButton variant="accent">Manage Permissions</ActionButton>
        </div>
      </div>

      <div className={clsx(sharedStyles.recentSection)}>
        <h2 className={clsx(sharedStyles.actionsTitle)}>
          Recent User Activity
        </h2>
        <div className={clsx(sharedStyles.recentList)}>
          <RecentActivityItem
            title='User "JazzLover" joined playlist'
            meta="2 minutes ago"
          />
          <RecentActivityItem
            title='User "RockFan" requested song'
            meta="15 minutes ago"
          />
          <RecentActivityItem
            title='User "ElectronicBeats" created account'
            meta="1 hour ago"
          />
        </div>
      </div>
    </PageLayout>
  );
};
