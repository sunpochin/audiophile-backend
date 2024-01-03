// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ParamsDictionary } from 'express-serve-static-core';
import { jwtSecret } from '../config/env';

interface DecodedToken {
  userId: string;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // 從請求標頭中獲取 JWT
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed: No token provided' });
  }

  interface CustomRequest extends Request {
    userId: string;
  }

  console.log('token: ', token);
  try {
    // 驗證 JWT
    const decodedToken = jwt.verify(token, jwtSecret as string) as DecodedToken;

    // 將解碼的用戶ID添加到請求對象中
    (req as CustomRequest).userId = decodedToken.userId;

    // 繼續處理下一個中間件或路由處理函數
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed: Invalid token' });
  }
};

export default authMiddleware;