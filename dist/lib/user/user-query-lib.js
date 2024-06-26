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
exports.getAllUsersQuery = exports.getUserByEmailOrUsernameQuery = exports.getUserByIdQuery = exports.deleteUserQuery = exports.updateUserQuery = exports.registerUserQuery = void 0;
const user_model_1 = require("@myIndiaa/main/db/models/user-model");
const registerUserQuery = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.create(data);
});
exports.registerUserQuery = registerUserQuery;
const updateUserQuery = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findByIdAndUpdate(id, data, { new: true });
});
exports.updateUserQuery = updateUserQuery;
const deleteUserQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.User.findByIdAndDelete(id);
});
exports.deleteUserQuery = deleteUserQuery;
const getUserByIdQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findById(id);
});
exports.getUserByIdQuery = getUserByIdQuery;
const getUserByEmailOrUsernameQuery = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findOne({
        $or: [
            { email: data.email },
            { username: data.username }
        ]
    });
});
exports.getUserByEmailOrUsernameQuery = getUserByEmailOrUsernameQuery;
const getAllUsersQuery = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.find({});
});
exports.getAllUsersQuery = getAllUsersQuery;
