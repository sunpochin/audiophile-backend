import { Types } from 'mongoose';
import { IUser } from '../../models/user.model';
import { IRequestBody } from './types/handle.type';

interface IUserRequest extends IUser {
  _id: Types.ObjectId;
}

interface IVerifyJwtTokenRequest<T = void> extends IRequestBody<T> {
  user?: IUserRequest;
}

interface IVerifyObjectIdsRequest {
  courseIds: string[];
}

export {
  IVerifyJwtTokenRequest,
  IVerifyObjectIdsRequest,
  IVerifyJwtTokenRequest as IRequestJwtBody,
};
