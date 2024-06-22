import { IOrder } from '@myIndiaa/utils/types/order-type';
import mongoose, { Schema } from 'mongoose';


const OrderSchema: Schema<IOrder> = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    products: [
        {
            productId: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
    amount: {
        type: Number,
        required: true,
    },
    address: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        default: 'pending',
    },
}, { timestamps: true });



export const Order = mongoose.model<IOrder>('Order', OrderSchema);

