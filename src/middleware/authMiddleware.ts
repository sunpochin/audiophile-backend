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

export interface IRequestBody<T = void> extends e.Request {
  body: T;
}
interface IUserRequest extends IUser {
  _id: Types.ObjectId;
}

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

};

export default authMiddleware;