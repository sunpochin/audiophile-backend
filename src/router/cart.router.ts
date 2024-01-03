import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/env';
console.log("jwtSecret :", jwtSecret);
import { User } from '../connections/mongoDB';
import { authController } from '../controllers/auth.controller';
// import { verifyJwtToken } from '../middlewares/verifyType.middewaes';
// import { IUpdateUserRequest } from '../viewModels/controllers/auth.viewModel';


import userController from '../controllers/user.controller';
import authMiddleware from '../middleware/authMiddleware';
const authRouter = express.Router();
const haha = async (req, res, next) => {
  console.log("haha");
}
authRouter.get('/v1/cart/show', haha, authController.UserExists);

authRouter.post('/users/:userId/cart', authMiddleware, userController.addToCart);

export { authRouter };
