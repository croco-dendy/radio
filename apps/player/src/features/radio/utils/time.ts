// Helper function to format time for display as HH:MM
export const formatTime = (timestamp: string): string => {
  try {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('uk-UA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  } catch (error) {
    console.warn('Error formatting message time:', timestamp, error);
    return '';
  }
};

// Helper function to format time as relative time in Ukrainian
export const formatRelativeTime = (timestamp: string): string | null => {
  try {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return null;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      if (diffInMinutes === 1) {
        return '1хв назад';
      }
      if (diffInMinutes < 5) {
        return `${diffInMinutes} хв назад`;
      }
      return `${diffInMinutes} хв назад`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      if (diffInHours === 1) {
        return '1 год назад';
      }
      if (diffInHours < 5) {
        return `${diffInHours} год назад`;
      }
      return `${diffInHours} год назад`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) {
      return 'вчора';
    }
    if (diffInDays < 7) {
      return `${diffInDays} дні назад`;
    }
    // For longer periods, show the date
    return date.toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'short',
    });
  } catch (error) {
    console.warn('Error formatting relative time:', timestamp, error);
    return '';
  }
};
