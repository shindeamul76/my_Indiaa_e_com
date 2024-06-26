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
exports.getOrdersByProductIdQuery = exports.getAllOrdersQueryWithStatus = exports.getAllOrdersQuery = exports.getOrderByUserIdQuery = exports.getOrderByIdQuery = exports.deleteOrderQuery = exports.updateOrderQuery = exports.createOrderQuery = void 0;
const order_model_1 = require("@myIndiaa/main/db/models/order-model");
const createOrderQuery = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.Order.create(data);
});
exports.createOrderQuery = createOrderQuery;
const updateOrderQuery = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.Order.findByIdAndUpdate(id, data, { new: true });
});
exports.updateOrderQuery = updateOrderQuery;
const deleteOrderQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield order_model_1.Order.findByIdAndDelete(id);
});
exports.deleteOrderQuery = deleteOrderQuery;
const getOrderByIdQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.Order.findById(id);
});
exports.getOrderByIdQuery = getOrderByIdQuery;
const getOrderByUserIdQuery = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.Order.find({ userId });
});
exports.getOrderByUserIdQuery = getOrderByUserIdQuery;
const getAllOrdersQuery = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.Order.find({});
});
exports.getAllOrdersQuery = getAllOrdersQuery;
const getAllOrdersQueryWithStatus = (status) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.Order.find({ status }).sort({ createdAt: -1 }).limit(5);
});
exports.getAllOrdersQueryWithStatus = getAllOrdersQueryWithStatus;
const getOrdersByProductIdQuery = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.Order.find({ "products.productId": productId });
});
exports.getOrdersByProductIdQuery = getOrdersByProductIdQuery;
