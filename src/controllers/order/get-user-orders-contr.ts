

import { ApiResponse } from "@myIndiaa/utils/handlers/api-response-handler";
import { asyncHandler } from "@myIndiaa/utils/handlers/asyc-func-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getOrderByUserIdQuery } from "@myIndiaa/lib/order/order-query-lib";
import { IOrder, ORDER_FETCH_SUCCESS } from "@myIndiaa/utils/types/order-type";
import { schemaOrderReadPublic } from "@myIndiaa/lib/validations/order-validation";



export const getUserOrders = asyncHandler(async (req: Request, res: Response) => {

    const userId: string = req.params.userId

    const userOders: IOrder[] = await getOrderByUserIdQuery(userId)

    const publicOrders = userOders.map(order => {
        const publicData = schemaOrderReadPublic.parse(order.toObject());
        return publicData;
    });

    return res.status(StatusCodes.OK).json(
        new ApiResponse(
            StatusCodes.OK,
            publicOrders,
            ORDER_FETCH_SUCCESS
        )
    );
});