"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaProductReadPublic = exports.schemaProductCreateBodyParams = exports.schemaProductEditBodyParams = exports.schemaProductBaseBodyParams = void 0;
const product_zod_model_1 = require("@myIndiaa/utils/zod/product-zod-model");
const zod_1 = require("zod");
exports.schemaProductBaseBodyParams = product_zod_model_1._ProductModel.pick({
    _id: true,
    title: true,
    desc: true,
    img: true,
    categories: true,
    size: true,
    color: true,
    price: true,
    inStock: true,
}).partial();
const schemaProductEditParams = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title cannot be empty").optional(),
    desc: zod_1.z.string().min(1, "Description cannot be empty").optional(),
    img: zod_1.z.string().min(1, "Image URL cannot be empty").optional(),
    categories: zod_1.z.array(zod_1.z.string()).optional(),
    size: zod_1.z.array(zod_1.z.string()).optional(),
    color: zod_1.z.array(zod_1.z.string()).optional(),
    price: zod_1.z.number().positive("Price must be greater than zero").optional(),
    inStock: zod_1.z.boolean().optional(),
});
const schemaProductCreateParams = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title cannot be empty"),
    desc: zod_1.z.string().min(1, "Description cannot be empty"),
    img: zod_1.z.string().min(1, "Image URL cannot be empty"),
    categories: zod_1.z.array(zod_1.z.string()).optional(),
    size: zod_1.z.array(zod_1.z.string()).optional(),
    color: zod_1.z.array(zod_1.z.string()).optional(),
    price: zod_1.z.number().positive("Price must be greater than zero"),
    inStock: zod_1.z.boolean().default(true),
});
exports.schemaProductEditBodyParams = exports.schemaProductBaseBodyParams
    .merge(schemaProductEditParams)
    .omit({})
    .partial()
    .strict();
exports.schemaProductCreateBodyParams = exports.schemaProductBaseBodyParams
    .merge(schemaProductCreateParams)
    .omit({})
    .strict();
exports.schemaProductReadPublic = product_zod_model_1._ProductModel.pick({
    _id: true,
    title: true,
    desc: true,
    img: true,
    price: true,
    inStock: true,
    categories: true,
    size: true,
    color: true,
}).partial();
