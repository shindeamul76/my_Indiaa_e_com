import { Document } from 'mongoose';

interface IProduct {
    productId: string;
    quantity: number;
}

export interface IOrder extends Document {
    userId: string;
    products: IProduct[];
    amount: number;
    address: object;
    status?: string;
}