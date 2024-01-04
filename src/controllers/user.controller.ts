// controllers/userController.ts
import { Request, Response } from 'express';
import { User } from '../connections/mongoDB';
import { Cart } from '../connections/mongoDB';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/env';

interface DecodedToken {
  userId: string;
}

const userController = {
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

  UserExists: async (req: Request, res: Response) => {
  },
  updateUser: async (req: Request, res: Response) => {
  },

  getUserById: async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);
      res.json(user);
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  },

  addToCart: async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const { productId, quantity } = req.body;

      // Authentication
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Authentication failed: No token provided' });
      }

      try {
        const decodedToken = jwt.verify(token, jwtSecret as string) as DecodedToken;
        if (decodedToken.userId !== userId) {
          return res.status(401).json({ message: 'Authentication failed' });
        }
      } catch (error) {
        return res.status(401).json({ message: 'Authentication failed: Invalid token' });
      }

      // Create or update the user's cart
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const cartItem = { productId, quantity };
      // user.cart.items.push(cartItem);
      await user.save();

      // Create or update the cart
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({ userId, items: [cartItem] });
      } else {
        // const existingCartItem = cart.items.find(item => item.productId.equals(productId));

        // if (existingCartItem) {
        //   existingCartItem.quantity += quantity;
        // } else {
        //   cart.items.push(cartItem);
        // }
      }

      await cart.save();

      res.json(user);
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  },
};

export default userController;
