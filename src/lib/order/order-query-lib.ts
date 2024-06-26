import { Order } from "@myIndiaa/main/db/models/order-model";
import { IOrder } from "@myIndiaa/utils/types/order-type";

export const createOrderQuery = async (data: any): Promise<IOrder> => {
    return await Order.create(data);
}

export const updateOrderQuery = async (id: string, data: any): Promise<IOrder | null> => {
    return await Order.findByIdAndUpdate(id, data, { new: true });
}

export const deleteOrderQuery = async (id: string): Promise<void> => {
    await Order.findByIdAndDelete(id);
}

export const getOrderByIdQuery = async (id: string): Promise<IOrder | null> => {
    return await Order.findById(id);
}

export const getOrderByUserIdQuery = async (userId: string): Promise<IOrder[]> => {
    return await Order.find({ userId });
}

export const getAllOrdersQuery = async (): Promise<IOrder[]> => {
    return await Order.find({});
}

export const getAllOrdersQueryWithStatus = async (status: string): Promise<IOrder[]> => {
    return await Order.find({ status }).sort({ createdAt: -1 }).limit(5);
}

export const getOrdersByProductIdQuery = async (productId: string): Promise<IOrder[]> => {
    return await Order.find({ "products.productId": productId });
}
