import { zValidator } from '@hono/zod-validator';
import { collectionSchemas } from '@/utils/validation';

export const collectionValidators = {
  get createValidator() {
    return zValidator('json', collectionSchemas.create);
  },

  get updateValidator() {
    return zValidator('json', collectionSchemas.update);
  },

  get addItemValidator() {
    return zValidator('json', collectionSchemas.addItem);
  },

  get reorderItemsValidator() {
    return zValidator('json', collectionSchemas.reorderItems);
  },
};
