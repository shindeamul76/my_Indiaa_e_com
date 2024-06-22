

import { ApiResponse } from "@myIndiaa/utils/handlers/api-response-handler";
import { asyncHandler } from "@myIndiaa/utils/handlers/asyc-func-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { INVALID_CREDENTIALS, IUser, LOGIN_SUCCESS, LoginReqBodyType, USER_DOES_NOT_EXISTS } from "@myIndiaa/utils/types/db-user-type";
import { ApiError } from "@myIndiaa/utils/handlers/api-error-handler";
import {  schemaUserLoginBodyParams } from "@myIndiaa/lib/validations/user-validation";
import { getUserByEmailOrUsername } from "@myIndiaa/lib/user/user-query-lib";
import { matchPassword } from "@myIndiaa/lib/user/match-password-lib";
import { generateJWT } from "@myIndiaa/lib/user/generate-token-lib";


export const loginUser = asyncHandler(async (req: Request, res: Response) => {

    const body: LoginReqBodyType = schemaUserLoginBodyParams.parse(req.body);

    const existingUser: IUser | null = await getUserByEmailOrUsername(body);

    if (!existingUser) {
        throw new ApiError(StatusCodes.CONFLICT, USER_DOES_NOT_EXISTS);
    }

    const passwordMatch = await matchPassword(body.password, existingUser.password);


    if (!passwordMatch) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, INVALID_CREDENTIALS);
    };
  
    const token = await generateJWT({
        id: existingUser._id
    });

    return res.status(StatusCodes.CREATED).json(
        new ApiResponse(
            StatusCodes.OK,
            {token: token},
            LOGIN_SUCCESS
        )
    );
});