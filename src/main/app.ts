import express, { Application, urlencoded, json } from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import { userRouters } from '@myIndiaa/routes/user/user-route';
import { product } from '@myIndiaa/routes/product/produt-route';



export const app: Application = express();


app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1', userRouters);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Enhanced E-Commerce API!' });
});


app.get('/success', (req: Request, res: Response) => {
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
