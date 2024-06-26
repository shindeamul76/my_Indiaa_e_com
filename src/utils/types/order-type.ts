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


export const ORDER_EXISTS = "Order Already Exists";

export const ORDER_CREATE_SUCCESS = "Order Created Successfully";

export const ORDER_DOES_NOT_EXIST = "Order Does Not Exist";

export const ORDER_UPDATE_SUCCESS = "Order Updated Successfully";

export const ORDER_DELETE_SUCCESS = "Order Deleted Successfully";

export const ORDER_NOT_FOUND = "Order Not Found";

export const INVALID_ORDER_DATA = "Invalid Order Data";

export const REQUIRED_ORDER_USER_ID_OR_STATUS = "Enter order user ID or status to search";

export const ORDER_FETCH_SUCCESS = "Order Fetched Successfully";
