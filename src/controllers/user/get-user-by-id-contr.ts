

import { ApiResponse } from "@myIndiaa/utils/handlers/api-response-handler";
import { asyncHandler } from "@myIndiaa/utils/handlers/asyc-func-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@myIndiaa/utils/handlers/api-error-handler";
import { getUserByIdQuery } from "@myIndiaa/lib/user/user-query-lib";
import { IUser, USER_DOES_NOT_EXISTS, USER_FETCH_SUCCESS } from "@myIndiaa/utils/types/db-user-type";
import { schemaUserReadPublic } from "@myIndiaa/lib/validations/user-validation";



export const getUser = asyncHandler(async (req: Request, res: Response) => {

    const id = req.params.id

    const existingUser: IUser | null = await getUserByIdQuery(id);

    if (!existingUser) {
        throw new ApiError(StatusCodes.BAD_REQUEST, USER_DOES_NOT_EXISTS);
    }

    // const publicData = schemaUserReadPublic.parse(existingUser);

    return res.status(StatusCodes.OK).json(
        new ApiResponse(
            StatusCodes.OK,
            existingUser,
            USER_FETCH_SUCCESS
        )
    );
});