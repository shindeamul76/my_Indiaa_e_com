import { describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { app } from '@myIndiaa/main/app';
import { User } from '@myIndiaa/main/db/models/user-model';
import { StatusCodes } from 'http-status-codes';


vi.mock('@myIndiaa/main/db/models/user-model', () => ({
   User: {
    create: vi.fn(),
    findOne: vi.fn()
  }
}));


describe('POST /api/v1/auth/register', () => {
  it('should create a new user and return the user data', async () => {
    const mockUser = {
      username: "amul__46",
      email: "amul43455@gmail.com",
      password: "123456"
    };

    (User.create as any).mockResolvedValue(mockUser);
    const res = await request(app).post('/api/v1/auth/register').send(mockUser)
    // expect(User.create).toHaveBeenCalledWith(mockUser);

    expect(res.body.statusCode).toBe(StatusCodes.CREATED);
    expect(res.body.data.username).toBe(mockUser.username);
    expect(res.body.data.email).toBe(mockUser.email);
  });


  it('should return 400 if required inputs are not provided', async () => {

    const mockUser = {
      username: "amul__46",
      email: "amul43455@gmail.com",
    };

    (User.create as any).mockResolvedValue(mockUser);
    
    const res = await request(app).post('/api/v1/auth/register').send({});
    
    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body.message).toBe("Validation Failed");
  });


});


