

import { ApiResponse } from "@myIndiaa/utils/handlers/api-response-handler";
import { asyncHandler } from "@myIndiaa/utils/handlers/asyc-func-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@myIndiaa/utils/handlers/api-error-handler";
import { schemaProductCreateBodyParams, schemaProductReadPublic } from "@myIndiaa/lib/validations/product-validaton";
import { IProduct, PRODUCT_CREATE_SUCCESS, PRODUCT_EXISTS, ProductReqBodyType } from "@myIndiaa/utils/types/product-type";
import { createProductQuery, getProductByTitleOrDescriptionQuery } from "@myIndiaa/lib/product/product-query-lib";



export const createProduct = asyncHandler(async (req: Request, res: Response) => {

    const body: ProductReqBodyType = schemaProductCreateBodyParams.parse(req.body);

    const existingProduct: IProduct | null = await getProductByTitleOrDescriptionQuery(body);

    if (existingProduct) {
        throw new ApiError(StatusCodes.CONFLICT, PRODUCT_EXISTS);
    }

    const newProduct: IProduct = await createProductQuery(body);

    const publicData = schemaProductReadPublic.parse(newProduct);


    return res.status(StatusCodes.CREATED).json(
        new ApiResponse(
            StatusCodes.CREATED,
            publicData,
            PRODUCT_CREATE_SUCCESS
        )
    );
});