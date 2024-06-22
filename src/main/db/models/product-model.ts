import { IProduct } from '@myIndiaa/utils/types/product-type';
import mongoose, { Schema } from 'mongoose';



const ProductSchema: Schema<IProduct> = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true,
    },
    categories: {
        type: [String],
    },
    size: {
        type: [String],
    },
    color: {
        type: [String],
    },
    price: {
        type: Number,
        required: true
    },
    inStock: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });


export const Product = mongoose.model<IProduct>('Product', ProductSchema);
