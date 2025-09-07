import type React from 'react';
import { useNotificationStore } from '@/stores/notification-store';

export const NotificationTestButton: React.FC = () => {
  const { addNotification } = useNotificationStore();

  const testNotifications = () => {
    // Test success notification
    addNotification({
      type: 'success',
      title: 'Success Test',
      message:
        'This is a success notification with a longer message to test text wrapping and layout.',
    });

    // Test error notification with action
    setTimeout(() => {
      addNotification({
        type: 'error',
        title: 'Connection Lost',
        message: 'Unable to connect to server. Real-time updates disabled.',
        duration: 0,
        action: {
          label: 'Retry Connection',
          onClick: () => console.log('Retry clicked'),
        },
      });
    }, 500);

    // Test warning notification
    setTimeout(() => {
      addNotification({
        type: 'warning',
        title: 'Warning Test',
        message: 'This is a warning notification.',
      });
    }, 1000);

    // Test info notification
    setTimeout(() => {
      addNotification({
        type: 'info',
        title: 'Info Test',
        message: 'This is an info notification with some details.',
      });
    }, 1500);
  };

  return (
    <button
      type="button"
      onClick={testNotifications}
      className="fixed bottom-4 left-4 z-30 px-4 py-2 bg-amber-500 text-coal rounded-lg shadow-lg hover:bg-amber-400 transition-colors"
    >
      Test Notifications
    </button>
  );
};
