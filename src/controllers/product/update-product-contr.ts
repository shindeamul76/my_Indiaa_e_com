

import { ApiResponse } from "@myIndiaa/utils/handlers/api-response-handler";
import { asyncHandler } from "@myIndiaa/utils/handlers/asyc-func-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@myIndiaa/utils/handlers/api-error-handler";
import { schemaProductEditBodyParams, schemaProductReadPublic } from "@myIndiaa/lib/validations/product-validaton";
import { IProduct, PRODUCT_DOES_NOT_EXIST, PRODUCT_UPDATE_SUCCESS } from "@myIndiaa/utils/types/product-type";
import { getProductByIdQuery, updateProductQuery } from "@myIndiaa/lib/product/product-query-lib";



export const updateExistingProduct = asyncHandler(async (req: Request, res: Response) => {

    const id = req.params.id

    const body = schemaProductEditBodyParams.parse(req.body);

    const existingProduct: IProduct | null = await getProductByIdQuery(id);

    if (!existingProduct) {
        throw new ApiError(StatusCodes.BAD_REQUEST, PRODUCT_DOES_NOT_EXIST);
    }

    const updateProductN = await updateProductQuery(id, body);

    const publicData = schemaProductReadPublic.parse(updateProductN);

    return res.status(StatusCodes.OK).json(
        new ApiResponse(
            StatusCodes.OK,
            publicData,
            PRODUCT_UPDATE_SUCCESS
        )
    );
});