import express, { Application, urlencoded, json } from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import { userRouters } from '@myIndiaa/routes/user/user-route';
import { productRouters } from '@myIndiaa/routes/product/product-route';
import { paymentRouters } from '@myIndiaa/routes/payment/payment-route';
import { orderRouters } from '@myIndiaa/routes/order/order-route';
import { verifyJWT } from '@myIndiaa/middlewares/verify-jwt-middleware';
import rateLimit from 'express-rate-limit';


export const app: Application = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.'
});


app.use(json());
app.use(urlencoded({ extended: true }));
app.use(limiter);
app.use(cors());

app.use('/api/v1/auth', userRouters);
app.use('/api/v1/product', productRouters);
app.use('/api/v1/order', orderRouters);
app.use('/api/v1/payment', paymentRouters);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Enhanced E-Commerce API!' });
});


app.get('/success', verifyJWT, (req: Request, res: Response) => {
  res.status(200).json({ message: 'Loggged In Successfully' });
});


app.get('/_health', (req: Request, res: Response) => {
  return res.status(200).json({
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  });
});


// Handle 404 errors
app.use('*', (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Endpoint not found',
    data: null,
  });
});
