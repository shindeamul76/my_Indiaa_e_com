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
exports.getAllProducts = void 0;
const api_response_handler_1 = require("@myIndiaa/utils/handlers/api-response-handler");
const asyc_func_handler_1 = require("@myIndiaa/utils/handlers/asyc-func-handler");
const http_status_codes_1 = require("http-status-codes");
const product_type_1 = require("@myIndiaa/utils/types/product-type");
const product_query_lib_1 = require("@myIndiaa/lib/product/product-query-lib");
const product_validaton_1 = require("@myIndiaa/lib/validations/product-validaton");
exports.getAllProducts = (0, asyc_func_handler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    let products;
    if (qNew) {
        products = yield (0, product_query_lib_1.getAllProductsQueryWithQ)();
    }
    else if (qCategory) {
        products = yield (0, product_query_lib_1.getAllProductsQueryWithCategory)(qCategory);
    }
    else {
        products = yield (0, product_query_lib_1.getAllProductsQuery)();
    }
    const publicProducts = products.map(product => {
        const publicData = product_validaton_1.schemaProductReadPublic.parse(product.toObject());
        return publicData;
    });
    return res.status(http_status_codes_1.StatusCodes.OK).json(new api_response_handler_1.ApiResponse(http_status_codes_1.StatusCodes.OK, publicProducts, product_type_1.PRODUCT_FETCH_SUCCESS));
}));
