

import { ApiResponse } from "@myIndiaa/utils/handlers/api-response-handler";
import { asyncHandler } from "@myIndiaa/utils/handlers/asyc-func-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IDBUser, IUser, USER_CREATE_SUCCESS, USER_EXISTS, UserReqBodyType } from "@myIndiaa/utils/types/db-user-type";
import { ApiError } from "@myIndiaa/utils/handlers/api-error-handler";
import bcrypt from "bcrypt"
import { schemaUserCreateBodyParams, schemaUserReadPublic, schemaUserReadPublicRes } from "@myIndiaa/lib/validations/user-validation";
import { getUserByEmailOrUsernameQuery, registerUserQuery } from "@myIndiaa/lib/user/user-query-lib";
import { _UserModel } from "@myIndiaa/utils/zod/user-zod-model";
import { ObjectId } from 'mongodb';


export const registerUser = asyncHandler(async (req: Request, res: Response) => {

    const body: UserReqBodyType = schemaUserCreateBodyParams.parse(req.body);


    const existingUser: IUser | null = await getUserByEmailOrUsernameQuery(body);

    if (existingUser) {
        throw new ApiError(StatusCodes.CONFLICT, USER_EXISTS);
    }

    const hashedPass = await bcrypt.hash(body.password, 10);

    body.password = hashedPass;

    const newUser: IUser = await registerUserQuery(body);


    return res.status(StatusCodes.CREATED).json(
        new ApiResponse(
            StatusCodes.CREATED,
            newUser,
            USER_CREATE_SUCCESS
        )
    );
});