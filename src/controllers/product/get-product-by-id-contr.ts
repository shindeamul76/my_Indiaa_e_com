

import { ApiResponse } from "@myIndiaa/utils/handlers/api-response-handler";
import { asyncHandler } from "@myIndiaa/utils/handlers/asyc-func-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@myIndiaa/utils/handlers/api-error-handler";
import { IProduct, PRODUCT_DOES_NOT_EXIST, PRODUCT_FETCH_SUCCESS } from "@myIndiaa/utils/types/product-type";
import { getProductByIdQuery } from "@myIndiaa/lib/product/product-query-lib";
import { schemaProductReadPublic } from "@myIndiaa/lib/validations/product-validaton";



export const getProduct = asyncHandler(async (req: Request, res: Response) => {

    const id = req.params.id

    const existingProduct: IProduct | null = await getProductByIdQuery(id);

    if (!existingProduct) {
        throw new ApiError(StatusCodes.BAD_REQUEST, PRODUCT_DOES_NOT_EXIST);
    }

    const publicData = schemaProductReadPublic.parse(existingProduct);

    return res.status(StatusCodes.OK).json(
        new ApiResponse(
            StatusCodes.OK,
            publicData,
            PRODUCT_FETCH_SUCCESS
        )
    );
});