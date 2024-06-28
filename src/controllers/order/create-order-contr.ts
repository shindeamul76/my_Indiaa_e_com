

import { ApiResponse } from "@myIndiaa/utils/handlers/api-response-handler";
import { asyncHandler } from "@myIndiaa/utils/handlers/asyc-func-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { schemaOrderCreateBodyParams, schemaOrderReadPublic } from "@myIndiaa/lib/validations/order-validation";
import { IOrder, ORDER_CREATE_SUCCESS } from "@myIndiaa/utils/types/order-type";
import { createOrderQuery } from "@myIndiaa/lib/order/order-query-lib";



export const createOrder = asyncHandler(async (req: Request, res: Response) => {

    const body = schemaOrderCreateBodyParams.parse(req.body);

    const newOrder: IOrder = await createOrderQuery(body);

    // const publicData = schemaOrderReadPublic.parse(newOrder);


    return res.status(StatusCodes.CREATED).json(
        new ApiResponse(
            StatusCodes.CREATED,
            newOrder,
            ORDER_CREATE_SUCCESS
        )
    );
});