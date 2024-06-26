"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouters = void 0;
const create_product_contr_1 = require("@myIndiaa/controllers/product/create-product-contr");
const delete_product_contr_1 = require("@myIndiaa/controllers/product/delete-product-contr");
const get_all_products_contr_1 = require("@myIndiaa/controllers/product/get-all-products-contr");
const get_product_by_id_contr_1 = require("@myIndiaa/controllers/product/get-product-by-id-contr");
const update_product_contr_1 = require("@myIndiaa/controllers/product/update-product-contr");
const express_1 = __importDefault(require("express"));
exports.productRouters = express_1.default.Router();
exports.productRouters.route('/').post(create_product_contr_1.createProduct);
exports.productRouters.route('/:id').put(update_product_contr_1.updateExistingProduct);
exports.productRouters.route('/:id').delete(delete_product_contr_1.deleteExistingProduct);
exports.productRouters.route('/find/:id').get(get_product_by_id_contr_1.getProduct);
exports.productRouters.route('/').get(get_all_products_contr_1.getAllProducts);
