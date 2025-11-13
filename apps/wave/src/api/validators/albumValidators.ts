import { zValidator } from '@hono/zod-validator';
import { albumSchemas, songSchemas } from '@/utils/validation';

export const albumValidators = {
  get createValidator() {
    return zValidator('json', albumSchemas.create);
  },

  get updateValidator() {
    return zValidator('json', albumSchemas.update);
  },

  get filterValidator() {
    return zValidator('query', albumSchemas.filter);
  },
};

export const songValidators = {
  get addToAlbumValidator() {
    return zValidator('json', songSchemas.addToAlbum);
  },

  get updateValidator() {
    return zValidator('json', songSchemas.update);
  },

  get reorderValidator() {
    return zValidator('json', songSchemas.reorder);
  },
};

