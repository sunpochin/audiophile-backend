

// controllers/userController.ts
import { Request, Response } from 'express';
import { User } from '../connections/mongoDB';
import { Cart } from '../connections/mongoDB';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/env';
import { IVerifyJwtTokenRequest } from '../viewModels/middlewares/verifyType.viewModel';
interface DecodedToken {
  userId: string;
}

const cartController = {
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email, password });

      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ userId: user._id }, jwtSecret as string, { expiresIn: '1h' });

      res.json({ token, userId: user._id });
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  },

  overwriteCart: async (req: IVerifyJwtTokenRequest, res: Response) => {
    console.log('overwriteCart user: ', req.user);
    try {
      const user = req.user;
      // const { productId, quantity } = req.body;

      // Authentication
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Authentication failed: No token provided' });
      }

      try {
        const decodedToken = jwt.verify(token, jwtSecret as string) as DecodedToken;
        if (decodedToken.userId !== user?._id.toString()) {
          return res.status(401).json({ message: 'Authentication failed' });
        }
      } catch (error) {
        return res.status(401).json({ message: 'Authentication failed: Invalid token' });
      }

      // Create or update the user's cart
      const foundUser = await User.findById(user?._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // const shoppingCart = 
      // await Cart.findOne({ user?._id});

      // const cartItem = { productId, quantity };
      // user.cart.items.push(cartItem);
      // await user.save();

      // Create or update the cart
      // let cart = await Cart.findOne({ userId });
      // if (!cart) {
      //   cart = new Cart({ userId, items: [] });
      // } else {
      // }

      // await cart.save();

      res.json(res.json({ message: 'Cart updated' }));
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  },
};

export default cartController;
