import { Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    isAdmin?: boolean;
}

export interface IDBUser extends IUser {
    _id: string 
}

export type UserBaseType = {
    username: string;
    password: string;
};

export type UserReqBodyType = UserBaseType & {
    email: string;
};

export type LoginReqBodyType = 
{ email?: string; password: string; username?: string}
  


export const USER_EXISTS = "User Already Exists";

export const USER_CREATE_SUCCESS = "User Created Successfully";

export const USER_DOES_NOT_EXISTS = "User Not Exists Please Register First";

export const INVALID_CREDENTIALS = "Invalid Credentials";

export const LOGIN_SUCCESS = "User Logged In Successfully";

export const TOKEN_NOT_FOUND = "Please Login First";

export const AUTHENTICATION_FAILED = "Authentication failed";

export const TOKEN_EXPIRED = "Token Expired";

export const REQUIRED_EMAIL_OR_USERNAME = "Enter email or username to login"