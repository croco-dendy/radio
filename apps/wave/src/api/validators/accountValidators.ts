import { zValidator } from '@hono/zod-validator';
import {
  createAccountSchema,
  updateAccountSchema,
  loginSchema,
} from '@/api/schemas';

export const accountValidators = {
  get registerValidator() {
    return zValidator('json', createAccountSchema);
  },

  get loginValidator() {
    return zValidator('json', loginSchema);
  },

  get updateValidator() {
    return zValidator('json', updateAccountSchema);
  },
};
