
import { Product } from "@myIndiaa/main/db/models/product-model";
import { IProduct } from "@myIndiaa/utils/types/product-type";



export const createProductQuery = async (data: any): Promise<IProduct> => {
    return await Product.create(data);
}

export const updateProductQuery = async (id: string, data: any): Promise<IProduct | null> => {
    return await Product.findByIdAndUpdate(id, data, { new: true });
}

export const deleteProductQuery = async (id: string): Promise<void> => {
    await Product.findByIdAndDelete(id);
}

export const getProductByIdQuery = async (id: string): Promise<IProduct | null> => {
    return await Product.findById(id);
}

export const getProductByTitleOrDescriptionQuery = async (data: any): Promise<IProduct | null> => {
    return await Product.findOne({
        $or: [
            { title: data.title },
            { desc: data.desc }
        ]
    });
}

export const getAllProductsQuery = async (): Promise<IProduct[]> => {
    return await Product.find({});
}

export const getAllProductsQueryWithQ = async (): Promise<IProduct[]> => {
    return await Product.find().sort({createdAt: -1}).limit(5)
}

export const getAllProductsQueryWithCategory = async (qCategory: string): Promise<IProduct[]> => {
    return await Product.find({
        categories: {
            $in: [qCategory],
        },
    });
}
