
import { createOrder } from '@myIndiaa/controllers/order/create-order-contr';
import { deleteExistingOrder } from '@myIndiaa/controllers/order/delete-order-contr';
import { getAllOrders } from '@myIndiaa/controllers/order/get-all-orders-contr';
import { getUserOrders } from '@myIndiaa/controllers/order/get-user-orders-contr';
import { updateExistingOrder } from '@myIndiaa/controllers/order/update-order-contr';
import express from 'express'


export const orderRouters = express.Router();


orderRouters.route('/').post( createOrder );

orderRouters.route('/:id').put( updateExistingOrder );

orderRouters.route('/:id').delete( deleteExistingOrder );

orderRouters.route('/find/user/:id').get( getUserOrders );

orderRouters.route('/').get( getAllOrders );


