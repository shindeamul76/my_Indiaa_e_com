import { _ProductModel as ProductModel } from '@myIndiaa/utils/zod/product-zod-model';
import { z } from 'zod';


export const schemaProductBaseBodyParams = ProductModel.pick({
  _id: true,
  title: true,
  desc: true,
  img: true,
  categories: true,
  size: true,
  color: true,
  price: true,
  inStock: true,
}).partial();



const schemaProductEditParams = z.object({
  title: z.string().min(1, "Title cannot be empty").optional(),
  desc: z.string().min(1, "Description cannot be empty").optional(),
  img: z.string().min(1, "Image URL cannot be empty").optional(),
  categories: z.array(z.string()).optional(),
  size: z.array(z.string()).optional(),
  color: z.array(z.string()).optional(),
  price: z.number().positive("Price must be greater than zero").optional(),
  inStock: z.boolean().optional(),
});


const schemaProductCreateParams = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  desc: z.string().min(1, "Description cannot be empty"),
  img: z.string().min(1, "Image URL cannot be empty"),
  categories: z.array(z.string()).optional(),
  size: z.array(z.string()).optional(),
  color: z.array(z.string()).optional(),
  price: z.number().positive("Price must be greater than zero"),
  inStock: z.boolean().default(true),
});


export const schemaProductEditBodyParams = schemaProductBaseBodyParams
  .merge(schemaProductEditParams)
  .omit({})
  .partial()
  .strict();


export const schemaProductCreateBodyParams = schemaProductBaseBodyParams
  .merge(schemaProductCreateParams)
  .omit({})
  .strict();


  export const schemaProductReadPublic = ProductModel.pick({
    _id: true,
    title: true,
    desc: true,
    img: true,
    price: true,
    inStock: true,
    categories: true,
    size: true,
    color: true,
  }).partial();


