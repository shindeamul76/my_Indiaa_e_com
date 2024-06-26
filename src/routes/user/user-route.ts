

import { getUser } from '@myIndiaa/controllers/user/get-user-by-id-contr';
import { loginUser } from '@myIndiaa/controllers/user/login-user-contr';
import { registerUser } from '@myIndiaa/controllers/user/register-user-contr';
import { updateExistingUser } from '@myIndiaa/controllers/user/update-user-contr';
import express from 'express'


export const userRouters = express.Router();


userRouters.route('/register').post( registerUser );

userRouters.route('/login').post( loginUser );

userRouters.route('/:id').put( updateExistingUser );

userRouters.route('/:id').get( getUser );
