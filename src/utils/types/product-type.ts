import { Document } from 'mongoose';

export interface IProduct extends Document {
    title: string;
    desc: string;
    img: string;
    categories?: string[];
    size?: string[];
    color?: string[];
    price: number;
    inStock?: boolean;
}