import { Document } from 'mongoose';
import { _ProductModel } from '../zod/product-zod-model';
import { z } from 'zod';

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

export type TProduct = z.infer<typeof _ProductModel>;

export type ProductReqBodyType =  {
    title: string;
    desc: string;
    img: string;
    categories?: string[];
    size?: string[];
    color?: string[];
    price: number;
    inStock?: boolean;
};


export const PRODUCT_EXISTS = "Product Already Exists";

export const PRODUCT_CREATE_SUCCESS = "Product Created Successfully";

export const PRODUCT_DOES_NOT_EXIST = "Product Does Not Exist";

export const PRODUCT_UPDATE_SUCCESS = "Product Updated Successfully";

export const PRODUCT_DELETE_SUCCESS = "Product Deleted Successfully";

export const PRODUCT_NOT_FOUND = "Product Not Found";

export const INVALID_PRODUCT_DATA = "Invalid Product Data";

export const REQUIRED_PRODUCT_TITLE_OR_DESC = "Enter product title or description to search";

export const PRODUCT_FETCH_SUCCESS = "Product Fetched Success";
