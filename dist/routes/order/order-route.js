"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouters = void 0;
const create_order_contr_1 = require("@myIndiaa/controllers/order/create-order-contr");
const delete_order_contr_1 = require("@myIndiaa/controllers/order/delete-order-contr");
const get_all_orders_contr_1 = require("@myIndiaa/controllers/order/get-all-orders-contr");
const get_user_orders_contr_1 = require("@myIndiaa/controllers/order/get-user-orders-contr");
const update_order_contr_1 = require("@myIndiaa/controllers/order/update-order-contr");
const express_1 = __importDefault(require("express"));
exports.orderRouters = express_1.default.Router();
exports.orderRouters.route('/').post(create_order_contr_1.createOrder);
exports.orderRouters.route('/:id').put(update_order_contr_1.updateExistingOrder);
exports.orderRouters.route('/:id').delete(delete_order_contr_1.deleteExistingOrder);
exports.orderRouters.route('/find/user/:id').get(get_user_orders_contr_1.getUserOrders);
exports.orderRouters.route('/').get(get_all_orders_contr_1.getAllOrders);
