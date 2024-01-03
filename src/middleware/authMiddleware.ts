// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  userId: string;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // 從請求標頭中獲取 JWT
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed: No token provided' });
  }

  try {
    // 驗證 JWT
    const decodedToken = jwt.verify(token, 'your_secret_key') as DecodedToken;

    // 將解碼的用戶ID添加到請求對象中
    req.userId = decodedToken.userId;

    // 繼續處理下一個中間件或路由處理函數
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed: Invalid token' });
  }
};

export default authMiddleware;