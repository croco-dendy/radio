import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

const uploadSchema = z.object({
  file: z
    .any()
    .refine((file) => file instanceof File, {
      message: 'File is required',
    })
    .refine(
      (file) => {
        const allowedTypes = [
          'audio/mpeg',
          'audio/mp3',
          'audio/wav',
          'audio/ogg',
          'audio/aac',
          'audio/flac',
          'audio/m4a',
        ];
        return allowedTypes.includes(file.type);
      },
      {
        message: 'Invalid audio file type',
      },
    )
    .refine(
      (file) => {
        const maxSize = 50 * 1024 * 1024; // 50MB
        return file.size <= maxSize;
      },
      {
        message: 'File size must be less than 50MB',
      },
    ),
});

export const audioFileValidators = {
  get uploadValidator() {
    return zValidator('form', uploadSchema);
  },
};
