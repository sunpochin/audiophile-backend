import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/env';
console.log("jwtSecret :", jwtSecret);
import { User } from '../connections/mongoDB';
import userController from '../controllers/user.controller';
// import { authController } from '../controllers/auth.controller';
// import { verifyJwtToken } from '../middlewares/verifyType.middewaes';
// import { IUpdateUserRequest } from '../viewModels/controllers/auth.viewModel';

const userRouter = express.Router();

userRouter.post('/v1/register', async (req, res) => {
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
});

userRouter.post('/v1/login', async (req, res) => {
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
});

userRouter.get('/v1/user/show', userController.UserExists);

userRouter.put('/v1/user/update', userController.updateUser);

userRouter.post('/v1/logout', (_req, res) => {
  res.cookie('jwt', '', { maxAge: 0 });
  res.send({
    message: 'success',
  });
});

////////
// trying with jest unit test.
////////
const mockUser = [
  {
    id: 1,
    username: 'jane@email.com',
    password: 'Jane123',
  },
];

userRouter.get('/v1/', (_req, res) => {
  return res.status(200).send(`login`);
});

userRouter.post('/v1/', (req, res) => {
  const { username, password } = req.body;

  const user = mockUser.find(users => {
    return users.username === username && users.password === password;
  });

  if (!user) {
    return res.status(404).send('查詢不到使用者資料!');
  }

  return res.status(200).send(`Welcome ${username}`);
});

export { userRouter };
