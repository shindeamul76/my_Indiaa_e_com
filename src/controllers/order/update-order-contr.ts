
import { ApiResponse } from "@myIndiaa/utils/handlers/api-response-handler";
import { asyncHandler } from "@myIndiaa/utils/handlers/asyc-func-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@myIndiaa/utils/handlers/api-error-handler";
import { schemaOrderEditBodyParams, schemaOrderReadPublic } from "@myIndiaa/lib/validations/order-validation";
import { IOrder, ORDER_DOES_NOT_EXIST, ORDER_UPDATE_SUCCESS } from "@myIndiaa/utils/types/order-type";
import { getOrderByIdQuery, updateOrderQuery } from "@myIndiaa/lib/order/order-query-lib";



export const updateExistingOrder = asyncHandler(async (req: Request, res: Response) => {

    const id = req.params.id;

    const body = schemaOrderEditBodyParams.parse(req.body);

    const existingOrder: IOrder | null = await getOrderByIdQuery(id);

    if (!existingOrder) {
        throw new ApiError(StatusCodes.BAD_REQUEST, ORDER_DOES_NOT_EXIST);
    };

    const updateOrder = await updateOrderQuery(id, body);

    const publicData = schemaOrderReadPublic.parse(updateOrder);

    return res.status(StatusCodes.OK).json(
        new ApiResponse(
            StatusCodes.OK,
            publicData,
            ORDER_UPDATE_SUCCESS
        )
    );
});