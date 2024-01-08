// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/env';
import { User } from '../connections/mongoDB';
import { IUser } from '../models/user.model';
import * as e from 'express';
import { HttpStatusCode, HttpMessage } from './handle.enum';
import { handleResponse } from '../helpers/handle.helper';
import { JwtPayload } from './verifyType.type';
import { Types } from 'mongoose';

// interface JwtPayload {
//   _id: string;
// }

// interface CustomRequest<T = void> extends e.Request {
//   user?: IUserRequest;
// }
export interface IRequestBody<T = void> extends e.Request {
  body: T;
}
interface IUserRequest extends IUser {
  _id: Types.ObjectId;
}

// interface IVerifyJwtTokenRequest<T = void> extends IRequestBody<T> {
//   user?: IUserRequest;
// }

import {
  IVerifyJwtTokenRequest,
  IVerifyObjectIdsRequest,
} from '../viewModels/middlewares/verifyType.viewModel';


const authMiddleware = async<T = void>(
  req: IVerifyJwtTokenRequest<T>, 
  res: Response, 
  next: NextFunction) => {

  try {
    let auth = req.get('authorization') || (' ' as string);

    if (!auth) return handleResponse(res, HttpStatusCode.BadRequest, '請登入帳密');
    
    const tokenPrefix = 'Bearer ';
    if (auth.startsWith(tokenPrefix)) auth = auth.slice(tokenPrefix.length);

    const claims = jwt.verify(auth, jwtSecret) as JwtPayload;

    if (!claims) return handleResponse(res, HttpStatusCode.BadRequest, '請登入帳密');

    const user = await User.findById(claims._id);

    if (!user) return handleResponse(res, HttpStatusCode.BadRequest, 'user 查詢不到資料');

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }

  // // 從請求標頭中獲取 JWT
  // const token = req.headers.authorization?.split(' ')[1];
  // // let token = req.get('authorization') || (' ' as string);

  // if (!token) {
  //   return res.status(401).json({ message: 'Authentication failed: No token provided' });
  // }

  // console.log('token: ', token);
  // try {
  //   // 驗證 JWT
  //   const claims = jwt.verify(token, jwtSecret as string) as JwtPayload;

  //   console.log('claims: ', claims);
  //   // 將解碼的用戶ID添加到請求對象中
  //   const user = await User.findById(claims._id);

  //   req.user = user;

  //   // 繼續處理下一個中間件或路由處理函數
  //   next();
  // } catch (error) {
  //   console.log('error: ', error);
  //   return res.status(401).json({ message: 'Authentication failed: Invalid token' });
  // }
};

export default authMiddleware;