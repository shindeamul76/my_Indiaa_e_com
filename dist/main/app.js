"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_status_codes_1 = require("http-status-codes");
const user_route_1 = require("@myIndiaa/routes/user/user-route");
const product_route_1 = require("@myIndiaa/routes/product/product-route");
const payment_route_1 = require("@myIndiaa/routes/payment/payment-route");
const order_route_1 = require("@myIndiaa/routes/order/order-route");
const verify_jwt_middleware_1 = require("@myIndiaa/middlewares/verify-jwt-middleware");
exports.app = (0, express_1.default)();
exports.app.use((0, express_1.json)());
exports.app.use((0, express_1.urlencoded)({ extended: true }));
exports.app.use((0, cors_1.default)());
exports.app.use('/api/v1/auth', user_route_1.userRouters);
exports.app.use('/api/v1/product', product_route_1.productRouters);
exports.app.use('/api/v1/order', order_route_1.orderRouters);
exports.app.use('/api/v1/payment', payment_route_1.paymentRouters);
exports.app.get('/', (req, res) => {
    res.status(200).json({ message: 'Enhanced E-Commerce API!' });
});
exports.app.get('/success', verify_jwt_middleware_1.verifyJWT, (req, res) => {
    res.status(200).json({ message: 'Loggged In Successfully' });
});
exports.app.get('/_health', (req, res) => {
    return res.status(200).json({
        uptime: process.uptime(),
        message: "OK",
        timestamp: Date.now(),
    });
});
// Handle 404 errors
exports.app.use('*', (req, res) => {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Endpoint not found',
        data: null,
    });
});
