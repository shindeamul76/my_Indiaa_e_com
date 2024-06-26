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
exports.getUser = void 0;
const api_response_handler_1 = require("@myIndiaa/utils/handlers/api-response-handler");
const asyc_func_handler_1 = require("@myIndiaa/utils/handlers/asyc-func-handler");
const http_status_codes_1 = require("http-status-codes");
const api_error_handler_1 = require("@myIndiaa/utils/handlers/api-error-handler");
const user_query_lib_1 = require("@myIndiaa/lib/user/user-query-lib");
const db_user_type_1 = require("@myIndiaa/utils/types/db-user-type");
const user_validation_1 = require("@myIndiaa/lib/validations/user-validation");
exports.getUser = (0, asyc_func_handler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const existingUser = yield (0, user_query_lib_1.getUserByIdQuery)(id);
    if (!existingUser) {
        throw new api_error_handler_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, db_user_type_1.USER_DOES_NOT_EXISTS);
    }
    const publicData = user_validation_1.schemaUserReadPublic.parse(existingUser);
    return res.status(http_status_codes_1.StatusCodes.OK).json(new api_response_handler_1.ApiResponse(http_status_codes_1.StatusCodes.OK, publicData, db_user_type_1.USER_FETCH_SUCCESS));
}));
