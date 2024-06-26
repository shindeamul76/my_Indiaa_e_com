import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import nock from 'nock';
import { app } from '@myIndiaa/main/app'; 
import { StatusCodes } from 'http-status-codes';

describe('POST /api/v1/payment', () => {
  const stripeBaseUrl = 'https://api.stripe.com';

  beforeEach(() => {

    nock(stripeBaseUrl)
      .post('/v1/customers')
      .reply(200, {
        id: 'cus_1234567890',
        email: 'test@example.com',
      });


    nock(stripeBaseUrl)
      .post('/v1/charges')
      .reply(200, {
        id: 'ch_1234567890',
        amount: 2000,
        currency: 'usd',
        status: 'succeeded',
        receipt_email: 'test@example.com',
      });
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should create a new charge and return payment details', async () => {
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

    const res = await request(app)
      .post('/api/v1/payment')
      .send(mockRequestBody);

    expect(res.statusCode).toBe(StatusCodes.CREATED);
    expect(res.body.data).toEqual({
      id: 'ch_1234567890',
      amount: 2000,
      currency: 'usd',
      status: 'succeeded',
      receiptEmail: 'test@example.com',
    });
    expect(res.body.message).toBe('successfully completed payment');
  });


  it('should return an error if the Stripe customer creation fails', async () => {

    nock.cleanAll();
    nock(stripeBaseUrl)
      .post('/v1/customers')
      .replyWithError('An error occurred with our connection to Stripe. Request was retried 1 times.');

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

    const res = await request(app)
      .post('/api/v1/payment')
      .send(mockRequestBody);

    expect(res.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body.message).toContain('An error occurred with our connection to Stripe');
});

});
