"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._ProductModel = void 0;
const zod_1 = require("zod");
const mongodb_1 = require("mongodb");
exports._ProductModel = zod_1.z.object({
    _id: zod_1.z.optional(zod_1.z.union([zod_1.z.string(), zod_1.z.instanceof(mongodb_1.ObjectId)])),
    title: zod_1.z.string().min(1, "Title cannot be empty"),
    desc: zod_1.z.string().min(1, "Description cannot be empty"),
    img: zod_1.z.string().min(1, "Image URL cannot be empty"),
    categories: zod_1.z.array(zod_1.z.string()).optional(),
    size: zod_1.z.array(zod_1.z.string()).optional(),
    color: zod_1.z.array(zod_1.z.string()).optional(),
    price: zod_1.z.number().positive("Price must be greater than zero"),
    inStock: zod_1.z.boolean().default(true),
});
