

import { ApiResponse } from "@myIndiaa/utils/handlers/api-response-handler";
import { asyncHandler } from "@myIndiaa/utils/handlers/asyc-func-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@myIndiaa/utils/handlers/api-error-handler";
import { IOrder, ORDER_FETCH_SUCCESS } from "@myIndiaa/utils/types/order-type";
import { getAllOrdersQuery } from "@myIndiaa/lib/order/order-query-lib";
import { schemaOrderReadPublic } from "@myIndiaa/lib/validations/order-validation";




export const getAllOrders = asyncHandler(async (req: Request, res: Response) => {

    let oredrs: IOrder[]  = await getAllOrdersQuery();

    // const publicOrders = oredrs.map(order => {
    //     const publicData = schemaOrderReadPublic.parse(order.toObject());
    //     return publicData;
    // });

    return res.status(StatusCodes.OK).json(
        new ApiResponse(
            StatusCodes.OK,
            oredrs,
            ORDER_FETCH_SUCCESS
        )
    );
    
});