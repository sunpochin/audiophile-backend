import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/env';
console.log("jwtSecret :", jwtSecret);
import { Cart } from '../connections/mongoDB';
// import { verifyJwtToken } from '../middlewares/verifyType.middewaes';
// import { IUpdateUserRequest } from '../viewModels/controllers/auth.viewModel';
import userController from '../controllers/user.controller';
import cartController from '../controllers/cart.controller';
import authMiddleware from '../middleware/authMiddleware';
const cartRouter = express.Router();


cartRouter.get('/v1/cart/show', authMiddleware, cartController.showCart);
cartRouter.post('/v1/cart/overwrite', authMiddleware, cartController.overwriteCart);

// cartRouter.get('/cart/:userId', authMiddleware, cartController.addToCart);

export { cartRouter };
