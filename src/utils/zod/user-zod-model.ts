import { z } from 'zod';
import { ObjectId } from 'mongodb';


const isValidObjectId = (value: any) => {
  return ObjectId.isValid(value) && (typeof value === 'string' || value instanceof ObjectId);
}

export const _UserModel = z.object({
  _id: z.optional(z.union([z.string(), z.instanceof(ObjectId)])),
  email: z.string().email(),
  username: z.string(),
  password: z.string().min(6),
  isAdmin: z.boolean().default(false),
});

export type User = z.infer<typeof _UserModel>;
