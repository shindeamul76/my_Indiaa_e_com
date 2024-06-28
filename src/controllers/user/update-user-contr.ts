

import { ApiResponse } from "@myIndiaa/utils/handlers/api-response-handler";
import { asyncHandler } from "@myIndiaa/utils/handlers/asyc-func-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@myIndiaa/utils/handlers/api-error-handler";
import { schemaProductEditBodyParams, schemaProductReadPublic } from "@myIndiaa/lib/validations/product-validaton";
import { IProduct, PRODUCT_DOES_NOT_EXIST, PRODUCT_UPDATE_SUCCESS } from "@myIndiaa/utils/types/product-type";
import { getProductByIdQuery, updateProductQuery } from "@myIndiaa/lib/product/product-query-lib";
import { schemaUserEditBodyParams, schemaUserReadPublic } from "@myIndiaa/lib/validations/user-validation";
import { IUser, USER_DOES_NOT_EXISTS } from "@myIndiaa/utils/types/db-user-type";
import { getUserByIdQuery, updateUserQuery } from "@myIndiaa/lib/user/user-query-lib";



export const updateExistingUser = asyncHandler(async (req: Request, res: Response) => {

    const id = req.params.id

    const body = schemaUserEditBodyParams.parse(req.body);

    const existingUser: IUser | null = await getUserByIdQuery(id);

    if (!existingUser) {
        throw new ApiError(StatusCodes.BAD_REQUEST, USER_DOES_NOT_EXISTS);
    }

    const updateUser = await updateUserQuery(id, body);

    // const publicData = schemaUserReadPublic.parse(updateUser);

    return res.status(StatusCodes.OK).json(
        new ApiResponse(
            StatusCodes.OK,
            updateUser,
            PRODUCT_UPDATE_SUCCESS
        )
    );
});