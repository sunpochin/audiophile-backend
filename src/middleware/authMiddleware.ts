// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/env';
import { User } from '../connections/mongoDB';
import { IUser } from '../models/user.model';
import * as e from 'express';

interface JwtPayload {
  _id: string;
}
import { Types } from 'mongoose';

// interface CustomRequest<T = void> extends e.Request {
//   user?: IUserRequest;
// }
export interface IRequestBody<T = void> extends e.Request {
  body: T;
}
interface IUserRequest extends IUser {
  _id: Types.ObjectId;
}

interface IVerifyJwtTokenRequest<T = void> extends IRequestBody<T> {
  user?: IUserRequest;
}



const authMiddleware = async<T = void>(
  req: IVerifyJwtTokenRequest<T>, 
  res: Response, 
  next: NextFunction) => {
  // 從請求標頭中獲取 JWT
  const token = req.headers.authorization?.split(' ')[1];
  // let token = req.get('authorization') || (' ' as string);

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed: No token provided' });
  }

  console.log('token: ', token);
  try {
    // 驗證 JWT
    const claims = jwt.verify(token, jwtSecret as string) as JwtPayload;

    console.log('claims: ', claims);
    // 將解碼的用戶ID添加到請求對象中
    const user = await User.findById(claims._id);

    req.user = user;

    // 繼續處理下一個中間件或路由處理函數
    next();
  } catch (error) {
    console.log('error: ', error);
    return res.status(401).json({ message: 'Authentication failed: Invalid token' });
  }
};

export default authMiddleware;