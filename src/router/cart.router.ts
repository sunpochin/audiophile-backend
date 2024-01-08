import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/env';
import { Cart } from '../connections/mongoDB';
import userController from '../controllers/user.controller';
import cartController from '../controllers/cart.controller';
import authMiddleware from '../middleware/authMiddleware';
const cartRouter = express.Router();


cartRouter.get('/v1/cart/show', authMiddleware, cartController.showCart);
cartRouter.post('/v1/cart/overwrite', authMiddleware, cartController.overwriteCart);

export { cartRouter };
