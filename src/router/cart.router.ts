import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/env';
console.log("jwtSecret :", jwtSecret);
import { Cart } from '../connections/mongoDB';
import { authController } from '../controllers/auth.controller';
// import { verifyJwtToken } from '../middlewares/verifyType.middewaes';
// import { IUpdateUserRequest } from '../viewModels/controllers/auth.viewModel';
import userController from '../controllers/user.controller';
import authMiddleware from '../middleware/authMiddleware';
const cartRouter = express.Router();

cartRouter.post('/users/:userId/cart', authMiddleware, userController.addToCart);

// cartRouter.get('/v1/cart/show', authMiddleware, authController.UserExists);
cartRouter.get('/v1/cart/show', authMiddleware, async (req, res) => {
  console.log('cart');
  const users = await Cart.find({});
  res.send(users);
});


export { cartRouter };
