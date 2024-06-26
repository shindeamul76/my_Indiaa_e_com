import { describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { app } from '@myIndiaa/main/app';
import { StatusCodes } from 'http-status-codes';

describe('POST /api/v1/auth/register', () => {
    it('checkin the health', async () => {
      const res = await request(app).get('/').send();
  
      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body.message).toBe('Enhanced E-Commerce API!');
    });
  
  });