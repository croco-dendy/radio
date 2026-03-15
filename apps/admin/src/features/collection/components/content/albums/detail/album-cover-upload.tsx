import { CoverUpload } from '@/features/collection/components/shared';

type AlbumCoverUploadProps = {
  albumId: number;
  onSuccess: () => void;
};

export const AlbumCoverUpload = ({
  albumId,
  onSuccess,
}: AlbumCoverUploadProps) => {
  return (
    <div>
      <CoverUpload albumId={albumId} onSuccess={onSuccess} />
    </div>
  );
};
