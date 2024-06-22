import { z } from 'zod';
import { ObjectId } from 'mongodb';

export const _ProductModel = z.object({

  _id: z.optional(z.union([z.string(), z.instanceof(ObjectId)])),

  title: z.string().min(1, "Title cannot be empty"), 

  desc: z.string().min(1, "Description cannot be empty"),

  img: z.string().min(1, "Image URL cannot be empty"),

  categories: z.array(z.string()).optional(),

  size: z.array(z.string()).optional(),

  color: z.array(z.string()).optional(),

  price: z.number().positive("Price must be greater than zero"),

  inStock: z.boolean().default(true),
});

