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
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("@myIndiaa/main/app");
const user_model_1 = require("@myIndiaa/main/db/models/user-model");
const http_status_codes_1 = require("http-status-codes");
vitest_1.vi.mock('@myIndiaa/main/db/models/user-model', () => ({
    User: {
        create: vitest_1.vi.fn(),
        findOne: vitest_1.vi.fn()
    }
}));
(0, vitest_1.describe)('POST /api/v1/auth/register', () => {
    (0, vitest_1.it)('should create a new user and return the user data', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = {
            username: "amul__46",
            email: "amul43455@gmail.com",
            password: "123456"
        };
        user_model_1.User.create.mockResolvedValue(mockUser);
        const res = yield (0, supertest_1.default)(app_1.app).post('/api/v1/auth/register').send(mockUser);
        // expect(User.create).toHaveBeenCalledWith(mockUser);
        (0, vitest_1.expect)(res.body.statusCode).toBe(http_status_codes_1.StatusCodes.CREATED);
        (0, vitest_1.expect)(res.body.data.username).toBe(mockUser.username);
        (0, vitest_1.expect)(res.body.data.email).toBe(mockUser.email);
    }));
    (0, vitest_1.it)('should return 400 if required inputs are not provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = {
            username: "amul__46",
            email: "amul43455@gmail.com",
        };
        user_model_1.User.create.mockResolvedValue(mockUser);
        const res = yield (0, supertest_1.default)(app_1.app).post('/api/v1/auth/register').send({});
        (0, vitest_1.expect)(res.statusCode).toBe(http_status_codes_1.StatusCodes.BAD_REQUEST);
        (0, vitest_1.expect)(res.body.message).toBe("Validation Failed");
    }));
});
