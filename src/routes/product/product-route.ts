
import { createProduct } from '@myIndiaa/controllers/product/create-product-contr';
import { deleteExistingProduct } from '@myIndiaa/controllers/product/delete-product-contr';
import { getAllProducts } from '@myIndiaa/controllers/product/get-all-products-contr';
import { getProduct } from '@myIndiaa/controllers/product/get-product-by-id-contr';
import { updateExistingProduct } from '@myIndiaa/controllers/product/update-product-contr';
import express from 'express'


export const productRouters = express.Router();


productRouters.route('/').post( createProduct );

productRouters.route('/:id').put( updateExistingProduct );

productRouters.route('/:id').delete( deleteExistingProduct );

productRouters.route('/find/:id').get( getProduct);

productRouters.route('/').get( getAllProducts );


