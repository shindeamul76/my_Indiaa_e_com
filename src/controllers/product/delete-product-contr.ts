

import { ApiResponse } from "@myIndiaa/utils/handlers/api-response-handler";
import { asyncHandler } from "@myIndiaa/utils/handlers/asyc-func-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@myIndiaa/utils/handlers/api-error-handler";
import { IProduct, PRODUCT_DELETE_SUCCESS, PRODUCT_DOES_NOT_EXIST } from "@myIndiaa/utils/types/product-type";
import { deleteProductQuery, getProductByIdQuery } from "@myIndiaa/lib/product/product-query-lib";



export const deleteExistingProduct = asyncHandler(async (req: Request, res: Response) => {

    const id = req.params.id

    const existingProduct: IProduct | null = await getProductByIdQuery(id);

    if (!existingProduct) {
        throw new ApiError(StatusCodes.BAD_REQUEST, PRODUCT_DOES_NOT_EXIST);
    }

    await deleteProductQuery(id);


    return res.status(StatusCodes.OK).json(
        new ApiResponse(
            StatusCodes.OK,
            null,
            PRODUCT_DELETE_SUCCESS

        )
    );
});