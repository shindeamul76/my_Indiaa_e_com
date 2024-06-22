

import { loginUser } from '@myIndiaa/controllers/user/login-user-contr';
import { registerUser } from '@myIndiaa/controllers/user/register-user-contr';
// import { loginUser } from '@controllers/user/login-user-controller';
import express from 'express'


export const userRouters = express.Router();


userRouters.post('/register', registerUser);

userRouters.post('/login', loginUser)
