import { Hono } from 'hono';
import { audioFileHandlers } from '@/api/handlers/audioFileHandlers';
import { audioFileValidators } from '@/api/validators/audioFileValidators';
import { authMiddleware } from '@/services/auth';

type Variables = {
  accountId: number;
};

const audioFilesRoutes = new Hono<{ Variables: Variables }>();

audioFilesRoutes.post(
  '/upload',
  authMiddleware,
  audioFileValidators.uploadValidator,
  audioFileHandlers.uploadAudioFileHandler,
);

audioFilesRoutes.get('/:id', audioFileHandlers.getAudioFileHandler);

audioFilesRoutes.get('/:id/stream', audioFileHandlers.streamAudioFileHandler);

audioFilesRoutes.delete(
  '/:id',
  authMiddleware,
  audioFileHandlers.deleteAudioFileHandler,
);

export { audioFilesRoutes };
