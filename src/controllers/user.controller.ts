// controllers/userController.ts
import { Request, Response } from 'express';
import { User } from '../connections/mongoDB';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/env';

const userController = {
  register: async (req: Request, res: Response) => {
    try {
      const salt = await bcrypt.genSalt(10);
      console.log('req.body: ', req.body);
      // console.log('req.body._value: ', req.body._value);
      // console.log('req.body._value.password: ', req.body._value.password);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      console.log('hashedPassword: ', hashedPassword);
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      const result = await user.save();
      const { _id, password, ...data } = result.toJSON();

      const ret = {
        success: true,
        statusCode: 200,
        message: 'Success',
        data: {
          ...data,
        },
      };
      res.send(ret);
    } catch (error) {
      console.log('Register Error:', error);
      const ret = {
        success: false,
        statusCode: 400,
        message: 'Failure',
      };
      res.send(ret);
    }
  },

  login: async (req: Request, res: Response) => {
    try { 
      console.log('req.body: ', req.body);
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        const msg = {
          success: false,
          statusCode: 404,
          message: 'User 查詢不到資料',
          data: {
            email: req.body.email,
          },
        };
        console.log(msg);
        return res.status(404).send(msg);
      }

      if (!(await bcrypt.compare(req.body.password, user.password))) {
        const msg = {
          success: false,
          statusCode: 400,
          message: 'Invalid credentials',
          data: {
            email: req.body.email,
          },
        };
        console.log(msg);
        return res.status(400).send(msg);
      }

      const token = jwt.sign({ _id: user._id }, jwtSecret as string);
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      const { _id, password, ...data } = user.toJSON();
      res.send({
        success: true,
        statusCode: 200,
        message: 'Success',
        data: {
          ...data,
          token,
        },
      });
      // res.send(token);
      //  res.send(user);
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  },

  // getUserById: async (req: Request, res: Response) => {
  //   try {
  //     const userId = req.params.userId;
  //     const user = await User.findById(userId);
  //     res.json(user);
  //   } catch (error) {
  //     res.status(500).send('Internal Server Error');
  //   }
  // },

};

export default userController;
