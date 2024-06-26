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
exports.makePayment = void 0;
const api_response_handler_1 = require("@myIndiaa/utils/handlers/api-response-handler");
const asyc_func_handler_1 = require("@myIndiaa/utils/handlers/asyc-func-handler");
const http_status_codes_1 = require("http-status-codes");
const uuid_1 = require("uuid");
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_KEY);
exports.makePayment = (0, asyc_func_handler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate request body
    const body = req.body;
    // Generate an idempotency key
    const idempotencyKey = (0, uuid_1.v4)();
    // Create a new Stripe customer
    const customer = yield stripe.customers.create({
        email: body.token.email,
        source: body.token.id,
    });
    // Create a new charge
    const charge = yield stripe.charges.create({
        amount: body.product.price * 100, // Convert amount to cents
        currency: 'usd',
        customer: customer.id,
        receipt_email: body.token.email,
        description: `Purchase of ${body.product.name}`,
        shipping: {
            name: body.token.card.name,
            address: {
                country: body.token.card.address_country,
            },
        },
    }, {
        idempotencyKey,
    });
    // Create response data
    const publicData = {
        id: charge.id,
        amount: charge.amount,
        currency: charge.currency,
        status: charge.status,
        receiptEmail: charge.receipt_email,
    };
    // Send success response
    return res.status(http_status_codes_1.StatusCodes.CREATED).json(new api_response_handler_1.ApiResponse(http_status_codes_1.StatusCodes.CREATED, publicData, "successfully completed payment"));
}));
