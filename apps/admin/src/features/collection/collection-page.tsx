import clsx from 'clsx';
import {
  PageLayout,
  StatsCard,
  ActionButton,
  RecentActivityItem,
} from '@/components/shared';
import { sharedStyles } from '@/styles/shared-styles';

export const CollectionPage = () => {
  return (
    <PageLayout title="Audio Collection">
      <div className={clsx(sharedStyles.statsGrid)}>
        <StatsCard title="Total Tracks" value="2,847" />
        <StatsCard title="Playlists" value="23" />
        <StatsCard title="Storage Used" value="45.2 GB" isOnline />
      </div>

      <div className={clsx(sharedStyles.actionsSection)}>
        <h2 className={clsx(sharedStyles.actionsTitle)}>Collection Actions</h2>
        <div className={clsx(sharedStyles.actionsGrid)}>
          <ActionButton variant="primary">Upload Audio</ActionButton>
          <ActionButton variant="secondary">Manage Playlists</ActionButton>
          <ActionButton variant="accent">View Library</ActionButton>
        </div>
      </div>

      <div className={clsx(sharedStyles.recentSection)}>
        <h2 className={clsx(sharedStyles.actionsTitle)}>Recent Uploads</h2>
        <div className={clsx(sharedStyles.recentList)}>
          <RecentActivityItem
            title="New Jazz Collection"
            meta="Added 2 hours ago"
          />
          <RecentActivityItem
            title="Rock Classics Mix"
            meta="Added 1 day ago"
          />
          <RecentActivityItem
            title="Electronic Beats"
            meta="Added 3 days ago"
          />
        </div>
      </div>
    </PageLayout>
  );
};
