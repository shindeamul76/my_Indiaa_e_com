"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProductsQueryWithCategory = exports.getAllProductsQueryWithQ = exports.getAllProductsQuery = exports.getProductByTitleOrDescriptionQuery = exports.getProductByIdQuery = exports.deleteProductQuery = exports.updateProductQuery = exports.createProductQuery = void 0;
const product_model_1 = require("@myIndiaa/main/db/models/product-model");
const createProductQuery = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.create(data);
});
exports.createProductQuery = createProductQuery;
const updateProductQuery = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.findByIdAndUpdate(id, data, { new: true });
});
exports.updateProductQuery = updateProductQuery;
const deleteProductQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield product_model_1.Product.findByIdAndDelete(id);
});
exports.deleteProductQuery = deleteProductQuery;
const getProductByIdQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.findById(id);
});
exports.getProductByIdQuery = getProductByIdQuery;
const getProductByTitleOrDescriptionQuery = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.findOne({
        $or: [
            { title: data.title },
            { desc: data.desc }
        ]
    });
});
exports.getProductByTitleOrDescriptionQuery = getProductByTitleOrDescriptionQuery;
const getAllProductsQuery = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.find({});
});
exports.getAllProductsQuery = getAllProductsQuery;
const getAllProductsQueryWithQ = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.find().sort({ createdAt: -1 }).limit(5);
});
exports.getAllProductsQueryWithQ = getAllProductsQueryWithQ;
const getAllProductsQueryWithCategory = (qCategory) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.find({
        categories: {
            $in: [qCategory],
        },
    });
});
exports.getAllProductsQueryWithCategory = getAllProductsQueryWithCategory;
