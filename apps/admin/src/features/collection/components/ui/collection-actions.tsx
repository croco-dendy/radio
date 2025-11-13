import { Button } from '@radio/mojo-ui';

type CollectionActionsProps = {
  activeTab: 'playlists' | 'albums';
  onCreateCollection?: () => void;
  onCreateAlbum?: () => void;
};

export const CollectionActions = ({
  activeTab,
  onCreateCollection,
  onCreateAlbum,
}: CollectionActionsProps) => {
  return (
    <div className="w-full">
      {activeTab === 'playlists' && onCreateCollection ? (
        <Button
          variant="green"
          size="medium"
          title="Додати плейлист"
          onClick={onCreateCollection}
          className="w-full"
        />
      ) : activeTab === 'albums' && onCreateAlbum ? (
        <Button
          variant="green"
          size="medium"
          title="Додати альбом"
          onClick={onCreateAlbum}
          className="w-full"
        />
      ) : null}
    </div>
  );
};
