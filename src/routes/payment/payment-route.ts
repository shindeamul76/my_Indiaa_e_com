
import { makePayment } from '@myIndiaa/controllers/payment-gateway/stripe-payment-contr';
import express from 'express'


export const paymentRouters = express.Router();


paymentRouters.route('/').post( makePayment );

