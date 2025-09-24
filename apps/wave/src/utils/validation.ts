import { z } from 'zod';

export const commonSchemas = {
  pagination: z.object({
    limit: z.coerce.number().int().min(1).max(100).default(50),
    offset: z.coerce.number().int().min(0).default(0),
  }),

  id: z.coerce.number().int().positive(),
};

export const accountSchemas = {
  create: z.object({
    username: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.string().optional().default('user'),
  }),

  update: z.object({
    password: z.string().min(8).optional(),
    role: z.string().optional(),
    isActive: z.boolean().optional(),
  }),

  login: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }),
};

export const collectionSchemas = {
  create: z.object({
    name: z.string().min(1).max(100),
    description: z.string().max(500).optional(),
    isPublic: z.boolean().optional().default(false),
  }),

  update: z.object({
    name: z.string().min(1).max(100).optional(),
    description: z.string().max(500).optional(),
    isPublic: z.boolean().optional(),
  }),

  addItem: z.object({
    audioFileId: z.number().int().positive(),
    order: z.number().int().min(0).optional(),
  }),

  reorderItems: z.object({
    items: z.array(
      z.object({
        id: z.number().int().positive(),
        order: z.number().int().min(0),
      }),
    ),
  }),
};
