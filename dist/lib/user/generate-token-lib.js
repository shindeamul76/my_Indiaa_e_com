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
exports.generateJWT = void 0;
const jose_1 = require("jose");
const generateJWT = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const secret = process.env.JWT_SECRET || 'secret';
    const jwk = yield (0, jose_1.importJWK)({ k: secret, alg: 'HS256', kty: 'oct' });
    const jwt = yield new jose_1.SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('365d')
        .sign(jwk);
    return jwt;
});
exports.generateJWT = generateJWT;
