"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaOrderReadPublic = exports.schemaOrderCreateBodyParams = exports.schemaOrderEditBodyParams = exports.schemaOrderBaseBodyParams = void 0;
const order_zod_model_1 = require("@myIndiaa/utils/zod/order-zod-model");
const zod_1 = require("zod");
exports.schemaOrderBaseBodyParams = order_zod_model_1._OrderModel.pick({
    _id: true,
    userId: true,
    products: true,
    amount: true,
    address: true,
    status: true,
    createdAt: true,
    updatedAt: true,
}).partial();
const schemaOrderEditParams = zod_1.z.object({
    userId: zod_1.z.string().min(1, "User ID cannot be empty").optional(),
    products: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z.string().min(1, "Product ID cannot be empty"),
        quantity: zod_1.z.number().positive("Quantity must be greater than zero").default(1),
    })).optional(),
    amount: zod_1.z.number().positive("Amount must be greater than zero").optional(),
    address: zod_1.z.object({}),
    status: zod_1.z.string().optional(),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
const schemaOrderCreateParams = zod_1.z.object({
    userId: zod_1.z.string().min(1, "User ID cannot be empty"),
    products: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z.string().min(1, "Product ID cannot be empty"),
        quantity: zod_1.z.number().positive("Quantity must be greater than zero").default(1),
    })).min(1, "Products array cannot be empty"),
    amount: zod_1.z.number().positive("Amount must be greater than zero"),
    address: zod_1.z.object({}),
    status: zod_1.z.string().default('pending'),
});
exports.schemaOrderEditBodyParams = exports.schemaOrderBaseBodyParams
    .merge(schemaOrderEditParams)
    .omit({})
    .partial()
    .strict();
exports.schemaOrderCreateBodyParams = exports.schemaOrderBaseBodyParams
    .merge(schemaOrderCreateParams)
    .omit({})
    .strict();
exports.schemaOrderReadPublic = order_zod_model_1._OrderModel.pick({
    _id: true,
    userId: true,
    products: true,
    amount: true,
    address: true,
    status: true,
    createdAt: true,
    updatedAt: true,
}).partial();
