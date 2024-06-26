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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const api_response_handler_1 = require("@myIndiaa/utils/handlers/api-response-handler");
const asyc_func_handler_1 = require("@myIndiaa/utils/handlers/asyc-func-handler");
const http_status_codes_1 = require("http-status-codes");
const db_user_type_1 = require("@myIndiaa/utils/types/db-user-type");
const api_error_handler_1 = require("@myIndiaa/utils/handlers/api-error-handler");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_validation_1 = require("@myIndiaa/lib/validations/user-validation");
const user_query_lib_1 = require("@myIndiaa/lib/user/user-query-lib");
exports.registerUser = (0, asyc_func_handler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = user_validation_1.schemaUserCreateBodyParams.parse(req.body);
    const existingUser = yield (0, user_query_lib_1.getUserByEmailOrUsername)(body);
    if (existingUser) {
        throw new api_error_handler_1.ApiError(http_status_codes_1.StatusCodes.CONFLICT, db_user_type_1.USER_EXISTS);
    }
    const hashedPass = yield bcrypt_1.default.hash(body.password, 10);
    body.password = hashedPass;
    const newUser = yield (0, user_query_lib_1.registerUserQuery)(body);
    const publicData = user_validation_1.schemaUserReadPublic.parse(newUser);
    return res.status(http_status_codes_1.StatusCodes.CREATED).json(new api_response_handler_1.ApiResponse(http_status_codes_1.StatusCodes.CREATED, publicData, db_user_type_1.USER_CREATE_SUCCESS));
}));
