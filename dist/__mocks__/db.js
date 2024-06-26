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
exports.mongooseClient = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const vitest_1 = require("vitest");
const vitest_mock_extended_1 = require("vitest-mock-extended");
const user_model_1 = require("@myIndiaa/main/db/models/user-model");
const mongoServer = new mongodb_memory_server_1.MongoMemoryServer();
exports.mongooseClient = (0, vitest_mock_extended_1.mockDeep)();
exports.mongooseClient.model.mockImplementation((modelName) => {
    switch (modelName) {
        case 'User':
            return mongoose_1.default.model('User', user_model_1.UserSchema);
        default:
            throw new Error(`Unknown model: ${modelName}`);
    }
});
(0, vitest_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
    (0, vitest_mock_extended_1.mockReset)(exports.mongooseClient);
    const uri = yield mongoServer.getUri();
    yield mongoose_1.default.connect(uri);
}));
