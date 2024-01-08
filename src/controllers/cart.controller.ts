

// controllers/userController.ts
import { Request, Response } from 'express';
import { User } from '../connections/mongoDB';
import { Cart } from '../connections/mongoDB';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/env';
import { IVerifyJwtTokenRequest } from '../viewModels/middlewares/verifyType.viewModel';
import { JwtPayload } from '../middleware/verifyType.type';
interface DecodedToken {
  userId: string;
}

const cartController = {
  overwriteCart: async (req: IVerifyJwtTokenRequest, res: Response) => {
    const jsonString = JSON.stringify(req.body);
//    const jsonObj = {items: JSON.parse(jsonString)};
    const jsonObj = JSON.parse(jsonString);
    console.log('jsonObj: ', jsonObj);
    try {
      const user = req.user;
      // Authentication
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Authentication failed: No token provided' });
      }
      let claim = {} as JwtPayload;
      try {
        claim = jwt.verify(token, jwtSecret as string) as JwtPayload;
        console.log('user?._id:', user?._id.toString());
        if (claim._id !== user?._id.toString()) {
          console.log('claim !== user?._id.toString()');
          return res.status(401).json({ message: 'Authentication failed' });
        }
      } catch (error) {
        return res.status(401).json({ message: 'Authentication failed: Invalid token' });
      }
      // Create or update the user's cart
      console.log('Create or update the users cart');
      let cart = await Cart.findById(claim._id);
      const result = await Cart.insertMany({userId: claim._id, items: jsonObj});
      console.log('result: ', result);
      if (!cart) {
        return res.status(404).json({ message: 'cart not found' });
      }
      console.log('req.body: ', req.body);
      if (!cart) {
        cart = new Cart({ userID: user._id, items: [] });
      } else {
      }

      await cart.save();

      res.json({ message: 'Cart updated' });
    } catch (error) {
      console.log('object :', error);
      res.status(500).send('Internal Server Error');
    }
  },
};

export default cartController;
