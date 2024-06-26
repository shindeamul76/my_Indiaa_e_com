"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaUserReadPublic = exports.schemaUserLoginBodyParams = exports.schemaUserCreateBodyParams = exports.schemaUserEditBodyParams = exports.schemaUserLoginParams = exports.schemaUserBaseBodyParams = void 0;
const user_zod_model_1 = require("@myIndiaa/utils/zod/user-zod-model");
const zod_1 = require("zod");
exports.schemaUserBaseBodyParams = user_zod_model_1._UserModel.pick({
    _id: true,
    email: true,
    username: true,
    password: true,
}).partial();
const schemaUserEditParams = zod_1.z.object({
    email: zod_1.z.string().email().toLowerCase().optional(),
    username: zod_1.z.string().optional(),
    password: zod_1.z.string().min(6).optional(),
});
exports.schemaUserLoginParams = zod_1.z.object({
    email: zod_1.z.string().email().toLowerCase().optional(),
    username: zod_1.z.string().optional(),
    password: zod_1.z.string().min(6),
});
const schemaUserCreateParams = zod_1.z.object({
    email: zod_1.z.string().email().toLowerCase(),
    username: zod_1.z.string(),
    password: zod_1.z.string().min(6),
});
exports.schemaUserEditBodyParams = exports.schemaUserBaseBodyParams
    .merge(schemaUserEditParams)
    .omit({})
    .partial()
    .strict();
exports.schemaUserCreateBodyParams = exports.schemaUserBaseBodyParams
    .merge(schemaUserCreateParams)
    .omit({})
    .strict();
exports.schemaUserLoginBodyParams = exports.schemaUserBaseBodyParams
    .merge(exports.schemaUserLoginParams)
    .omit({})
    .strict();
exports.schemaUserReadPublic = user_zod_model_1._UserModel.pick({
    _id: true,
    email: true,
    username: true,
}).partial();
