

import { ApiResponse } from "@myIndiaa/utils/handlers/api-response-handler";
import { asyncHandler } from "@myIndiaa/utils/handlers/asyc-func-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@myIndiaa/utils/handlers/api-error-handler";
import { IProduct, PRODUCT_DOES_NOT_EXIST, PRODUCT_FETCH_SUCCESS } from "@myIndiaa/utils/types/product-type";
import { getAllProductsQuery, getAllProductsQueryWithCategory, getAllProductsQueryWithQ, getProductByIdQuery } from "@myIndiaa/lib/product/product-query-lib";
import { schemaProductReadPublic } from "@myIndiaa/lib/validations/product-validaton";



export const getAllProducts = asyncHandler(async (req: Request, res: Response) => {

    const qNew = req.query.new;
    const qCategory = req.query.category as string;

    let products: IProduct[];

    if (qNew) {
        products = await getAllProductsQueryWithQ()
    } else if (qCategory) {
        products = await getAllProductsQueryWithCategory(qCategory)
    } else {
        products = await getAllProductsQuery();
    }

    const publicProducts = products.map(product => {
        const publicData = schemaProductReadPublic.parse(product.toObject());
        return publicData;
    });

    return res.status(StatusCodes.OK).json(
        new ApiResponse(
            StatusCodes.OK,
            publicProducts,
            PRODUCT_FETCH_SUCCESS
        )
    );
    
});