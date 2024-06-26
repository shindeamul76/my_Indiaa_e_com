"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._OrderModel = void 0;
const zod_1 = require("zod");
const mongodb_1 = require("mongodb");
exports._OrderModel = zod_1.z.object({
    _id: zod_1.z.optional(zod_1.z.union([zod_1.z.string(), zod_1.z.instanceof(mongodb_1.ObjectId)])),
    userId: zod_1.z.string().min(1, "User ID cannot be empty"),
    products: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z.string().min(1, "Product ID cannot be empty"),
        quantity: zod_1.z.number().positive("Quantity must be greater than zero").default(1),
    })).min(1, "Products array cannot be empty"),
    amount: zod_1.z.number().positive("Amount must be greater than zero"),
    address: zod_1.z.object({}),
    status: zod_1.z.string().default('pending'),
    createdAt: zod_1.z.date().default(new Date()),
    updatedAt: zod_1.z.date().default(new Date()),
});
