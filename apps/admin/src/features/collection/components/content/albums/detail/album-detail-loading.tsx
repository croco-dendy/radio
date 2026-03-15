export const AlbumDetailLoading = () => {
  return (
    <div className="space-y-4">
      <div className="h-8 bg-gray-100/10 rounded" />
      <div className="space-y-3">
        {['s1', 's2', 's3'].map((id) => (
          <div key={id} className="h-16 bg-gray-100/10 rounded" />
        ))}
      </div>
    </div>
  );
};
