import { Hono } from 'hono';
import { albumHandlers } from '@/api/handlers/albumHandlers';
import { songHandlers } from '@/api/handlers/songHandlers';
import { albumValidators, songValidators } from '@/api/validators/albumValidators';
import { authMiddleware } from '@/services/auth';

type Variables = {
  accountId: number;
};

const albumsRoutes = new Hono<{ Variables: Variables }>();

albumsRoutes.get('/public', albumHandlers.getPublicAlbumsHandler);

albumsRoutes.get('/my', authMiddleware, albumHandlers.getUserAlbumsHandler);

albumsRoutes.get('/:id', albumHandlers.getAlbumByIdHandler);

albumsRoutes.post(
  '/',
  authMiddleware,
  albumValidators.createValidator,
  albumHandlers.createAlbumHandler,
);

albumsRoutes.put(
  '/:id',
  authMiddleware,
  albumValidators.updateValidator,
  albumHandlers.updateAlbumHandler,
);

albumsRoutes.delete('/:id', authMiddleware, albumHandlers.deleteAlbumHandler);

albumsRoutes.post(
  '/:id/cover',
  authMiddleware,
  albumHandlers.uploadCoverArtHandler,
);

albumsRoutes.get('/:id/cover', albumHandlers.getCoverArtHandler);

albumsRoutes.get(
  '/:albumId/songs',
  albumHandlers.getAlbumByIdHandler,
);

albumsRoutes.post(
  '/:albumId/songs',
  authMiddleware,
  songValidators.addToAlbumValidator,
  songHandlers.addSongToAlbumHandler,
);

albumsRoutes.put(
  '/:albumId/songs/reorder',
  authMiddleware,
  songValidators.reorderValidator,
  songHandlers.reorderSongsHandler,
);

albumsRoutes.put(
  '/songs/:id',
  authMiddleware,
  songValidators.updateValidator,
  songHandlers.updateSongHandler,
);

albumsRoutes.delete('/songs/:id', authMiddleware, songHandlers.deleteSongHandler);

export { albumsRoutes };

