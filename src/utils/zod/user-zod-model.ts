import { z } from 'zod';
import { ObjectId } from 'mongodb';

export const _UserModel = z.object({
  _id: z.union([z.string(), z.instanceof(ObjectId)]).optional(),
  email: z.string().email(),
  username: z.string(),
  password: z.string().min(6),
  isAdmin: z.boolean().default(false),
});

export type User = z.infer<typeof _UserModel>;
