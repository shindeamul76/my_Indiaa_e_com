import { _OrderModel as OrderModel } from '@myIndiaa/utils/zod/order-zod-model';
import { z } from 'zod';


export const schemaOrderBaseBodyParams = OrderModel.pick({
  _id: true,
  userId: true,
  products: true,
  amount: true,
  address: true,
  status: true,
  createdAt: true,
  updatedAt: true,
}).partial();


const schemaOrderEditParams = z.object({
  userId: z.string().min(1, "User ID cannot be empty").optional(),
  products: z.array(
    z.object({
      productId: z.string().min(1, "Product ID cannot be empty"),
      quantity: z.number().positive("Quantity must be greater than zero").default(1),
    })
  ).optional(),
  amount: z.number().positive("Amount must be greater than zero").optional(),
  address: z.object({}),
  status: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});


const schemaOrderCreateParams = z.object({
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
});



export const schemaOrderEditBodyParams = schemaOrderBaseBodyParams
  .merge(schemaOrderEditParams)
  .omit({})
  .partial()
  .strict();



export const schemaOrderCreateBodyParams = schemaOrderBaseBodyParams
  .merge(schemaOrderCreateParams)
  .omit({})
  .strict();



export const schemaOrderReadPublic = OrderModel.pick({
  _id: true,
  userId: true,
  products: true,
  amount: true,
  address: true,
  status: true,
  createdAt: true,
  updatedAt: true,
}).partial();
