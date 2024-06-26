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
const nock_1 = __importDefault(require("nock"));
const app_1 = require("@myIndiaa/main/app"); // Adjust the path to your app
const http_status_codes_1 = require("http-status-codes");
(0, vitest_1.describe)('POST /api/v1/payment', () => {
    const stripeBaseUrl = 'https://api.stripe.com';
    (0, vitest_1.beforeEach)(() => {
        // Mock the Stripe customers.create endpoint
        (0, nock_1.default)(stripeBaseUrl)
            .post('/v1/customers')
            .reply(200, {
            id: 'cus_1234567890',
            email: 'test@example.com',
        });
        // Mock the Stripe charges.create endpoint
        (0, nock_1.default)(stripeBaseUrl)
            .post('/v1/charges')
            .reply(200, {
            id: 'ch_1234567890',
            amount: 2000,
            currency: 'usd',
            status: 'succeeded',
            receipt_email: 'test@example.com',
        });
    });
    (0, vitest_1.afterEach)(() => {
        nock_1.default.cleanAll();
    });
    (0, vitest_1.it)('should create a new charge and return payment details', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockRequestBody = {
            token: {
                email: 'test@example.com',
                id: 'tok_1234567890',
                card: {
                    name: 'John Doe',
                    address_country: 'US',
                },
            },
            product: {
                price: 20,
                name: 'Test Product',
            },
        };
        const res = yield (0, supertest_1.default)(app_1.app)
            .post('/api/v1/payment')
            .send(mockRequestBody);
        (0, vitest_1.expect)(res.statusCode).toBe(http_status_codes_1.StatusCodes.CREATED);
        (0, vitest_1.expect)(res.body.data).toEqual({
            id: 'ch_1234567890',
            amount: 2000,
            currency: 'usd',
            status: 'succeeded',
            receiptEmail: 'test@example.com',
        });
        (0, vitest_1.expect)(res.body.message).toBe('successfully completed payment');
    }));
    (0, vitest_1.it)('should return an error if the Stripe customer creation fails', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the Stripe customers.create endpoint to fail
        nock_1.default.cleanAll();
        (0, nock_1.default)(stripeBaseUrl)
            .post('/v1/customers')
            .replyWithError('Something went wrong');
        const mockRequestBody = {
            token: {
                email: 'test@example.com',
                id: 'tok_1234567890',
                card: {
                    name: 'John Doe',
                    address_country: 'US',
                },
            },
            product: {
                price: 20,
                name: 'Test Product',
            },
        };
        const res = yield (0, supertest_1.default)(app_1.app)
            .post('/api/v1/payment')
            .send(mockRequestBody);
        (0, vitest_1.expect)(res.statusCode).toBe(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        (0, vitest_1.expect)(res.body.message).toBe('Something went wrong');
    }));
});
