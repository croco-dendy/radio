import type { Context } from 'hono';
import { audioFileService } from '@/services/audioFiles';
import { ResponseHelper } from '@/utils/response';
import { withErrorHandling } from '@/utils/routeHandler';

export const audioFileHandlers = {
  get uploadAudioFileHandler() {
    return withErrorHandling(async (c: Context) => {
      const accountId = c.get('accountId') as number;
      const body = await c.req.parseBody();

      const file = body.file as File;
      if (!file) {
        return ResponseHelper.error(c, 'No file provided', 400);
      }

      const result = await audioFileService.uploadAudioFile(accountId, file);
      return ResponseHelper.success(c, result);
    });
  },

  get getAudioFileHandler() {
    return withErrorHandling(async (c: Context) => {
      const id = Number.parseInt(c.req.param('id'));
      const audioFile = await audioFileService.getAudioFileById(id);
      return ResponseHelper.success(c, audioFile);
    });
  },

  get streamAudioFileHandler() {
    return withErrorHandling(async (c: Context) => {
      const id = Number.parseInt(c.req.param('id'));
      const stream = await audioFileService.streamAudioFile(id);

      return new Response(stream.buffer, {
        headers: {
          'Content-Type': stream.mimeType,
          'Content-Length': stream.size.toString(),
          'Accept-Ranges': 'bytes',
        },
      });
    });
  },

  get deleteAudioFileHandler() {
    return withErrorHandling(async (c: Context) => {
      const id = Number.parseInt(c.req.param('id'));
      const accountId = c.get('accountId') as number;

      await audioFileService.deleteAudioFile(id, accountId);
      return ResponseHelper.message(c, 'Audio file deleted successfully');
    });
  },
};
