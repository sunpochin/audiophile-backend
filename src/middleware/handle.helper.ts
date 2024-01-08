import { Response } from 'express';

function handleResponse<T>(res: Response, statusCode: number, message: string, data?: T) {
  const isSuccess = statusCode === 200;

  res.status(statusCode);

  if (data) {
    res.json({
      statusCode,
      isSuccess,
      message,
      data,
    });
  } else {
    res.json({
      statusCode,
      isSuccess,
      message,
    });
  }
}

function missingFieldErrorMessage(fieldName: string) {
  return `${fieldName}必填欄位未填寫`;
}

export { handleResponse, missingFieldErrorMessage };
