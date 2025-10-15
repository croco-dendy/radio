import { useState } from 'react';
import clsx from 'clsx';
import { PageLayout, StatsCard, ActionButton } from '@/components/shared';
import { sharedStyles } from '@/styles/shared-styles';
import { useUsers } from '@/services/api/hooks/use-user-management';
import { UserList, CreateUserModal } from './components';

export const UsersPage = () => {
  const { data: users } = useUsers();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const activeUsers = users?.filter((user) => user.isActive).length || 0;
  const adminUsers = users?.filter((user) => user.role === 'admin').length || 0;

  return (
    <PageLayout title="User Management">
      <div className={clsx(sharedStyles.statsGrid)}>
        <StatsCard
          title="Total Users"
          value={users?.length?.toString() || '0'}
        />
        <StatsCard title="Active Users" value={activeUsers.toString()} />
        <StatsCard title="Administrators" value={adminUsers.toString()} />
      </div>

      <div className={clsx(sharedStyles.actionsSection)}>
        <h2 className={clsx(sharedStyles.actionsTitle)}>User Actions</h2>
        <div className={clsx(sharedStyles.actionsGrid)}>
          <ActionButton
            variant="primary"
            onClick={() => setShowCreateModal(true)}
          >
            Create User
          </ActionButton>
          <ActionButton variant="secondary">Export Users</ActionButton>
          <ActionButton variant="accent">User Activity</ActionButton>
        </div>
      </div>

      <div className={clsx(sharedStyles.recentSection)}>
        <h2 className={clsx(sharedStyles.actionsTitle)}>All Users</h2>
        <UserList users={users || []} />
      </div>

      <CreateUserModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </PageLayout>
  );
};
