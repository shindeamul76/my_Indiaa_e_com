

import { ApiResponse } from "@myIndiaa/utils/handlers/api-response-handler";
import { asyncHandler } from "@myIndiaa/utils/handlers/asyc-func-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';



const stripe = new Stripe(process.env.STRIPE_KEY as string);



export const makePayment = asyncHandler(async (req: Request, res: Response) => {

    const body = req.body;


    const idempotencyKey = uuidv4();


    const customer = await stripe.customers.create({
        email: body.token.email,
        source: body.token.id,
    });


    const charge = await stripe.charges.create(
        {
            amount: body.product.price * 100, 
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
        },
        {
            idempotencyKey,
        }
    );


    const publicData = {
        id: charge.id,
        amount: charge.amount,
        currency: charge.currency,
        status: charge.status,
        receiptEmail: charge.receipt_email,
    };


    return res.status(StatusCodes.CREATED).json(
        new ApiResponse(
            StatusCodes.CREATED,
            publicData,
            "successfully completed payment"
        )
    );

    
});