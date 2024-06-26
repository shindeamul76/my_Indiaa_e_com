

import { ApiResponse } from "@myIndiaa/utils/handlers/api-response-handler";
import { asyncHandler } from "@myIndiaa/utils/handlers/asyc-func-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@myIndiaa/utils/handlers/api-error-handler";
import { IOrder, ORDER_DELETE_SUCCESS, ORDER_DOES_NOT_EXIST } from "@myIndiaa/utils/types/order-type";
import { deleteOrderQuery, getOrderByIdQuery } from "@myIndiaa/lib/order/order-query-lib";



export const deleteExistingOrder = asyncHandler(async (req: Request, res: Response) => {

    const id = req.params.id

    const existingOrder: IOrder | null = await getOrderByIdQuery(id);

    if (!existingOrder) {
        throw new ApiError(StatusCodes.BAD_REQUEST, ORDER_DOES_NOT_EXIST);
    }

    await deleteOrderQuery(id);

    return res.status(StatusCodes.OK).json(
        new ApiResponse(
            StatusCodes.OK,
            null,
            ORDER_DELETE_SUCCESS
        )
    );
});