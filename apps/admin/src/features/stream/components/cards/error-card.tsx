import type React from 'react';

interface ErrorCardProps {
  error: string | null;
}

export const ErrorCard: React.FC<ErrorCardProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  return (
    <div className="bg-red-500/10 border border-red-500/40 rounded-lg p-3">
      <div className="text-red-400 text-sm">
        <span className="font-medium">Error:</span> {error}
      </div>
    </div>
  );
};
