import { z } from 'zod';
import { ObjectId } from 'mongodb';

export const _OrderModel = z.object({
    
  _id: z.optional(z.union([z.string(), z.instanceof(ObjectId)])),
  
  userId: z.string().min(1, "User ID cannot be empty"),
  
  products: z.array(
    z.object({
      productId: z.string().min(1, "Product ID cannot be empty"),
      quantity: z.number().positive("Quantity must be greater than zero").default(1),
    })
  ).min(1, "Products array cannot be empty"),
  
  amount: z.number().positive("Amount must be greater than zero"),
  
  address: z.object({}),
  
  status: z.string().default('pending'),
  
  createdAt: z.date().default(new Date()),
  
  updatedAt: z.date().default(new Date()),
});
