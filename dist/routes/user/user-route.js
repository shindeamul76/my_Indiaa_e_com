"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouters = void 0;
const login_user_contr_1 = require("@myIndiaa/controllers/user/login-user-contr");
const register_user_contr_1 = require("@myIndiaa/controllers/user/register-user-contr");
// import { loginUser } from '@controllers/user/login-user-controller';
const express_1 = __importDefault(require("express"));
exports.userRouters = express_1.default.Router();
exports.userRouters.route('/register').post(register_user_contr_1.registerUser);
exports.userRouters.route('/login').post(login_user_contr_1.loginUser);
