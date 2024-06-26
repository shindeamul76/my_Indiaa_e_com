"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._UserModel = void 0;
const zod_1 = require("zod");
const mongodb_1 = require("mongodb");
exports._UserModel = zod_1.z.object({
    _id: zod_1.z.union([zod_1.z.string(), zod_1.z.instanceof(mongodb_1.ObjectId)]).optional(),
    email: zod_1.z.string().email(),
    username: zod_1.z.string(),
    password: zod_1.z.string().min(6),
    isAdmin: zod_1.z.boolean().default(false),
});
