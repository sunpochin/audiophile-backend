import * as e from 'express';
import { ParsedQs } from 'qs';

// **** Express **** //

export interface IRequestBody<T = void> extends e.Request {
  body: T;
}

export interface IReqQuery<T extends ParsedQs = {}> extends e.Request {
  query: T;
}

export interface IRes<T = void> extends e.Response {
  locals: {
    sessionUser?: T;
  };
}
