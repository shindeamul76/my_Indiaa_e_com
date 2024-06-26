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
exports.deleteExistingOrder = void 0;
const api_response_handler_1 = require("@myIndiaa/utils/handlers/api-response-handler");
const asyc_func_handler_1 = require("@myIndiaa/utils/handlers/asyc-func-handler");
const http_status_codes_1 = require("http-status-codes");
const api_error_handler_1 = require("@myIndiaa/utils/handlers/api-error-handler");
const order_type_1 = require("@myIndiaa/utils/types/order-type");
const order_query_lib_1 = require("@myIndiaa/lib/order/order-query-lib");
exports.deleteExistingOrder = (0, asyc_func_handler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const existingOrder = yield (0, order_query_lib_1.getOrderByIdQuery)(id);
    if (!existingOrder) {
        throw new api_error_handler_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, order_type_1.ORDER_DOES_NOT_EXIST);
    }
    yield (0, order_query_lib_1.deleteOrderQuery)(id);
    return res.status(http_status_codes_1.StatusCodes.OK).json(new api_response_handler_1.ApiResponse(http_status_codes_1.StatusCodes.OK, null, order_type_1.ORDER_DELETE_SUCCESS));
}));
