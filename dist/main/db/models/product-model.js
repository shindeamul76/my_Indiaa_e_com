"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true,
    },
    categories: {
        type: [String],
    },
    size: {
        type: [String],
    },
    color: {
        type: [String],
    },
    price: {
        type: Number,
        required: true
    },
    inStock: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
exports.Product = mongoose_1.default.model('Product', ProductSchema);
