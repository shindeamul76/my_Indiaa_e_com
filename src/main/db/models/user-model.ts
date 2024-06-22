import { IUser } from "@myIndiaa/utils/types/db-user-type";
import mongoose, { Schema } from "mongoose";



const UserSchema: Schema<IUser> = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });



export const User = mongoose.model<IUser>('User', UserSchema);